import { TimeagoFormatter } from 'ngx-timeago';

export class CustomFormatter implements TimeagoFormatter {

  format(then: number): string {
    const now = Date.now();

    let totalUnits = Math.round(Math.abs(now - then) / 1000); // units in seconds
    // totalUnits = 50;

    const seconds = totalUnits % 60;
    totalUnits -= seconds;

    totalUnits /= 60; // units in minutes
    const minutes = totalUnits % 60;
    totalUnits -= minutes;

    totalUnits /= 60;  // units in hours
    const hours = totalUnits;

    let str = '';

    if (hours > 0) {
      str += hours + ':';
    }

    if (minutes < 10)
      str += '0' + minutes + ':';
    else
      str += minutes + ':';

    if (hours < 1) {
      if (seconds < 10)
        str += '0' + seconds;
      else
        str += seconds;
    }

    return str;
  }

}
