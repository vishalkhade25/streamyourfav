# StreamYourFav 🎬

A full-stack movie streaming platform built with the MERN stack — featuring custom HTTP range-request video streaming, Cloudinary-based media delivery, watchlists, watch-history resume tracking, reviews, and a full admin panel for content management.

> Built as a learning project to go beyond CRUD and explore real streaming infrastructure concepts — byte-range requests, Node streams, cloud media storage, and debounced search.

---

## ✨ Features

- **Authentication** — JWT-based auth with role-based access control (User / Admin)
- **Movie Catalog** — Browse, filter (genre/year/cast), and search movies
- **Debounced Search** — Live search suggestions as you type
- **Video Streaming** — HTTP range-request streaming (custom-built) + Cloudinary CDN delivery for production playback
- **Watchlist** — Add/remove movies, persisted per user
- **Continue Watching** — Resumes playback from last watched timestamp
- **Reviews & Ratings** — Star ratings + comments per movie, with average rating calculation
- **Admin Panel** — Add/update/delete movies, with chained poster + video upload flow to Cloudinary
- **Protected Routes** — Role-aware route guarding on the frontend

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, React Toastify

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer, Cloudinary SDK

---

## 📁 Project Structure

```
MovieStreaming/
├── .gitignore
├── backend/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   ├── reviewController.js
│   │   ├── streamController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── MovieModel.js
│   │   ├── ReviewModel.js
│   │   └── UserModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── streamRoutes.js
│   │   └── userRoutes.js
│   ├── temp/            # multer temp upload storage (gitignored)
│   └── videos/          # local test videos (gitignored)
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── admin/
        │   ├── AdminDashboard.jsx
        │   ├── MovieUpdate.jsx
        │   └── MovieUpload.jsx
        ├── api/
        │   └── axiosInstance.js
        ├── components/
        │   ├── AdminMovieCard.jsx
        │   ├── Footer.jsx
        │   ├── MovieCard.jsx
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── ReviewCard.jsx
        │   └── SearchBar.jsx
        ├── context/
        │   └── AuthContext.jsx
        └── pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── MovieDetail.jsx
            ├── Profile.jsx
            ├── Signup.jsx
            └── WatchPage.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- A Cloudinary account (free tier works)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login, returns JWT |

### Movies — `/api/movie`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/allMovies` | Get all movies (supports `genre`, `releaseYear`, `cast` filters) |
| GET | `/movie/:id` | Get one movie by ID (also increments view count) |
| GET | `/suggestions` | Search suggestions (typeahead, limited fields) |
| POST | `/add` | Add a movie *(Admin)* |
| PUT | `/update/:id` | Update a movie *(Admin)* |
| DELETE | `/delete/:id` | Delete a movie *(Admin)* |
| POST | `/uploadVideo` | Upload video file to Cloudinary *(Admin)* |
| POST | `/uploadPoster` | Upload poster image to Cloudinary *(Admin)* |

### User — `/api/user`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/watchlist` | Get logged-in user's watchlist (populated) |
| POST | `/watchlist/:movieId` | Add a movie to watchlist |
| DELETE | `/watchlist/:movieId` | Remove a movie from watchlist |
| GET | `/watchHistory` | Get watch history (populated) |
| POST | `/watchHistory/:movieId` | Update/create watch progress for a movie |
| POST | `/search` | Submit a search (saves to search history, returns matches) |
| DELETE | `/search/history` | Clear search history |

### Reviews — `/api/reviews`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/:movieId` | Get all reviews for a movie |
| POST | `/:movieId` | Add a review (one per user per movie) |
| DELETE | `/:reviewId` | Delete own review |

### Streaming — `/api/stream`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/:filename` | Custom HTTP range-request video streaming (local file source, used for the streaming-mechanics learning phase) |

> All routes except registration, login, public movie browsing, and public review reading require a `Bearer` JWT token. Admin-only routes additionally check `role: "Admin"` on the token.

---

## 📝 Notes on Content

This project uses royalty-free / self-uploaded sample video and image content for demonstration purposes. It is built purely for educational purposes to learn full-stack development, video streaming infrastructure, and cloud media handling.

---

## 👤 Author

**Vishal Khade**
Third-year BTech Information Technology student
GitHub: [@vishalkhade25](https://github.com/vishalkhade25)