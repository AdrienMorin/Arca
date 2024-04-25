<template>
  <nav class="bg-blue-600 h-16 py-3.5 px-6 md:flex justify-between items-center">
    <div class="flex items-center">
      <RouterLink to="/">
        <img src="~/public/logo-thel.png" alt="Logo" class="h-10 w-9">
      </RouterLink>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <!-- Navbar content -->
        <div class="hidden md:flex items-center ml-24">
          <div class="">
            <img src="~/public/loupe.png" alt="Loupe" class="h-4 w-4">
          </div>
          <div class="flex items-baseline">
            <RouterLink to="/Rechercher" class="text-white px-3 font-medium hover:underline">Rechercher</RouterLink>
            <span class="text-white px-4">|</span> 
          </div>
          <div class="flex items-center">
            <div class="ml-4">
              <img src="~/public/dossierArchive.png" alt="Archive" class="h-4 w-5">
            </div>
            <div>
              <RouterLink to="/archiver" class="text-white px-3 font-medium hover:underline">Archiver</RouterLink>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div class="flex items-center">
      <div class="md:flex md:items-center">
        <span class="text-white px-3 py-2 font-medium">Christiane</span>
      </div>
      <a href="#">
        <div class="">
          <img src="~/public/avatar-login.png" alt="Archive" class="h-8 w-8">
        </div>
      </a>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'Navbar'
}
</script>
