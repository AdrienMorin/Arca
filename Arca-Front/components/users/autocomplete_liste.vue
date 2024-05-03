<template>
    <div class="flex-col w-3/4 space-y-0 rounded-md">
        <input v-model="search" @input="onChange" type="text" class=" rounded-t-md  w-full" />
        <div v-show="isOpen" class="absolute z-50 w-5/6 rounde-md">
            <div v-for="(result, index) in results" :key="index" class="border bg-white rounded-md relative item-block">
                <button @click="clickSuggestion(result)" class="border relative w-full">{{ result }}</button>
            </div>
        </div>
        <div class="flex-col gap-4 place-content-start mx-auto overflow-auto rounded-b-md max-h-40 min-h-10 bg-[#D9E1EC]">
        <div  v-for="(personne,index) in personnes" :key="index" class="h-6" >
          <div class="flex flex-row min-h-10 border bg-[#D9E1EC]  ">
                <div class=" flex-auto">
                  <div class="relative lg:left-3 	text-black text-xl" >{{personne.nom}}</div>
                </div>
                <div class="flex-none w-1/5  flex items-center justify-center">           
                  <button @click="deletePersonne(index,personne.id)" class="text-gray-600 transition border border-black hover:text-white">
                    <span class="sr-only">Remove item</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="isHovered ? '#027BCE' : '#000000'" class="w-6 h-6" @mouseover="isHovered = true" @mouseleave="isHovered = false">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
          </div>
      </div>
     
        
    </div>
    
  </template>
  
  <script>
  import personne from '~/components/users/ajout_personne.vue';

  export default {
    name: 'SearchAutocomplete',
    components: {
      personne,
    },
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
        personnes: [],
      };
    },
    
    methods: {
    filterResults() {
      const array= this.personnes.map(personne => personne.nom);
      console.log(array); 
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && !array.includes(item)).slice(0, 5);

    },
      onChange() {
        if(this.search==''){
            this.isOpen = false;
        } else {
        this.filterResults();
        this.isOpen = true;
        }
        console.log(this.personnes);
      }, 
        clickSuggestion(value) {
            this.search = value;
            this.addPersonne(value);
            this.isOpen = false;
            this.search = '';
        },
        getSearch() {
            return this.search;
        },
        SetSearch(value) {
            this.search = value;
        },
        addPersonne(text){
      const newPersonne = {
        nom: text,
        id: Math.random().toString(36).substr(2, 9),
      };
      // Push the new blog post to the array
      this.personnes.push(newPersonne);
    },
      deletePersonne(index, id){
        console.log('fasa5ID',index); // Remove the personne from the list
        console.log('fasa5:', id);
        this.personnes.splice(index, 1);
        
    },

    
  }
}
  </script>