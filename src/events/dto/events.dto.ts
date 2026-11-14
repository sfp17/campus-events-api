// src/events/dto/events.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsISO8601 } from 'class-validator';

export class FindEventsQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isPublished?: boolean;

  @IsOptional()
  @IsString()
  sortBy?: 'eventDate' | 'title';

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 5;
}

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsISO8601()
  eventDate: string;

  @IsString()
  category: string;

  @IsBoolean()
  isPublished: boolean;
  
}