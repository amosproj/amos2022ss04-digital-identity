import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimestampConverter {
  constructor() {}

  convertToXago(timestamp: string): string {
    const current = new Date();
    const other = new Date(timestamp);
    const diff_time = current.getTime() - other.getTime();
    const diff = new Date(diff_time);

    // years ago
    const years = diff.getFullYear() - 1970;
    if (years != 0) {
      if (years == 1) {
        return 'a year ago';
      }
      return years + ' years ago';
    }
    //months ago
    if (diff.getMonth() != 0) {
      if (diff.getMonth() == 1) {
        return 'a month ago';
      }
      return diff.getMonth() + ' months ago';
    }
    //days ago
    if (diff.getDate() != 1) {
      if (diff.getDate() == 1) {
        return 'one day ago';
      }
      return diff.getDate() + ' days ago';
    }
    //days ago
    if (diff.getHours() != 1) {
      if (diff.getHours() == 1) {
        return 'one hour ago';
      }
      return diff.getHours() + ' hours ago';
    }
    //minutes ago
    if (diff.getMinutes() != 1) {
      if (diff.getMinutes() == 1) {
        return 'one minute ago';
      }
      return diff.getMinutes() + ' minutes ago';
    }

    return 'just now';
  }
}
