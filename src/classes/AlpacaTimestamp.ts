import * as moment from 'moment';

// TODO: this is all messed up because it is constantly in GMT rather than localtime because of the Z
export class AlpacaTimestamp {
  private date: string | Date;
  constructor(date: string | Date) {
    this.date = date;
  }

  getDate() {
    return new Date(this.date); // return moment(this.date).toDate();
  }

  getTimestamp() {
    return moment(this.date).format('YYYY-MM-DDTHH:mm:ssZ');
  }
}

// 2018-10-01T13:35:25Z
// 2019-05-02T17:54:43Z
