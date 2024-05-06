<template>
  <!-- Ville Section -->
  <div class="flex flex-col mb-10">
    <div class="w-3/4 mr-10 ml-10">
      <h2 class="font-bold text-2xl mb-4 text-center">Ajouter une ville</h2>
      <div class="bg-white shadow overflow-hidden rounded-md p-2">
        <form @submit.prevent="addVille">
            <div class="mb-4 flex justify-between">
                <div class="w-1/2 pr-2">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="lastname">Ville</label>
                <input v-model="newVille.cityname" type="text" id="cityname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="w-1/2 pl-2">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="firstname">Région</label>
                <input v-model="newVille.regionname" type="text" id="regionname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
          </div>
          <div class="mb-4 ">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="country">Pays</label>
            <input v-model="newVille.country" type="text" id="country" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="zipcode">Code postal</label>
            <input v-model="newVille.zipcode" type="text" id="zipcode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
            <div class="flex items-center justify-center">
                <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Ajouter
                </button>
            </div>
        </form>
      </div>
    </div>

    <div class="w-3/4 mr-10 ml-10 mt-16">
      <h2 class="font-bold text-2xl mb-4 text-center">Villes</h2>
      <div class="bg-gray-50 shadow overflow-hidden rounded-md" style="max-height: 250px; overflow-y: auto;">
        <ul class="divide-y divide-gray-200">
          <!-- Header row -->
          <li class="px-10 py-4 flex justify-between bg-gray-200">
            <div class="w-1/5 text-sm font-medium text-gray-900">Id</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Nom complet</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Code postal</div>
            <div class="w-12"></div>
          </li>
          <!-- Ville rows -->
          <li v-for="ville in villes" :key="ville.id" class="px-10 py-4 flex justify-between">
            <div class="w-1/5 text-sm text-gray-900">{{ ville.id }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ ville.displayname }}</div>
            <div class="w-1/5 text-sm text-gray-500">{{ ville.zipcode }}</div>
            <div class="w-12">
              <button @click="$event => deleteVille($event, ville.id)" class="text-red-500 hover:text-red-700 justify-end">
                &times;
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import LocationController from '~/services/locationController'

export default {
  data() {
    return {
      villes: [],
      newVille: {
        regionname: '',
        cityname: '',
        zipcode: '',
        country: '',
      },
    };
  },
  async created() {
    const fetchedVilles = await this.fetchVilles()
    this.villes = fetchedVilles.data.slice(0,100)
  },
  methods: {
    async fetchVilles() {
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      const response = await LocationController.getInstance().fetchLocations(token)
      return response
    },
    async addVille() {
      console.log('Adding Ville:', this.newVille.regionname, this.newVille.cityname, this.newVille.zipcode, this.newVille.country);
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      const response = await LocationController.getInstance().createLocation(
        this.newVille.regionname,
        this.newVille.cityname,
        this.newVille.zipcode,
        this.newVille.country, token)
        console.log("resp adding ville contr",response)
      if (response.status === 200){
        const id=this.newVille.id
        const displayname = this.newVille.cityname + ', ' + this.newVille.regionname + ', ' + this.newVille.country
        this.villes.push({"id": id, "displayname": displayname, "zipcode": `${this.newVille.zipcode}`}) // Push Ville to the list
        this.newVille = {
        regionname: '',
        cityname: '',
        zipcode: '',
        country: ''}; // Reset form
      }
    },
    async deleteVille(event, id) {
      if(confirm('Êtes-vous sûr de vouloir supprimer cette ville ? Cette action est irréversible.')) {
        console.log('Deleting Ville:', id)
        const tokenCookie = useCookie('token')
        const token = tokenCookie.value
        const response = await LocationController.getInstance().deleteLocation(id, token)
        if (response.status === 200){
          const index = this.villes.findIndex(ville => ville.id === id);
          if (index !== -1) {
            this.villes.splice(index, 1);
          }
        }
      }
    },
  }
};

</script>

