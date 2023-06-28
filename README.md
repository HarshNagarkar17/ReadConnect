# ReadConnect - Place for book lovers

Welcome to ReadConnect! This website allows users to explore and search for new books. It utilizes Node.js and Express for the backend implementation and incorporates JWT (JSON Web Tokens) for enhanced security.

## Features

- **Book Exploration**: Users can browse through a wide selection of books available on the website.
- **Book Search**:  Users can search for books based on various criteria such as title, author, genre, or keywords.
- **JWT Authentication**: To ensure secure access to the website, JWT is used for authentication and authorization.
- **User can create an admin**: There must be one admin to add new books to the database.

## Technologies Used

- Node.js (backend)
- React.js (frontend)
- Express.js (server creation)
- JWT (JSON WEB TOKEN)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/HarshNagarkar17/ReadConnect.git
```

2.Install the dependencies:

```bash
npm install
```

3.Set up environment variables:

- Create a ***.env*** file in the root directory of the project.
- Add the following environment variables to the ***.env*** file:
```bash
URI = 'your_mongodb_uri'
SECRET = 'jwt_secret_token'
EMAIL_PASSWORD = 'your_email_token'
EMAIL_ID = 'your_email_id'
```

4.Start the server

```bash
npm run dev
```

## Contributing

Contributions to this project are welcome! If you find any issues or would like to add new features, please submit a pull request.
