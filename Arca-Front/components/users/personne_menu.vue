

<template>
   

    
   
</template>

<script>

import personne from '~/components/users/ajout_personne.vue';

export default {
  components: {
    personne,
  },data() {
    return {
      personnes: []
    }
  },

  methods: {
    addPersonne(text){
      const newPersonne = {
        nom: text,
        id: Math.random().toString(36).substr(2, 9),
      };
      // Push the new blog post to the array
      this.personnes.push(newPersonne);
    },
      getPersonne() {
        return this.personnes.filter(personne => personne.nom !== '');
      
      },
      deletePersonne(id){
        this.personnes.pop(id);
    }
       
  }  

}
 
  

</script>
