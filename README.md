# CLIENT

- [DEMO LINK](https://artem-kodesnikov.github.io/FS_blog_app/)

Technologies used:
  - React.js, react-hook-form, react-toastify
  - Redux-Toolkit, redux-persist
  - Typescript
  - CSS(SCSS)
  - Axios

### Run project
- clone the repo
- npm install
- npm start

### Available to use
Auth:
- Register form
- Login form
- Logout button

Posts:
- Homepage with posts
- Add post from modal window
- Delete post

Personal Info:
- Update info

# SERVER

Hosted on https://fs-blog-server.onrender.com

Endpoints:
AUTH:
- /auth/registration (POST)
- /auth/login (POST)
- /auth/logout (GET)

USER INFO:
- /user/updateUsername/:id (PUT)
- /user/updateDisplayname/:id (PUT)

POSTS:
- /posts/data?page=${currentPage}&limit=${itemsPerPage} (GET)
- /posts/createPost (POST)
- /posts/deletePost (DELETE)


Technologies used:
  - Express.js
  - JWT
  - bcrypt
  
DB:
- MongoDB
- Moongose


### Run project
- clone the repo
- npm install
- npm start
