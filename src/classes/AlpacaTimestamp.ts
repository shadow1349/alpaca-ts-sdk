// FORMAT: YYYY-MM-DDTHH:mm:ss[Z]
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
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    }-${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}Z`;
  }

  private getUTCDate(date: string) {
    const GMTDate = new Date(this.date);

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
