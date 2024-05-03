import axios from '~/node_modules/axios/index'

export default defineNuxtRouteMiddleware(async(to, from)=> {
  console.log('auth middleware')
  try {
    let tokenCookie = useCookie('token')
    const token = tokenCookie.value

    const response = await axios.get('https://127.0.0.1:3333/api', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    //console.log('response:', response.data)
    if (response.data !== 'Vous êtes connecté') {
      //console.log('Vous êtes pas connecté')
      return navigateTo('/login')
    } else {
      //console.log('Vous êtes connecté')
      return
    }

  } catch (error) {
      console.error('Error checking auth:', error)
  }
});
