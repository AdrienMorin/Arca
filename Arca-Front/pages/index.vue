<script>
  definePageMeta({
  layout: 'loginLayout'
});

</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="border-2 border-blue-500 p-16 rounded-2xl">
      <h1 class="text-3xl font-bold mb-4 text-center">Bienvenue dans</h1>
      <h2 class="text-2xl font-bold mb-4 text-center">ARCA</h2>
      <h3 class="text-xl mb-8 italic text-center">Application de gestion d'archives</h3>
      <NuxtLink to="/login">
        <UButton
          label="Accéder à mon compte"
          class="bg-blue-600 hover:bg-blue-500 mt-4 w-72 rounded-2xl justify-center"
        />
      </NuxtLink>
    </div>
  </div>

  
</template>
