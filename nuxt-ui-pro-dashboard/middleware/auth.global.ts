// import { Middleware } from '@nuxt/types'

// const authMiddleware: Middleware = ({ $auth, redirect }) => {
//   if (!$auth.loggedIn) {
//     return redirect('/login')
//   }
// }

// export default authMiddleware

export default defineNuxtRouteMiddleware((to, from)=> {
    console.log(to);
    console.log(from);

    const isLoggedIn = false;
    if(isLoggedIn){
        // return navigateTo(to.fullPath);
    }
    // return navigateTo('/rechercher');
});