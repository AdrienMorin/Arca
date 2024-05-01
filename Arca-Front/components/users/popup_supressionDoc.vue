<template>
  
    <div class="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-50 place-content-center "  >

          <Confpopup
            v-if="popupTriggers1.buttonTrigger1" 
            :TogglePopup1="() => TogglePopup1('buttonTrigger1')"
            :title="'Supprimer'"
            :description="'a bien été supprimé.'"
            :titreDoc="'La complainte du Partisan'" 
            :color="0">
          </Confpopup>
  
      <div class="rounded-lg bg-white p-8 shadow-2xl lg:w-1/2 md:w-3/4 mx-auto  ">
        <h2 class="text-2xl font-bold">Supprimer</h2>
    
        <div class=" text-xl ">
          <p class=" inline-block mt-2 text-balck-500">
              Etes-vous sûr de vouloir supprimer le document suivant “
          </p>
          <p class="inline-block">La complainte du partisan</p>
          <p class="inline-block">"?</p>
        </div>
        <div class="mt-4 flex gap-2 place-content-end">
          <div class="place-content-start items-start flex ">
              <button @click="TogglePopup()" type="button" class="rounded px-4 py-2  text-red-600">
                <p class="text-xl font-medium">Annuler</p>
              </button>
          </div>
    
          <div class=" place-content-start items-start flex ">
                <button @click="() => TogglePopup1('buttonTrigger1')" type="button" class=" text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                  <p class="text-xl font-medium">Supprimer</p>
                </button>
              </div>
        </div>
      </div>
      </div>

   
  </template>

<script>
import {ref} from 'vue';
import Confpopup from '~/components/users/popup_ConfsupressionDoc.vue'
export default {
	props: ['TogglePopup'],

  setup () {
		const popupTriggers1 = ref({
			buttonTrigger1: false,
		});

		const TogglePopup1 = (trigger1) => {
      setTimeout(() => {
        popupTriggers1.value[trigger1] = !popupTriggers1.value[trigger1]
      }, 500); // you choose the timout you want 
		}

		return {
			Confpopup,
			popupTriggers1,
			TogglePopup1
		}
	},

  components: {
   Confpopup,
    
  },



 

}
</script>