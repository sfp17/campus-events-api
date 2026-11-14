// src/events/events.repository.ts
import { Injectable } from '@nestjs/common';
import { Event, Session } from './interfaces/event.interface.js';

@Injectable()
export class EventsRepository {
  private events: Event[] = [
    {
      id: 'evt-101',
      title: 'Intro to Cloud Computing',
      description: 'A beginner-friendly campus workshop on cloud services.',
      location: 'Engineering Block, Room 2',
      eventDate: '2026-12-04T09:00:00.000Z',
      category: 'technology',
      isPublished: true,
    },
    {
      id: 'evt-102',
      title: 'Campus AI Hackathon 2026',
      description: 'Build machine learning solutions for student life.',
      location: 'Main Auditorium',
      eventDate: '2026-12-10T10:00:00.000Z',
      category: 'technology',
      isPublished: true,
    },
    {
      id: 'evt-103',
      title: 'Annual Art Exhibition',
      description: 'Showcasing paintings and sculptures by fine arts majors.',
      location: 'Student Center Gallery',
      eventDate: '2026-11-20T14:00:00.000Z',
      category: 'arts',
      isPublished: true,
    },
    {
      id: 'evt-104',
      title: 'Inter-Department Football Final',
      description: 'Computer Science vs. Engineering cup final match.',
      location: 'Campus Sports Pitch',
      eventDate: '2026-10-15T16:00:00.000Z',
      category: 'sports',
      isPublished: false,
    },
    {
      id: 'evt-105',
      title: 'Entrepreneurship Pitch Deck Night',
      description: 'Pitch your startup ideas to alumni investors.',
      location: 'Business School Hall A',
      eventDate: '2026-12-25T17:30:00.000Z',
      category: 'business',
      isPublished: true,
    },
  ];

  private sessions: Session[] = [
    {
      id: 'ses-201',
      eventId: 'evt-101',
      title: 'Cloud Architecture Basics',
      startsAt: '2026-12-04T09:00:00.000Z',
      endsAt: '2026-12-04T10:30:00.000Z',
      room: 'Room 2',
    },
    {
      id: 'ses-202',
      eventId: 'evt-101',
      title: 'Hands-on Serverless Deployments',
      startsAt: '2026-12-04T10:45:00.000Z',
      endsAt: '2026-12-04T12:00:00.000Z',
      room: 'Lab 3',
    },
    {
      id: 'ses-203',
      eventId: 'evt-102',
      title: 'LLM Prompt Engineering Workshop',
      startsAt: '2026-12-10T11:00:00.000Z',
      endsAt: '2026-12-10T13:00:00.000Z',
      room: 'Auditorium Main Stage',
    },
  ];

  findAll(): Event[] {
    return this.events;
  }

  findById(id: string): Event | undefined {
    return this.events.find((e) => e.id === id);
  }

  findSessionsByEventId(eventId: string): Session[] {
    return this.sessions.filter((s) => s.eventId === eventId);
  }

  findSessionByIdAndEvent(eventId: string, sessionId: string): Session | undefined {
    return this.sessions.find((s) => s.id === sessionId && s.eventId === eventId);
  }

  create(newEvent: Omit<Event, 'id'>): Event {
    const id = `evt-${Date.now()}`;
    const event: Event = { id, ...newEvent };
    this.events.push(event);
    return event;
  }
}