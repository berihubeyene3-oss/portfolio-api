<template>
  <v-container fluid class="cv-upload-container">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4" elevation="10" rounded="lg">
          <!-- Card Header -->
          <v-card-title class="text-h5 font-weight-bold primary--text">
            <v-icon left large color="primary">mdi-file-account</v-icon>
            Curriculum Vitae (CV) Management
          </v-card-title>
          
          <v-divider class="my-4"></v-divider>

          <v-card-text>
            <!-- Success/Error Alerts -->
            <v-alert
              v-if="alert.show"
              :type="alert.type"
              :title="alert.title"
              :text="alert.message"
              closable
              class="mb-4"
              @click:close="alert.show = false"
            ></v-alert>

            <!-- Current CV Display -->
            <v-card v-if="currentCV" class="mb-6" variant="outlined" border="primary">
              <v-card-item>
                <template v-slot:prepend>
                  <v-icon color="success" size="40">mdi-file-pdf-box</v-icon>
                </template>
                
                <v-card-title class="text-h6">Current CV</v-card-title>
                
                <template v-slot:append>
                  <v-btn
                    icon="mdi-download"
                    variant="text"
                    color="primary"
                    @click="downloadCV"
                    :loading="downloading"
                  ></v-btn>
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    color="error"
                    @click="confirmDelete"
                    :loading="deleting"
                  ></v-btn>
                </template>
              </v-card-item>
              
              <v-card-text>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="30" class="mr-3">mdi-file-pdf</v-icon>
                  <div>
                    <div class="font-weight-medium">{{ getFileName(currentCV) }}</div>
                    <div class="text-caption text-grey">Uploaded: {{ getFileDate(currentCV) }}</div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-chip color="success" size="small">
                    <v-icon left size="16">mdi-check-circle</v-icon>
                    Current
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>

            <!-- Upload Section -->
            <v-card variant="outlined" class="mb-6">
              <v-card-title class="text-subtitle-1">
                <v-icon left color="primary">mdi-upload</v-icon>
                Upload New CV
              </v-card-title>
              
              <v-card-text>
                <!-- File Upload Area -->
                <v-file-input
                  v-model="cvFile"
                  :rules="fileRules"
                  accept=".pdf"
                  placeholder="Select your CV file"
                  prepend-icon="mdi-file-pdf"
                  label="CV/Resume (PDF only)"
                  :loading="uploading"
                  :disabled="uploading"
                  @update:model-value="handleFileChange"
                  show-size
                  counter
                  clearable
                >
                  <template v-slot:selection="{ file }">
                    <div class="d-flex align-center">
                      <v-icon color="primary" size="24" class="mr-2">mdi-file-pdf</v-icon>
                      <span class="font-weight-medium">{{ file.name }}</span>
                      <span class="text-caption ml-2">({{ formatFileSize(file.size) }})</span>
                    </div>
                  </template>
                </v-file-input>

                <!-- File Preview -->
                <v-card v-if="cvFile && cvFile.name" class="mt-4" variant="tonal" color="info">
                  <v-card-text>
                    <div class="d-flex align-center">
                      <v-progress-circular
                        v-if="uploading"
                        :size="40"
                        :width="3"
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                      <v-icon v-else color="primary" size="40" class="mr-3">mdi-file-pdf</v-icon>
                      <div class="flex-grow-1">
                        <div class="font-weight-bold">{{ cvFile.name }}</div>
                        <div class="text-caption">{{ formatFileSize(cvFile.size) }}</div>
                      </div>
                      <v-btn
                        v-if="!uploading"
                        color="primary"
                        variant="flat"
                        @click="uploadCV"
                        :disabled="!isValidFile"
                      >
                        <v-icon left>mdi-cloud-upload</v-icon>
                        Upload
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Upload Guidelines -->
                <v-alert type="info" variant="tonal" class="mt-4">
                  <div class="text-body-2">
                    <strong>📄 Upload Guidelines:</strong>
                    <ul class="mt-2 mb-0">
                      <li>Only PDF files are allowed</li>
                      <li>Maximum file size: 5MB</li>
                      <li>Filename should be professional (e.g., "John_Doe_CV.pdf")</li>
                      <li>Keep your CV updated for recruiters</li>
                    </ul>
                  </div>
                </v-alert>
              </v-card-text>
            </v-card>

            <!-- CV Information Card -->
            <v-card variant="outlined" color="primary">
              <v-card-title class="text-subtitle-1">
                <v-icon left>mdi-information</v-icon>
                Why Upload Your CV?
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="text-center">
                      <v-icon color="primary" size="32">mdi-briefcase-download</v-icon>
                      <div class="mt-2 font-weight-medium">Job Applications</div>
                      <div class="text-caption">Recruiters can download your CV</div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="text-center">
                      <v-icon color="primary" size="32">mdi-account-star</v-icon>
                      <div class="mt-2 font-weight-medium">Professional Profile</div>
                      <div class="text-caption">Complete your portfolio</div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="text-center">
                      <v-icon color="primary" size="32">mdi-update</v-icon>
                      <div class="mt-2 font-weight-medium">Easy Updates</div>
                      <div class="text-caption">Update anytime for free</div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>

          <!-- Card Actions -->
          <v-card-actions class="mt-4">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="outlined"
              @click="refreshData"
              :loading="refreshing"
            >
              <v-icon left>mdi-refresh</v-icon>
              Refresh
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6 bg-error text-white">
          <v-icon left dark>mdi-alert</v-icon>
          Confirm Delete
        </v-card-title>
        <v-card-text class="mt-4">
          Are you sure you want to delete your CV? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" variant="flat" @click="deleteCV" :loading="deleting">
            Delete Permanently
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import api from '../services/api';

