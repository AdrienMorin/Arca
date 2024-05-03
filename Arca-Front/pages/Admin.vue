<script>
import UsersComponent from '@/components/admin/UsersComponent'
import CategoriesComponent from '../components/admin/CategoriesComponent.vue'
import PersonnesComponent from "~/components/admin/PersonnesComponent.vue"
import VillesComponent from '../components/admin/VillesComponent.vue'
definePageMeta
({
  middleware:'auth-admin',
  layout: 'default'
});

export default {
  components: {
    UsersComponent,
    CategoriesComponent,
    VillesComponent,
    PersonnesComponent
  },
  async mounted() {
    const tokenCookie = useCookie('token')
    const token = tokenCookie.value
  },
  data() {
    return {
      adminLinks: [
        {name: 'Gestion des utilisateurs', component: 'UsersComponent'},
        {name: 'Gestion des catégories de documents', component: 'CategoriesComponent'},
        {name: 'Gestion des villes', component: 'VillesComponent'},
        {name: 'Gestion de la liste de personnes',  component: 'PersonnesComponent'}
      ],
      activeLink: 'UsersComponent'
    }
  }
}

</script>

<template>
  <div>
    <nav class="bg-gray-1200 mt-10">
      <div class="max-w-14xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex">
          <div class="w-128 bg-white">
            <div class="flex flex-col">
              <div class="flex-grow overflow-y-auto">
                <div class="px-4 py-5">
                  <NuxtLink
                    v-for="link in adminLinks"
                    :key="link.name"
                    :to="link.path"
                    class="block w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md mb-2"
                    :class="{ 'bg-gray-200': activeLink === link.component }"
                    @click.native="activeLink = link.component"
                  >
                    {{ link.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-grow " >
            <component :is="activeLink"></component>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
