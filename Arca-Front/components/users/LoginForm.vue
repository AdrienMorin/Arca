
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['close'])
const router = useRouter()

const state = reactive({
  password: undefined,
  email: undefined
})

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  console.log("ok")
  router.push('/Ajout_document');
  const errors = []
  if (!state.name) errors.push({ path: 'password', message: 'Veuillez entrer un mot de passe.' })
  if (!state.email) errors.push({ path: 'email', message: 'Veuillez entrer un email.' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  console.log(event.data)

  loginUser({email: state.email, password: state.password});

  emit('close')
}

async function loginUser({email, password}: { email: any, password: any }) {
  const response = await fetch('http://localhost:3333/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  // Store the token in a secure way
  localStorage.setItem('token', data.token);
}

</script>

<template>
  <UDashboardCard title="Connexion" description="Entrez vos identifiants." icon="i-heroicons-chart-bar-20-solid">
    <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4" @submit="onSubmit">

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>

      <UFormGroup label="Mot de passe" name="motDePasse">
        <UInput v-model="state.password" type="password" autofocus />
      </UFormGroup>

      <div class="flex justify-end gap-3">
        <UButton type="submit" label="Se connecter" color="black" />
      </div>
    </UForm>
  </UDashboardCard>
</template>
