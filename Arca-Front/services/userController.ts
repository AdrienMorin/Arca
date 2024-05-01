import axios from "axios";

//constant for the base url
const baseUrl = 'https://127.0.0.1:3333/api';

//pour appeler l'UserController (exemple login)
// const response = await UserController.getInstance().login(email, password);

class UserController {
  private static instance: UserController;

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public async login(email: string, password: string): Promise<any> {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    return response;
  }

  public async logout(token: string): Promise<any> {
    const response = await axios.post(`${baseUrl}/auth/logout`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  }

  public async getUser(token: string):Promise<any>{
    const response = await axios.get(`${baseUrl}/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  public async addDocument()

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

export default UserController;
