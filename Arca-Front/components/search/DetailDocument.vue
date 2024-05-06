<script>
import personne_menu from '~/components/users/personne_menu.vue';
import display_files from '~/components/search/display_files_search.vue';
import { MicrophoneIcon } from "@heroicons/vue/24/outline";
import Navbar from '~/components/users/Navbar.vue';
import UserController from '~/services/userController.ts';
import {categories} from "@vueuse/metadata";
import {useFileStore} from "~/detailDocumentTransfert.js";

export default {
  components: {
    personne_menu,
    display_files,
    MicrophoneIcon,
    Navbar
  },
  mounted() {
    console.log('detaildoc created')
    this.getDocument();
  },

  unmounted() {
    console.log("Redirection...")
  },

  data() {
    return {
      metadata: '',
      formattedDate: '',
      file: null,
      formattedDateModif: '',
    };
  },
  methods: {
    categories() {
      return categories
    },
    refreshPage() {
      location.reload();
    },
    modifyDocument() {
      this.$router.push('/ModifDocument');
    },
    getDocument() {
      console.log('Checking document...');
      const fileStore = useFileStore();
      const test = fileStore.getFile;
      const testmeta = fileStore.getMetadata;
      this.file = test;
      this.metadata = testmeta;
      console.log('metadata:', this.metadata);
      console.log("ee", this.file);
      console.log("metadata date", this.metadata.date);

      const date = new Date(this.metadata.date);

      this.formattedDate = new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long'
      }).format(date);

      const dateModif = new Date(this.metadata.updatedAt);
      this.formattedDateModif = new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long'
      }).format(dateModif);

      console.log(this.metadata)
    },
    retour() {
      this.$emit('showSearchResult-event');
    },
  },
}
definePageMeta({
  middleware: 'auth',
});

</script>


<template>

  <div class="flex flex-row relative w-full" style="max-height: calc(100vh - 64px)">

    <div class="xl:w-1/3 lg:w-1/4  bg-[#027BCE] bg-opacity-10 p-20% h-screen overflow-auto">
      <button @click="retour" type="button" class="relative top-1  w- text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-8 py-1 me-2 mb-2 ml-4 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <p class="text-lg font-light">Retour</p>
      </button>
      <div class=" flex items-stretch	flex-col lg:space-y-4 md:space-y-2 ">
        <div class="flex-1/6 justify-left items-center relative md:top-5 lg:left-12 md:left-3">
          <div class="text-justify lg:text-4xl  md:text-2xl font-medium object-left-bottom relatvie">{{
              metadata.yname
            }}
          </div>
        </div>

        <div
          class=" flex-5/6 relative lg:left-20 lg:top-6 md:top-6 md:left-6 w-3/4 grid grid-rows-auto h-4/5  grid-flow-row gap-4 overflow-auto">
          <div class="flex-col justify-left items-center h-max space-y-1 lg:w-2/3">
            <div class="lg:text-xl md:text-xl mt-4 font-semibold">Date</div>
            <div class="lg:text-lg md:text-lg ">{{ formattedDate }}</div>
          </div>

          <div class="flex-col justify-left items-center h-max space-y-1 gap-4 ">
            <div class="lg:text-xl md:text-xl mt-4 font-semibold ">Lieux</div>
            <div class=" shadow overflow-hidden rounded-md bg-white" style="max-height: 130px; overflow-y: auto;">
              <ul class="divide-y divide-gray-200">
                <!-- User rows -->
                <li v-for="city in metadata.towns" :key="city" class="px-10 py-4 flex">
                  <div class="text-sm text-gray-900">{{ city }}</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="flex-col justify-left items-center h-max">
            <div class="lg:text-xl md:text-xl mt-4 font-semibold">Catégorie de document</div>
            <div class=" overflow-hidden rounded-md text-lg" style="max-height: 130px; overflow-y: auto;">
              {{ metadata.categories }}
            </div>
          </div>

          <div class="flex-col justify-left items-center h-min space-y-1 ">
            <div class="lg:text-xl md:text-xl mt-4 font-semibold ">Personnes</div>
            <div class="bg-gray-50 shadow overflow-hidden rounded-md" style="max-height: 250px; overflow-y: auto;">
              <ul class="divide-y divide-gray-200">
                <!-- Header row -->
                <li class="px-6 py-4 bg-gray-200 flex">
                  <div class="w-1/5 text-sm font-medium text-gray-900">Id</div>
                  <div class="w-4/5 text-sm font-medium text-gray-900">Nom</div>
                </li>
                <!-- User rows -->
                <li v-for="person in metadata.people" :key="person.id" class="px-10 py-4 flex">
                  <div class="w-1/5 text-sm text-gray-900">{{ person.id }}</div>
                  <div class="w-4/5 text-sm text-gray-900">{{ person.displayname }}</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="flex-col justify-left items-center space-y-1">
            <div class="lg:text-xl md:text-xl font-semibold mt-4">Description</div>
            <div class="object-cover w-full relative">
              {{ metadata.description }}
            </div>
          </div>

          <div class="flex-col justify-left items-center space-y-1">
            <div class="lg:text-xl md:text-xl font-semibold mt-4">Retranscription</div>
            <div class="object-cover w-full relative h-40 overflow-auto">
              {{ metadata.retranscription }}
            </div>
          </div>

          <div class="flex-col justify-left items-center space-y-1">
            <div class="lg:text-xl md:text-xl font-semibold mt-4">Dernière modification</div>
            <div class="object-cover w-full relative ">
              {{ metadata.updatedBy }} ({{ formattedDateModif }})
            </div>
          </div>

          <div class="flex-col justify-left items-center space-y-1">
            <div class="lg:text-xl md:text-xl font-semibold mt-4">Ajouté par</div>
            <div class="object-cover w-full relative">
              {{ metadata.creator }}
            </div>
          </div>

          <div class="flex-row place-content-between flex w-full mx-auto mb-4">
            <div class="">
              <button @click="modifyDocument" type="button"
                      class="relative top-1  w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <p class="text-lg font-light ">Modifier</p>
              </button>
            </div>

            <div>
              <button @click="getDocument" type="button"
                      class="relative top-1  w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <p class="text-lg font-light">Télécharger</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow w-1/3 border-black border">
      <display_files class="border"/>
    </div>
  </div>

</template>

