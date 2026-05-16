import { defineStore } from 'pinia'
import { mockCourses } from '../data/mockData'

interface User {
  id: number
  name: string
  email: string
  enrolledCourses: number[]
  completedLessons: number[]
}

interface LoginForm {
  email: string
  password: string
}

interface SignupForm {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    showLoginModal: false,
    showSignupModal: false,

    loginForm: {
      email: '',
      password: ''
    } as LoginForm,

    signupForm: {
      name: '',
      email: '',
      password: ''
    } as SignupForm
  }),

  actions: {
    login() {
      this.user = {
        id: 1,
        name: 'Abdallah Abdelnasser',
        email: this.loginForm.email,
        enrolledCourses: [1, 2],
        completedLessons: [1, 2]
      }

      this.isAuthenticated = true
      this.showLoginModal = false
      this.resetForms()
    },

    signup() {
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
      this.loginForm = {
        email: '',
        password: ''
      }

      this.signupForm = {
        name: '',
        email: '',
        password: ''
      }
    },

    enrollCourse(courseId: number) {
      if (this.user && !this.user.enrolledCourses.includes(courseId)) {
        this.user.enrolledCourses.push(courseId)
      }
    },

    completeLesson(lessonId: number) {
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
    getCourseById: (state) => (id: number | string) => {
      return state.courses.find(
        (course: any) => course.id === parseInt(id as string)
      )
    },

    getEnrolledCourses: (state) => {
      const authStore = useAuthStore()

      if (!authStore.user) return []

      return state.courses.filter(
        (course: any) =>
          authStore.user &&
          authStore.user.enrolledCourses.includes(course.id)
      )
    }
  },

  actions: {
    setCourseProgress(courseId: number, lessonId: number) {
      const course: any = this.getCourseById(courseId)

      if (course) {
        const lesson = course.lessons.find(
          (l: any) => l.id === lessonId
        )

        if (lesson) {
          lesson.completed = true
        }
      }
    }
  }
})