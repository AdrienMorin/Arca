<script>
import axios from 'axios'

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
      const response = await axios.post(this.$config.public.API_URL + '/auth/login', {
        email: this.email,
        password: this.password
      })

      const tokenCookie = useCookie('token')
      tokenCookie.value = response.data.token

      // redirect to homepage if user is authenticated
      if (response.status === 200) {
        console.log('Vous êtes connecté')
        this.$router.push('/accueil');
      }

    },
  }
}
</script>

<template>
  <UDashboardCard title="Connexion" class="md:p-20 mx-auto max-w-lg my-12 mt-36 border-2 border-blue-600 flex flex-col justify-center items-center text-2xl font-bold">
    <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4 mx-auto max-w-lg" @submit="handleSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="email" type="email" placeholder="Entrez votre email" class="text-gray-400 font-light" />
      </UFormGroup>

      <UFormGroup label="Mot de passe" name="motDePasse">
        <UInput v-model="password" placeholder="Entrez votre mot de passe" class="text-gray-400 font-light" type="password" autofocus />
      </UFormGroup>

      <div class="flex justify-center">
        <UButton type="submit" label="Se connecter" class="bg-blue-600 hover:bg-blue-500 mt-10 w-72 rounded-2xl justify-center" />
      </div>
    </UForm>
  </UDashboardCard>
</template>
