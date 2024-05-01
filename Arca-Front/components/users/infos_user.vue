<script>
import ChangerMdp from "~/components/users/changer_mdp.vue";
import UserController from '~/services/userController'

export default {    
  name: "InfosUser", 
  components: {
    ChangerMdp,
  }, 

  data(){
    return {
      role: "",
      id: 0,
      firstname: "",
      lastname: "",
      email: "",
      remember_me_token: "",
      created_at: "",
      updated_at: "",
      showDialog: false,
    }
  },

  async mounted() {
    this.getUserInfos();
  },

  methods: { 
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    async getUserInfos() {
      try {
        const tokenCookie = useCookie('token')
        const token = tokenCookie.value

        const response = await UserController.getInstance().getUser(token);
        const UserInfos = response.data;

        this.role = UserInfos.role;
        this.id = UserInfos.id;
        this.firstname = UserInfos.firstname;
        this.lastname = UserInfos.lastname;
        this.email = UserInfos.email;
        this.remember_me_token = UserInfos.remember_me_token;
        this.created_at = UserInfos.created_at;
        this.updated_at = UserInfos.updated_at;
  
        //refactor the date in this format: 13/12/2023
        this.created_at = this.created_at.split('T')[0].split('-').reverse().join('/');
        this.updated_at = this.updated_at.split('T')[0].split('-').reverse().join('/');
        console.log(response);

      } catch (error) {
        console.error('Get User Infos failed:', error);
      }
    }
  }  
}   
</script>

<template>
  <div class="mx-auto max-w-3xl p-6 mt-24 border-2 border-blue-600 rounded-lg flex flex-col justify-center items-center text-md font-bold">
    <h2 class="text-2xl font-bold mt-6 mb-4">Mes informations</h2>
    <ChangerMdp v-if="showDialog" @closeDialog="closeDialog"  />
    <form class="space-y-6 mx-auto max-w-4xl m-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20">
        <div class="h-15">
            <div class="flex flex-col">
                <label for="firstname" class="text-gray-800 font-light">Prénom</label>
                <input id="firstname" v-model="firstname" type="text" placeholder="Prénom" class="text-gray-400 font-light pointer-events-none bg-gray-100 border border-gray-300 p-2 rounded" readonly />
            </div>
        </div>
        <div class="h-15">
            <div class="flex flex-col">
                <label for="lastname" class="text-gray-800 font-light">Nom</label>
                <input id="lastname" v-model="lastname" type="text" placeholder="Nom" class="text-gray-400 font-light pointer-events-none bg-gray-100 border border-gray-300 p-2 rounded" readonly />
            </div>
        </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20">
        <div class="h-15">
            <div class="flex flex-col">
                <label for="email" class="text-gray-800 font-light">Email</label>
                <input id="email" v-model="email" type="email" placeholder="Email" class="text-gray-400 font-light pointer-events-none bg-gray-100 border border-gray-300 p-2 rounded" readonly />
            </div>
        </div>
        <div class="h-15">
            <div class="flex flex-col">
                <label for="role" class="text-gray-800 font-light">Rôle</label>
                <input id="role" v-model="role" type="text" placeholder="Rôle" class="text-gray-400 font-light pointer-events-none bg-gray-100 border border-gray-300 p-2 rounded" readonly />
            </div>
        </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20">
        <div class="h-15">
            <div class="flex flex-col">
                <label for="created_at" class="text-gray-800 font-light">Création du compte</label>
                <input id="created_at" v-model="created_at" type="text" placeholder="Date de création" class="text-gray-400 font-light pointer-events-none bg-gray-100 border border-gray-300 p-2 rounded" readonly />
            </div>
        </div>
        <div class="h-15">
            <div class="flex flex-col">
                <label for="updated_at" class="text-gray-800 font-light">Dernière modification</label>
                <input id="updated_at" v-model="updated_at" type="text" placeholder="Date de dernière modification" class="text-gray-400 font-light pointer-events-none bg-gray-100 border border-gray-300 p-2 rounded" readonly />
            </div>
        </div>
        </div>
    </form>
    <div class="flex justify-center mt-12 mb-4">
        <button @click="openDialog" class="bg-blue-600 hover:bg-blue-500 mt-0 w-60 h-11 flex items-center justify-center rounded-2xl text-white font-normal">Changer de mot de passe</button>
    </div>
</div>
</template>
