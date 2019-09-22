import { Injectable, NgZone } from "@angular/core";
import { GoogleMapsAPIWrapper } from "@agm/core";
import { MapsAPILoader } from "@agm/core";
import { Observable, Observer, observable } from "rxjs";

declare var google: any;

@Injectable({
  providedIn: "root"
})
export class GoogleMapsService extends GoogleMapsAPIWrapper {
  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
  }

  getLatLng(id: string) {
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode({ placeId: id }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0]);
          observer.complete();
        } else {
          console.log("Error - ", results, " & Status - ", status);
          observer.next({});
          observer.complete();
        }
      });
    });
  }

  getBarRest(map: any) {
    let placeService = new google.maps.places.PlacesService(map);
    var ne = new google.maps.LatLng(-33.853487, 151.218456);
    var sw = new google.maps.LatLng(-33.884559, 151.194724);
    var bound = new google.maps.LatLngBounds(sw, ne);
    var request = {
      bounds: bound,
      type: ["bar"]
    };
    return Observable.create(observer => {
      placeService.nearbySearch(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          observer.next(results);
          observer.complete();
        } else {
          console.log("Error - ", results, " & Status - ", status);
          observer.next({});
          observer.complete();
        }
      });
    });
  }

  getDetails(id: string, map: any) {
    var request = {
      placeId: id,
      fields: [
        "name",
        "formatted_phone_number",
        "place_id",
        "formatted_address",
        "website",
        "opening_hours.weekday_text",
        "geometry",
        "icon"
      ]
    };
    let placeService = new google.maps.places.PlacesService(map);
    return Observable.create(observer => {
      placeService.getDetails(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          observer.next(results);
          observer.complete();
        } else {
          console.log("Error - ", results, " & Status - ", status);
          observer.next({});
          observer.complete();
        }
      });
    });
  }
}
