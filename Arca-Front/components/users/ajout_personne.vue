<template>
  <div class="flex flex-row min-h-10 border bg-[#D9E1EC]  " v-if="isVisible"  >
    <div class=" flex-auto">
      <div class="relative lg:left-3 	text-black text-xl" >{{nom}}</div>
    </div>
    <div class="flex-none w-1/5  flex items-center justify-center">           
      <button @click="deleteSelf" class="text-gray-600 transition hover:text-white">
        <span class="sr-only">Remove item</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="isHovered ? '#027BCE' : '#000000'" class="w-6 h-6" @mouseover="isHovered = true" @mouseleave="isHovered = false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
      isVisible: true,
    };
  },
     methods: {
      deleteSelf() {
      this.isVisible = !this.isVisible;
      }
      
  }
}
</script>


<script setup>
defineProps(['nom'])
</script>
