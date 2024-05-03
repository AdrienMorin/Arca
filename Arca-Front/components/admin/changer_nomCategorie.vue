<template>
  <div class="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-50 place-content-center" @click.self="closePopup">
    <ConfpopupName v-if="popupTriggers1.buttonTrigger1" :TogglePopup1="() => TogglePopup1('buttonTrigger1')" @closeDialog="$emit('closeDialog')">
    </ConfpopupName>

    <div class="rounded-lg bg-white p-8 shadow-2xl lg:w-1/2 md:w-3/4 mx-auto">
      <h2 class="text-2xl font-bold">Changer nom de catégorie</h2>

      <form @submit.prevent="handleSubmit" class="space-y-5 mx-auto max-w-lg my-5 text-md">
        <div class="flex flex-col">
          <label for="oldCategory" class="text-gray-600">Ancien nom</label>
          <input v-model="oldCategory" id="oldCategory" type="text" placeholder="Entrez votre ancien nom" class="text-gray-500 font-light bg-gray-100 border border-gray-300 p-2 rounded text-sm" />
        </div>
        
        <div class="flex flex-col">
          <label for="newCategory" class="text-gray-600">Nouveau nom</label>
          <input v-model="newCategory" @input="updateCategory" id="newCategory" type="text" placeholder="Entrez votre nouveau nom" class="text-gray-500 font-light bg-gray-100 border border-gray-300 p-2 rounded text-sm" autofocus />
        </div>
        
      </form>

      <div class="mt-4 flex gap-2 place-content-end">
        <button @click="closePopup" type="button" class="rounded px-4 py-2 text-blue-600 bg-gray-200 hover:bg-gray-300">
          <p class="text-md font-medium">Annuler</p>
        </button>

        <div class="place-content-start items-start flex">
          <button @click="handleSubmit" type="button" class="rounded px-4 py-2 text-white bg-blue-500 hover:bg-blue-800">
            <p class="text-md font-medium">Valider</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ConfpopupName from '~/components/users/popup_ConfChangeNomCat.vue';
import UserController from '~/services/userController';

export default {
  props: ['TogglePopup'],

  setup (props, { emit }) {
    const popupTriggers1 = ref({
      buttonTrigger1: false,
    });

    const oldCategory = ref('');
    const newCategory = ref('');

    const closePopup = () => {
      emit('closeDialog');
    }

    const TogglePopup1 = (trigger1) => {
      setTimeout(() => {
        popupTriggers1.value[trigger1] = !popupTriggers1.value[trigger1]
      }, 500); // you choose the timeout you want
    }

    const updateCategory = () => {
      newCategory.value = newCategory.value;
    };

    const handleSubmit = async () => {
      try {
        if (oldCategory.value === '' || newCategory.value === '') {
          alert("Veuillez remplir tous les champs");
          return;
        }
        console.log("submit name")

        const tokenCookie = useCookie('token')
        const token = tokenCookie.value
        const response = await UserController.getInstance().changeCategory(token, oldCategory.value, newCategory.value);
        console.log(response);
        
        if (response.status === 200){
          //ferme la pop up 
          TogglePopup1('buttonTrigger1');
        }
        //ferme cette fenêtre 
        
        //closePopup();
      } catch (error) {
        console.error('Changement de nom échoué :', error);
      }
    }

    return {
      ConfpopupName,
      popupTriggers1,
      TogglePopup1,
      closePopup,
      oldCategory,
      newCategory,
      updateCategory,
      handleSubmit,
    }
  },

  components: {
    ConfpopupName,
  },
}
</script>