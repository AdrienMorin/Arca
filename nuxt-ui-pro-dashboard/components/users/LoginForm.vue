<script setup lang="ts">
  import type { FormError, FormSubmitEvent } from '#ui/types'
  import { useRouter } from 'vue-router';

  const emit = defineEmits(['close'])
  const router = useRouter();

  const state = reactive({
    password: undefined,
    email: undefined
  })

  // https://ui.nuxt.com/components/form
  const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.name) errors.push({ path: 'password', message: 'Veuillez entrer un mot de passe.' })
    if (!state.email) errors.push({ path: 'email', message: 'Veuillez entrer un email.' })
    return errors
  }

  async function onSubmit (event: FormSubmitEvent<any>) {
    console.log(event.data)

    loginUser({ email: state.email, password: state.password });

    emit('close')
  }

  async function loginUser({ email, password }: { email: any, password: any }) {
    const response = await fetch('http://localhost:3000/login', {
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

    document.cookie = `session=${data.sessionId}; path=/`; //cookie of the session

    router.push('/rechercher'); //redirection
  }

</script>

<template>
  <UDashboardCard title="Connexion" class="md:p-20 mx-auto max-w-lg my-24 border-2 border-blue-600 flex flex-col justify-center items-center text-2xl font-bold">
    <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4 mx-auto max-w-lg" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" placeholder="Entrez votre email" class="text-gray-400 font-light" />
      </UFormGroup>

      <UFormGroup label="Mot de passe" name="motDePasse">
        <UInput v-model="state.password" placeholder="Entrez votre mot de passe" class="text-gray-400 font-light" type="password" autofocus />
      </UFormGroup>

      <div class="flex justify-center">
        <UButton type="submit" label="Se connecter" class="bg-blue-600 hover:bg-blue-500 mt-10 w-72 rounded-2xl justify-center" />
      </div>
    </UForm>
  </UDashboardCard>
</template>
