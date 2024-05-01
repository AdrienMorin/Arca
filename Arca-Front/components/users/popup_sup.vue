<template>

  <div >
      
      <div class="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-50 place-content-center ">
        <div class="rounded-lg bg-white p-8 shadow-2xl lg:w-1/2 md:w-3/4 mx-auto  ">
          <h2 class="text-2xl font-bold">{{title}}</h2>
          <div class="text-xl">
            <p class="inline-block mt-2 text-black-500">Votre document </p>
            &nbsp;
            <p class="inline-block">"{{titreDoc}}"</p>
            &nbsp;
            <p class="inline-block"> {{ description}}</p>
          </div>
          <div class="mt-4 flex gap-2 place-content-center">
            <div class=" place-content-start items-start flex " >
                  <button @click="goToIndex" type="button" class=" text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-12 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <p class="text-xl font-medium">Retour à l'écran d'acceuil</p>
                  </button>
                </div>
          </div>
          
    
        </div>
        </div>

        


  </div>

   
  </template>

<script>

export default {
    props: {
      title: {
        type: String,
        required: true
      },
      titreDoc:{
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
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
        mainshow: true,
        secondshow: false
      }

    },

      
    methods: {
    goToIndex() {
      this.$router.push('/'); 
    }, 
   

  }
}

</script>