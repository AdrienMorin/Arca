<template>
  <div class="flex flex-row min-h-10 border   " v-if="this.Visible"  >
    <div class=" flex-auto">
      <div class="relative lg:left-3 	text-black text-xl" >{{nom}}</div>
    </div>
    <div class="flex-none w-1/5  flex items-center justify-center">           
      <button @click="deleteSelf" class="text-gray-600 transition border border-black hover:text-white">
        <span class="sr-only">Remove item</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="this.isHovered ? '#027BCE' : '#000000'" class="w-6 h-6" @mouseover="this.isHovered = true" @mouseleave="this.isHovered = false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    nom: String,
    
  },
   data() {
    return {
      isHovered: false,
      Visible:true,
    };
  },
     methods: {
      deleteSelf() {
        this.Visible=!this.Visible;
        //Get the parent element of this component
        // Remove this component's element from the DOM
        this.$emit('delete', this.nom);
    }
  
     
      
  }
}
</script>


