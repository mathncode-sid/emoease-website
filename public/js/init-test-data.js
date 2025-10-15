// Initialize test user data
console.log('Initializing test data...');

// Create a test user if no users exist
const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
if (existingUsers.length === 0) {
  const testUsers = [
    {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      createdAt: new Date().toISOString()
    }
  ];
  localStorage.setItem('registeredUsers', JSON.stringify(testUsers));
  console.log('Created test user: test@example.com / password123');
}

// Also initialize sample posts for testing
const testPosts = [
  {
    id: 1,
    title: 'My Mental Health Journey',
    category: 'personal-story',
    content: 'This is a sample post about my mental health journey...',
    tags: ['mental-health', 'personal'],
    author: 'Test User',
    authorId: 'test@example.com',
    status: 'pending',
    createdAt: new Date().toISOString(),
    excerpt: 'This is a sample post about my mental health journey...'
  }
];

// Store sample posts for test user
localStorage.setItem('userPosts_test@example.com', JSON.stringify(testPosts));
console.log('Test data initialized successfully');