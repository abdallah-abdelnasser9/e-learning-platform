<template>
  <div>
    <div class="hero">
      <h1>Learn Without Limits</h1>
      <p>Discover thousands of courses from expert instructors and advance your skills at your own pace</p>
      <router-link to="/courses" class="btn btn-primary hero-btn">Start Learning</router-link>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>Expert Instructors</h3>
        <p>Learn from industry professionals with years of experience</p>
      </div>
      <div class="feature-card">
        <h3>Learn Anywhere</h3>
        <p>Access your courses on any device, anytime, anywhere</p>
      </div>
      <div class="feature-card">
        <h3>Certificates</h3>
        <p>Earn certificates upon course completion to showcase your skills</p>
      </div>
    </div>
    
    <div>
      <h2 class="section-title">Featured Courses</h2>
      <div class="courses-grid">
        <CourseCard 
          v-for="course in featuredCourses" 
          :key="course.id" 
          :course="course" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useCoursesStore } from '../stores'
import CourseCard from '../components/CourseCard.vue'

export default {
  name: 'Home',
  components: {
    CourseCard
  },
  setup() {
    const coursesStore = useCoursesStore()
    
    const featuredCourses = coursesStore.courses.slice(0, 4)
    
    return {
      featuredCourses
    }
  }
}
</script>

<style scoped>
.hero-btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}
</style>