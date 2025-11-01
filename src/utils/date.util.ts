import { DATE_TIME_FORMAT, DEFAULT_DATE_FORMAT } from '@/constants';
import { logger } from '@/logger';
import { format as formatFn, isValid, parse } from 'date-fns';

export const formatDate = (
  date: string | null,
  outputFormat: string = DEFAULT_DATE_FORMAT
) => {
  if (!date) return '';
  try {
    const parsedDate = new Date(date);
    if (!isValid(parsedDate)) return '';
    return formatFn(parsedDate, outputFormat);
  } catch (error) {
    logger.error('Invalid date', date, error);
    return '';
  }
};

// export const formatDateUTC = (
//   date: string | null,
//   outputFormat: string = DEFAULT_DATE_FORMAT
// ) => {
//   if (!date) return '';
//   try {
//     const parts = date.match(
//       /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/
//     );

//     if (!parts) {
//       const parsedDate = new Date(date);
//       if (!isValid(parsedDate)) return '';

//       const localDate = new Date(
//         parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000
//       );
//       return formatFn(localDate, outputFormat);
//     }

//     const [, day, month, year, hour, minute, second] = parts;

//     const parsedDate = new Date(
//       parseInt(year),
//       parseInt(month) - 1,
//       parseInt(day),
//       parseInt(hour),
//       parseInt(minute),
//       parseInt(second)
//     );

//     if (!isValid(parsedDate)) return '';

//     const localDate = new Date(
//       parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000
//     );

//     return formatFn(localDate, outputFormat);
//   } catch (error) {
//     logger.error('Invalid UTC date', date, error);
//     return '';
//   }
// };

export const formatDateUTC = (
  date: string | null,
  outputFormat: string = DEFAULT_DATE_FORMAT,
  adjustToLocal: boolean = true
) => {
  if (!date) return '';

  try {
    let parsedDate: Date;

    const parts = date.match(
      /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/
    );

    if (parts) {
      const [, day, month, year, hour, minute, second] = parts;
      parsedDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second)
      );
    } else {
      parsedDate = new Date(date);
    }

    if (!isValid(parsedDate)) return '';

    const finalDate = adjustToLocal
      ? new Date(
          parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000
        )
      : new Date(
          parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60 * 1000
        );

    return formatFn(finalDate, outputFormat);
  } catch (error) {
    logger.error('Invalid UTC date', date, error);
    return '';
  }
};

export const parseDateUTC = (
  dateStr: string | null,
  inputFormat: string = DATE_TIME_FORMAT
) => {
  if (!dateStr) return null;

  try {
    const parsedDate = parse(dateStr, inputFormat, new Date());

    if (isValid(parsedDate)) {
      const localDate = new Date(
        parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000
      );
      return localDate;
    }

    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    logger.error('Invalid date string', dateStr, error);
    return null;
  }
};
