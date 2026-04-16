<template>
<!-- Hero Section -->
<v-parallax src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600" height="500">
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12">
        
        <!-- Profile Photo -->
        <v-avatar size="200" class="mb-3 border-white">
          <v-img src="/yaki.jpg" alt="Ykaalo G/Michael" cover></v-img>
        </v-avatar>
        
        <h1 class="text-h3 font-weight-bold" style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
          Ykaalo G/Michael
        </h1>
        
        <h3 class="text-subtitle-1 mt-2" style="color: white; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">
          Computer Science Student at Raya University
        </h3>
        
        <v-btn color="primary" size="medium" class="mt-3" to="/contact">
          Get In Touch
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
        
      </v-col>
    </v-row>
  </v-container>
</v-parallax>
  <!-- About Section -->
  <v-container class="my-8">
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 mb-2">About Me</h2>
        <v-divider class="mx-auto my-4" style="width: 80px;"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <p class="text-body-1">
          I am a passionate Full Stack Developer with expertise in building modern web applications.
          I love creating beautiful, responsive, and user-friendly interfaces.
        </p>
        <p class="text-body-1 mt-3">
          With a strong background in Node.js, Vue.js, and MySQL, I deliver high-quality solutions
          that meet client needs and exceed expectations.
        </p>
        <v-chip class="mt-2 mr-2" color="primary">Node.js</v-chip>
        <v-chip class="mt-2 mr-2" color="primary">Vue.js</v-chip>
        <v-chip class="mt-2 mr-2" color="primary">Express</v-chip>
        <v-chip class="mt-2" color="primary">MySQL</v-chip>
      </v-col>
      <v-col cols="12" md="6">
        <v-sheet class="pa-4" color="grey-lighten-3" rounded>
          <h3>What I Do</h3>
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-code-tags</v-icon>
              </template>
              <v-list-item-title>Frontend Development</v-list-item-title>
              <v-list-item-subtitle>Vue.js, Vuetify, HTML5, CSS3</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-server</v-icon>
              </template>
              <v-list-item-title>Backend Development</v-list-item-title>
              <v-list-item-subtitle>Node.js, Express, RESTful APIs</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-database</v-icon>
              </template>
              <v-list-item-title>Database Design</v-list-item-title>
              <v-list-item-subtitle>MySQL, MongoDB, PostgreSQL</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <!-- Featured Projects -->
  <v-container class="bg-grey-lighten-4 py-8" fluid>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 mb-2">Featured Projects</h2>
          <v-divider class="mx-auto my-4" style="width: 80px;"></v-divider>
          <p class="text-subtitle-1">Some of my best work</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="i in 3" :key="i" cols="12" md="4">
          <v-card class="rounded-lg" elevation="3" hover>
            <v-img height="200" :src="`https://picsum.photos/400/250?random=${i}`"></v-img>
            <v-card-title>Project {{ i }}</v-card-title>
            <v-card-text>
              This is a description of my amazing project. Built with modern technologies.
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary">Live Demo</v-btn>
              <v-btn text color="primary">GitHub</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>