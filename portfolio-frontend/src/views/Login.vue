<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="primary" dark flat rounded-t-lg>
            <v-toolbar-title class="text-h5">
              <v-icon left>mdi-login</v-icon>
              Welcome Back
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text class="mt-4">
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email Address"
                type="email"
                required
                prepend-inner-icon="mdi-email"
                variant="outlined"
                density="comfortable"
              />

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                density="comfortable"
              />

              <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-2">
                {{ errorMessage }}
              </v-alert>

              <v-btn type="submit" color="primary" block size="large" :loading="authStore.loading" class="mt-4">
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="text-center">
            Don't have an account?
            <router-link to="/register" class="text-primary">Create one now</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    router.push('/dashboard')
  } else {
    errorMessage.value = result.message || 'Invalid email or password'
  }
}
</script>