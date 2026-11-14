// src/events/events.controller.ts
import { Controller, Get, Post, Param, Query, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { FindEventsQueryDto, CreateEventDto } from './dto/events.dto.js';
import type { Event, Session, PaginatedResult } from './interfaces/event.interface.js';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() query: FindEventsQueryDto): PaginatedResult<Event> {
    return this.eventsService.findAll(query);
  }

  // STATIC route declared ABOVE /:id
  @Get('upcoming')
  findUpcoming(): Event[] {
    return this.eventsService.findUpcoming();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Event {
    return this.eventsService.findOne(id);
  }

  @Get(':id/sessions')
  findSessions(@Param('id') id: string): Session[] {
    return this.eventsService.findSessions(id);
  }

  @Get(':id/sessions/:sessionId')
  findSessionDetail(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ): Session {
    return this.eventsService.findSessionDetail(id, sessionId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEventDto: CreateEventDto): Event {
    return this.eventsService.create(createEventDto);
  }
}