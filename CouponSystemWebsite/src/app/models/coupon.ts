export class Coupon {
    public constructor(
      public id?: number,
      public companyID?: number,
      public categoryID?: string,
      public title?: string,
      public description?: string,
      public start_date?: Date,
      public end_date?: Date,
      public amount?: number,
      public price?: number,
      public image?: String
    ) {}
  }
