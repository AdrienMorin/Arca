<script>
import axios from "axios";  
import ChangerMdp from "~/components/users/changer_mdp.vue";


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

  created() {
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
        //const response = await axios.get(`https://127.0.0.1:3333/api/getUserTest`);
        //const UserInfos = response.data;
        const UserInfos={
            role: "admin",
            id: 1,
            firstname: "John",
            lastname: "Doe",
            email: "johndoe@gmail.com",
            remember_me_token: null,
            created_at: "2024-04-29T09:27:31.017+02:00",
            updated_at: "2024-04-29T09:27:31.017+02:00",
        }
        //console.log(UserInfos);
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
    <ChangerMdp v-if="showDialog" @closeDialog="closeDialog"  />
    <UDashboardCard title="Profil Utilsateur" class="mx-auto max-w-3xl mt-20 border-2 border-blue-600 flex flex-col justify-center items-center text-2xl font-bold">
    <UForm class="space-y-6 mx-auto max-w-4xl m-6">
        <div class="w-full flex flex-col md:flex-row md:space-x-20">
        <div class="md:w-1/2 h-15">
            <UFormGroup label="Prénom">
                <UInput v-model="firstname" type="text" placeholder="First Name" class="text-gray-400 font-light pointer-events-none" readonly />
            </UFormGroup>
        </div>
        <div class="md:w-1/2 h-15">
            <UFormGroup label="Nom">
            <UInput v-model="lastname" type="text" placeholder="Last Name" class="h-50 text-gray-400 font-light pointer-events-none" readonly />
            </UFormGroup>
        </div>
        </div>
        <div class="flex flex-col md:flex-row md:space-x-20">
        <div class="md:w-1/2 h-15">
            <UFormGroup label="Email">
            <UInput v-model="email" type="email" placeholder="Email" class="text-gray-400 font-light pointer-events-none" readonly />
            </UFormGroup>
        </div>
        <div class="md:w-1/2 h-15">
            <UFormGroup label="Role">
            <UInput v-model="role" type="text" placeholder="Role" class="text-gray-400 font-light pointer-events-none" readonly />
            </UFormGroup>
        </div>
        </div>
        <div class="flex flex-col md:flex-row md:space-x-20">
        <div class="md:w-1/2 h-15">
            <UFormGroup label="Création du compte">
            <UInput v-model="created_at" type="text" placeholder="Created At" class="text-gray-400 font-light pointer-events-none" readonly />
            </UFormGroup>
        </div>
        <div class="md:w-1/2 h-15">
            <UFormGroup label="Dernière modification">
            <UInput v-model="updated_at" type="text" placeholder="Updated At" class="text-gray-400 font-light color:black pointer-events-none" readonly />
            </UFormGroup>
        </div>
       
    </div>
    
    </UForm>
    <div class="flex justify-center mt-50 h-50">
        <UButton label="Changer de mot de passe" @click="openDialog" class="bg-blue-600 hover:bg-blue-500 mt-0 w-60 h-11 flex items-center justify-center rounded-2xl" />
    </div>
  </UDashboardCard>
</template>
