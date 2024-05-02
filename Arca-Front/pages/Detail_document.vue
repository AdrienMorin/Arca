<script>
import personne_menu from '~/components/users/personne_menu.vue';
import display_files from '~/components/users/display_files.vue';
import { MicrophoneIcon } from "@heroicons/vue/24/outline";
import Navbar from '~/components/users/Navbar.vue';
export default {
  components: {
    personne_menu,
    display_files,
    MicrophoneIcon, 
    Navbar
 
  },
  data() {
    return {
      nom: '', // Initialize with an empty string
    };
  },

  methods: {
      refreshPage() {
      location.reload();
      },
      modifyDocument() {
        this.$router.push('/Modif_document');
      }

  }
}
definePageMeta({
  middleware:'auth',
});

document.documentElement.classList.remove('dark')

</script>


<template>

  <!-- component -->
    
    
      
      
<div class="h-screen overflow-hidden">
  
  
  <Navbar />
  
  
      <div class="flex flex-row relative w-full h-screen">
  
        <div class="flex-none xl:w-1/3 lg:w-1/4  bg-[#027BCE] bg-opacity-10 h-full p-20% ">
          <div class=" flex items-stretch	 flex-col h-full lg:space-y-4 md:space-y-2">
            <div class="flex-1/6 justify-left items-center relative md:top-5 lg:left-12 md:left-3">
              <div class="text-justify lg:text-3xl  md:text-2xl font-bold object-left-bottom relatvie">Titre Document</div>
            </div>
  
  
            <div class=" flex-5/6 relative lg:left-24 lg:top-6 md:top-6 md:left-6 w-3/4 grid grid-rows-auto h-4/5  grid-flow-row gap-1 ">
  
              <div class="flex-col justify-left items-center h-max space-y-1 lg:w-2/3 md:w-3/">
                <div class="lg:text-2xl md:text-xl ">Date</div>
                <div class="object-cover w-2/3 "><textarea class="rounded-md w-full resize-none h-7" value=""></textarea></div>
              </div>
  
              <div class="flex-col justify-left items-center h-max space-y-1 lg:w-3/5  md:w-3/4 ">
                <div class="lg:text-2xl md:text-xl ">Lieu</div>
                <div class="object-cover w-2/3"><textarea class="rounded-md w-full resize-none h-7" value=""></textarea></div>
              </div>
  
              <div class="flex-col justify-left items-center h-max space-y-1 lg:w-3/5  md:w-3/4 ">
                <div class="lg:text-2xl md:text-xl ">Type de document</div>
                <div class="object-cover w-2/3"><textarea class="rounded-md w-full resize-none h-7" value=""></textarea></div>
              </div>
  
  
              <div class="flex-col justify-left items-center h-min space-y-1 ">
                <div class="lg:text-2xl md:text-xl ">Personnes</div>
                <div class="row-span-4 border-5 lg:w-5/6 md:w-2/2">
                <personne_menu class="bg-[#FFFFFF] h-30"/>
                </div>
              </div>
  
              <div class=" flex-col justify-left items-center space-y-1 border   ">
                <div class="lg:text-2xl md:text-xl ">Description</div>
                <div class="object-cover w-full relative h-40"><textarea class="rounded-md relative h-full w-full resize-none overflow-y-scroll " value=""></textarea></div>
              </div>
  
  
              <div class="	">
                <p class="inline-block font-semibold text-lg">Ajouté par:</p>
                <p class="inline-block text-lg indent-2 ">Mr cena</p>
              </div>
              <div></div>
  
              <div class="flex-row place-content-between flex w-full  mx-auto">
                <div class="">
                  <button @click="modifyDocument" type="button" class="relative top-1  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <p class="text-xl">Modifier</p>
                  </button>
                </div>
  
  
                <div>
                  <button @click="refreshPage" type="button" class="relative top-1  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <p class="text-xl">Télécharger</p>
                  </button>
                </div>
              </div>
            </div>
  
  
          </div>
  
  
        </div>
  
        <div class="flex-col flex-grow md:w-1/3 lg:3/4">
            <display_files filePath="/_nuxt/assets/DATA BASES 2.xlsx" class="border" />
        </div>
  
  
      </div>
  
</div>



</template>

