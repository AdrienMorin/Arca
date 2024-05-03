import axios from "axios";

//constant for the base url
const baseUrl = 'https://127.0.0.1:3333/api';

//pour appeler l'UserController (exemple login)
// const response = await UserController.getInstance().login(email, password);

class LocationController {
  private static instance: LocationController;

  public static getInstance(): LocationController {
    if (!LocationController.instance) {
      LocationController.instance = new LocationController();
    }
    return LocationController.instance;
  }

  public async fetchLocations(token: string):Promise<any>{
    const response = await axios.get(`${baseUrl}/location/fetchLocations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    return response;
  }

  public async getLocationById(id: number, token: string):Promise<any>{
    const response = await axios.get(`${baseUrl}/location/getLocation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    return response;
  }

}

export default LocationController;
