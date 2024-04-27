import axios from "axios";  
export default defineNuxtRouteMiddleware(async(to, from)=> {
    console.log("hi middleware");
    let isLoggedIn = false;
    const response = await axios.get("https://127.0.0.1:3333/api/", {});
    console.log(response.data);
    if(response.data=='Vous êtes connecté'){
        isLoggedIn=true;
    }
    if(isLoggedIn){
        return navigateTo(to.fullPath);
    }
    if (to.path !== '/login') {
        return navigateTo('/login');
    }
});