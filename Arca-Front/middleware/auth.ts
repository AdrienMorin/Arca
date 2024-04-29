import axios from "axios";
// export default defineNuxtRouteMiddleware(async(to, from)=> {
//     try {
//         console.log('hi middleware');
//         const response = await axios.get(this.$config.public.API_URL);
//         if (response.data.isAuthenticated) {
//             return navigateTo(to.fullPath);
//         }
        
//         if (to.path !== '/login') {
//             return navigateTo('/login');
//         }
//     } catch (error) {
//         console.error('Error checking session cookie:', error);
//     }
// });


export default defineNuxtRouteMiddleware(async (to, from) => {
    //const auth = useState('auth')
    let response = await axios.get(this.$config.public.API_URL);
    console.log(response);

    if (response.data==='Vous êtes connecté') {
        return navigateTo(to.fullPath);
    }
    
    if (to.path !== '/login') {
        return navigateTo('/login');
    }
});