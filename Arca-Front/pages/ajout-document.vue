
<script lang="ts">
  
  import doctype from '~/components/users/Document-type-dropdown.vue';
  import personne_menu from '~/components/users/personne_menu.vue';
  import description from '~/components/users/description_box.vue';
  import autocomplete_liste from '~/components/users/autocomplete_liste.vue';
  import Popup from '~/components/users/popup.vue';
  import UserController from '~/services/userController.ts';
  import { useFileStore } from '~/fileTransfer.js';
  import PersonneController from '~/services/personneController'
  import LocationController from '~/services/locationController'
  import CategorieController from '~/services/categorieController'
  import display_files from '~/components/users/display_files copy.vue';
  import Datepicker from '~/components/search/DatePicker.vue'
  

  export default {
    components: {
      Popup, 
      doctype,
      personne_menu,
      description,
      autocomplete_liste,
      display_files,
      Datepicker,
    
    },
    mounted() {
    },
     data() {
      return {
        nom: '', // Initialize with an empty string
        File: '',
        titre: '',
        description: '',
        retrancription: '',
        date: {
          start:'',
          end:'',
        },
        citiesListe:'',
        typeDoc: '',
        personneListe:'',
        titreDoc: '',
        personnes: [],
        cities: [],
        selectedPersonne: '',
        selectedCities: '',
        categories:[],
        mongoDB: '',
      };
    },
    async created() {
    this.getDocument();
    //console.log('Fetching Personnes...');
    const fetchedPersonnes = await this.fetchPersonnes();
    this.personnes = fetchedPersonnes.data;
   // console.log('Personnes fetched:', this.personnes);
    const fetchedCities = await this.fetchCities();
    this.cities = fetchedCities.data;
    this.cities = this.cities.map(city => city.displayname);
    console.log('fetch categories');
    const fetchedCategories = await this.fetchCategories();
    this.categories = fetchedCategories.data;
    },
  
      
    methods: {
      async fetchCategories() {
      const tokenCookie = useCookie('token');
      const token = tokenCookie.value;
      return await CategorieController.getInstance().fetchCategories(token);
    },
    async fetchCities() {
      const tokenCookie = useCookie('token');
      const token = tokenCookie.value;
      return await LocationController.getInstance().fetchLocations(token);
    },
    async fetchPersonnes() {
      const tokenCookie = useCookie('token');
      const token = tokenCookie.value;
      return await PersonneController.getInstance().fetchPersonnes(token);
    },
    getListCitier(){
      this.selectedCities=this.$refs.lieuAajoute.getListe();      
    },
    getListPersonne(){
      this.selectedPersonne=this.$refs.personneAajoute.getListe();
      this.selectedPersonne=this.selectedPersonne.map(personne => personne.id);
    },
    getSelectedCategorie(){
      return this.$refs.docType.getValue();
    },
    Ajouter_personne(){
        if(this.$refs.personneAajoute.search != ''){
        this.$refs.menu_personne.addPersonne(this.$refs.personneAajoute.search);
        this.$refs.personneAajoute.search = '';
      }
    },

    refreshPage() {
      location.reload();
    }, 
    flipAnnuler() {
    this.$refs.popupAnnul.mainshow = !this.$refs.popupAnnul.mainshow;
     }, 
    flipAjouter() {
      this.$refs.popupAjout.mainshow = !this.$refs.popupAjout.mainshow;
    },
    flipEnregistrer() {
      this.$refs.popupEnregistrer.mainshow = !this.$refs.popupEnregistrer.mainshow;
    },
    
    async uploadDocument(db) {
      console.log(this.getSelectedCategorie());
        this.getListCitier();
        this.getListPersonne();
        this.citiesListe='';
        this.personneListe='';
        for (let i = 0; i < this.selectedCities.length; i++) {
          this.citiesListe+=this.selectedCities[i];
          if(i!=this.selectedCities.length-1){
            this.citiesListe+=';';
          }
        }
        for (let i = 0; i < this.selectedPersonne.length; i++) {
          this.personneListe+=this.selectedPersonne[i];
          if(i!=this.selectedPersonne.length-1){
            this.personneListe+=';';
          }
        }
        this.description=this.$refs.description.description;
        this.retranscription=this.$refs.retranscription.description;
        this.mongoDB = db;
        const tokenCookie = useCookie('token');
        const token= tokenCookie.value;

 
        console.log(this.File);
      const response = await UserController.getInstance().uploadDocument(token,
      this.File,this.titre,this.description,this.retranscription,this.date,this.citiesListe,this.personneListe,this.mongoDB);
      
      
      // redirect to homepage if user is authenticated
      if (response.status === 200) {
        console.log('Vous êtes connecté')
        this.flipAjouter();
        //this.$router.push('/rechercher');
      }
    },
    getDocument() {
      console.log('Checking document...');
      const fileStore = useFileStore();
      const test=fileStore.getFile;
      this.File=test.content;
      this.titreDoc=test.name;
      console.log("ee",this.File);

    },
    handleSelectedRange(range) {
    this.date.start= range.start;
    this.date.start=new Date(range.start).toISOString();
    this.date.end= new Date(range.end).toISOString();
    //console.log('newDateeeee',this.date.start);
}
  },
  };

  definePageMeta({
    middleware:'auth',
});

