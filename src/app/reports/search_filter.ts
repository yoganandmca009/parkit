export class SearchFilter {

    start_date: string;

    end_date: string;

    vehicle_type: string;

    status: string;

    db_name: string;

    constructor(startDate, endDate, vehicleType, status) {
        this.start_date = startDate;
        this.end_date = endDate;
        this.vehicle_type = vehicleType;
        this.status = status;
    }
}