// State variables
const cvFile = ref(null);
const currentCV = ref(null);
const uploading = ref(false);
const downloading = ref(false);
const deleting = ref(false);
const refreshing = ref(false);
const deleteDialog = ref(false);

// Alert state
const alert = ref({
  show: false,
  type: 'success',
  title: '',
  message: ''
});

// File validation rules
const fileRules = [
  value => !value || value.type === 'application/pdf' || 'Only PDF files are allowed',
  value => !value || value.size <= 5 * 1024 * 1024 || 'File size must be less than 5MB',
  value => !value || value.name.length > 0 || 'Please select a file'
];

// Computed property for file validation
const isValidFile = computed(() => {
  return cvFile.value && 
         cvFile.value.type === 'application/pdf' && 
         cvFile.value.size <= 5 * 1024 * 1024;
});

// Show alert message
const showAlert = (type, title, message) => {
  alert.value = {
    show: true,
    type: type,
    title: title,
    message: message
  };
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    alert.value.show = false;
  }, 5000);
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get filename from URL
const getFileName = (url) => {
  if (!url) return '';
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  // Remove timestamp prefix for display
  return filename.replace(/^cv-\d+-/, 'CV_');
};

// Get file date from URL timestamp
const getFileDate = (url) => {
  if (!url) return '';
  const match = url.match(/cv-\d+-(\d+)/);
  if (match) {
    const timestamp = parseInt(match[1]);
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return new Date().toLocaleDateString();
};

// Handle file change
const handleFileChange = (file) => {
  if (!file) return;
  
  if (file.type !== 'application/pdf') {
    showAlert('error', 'Invalid File Type', 'Please upload only PDF files');
    cvFile.value = null;
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    showAlert('error', 'File Too Large', 'File size must be less than 5MB');
    cvFile.value = null;
    return;
  }
};

// Upload CV
const uploadCV = async () => {
  if (!cvFile.value) {
    showAlert('warning', 'No File Selected', 'Please select a CV file to upload');
    return;
  }
  
  if (!isValidFile.value) {
    showAlert('error', 'Invalid File', 'Please select a valid PDF file under 5MB');
    return;
  }
  
  uploading.value = true;
  
  try {
    const formData = new FormData();
    formData.append('cv', cvFile.value);
    
    const response = await api.post('/cv/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });
    
    if (response.data.cv_url || response.data.success) {
      currentCV.value = response.data.cv_url;
      showAlert('success', 'Upload Successful', 'Your CV has been uploaded successfully!');
      cvFile.value = null; // Clear the file input
      
      // Refresh user data to update CV URL
      await fetchCurrentUser();
    }
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to upload CV. Please try again.';
    showAlert('error', 'Upload Failed', errorMessage);
  } finally {
    uploading.value = false;
  }
};

// Download CV
const downloadCV = async () => {
  if (!currentCV.value) {
    showAlert('warning', 'No CV Found', 'No CV available to download');
    return;
  }
  
  downloading.value = true;
  
  try {
    // Get user ID from localStorage or store
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }
    
    const response = await api.get(`/cv/download/${userId}`, {
      responseType: 'blob'
    });
    
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Extract filename from CV URL
    const filename = getFileName(currentCV.value);
    link.setAttribute('download', `${filename}.pdf`);
    
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    showAlert('success', 'Download Started', 'Your CV is being downloaded');
  } catch (error) {
    console.error('Download error:', error);
    showAlert('error', 'Download Failed', 'Failed to download CV. Please try again.');
  } finally {
    downloading.value = false;
  }
};

// Delete CV
const deleteCV = async () => {
  deleting.value = true;
  
  try {
    await api.delete('/cv/delete');
    currentCV.value = null;
    deleteDialog.value = false;
    showAlert('success', 'CV Deleted', 'Your CV has been permanently deleted');
    
    // Refresh user data
    await fetchCurrentUser();
  } catch (error) {
    console.error('Delete error:', error);
    showAlert('error', 'Delete Failed', 'Failed to delete CV. Please try again.');
  } finally {
    deleting.value = false;
  }
};

// Confirm delete dialog
const confirmDelete = () => {
  deleteDialog.value = true;
};

// Fetch current user data
const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/users/profile');
    if (response.data.cv_url) {
      currentCV.value = response.data.cv_url;
    } else {
      currentCV.value = null;
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    // Try alternative endpoint
    try {
      const response2 = await api.get('/auth/profile');
      if (response2.data.cv_url) {
        currentCV.value = response2.data.cv_url;
      }
    } catch (err) {
      console.error('Both endpoints failed');
    }
  }
};

// Refresh all data
const refreshData = async () => {
  refreshing.value = true;
  try {
    await fetchCurrentUser();
    showAlert('info', 'Refreshed', 'CV information has been refreshed');
  } catch (error) {
    console.error('Refresh error:', error);
  } finally {
    refreshing.value = false;
  }
};

// Lifecycle hooks
onMounted(async () => {
  await fetchCurrentUser();
  
  // Add keyboard event listener for Escape key to close dialog
  const handleEscape = (event) => {
    if (event.key === 'Escape' && deleteDialog.value) {
      deleteDialog.value = false;
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  // Cleanup on component unmount
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
  });
});
</script>

<style scoped>
.cv-upload-container {
  max-width: 1200px;
  margin: 0 auto;
}

.v-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Custom file input styling */
:deep(.v-file-input .v-field) {
  border-radius: 12px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .cv-upload-container {
    padding: 8px;
  }
  
  .v-card-title {
    font-size: 1.1rem;
  }
}

/* Loading animation */
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

.v-progress-circular {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>