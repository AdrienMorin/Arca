import axios from "~/node_modules/axios/index";
export default defineNuxtRouteMiddleware(async(to, from)=> {
    try {
        const response = await axios.get(this.$config.public.API_URL);
        if (response.data.isAuthenticated) {
            return navigateTo(to.fullPath);
        }
        
        if (to.path !== '/login') {
            return navigateTo('/login');
        }
    } catch (error) {
        console.error('Error checking session cookie:', error);
    }
});