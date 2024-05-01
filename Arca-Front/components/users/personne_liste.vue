<template>
    <div class="flex-col w-3/4 space-y-1">
        <input v-model="search" @input="onChange" type="text" class="rounded-md  w-full" />
        <div v-show="isOpen" class="absolute z-50 w-5/6 rounde-md">
            <div v-for="(result, index) in results" :key="index" class="border bg-white rounded-md relative item-block">
                <button @click="clickSuggestion(result)" class="border relative w-full">{{ result }}</button>
            </div>
        </div>
    </div>
    
  </template>
  
  <script>
  export default {
    name: 'SearchAutocomplete',
    props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    data() {
      return {
        search: '',
        results: [],
        isOpen: false,
      };
    },
    methods: {
    filterResults() {
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1).slice(0, 5);
    },
      onChange() {
        if(this.search==''){
            this.isOpen = false;
        } else {
        this.filterResults();
        this.isOpen = true;
        }
      }, 
        clickSuggestion(value) {
            this.search = value;
            this.isOpen = false;
        },
        getSearch() {
            return this.search;
        },
        SetSearch(value) {
            this.search = value;
        },
  
  }
}
  </script>