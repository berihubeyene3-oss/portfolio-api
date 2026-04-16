<template>
  <!-- Hero Section with YOUR local image -->
  <v-parallax :src="heroImage" height="550">
    <v-container class="fill-height">
      <v-row align="center" justify="center" class="text-center">
        <v-col cols="12">
          <!-- Profile Photo - YOUR local image -->
          <v-avatar size="180" class="mb-4 border-white">
            <v-img :src="profileImage" alt="Profile Photo" cover></v-img>
          </v-avatar>
          
          <h1 class="text-h2 font-weight-bold" style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            Berihu Beyene
          </h1>
          
          <h3 class="text-h5 mt-3" style="color: white; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">
            Full Stack Developer | Vue.js & Node.js Expert
          </h3>
          
          <p class="text-subtitle-1 mt-2" style="color: white; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">
            Raya University - Computer Science Department
          </p>
          
          <v-btn color="primary" size="large" class="mt-4" to="/contact">
            Get In Touch
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
          
          <v-btn variant="outlined" size="large" class="mt-4 ml-3" style="color: white; border-color: white;" to="/projects">
            View Projects
            <v-icon end>mdi-folder</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>

  <!-- About Section -->
  <v-container class="my-12">
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 mb-2">About Me</h2>
        <v-divider class="mx-auto my-4" style="width: 80px; border-color: #1976D2;" thickness="3"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <h3 class="text-h5 mb-3">Who Am I?</h3>
        <p class="text-body-1">
          I'm Berihu Beyene, a passionate Full Stack Developer with 3+ years of experience in building 
          modern web applications. I specialize in creating beautiful, responsive, and 
          user-friendly interfaces that deliver exceptional user experiences.
        </p>
        <p class="text-body-1 mt-3">
          Currently studying Computer Science at <strong>Raya University</strong>, I've worked on numerous 
          projects ranging from e-commerce platforms to portfolio websites. I'm constantly 
          learning new technologies and improving my skills.
        </p>
        <p class="text-body-1 mt-3">
          My goal is to become a world-class software engineer and contribute to open-source 
          projects that make a difference in people's lives.
        </p>
        
        <div class="mt-4">
          <v-chip class="mr-2 mb-2" color="primary" variant="flat">JavaScript</v-chip>
          <v-chip class="mr-2 mb-2" color="primary" variant="flat">Vue.js</v-chip>
          <v-chip class="mr-2 mb-2" color="primary" variant="flat">React</v-chip>
          <v-chip class="mr-2 mb-2" color="primary" variant="flat">Node.js</v-chip>
          <v-chip class="mr-2 mb-2" color="primary" variant="flat">Express</v-chip>
          <v-chip class="mr-2 mb-2" color="primary" variant="flat">MySQL</v-chip>
          <v-chip class="mr-2 mb-2" color="primary" variant="flat">MongoDB</v-chip>
          <v-chip class="mb-2" color="primary" variant="flat">Git & GitHub</v-chip>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-sheet class="pa-6" color="grey-lighten-3" rounded="lg">
          <h3 class="text-h5 mb-4">What I Do</h3>
          <v-list bg-color="transparent">
            <v-list-item class="mb-3">
              <template v-slot:prepend>
                <v-icon color="primary" size="32">mdi-code-tags</v-icon>
              </template>
              <v-list-item-title class="text-h6">Frontend Development</v-list-item-title>
              <v-list-item-subtitle>Building responsive SPAs with Vue.js, Vuetify, and modern CSS</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item class="mb-3">
              <template v-slot:prepend>
                <v-icon color="primary" size="32">mdi-server</v-icon>
              </template>
              <v-list-item-title class="text-h6">Backend Development</v-list-item-title>
              <v-list-item-subtitle>Creating RESTful APIs with Node.js, Express, and authentication</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item class="mb-3">
              <template v-slot:prepend>
                <v-icon color="primary" size="32">mdi-database</v-icon>
              </template>
              <v-list-item-title class="text-h6">Database Design</v-list-item-title>
              <v-list-item-subtitle>Designing efficient database schemas with MySQL and MongoDB</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary" size="32">mdi-cloud-upload</v-icon>
              </template>
              <v-list-item-title class="text-h6">Deployment</v-list-item-title>
              <v-list-item-subtitle>Deploying applications to Vercel, Netlify, and AWS</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <!-- Featured Projects Section -->
  <v-container class="bg-grey-lighten-4 py-12" fluid>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 mb-2">Featured Projects</h2>
          <v-divider class="mx-auto my-4" style="width: 80px; border-color: #1976D2;" thickness="3"></v-divider>
          <p class="text-subtitle-1">Here are some of my best work</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="rounded-lg" elevation="3" hover>
            <v-img height="220" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" cover>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title class="text-h6">E-Commerce Platform</v-card-title>
            <v-card-text>
              A full-featured e-commerce platform with shopping cart, user authentication, 
              and payment integration using Stripe.
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary" href="#" target="_blank">Live Demo</v-btn>
              <v-btn text color="primary" href="#" target="_blank">GitHub</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="rounded-lg" elevation="3" hover>
            <v-img height="220" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" cover>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title class="text-h6">Task Management App</v-card-title>
            <v-card-text>
              A productivity app for managing tasks and projects with real-time updates, 
              drag-and-drop functionality, and team collaboration.
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary" href="#" target="_blank">Live Demo</v-btn>
              <v-btn text color="primary" href="#" target="_blank">GitHub</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="rounded-lg" elevation="3" hover>
            <v-img height="220" src="https://images.unsplash.com/photo-1557838923-2985c318be48?w=400" cover>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title class="text-h6">Social Media Dashboard</v-card-title>
            <v-card-text>
              A social media analytics dashboard that displays real-time data from multiple 
              platforms with beautiful charts and graphs.
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary" href="#" target="_blank">Live Demo</v-btn>
              <v-btn text color="primary" href="#" target="_blank">GitHub</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12" class="text-center">
          <v-btn color="primary" size="large" to="/projects" variant="outlined">
            View All Projects
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <!-- Skills & Experience Section -->
  <v-container class="my-12">
    <v-row>
      <v-col cols="12" md="6">
        <h3 class="text-h4 mb-4 text-center text-md-left">Technical Skills</h3>
        <v-progress-linear v-model="skillLevels.js" height="25" rounded color="primary" class="mb-4">
          <template v-slot:default="{ value }">
            <strong class="white--text px-2">JavaScript/TypeScript - {{ Math.round(value) }}%</strong>
          </template>
        </v-progress-linear>
        
        <v-progress-linear v-model="skillLevels.vue" height="25" rounded color="primary" class="mb-4">
          <template v-slot:default="{ value }">
            <strong class="white--text px-2">Vue.js - {{ Math.round(value) }}%</strong>
          </template>
        </v-progress-linear>
        
        <v-progress-linear v-model="skillLevels.node" height="25" rounded color="primary" class="mb-4">
          <template v-slot:default="{ value }">
            <strong class="white--text px-2">Node.js/Express - {{ Math.round(value) }}%</strong>
          </template>
        </v-progress-linear>
        
        <v-progress-linear v-model="skillLevels.sql" height="25" rounded color="primary" class="mb-4">
          <template v-slot:default="{ value }">
            <strong class="white--text px-2">SQL/MySQL - {{ Math.round(value) }}%</strong>
          </template>
        </v-progress-linear>
      </v-col>

      <v-col cols="12" md="6">
        <h3 class="text-h4 mb-4 text-center text-md-left">Education</h3>
        <v-timeline density="compact" align="start">
          <v-timeline-item dot-color="primary" size="small">
            <v-card class="pa-3" elevation="2">
              <h4>Bachelor of Science in Computer Science</h4>
              <p class="text-subtitle-2 text-primary">Raya University | 2022 - Present</p>
              <p>Focus on Full Stack Development, Database Design, and Software Engineering.</p>
            </v-card>
          </v-timeline-item>
          
          <v-timeline-item dot-color="primary" size="small">
            <v-card class="pa-3" elevation="2">
              <h4>Full Stack Web Development Bootcamp</h4>
              <p class="text-subtitle-2 text-primary">Online | 2024</p>
              <p>Intensive program covering MERN stack, REST APIs, and deployment.</p>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>

  <!-- Raya University Campus Section -->
  <v-container class="bg-primary py-12" fluid>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="text-center text-md-left">
          <h2 class="text-h3 mb-3" style="color: white;">Raya University</h2>
          <p class="text-h6 mb-4" style="color: white; opacity: 0.9;">
            Center of Excellence in Higher Education
          </p>
          <p style="color: white; opacity: 0.8;">
            Raya University is committed to providing quality education and fostering innovation 
            in science and technology. The university boasts state-of-the-art facilities, 
            experienced faculty, and a vibrant campus life.
          </p>
          <v-btn color="white" size="large" href="https://www.rayauniversity.edu.et" target="_blank" variant="elevated">
            Learn More
            <v-icon end>mdi-open-in-new</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-img 
            :src="campusImage"
            height="250" 
            rounded="lg"
            cover
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="white"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <!-- Contact CTA Section -->
  <v-container class="py-12" fluid>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 mb-3">Ready to Work Together?</h2>
          <p class="text-h6 mb-4 text-grey">
            Let's create something amazing!
          </p>
          <v-btn color="primary" size="large" to="/contact" variant="elevated">
            Contact Me Now
            <v-icon end>mdi-email</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import heroImage from '@/assets/my-image.jpg'
import profileImage from '@/assets/my-image.jpg'
import campusImage from '@/assets/my-image.jpg'

// Skill levels (percentage)
const skillLevels = ref({
  js: 90,
  vue: 85,
  node: 80,
  sql: 75
})
</script>

<style scoped>
.border-white {
  border: 4px solid white;
}

.v-parallax {
  position: relative;
}

.v-parallax::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.v-timeline-item .v-card {
  transition: transform 0.3s ease;
}

.v-timeline-item .v-card:hover {
  transform: translateX(5px);
}
</style>