<script lang="ts">
  
  import doctype from '~/components/users/Document-type-dropdown.vue';
  import personne_menu from '~/components/users/personne_menu.vue';
  import description from '~/components/users/description_box.vue';
  import autocomplete_liste from '~/components/users/autocomplete_liste.vue';
  import Popup from '~/components/users/popup.vue';
  import UserController from '~/services/userController.ts';
  import { useFileStore } from '~/detailDocumentTransfert.js';
  import PersonneController from '~/services/personneController'
  import LocationController from '~/services/locationController'
  import CategorieController from '~/services/categorieController'
  import display_files from '~/components/search/display_files_search.vue';
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
        nom: '',
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
        personnes: [],
        cities: [],
        selectedPersonne: '',
        selectedCities: '',
        categories:[],
        mongoDB: 'ntbr',
        metadata: '',
        dateModif:'',
        id:''
      };
    },
    async created() {
      this.getDocument();
      const modif = new Date(this.metadata.updatedAt);
      this.dateModif= new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'long'
      }).format(modif);
      this.date.start= new Date(this.metadata.date);
      this.date.end= new Date(this.metadata.endDate);
      const fetchedPersonnes = await this.fetchPersonnes();
      this.personnes = fetchedPersonnes.data;
      const fetchedCities = await this.fetchCities();
      this.cities = fetchedCities.data;
      this.cities = this.cities.map(city => city.displayname);
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
    flipSupprimer() {
      this.$refs.popupSupprimer.mainshow = !this.$refs.popupSupprimer.mainshow;
    },
    flipModifier() {
      this.$refs.popupModifier.mainshow = !this.$refs.popupModifier.mainshow;
    },
    async uploadDocument(db) {
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

      console.log('Uploading document...');
      console.log('File', this.File)
      console.log('Name', this.metadata.name)
      console.log('Description', this.metadata.description)
      console.log('Retranscription', this.metadata.retranscription)
      console.log('Date', this.date)
      console.log('Cities', this.citiesListe)
      console.log('Personnes', this.personneListe)
      console.log('MongoDB', this.mongoDB)

      const response = await UserController.getInstance().uploadDocument(token,
      this.File,this.metadata.name,this.description,this.retranscription,this.date,this.citiesListe,this.personneListe,this.mongoDB);
      
      if (response.status === 200) {
        console.log('Vous êtes connecté')
        this.flipAjouter();
      }
    },

    getDocument() {
      console.log('Checking document...');
      const fileStore = useFileStore();
      const test=fileStore.getFile;
      this.File=test;
      this.metadata=fileStore.getMetadata;
      this.nom=this.metadata.filename
      this.mongoDB=this.metadata.mongoDB;
      console.log("+++++++++++++++++++++++++",this.metadata)
    },
    handleSelectedRange(range) {
      this.date.start= range.start;
      this.date.start=new Date(range.start).toISOString();
      this.date.end= new Date(range.end).toISOString();
    },

    async updateDocument(db) {
      console.log('Updating document............................');
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
      this.retrancription=this.$refs.retranscription.description;
      this.mongoDB = db;
      const tokenCookie = useCookie('token');
      const token= tokenCookie.value;

      console.log('................');
      console.log('Uploading document...');
      console.log('File', this.File)
      console.log('Name', this.metadata.name)
      console.log('Description', this.metadata.description)
      console.log('Retranscription', this.metadata.retranscription)
      console.log('Date', this.date)
      console.log('Cities', this.citiesListe)
      console.log('Personnes', this.personneListe)
      console.log('MongoDB', this.nom)

      const response = await UserController.getInstance().updateDocument(token,
      this.File,this.metadata.name,this.description,this.retrancription,this.date,this.citiesListe,this.personneListe,"ntbr", this.nom);
      
      if (response.status === 200) {
        console.log('Vous êtes connecté')
        this.flipModifier();
      }
    },

    async transferDocumentById() {
      console.log('Transfering document............................');
      const tokenCookie = useCookie('token');
      const token= tokenCookie.value;

      const response = await UserController.getInstance().transferDocumentById(token,this.nom);
      
      if (response.status === 200) {
        console.log('Vous êtes connecté')
        this.flipModifier();
      }
    },

    async deleteDocument() {
      console.log('Deleting document............................');
      console.log('Name', this.nom)
      const tokenCookie = useCookie('token');
      const token= tokenCookie.value;
      const response = await UserController.getInstance().deleteDocument(token,this.nom,"ntbr");
      
      if (response.status === 200) {
        console.log('Vous êtes connecté')
        this.flipSupprimer();
      }
    },

    async downloadDocument() {
      console.log('Downloading document............................');
    },
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
      ref="popupModif"
      :title="'Modifier Document'"
      :description1="'Votre Document'"
      :titreDoc="'Complainte du'"
      :description2="'a bien été modifié dans la base de donnée.'"
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

    <Popup 
      ref="popupSupprimer"
      :title="'Supprimer Document'"
      :description1="'Votre Document'"
      :titreDoc="'Complainte du'"
      :description2="'a bien été supprimé de la base de donnée.'"
      :color="true" 
      :annuler="false">
    </Popup>

    <Popup 
      ref="popupModifier"
      :title="'Modifier Document'"
      :description1="'Votre Document'"
      :titreDoc="'Complainte du'"
      :description2="'a bien été modifié de la base de donnée.'"
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
              <div class="text-justify lg:text-3xl  md:text-2xl font-bold object-left-bottom relatvie">Modification de document</div>
            </div>
            <div class=" flex-5/6 relative lg:left-24 lg:top-12 md:top-6 md:left-6 w-3/4 grid grid-rows-auto justify-left items-left  grid-flow-row gap-1 ">
              <div class="flex-col justify-left items-center h-max space-y-4 lg:w-5/6 md:w-2/2">
                <div class="lg:text-2xl md:text-xl ">Titre</div>
                <div><input class="rounded-md w-full" v-model="this.metadata.name"></div>
              </div>
              <div class="flex-col justify-left items-center h-max space-y-3 lg:w-2/3 md:w-3/">
                <div class="lg:text-2xl md:text-xl ">Date</div>
                <div class="object-cover w-full"> 
                  <Datepicker ref="datepicker" @selected-range="handleSelectedRange($event)" :start="this.date.start" :end="this.date.end"/> 
                </div>
                </div>
                
    
              <div class="flex-col justify-left items-center h-max space-y-3 lg:w-5/6 md:w-2/2 ">
                <div class="lg:text-2xl md:text-xl ">Lieu</div>
                <div class="object-cover w-full">
                  <autocomplete_liste :items="cities" :old_items="this.metadata.towns" ref="lieuAajoute"/>
                
                                  
                </div>
              </div>
              
                       
              <div class="flex-col justify-left items-center h-max space-y-3  ">
                <div class="lg:text-2xl md:text-xl ">Type de document</div>
                <doctype ref="docType" :liste="categories" :categorie="this.metadata.categories"/>
              </div>
   
              <div class="flex-col justify-left items-center h-min space-y-3  lg:w-5/6 md:w-2/2">
                <div class="lg:text-2xl md:text-xl ">Personnes</div>
                <div class="object-cover w-full">
                  <autocomplete_liste :items="personnes" :isPersonne=true :old_items="this.metadata.people"  ref="personneAajoute"/>
                </div>
              </div>
             
              <div class=" w-full  flex justify-items-start items-start">
                <description titre="Description" class="w-full min-h-80 " :content="this.metadata.description"  ref="description" />
              </div>

              <div class=" w-full  flex justify-items-start items-start">
              <description titre="Retranscription" class="w-full min-h-80 " :content="this.metadata.restranscription" :dateModif="this.dateModif" :isVisible=true :ajoutePar="this.metadata.creator" ref="retranscription" />
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
                    <div class=" place-content-start items-start flex w-2/4 ">
                    <button @click="updateDocument('tbr')" type="button" class="relative top-1 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-600">
                      <p class="text-xl">Enregistrer les modifications</p>
                    </button>
                  </div>

                  <div class="place-content-end	flex w-2/4 ">
                    <div>
                      <button @click="transferDocumentById()" type="button" class="relative top-1  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        <p class="text-xl">Marquer comme vérifié</p>
                      </button>
                    </div>
                  </div>

                  <div class=" place-content-start items-start flex w-2/4 ">
                    <button @click="deleteDocument()" type="button" class="relative top-1 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-100 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-red-400 dark:hover:bg-red-500 focus:outline-none dark:focus:ring-red-600">
                      <p class="text-xl">Supprimer</p>
                    </button>
                  </div>


                  <div class=" place-content-start items-start flex w-2/4 ">
                    <button @click="downloadDocument()" type="button" class="relative top-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-100 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600">
                      <p class="text-xl">Télécharger</p>
                    </button>
                  </div>

                  </div>
                </div>
            </div>
              
        </div>   
    </div>
  </div>
  
</template>

