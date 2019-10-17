import {
  Component,
  OnInit,
  NgModule,
  NgZone,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";
import { MapsAPILoader } from "@agm/core";
import { UserService } from "../../service/user.service";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { LabelOptions } from "@angular/material";
import { CdkStepLabel } from "@angular/cdk/stepper";

declare var google: any;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  filteredVenues: any[];
  message: string = "";

  // Map Center
  latitude = -33.870752;
  longitude = 151.208221;

  // @ViewChild('search')
  searchElementRef: ElementRef;
  searchControl: FormControl;
  autocompleteInput: string;
  queryWait: boolean;

  //Google autocomplete venue search
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild("addresstext", { static: true }) addresstext: any;
  //Google autocomplete location search
  @Input() locationType: string;
  @Output() setLocation: EventEmitter<any> = new EventEmitter();
  @ViewChild("locationsearch", { static: true }) locationsearch: any;

  constructor(
    private gMapsService: GoogleMapsService,
    private userService: UserService,
    private __zone: NgZone,
    private _mapsAPILoader: MapsAPILoader
  ) {}

  lists = [];
  selectedValue;
  markers: marker[] = [];
  locationResults: marker[] = [];
  search = {
    lat: 0,
    lng: 0,
    name: "",
    address: "",
    label: "",
    icon: {
      url: "place.icon",
      scaledSize: {
        height: 25,
        width: 25
      }
    },
    placeID: "",
    website: "",
    opening_hours: ""
  };

  ngOnInit() {}

  ngAfterViewInit() {}

  private getPlaceAutocomplete(map: any) {
    var ne = new google.maps.LatLng(-33.853487, 151.218456);
    var sw = new google.maps.LatLng(-33.884559, 151.194724);
    var bound = new google.maps.LatLngBounds(sw, ne);
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        componentRestrictions: { country: "au" },
        types: ["establishment"],
        bounds: bound
      }
    );
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      console.log(place);
      this.search = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name,
        address: place.formatted_address,
        label: "",
        icon: {
          url: place.icon,
          scaledSize: {
            height: 25,
            width: 25
          }
        },
        placeID: place.place_id,
        website: place.website,
        opening_hours: place.opening_hours.weekday_text
      };
      map.setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  }

  private getLocationAutocomplete(map: any) {
    var ne = new google.maps.LatLng(-33.590427, 151.606925);
    var sw = new google.maps.LatLng(-34.013367, 150.986491);
    var bound = new google.maps.LatLngBounds(sw, ne);
    const autocomplete = new google.maps.places.Autocomplete(
      this.locationsearch.nativeElement,
      {
        componentRestrictions: { country: "au" },
        types: ["(regions)"],
        bounds: bound
      }
    );
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      this.locationResults.length = 0;
      const location = autocomplete.getPlace();
      let placeService = new google.maps.places.PlacesService(map);
      var requestBar = {
        location: new google.maps.LatLng(
          location.geometry.location.lat(),
          location.geometry.location.lng()
        ),
        radius: 1500,
        type: ["bar"]
      };
      placeService.nearbySearch(requestBar, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          for (let result in results) {
            setTimeout(() => {
              this.getDetails(map, results[result].place_id);
            }, 20);
          }
        } else {
          console.log("Error - ", results, " & Status - ", status);
        }
      });
      setTimeout(() => {
        map.setCenter({
          lat: location.geometry.location.lat(),
          lng: location.geometry.location.lng()
        });
        console.log(this.locationResults);
      }, 850);
    });
  }

  getDetails(map: any, id: string) {
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
    placeService.getDetails(request, (results, status) => {
      console.log(
        "This is the request: " +
          request +
          " This is the result: " +
          results +
          " This is the error: " +
          status
      );
      this.locationResults.push({
        lat: results.geometry.location.lat(),
        lng: results.geometry.location.lng(),
        name: results.name,
        address: results.formatted_address,
        icon: {
          url: results.icon,
          scaledSize: {
            height: 25,
            width: 25
          }
        },
        placeID: results.place_id,
        list: "",
        iconColour: "",
        website: results.website,
        opening_hours: results.opening_hours.weekday_text,
        label: ""
      });
    });
  }

  getUserList(id) {
    this.userService.getListsByID(id).subscribe(result => {
      let stringVer = JSON.stringify(result);
      let listResult = JSON.parse(stringVer);
      //console.log(listResult.venuelists);

      for (let list in listResult.venuelists) {
        this.lists.push(listResult.venuelists[list]);
      }
    });
    console.log(this.lists);
  }

  addVenuetoList(venueid) {
    this.userService
      .addListVenue(localStorage.getItem("id"), this.selectedValue, venueid)
      .subscribe(result => {
        console.log(result);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  }

  setCurrentSelect($event) {
    this.selectedValue = $event.target.value;
  }

  // Marker Loader
  loadMarkers($event) {
    this.getUserList(localStorage.getItem("id"));
    this.getPlaceAutocomplete($event);
    this.getLocationAutocomplete($event);
    this.getPlaces($event);
    console.log(this.locationResults);
  }
  // Loads Markers once map is loaded
  getPlaces(map: any) {
    //Pulls venues from current users venue lists
    this.userService
      .getListsByID(localStorage.getItem("id"))
      .subscribe(result => {
        this.__zone.run(() => {
          // Stringify and then parses the observable object to access the child data.
          var stringObj = JSON.stringify(result);
          var list = JSON.parse(stringObj);

          // Loops over the users venues lists so that the it can access each lists stored venues.
          for (var key in list.venuelists) {
            // Loops over the lists venues to generate each marker on the map.
            this.getVenue(list, key, map);
          }
          this.filteredVenues = this.markers;
        });
      });
  }

  getVenue(list: any, key: any, map: any) {
    for (var test in list.venuelists[key].venues) {
      // Search the google maps Place API with the Place ID and returns an obserable object with the details of that place.
      this.gMapsService
        .getDetails(list.venuelists[key].venues[test].placeID, map)
        .subscribe(details => {
          this.__zone.run(() => {
            var markerIcon;
            var label;
            if (
              details.icon ===
              "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
            ) {
              markerIcon =
                "../../../assets/img/markerIcons/food/" +
                list.venuelists[key].colour +
                ".png";
              label = "Restaurant";
            } else if (
              details.icon ===
              "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png"
            ) {
              markerIcon =
                "../../../assets/img/markerIcons/bars/" +
                list.venuelists[key].colour +
                ".png";
              label = "Bar";
            } else {
              markerIcon = details.icon;
              label = "Other";
            }
            console.log(details);

            this.markers.push({
              lat: details.geometry.location.lat(),
              lng: details.geometry.location.lng(),
              name: details.name,
              address: details.formatted_address,
              icon: {
                url: markerIcon,
                scaledSize: {
                  height: 25,
                  width: 25
                }
              },
              placeID: details.place_id,
              list: list.venuelists[key].name,
              iconColour: list.venuelists[key].colour,
              website: details.website,
              opening_hours: details.opening_hours.weekday_text,
              label: label
            });
          });
        });
    }
  }

  filter(query: string) {
    if (query != "Bar" && query != "Restaurant") {
      this.message = "Venue Genre Required. Search 'Restaurant' Or 'Bar'.";
    } else {
      this.message = "";
      this.filteredVenues = query
        ? this.markers.filter(v =>
            v.label.toLowerCase().includes(query.toLowerCase())
          )
        : this.markers;
    }
  }

  // Style settings for map
  styles = [
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.park",
      stylers: [
        {
          visibility: "on"
        }
      ]
    },
    {
      featureType: "transit.station",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  ];
}

// Interface for the markers shown on the map.

interface marker {
  lat: number;
  lng: number;
  name: string;
  address: string;
  icon: {
    url: string;
    scaledSize: {
      height: number;
      width: number;
    };
  };
  placeID: string;
  list: string;
  iconColour: string;
  website: String;
  opening_hours: String;
  label: string;
}
