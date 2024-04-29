<template>
  
    <div class="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-50 place-content-center "  >
      <div class="rounded-lg bg-white p-8 shadow-2xl lg:w-1/2 md:w-3/4 mx-auto  ">
        <h2 class="text-2xl font-bold">Changement de mot de passe</h2>
        <div class=" text-xl my-5">
          <p class="inline-block">Votre mot de passe a bien été modifié !</p>
        </div>
        <div class="mt-4 flex gap-2 place-content-center">
         
    
          <div class=" place-content-start items-start flex ">
                <button @click="goToIndex" type="button" class=" text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-12 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  <p class="text-xl font-medium">Retour à votre profil</p>
                </button>
              </div>
        </div>
      </div>
      </div>

   
  </template>

<script>
export default {
	props:['TogglePopup1'],
  
  methods: {
  goToIndex() {
    //this.$router.push('/UserPage');
  }
}
}
</script>