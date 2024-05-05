import axios from 'axios';

const API_URL = 'https://127.0.0.1:3333/api';

class DocumentController {
  private static instance: DocumentController;

  public static getInstance(): DocumentController {
    if (!DocumentController.instance) {
      DocumentController.instance = new DocumentController();
    }
    return DocumentController.instance;
  }

  public async getDocuments(token: string): Promise<any> {
    const response = await axios.get(API_URL + '/ai/getDocs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  public async deleteDocumentArca(token: string, filename: string): Promise<any> {
    try {
      const response = await axios.post(API_URL + '/deleteArca', { filename }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error deleting document from Arca:', error);
      throw error;
    }
  }

  public async deleteDocumentReview(token: string, filename: string): Promise<any> {
    try {
      const response = await axios.post(API_URL + '/deleteReview', { filename }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error deleting document from Review:', error);
      throw error;
    }
  }

public async modifyDocument(
    token: string,
    id:string,
    titre: string,
    description: string,
    retranscription: string,
    date: string,
    personnes: string,

  ): Promise<any> {
    const response = await axios.post(`${API_URL}/updateDocuments/${id}`,
      {titre, description, retranscription, date, personnes},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }
      });
    console.log(response);
    return response;
  }
}

export default DocumentController;