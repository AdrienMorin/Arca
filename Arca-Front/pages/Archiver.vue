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
<!-- c'est ajouterDocument en fait -->
<template>
<Navbar />
<h1>Page Archiver</h1>
</template>
