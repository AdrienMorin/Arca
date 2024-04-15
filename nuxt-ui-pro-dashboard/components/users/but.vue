<template>
    <button @click="goToPage" class="border border-rose-600"> button</button>
</template>

<script>
export default {
    methods: {
    goToPage() {
        this.$router.push('/Ajout_document');
        }
    }
      
  }

</script>
