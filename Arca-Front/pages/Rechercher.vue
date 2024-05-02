<script>
import Datepicker from 'vue3-datepicker'
export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      selected: new Date('1944-01-01'),
      startDate: null,
      endDate: null,
      locale: 'fr',
      to: new Date(),
      from: new Date('2016-01-01'),
      dateMode: 'simple'
    }
  }
}
definePageMeta({
  middleware:'auth',
});
</script>

<template>
  <div class="pt-8">
    <div class="w-full mt-16">
      <div class="text-center mb-4">
        <h1 class="text-3xl font-bold">Recherche</h1>
      </div>
      <div class="relative mb-8 w-3/4 mx-auto">
        <input type="text" class="form-input w-full rounded-[10px] pr-10 px-4 py-2" placeholder="Rechercher">
        <button class="absolute right-0 top-0 mt-2 mr-2 text-xl">🔍</button>
      </div>
      <div class="text-center mb-4">
        <h1 class="text-3xl font-bold">Recherche intelligente</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        <div class="flex flex-col w-1/2">
          <div class="flex items-center mb-2">
            <label class="px-4 font-bold -ml-4">Date</label>
            <button @click="dateMode = 'simple'" :class="{'bg-blue-500': dateMode === 'simple'}" class="px-4 py-1 rounded-l hover:shadow-lg">Simple</button>
            <button @click="dateMode = 'periode'" :class="{'bg-blue-500 hover:shadow-lg': dateMode === 'periode'}" class="px-4 py-1 rounded-r hover:shadow-lg">Période</button>
          </div>
          <div v-if="dateMode === 'simple'" class="mt-2 border rounded-[10px] px-4 py-2">
            <datepicker v-model="selected" placeholder="Date"/>
          </div>
          <div class="flex gap-2" v-if="dateMode === 'periode'">
            <div class="mt-2 border rounded-[10px] px-4 py-2">
              <datepicker v-model="startDate" placeholder="Date de début"/>
            </div>
            <div class="mt-2 border rounded-[10px] px-4 py-2">
              <datepicker v-model="endDate" placeholder="Date de fin"/>
            </div>
          </div>
          <div class="flex flex-col mt-4 w-full">
            <label class="block mb-2 font-bold w-120">Lieux</label>
            <input type="text" class="form-input max-w-[464px] px-8 py-2 border rounded-lg" placeholder="Rentrer un lieu">
          </div>
        </div>
        <div class="flex flex-col w-1/2">
          <label class="block mb-2 font-bold mt-4">Type de document</label>
          <select class="form-select w-full px-6 py-2 appearance-none bg-white rounded-lg border text-gray-500">
            <option class="rounded-lg">Choisir le type de document</option>
          </select>
          <label class="block mb-2 mt-4 font-bold">Personnes</label>
          <input type="text" class="form-input w-full px-8 py-2 border rounded-lg" placeholder="Rentrer une personne">
        </div>
      </div>
      <div class="text-center mt-12">
        <nuxt-link to="/ListeRecherche" class="bg-[#007BFF] text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]">Lancer la recherche</nuxt-link>
      </div>
    </div>
  </div>
</template>


