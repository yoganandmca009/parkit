export class CardRequest {

    private vehicle_type: string;
    private card_type: string;
    private cards_size: Number;
    private db_name: string = "br_sample";

    public static init() {
        return new CardRequest("", "", 10);
    }

    constructor(vehicle_type, card_type, cards_size) {
        this.vehicle_type = vehicle_type;
        this.card_type = card_type;
        this.cards_size = cards_size;
        this.db_name="br_sample";
    }

}

