# Evercam Clone

A simplified clone of Evercam built with Nuxt 2, Pinia, and Axios. This app demonstrates handling user authentication, state management, and working with protected APIs.

## Features

- **User Authentication**:
  - Login with username and password.
  - JWT token storage in Pinia and localStorage.
  - Automatic redirection based on authentication state.
- **Dashboard**:
  - Displays user name.
  - Lists available cameras with thumbnails.
  - Logout functionality.
- **Live Camera View**:
  - View the latest snapshots of selected cameras.
  - Automatically refreshes snapshots every 5 seconds.

## File Structure Overview

```
├── components/
│   └── cameraCard.vue    # Camera card component for displaying thumbnails.
├── middleware/
│   └── auth.js           # Middleware for route authentication.
├── pages/
│   ├── cameras/
│   │   └── _camera_exid.vue  # Live view for individual cameras.
│   ├── dashboard.vue     # Main dashboard showing user info and cameras.
│   ├──login.vue         # Login page.
|   └──index.vue           
├── plugins/
│   └── axios.js          # Axios setup for API calls.
├── store/
│   ├── cameras.js        # Pinia store for managing camera data.
│   └── user.js           # Pinia store for user authentication.
├── static/
│   └── evercamLogo.ico   # Static assets (e.g., logo).
├── nuxt.config.js         # Nuxt configuration file.
```

## Getting Started

### Prerequisites
- Node.js installed.

### Installation
1. Clone the repository:
  ```
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```
   yarn install
   ```

### Running the App
- Start the development server:
  ```
  yarn dev
  ```
- Open `http://localhost:3000` in your browser.

## Tech Stack
- **Nuxt 2**: Framework for Vue.js.
- **Pinia**: State management library.
- **Axios**: HTTP client for API requests.


