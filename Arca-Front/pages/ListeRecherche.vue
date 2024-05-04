<template>
  <div class="pt-8">
    <div class="flex flex-wrap">
      <!-- Recherche Section (Left) -->
      <div class="w-full md:w-1/2">
        <div class="relative mb-2 mt-5 w-3/4 mx-auto">
          <input type="text" class="form-input w-full rounded-[10px] pr-10 px-4 py-2" placeholder="Rechercher">
          <button class="absolute right-0 top-0 mt-2 mr-2 text-xl">🔍</button>
        </div>
        <div class="text-center mt-6">
          <nuxt-link to="/ListeRecherche" class="bg-[#007BFF] text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]">Lancer la recherche</nuxt-link>
        </div>
      </div>
      <!-- Recherche Intelligente Section (Right) -->
      <div class="w-full md:w-1/2">
        <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
          <div class="flex flex-col w-full px-2">
            <div class="flex items-center">
              <label class="px-2 text-sm font-bold">Date</label>
              <button @click="dateMode = 'simple'" :class="{'bg-blue-500 text-white': dateMode === 'simple'}" class="px-3 py-1 text-sm rounded-l hover:shadow-lg">Simple</button>
              <button @click="dateMode = 'periode'" :class="{'bg-blue-500 text-white': dateMode === 'periode'}" class="px-3 py-1 text-sm rounded-r hover:shadow-lg">Période</button>
            </div>
            <div v-if="dateMode === 'simple'" class="mt-2 border rounded-[10px] max-w-[260px] px-4 py-1">
              <datepicker v-model="selected" placeholder="Date"/>
            </div>
            <div class="flex gap-3" v-if="dateMode === 'periode'">
              <div class="mt-2 border rounded-[10px] max-w-[131px] px-4 py-1">
                <datepicker v-model="startDate" placeholder="Date de début" class="w-full"/>
              </div>
              <div class="mt-2 border rounded-[10px] max-w-[131px] px-4 py-1">
                <datepicker v-model="endDate" placeholder="Date de fin" class="w-full"/>
              </div>
            </div>
            <div class="flex flex-col mt-3 w-full">
              <label class="block mb-1 text-sm font-bold">Lieux</label>
              <input type="text" class="form-input max-w-[260px] px-6 py-1 border rounded-lg" placeholder="Rentrer un lieu">
            </div>
          </div>
          <div class="flex flex-col w-full px-2">
            <label class="block mb-1 text-sm font-bold mt-3">Type de document</label>
            <select class="form-select max-w-[260px] px-6 py-1 appearance-none bg-white rounded-lg border text-gray-500">
              <option>Choisir le type de document</option>
            </select>
            <label class="block mb-1 mt-3 text-sm font-bold">Personnes</label>
            <input type="text" class="form-input max-w-[260px] px-6 py-1 border rounded-lg" placeholder="Rentrer une personne">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full flex justify-center mt-14">
    <div class="w-4/5">
      <table class="table-auto w-full text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="w-1/5 px-4 py-2">Type</th>
            <th class="w-1/5 px-4 py-2">Titre</th>
            <th class="w-1/5 px-4 py-2">Lieu</th>
            <th class="w-1/5 px-4 py-2">Personnes</th>
            <th class="w-1/5 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in documents" :key="index">
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.name }}</td>
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.towns }}</td>
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.people }}</td>
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import personne_menu from '~/components/users/personne_menu.vue';
import display_files from '~/components/users/display_files.vue';
import { MicrophoneIcon } from "@heroicons/vue/24/outline";
import Navbar from '~/components/users/Navbar.vue';
import UserController from '~/services/userController.ts';

export default {
  components: {
    Datepicker,
  },
  async created() {
    await this.getSearchResults();

  },
  data() {
    return {
      selected: new Date('1944-01-01'),
      startDate: null,
      endDate: null,
      locale: 'fr',
      to: new Date(),
      from: new Date('2016-01-01'),
      dateMode: 'simple',
      documents: [
        { type: 'PDF', title: 'La complainte du partisannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', location: 'Ferme des 3 roues', person: 'Jean Dupont', date: '02/09/1945' },
        { type: 'PDF', title: 'La ,jhbj du partisannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', location: 'Ferme des 3 roues', person: 'Jean Dupont', date: '02/09/1945' },

      ],
      query: 'certificat',
      results:'',
    } 
  },
  methods: {
      async getSearchResults() {
        const tokenCookie = useCookie('token');
        const token= tokenCookie.value;
        const response = await UserController.getInstance().getSearchResults(token,this.query);
        console.log(response.data);
        console.log(response.data.);
      }
    },
}
definePageMeta({
  middleware: 'auth',
});
</script>

