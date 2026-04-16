<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 mb-2">Blog Posts</h1>
        <v-divider class="mx-auto my-4" style="width: 80px;"></v-divider>
        <p class="text-subtitle-1">Thoughts and tutorials</p>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col v-for="i in 3" :key="i" cols="12">
        <v-card class="rounded-lg mb-4" elevation="2" hover>
          <v-card-title>
            <v-icon left color="primary">mdi-post</v-icon>
            Blog Post Title {{ i }}
          </v-card-title>
          <v-card-subtitle>Published on April {{ i }}, 2026</v-card-subtitle>
          <v-card-text>
            This is a preview of the blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <v-chip size="small" class="mt-2" color="primary">Technology</v-chip>
            <v-chip size="small" class="mt-2 ml-2" color="success">Tutorial</v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional logic needed for now
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.mt-2 {
  margin-top: 8px;
}
.ml-2 {
  margin-left: 8px;
}
</style>