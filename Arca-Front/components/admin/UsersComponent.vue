<template>
  <!-- User Section -->
  <div class="flex flex-col mb-10">
    <div class="w-3/4 mr-10 ml-10">
      <h2 class="font-bold text-2xl mb-4 text-center">Ajouter un utilisateur</h2>
      <div class="bg-white shadow overflow-hidden rounded-md p-2">
        <form @submit.prevent="addUser">
          <div class="mb-4 flex justify-between">
            <div class="w-1/2 pr-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="lastname">Nom</label>
              <input v-model="newUser.lastname" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
            <div class="w-1/2 pl-2">
              <label class="block text-gray-700 text-sm font-bold mb-1" for="firstname">Prénom</label>
              <input v-model="newUser.firstname" type="text" id="firstname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
          </div>
          <div class="mb-4 ">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="email">Mail</label>
            <input v-model="newUser.email" type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
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

    <div class="w-3/4 mr-10 ml-10 mt-16">
      <h2 class="font-bold text-2xl mb-4 text-center">Utilisateurs</h2>
      <div class="bg-gray-50 shadow overflow-hidden rounded-md" style="max-height: 250px; overflow-y: auto;">
        <ul class="divide-y divide-gray-200">
          <!-- Header row -->
          <li class="px-6 py-4 bg-gray-200 flex">
            <div class="w-1/5 text-sm font-medium text-gray-900">Nom</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Prénom</div>
            <div class="w-2/5 text-sm font-medium text-gray-900">Mail</div>
            <div class="w-1/5 text-sm font-medium text-gray-900">Rôle</div>
            <div class="w-12"></div>
          </li>
          <!-- User rows -->
          <li v-for="user in users" :key="user.email" class="px-10 py-4 flex">
            <div class="w-1/5 text-sm text-gray-900">{{ user.name }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ user.surname }}</div>
            <div class="w-2/5 text-sm text-gray-500">{{ user.email }}</div>
            <div class="w-1/5 text-sm text-gray-900">{{ user.role }}</div>
            <div class="w-12">
              <button @click="removeUser(user.email)" class="text-red-500 hover:text-red-700">
                &times;
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { name: 'Christiane', surname: 'Coste', email: 'christiane11@gmail.com', role: 'admin'},
        { name: 'Jean-Marc', surname: 'Sarnin' , email: 'jm0987@gmail.com', role: 'admin'},
        { name: 'Adrien', surname: 'Morin' , email: 'a.morin@gmail.com', role: 'utilisateur'}
      ],
      newUser: {
        name: '',
        surname: '',
        email: '',
        password: ''
      },
      categories: [
        'Article de journal',
        'Extrait de livre',
        'PV de gendarmerie'
      ],
      newCategory: ''
    };
  },
  methods: {
    addUser() {
      // Here you would normally integrate with your backend
      console.log('Adding user:', this.newUser);
      this.users.push({ ...this.newUser });
      this.newUser = { name: '', email: '', password: '' }; // Reset form
    },
    removeUser(email) {
      this.users = this.users.filter(user => user.email !== email);
    },
    addCategory() {
      // Same here for backend integration
      console.log('Adding category:', this.newCategory);
      this.categories.push(this.newCategory);
      this.newCategory = ''; // Reset input
    },
    removeCategory(category) {
      this.categories = this.categories.filter(c => c !== category);
    }
  }
};

</script>
