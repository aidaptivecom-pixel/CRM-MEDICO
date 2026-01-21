import { LucideIcon } from 'lucide-react';

export interface StatMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  trend: 'up' | 'down';
}

export type EventType = 'confirmed' | 'pending' | 'cancelled' | 'first-visit';

export interface CalendarEvent {
  day: number;
  type: EventType;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'success' | 'info';
}