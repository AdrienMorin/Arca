<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton class="inline-flex justify-right gap-x-1 rounded-md bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
        <div class="flex flex-row justify-center space-x-3">
          <div class="basis-1/9  content-center ">
            <img src="~/assets/folder.png" alt="folder" class="w-4 h-4 ">
          </div>
          <div class="flex justify-left lg:text-base md:text-xs ">{{ selectedOption }}</div>
        </div>
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <MenuItems class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div class="py-1">
        <MenuItem as="div" @click="handleSelect('Lettre')">
          <option value="Lettre">Lettre</option>
        </MenuItem>
        <MenuItem as="div" @click="handleSelect('Article')">
          <option value="Article">Article</option>          
        </MenuItem>
        <MenuItem as="div" @click="handleSelect('Image')">
          <option value="Image">Image</option>          
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue';

let selectedOption = ref('Choisir type de document');

const handleSelect = (value) => {
  selectedOption.value = value;
};
</script>
