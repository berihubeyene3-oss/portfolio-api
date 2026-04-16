<template>
  <v-card class="skill-card" elevation="3" :class="{ 'admin-mode': adminMode }">
    <!-- Admin Actions (Edit/Delete) - Only visible in admin mode -->
    <div v-if="adminMode" class="skill-actions">
      <v-btn
        icon
        size="small"
        color="info"
        @click.stop="$emit('edit', skill)"
        class="mr-1"
      >
        <v-icon size="small">mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        size="small"
        color="error"
        @click.stop="$emit('delete', skill)"
      >
        <v-icon size="small">mdi-delete</v-icon>
      </v-btn>
    </div>

    <!-- Skill Icon -->
    <div class="skill-icon text-center pt-4">
      <v-icon :size="48" :color="iconColor">
        {{ getSkillIcon(skill.skill_name) }}
      </v-icon>
    </div>

    <!-- Skill Name -->
    <v-card-title class="text-h6 font-weight-bold text-center pt-2">
      {{ skill.skill_name }}
    </v-card-title>

    <!-- Skill Level Badge -->
    <div class="text-center mb-2">
      <v-chip :color="levelColor" text-color="white" size="small">
        {{ skill.level }}% Proficiency
      </v-chip>
    </div>

    <!-- Progress Bar -->
    <v-card-text class="pt-0">
      <v-progress-linear
        :model-value="skill.level"
        :color="levelColor"
        height="12"
        rounded
        class="mb-1"
      >
        <template v-slot:default="{ value }">
          <strong class="white--text px-2">{{ Math.round(value) }}%</strong>
        </template>
      </v-progress-linear>

      <!-- Level Labels -->
      <div class="d-flex justify-space-between mt-2">
        <span class="text-caption" :class="{ 'text-primary': skill.level >= 20 }">Beginner</span>
        <span class="text-caption" :class="{ 'text-primary': skill.level >= 40 }">Intermediate</span>
        <span class="text-caption" :class="{ 'text-primary': skill.level >= 60 }">Advanced</span>
        <span class="text-caption" :class="{ 'text-primary': skill.level >= 80 }">Expert</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  skill: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value.id !== 'undefined' && typeof value.skill_name !== 'undefined'
    }
  },
  adminMode: {
    type: Boolean,
    default: false
  }
})

// Emits for admin actions
const emit = defineEmits(['edit', 'delete'])

// Get color based on skill level
const levelColor = computed(() => {
  const level = props.skill.level
  if (level >= 80) return 'success'
  if (level >= 60) return 'primary'
  if (level >= 40) return 'warning'
  if (level >= 20) return 'orange'
  return 'grey'
})

// Get icon color based on level
const iconColor = computed(() => {
  const level = props.skill.level
  if (level >= 80) return 'success'
  if (level >= 60) return 'primary'
  if (level >= 40) return 'warning'
  return 'grey'
})

// Get icon based on skill name
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase()
  
  // JavaScript & Frontend
  if (name.includes('javascript') || name.includes('js')) return 'mdi-language-javascript'
  if (name.includes('typescript') || name.includes('ts')) return 'mdi-language-typescript'
  if (name.includes('vue')) return 'mdi-vuejs'
  if (name.includes('react')) return 'mdi-react'
  if (name.includes('angular')) return 'mdi-angular'
  if (name.includes('html')) return 'mdi-language-html5'
  if (name.includes('css')) return 'mdi-language-css3'
  if (name.includes('sass') || name.includes('scss')) return 'mdi-sass'
  if (name.includes('bootstrap')) return 'mdi-bootstrap'
  if (name.includes('tailwind')) return 'mdi-tailwind'
  
  // Backend
  if (name.includes('node')) return 'mdi-nodejs'
  if (name.includes('express')) return 'mdi-nodejs'
  if (name.includes('python')) return 'mdi-language-python'
  if (name.includes('django')) return 'mdi-django'
  if (name.includes('flask')) return 'mdi-flask'
  if (name.includes('php')) return 'mdi-language-php'
  if (name.includes('laravel')) return 'mdi-laravel'
  if (name.includes('java')) return 'mdi-language-java'
  if (name.includes('spring')) return 'mdi-spring'
  if (name.includes('csharp') || name.includes('c#')) return 'mdi-language-csharp'
  if (name.includes('dotnet') || name.includes('.net')) return 'mdi-microsoft-dotnet'
  if (name.includes('go') || name.includes('golang')) return 'mdi-language-go'
  if (name.includes('rust')) return 'mdi-language-rust'
  if (name.includes('ruby')) return 'mdi-language-ruby'
  if (name.includes('rails')) return 'mdi-rails'
  
  // Databases
  if (name.includes('sql') || name.includes('mysql')) return 'mdi-database'
  if (name.includes('postgresql') || name.includes('postgres')) return 'mdi-database'
  if (name.includes('mongodb')) return 'mdi-database'
  if (name.includes('firebase')) return 'mdi-firebase'
  if (name.includes('redis')) return 'mdi-database'
  
  // DevOps & Tools
  if (name.includes('git')) return 'mdi-git'
  if (name.includes('github')) return 'mdi-github'
  if (name.includes('gitlab')) return 'mdi-gitlab'
  if (name.includes('docker')) return 'mdi-docker'
  if (name.includes('kubernetes') || name.includes('k8s')) return 'mdi-kubernetes'
  if (name.includes('jenkins')) return 'mdi-jenkins'
  if (name.includes('aws')) return 'mdi-aws'
  if (name.includes('azure')) return 'mdi-microsoft-azure'
  if (name.includes('gcp') || name.includes('google cloud')) return 'mdi-google-cloud'
  
  // Design
  if (name.includes('figma')) return 'mdi-figma'
  if (name.includes('photoshop') || name.includes('ps')) return 'mdi-adobe-photoshop'
  if (name.includes('illustrator') || name.includes('ai')) return 'mdi-adobe-illustrator'
  if (name.includes('xd')) return 'mdi-adobe-xd'
  
  // Mobile
  if (name.includes('flutter')) return 'mdi-flutter'
  if (name.includes('react native')) return 'mdi-react'
  if (name.includes('swift')) return 'mdi-language-swift'
  if (name.includes('kotlin')) return 'mdi-language-kotlin'
  if (name.includes('android')) return 'mdi-android'
  if (name.includes('ios')) return 'mdi-apple'
  
  // Default
  return 'mdi-code-tags'
}
</script>

<style scoped>
.skill-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.skill-card.admin-mode {
  cursor: pointer;
}

.skill-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skill-icon {
  transition: transform 0.2s ease;
}

.skill-card:hover .skill-icon {
  transform: scale(1.05);
}
</style>