<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="primary" dark flat rounded-t-lg>
            <v-toolbar-title class="text-h5">
              <v-icon left>mdi-account-plus</v-icon>
              Create Account
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text class="mt-4">
            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="name"
                label="Full Name"
                required
                prepend-inner-icon="mdi-account"
                variant="outlined"
                density="comfortable"
              />

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
                hint="At least 6 characters"
              />

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
                prepend-inner-icon="mdi-lock-check"
                variant="outlined"
                density="comfortable"
              />

              <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-2">
                {{ errorMessage }}
              </v-alert>

              <v-btn type="submit" color="primary" block size="large" :loading="authStore.loading" class="mt-4">
                Sign Up
              </v-btn>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="text-center">
            Already have an account?
            <router-link to="/login" class="text-primary">Sign In</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  const result = await authStore.register(name.value, email.value, password.value)

  if (result.success) {
    router.push('/dashboard')
  } else {
    errorMessage.value = result.message || 'Registration failed'
  }
}
</script>