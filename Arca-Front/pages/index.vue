<template>
  <div class="flex justify-center items-center h-screen">
    <div class="border-2 border-blue-500 p-16 rounded-2xl">
      <h1 class="text-3xl font-bold mb-4 text-center">Bienvenue dans</h1>
      <h2 class="text-2xl font-bold mb-4 text-center">ARCA</h2>
      <h3 class="text-xl mb-8 italic text-center">Application de gestion d'archives</h3>
        <UButton
          label="Accéder à mon compte"
          class="bg-blue-600 hover:bg-blue-500 mt-4 w-72 rounded-2xl justify-center"
          @click="navigate"
        />
    </div>
  </div>


</template>


<script>
import UserController from '~/services/userController.ts';

  definePageMeta({
  layout: 'login-layout'
});

export default {
  methods: {
    async navigate() {
      let tokenCookie = useCookie('token')
      const token = tokenCookie.value
      const connected = await UserController.getInstance().isConnected(token)
      console.log(connected)
      if (connected) {
        this.$router.push('/rechercher');
      } else {
        this.$router.push('/login');
      }
    },
  },
}
</script>