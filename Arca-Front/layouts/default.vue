<script setup>
import Navbar from "~/components/users/Navbar.vue";
</script>

<template>
  <div class="overflow-y-hidden">
    <Navbar/>
    <slot/>
  </div>

</template>