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


        <div class="w-3/4 mr-10 ml-10 mt-16 text-center">
            <h2 class="font-medium text-xl mb-4 text-center">Catégories existantes</h2>
            <div class="flex flex-row justify-center">
            <div class="bg-gray-50 shadow overflow-hidden rounded-md w-1/2 mt-8 ml-6" style="max-height: 285px; overflow-y: auto;">
                <ul class="divide-y divide-gray-200 justify-center items-center text-center">
                    <!-- Header row -->
                    <li class="p-2 bg-gray-200 flex justify-center h-16">
                        <div class="w-3/5 text-sm font-medium text-gray-900 text-center mt-4">Nom de la catégorie</div>
                    </li>
                    <!-- Category rows -->
                    <li v-for="category in categories" :key="category.name" class="px-10 py-4 flex justify-center">
                        <div class="text-sm text-gray-900 text-center">{{ category.name }}</div>
                    </li>
                </ul>
            </div>
            <!-- Category modification block -->
            <div class="w-1/2 mr-10 ml-10 mt-8 text-center">
                <div class="rounded-lg bg-white p-4 shadow-xl">
                    <h2 class="text-xl font-bold">Changer nom de catégorie</h2>
                    <form class="space-y-5 mx-auto max-w-lg my-5 text-md">
                        <div class="flex flex-col">
                            <label for="oldCategory" class="text-gray-600">Ancien nom</label>
                            <input v-model="oldCategory" id="oldCategory" type="text" class="text-gray-500 font-light bg-gray-100 border border-gray-300 p-2 rounded text-sm" autofocus />
                        </div>
                        <div class="flex flex-col">
                            <label for="newCategory" class="text-gray-600">Nouveau nom</label>
                            <input v-model="updatedCategory" id="updatedCategory" type="text" class="text-gray-500 font-light bg-gray-100 border border-gray-300 p-2 rounded text-sm" autofocus />
                        </div>
                    </form>
                    <div class="mt-4 flex justify-center">
                    <button @click="updateCategory" type="button" class="rounded-lg px-4 py-2 text-white bg-blue-600 hover:bg-blue-800">
                        Valider
                    </button>
                    </div>
                </div>
            </div>
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
                oldCategory: null,
                updatedCategory: '',
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
            async updateCategory() { 
                const tokenCookie = useCookie('token')
                const token = tokenCookie.value
                const response = await UserController.getInstance().updateCategory(token, this.oldCategory, this.updatedCategory)
                console.log(response);

                if (response.status === 200){
                    this.categories.push(this.updatedCategory)
                    const index = this.categories.findIndex(category => category.name === this.oldCategory);
                    if (index !== -1) {
                        this.categories.splice(index, 1);
                    }
                    console.log('SUCCESS UPDATE')
                     // Push category to the list
                }
            },
        }
    };
</script>