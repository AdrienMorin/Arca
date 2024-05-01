<script>
import UserController from '~/services/userController'

export default {
  name: 'Login',
  data(){
    return{
      email:'',
      password:''
    }
  },

  methods: {
    async handleSubmit() {
      
      const response = await UserController.getInstance().login(this.email, this.password)

      const tokenCookie = useCookie('token')
      tokenCookie.value = response.data.token

      // redirect to homepage if user is authenticated
      if (response.status === 200) {
        console.log('Vous êtes connecté')
        this.$router.push('/rechercher');
      }

    },
  }
}
</script>

<template>
  <div class="md:p-20 mx-auto max-w-lg my-12 mt-36 border-2 rounded-lg bg-white border-blue-600 flex flex-col justify-center items-center text-md font-bold">
    <form @submit.prevent="handleSubmit" class="space-y-4 mx-auto max-w-lg">
      <div class="text-center p-4 text-xl">Connexion</div>
      <div class="flex flex-col">
        <label for="email" class="text-black font-light">Email</label>
        <input v-model="email" id="email" type="email" placeholder="Entrez votre email" class="text-gray-600 font-light border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div class="flex flex-col">
        <label for="password" class="text-black font-light">Mot de passe</label>
        <input v-model="password" id="password" placeholder="Entrez votre mot de passe" class="text-gray-600 font-light border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" type="password" autofocus />
      </div>

      <div class="flex justify-center">
        <button type="submit" class="bg-blue-600 hover:bg-blue-500 mt-10 w-72 rounded-2xl justify-center text-white py-2 px-4 font-medium">Se connecter</button>
      </div>
    </form>
  </div>
</template>
