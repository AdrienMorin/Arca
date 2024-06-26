import axios from '~/node_modules/axios/index'

export default defineNuxtRouteMiddleware(async(to, from)=> {
  try {
    let tokenCookie = useCookie('token')
    const token = tokenCookie.value

    const response = await axios.get('https://127.0.0.1:3333/api/auth/isLoggedInAsAdmin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data.message === "Vous êtes connecté en tant qu'administrateur") {
      return
    }
    return navigateTo('/')

  } catch (error) {
    console.error('Error checking auth:', error)
  }
});
