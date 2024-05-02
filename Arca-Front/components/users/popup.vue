<template>

  <div>
    <popConf 
            v-if="secondshow"
            :title="'Supprimer'"
            :titreDoc="'Complainte du'"
            :description="'a bien été supprimé.'"
            :color="1"
            :annuler="0"
            >
            </popConf>
    
      <div class="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-50 place-content-center "  v-if="mainshow">
        <div class="rounded-lg bg-white p-8 shadow-2xl lg:w-1/2 md:w-3/4 mx-auto  ">
          <h2 class="text-2xl font-bold">{{title}}</h2>
    
    
          <div class="text-xl">
            <p class="inline-block mt-2 text-black-500">{{description1}} </p>
            &nbsp;
            <p class="inline-block">"{{titreDoc}}"</p>
            <p class="inline-block"> {{ description2}}</p>
          </div>
              <div v-if="!annuler">
                <div class="mt-4 flex gap-2 place-content-center" v-if="color">
                  <div class=" place-content-start items-start flex " >
                        <button @click="goToArchiver" type="button" class=" text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-12 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                          <p class="text-xl font-medium">Retourner à la Recherche</p>
                        </button>
                      </div>
                </div>
                <div class="mt-4 flex gap-2 place-content-end" v-if="!color">
                  <div class="place-content-start items-start flex ">
                      <button @click="flipAnnuler()" type="button" class="rounded px-4 py-2  text-red-600">
                        <p class="text-xl font-medium">Annuler</p>
                      </button>
                  </div>
                  <div class=" place-content-start items-start flex ">
                        <button @click="flipsupprimer()" type="button" class=" text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                          <p class="text-xl font-medium">Supprimer</p>
                        </button>
                      </div>
                </div>
              </div>

              <div v-if="annuler">
                <div class="mt-4 flex gap-2 place-content-end" >
                    <div class="place-content-start items-start flex ">
                        <button @click="flipAnnuler()" type="button" class="rounded px-4 py-2  text-blue-600">
                          <p class="text-xl font-medium">Retour </p>
                        </button>
                    </div>
                    <div class=" place-content-start items-start flex ">
                          <button @click="goToArchiver()" type="button" class=" text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <p class="text-xl font-medium">Annuler Les Modifications</p>
                          </button>
                        </div>
                  </div>
              </div>
    
        </div>
        </div>
  </div>

   
  </template>

<script>
import popConf from '~/components/users/popup_sup.vue'

export default {
  components:{
    popConf
  },
    props: {
      title: {
        type: String,
        required: true
      },
      titreDoc:{
        type: String,
        required: true
      },
      description1: {
        type: String,
        required: true
      },
      description2: {
        type: String,
        required: false
      },
          color: { //color =1 it's blue color =0 it's red
        type: Boolean,
        required: false
      },
      annuler: {
        type: Boolean,
        required: false
      },
    } ,
    data(){
      return {
        mainshow: false,
        secondshow: false
      }

    },

      
    methods: {
    goToArchiver() {
      this.$router.push('/Archiver'); 
    }, 
    flipAnnuler() {
      this.mainshow = !this.mainshow;
      console.log(!this.variableName);
    },
    flipsupprimer(){
      this.secondshow = !this.secondshow;
      this.mainshow=!this.mainshow;
    
    }

  }
}

</script>