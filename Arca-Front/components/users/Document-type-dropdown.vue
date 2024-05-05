<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton class="inline-flex justify-right gap-x-1 rounded-md bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
        <div class="flex flex-row justify-center space-x-3">
          <div class="basis-1/9  content-center ">
            <FolderIcon class="w-6 h-6 "/>
          </div>
          <div class="flex justify-left lg:text-base md:text-xs ">{{ selectedOption }}</div>
        </div>
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <MenuItems class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div class="py-1" v-for="(item, index) in liste" :key=index >
        <MenuItem as="div" @click="handleSelect(item.name)" class="border">
          <option :value=item.name>{{ item.name }}</option>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script >
import { Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue';
import { ChevronDownIcon, FolderIcon} from '@heroicons/vue/20/solid';
import { ref } from 'vue';

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
    FolderIcon
  }, 
  props:{
    liste :{
      type: Array,
      required: false,
    },
  },
  mounted() {
console.log(this.liste);
  },
  data () {
    return {
      selectedOption: 'Choisir type de document',
    };
  },
  methods: {
    handleSelect(value) {
      this.selectedOption = value;
    },
    getValue() {
      return this.selectedOption;
    },
  },
};


</script>
