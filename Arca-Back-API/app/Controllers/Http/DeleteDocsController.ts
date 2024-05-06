import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import DeleteDocValidator from 'App/Validators/Pipelines/DeleteDocValidator';


const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

export default class DeleteDocsController {
    public async deleteDocument({ request, response }: HttpContextContract) {
        const payload = await request.validate(DeleteDocValidator)
        const filename = payload.id;
        const db = payload.db;
        var ok = true;
        if (!filename) {
            ok = false
        }

        // S3 deletion
        try {
            await Drive.delete(filename);
        } catch (error) {
            console.error('S3 Deletion Error:', error);
            ok = false
        }

        // MongoDB deletion
        try {
            if (db === "tbr") {
                await client.connect();
                const dbResponse = await client.db("arca-metadata").collection("arca").deleteOne({ filename: filename });
                if (dbResponse.deletedCount === 0) {
                    ok = false;
                }
            } else if (db === "ntbr") {
                await client.connect();
                const dbResponse = await client.db("reviewDB").collection("review").deleteOne({ filename: filename });
                if (dbResponse.deletedCount === 0) {
                    ok = false;
                }
            }
        } catch (error) {
            console.error('MongoDB Deletion Error:', error);
            ok = false
        } finally {
            await client.close();
        }

        if(!ok)
            return response.status(500).json({ message: 'Erreur' });
        return response.json({ message: 'Document and file deleted successfully' });
    }

    // public async deleteDocumentReview({ request, response }: HttpContextContract) {
    //     const filename = request.input('filename');
    //     var ok = true;
    //     if (!filename) {
    //         ok = false
    //     }

    //     // S3 deletion
    //     try {
    //         await Drive.delete(filename);
    //     } catch (error) {
    //         console.error('S3 Deletion Error:', error);
    //         ok = false
    //     }

    //     // MongoDB deletion
    //     try {
    //         await client.connect();
    //         const dbResponse = await client.db("reviewDB").collection("review").deleteOne({ filename: filename });
    //         if (dbResponse.deletedCount === 0) {
    //             ok = false
    //         }
    //     } catch (error) {
    //         console.error('MongoDB Deletion Error:', error);
    //         ok = false
    //     } finally {
    //         await client.close();
    //     }

    //     if(!ok)
    //         return response.status(500).json({ message: 'Erreur' });
    //     return response.json({ message: 'Document and file deleted successfully' });
    // }
}
