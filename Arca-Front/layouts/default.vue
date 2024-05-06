<script setup>
import Navbar from "~/components/users/Navbar.vue";
</script>

<template>
  <div class="overflow-y-hidden">
    <Navbar class="sticky top-0 z-50">
    </Navbar>
    <slot/>
  </div>

</template>