<template>
  <!-- User Section -->
  <div class="flex flex-col mb-10">
    <div class="w-3/4 mr-10 ml-10">
      <h2 class="font-bold text-2xl mb-4 text-center">Ajouter une personne</h2>
      <div class="bg-white shadow overflow-hidden rounded-md p-2">
        <form @submit.prevent="addUser">
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
            <input v-model="newPersonne.location" type="text" id="location" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
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

    <div class="w-3/4 mr-10 ml-10 mt-16">
      <h2 class="font-bold text-2xl mb-4 text-center">Personnes</h2>
      <div class="bg-gray-50 shadow overflow-hidden rounded-md" style="max-height: 250px; overflow-y: auto;">
        <ul class="divide-y divide-gray-200">
          <!-- Header row -->
          <li class="px-6 py-4 bg-gray-200 flex">
            <div class="w-1/5 text-sm font-medium text-gray-900">Nom</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Prénom</div>
            <div class="w-2/5 text-sm font-medium text-gray-900">Ville</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Rôle</div>
            <div class="w-12"></div>
          </li>
          <!-- User rows -->
          <li v-for="personne in personnes" :key="personne.id" class="px-10 py-4 flex">
            <div class="w-1/5 text-sm text-gray-900">{{ personne.firstname }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ personne.lastname }}</div>
            <div class="w-2/5 text-sm text-gray-500">{{ personne.location }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ personne.role }}</div>
            <div class="w-12">
              <button class="text-red-500 hover:text-red-700">
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
import PersonneController from '~/services/personneController'

export default {
  data() {
    return {
      personnes: [],
      newPersonne: {
        firstname: '',
        lastname: '',
        location: '',
        role: ''
      }
    };
  },
  async created() {
    const fetchedPersonnes = await this.fetchPersonnes()
    this.personnes = fetchedPersonnes.data
  },
  methods: {
    async fetchPersonnes() {
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      return await PersonneController.getInstance().fetchPersonnes(token)
    }
  }

};

</script>
