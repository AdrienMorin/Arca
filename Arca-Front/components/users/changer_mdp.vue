<template>
  <div class="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-50 place-content-center" @click.self="closePopup">
    <ConfpopupMdp v-if="popupTriggers1.buttonTrigger1" :TogglePopup1="() => TogglePopup1('buttonTrigger1')" @closeDialog="$emit('closeDialog')">
    </ConfpopupMdp>

    <div class="rounded-lg bg-white p-8 shadow-2xl lg:w-1/2 md:w-3/4 mx-auto">
      <h2 class="text-2xl font-bold">Changer de mot de passe</h2>

      <form @submit.prevent="handleSubmit" class="space-y-5 mx-auto max-w-lg my-5 text-md">
        <div class="flex flex-col">
          <label for="oldPassword" class="text-gray-600">Ancien Mot de passe</label>
          <input v-model="oldPassword" id="oldPassword" type="password" placeholder="Entrez votre ancien mot de passe" class="text-gray-500 font-light bg-gray-100 border border-gray-300 p-2 rounded text-sm" />
        </div>
        
        <div class="flex flex-col">
          <label for="newPassword1" class="text-gray-600">Nouveau mot de passe</label>
          <input v-model="newPassword1" @input="updatePasswords" id="newPassword1" type="password" placeholder="Entrez votre nouveau mot de passe" class="text-gray-500 font-light bg-gray-100 border border-gray-300 p-2 rounded text-sm" autofocus />
        </div>
        
        <div class="flex flex-col">
          <label for="newPassword2" class="text-gray-600">Confirmation nouveau mot de passe</label>
          <input v-model="newPassword2" @input="updatePasswords" id="newPassword2" type="password" placeholder="Confirmez votre nouveau mot de passe" class="text-gray-500 font-light bg-gray-100 border border-gray-300 p-2 rounded text-sm" />
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
import ConfpopupMdp from '~/components/users/popup_ConfChangeMdp.vue';
import UserController from '~/services/userController';

export default {
  props: ['TogglePopup'],

  setup (props, { emit }) {
    const popupTriggers1 = ref({
      buttonTrigger1: false,
    });

    const oldPassword = ref('');
    const newPassword1 = ref('');
    const newPassword2 = ref('');

    const closePopup = () => {
      emit('closeDialog');
    }

    const TogglePopup1 = (trigger1) => {
      setTimeout(() => {
        popupTriggers1.value[trigger1] = !popupTriggers1.value[trigger1]
      }, 500); // you choose the timeout you want
    }

    const updatePasswords = () => {
      newPassword1.value = newPassword1.value;
      newPassword2.value = newPassword2.value;
    };

    const handleSubmit = async () => {
      try {
        if (oldPassword.value === '' || newPassword1.value === '' || newPassword2.value === '') {
          alert("Veuillez remplir tous les champs");
          return;
        }
        if (newPassword1.value !== newPassword2.value) {
          alert("Les mots de passe ne correspondent pas");
          return;
        }
        console.log("submit password")

        const tokenCookie = useCookie('token')
        const token = tokenCookie.value
        const response = await UserController.getInstance().changePassword(token, oldPassword.value, newPassword1.value);
        console.log(response);
        
        if (response.status === 200){
          //ferme la pop up 
          TogglePopup1('buttonTrigger1');
        }
        //ferme cette fenêtre 
        
        //closePopup();
      } catch (error) {
        console.error('Changement de mot de passe échoué :', error);
      }
    }

    return {
      ConfpopupMdp,
      popupTriggers1,
      TogglePopup1,
      closePopup,
      oldPassword,
      newPassword1,
      newPassword2,
      updatePasswords,
      handleSubmit,
    }
  },

  components: {
    ConfpopupMdp,
  },
}
</script>
