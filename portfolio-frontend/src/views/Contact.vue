<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 mb-2">Contact Me</h1>
        <v-divider class="mx-auto my-4" style="width: 80px;"></v-divider>
        <p class="text-subtitle-1">I'd love to hear from you</p>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="bg-grey-lighten-3">
            <v-icon left>mdi-email</v-icon>
            Send a Message
          </v-card-title>
          <v-card-text class="pa-4">
            <v-form @submit.prevent="sendMessage">
              <v-text-field
                v-model="form.name"
                label="Your Name"
                required
                prepend-inner-icon="mdi-account"
                variant="outlined"
              />

              <v-text-field
                v-model="form.email"
                label="Your Email"
                type="email"
                required
                prepend-inner-icon="mdi-email"
                variant="outlined"
              />

              <v-textarea
                v-model="form.message"
                label="Your Message"
                required
                prepend-inner-icon="mdi-message"
                variant="outlined"
                rows="4"
              />

              <v-alert v-if="successMessage" type="success" variant="tonal" class="mt-2">
                {{ successMessage }}
              </v-alert>

              <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-2">
                {{ errorMessage }}
              </v-alert>

              <v-btn type="submit" color="primary" block size="large" :loading="loading">
                Send Message
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="bg-grey-lighten-3">
            <v-icon left>mdi-information</v-icon>
            Contact Info
          </v-card-title>
          <v-card-text class="pa-4">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>berihubeyene3@gmail.com</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-github</v-icon>
                </template>
                <v-list-item-title>GitHub</v-list-item-title>
                <v-list-item-subtitle>github.com/berihubeyene3</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-linkedin</v-icon>
                </template>
                <v-list-item-title>LinkedIn</v-list-item-title>
                <v-list-item-subtitle>linkedin.com/in/berihubeyene3</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const sendMessage = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await api.post('/messages', form.value)
    if (response.data.success) {
      successMessage.value = 'Message sent successfully!'
      form.value = { name: '', email: '', message: '' }
    } else {
      errorMessage.value = 'Failed to send message'
    }
  } catch (error) {
    errorMessage.value = 'Error sending message'
  } finally {
    loading.value = false
  }
}
</script>