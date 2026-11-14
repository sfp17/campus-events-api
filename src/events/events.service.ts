// src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsRepository } from './events.repository.js';
import { Event, Session, PaginatedResult } from './interfaces/event.interface.js';
import { FindEventsQueryDto, CreateEventDto } from './dto/events.dto.js';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepo: EventsRepository) {}

  findAll(query: FindEventsQueryDto): PaginatedResult<Event> {
    let rows = [...this.eventsRepo.findAll()];

    // 1. Filtering by category, location, and isPublished
    if (query.category) {
      rows = rows.filter((e) => e.category.toLowerCase() === query.category?.toLowerCase());
    }  
   
    if (query.location) {
      rows = rows.filter((e) => e.location.toLowerCase().includes(query.location!.toLowerCase()));
    }
    if (query.isPublished !== undefined) {
      rows = rows.filter((e) => e.isPublished === query.isPublished);
    }

    // 2. Sort a copy of the filtered result (avoids mutating original seed array)
    if (query.sortBy) {
      rows.sort((a, b) => {
        let valA: string | number = a[query.sortBy!];
        let valB: string | number = b[query.sortBy!];

        if (query.sortBy === 'eventDate') {
          valA = new Date(a.eventDate).getTime();
          valB = new Date(b.eventDate).getTime();
        }

        if (valA < valB) return query.order === 'desc' ? 1 : -1;
        if (valA > valB) return query.order === 'desc' ? -1 : 1;
        return 0;
      });
    }

    // 3. Pagination calculations
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 5;
    const total = rows.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const offset = (page - 1) * limit;
    const items = rows.slice(offset, offset + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  findUpcoming(): Event[] {
    const now = new Date().getTime();
    return this.eventsRepo.findAll().filter((e) => new Date(e.eventDate).getTime() >= now && e.isPublished);
  }

  findOne(id: string): Event {
    const event = this.eventsRepo.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  findSessions(eventId: string): Session[] {
    // Verify event exists first (throws 404 if missing)
    this.findOne(eventId);
    return this.eventsRepo.findSessionsByEventId(eventId);
  }

  findSessionDetail(eventId: string, sessionId: string): Session {
    this.findOne(eventId); // Verify event exists
    const session = this.eventsRepo.findSessionByIdAndEvent(eventId, sessionId);
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} under event ${eventId} not found`);
    }
    return session;
  }

  create(dto: CreateEventDto): Event {
    return this.eventsRepo.create(dto);
  }
}