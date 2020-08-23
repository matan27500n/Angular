export class Product{

    public constructor(
        //הסימן '?' אומר שזה אופציונלי, שלא נהייה חייבים להוסיף פרמטרים להם
        public id?: number,
        public name?: string,
        public price?: number,
        public stock?: number
    ){

    }
}