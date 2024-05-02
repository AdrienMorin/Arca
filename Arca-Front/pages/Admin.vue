<script>
import UsersComponent from '@/components/admin/UsersComponent'

export default {
  layout: 'admin',
  components: {
    UsersComponent,
  },
  beforeMount() {
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
      activeLink: 'UsersComponent'
    }
  }
}

</script>

<template>
  <div class="container mx-auto my-8">
  <!-- User Section -->
  <div class="flex mb-10">
    <!-- User List -->
    <div class="w-1/2 mr-10">
      <h2 class="font-bold text-2xl mb-4 text-center">Utilisateurs</h2>
      <div class="bg-gray-50 shadow overflow-hidden rounded-md" style="max-height: 250px; overflow-y: auto;">
        <ul class="divide-y divide-gray-200">
          <!-- Header row -->
          <li class="px-6 py-4 bg-gray-200 flex justify-between items-center">
            <div class="text-sm font-medium text-gray-900">Nom</div>
            <div class="text-sm font-medium text-gray-900">Mail</div>
            <div></div>
          </li>
          <!-- User rows -->
          <li v-for="user in users" :key="user.email" class="px-6 py-4 flex justify-between items-center">
            <div class="text-sm text-gray-900">{{ user.name }}</div>
            <div class="text-sm text-gray-500">{{ user.email }}</div>
            <button @click="removeUser(user.email)" class="text-red-500 hover:text-red-700">
              &times;
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Add User Form -->
    <div class="w-1/2">
      <h2 class="font-bold text-xl mb-4 text-center">Ajouter un utilisateur</h2>
      <div class="bg-white shadow overflow-hidden rounded-md p-2">
        <form @submit.prevent="addUser">
          <div class="mb-4 flex justify-between">
            <div class="w-1/2 pr-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="name">Nom</label>
              <input v-model="newUser.name" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
            <div class="w-1/2 pl-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="email">Mail</label>
              <input v-model="newUser.email" type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">Mot de passe</label>
            <input v-model="newUser.password" type="password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="flex items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Category Management Section -->
  <div class="w-3/4 mx-auto">
    <h2 class="font-bold text-xl mb-2 text-center">Gestion des catégories de document</h2>
    <div class="bg-white shadow overflow-hidden rounded-md p-6 flex">
      <!-- Category List -->
      <div class="w-1/2 mr-4" style="max-height: 160px; overflow-y: auto;">
        <div class="bg-gray-50 shadow overflow-hidden rounded-md">
          <ul class="divide-y divide-gray-200">
            <!-- Header row -->
            <li class="px-6 py-4 bg-gray-200 flex justify-between items-center">
              <div class="text-sm font-medium text-gray-900">Catégorie</div>
              <div></div>
            </li>
            <!-- Category rows -->
            <li v-for="category in categories" :key="category" class="px-6 py-4 flex justify-between items-center">
              <div class="text-sm text-gray-900">{{ category }}</div>
              <button @click="removeCategory(category)" class="text-red-500 hover:text-red-700">
                &times;
              </button>
            </li>
          </ul>
        </div>
      </div>
      <!-- Add Category Form -->
      <div class="w-1/2 px-4">
        <form @submit.prevent="addCategory">
          <label class="block text-gray-700 text-sm font-bold mb-3">Nom de la catégorie à ajouter</label>
          <input v-model="newCategory" type="text" class="shadow appearance-none border rounded mb-3 py-2 px-3 text-gray-700 w-full mr-4" placeholder="Catégorie à ajouter" required>
          <div class="flex items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
