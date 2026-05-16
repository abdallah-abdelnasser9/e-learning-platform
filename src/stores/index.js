import { defineStore } from 'pinia'
import { mockCourses } from '../data/mockData'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    showLoginModal: false,
    showSignupModal: false,
    loginForm: {
      email: '',
      password: ''
    },
    signupForm: {
      name: '',
      email: '',
      password: ''
    }
  }),
  
  actions: {
    login() {
      // Mock login
      this.user = {
        id: 1,
        name: this.loginForm.name || 'Abdallah Abdelnasser',
        email: this.loginForm.email,
        enrolledCourses: [1, 2],
        completedLessons: [1, 2]
      }
      this.isAuthenticated = true
      this.showLoginModal = false
      this.resetForms()
    },
    
    signup() {
      // Mock signup
      this.user = {
        id: 1,
        name: this.signupForm.name,
        email: this.signupForm.email,
        enrolledCourses: [],
        completedLessons: []
      }
      this.isAuthenticated = true
      this.showSignupModal = false
      this.resetForms()
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
    
    closeModals() {
      this.showLoginModal = false
      this.showSignupModal = false
      this.resetForms()
    },
    
    resetForms() {
      this.loginForm = { email: '', password: '' }
      this.signupForm = { name: '', email: '', password: '' }
    },
    
    enrollCourse(courseId) {
      if (this.user && !this.user.enrolledCourses.includes(courseId)) {
        this.user.enrolledCourses.push(courseId)
      }
    },
    
    completeLesson(lessonId) {
      if (this.user && !this.user.completedLessons.includes(lessonId)) {
        this.user.completedLessons.push(lessonId)
      }
    }
  }
})

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: mockCourses,
    currentCourse: null,
    currentLesson: null
  }),
  
  getters: {
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === parseInt(id))
    },
    
    getEnrolledCourses: (state) => {
      const authStore = useAuthStore()
      if (!authStore.user) return []
      
      return state.courses.filter(course => 
        authStore.user.enrolledCourses.includes(course.id)
      )
    }
  },
  
  actions: {
    setCourseProgress(courseId, lessonId) {
      const course = this.getCourseById(courseId)
      if (course) {
        const lesson = course.lessons.find(l => l.id === lessonId)
        if (lesson) {
          lesson.completed = true
        }
      }
    }
  }
})