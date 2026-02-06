# WanderLust

A full-stack web application that replicates the core functionality of Airbnb, allowing users to browse, create, and review property listings. Built with Node.js, Express, MongoDB, and integrated with Cloudinary for image storage and Mapbox for interactive maps.

![Visits](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=visits&query=value&url=https://api.countapi.xyz/hit/Manojshekar63-WanderLust)


## 🌐 Live Demo

**[View Live Application](https://wanderlust-5l9g.onrender.com/listings)**

---

## Features

- **User Authentication & Authorization**
  - Secure signup and login using Passport.js
  - Session-based authentication
  - Protected routes for listing management

- **Listing Management**
  - Create new property listings with images
  - Edit and delete your own listings
  - Browse all available listings
  - View detailed listing information with interactive maps

- **Review System**
  - Add reviews and ratings to listings
  - Delete your own reviews
  - Cascading delete of reviews when a listing is removed

- **Image Upload**
  - Cloud-based image storage using Cloudinary
  - Support for multiple image formats

- **Interactive Maps**
  - Location visualization using Mapbox
  - Geocoding for property locations

- **Flash Messages**
  - User-friendly notifications for actions and errors

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Templating engine
- **EJS-Mate** - Layout and partial support
- **CSS** - Custom styling

### Authentication & Security
- **Passport.js** - Authentication middleware
- **Passport-Local** - Local authentication strategy
- **Passport-Local-Mongoose** - Mongoose plugin for authentication
- **Express-Session** - Session management
- **Connect-Mongo** - MongoDB session store

### File Upload & Storage
- **Multer** - File upload middleware
- **Cloudinary** - Cloud-based image storage
- **Multer-Storage-Cloudinary** - Cloudinary storage engine for Multer

### Additional Libraries
- **Mapbox SDK** - Map integration and geocoding
- **Joi** - Data validation
- **Connect-Flash** - Flash messages
- **Method-Override** - HTTP method override
- **Cookie-Parser** - Cookie parsing
- **Dotenv** - Environment variable management

## Project Structure

```
Airbnb/
├── controllers/          # Request handlers
│   ├── listings.js
│   ├── review.js
│   └── users.js
├── models/              # Database schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/              # Static files
│   ├── css/
│   ├── js/
│   └── images/
├── utils/               # Utility functions
│   ├── expreererror.js
│   └── wrapsync.js
├── init/                # Database initialization
│   ├── data.js
│   └── index.js
├── app.js               # Main application file
├── schema.js            # Validation schemas
├── middleware.js        # Custom middleware
├── cloudConfig.js       # Cloudinary configuration
└── package.json         # Dependencies and scripts
```

## Prerequisites

- Node.js (v24.4.1 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account
- Mapbox account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Airbnb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   cloudinary_api_key=your_cloudinary_api_key
   cloudinary_api_secret=your_cloudinary_api_secret
   
   map_token=your_mapbox_token
   
   ATLASDB_URL=your_mongodb_connection_string
   
   SECRET_KEY=your_session_secret_key
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Initialize the database with sample data (optional):
   ```bash
   node init/index.js
   ```

## Running the Application

### Development Mode
```bash
node app.js
```

The application will be available at `http://localhost:8080` (or the port specified in your configuration).

### Production Mode
```bash
NODE_ENV=production node app.js
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CLOUD_NAME` | Cloudinary cloud name |
| `cloudinary_api_key` | Cloudinary API key |
| `cloudinary_api_secret` | Cloudinary API secret |
| `map_token` | Mapbox access token |
| `ATLASDB_URL` | MongoDB connection string |
| `SECRET_KEY` | Secret key for session management |
| `NODE_ENV` | Environment mode (development/production) |

## API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create a new listing
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Show edit listing form
- `PUT /listings/:id` - Update a listing
- `DELETE /listings/:id` - Delete a listing

### Reviews
- `POST /listings/:id/reviews` - Add a review to a listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review

### Users
- `GET /signup` - Show signup form
- `POST /signup` - Register a new user
- `GET /login` - Show login form
- `POST /login` - Login user
- `GET /logout` - Logout user

## Database Schema

### Listing Model
- title (String, required)
- description (String)
- image (Object: url, filename)
- price (Number)
- location (String)
- country (String)
- geometry (Object: type, coordinates)
- reviews (Array of Review IDs)
- owner (User ID reference)

### Review Model
- comment (String)
- rating (Number)
- author (User ID reference)
- createdAt (Date)

### User Model
- username (String, unique)
- email (String)
- password (Hash - managed by Passport)

## Features in Detail

### MVC Architecture
The application follows the Model-View-Controller pattern:
- **Models** define data structure and database interactions
- **Views** render the user interface using EJS templates
- **Controllers** handle business logic and request processing

### Error Handling
- Custom error handling middleware
- Express error wrapper for async routes
- Joi validation for input data
- Flash messages for user feedback

### Security
- Password hashing with Passport-Local-Mongoose
- Session-based authentication
- HTTP-only cookies
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Inspired by Airbnb's design and functionality
- Built as a learning project to understand full-stack web development
- Thanks to the open-source community for the amazing tools and libraries

## Contact

For questions or feedback, please open an issue in the repository.

---

**Note**: This is a portfolio/learning project and is not intended for commercial use.
