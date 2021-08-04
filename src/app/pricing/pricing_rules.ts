export class VehicleType {

    vehicle_type: string;

    show: boolean;

    price_list: PricingRule[];

    db_name: string;

}

export class PricingRule {

    constructor(ruleId,hr, min, price){
        this.rule=ruleId;
        this.hours=hr;
        this.minutes=min;
        this.price=price;
    }

    hours: Number;

    minutes: Number;

    price: Number;    

    rule: string;
}