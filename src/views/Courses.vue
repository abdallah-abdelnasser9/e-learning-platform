<template>
  <div>
    <h1 class="page-title">All Courses</h1>
    
    <SearchBar 
      :categories="categories"
      @search="handleSearch"
      @filter="handleFilter"
    />
    
    <div class="courses-grid">
      <CourseCard 
        v-for="course in filteredCourses" 
        :key="course.id" 
        :course="course" 
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useCoursesStore } from '../stores/index.js'
import CourseCard from '../components/CourseCard.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'Courses',
  components: {
    CourseCard,
    SearchBar
  },
  setup() {
    const coursesStore = useCoursesStore()
    const searchQuery = ref('')
    const selectedCategory = ref('')
    
    const categories = computed(() => {
      return [...new Set(coursesStore.courses.map(course => course.category))]
    })
    
    const filteredCourses = computed(() => {
      let filtered = coursesStore.courses
      
      if (searchQuery.value) {
        filtered = filtered.filter(course => 
          course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }
      
      if (selectedCategory.value) {
        filtered = filtered.filter(course => course.category === selectedCategory.value)
      }
      
      return filtered
    })
    
    const handleSearch = (query) => {
      searchQuery.value = query
    }
    
    const handleFilter = (category) => {
      selectedCategory.value = category
    }
    
    return {
      categories,
      filteredCourses,
      handleSearch,
      handleFilter
    }
  }
}
</script>

<style scoped>
.page-title {
  margin-bottom: 2rem;
  color: #2c3e50;
}
</style>