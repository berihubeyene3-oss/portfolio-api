<template>
  <v-footer color="grey-darken-3" dark padless>
    <v-row justify="center" no-gutters class="py-4">
      <v-col class="text-center">
        <div class="mb-3">
          <v-btn v-for="icon in icons" :key="icon.name" :href="icon.link" target="_blank" icon class="mx-1">
            <v-icon>{{ icon.icon }}</v-icon>
          </v-btn>
        </div>
        <strong> Portfolio</strong> - &copy; {{ new Date().getFullYear() }} All Rights Reserved
        <br>
        <small>Built with Vue.js & Vuetify</small>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
const icons = [
  { name: 'github', icon: 'mdi-github', link: 'https://github.com/' },
  { name: 'linkedin', icon: 'mdi-linkedin', link: 'https://linkedin.com/' },
  { name: 'twitter', icon: 'mdi-twitter', link: 'https://twitter.com/' },
]
</script>