<template>
  <div>
    <h1 class="page-title">My Dashboard</h1>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">{{ enrolledCourses.length }}</div>
        <div class="stat-label">Enrolled Courses</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ completedLessons }}</div>
        <div class="stat-label">Completed Lessons</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ totalHours }}</div>
        <div class="stat-label">Hours Learned</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ certificates }}</div>
        <div class="stat-label">Certificates</div>
      </div>
    </div>
    
    <div class="dashboard-section">
      <h2>Continue Learning</h2>
      <div class="courses-grid" v-if="enrolledCourses.length > 0">
        <div v-for="course in enrolledCourses" :key="course.id" class="progress-card">
          <div class="course-image">{{ course.category }}</div>
          <div class="course-content">
            <h3>{{ course.title }}</h3>
            <p>by {{ course.instructor }}</p>
            <div class="progress-section">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getCourseProgress(course) + '%' }"></div>
              </div>
              <span class="progress-text">{{ getCourseProgress(course) }}% Complete</span>
            </div>
            <button @click="continueLearning(course.id)" class="btn btn-primary">Continue</button>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>You haven't enrolled in any courses yet.</p>
        <router-link to="/courses" class="btn btn-primary">Browse Courses</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useCoursesStore } from '../stores'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const coursesStore = useCoursesStore()
    
    const enrolledCourses = computed(() => {
      return coursesStore.getEnrolledCourses
    })
    
    const completedLessons = computed(() => {
      return authStore.user?.completedLessons?.length || 0
    })
    
    const totalHours = computed(() => {
      return Math.floor(completedLessons.value * 0.5) // Mock calculation
    })
    
    const certificates = computed(() => {
      return enrolledCourses.value.filter(course => 
        getCourseProgress(course) === 100
      ).length
    })
    
    const getCourseProgress = (course) => {
      const completedCount = course.lessons.filter(lesson => 
        authStore.user?.completedLessons?.includes(lesson.id)
      ).length
      return Math.round((completedCount / course.lessons.length) * 100)
    }
    
    const continueLearning = (courseId) => {
      router.push(`/learn/${courseId}`)
    }
    
    return {
      enrolledCourses,
      completedLessons,
      totalHours,
      certificates,
      getCourseProgress,
      continueLearning
    }
  }
}
</script>

<style scoped>
.dashboard-section {
  margin-top: 3rem;
}

.dashboard-section h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.progress-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.progress-card:hover {
  transform: translateY(-5px);
}

.progress-section {
  margin: 1rem 0;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}
</style>