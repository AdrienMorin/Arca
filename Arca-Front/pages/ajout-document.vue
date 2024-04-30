<script>
import doctype from '~/components/users/Document-type-dropdown.vue';
import personne_menu from '~/components/users/personne_menu.vue';
import description from '~/components/users/description_box.vue';

export default {
  components: {
    doctype,
    personne_menu,
    description,
    Navbar
    
  },
  data() {
    return {
      nom: '', // Initialize with an empty string
    };
  },

  methods: {
    Ajouter_personne(){
      if(this.nom != '')
      this.$refs.menu_personne.addPersonne(this.nom);
      this.nom = '';
      },

      refreshPage() {
        location.reload();
      }

  }
}
definePageMeta({
  middleware:'auth',
});

</script>


<template>
	<div class="flex-col w-full">
    <div class="flex flex-row h-full">

      <div class="flex-none xl:w-1/3 lg:w-1/4  bg-[#027BCE] bg-opacity-10 h-screen p-20% ">
        <div class=" flex items-stretch	 flex-col h-full lg:space-y-4 md:space-y-2">

          <div class="flex-1/6 justify-left items-center relative md:top-5 lg:left-12 md:left-3">
            <div class="text-justify lg:text-3xl  md:text-2xl font-bold object-left-bottom relatvie">Ajout de document</div>
          </div>


          <div class=" flex-5/6 relative lg:left-24 lg:top-12 md:top-6 md:left-6 w-3/4 grid grid-rows-auto   grid-flow-row gap-2 ">
            <div class="flex-col justify-left items-center h-max space-y-4 lg:w-5/6 md:w-2/2">
              <div class="lg:text-2xl md:text-xl ">Titre</div>
              <div><input class="rounded-md w-full" value=""></div>
            </div>
            <div class="flex-col justify-left items-center h-max space-y-3 lg:w-2/3 md:w-3/">
              <div class="lg:text-2xl md:text-xl ">Date</div>
              <div class="object-cover w-full"><input class="rounded-md w-full" value=""></div>
              </div>
            
            <div class="flex-col justify-left items-center h-max space-y-3 lg:w-3/5  md:w-3/4 ">
              <div class="lg:text-2xl md:text-xl ">Lieu</div>
              <div class="object-cover w-full"><input class="rounded-md w-full" value=""></div>
            </div>
            <div class="flex-col justify-left items-center h-max space-y-3  ">
              <div class="lg:text-2xl md:text-xl ">Type de document</div>
              <doctype />
            </div>
            <div class="row-span-3"></div>
            
            <div class="flex-col justify-left items-center h-min space-y-3 lg:w-5/6 md:w-2/2">
              <div class="lg:text-2xl md:text-xl ">Personnes</div>
              <div class="object-cover w-full"><input class="rounded-md w-full" v-model="nom"></div>
            </div>
            <div class="row-span-1"></div>
            <div class=" flex-row">
              <button type="button" @click="Ajouter_personne" class="onclick relative top-1  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-base px-6 py-3 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <p class="text-xl">Ajouter</p>
              </button>
            </div>
            
            <div class="row-span-1"></div>


            <div class="row-span-5 border-5 lg:w-5/6 md:w-2/2">
              <personne_menu ref="menu_personne"/>
            </div>
            
            
            <div class="row-span-5"></div>

            <div class="flex justify-center items-center h-min space-y-3 relative md:w-2/2 lg:w-3/4  ">
           <button @click="refreshPage" type="button" class="relative top-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <p class="text-xl">Annuler</p>
          </button>
            </div>

          </div>



        </div>



      </div>

        <div class="flex-grow md:w-1/2 space-y-8">
          <description/>

          <div class=" flex justify-end w-5/6 mx-auto space-y-3 relative  bottom-0 right-0 absolute">
            <div >
              <button @click="refreshPage" type="button" class="relative top-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <p class="text-xl">Ajouter Document</p>
              </button>
            </div>
          </div>
        </div>

      </div>
  </div>
</template>

