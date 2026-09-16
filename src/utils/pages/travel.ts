import { formatDate } from "../common/date.ts";

export function formatTravelDateRange(startDate: Date, endDate: Date): string {
  return `[${formatDate(startDate)}] - [${formatDate(endDate)}]`;
}

export function formatTravelRoute(cities: string[]): string {
  return cities.join(" -> ");
}
