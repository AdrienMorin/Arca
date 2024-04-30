import axios from "axios";

//constant for the base url
const baseUrl = "https://127.0.0.1:3333/api";

//pour appeler l'api (exemple login)
// const response = Api.getInstance().login(email, password);

class Api {
  private static instance: Api;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = "https://127.0.0.1:3333/api";
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  public async login(email: string, password: string): Promise<any> {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    return response;
  }

  public async register(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string
  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/auth/register`, {
      email,
      password,
      firstname,
      lastname,
      role,
    });
    return response;
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/changePassword`, {
      oldPassword,
      newPassword,
    });
    return response;
  }
}

export default Api;
