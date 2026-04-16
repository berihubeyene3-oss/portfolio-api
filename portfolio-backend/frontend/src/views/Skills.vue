<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 mb-2">My Skills</h1>
        <v-divider class="mx-auto my-4" style="width: 80px;"></v-divider>
        <p class="text-subtitle-1">Technologies I work with</p>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <h3 class="mb-4">Frontend</h3>
        <v-list>
          <v-list-item v-for="skill in frontendSkills" :key="skill.name">
            <template v-slot:prepend>
              <v-icon color="primary">{{ skill.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ skill.name }}</v-list-item-title>
            <template v-slot:append>
              <v-progress-circular :model-value="skill.level" color="primary" size="40" width="5">
                {{ skill.level }}%
              </v-progress-circular>
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <h3 class="mb-4">Backend</h3>
        <v-list>
          <v-list-item v-for="skill in backendSkills" :key="skill.name">
            <template v-slot:prepend>
              <v-icon color="success">{{ skill.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ skill.name }}</v-list-item-title>
            <template v-slot:append>
              <v-progress-circular :model-value="skill.level" color="success" size="40" width="5">
                {{ skill.level }}%
              </v-progress-circular>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const frontendSkills = [
  { name: 'Vue.js', level: 90, icon: 'mdi-vuejs' },
  { name: 'JavaScript', level: 85, icon: 'mdi-language-javascript' },
  { name: 'HTML5/CSS3', level: 88, icon: 'mdi-language-html5' },
  { name: 'Vuetify', level: 82, icon: 'mdi-vuetify' },
]

const backendSkills = [
  { name: 'Node.js', level: 85, icon: 'mdi-nodejs' },
  { name: 'Express.js', level: 82, icon: 'mdi-express' },
  { name: 'MySQL', level: 80, icon: 'mdi-database' },
  { name: 'REST APIs', level: 88, icon: 'mdi-api' },
]
</script>