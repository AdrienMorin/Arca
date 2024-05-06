import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person';
import SearchValidator from 'App/Validators/Search/SearchValidator';
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

export default class SearchDocsController {

    async complexSearch(searchQuery) {
        try {
            if (client.db) {
                await client.connect();
            }

            // Replace 'collection_name' with the actual name of your MongoDB collection
            const collection = client.db("arca-metadata").collection('arca');

            // Execute the search query
            let cursor = await collection.aggregate(searchQuery);

            return cursor;
        } catch (err) {
            console.error('Error executing complex search:', err);
            throw err;
        }
    }

    public async advancedSearch({ request, response }: HttpContextContract) {
        // Define your complex search query
        const payload = await request.validate(SearchValidator)

        const agg = [
            {
                $search: {
                    text: {
                        query: `${payload.query}`,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            },
            {
                $project: {
                    "name": 1,
                    "categories": 1,
                    "creator": 1,
                    "createdAt": 1,
                    "description": 1,
                    "retranscription": 1,
                    "towns": 1,
                    "people": 1,
                    "updatedBy": 1,
                    "updatedAt": 1,
                    "date": 1,
                    "endDate": 1,
                    "filename": 1,
                    score: { $meta: "searchScore" }
                }
            }
        ];

        const cursor = await this.complexSearch(agg);

        interface Result {
            _id: string,
            name: string,
            creator: string,
            createdAt: Date,
            updatedAt: Date,
            updatedBy: string,
            description: string,
            retranscription: string,
            date: Date,
            endDate: Date,
            people: string[],
            categories: string,
            towns: string[],
            score: number,
            filename: string
        }
        interface ResultFormatted {
            _id: string,
            name: string,
            creator: string,
            createdAt: Date,
            updatedAt: Date,
            updatedBy: string,
            description: string,
            retranscription: string,
            date: Date,
            endDate: Date,
            people: string,
            categories: string,
            towns: string,
            score: number,
            filename: string
        }

        const results: Result[] = [];
        let resultsFormatted: ResultFormatted[] = [];

        await cursor.forEach((doc) => {
            console.log(doc)
            results.push(doc);
        });

        for (const res of results) {
            let peopleList:string[] = [];
            let peopleListFormatted = '';
            let townsList:string[] = [];
            let townsListFormatted = '';
            for (const personId of res.people) {
                const fetchedPerson = await Person.findOrFail(personId);
                peopleList.push(fetchedPerson.displayname);
            }
            peopleListFormatted = peopleList.join(', ');

            for (const town of res.towns) {
                townsList.push(town);
            }
            townsListFormatted = townsList.join(', ');
            const resFormatted: ResultFormatted = {
                _id: res._id,
                name: res.name,
                creator: res.creator,
                createdAt: res.updatedAt,
                updatedAt: res.updatedAt,
                updatedBy: res.updatedBy,
                description: res.description,
                retranscription: res.retranscription,
                date: res.date,
                endDate: res.endDate,
                people: peopleListFormatted,
                categories: res.categories,
                towns: townsListFormatted,
                score: res.score,
                filename: res.filename
            }
            console.log(resFormatted);
            resultsFormatted.push(resFormatted);
        }

        return response.status(200).json(resultsFormatted)
    }

}
