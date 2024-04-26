<<<<<<< HEAD:nuxt-ui-pro-dashboard/pages/index.vue
<script>
import LoginForm from "~/components/users/LoginForm.vue";
export default {
  components: {
    LoginForm
  }
};
</script>

<template>
    <div class="bg-gradient-to-br from-blue-700 to-purple-900 h-screen flex hover:bg-gradient-to-r">
        <div class="w-full max-w-md mx-auto justify-left">
        <LoginForm />
        </div>
    </div>
    
</template>
=======
<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'
import auth  from "~/components/users/LoginForm.vue";
import but from "~/components/users/but.vue";
import popup from "~/components/users/popup_supressionDoc.vue";

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
       
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <div>
          <!-- ~/components/home/LoginForm.vue -->
          <but/>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

>>>>>>> origin/dev:Arca-Front/pages/index.vue
