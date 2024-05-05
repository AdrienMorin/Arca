<template>
  <div class="pt-8">
    <div class="w-full mt-16">
      <div class="text-center mb-4">
        <h1 class="text-3xl font-medium">Recherche</h1>
      </div>
      <div class="relative mb-8 w-3/4 mx-auto">
        <input v-model="searchQuery" type="text" id="query" class="form-input w-full rounded-[10px] pr-10 px-4 py-2" placeholder="Rechercher">
        <button class="absolute right-0 top-0 mt-2 mr-2 text-xl">🔍</button>
      </div>
      <div class="text-center mb-4">
        <h1 class="text-3xl font-medium">Filtres</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        <div class="flex flex-col w-1/2">
          <div class="flex items-center mb-2">
            <label class="px-4 font-bold -ml-4">Date</label>
          </div>
          <DatePicker />
          <div class="flex flex-col mt-4 w-full">
            <label class="block mb-2 font-bold w-120">Lieu</label>
            <input type="text" class="form-input max-w-[464px] px-8 py-2 border rounded-lg" placeholder="Rentrer un lieu">
          </div>
        </div>
        <div class="flex flex-col w-1/2">
          <label class="block mb-2 font-bold mt-4">Type de document</label>
          <select class="form-select w-full px-6 py-2 appearance-none bg-white rounded-lg border text-gray-500">
            <option class="rounded-lg">Choisir le type de document</option>
          </select>
          <label class="block mb-2 mt-4 font-bold">Personne</label>
          <input type="text" class="form-input w-full px-8 py-2 border rounded-lg" placeholder="Rentrer une personne">
        </div>
      </div>
      <div class="text-center mt-12">
        <button @click="emitSearchEvent" class="bg-blue-600 text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]">Lancer la recherche</button>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "~/components/search/DatePicker.vue";

export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  components: {
    DatePicker
  },
  methods: {
    emitSearchEvent() {
      this.$emit('search-event', this.searchQuery)
    }
  }
}
</script>

