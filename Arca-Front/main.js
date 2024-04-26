import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './app.vue';
import Accueil from './pages/Accueil.vue';
import Rechercher from './pages/Rechercher.vue';
import Archiver from './pages/Archiver.vue';

const routes = [
    { path: '/', component: Accueil },
    { path: '/rechercher', component: Rechercher },
    { path: '/archiver', component: Archiver },
];
  
const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app');
