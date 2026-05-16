<template>
  <div class="search-bar">
    <input 
      v-model="searchQuery" 
      @input="$emit('search', searchQuery)"
      type="text" 
      placeholder="Search courses..." 
      class="search-input"
    >
    <div class="filters">
      <div 
        v-for="category in categories" 
        :key="category" 
        :class="['filter-chip', { active: selectedCategory === category }]"
        @click="toggleCategory(category)"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['search', 'filter'],
  data() {
    return {
      searchQuery: '',
      selectedCategory: ''
    }
  },
  methods: {
    toggleCategory(category) {
      this.selectedCategory = this.selectedCategory === category ? '' : category
      this.$emit('filter', this.selectedCategory)
    }
  }
}
</script>