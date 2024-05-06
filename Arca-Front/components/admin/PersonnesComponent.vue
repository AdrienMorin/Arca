<template>
  <!-- User Section -->
  <div class="flex flex-col mb-10">

    <div class="w-3/4 mr-10 ml-10">
      <h2 class="font-bold text-2xl mb-4 text-center">Personnes</h2>
      <div class="bg-gray-50 shadow overflow-hidden rounded-md" style="max-height: 250px; overflow-y: auto;">
        <ul class="divide-y divide-gray-200">
          <!-- Header row -->
          <li class="px-6 py-4 bg-gray-200 flex">
            <div class="w-1/5 text-sm font-medium text-gray-900">Id</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Prénom</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Nom</div>
            <div class="w-2/5 text-sm font-medium text-gray-900">Ville</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Rôle</div>
          </li>
          <!-- User rows -->
          <li v-for="personne in personnes" :key="personne.id" class="px-10 py-4 flex">
            <div class="w-1/5 text-sm text-gray-900">{{ personne.id }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ personne.firstname }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ personne.lastname }}</div>
            <div class="w-2/5 text-sm text-gray-500">{{ personne.location }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ personne.role }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="w-3/4 mr-10 ml-10 mt-16">
      <h2 class="font-bold text-2xl mb-4 text-center">Ajouter une personne</h2>
      <div class="bg-white shadow overflow-hidden rounded-md p-2">
        <form @submit.prevent="addPersonne">
          <div class="mb-4 flex justify-between">
            <div class="w-1/2 pr-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="lastname">Nom</label>
              <input v-model="newPersonne.lastname" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
            <div class="w-1/2 pl-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="firstname">Prénom</label>
              <input v-model="newPersonne.firstname" type="text" id="firstname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
          </div>
          <div class="mb-4 ">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="location">Ville</label>
            <div class="object-cover">
              <autocomplete_liste :items="cities" ref="lieuAajoute"/>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="role">Rôle</label>
            <input v-model="newPersonne.role" type="text" id="role" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="flex items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="w-3/4 mr-10 ml-10 mt-16 bg-white shadow overflow-hidden rounded-md p-2">
      <h2 class="font-bold text-2xl mb-4 text-center">Modifier une personne</h2>
      <div class="flex justify-center flex-row ">
        <div class="mb-4 ">
          <label class="block text-gray-700 text-sm font-bold mb-1" for="id">Id de la personne à modifier</label>
          <input v-model="modifiedPersonne.id" type="number" id="id" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
        <div class="flex items-center justify-center ml-6">
          <button v-if="showModifyButton" @click="handleModify" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Modifier
          </button>
        </div>
        </div>
      <div v-if="showModifyForm">
        <form @submit.prevent="modify">
          <div class="mb-4 flex justify-between">
            <div class="w-1/2 pr-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="lastname">Nom</label>
              <input v-model="modifiedPersonne.lastname" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
            <div class="w-1/2 pl-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="firstname">Prénom</label>
              <input v-model="modifiedPersonne.firstname" type="text" id="firstname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="role">Rôle</label>
            <input v-model="modifiedPersonne.role" type="text" id="role" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4 ">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="location">Ville</label>
            <autocomplete_liste :items="cities" :oldItems="[this.selectedCityModifier]" ref="lieuAmodifier"/>
          </div>
          <div class="flex items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Modifier
            </button>
          </div>
        </form>
      </div>
      </div>


    </div>
  </template>

<script>
import PersonneController from '~/services/personneController'
import LocationController from '~/services/locationController'
import autocomplete_liste from '~/components/admin/autocomplete_liste_admin.vue';

