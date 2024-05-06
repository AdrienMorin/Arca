  <template>
      <div class="flex-col w-full ounded-md " v-if="isPersonne">
          <input v-model="search" @input="onChange" type="text" class=" rounded-t-md  w-full" />
          <div v-show="isOpen" class="absolute z-50 w-full rounde-md">
              <div v-for="(result, index) in results" :key="index" class="border bg-white rounded-md relative item-block">
                  <button @click="clickSuggestionUnique(result)" class="border relative w-full">{{ result.displayname }}</button>
              </div>
          </div>
          <div class="flex-col  place-content-start mx-auto overflow-auto rounded-b-md max-h-40  border bg-[#D9E1EC]">
          <div  v-for="(personne,index) in personnes" :key="index" >
            <div class="flex flex-grow border bg-gray-50 shadow">
                    <div class="flex-grow ">
                      <div v-if="isPersonne" class="relative lg:left-3 	text-black text-xl" >{{personne.displayname}}</div>
                      <div v-else class="relative lg:left-2 	text-black text-ml" >{{personne}}</div>
                    </div>
                  <div class="flex-none w-1/5  flex items-center justify-center">
                    <button @click="deletePersonne(index,personne.id)" class="text-gray-600 transition  hover:text-white">
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

      <div class="flex-col w-full ounded-md" v-else>
        <input v-model="search" @input="onChange" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        <div v-show="isOpen" class="absolute z-50 w-1/2 rounde-md">
            <div v-for="(result, index) in results" :key="index" class="border bg-white rounded-md relative w-full h-9 item-block">
                <button @click="clickSuggestionUnique(result)" class="relative w-full mt-1">{{ result.displayname }}</button>
            </div>
        </div>
        <div class="flex-col  place-content-start mx-auto overflow-auto rounded-b-md max-h-52  border bg-[#D9E1EC]">
          <div  v-for="(personne,index) in personnes" :key="index" >
            <div class="flex flex-grow border bg-[#D9E1EC]  ">
              <div class="flex-grow ">
                <div class="relative lg:left-2 	text-black text-ml mt-1" >{{personne.displayname}}</div>
              </div>
              <div class="flex-none  flex items-center justify-center h-9">
                <button @click="deletePersonne(index,personne.id)" class="text-gray-600 transition hover:text-white">
                  <span class="sr-only">Remove item</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="this.isHovered ? '#027BCE' : '#000000'" class="w-6 h-6" @mouseover="this.isHovered = true" @mouseleave="this.isHovered = false">
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
          required: true,
          default: () => [],
        },
        isPersonne: {
          type: Boolean,
          required: false,
          default: false,
        },
        oldItems: {
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
          personnes: this.oldItems,
          isHovered: true,
        };
      },

      methods: {
      filterResults() {
        let array=null;
        if(this.isPersonne==true){
          array= this.personnes.map(personne => personne.displayname);
          this.results = this.items.filter(item => item.displayname.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && !array.includes(item.displayname)).slice(0, 5);
        }else{
          array= this.personnes;
          this.results = this.items.filter(item => item.displayname.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && !array.includes(item.displayname)).slice(0, 5);
        }
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
            if(this.isPersonne){
              this.search = value.displayname;
              this.addPersonne(value);
              this.isOpen = false;
              this.search = '';
            }else{
              this.search = value;
              this.addPersonne(value);
              this.isOpen = false;
              this.search = '';
            }

          },
        clickSuggestionUnique(value) {
          if(this.isPersonne){
            this.search = value.displayname;
            this.personnes = [];
            this.addPersonne(value);
            this.isOpen = false;
            this.search = '';
          }else{
            this.search = value;
            this.personnes = [];
            this.addPersonne(value);
            this.isOpen = false;
            this.search = '';
          }

        },
          getSearch() {
              return this.search;
          },
          SetSearch(value) {
              this.search = value;
          },
          addPersonne(text){
            this.personnes.push(text);

        // Push the new blog post to the array
      },
        deletePersonne(index, id){
          console.log('fasa5ID',index); // Remove the personne from the list
          console.log('fasa5:', id);
          this.personnes.splice(index, 1);

      },
      getListe(){
        return this.personnes;
      },




    }
  }
    </script>
