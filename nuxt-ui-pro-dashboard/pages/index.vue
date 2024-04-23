<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'
import LoginForm from "~/components/users/LoginForm.vue";
import Navbar from "~/components/users/Navbar.vue";
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
    <Navbar>
    </Navbar>
      <UDashboardNavbar title="Home">
       
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <div>
          <!-- ~/components/home/LoginForm.vue -->
          <LoginForm />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>