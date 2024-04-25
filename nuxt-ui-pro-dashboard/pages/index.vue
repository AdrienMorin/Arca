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

