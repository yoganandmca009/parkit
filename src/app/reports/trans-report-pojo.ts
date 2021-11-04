export class TransReport {

    private vehicle_type: string;
    private card_type: string;
    private vehicle_no: string;
    private start_time: string;
    private end_time: string;
    private db_name: string = "br_sample";

    public static init() {
        return new TransReport("", "", 10,"","");
    }

    constructor(vehicle_type, card_type, vehicle_no,start_time,end_time) {
        this.vehicle_type = vehicle_type;
        this.card_type = card_type;
        this.vehicle_no = vehicle_no;
        this.start_time = start_time;
        this.end_time = end_time;
        this.db_name="br_sample";
    }

}

