import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import fs from 'fs';
import AwsFileUploadValidator from 'App/Validators/AwsFileUploadValidator';



export default class AwsController {
    public async uploadDocument({auth, response,request}: HttpContextContract){
        await auth.use('web').authenticate()
        const payload = await request.validate(AwsFileUploadValidator)

        if (payload.file.tmpPath) {
            const buffer = fs.readFileSync(payload.file.tmpPath);
            await Drive.put('victor.pdf', buffer)
            return response.status(200).json({message: 'Document créé avec succès'})
        } else {
            console.log('File has not been moved to a temporary path');
        }
    }
}
