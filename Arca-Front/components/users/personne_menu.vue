

<template>
    <div class=" flex-col gap-4 place-content-start mx-auto overflow-y-scroll h-40  bg-[#D9E1EC] ">
         <personne v-for="(personne,index) in personnes.slice().reverse()" :key="index" :nom="personne.nom" class="h-6" />

    
    </div>
   
</template>

<script>

import personne from '~/components/users/ajout_personne.vue';

export default {
  components: {
    personne
  },data() {
    return {
      personnes: []
    }
  },

  methods: {
    addPersonne(text){
      const newPersonne = {
        nom: text,
      };
      // Push the new blog post to the array
      this.personnes.push(newPersonne);
    },
    getPersonne(){
      return this.personnes;
    },
  }
}
 
  

</script>
