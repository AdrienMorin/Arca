<template>
  <nav class="bg-blue-600 h-16 py-3.5 px-6 md:flex justify-between items-center">
    <div class="flex items-center">
      <NuxtLink to="/rechercher">
        <img src="~/public/logo-thel.png" alt="Logo" class="h-10 w-9">
      </NuxtLink>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <!-- Navbar content -->
        <div class="hidden md:flex items-center ml-24">
          <div>
            <img src="~/public/loupe.png" alt="Loupe" class="h-4 w-4">
          </div>
          <div class="flex items-baseline">
            <NuxtLink to="/rechercher" class="text-white px-3 font-medium hover:underline">Rechercher</NuxtLink>
            <span class="text-white px-4">|</span> 
          </div>
          <div class="flex items-center">
            <div class="ml-4">
              <img src="~/public/dossierArchive.png" alt="Archive" class="h-4 w-5">
            </div>
            <div>
              <NuxtLink to="/archiver" class="text-white px-3 font-medium hover:underline">Archiver</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center relative hover:shadow-xl hover:rounded-lg" @click="toggleDropdown">
      <div class="flex items-center cursor-pointer">
        <span class="text-white px-3 py-2 font-medium">{{ userName }}</span>
        <img src="~/public/avatar-login.png" alt="Avatar" class="h-8 w-8">
      </div>
      <!-- Menu -->
      <div v-if="showDropdown" @click.away="showDropdown = false" class="absolute top-12 right-0 bg-white shadow-md rounded-md mt-1 w-[150px]">
        <NuxtLink to="/user-page" class="block px-4 py-3 text-gray-800 hover:bg-gray-200">Mon profil</NuxtLink>
        <button @click="handleLogout" class="block px-4 py-3 text-gray-800 hover:bg-gray-200 w-full text-left">Se déconnecter</button>
      </div>
    </div>
  </nav>
</template>

<script>
import UserController from '~/services/userController'
export default {
  data() {
    return {
      showDropdown: false,
      userName: ''
    };
  },

  async mounted() {
    this.userName = await this.getName();
  },

  methods:{
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    async handleLogout() {
      try {
        const tokenCookie = useCookie('token')
        const token = tokenCookie.value
        const response = await UserController.getInstance().logout(token);
        console.log(response)

        if (response.status === 200) {
          console.log('Vous êtes déconnecté')
          this.$router.push('/login');
        } else {
          console.error('Failed to logout:', response.data)
        }
      } catch (error) {
        console.error('Error logging out:', error)
      }
    },

    async getName(){
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      const response = await UserController.getInstance().getUser(token);
      return response.data.firstname;
    }
  }
}
</script>
