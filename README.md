Certainly! Here's the entire `README.md` content in a single page:

````markdown
# Kollsh - Online Marketplace for Saudi Arabia

Welcome to Kollsh, your go-to online marketplace for buying and selling new and used products in Saudi Arabia. Whether you're looking for the latest gadgets, trendy fashion items, or household essentials, Kollsh offers a convenient and hassle-free way to connect with buyers and sellers across all cities in the country.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Documentation](#documentation)
  - [Swagger Doc](#swagger-doc)
  - [ER Diagram](#er-diagram)
  - [API Documentation](#api-documentation)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB instance or connection details.
- Cloudinary API credentials.
- Mailgun API credentials.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ibrahimsifat/kollsh-backend.git
   cd kollsh-backend
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file based on the provided structure. Make sure to replace placeholders with your actual credentials.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Configuration

Here is the structure of the `.env` file:

```dotenv
MONGODB_URI='mongodb+srv://your-mongodb-uri'
DB_CONNECTION_URL='mongodb://localhost:27017/kollsh'
TEST_DB_CONNECTION_URL='mongodb://localhost:27017/kollsh_test'
DB_NAME='kollsh'
NODE_ENV='development'
DB_USERNAME='testuser'
DB_PASSWORD='testpassword'
# DB_URL_QUERY='retryWrites=true&w=majority'
DB_URL_QUERY=''
PORT=4000
NODE_ENV=development
CORS_URL='http://localhost:4000'
MAIL_USERNAME='postmaster@smtp.kullesh.com'
MAIL_PASSWORD='your-mailgun-password'
MAILGUN_API_KEY='your-mailgun-api-key'
MAIL_DOMAIN='smtp.kullesh.com'
APP_URL='http://localhost:4000'
APP_NAME='Kollsh'
APP_EMAIL_SENDER='info@kullesh.com'
ACCESS_TOKEN_SECRET='your-access-token-secret'
EMAIL_VERIFICATION_LIMIT=3
PASSWORD_RESET_LIMIT=3
AWS_ACCESS_KEY_ID='your-aws-access-key-id'
AWS_SECRET_ACCESS_KEY='your-aws-secret-access-key'
AWS_REGION='eu-central-1'
BUCKET_NAME='kollsh'
MAX_FILE_UPLOAD_SIZE=5242880
THUMBNAIL_WIDTH=400
THUMBNAIL_HEIGHT=400
CLOUDINARY_CLOUD_NAME='serabuy-com'
CLOUDINARY_API_KEY='your-cloudinary-api-key'
CLOUDINARY_API_SECRET='your-cloudinary-api-secret'
ACCESS_TOKEN='your-access-token'
INVALID_ACCESS_TOKEN='invalidAccessToken'
```

## Documentation

### Swagger Doc

- [Swagger Documentation](https://app.swaggerhub.com/apis/ibrahimsifat/kollsh/1.0.0)

### ER Diagram

- [ER Diagram](https://drive.google.com/file/d/1tsJr_-SEnZ_dGpWMNfEyTxOmGA3MZoZr/view?usp=sharing)

### API Documentation

- [API Documentation](https://ibrahimsifat.notion.site/Buy-Sale-name-Kollsh-a09317cd34024c389e76e95b57e8fe86?pvs=4)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contribute, report issues, or contact the author [Ibrahim Sifat](https://github.com/ibrahimsifat) for any questions or suggestions related to the Kollsh project. Thank you for visiting Kollsh!

```

```
