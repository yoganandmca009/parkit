import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class AppUtils {

  constructor(private http: HttpClient) {

  }

  public callHttpApi(url, requestBody, headers, method): Observable<any> {
    if (method == "POST") {
      return this.http.post(url, requestBody, headers);
    } else {
      return this.http.get(url, headers);
    }
  }

  public getVehicleType(type) {
    switch (type) {
      case "BI":
        return "Bikes";
      case "CA":
        return "Cars";
      case "ME":
        return "Medium Vehicles";
      case "HE":
        return "Heavy Vehicles";
      case "AU":
        return "Autos";
      case "CY":
        return "Cycles";
    }
  }

  public getCardType(type) {
    switch (type) {
      case "RE":
        return "Regular";
      case "DA":
        return "Daily";
      case "PA":
        return "Pass";
    }
  }

  getVehicleImageLink(type) {
    switch (type) {
      case "BI":
        return "/assets/vehicles/bike.jpg";
      case "CA":
        return "/assets/vehicles/car.jpg";
      case "ME":
        return "/assets/vehicles/med-vehicle.jpg";
      case "HE":
        return "/assets/vehicles/heavy_vehicle.jpg";
      case "AU":
        return "/assets/vehicles/auto.jpg";
      case "CY":
        return "/assets/vehicles/cycle.jpg";
    }
  }
}