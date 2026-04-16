<template>
  <v-app-bar color="primary" dark elevation="4">
    <v-app-bar-title>
      <router-link to="/" style="color: white; text-decoration: none;">
        <v-icon icon="mdi-code-tags" class="mr-2"></v-icon>
        My Portfolio
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn text to="/" class="text-none">
      <v-icon left>mdi-home</v-icon>
      Home
    </v-btn>

    <v-btn text to="/projects" class="text-none">
      <v-icon left>mdi-folder</v-icon>
      Projects
    </v-btn>

    <v-btn text to="/skills" class="text-none">
      <v-icon left>mdi-brain</v-icon>
      Skills
    </v-btn>

    <v-btn text to="/blog" class="text-none">
      <v-icon left>mdi-post</v-icon>
      Blog
    </v-btn>

    <v-btn text to="/contact" class="text-none">
      <v-icon left>mdi-email</v-icon>
      Contact
    </v-btn>

    <template v-if="authStore.isAuthenticated">
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn text to="/dashboard" class="text-none">
        <v-icon left>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
      <v-btn text @click="logout" class="text-none">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
    </template>

    <template v-else>
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn text to="/login" class="text-none">
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
      <v-btn text to="/register" class="text-none">
        <v-icon left>mdi-account-plus</v-icon>
        Register
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>