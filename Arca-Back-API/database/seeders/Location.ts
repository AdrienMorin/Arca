import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Location from "App/Models/Location";
import fs from 'fs';

export default class extends BaseSeeder {
  public async run () {
    // Read the JSON file
    const dataBuffer = fs.readFileSync('app/data/cities.json');
    
    // Convert the buffer to a string and parse it to a JSON object
    const data = JSON.parse(dataBuffer.toString());

    const uniqueCities = new Set();
    const filteredData = data.cities.reduce((acc: any[], item: any) => {
      const cityAndRegion = item.label + item.region_geojson_name;
      if (!uniqueCities.has(cityAndRegion)) {
        uniqueCities.add(cityAndRegion);
        acc.push({
          //uppercase the first letter of the display name
          displayname: item.label.charAt(0).toUpperCase() + item.label.slice(1)+", "+item.region_geojson_name,
          cityname: item.label,
          regionname: item.region_name,
          zipcode: item.zip_code
        });
      }
      return acc;
    }, []);

    // Create the cities
    await Location.createMany(filteredData);
  }
}