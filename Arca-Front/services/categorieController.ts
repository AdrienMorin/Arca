import axios from "axios";

//constant for the base url
const baseUrl = 'https://127.0.0.1:3333/api';

//pour appeler l'CatgorieController (exemple login)
// const response = await CatgorieController.getInstance().login(email, password);

class CatgorieController {
  private static instance: CatgorieController;

  public static getInstance(): CatgorieController {
    if (!CatgorieController.instance) {
      CatgorieController.instance = new CatgorieController();
    }
    return CatgorieController.instance;
  }


  public async createCategory(name: string, token: string): Promise<any> {
    const response = await axios.post(`${baseUrl}/category/create`,
    {name},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response;
  }


  public async fetchCategories(token: string):Promise<any>{
    const response = await axios.get(`${baseUrl}/category/fetchCategories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }


   public async updateCategory(
    token: string,
    oldName: string,
    newName: string
  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/category/update`, 
    {oldName, newName},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    return response;
  }

}

export default CatgorieController;
