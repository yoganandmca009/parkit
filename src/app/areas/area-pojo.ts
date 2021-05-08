export class Area {

    private name: string;
    private address: string;
    private image: string;
    private totalCars: Number;
    private totalBikes: Number;
    private totalHeavy: Number;

    public static init() {            
        return new Area("","","/assets/areas/mall.png",10,10,10);
    }

    constructor(name, address, image, totalCars, totalBikes, totalHeavy) {
        this.name = name;
        this.address = address;
        this.image = image;
        this.totalCars = totalCars;
        this.totalBikes = totalBikes;
        this.totalHeavy = totalHeavy;
    }

}

