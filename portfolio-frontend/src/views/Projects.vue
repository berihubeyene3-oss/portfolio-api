<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 mb-2">My Projects</h1>
        <v-divider class="mx-auto my-4" style="width: 80px;"></v-divider>
        <p class="text-subtitle-1">Check out what I've built</p>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col v-for="i in 6" :key="i" cols="12" md="6" lg="4">
        <v-card class="rounded-lg" elevation="3" hover>
          <v-img height="200" :src="`https://picsum.photos/400/250?random=${i}`"></v-img>
          <v-card-title>Project {{ i }}</v-card-title>
          <v-card-text>
            <v-chip-group>
              <v-chip size="small" color="primary">Vue.js</v-chip>
              <v-chip size="small" color="success">Node.js</v-chip>
              <v-chip size="small" color="info">MySQL</v-chip>
            </v-chip-group>
            <p class="mt-2">This is a detailed description of the project and its features.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary">
              <v-icon left>mdi-open-in-new</v-icon>
              Live Demo
            </v-btn>
            <v-btn text color="primary">
              <v-icon left>mdi-github</v-icon>
              GitHub
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>