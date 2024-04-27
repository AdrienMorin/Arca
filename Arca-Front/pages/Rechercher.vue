<script>
import Navbar from "~/components/users/Navbar.vue";
export default {
  components: {
    Navbar
  }
};
definePageMeta({
  middleware:'auth',
});
</script>

<template>
<Navbar />
<h1>Page Rechercher</h1>
</template>
