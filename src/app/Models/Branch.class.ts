export class Branch {
  address: string;
  location: Location;
  name: string;
}

export interface Location {
  longitude: number;
  latitude: number;
}
