<template>
  <div class="pt-8">
    <div class="flex flex-wrap">
      <!-- Recherche Section (Left) -->
      <div class="w-full md:w-1/2">
        <div class="relative mb-2 mt-5 w-3/4 mx-auto">
          <input v-model="searchInput" type="text" id="query" class="form-input w-full rounded-[10px] pr-10 px-4 py-2" placeholder="Rechercher">
          <button class="absolute right-0 top-0 mt-2 mr-2 text-xl">🔍</button>
        </div>
        <div class="text-center mt-6">
          <button @click="emitSearchEvent" class="bg-blue-600 text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]">Lancer la recherche</button>
        </div>
      </div>
      <!-- Recherche Intelligente Section (Right) -->
      <div class="w-full md:w-1/2">
        <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
          <div class="flex flex-col w-full px-2">
            <div class="flex items-center">
              <label class="px-2 text-sm font-bold">Date</label>
            </div>
            <DatePicker />

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
import UserController from '~/services/userController.ts';
import DatePicker from "~/components/search/DatePicker.vue";

export default {
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  components: {
    DatePicker,
    Datepicker,
  },
  async created() {
    console.log('searchQuery : ' + this.searchQuery);
    this.searchInput = this.searchQuery
    console.log('searchInput : ' + this.searchInput);
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
      documents: [],
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
      }
    },
    emitSearchEvent() {
      this.getSearchResults()
    }
  },
  watch: {
    searchQuery(newValue) {
      this.searchInput = newValue;
    }
  }
}
</script>

