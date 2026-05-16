<template>
  <div class="course-card" @click="$router.push('/courses/' + course.id)">
    <div class="course-image">{{ course.category }}</div>
    <div class="course-content">
      <h3 class="course-title">{{ course.title }}</h3>
      <p class="course-instructor">by {{ course.instructor }}</p>
      <p class="course-description">{{ course.description }}</p>
      <div class="course-tags">
        <span class="tag">{{ course.level }}</span>
        <span class="tag">{{ course.duration }}</span>
      </div>
      <div class="course-meta">
        <div class="course-rating">
          <span class="stars">★★★★★</span>
          <span>{{ course.rating }} ({{ course.students }} students)</span>
        </div>
        <div class="course-price">{{ course.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.course-description {
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.course-tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  background: #ecf0f1;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}
</style>