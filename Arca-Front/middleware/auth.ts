export default defineNuxtRouteMiddleware((to, from)=> {
    console.log(to);
    console.log(from);

    const isLoggedIn = false;
    if(isLoggedIn){
        // return navigateTo(to.fullPath);
    }
    // return navigateTo('/rechercher');
});