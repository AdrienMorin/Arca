<script>
import LoginForm from "~/components/users/LoginForm.vue";
export default {
  components: {
    LoginForm
  }
};
</script>

<template>
    <div class="bg-gradient-to-br from-blue-700 to-purple-900 h-full flex hover:bg-gradient-to-r">
        <div class="w-full max-w-md mx-auto justify-left">
        <LoginForm />
        </div>
    </div>
</template>