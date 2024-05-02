<template>
  <!-- Category Section -->
<div class="flex flex-col mb-10 justify-center">
    <div class="w-3/4 mr-10 ml-10">
        <h2 class="font-bold text-2xl mb-4 text-center">Gestion des catégories</h2>
        <div class="bg-white shadow overflow-hidden rounded-md p-2">
            <form @submit.prevent="addCategory">
                <div class="mb-4">
                    <div class="w-1/2 mx-auto">
                        <label class="block text-gray-700 text-sm font-bold mb-1 text-center" for="Name">Nom de catégorie</label>
                        <input v-model="newCategory.name" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" placeholder="Rentrez le nom de la nouvelle catégorie" required>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white font-regular py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
                        Ajouter
                    </button>
                </div>
            </form> 
        </div>
    </div>

    <div class="w-3/4 mr-10 ml-10 mt-16">
        <h2 class="font-medium text-xl mb-4 text-center">Catégories existantes</h2>
        <div class="bg-gray-50 shadow overflow-hidden rounded-md w-full" style="max-height: 250px; overflow-y: auto;">
            <ul class="divide-y divide-gray-200">
            <!-- Header row -->
            <li class="px-6 py-4 bg-gray-200 flex justify-center">
                <div class="w-1/5 text-sm font-medium text-gray-900">Nom de la catégorie</div>
                <div class="w-12"></div>
            </li>
            <!-- User rows -->
            <li v-for="category in categories" :key="category.name" class="px-10 py-4 flex justify-between">
                <div class="w-1/5 text-sm text-gray-900">{{ category.name }}</div>
                <div class="w-12 justify-right">
                <button @click="modifyCategory(category.name)" class="text-red-500 text-sm ml-4 hover:text-red-700 justify-end mr-4">
                    Modifier
                </button>
                </div>
            </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import UserController from '~/services/userController'

export default {
    data() {
        return {
            categories: [],
            newCategory: {
                name:''
            },
            updatedCategory,
        };
    },

    async created() {
        const fetchedCategories = await this.fetchCategories()
        this.categories = fetchedCategories.data
    },

    methods: {
        async fetchCategories() {
            const tokenCookie = useCookie('token')
            const token = tokenCookie.value
            return await UserController.getInstance().fetchCategories(token)
        },
        async addCategory() {
            // Here you would normally integrate with your backend
            console.log('Adding category:', this.newCategory);
            const tokenCookie = useCookie('token')
            const token = tokenCookie.value
            const response = await UserController.getInstance().createCategory(this.newCategory.name, token)
            if (response.status === 200){
                this.categories.push(this.newCategory) // Push category to the list
                this.newCategory = '' // Reset input
            }
        },
        // updateCategory(category) {
        //     const tokenCookie = useCookie('token')
        //     const token = tokenCookie.value
        //     const response = await UserController.getInstance().modifyCategory(this.updatedCategory.name, token)
        //     if (response.status === 200){
        //         this.categories.push(this.updatedCategory) // Push category to the list
        //     }
        //     this.categories = this.categories.filter(c => c !== category); //???
        // },

    }
};

</script>