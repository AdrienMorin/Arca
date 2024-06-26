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

  public async isConnected(token: string): Promise<any> {
    const response = await axios.get('https://127.0.0.1:3333/api', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response);
    if (response.data != 'Vous êtes connecté') {
      return false;
    }else{
      return true;
    }
  }

  public async createUser(firstname: string, lastname: string, email: string, password: string, token: string): Promise<any> {
    const response = await axios.post(`${baseUrl}/auth/register`,
    {
      firstname,
      lastname,
      email,
      password,
      role: 'user'
    }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    });

    return response;
  }


  public async isAdmin(token: string): Promise<any> {
    const response = await axios.get('https://127.0.0.1:3333/api/auth/isLoggedInAsAdmin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.message === "Vous êtes connecté en tant qu'administrateur";
  }

  public async deleteUser(id: number, token: string): Promise<any> {
    const response = await axios.post(`${baseUrl}/deleteUser`,
      {
        id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

    return response;
  }

  public async getUser(token: string):Promise<any>{
    const response = await axios.get(`${baseUrl}/user/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  public async fetchUsers(token: string):Promise<any>{
    const response = await axios.get(`${baseUrl}/user/fetchUsers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    return response;
  }

  public async uploadDocument(
    token: string,
    file: File,
    titre: string,
    description: string,
    retranscription: string,
    date: {
      start: string,
      end:string,
    },
    villes: string,
    personnes: string,
    mongoDB: string

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/basic/upload`,
      {file, titre, description, retranscription, date, villes, personnes, mongoDB},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }

  public async updateDocument(
    token: string,
    file: File,
    titre: string,
    description: string,
    retranscription: string,
    date: {
      start: string,
      end:string,
    },
    villes: string,
    personnes: string,
    mongoDB: string,
    id:string,

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/updateDocument`,
      {file, titre, description, retranscription, date, villes, personnes, mongoDB,id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }

  public async transferDocumentById(
    token: string,
    id:string,

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/transferDocumentById`,
      {id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }

  public async deleteDocument(
    token: string,
    id:string,
    db: string

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/deleteDocument`,
      {id, db},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }
  

  public async updateDocument(
    token: string,
    file: File,
    titre: string,
    description: string,
    retranscription: string,
    date: {
      start: string,
      end:string,
    },
    villes: string,
    personnes: string,
    mongoDB: string,
    id:string,

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/updateDocument`,
      {file, titre, description, retranscription, date, villes, personnes, mongoDB,id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }

  public async transferDocumentById(
    token: string,
    id:string,

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/transferDocumentById`,
      {id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }

  public async deleteDocument(
    token: string,
    id:string,
    db: string

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/deleteDocument`,
      {id, db},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }
  
  public async getSearchResults(
    token: string,
    query: string,

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/search`,
      {query},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
    console.log(response);
    return response;
  }

  public async getDocument(
    token: string,
    s3_name: string,


  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/basic/get`,
      {s3_name},

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
    return response;
  }

  public async uploadAiDocument(
    token: string,
    file: File,

  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/ai/upload`,
      {file},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
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
    token: string,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/user/changePassword`,
    {oldPassword, newPassword},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

}

export default UserController;
