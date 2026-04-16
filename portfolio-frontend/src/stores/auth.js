import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
    },

    actions: {
        async register(name, email, password) {
            this.loading = true
            try {
                const response = await api.post('/users/register', { name, email, password })
                if (response.data.success) {
                    this.token = response.data.token
                    this.user = response.data.user
                    localStorage.setItem('token', response.data.token)
                    return { success: true }
                }
                return { success: false, message: response.data.message }
            } catch (error) {
                return { success: false, message: error.response?.data?.message || 'Registration failed' }
            } finally {
                this.loading = false
            }
        },

        async login(email, password) {
            this.loading = true
            try {
                const response = await api.post('/users/login', { email, password })
                if (response.data.success) {
                    this.token = response.data.token
                    this.user = response.data.user
                    localStorage.setItem('token', response.data.token)
                    return { success: true }
                }
                return { success: false, message: response.data.message }
            } catch (error) {
                return { success: false, message: error.response?.data?.message || 'Login failed' }
            } finally {
                this.loading = false
            }
        },

        async fetchProfile() {
            try {
                const response = await api.get('/users/profile')
                if (response.data.success) {
                    this.user = response.data.user
                }
            } catch (error) {
                console.error('Fetch profile error:', error)
            }
        },

        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
        },
    },
})