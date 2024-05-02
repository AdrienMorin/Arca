<script>
import UsersComponent from '@/components/admin/UsersComponent'
import CategoriesComponent from '../components/admin/CategoriesComponent.vue'

export default {
  layout: 'admin',
  components: {
    UsersComponent,
    CategoriesComponent
  },
  created() {
    definePageMeta({
      middleware:'auth-admin',
      layout: 'admin'
    });
  },
  data() {
    return {
      adminLinks: [
        {name: 'Gestion des utilisateurs', component: 'UsersComponent'},
        {name: 'Gestion des catégories de documents', component: 'CategoriesComponent'},
        {name: 'Gestion des villes', component: 'VillesComponent'},
        {name: 'Gestion de la liste de personnes',  component: 'PersonnesComponent'}
      ],
      activeLink: 'UsersComponent',
    }
  }
}

</script>

<template>

</template>
