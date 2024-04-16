<script>
import personne_menu from '~/components/users/personne_menu.vue';

export default {
  components: {
    personne_menu,
    
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

</script>


<template>

  <!-- component -->
	<div class="flex-col w-full">
    <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between w-full flex-wrap md:flex-nowrap bg-[#027BCE]">
        <!-- Logo -->
        <div class="text-indigo-500 md:order-1">
          <!-- Heroicon - Chip Outline -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul class="flex font-semibold justify-between">
                      <!-- Active Link = text-indigo-500
                      Inactive Link = hover:text-indigo-500 -->
            <li class="md:px-4 md:py-2 text-indigo-500"><a href="#">Dashboard</a></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Search</a></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Explore</a></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">About</a></li>
            <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="order-2 md:order-3">
          <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                      <!-- Heroicons - Login Solid -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span>Login</span>
                  </button>
        </div>
    </div>
    
    
      
      





    <div class="flex flex-row h-full w-full">

      <div class="flex-none xl:w-1/3 lg:w-1/4  bg-[#027BCE] bg-opacity-10 h-screen p-20% ">
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
        <div class="relative top-12 bottom-6 h-5/6 w-4/5 mx-auto ">
          <img src="~/assets/complainteDuPartisan.png" alt="image" class="object-contain h-full w-full" />
        </div>
      </div>


    </div>




  </div>
</template>

