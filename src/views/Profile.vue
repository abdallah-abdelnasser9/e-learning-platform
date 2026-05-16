<template>
  <div>
    <div class="profile-section">
      <div class="profile-header">
        <div class="avatar">{{ authStore.user?.name?.charAt(0) || 'U' }}</div>
        <h1>{{ authStore.user?.name || 'User' }}</h1>
        <p>{{ authStore.user?.email || 'user@example.com' }}</p>
      </div>
      
      <div class="profile-stats">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ enrolledCourses.length }}</div>
            <div class="stat-label">Courses Enrolled</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ completedCourses }}</div>
            <div class="stat-label">Courses Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ totalLearningHours }}</div>
            <div class="stat-label">Learning Hours</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ certificates }}</div>
            <div class="stat-label">Certificates</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="profile-section">
      <h2>Learning Progress</h2>
      <div v-if="enrolledCourses.length > 0">
        <div v-for="course in enrolledCourses" :key="course.id" class="progress-item">
          <div class="progress-info">
            <h4>{{ course.title }}</h4>
            <p>{{ course.instructor }}</p>
          </div>
          <div class="progress-details">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: getCourseProgress(course) + '%' }"></div>
            </div>
            <span class="progress-percentage">{{ getCourseProgress(course) }}%</span>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>Start learning to see your progress here!</p>
        <router-link to="/courses" class="btn btn-primary">Browse Courses</router-link>
      </div>
    </div>
    
    <div class="profile-section">
      <h2>Achievements</h2>
      <div class="achievements-grid">
        <div class="achievement-card">
          <div class="achievement-info">
            <h4>First Course</h4>
            <p>Enrolled in your first course</p>
          </div>
        </div>
        <div class="achievement-card">
          <div class="achievement-info">
            <h4>Knowledge Seeker</h4>
            <p>Completed 5 lessons</p>
          </div>
        </div>
        <div class="achievement-card">
          <div class="achievement-info">
            <h4>Course Master</h4>
            <p>Completed your first course</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore, useCoursesStore } from '../stores/index.js'

export default {
  name: 'Profile',
  setup() {
    const authStore = useAuthStore()
    const coursesStore = useCoursesStore()
    
    const enrolledCourses = computed(() => {
      return coursesStore.getEnrolledCourses
    })
    
    const completedCourses = computed(() => {
      return enrolledCourses.value.filter(course => 
        getCourseProgress(course) === 100
      ).length
    })
    
    const totalLearningHours = computed(() => {
      return enrolledCourses.value.reduce((total, course) => {
        const hours = parseInt(course.duration)
        const progress = getCourseProgress(course) / 100
        return total + (hours * progress)
      }, 0).toFixed(1)
    })
    
    const certificates = computed(() => {
      return completedCourses.value
    })
    
    const getCourseProgress = (course) => {
      const completedCount = course.lessons.filter(lesson => 
        authStore.user?.completedLessons?.includes(lesson.id)
      ).length
      return Math.round((completedCount / course.lessons.length) * 100)
    }
    
    return {
      authStore,
      enrolledCourses,
      completedCourses,
      totalLearningHours,
      certificates,
      getCourseProgress
    }
  }
}
</script>

<style scoped>
.progress-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.progress-item:last-child {
  border-bottom: none;
}

.progress-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.progress-info p {
  margin: 0;
  color: #7f8c8d;
}

.progress-details {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
}

.progress-percentage {
  font-weight: bold;
  color: #3498db;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.achievement-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.achievement-icon {
  font-size: 2rem;
}

.achievement-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.achievement-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}
</style>