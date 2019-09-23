import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CONFIG } from '../../../app.config';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: string, format?: string): string {
    return super.transform(value, format || CONFIG.dateFormat);
  }

}
