<template>
  <v-container>
    <!-- Welcome Banner -->
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" color="primary" dark>
          <v-card-text class="pa-5">
            <div class="d-flex align-center">
              <v-avatar size="80" class="mr-4">
             <v-img src="/yki.JPG" alt="Profile"></v-img>
             </v-avatar>
              <div>
                <h1 class="text-h4">Welcome back, {{ authStore.user?.name }}!</h1>
                <p class="text-subtitle-1">This is your personal dashboard</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Stats Cards -->
    <v-row class="mt-4">
      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text class="text-center">
            <v-icon color="primary" size="40">mdi-folder</v-icon>
            <h2 class="text-h3 mt-2">{{ stats.projects }}</h2>
            <p class="text-subtitle-1">Projects</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text class="text-center">
            <v-icon color="success" size="40">mdi-brain</v-icon>
            <h2 class="text-h3 mt-2">{{ stats.skills }}</h2>
            <p class="text-subtitle-1">Skills</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text class="text-center">
            <v-icon color="warning" size="40">mdi-post</v-icon>
            <h2 class="text-h3 mt-2">{{ stats.blogs }}</h2>
            <p class="text-subtitle-1">Blog Posts</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text class="text-center">
            <v-icon color="error" size="40">mdi-email</v-icon>
            <h2 class="text-h3 mt-2">{{ stats.messages }}</h2>
            <p class="text-subtitle-1">Messages</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Profile Info -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="bg-grey-lighten-3">
            <v-icon left>mdi-account</v-icon>
            Profile Information
          </v-card-title>
          <v-card-text class="pa-4">
            <v-list lines="two">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-account</v-icon>
                </template>
                <v-list-item-title>Name</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user?.name }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-email</v-icon>
                </template>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user?.email }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-calendar</v-icon>
                </template>
                <v-list-item-title>Member Since</v-list-item-title>
                <v-list-item-subtitle>{{ formattedDate }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="bg-grey-lighten-3">
            <v-icon left>mdi-cog</v-icon>
            Quick Actions
          </v-card-title>
          <v-card-text class="pa-4">
            <v-row>
              <v-col cols="6">
                <v-btn color="primary" block to="/projects">
                  <v-icon left>mdi-folder-plus</v-icon>
                  Add Project
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="success" block to="/skills">
                  <v-icon left>mdi-brain</v-icon>
                  Add Skill
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="warning" block to="/blog">
                  <v-icon left>mdi-post</v-icon>
                  Write Blog
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="info" block to="/contact">
                  <v-icon left>mdi-email</v-icon>
                  View Messages
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

const authStore = useAuthStore()
const stats = ref({
  projects: 0,
  skills: 0,
  blogs: 0,
  messages: 0,
})

const formattedDate = computed(() => {
  if (!authStore.user?.created_at) return 'N/A'
  return new Date(authStore.user.created_at).toLocaleDateString()
})

onMounted(async () => {
  try {
    const [projectsRes, skillsRes, blogsRes, messagesRes] = await Promise.all([
      api.get('/projects').catch(() => ({ data: { projects: [] } })),
      api.get('/skills').catch(() => ({ data: { skills: [] } })),
      api.get('/blogs').catch(() => ({ data: { blogs: [] } })),
      api.get('/messages').catch(() => ({ data: { messages: [] } })),
    ])

    stats.value.projects = projectsRes.data.projects?.length || 0
    stats.value.skills = skillsRes.data.skills?.length || 0
    stats.value.blogs = blogsRes.data.blogs?.length || 0
    stats.value.messages = messagesRes.data.messages?.length || 0
  } catch (error) {
    console.error('Error loading stats:', error)
  }
})
</script>