export default {
  components: {
    autocomplete_liste
  },
  data() {
    return {
      personnes: [],
      newPersonne: {
        firstname: '',
        lastname: '',
        location: null,
        role: ''
      },
      modifiedPersonne: {
        firstname: '',
        lastname: '',
        location: null,
        role: '',
        id: null
      },
      showModifyForm: false,
      showModifyButton: true,
      cities: [],
      selectedCityAjouter: null,
      selectedCityModifier: null
    };
  },
  async created() {
    const fetchedPersonnes = await this.fetchPersonnes()
    this.personnes = fetchedPersonnes.data
    const fetchedCities = await this.fetchCities();
    this.cities = fetchedCities.data;
    console.log('cities',this.cities)
    this.cities = this.cities.map(city => ({ displayname: city.displayname, id: city.id }));
    console.log('cities mapped',this.cities)
  },
  methods: {
    async fetchPersonnes() {
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      return await PersonneController.getInstance().fetchPersonnes(token)
    },
    async addPersonne() {
      this.getSelectedCityAjouter()
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      try{
        const response = await PersonneController.getInstance().createPersonne(this.newPersonne.firstname, this.newPersonne.lastname, this.newPersonne.location, this.newPersonne.role, token)
        if (response.status === 200) {
          this.newPersonne.location = this.selectedCity.displayname
          this.personnes.push(this.newPersonne)
          this.newPersonne = {
            firstname: '',
            lastname: '',
            location: null,
            role: ''
          }
          this.$snackbar.add({
            text: 'Personne ajoutée avec succès',
            type: 'success'
          })
        }
      } catch (error) {
        console.error(error)
        if(error.response.status === 400){
          this.$snackbar.add({
            text: 'La personne existe déjà',
            type: 'error'
          })
        }else{
          this.$snackbar.add({
            text: 'Erreur lors de l\'ajout de la personne',
            type: 'error'
          })
        }
      }
    },
    getSelectedCityAjouter(){
      this.selectedCityAjouter=this.$refs.lieuAajoute.getListe()[0];
      this.newPersonne.location=this.selectedCityAjouter.id;
    },
    getSelectedCityModifier(){
      this.selectedCityModifier=this.$refs.lieuAmodifier.getListe()[0];
      this.modifiedPersonne.location=this.selectedCityModifier.id;
    },
    async fetchCities() {
      const tokenCookie = useCookie('token');
      const token = tokenCookie.value;
      return await LocationController.getInstance().fetchLocations(token);
    },
    async handleModify() {
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      const modifiedPersonneResponse = await PersonneController.getInstance().getPersonneById(this.modifiedPersonne.id, token)
      this.selectedCityModifier = this.cities.find(city => city.id === modifiedPersonneResponse.data.location)
      this.modifiedPersonne = {
        firstname: modifiedPersonneResponse.data.firstname,
        lastname: modifiedPersonneResponse.data.lastname,
        location: modifiedPersonneResponse.data.location,
        role: modifiedPersonneResponse.data.role,
        id: modifiedPersonneResponse.data.id
      }
      console.log(this.modifiedPersonne)
      this.showModifyForm = !this.showModifyForm
      this.showModifyButton = !this.showModifyButton
    },
    async modify() {
      console.log("modification")
      this.getSelectedCityModifier()
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      const response = await PersonneController.getInstance().updatePersonne(this.modifiedPersonne.firstname, this.modifiedPersonne.lastname, this.modifiedPersonne.location, this.modifiedPersonne.role, this.modifiedPersonne.id, token)
      console.log(response)
      try{
        if (response.status === 200) {
          const index = this.personnes.findIndex(personne => personne.id === this.modifiedPersonne.id);
          if (index !== -1) {
            this.personnes.splice(index, 1);
          }
          this.modifiedPersonne.location = this.selectedCityModifier.displayname
          this.personnes.push(this.modifiedPersonne)
          this.modifiedPersonne = {
            firstname: '',
            lastname: '',
            location: null,
            role: '',
            id: null
          }
          this.showModifyForm = !this.showModifyForm
          this.showModifyButton = !this.showModifyButton
          this.$snackbar.add({
            text: 'Personne modifiée avec succès',
            type: 'success'
          })
        }
      } catch (error) {
        console.error(error)
        if(error.response.status === 404){
          this.$snackbar.add({
            text: 'La personne n\'existe pas',
            type: 'error'
          })
        }else if(error.response.status === 400){
          this.$snackbar.add({
            text: 'La nouvelle personne existe déjà',
            type: 'error'
          })
          }else{
            this.$snackbar.add({
              text: 'Erreur lors de la modification de la personne',
              type: 'error'
            })
          }
      }
    }
  }
}
</script>
