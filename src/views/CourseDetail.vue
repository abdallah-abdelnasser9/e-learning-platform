<template>
  <div v-if="course" class="course-detail">
    <div class="course-header">
      <h1>{{ course.title }}</h1>
      <p class="instructor-name">by {{ course.instructor }}</p>
      <div class="course-stats">
        <div class="stat-item">
          <span class="stars">★★★★★</span>
          <span>{{ course.rating }} ({{ course.students }} students)</span>
        </div>
        <span class="stat-item">{{ course.duration }}</span>
        <span class="stat-item">{{ course.level }}</span>
      </div>
      <div class="course-actions">
        <button v-if="!isEnrolled" @click="enrollCourse" class="btn btn-primary btn-large">
          Enroll Now - {{ course.price }}
        </button>
        <button v-else @click="startLearning" class="btn btn-primary btn-large">
          Continue Learning
        </button>
      </div>
    </div>
    
    <div class="course-info">
      <div class="course-nav">
        <div :class="['course-nav-item', { active: activeTab === 'overview' }]" @click="activeTab = 'overview'">
          Overview
        </div>
        <div :class="['course-nav-item', { active: activeTab === 'curriculum' }]" @click="activeTab = 'curriculum'">
          Curriculum
        </div>
        <div :class="['course-nav-item', { active: activeTab === 'instructor' }]" @click="activeTab = 'instructor'">
          Instructor
        </div>
      </div>
      
      <div v-if="activeTab === 'overview'" class="tab-content">
        <h3>Course Description</h3>
        <p class="description">{{ course.description }}</p>
        <h3>What You'll Learn</h3>
        <ul class="learning-objectives">
          <li>Core concepts and fundamentals</li>
          <li>Practical hands-on experience</li>
          <li>Real-world project applications</li>
          <li>Best practices and industry standards</li>
        </ul>
      </div>
      
      <div v-if="activeTab === 'curriculum'" class="tab-content">
        <h3>Course Curriculum</h3>
        <ul class="lesson-list">
          <li v-for="lesson in course.lessons" :key="lesson.id" 
              :class="['lesson-item', { completed: lesson.completed }]">
            <div>
              <div class="lesson-title">{{ lesson.title }}</div>
              <div class="lesson-duration">{{ lesson.duration }}</div>
            </div>
            <div class="lesson-status">
              <span v-if="lesson.completed" class="completed-icon">✓</span>
              <span v-else class="play-icon">▶</span>
            </div>
          </li>
        </ul>
      </div>
      
      <div v-if="activeTab === 'instructor'" class="tab-content">
        <h3>About the Instructor</h3>
        <div class="instructor-profile">
          <div class="instructor-avatar">{{ course.instructor.charAt(0) }}</div>
          <div>
            <h4>{{ course.instructor }}</h4>
            <p>Expert instructor with extensive industry experience and a passion for teaching.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="loading">
    Loading course details...
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useCoursesStore } from '../stores/index.js'

export default {
  name: 'CourseDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const coursesStore = useCoursesStore()
    
    const activeTab = ref('overview')
    
    const course = computed(() => {
      return coursesStore.getCourseById(route.params.id)
    })
    
    const isEnrolled = computed(() => {
      if (!authStore.user || !course.value) return false
      return authStore.user.enrolledCourses.includes(course.value.id)
    })
    
    const enrollCourse = () => {
      if (!authStore.isAuthenticated) {
        authStore.showLoginModal = true
        return
      }
      authStore.enrollCourse(course.value.id)
    }
    
    const startLearning = () => {
      router.push(`/learn/${course.value.id}`)
    }
    
    return {
      activeTab,
      course,
      isEnrolled,
      enrollCourse,
      startLearning
    }
  }
}
</script>

<style scoped>
.instructor-name {
  font-size: 1.2rem;
  margin: 1rem 0;
}

.course-stats {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.course-actions {
  margin-top: 2rem;
}

.btn-large {
  font-size: 1.1rem;
  padding: 1rem 2rem;
}

.tab-content {
  padding: 2rem 0;
}

.tab-content h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.description {
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
}

.learning-objectives {
  line-height: 1.8;
  color: #666;
}

.lesson-title {
  font-weight: 500;
  color: #2c3e50;
}

.lesson-duration {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.lesson-status {
  font-size: 1.2rem;
}

.completed-icon {
  color: #27ae60;
}

.play-icon {
  color: #3498db;
}

.instructor-profile {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.instructor-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>