</script>


<template>
  <div class="">
  <!--popup -->
        <Popup
          ref="popupAnnul"
          :title="'Annuler Modifications'"
          :description1="'Etes-vous sûr de vouloir annuler l`ajout du document suivant'"
          :titreDoc="'Complainte du'"
          :annuler="true" >

        </Popup>

        <Popup 
          ref="popupAjout"
          :title="'Ajouter Document'"
          :description1="'Votre Document'"
          :titreDoc="'Complainte du'"
          :description2="'a bien été Ajouté à la base de donnée.'"
          :color="true" 
          :annuler="false">
        </Popup>

        <Popup 
          ref="popupEnregistrer"
          :title="'Ajouter Document'"
          :description1="'Votre Document'"
          :titreDoc="'Complainte du'"
          :description2="'a bien été Enregistrée à la base de donnée et devrait être Vérifier par la suite.'"
          :color="true" 
          :annuler="false">
        </Popup>


  <!--popup --> 

    <!-- component -->
      <div class="flex-col w-full  p-10% ">






        
        <div class="flex flex-row">
         
        <div class="flex-none xl:w-1/3 lg:w-1/4 bg-[#027BCE] bg-opacity-10 h-full h-screen overflow-auto overflow-x-hidden">
          <div class=" flex items-stretch	 flex-col h-full lg:space-y-4 md:space-y-2">
            <div class="flex-1/6 justify-left items-center relative md:top-5 lg:left-12 md:left-3">
              <div class="text-justify lg:text-3xl  md:text-2xl font-bold object-left-bottom relatvie">Ajout de document</div>
            </div>
            <div class=" flex-5/6 relative lg:left-24 lg:top-12 md:top-6 md:left-6 w-3/4 grid grid-rows-auto justify-left items-left  grid-flow-row gap-1 ">
              <div class="flex-col justify-left items-center h-max space-y-4 lg:w-5/6 md:w-2/2">
                <div class="lg:text-2xl md:text-xl ">Titre</div>
                <div><input class="rounded-md w-full" v-model="titre"></div>
              </div>
              <div class="flex-col justify-left items-center h-max space-y-3 lg:w-2/3 md:w-3/">
                <div class="lg:text-2xl md:text-xl ">Date</div>
                <div class="object-cover w-full"> 
                  <Datepicker ref="datepicker" @selected-range="handleSelectedRange($event)"/> 
                </div>
                </div>
                
    
              <div class="flex-col justify-left items-center h-max space-y-3 lg:w-5/6 md:w-2/2 ">
                <div class="lg:text-2xl md:text-xl ">Lieu</div>
                <div class="object-cover w-full">
                  <autocomplete_liste :items="cities" ref="lieuAajoute"/>
                
                                  
                </div>
              </div>
              
                       
              <div class="flex-col justify-left items-center h-max space-y-3  ">
                <div class="lg:text-2xl md:text-xl ">Type de document</div>
                <doctype ref="docType" :liste="categories" />
              </div>
   
              <div class="flex-col justify-left items-center h-min space-y-3  lg:w-5/6 md:w-2/2">
                <div class="lg:text-2xl md:text-xl ">Personnes</div>
                <div class="object-cover w-full">
                  <autocomplete_liste :items="personnes" :isPersonne=true  ref="personneAajoute"/>
                </div>
              </div>
             
              <div class=" w-full  flex justify-items-start items-start">
                <description titre="Description" class="w-full min-h-80" ref="description" />
              </div>

              <div class=" w-full  flex justify-items-start items-start">
              <description titre="Retranscription" class="w-full min-h-80 " ref="retranscription" />
              <div class="grid-span-5 border border-black "></div>
              </div>

                <div class="flex justify-center items-center h-min space-y-9 border relative grid-span-5 w-full ">
              <button @click="flipAnnuler()" type="button" class="relative top-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <p class="text-xl">Annuler</p>
              </button>
                </div>
              

            </div>
          </div>
        </div>

        <div class=" flex-col h-screen p-10% flex-grow md:w-1/2 space-y-3 ">
                
                <div class=" h-5/6  ">
                  <display_files  />
                </div>

                <div class="flex-row place-content-between  flex  w-5/6 mx-auto">

                  <div class=" place-content-start items-start flex w-2/4 ">
                    <button @click="uploadDocument('tbr')" type="button" class="relative top-1 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-600">
                      <p class="text-xl">Enregistrer et ajouter "à Vérifier"</p>
                    </button>
                  </div>

                  <div class="place-content-end	flex w-2/4 ">
                    <div>
                      <button @click="uploadDocument('ntbr')" type="button" class="relative top-1  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        <p class="text-xl">Ajouter le  Document</p>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
              
        </div>   
    </div>
  </div>
  
</template>

