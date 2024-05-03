<script>
import LoginForm from "~/components/users/LoginForm.vue";
export default {
  components: {
    LoginForm
  },
};
definePageMeta({
  layout: 'login-layout'
})
</script>

<template>
    <div class="bg-gradient-to-br from-blue-700 to-purple-900 h-screen flex hover:bg-gradient-to-r">
        <div class="w-full max-w-md mx-auto justify-left">
        <LoginForm />
        </div>
    </div>
</template>
