import axios from "axios";

//constant for the base url
const baseUrl = 'https://127.0.0.1:3333/api';

//pour appeler l'UserController (exemple login)
// const response = await UserController.getInstance().login(email, password);

class PersonneController {
  private static instance: PersonneController;

  public static getInstance(): PersonneController {
    if (!PersonneController.instance) {
      PersonneController.instance = new PersonneController();
    }
    return PersonneController.instance;
  }

  public async fetchPersonnes(token: string):Promise<any>{
    const response = await axios.get(`${baseUrl}/person/fetchPeople`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    return response;
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

}

export default PersonneController;
