<template>
  <div v-if="course" class="learning-interface">
    <div class="video-section">
      <div class="video-player">
        <div class="video-placeholder">
          <h3>{{ currentLesson?.title || 'Select a lesson to start' }}</h3>
          <p v-if="currentLesson">Duration: {{ currentLesson.duration }}</p>
          <button v-if="currentLesson && !currentLesson.completed" 
                  @click="markCompleted" 
                  class="btn btn-primary">
            Mark as Completed
          </button>
        </div>
      </div>
      
      <div class="lesson-controls">
        <button @click="previousLesson" :disabled="!hasPrevious" class="btn btn-secondary">
          ← Previous
        </button>
        <button @click="nextLesson" :disabled="!hasNext" class="btn btn-primary">
          Next →
        </button>
      </div>
    </div>
    
    <div class="course-sidebar">
      <div class="course-info">
        <h3>{{ course.title }}</h3>
        <p>by {{ course.instructor }}</p>
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: courseProgress + '%' }"></div>
          </div>
          <p class="progress-text">{{ courseProgress }}% Complete</p>
        </div>
      </div>
      
      <div class="lesson-list">
        <h4>Course Content</h4>
        <ul>
          <li v-for="lesson in course.lessons" :key="lesson.id" 
              :class="['lesson-item', { 
                completed: isLessonCompleted(lesson.id),
                active: currentLesson?.id === lesson.id 
              }]"
              @click="selectLesson(lesson)">
            <div class="lesson-info">
              <div class="lesson-title">{{ lesson.title }}</div>
              <div class="lesson-duration">{{ lesson.duration }}</div>
            </div>
            <div class="lesson-status">
              <span v-if="isLessonCompleted(lesson.id)" class="completed-icon">✓</span>
              <span v-else-if="currentLesson?.id === lesson.id" class="current-icon">▶</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  <div v-else class="loading">
    Loading course...
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useCoursesStore } from '../stores'

export default {
  name: 'Learn',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const coursesStore = useCoursesStore()
    
    const currentLesson = ref(null)
    
    const course = computed(() => {
      return coursesStore.getCourseById(route.params.courseId)
    })
    
    const courseProgress = computed(() => {
      if (!course.value) return 0
      const completedCount = course.value.lessons.filter(lesson => 
        isLessonCompleted(lesson.id)
      ).length
      return Math.round((completedCount / course.value.lessons.length) * 100)
    })
    
    const currentLessonIndex = computed(() => {
      if (!course.value || !currentLesson.value) return -1
      return course.value.lessons.findIndex(lesson => lesson.id === currentLesson.value.id)
    })
    
    const hasPrevious = computed(() => currentLessonIndex.value > 0)
    const hasNext = computed(() => 
      currentLessonIndex.value < course.value?.lessons.length - 1
    )
    
    const isLessonCompleted = (lessonId) => {
      return authStore.user?.completedLessons?.includes(lessonId) || false
    }
    
    const selectLesson = (lesson) => {
      currentLesson.value = lesson
      router.push(`/learn/${course.value.id}/${lesson.id}`)
    }
    
    const markCompleted = () => {
      if (currentLesson.value) {
        authStore.completeLesson(currentLesson.value.id)
        coursesStore.setCourseProgress(course.value.id, currentLesson.value.id)
      }
    }
    
    const previousLesson = () => {
      if (hasPrevious.value) {
        const prevLesson = course.value.lessons[currentLessonIndex.value - 1]
        selectLesson(prevLesson)
      }
    }
    
    const nextLesson = () => {
      if (hasNext.value) {
        const nextLesson = course.value.lessons[currentLessonIndex.value + 1]
        selectLesson(nextLesson)
      }
    }
    
    onMounted(() => {
      if (course.value) {
        const lessonId = route.params.lessonId
        if (lessonId) {
          const lesson = course.value.lessons.find(l => l.id === parseInt(lessonId))
          if (lesson) {
            currentLesson.value = lesson
          }
        } else {
          // Start with first uncompleted lesson
          const firstIncomplete = course.value.lessons.find(lesson => 
            !isLessonCompleted(lesson.id)
          )
          currentLesson.value = firstIncomplete || course.value.lessons[0]
        }
      }
    })
    
    return {
      course,
      currentLesson,
      courseProgress,
      hasPrevious,
      hasNext,
      isLessonCompleted,
      selectLesson,
      markCompleted,
      previousLesson,
      nextLesson
    }
  }
}
</script>

<style scoped>
.video-section {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.video-placeholder {
  padding: 3rem;
  text-align: center;
  color: white;
}

.video-placeholder h3 {
  margin-bottom: 1rem;
}

.lesson-controls {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
}

.course-info {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.course-info h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.lesson-list h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.lesson-item.active {
  background: rgba(52, 152, 219, 0.1);
  border-left: 4px solid #3498db;
}

.current-icon {
  color: #3498db;
}
</style>