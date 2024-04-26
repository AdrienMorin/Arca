<template>
  <div class="pt-8">
    <div class="w-full">
      <div class="text-center mb-4">
        <h1 class="text-3xl font-bold">Recherche</h1>
      </div>
      <div class="relative mb-8 w-3/4 mx-auto">
        <input type="text" class="form-input w-full rounded-[10px] pr-10 px-4 py-2" placeholder="Rentre ce que vous voulez">
        <button class="absolute right-0 top-0 mt-2 mr-2 text-xl">🔍</button>
      </div>
      <div class="text-center mb-4">
        <h1 class="text-3xl font-bold">Recherche intelligente</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
        <div class="flex flex-col w-1/2">
          <div class="flex items-center mb-2">
            <label class="px-4">Date</label>
            <button @click="dateMode = 'simple'" :class="{'bg-blue-500': dateMode === 'simple'}" class="px-4 py-1 rounded-l">Simple</button>
            <button @click="dateMode = 'periode'" :class="{'bg-blue-500': dateMode === 'periode'}" class="px-4 py-1 rounded-r">Période</button>
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
          <div class="flex flex-col mt-4">
            <label class="block mb-2">Lieu</label>
            <input type="text" class="form-input w-full px-8 py-2" placeholder="Rentre un lieu">
          </div>
        </div>
        <div class="flex flex-col w-1/2">
          <label class="block mb-2">Type de document</label>
          <select class="form-select w-full px-6 py-2">
            <option>Choisir le type de document</option>
          </select>
          <label class="block mb-2 mt-4">Personne</label>
          <input type="text" class="form-input w-full px-8 py-2" placeholder="Rentre une personne">
        </div>
      </div>
      <div class="text-center mt-4">
        <button class="bg-[#007BFF] text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]">Lancer la recherche</button>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'

export default {
  components: {
    Datepicker
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
</script>