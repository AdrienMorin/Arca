import axios from 'axios';

const API_URL = 'https://127.0.0.1:3333/api/ai/getDocs';

class DocumentController {
  private static instance: DocumentController;

  public static getInstance(): DocumentController {
    if (!DocumentController.instance) {
      DocumentController.instance = new DocumentController();
    }
    return DocumentController.instance;
  }

  public async getDocuments(token: string): Promise<any> {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}

export default DocumentController;