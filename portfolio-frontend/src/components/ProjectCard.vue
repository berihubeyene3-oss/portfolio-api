<template>
  <v-card class="project-card" elevation="3" :to="`/projects/${project.id}`">
    <!-- Admin Actions (Edit/Delete) - Only visible in admin mode -->
    <div v-if="adminMode" class="project-actions">
      <v-btn
        icon
        size="small"
        color="info"
        @click.stop="$emit('edit', project)"
        class="mr-1"
      >
        <v-icon size="small">mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        size="small"
        color="error"
        @click.stop="$emit('delete', project)"
      >
        <v-icon size="small">mdi-delete</v-icon>
      </v-btn>
    </div>

    <!-- Project Image -->
    <v-img
      :src="project.image || defaultImage"
      height="200"
      class="project-image"
      cover
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <!-- Project Title -->
    <v-card-title class="text-h6 font-weight-bold">
      {{ project.title }}
    </v-card-title>

    <!-- Technologies Chips -->
    <v-card-subtitle v-if="project.technologies">
      <v-chip
        v-for="tech in technologies"
        :key="tech"
        size="x-small"
        class="mr-1 mb-1"
        color="primary"
        variant="outline"
      >
        {{ tech }}
      </v-chip>
    </v-card-subtitle>

    <!-- Description -->
    <v-card-text class="text-body-2">
      {{ truncatedDescription }}
    </v-card-text>

    <!-- Action Buttons -->
    <v-card-actions>
      <v-btn
        v-if="project.github_link"
        :href="project.github_link"
        target="_blank"
        variant="text"
        size="small"
        @click.stop
      >
        <v-icon left size="small">mdi-github</v-icon>
        GitHub
      </v-btn>
      
      <v-btn
        v-if="project.demo_link"
        :href="project.demo_link"
        target="_blank"
        color="primary"
        variant="text"
        size="small"
        @click.stop
      >
        <v-icon left size="small">mdi-open-in-new</v-icon>
        Demo
      </v-btn>
      
      <v-spacer></v-spacer>
      
      <v-btn
        icon
        variant="text"
        size="small"
        :to="`/projects/${project.id}`"
        @click.stop
      >
        <v-icon size="small">mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value.id !== 'undefined' && typeof value.title !== 'undefined'
    }
  },
  adminMode: {
    type: Boolean,
    default: false
  },
  maxDescriptionLength: {
    type: Number,
    default: 100
  }
})

// Emits for admin actions
const emit = defineEmits(['edit', 'delete'])

// Default image if none provided
const defaultImage = 'https://via.placeholder.com/400x200?text=Project+Screenshot'

// Parse technologies from comma-separated string to array
const technologies = computed(() => {
  if (!props.project.technologies) return []
  return props.project.technologies.split(',').map(t => t.trim())
})

// Truncate description if too long
const truncatedDescription = computed(() => {
  if (!props.project.description) return ''
  if (props.project.description.length <= props.maxDescriptionLength) {
    return props.project.description
  }
  return props.project.description.substring(0, props.maxDescriptionLength) + '...'
})
</script>

<style scoped>
.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.project-image {
  border-radius: 12px 12px 0 0;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.02);
}

.v-card-actions {
  margin-top: auto;
}

.project-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>