// FORMAT: YYYY-MM-DDTHH:mm:ss[Z]

export const GetAlpacaTimestamp = function(date: Date) {
  const GMTTime = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
  return `${GMTTime.getFullYear()}-${
    GMTTime.getMonth() < 10 ? `0${GMTTime.getMonth() + 1}` : GMTTime.getMonth() + 1
  }-${
    GMTTime.getDate() < 10 ? `0${GMTTime.getDate()}` : GMTTime.getDate()
  }T${GMTTime.getHours()}:${GMTTime.getMinutes()}:${GMTTime.getSeconds()}Z`;
};

export class AlpacaTimestamp {
  dateString: string;
  date: Date;

  constructor(date: string | Date) {
    if (date instanceof Date) {
      this.date = date;
      this.dateString = this.getTimestamp(date);
    } else {
      this.dateString = date;
      this.date = this.getUTCDate(date);
    }
  }

  private getTimestamp(date: Date) {
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}Z`;
  }

  private getUTCDate(date: string) {
    const GMTDate = new Date(date);

    return new Date(
      GMTDate.getUTCFullYear(),
      GMTDate.getUTCMonth(),
      GMTDate.getUTCDate(),
      GMTDate.getUTCHours(),
      GMTDate.getUTCMinutes(),
      GMTDate.getUTCSeconds()
    );
  }
}
