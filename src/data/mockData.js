export const mockCourses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    instructor: "Sarah Johnson",
    price: "$49.99",
    rating: 4.8,
    students: 12450,
    duration: "8 hours",
    level: "Beginner",
    category: "Programming",
    description: "Learn the fundamentals of JavaScript programming from scratch. This comprehensive course covers variables, functions, objects, and modern ES6+ features.",
    lessons: [
      { id: 1, title: "Introduction to JavaScript", duration: "15 min", completed: false },
      { id: 2, title: "Variables and Data Types", duration: "20 min", completed: false },
      { id: 3, title: "Functions and Scope", duration: "25 min", completed: false },
      { id: 4, title: "Objects and Arrays", duration: "30 min", completed: false },
      { id: 5, title: "DOM Manipulation", duration: "35 min", completed: false }
    ]
  },
  {
    id: 2,
    title: "React Development",
    instructor: "Mike Chen",
    price: "$69.99",
    rating: 4.9,
    students: 8930,
    duration: "12 hours",
    level: "Intermediate",
    category: "Programming",
    description: "Master React.js and build modern web applications with hooks, context, and best practices.",
    lessons: [
      { id: 1, title: "React Basics", duration: "20 min", completed: false },
      { id: 2, title: "Components and Props", duration: "25 min", completed: false },
      { id: 3, title: "State Management", duration: "30 min", completed: false },
      { id: 4, title: "Hooks Deep Dive", duration: "40 min", completed: false }
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    instructor: "Emma Wilson",
    price: "$59.99",
    rating: 4.7,
    students: 6780,
    duration: "10 hours",
    level: "Beginner",
    category: "Design",
    description: "Learn essential UI/UX design principles and best practices for creating user-friendly interfaces.",
    lessons: [
      { id: 1, title: "Design Thinking", duration: "18 min", completed: false },
      { id: 2, title: "Color Theory", duration: "22 min", completed: false },
      { id: 3, title: "Typography", duration: "25 min", completed: false }
    ]
  },
  {
    id: 4,
    title: "Data Science with Python",
    instructor: "Dr. Alex Kumar",
    price: "$79.99",
    rating: 4.9,
    students: 5420,
    duration: "16 hours",
    level: "Advanced",
    category: "Data Science",
    description: "Comprehensive data science course using Python and popular libraries like NumPy, Pandas, and Matplotlib.",
    lessons: [
      { id: 1, title: "Python Basics for Data Science", duration: "30 min", completed: false },
      { id: 2, title: "NumPy and Pandas", duration: "45 min", completed: false },
      { id: 3, title: "Data Visualization", duration: "35 min", completed: false }
    ]
  }
]