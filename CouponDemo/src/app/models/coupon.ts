import { Company } from './company';
export class Coupon {
  public constructor(
    public id?: number,
    public companyID?: number,
    public CategoryID?: string,
    public title?: string,
    public description?: string,
    public startDate?: Date,
    public endDate?: Date,
    public amount?: number,
    public price?: number,
    public image?: String
  ) {}
}
