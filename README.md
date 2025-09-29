# EmoEase - Men's Mental Health Platform

**Your Health, Your Wealth**

A comprehensive full-stack website for EmoEase, an organization dedicated to empowering young men ages 15-35 by fostering holistic wellness, breaking societal barriers, and building meaningful connections.

## About EmoEase

EmoEase offers a comprehensive program focused on breaking down the stigma surrounding men's mental health and providing resources to help men manage stress, anxiety, and other mental health challenges. By creating a safe and supportive environment, we encourage open conversations and promote a more balanced and fulfilling life.

## Features

- **Public Website**: Informative landing page with mission, vision, and founder information
- **Blog System**: Dynamic blog with articles about men's mental health
- **Admin Dashboard**: Secure admin panel for managing blog posts
- **JWT Authentication**: Secure authentication system for admin users
- **PostgreSQL Database**: Robust data storage for posts and admin accounts
- **Responsive Design**: Mobile-friendly interface with professional styling

## Tech Stack

### Frontend
- HTML5
- CSS3 (Custom styling with CSS variables)
- Vanilla JavaScript (No frameworks)

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
├── public/                 # Public website files
│   ├── index.html         # Homepage
│   ├── blog.html          # Blog listing page
│   ├── post.html          # Single post page
│   ├── styles.css         # Public website styles
│   ├── images/            # Images and assets
│   └── admin/             # Admin dashboard
│       ├── login.html     # Admin login
│       ├── register.html  # Admin registration
│       ├── dashboard.html # Admin dashboard
│       ├── posts.html     # Post management
│       ├── styles.css     # Admin styles
│       └── auth.js        # Authentication utilities
├── server/                # Backend server files
│   ├── app.js            # Express app setup
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   └── routes/           # API routes
├── scripts/              # Database scripts
│   └── 01-create-tables.sql
└── .env.example          # Environment variables template
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd emoease-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your values:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

   Required environment variables:
   - `DB_USER`: PostgreSQL username
   - `DB_HOST`: PostgreSQL host (usually localhost)
   - `DB_NAME`: Database name
   - `DB_PASSWORD`: PostgreSQL password
   - `DB_PORT`: PostgreSQL port (usually 5432)
   - `JWT_SECRET`: Secret key for JWT tokens
   - `JWT_EXPIRES_IN`: Token expiration time (e.g., "24h")
   - `FRONTEND_URL`: Frontend URL for CORS
   - `PORT`: Server port (default: 3000)

4. **Create the database**
   \`\`\`bash
   createdb emoease_db
   \`\`\`

5. **Run database migrations**
   
   Execute the SQL script to create tables:
   \`\`\`bash
   psql -U your_username -d emoease_db -f scripts/01-create-tables.sql
   \`\`\`

6. **Start the server**
   \`\`\`bash
   npm start
   \`\`\`

   For development with auto-reload:
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Access the application**
   - Public website: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin/login.html`

## API Endpoints

### Public Endpoints
- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get a single post by ID

### Admin Endpoints (Require Authentication)
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected admin routes
- SQL injection prevention
- XSS protection
- CORS configuration

## Contributing

We welcome contributions to improve EmoEase! Please feel free to submit issues and pull requests.

## License

Copyright © 2025 EmoEase. All rights reserved.

## Contact

For questions or partnership opportunities, please contact us at emoease23@gmail.com

---

**EmoEase** - Breaking the silence, building support, creating change.
\`\`\`

```json file="" isHidden
