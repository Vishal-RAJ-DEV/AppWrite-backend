# React Blog Application with Appwrite Backend

A full-featured blog application built with React, Vite, and Appwrite as the backend service. This application includes user authentication, post management, and a rich text editor for content creation.

## Features

- **User Authentication**: Sign up, login, and logout functionality
- **Post Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: TinyMCE integration for content creation
- **Image Upload**: Featured image support for posts
- **Responsive Design**: Built with Tailwind CSS
- **State Management**: Redux Toolkit for application state
- **Protected Routes**: Authentication-based route protection
- **File Storage**: Image upload and management via Appwrite Storage

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Rich Text Editor**: TinyMCE
- **Backend**: Appwrite (Database, Authentication, Storage)
- **Build Tool**: Vite

## Project Structure

```
src/
├── appwrite/           # Appwrite service configurations
│   ├── auth.js        # Authentication services
│   └── Services.js    # Database and storage services
├── Components/        # Reusable components
│   ├── Component/     # UI components
│   ├── Footer/        # Footer component
│   ├── Header/        # Header and navigation
│   └── Post-Form/     # Post creation/editing form
├── config/           # Configuration files
│   ├── config.js     # Environment variables
│   └── editorConfig.js # TinyMCE configuration
├── Pages/            # Page components
├── Store/            # Redux store and slices
└── assets/           # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Appwrite instance (cloud or self-hosted)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd handle-form
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_PROJECT_NAME=your-project-name
VITE_DATABASE_ID=your-database-id
VITE_COLLECTION_ID=your-collection-id
VITE_BUCKET_ID=your-bucket-id
```

### 4. Appwrite Configuration

#### Database Setup
Create a collection with the following attributes:
- `title` (String, required)
- `content` (String, required)
- `featuredImage` (String, required)
- `status` (String, required) - Values: "active", "draft"
- `userId` (String, required)

#### Storage Setup
- Create a storage bucket for file uploads
- Configure appropriate permissions for authenticated users

#### Authentication Setup
- Enable Email/Password authentication in your Appwrite project

### 5. TinyMCE Editor Setup

Choose one of the following options:

#### Option A: Cloud-hosted TinyMCE (Recommended)
1. Get a free API key from [TinyMCE](https://www.tiny.cloud/auth/signup/)
2. Update [`src/config/editorConfig.js`](src/config/editorConfig.js):
```javascript
const config = {
    useSelfHostedTinyMCE: false,
    tinyMCEApiKey: 'your-api-key-here'
};
```

#### Option B: Self-hosted TinyMCE
1. Copy TinyMCE assets to public folder:
```bash
mkdir -p public/tinymce/skins/ui/oxide
mkdir -p public/tinymce/skins/content/default
cp -R node_modules/tinymce/skins/ui/oxide/* public/tinymce/skins/ui/oxide/
cp -R node_modules/tinymce/skins/content/default/* public/tinymce/skins/content/default/
```
2. Update [`src/config/editorConfig.js`](src/config/editorConfig.js):
```javascript
const config = {
    useSelfHostedTinyMCE: true,
    tinyMCEApiKey: 'your-api-key-here' // Not used when self-hosted
};
```

### 6. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Explanation

### Authentication System
- Powered by [`authservice`](src/appwrite/auth.js) class
- Handles user registration, login, and session management
- Integrated with Redux store for state management

### Post Management
- Full CRUD operations via [`Services`](src/appwrite/Services.js) class
- File upload and management for featured images
- Rich text editing with TinyMCE

### Protected Routes
- [`AuthLayout`](src/Components/Component/AuthLayout.jsx) component manages route protection
- Redirects unauthenticated users to login page
- Prevents authenticated users from accessing login/signup pages

### State Management
- Redux Toolkit with [`AuthSlice`](src/Store/AuthSlice.js) for authentication state
- Centralized state management in [`Store`](src/Store/Store.js)

## Component Overview

### Core Components
- [`App.jsx`](src/App.jsx) - Main application component
- [`Header`](src/Components/Header/header.jsx) - Navigation with authentication-aware menu
- [`PostForm`](src/Components/Post-Form/PostForm.jsx) - Create/edit post form
- [`Postcard`](src/Components/Component/Postcard.jsx) - Individual post preview

### Pages
- [`Home`](src/Pages/Home.jsx) - Landing page with post listings
- [`AllPosts`](src/Pages/Allposts.jsx) - Complete post listing
- [`AddPost`](src/Pages/AddPost.jsx) - Create new post
- [`EditPost`](src/Pages/EditPost.jsx) - Edit existing post
- [`Post`](src/Pages/Post.jsx) - Individual post view

## API Integration

The application uses Appwrite SDK through custom service classes:

- **Authentication**: [`authservice`](src/appwrite/auth.js)
- **Database & Storage**: [`services`](src/appwrite/Services.js)

## Styling

- Tailwind CSS for utility-first styling
- Responsive design principles
- Dark/light theme considerations in components

## Error Handling

- [`ErrorBoundary`](src/Components/Component/ErrorBoundary.jsx) for catching React errors
- Service-level error handling in Appwrite interactions
- Form validation with React Hook Form

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Troubleshooting

### Common Issues

1. **TinyMCE API Key Error**: Ensure you have a valid API key or use self-hosted mode
2. **Appwrite Connection**: Verify your environment variables and Appwrite project setup
3. **Image Upload Issues**: Check storage bucket permissions and file size limits
4. **Authentication Problems**: Ensure proper collection permissions and user roles

### Getting Help

- Check the [Appwrite Documentation](https://appwrite.io/docs)
- Review the [TinyMCE Setup Guide](TINYMCE_SETUP.md)
- Examine browser console for detailed error messages

## Deployment

### Production Build

```bash
npm run build
```

### Environment Variables for Production

Ensure all environment variables are properly set in your production environment:
- Appwrite endpoint and credentials
- TinyMCE API key (if using cloud version)
- Any other service-specific configurations
