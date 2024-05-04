<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
import DatePicker from "~/components/users/DatePicker.vue";

function isRangeSelected (duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange (duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}
</script>


<template>
  <div class="pt-8">
    <div class="w-full mt-16">
      <div class="text-center mb-4">
        <h1 class="text-3xl font-medium">Recherche</h1>
      </div>
      <div class="relative mb-8 w-3/4 mx-auto">
        <input type="text" class="form-input w-full rounded-[10px] pr-10 px-4 py-2" placeholder="Rechercher">
        <button class="absolute right-0 top-0 mt-2 mr-2 text-xl">🔍</button>
      </div>
      <div class="text-center mb-4">
        <h1 class="text-3xl font-medium">Recherche intelligente</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        <div class="flex flex-col w-1/2">
          <div class="flex items-center mb-2">
            <label class="px-4 font-bold -ml-4">Date</label>
          </div>
          <UPopover :popper="{ placement: 'bottom-start' }" class="mb-5">
            <UButton icon="i-heroicons-calendar-days-20-solid">
              {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
            </UButton>

            <template #panel="{ close }">
              <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                <DatePicker v-model="selected" @close="close" class="w-full"/>
              </div>
            </template>
          </UPopover>
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
        <NuxtLink to="/ListeRecherche" class="bg-blue-600 text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]">Lancer la recherche</NuxtLink>
      </div>
    </div>
  </div>
</template>
