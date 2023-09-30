# Kollsh - Online Marketplace for Saudi Arabia

Welcome to Kollsh, your go-to online marketplace for buying and selling new and used products in Saudi Arabia. Whether you're looking for the latest gadgets, trendy fashion items, or household essentials, Kollsh offers a convenient and hassle-free way to connect with buyers and sellers across all cities in the country.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run Seed](#run-seed)
  - [Run Tests](#run-tests)
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

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up your environment variables by creating a `.env` file based on the provided structure. Make sure to replace placeholders with your actual credentials.

4. Start the development server:

   ```bash
   yarn run dev
   ```

### Run Seed

To seed the database with initial data, run the following command:

```bash
yarn run seed
```

After running the seed, you will get the following output:

```bash
Seed data was inserted successfully
Login Credentials: {
  message: 'success',
  accessToken: 'access-token',
  user: {
    id: 'user-id',
    name: 'Ibrahim Sifat',
    username: 'username',
    email: 'ibsifat900@gmail.com',
    avatar: undefined,
    confirmed: true,
    blocked: false
  }
}
```

5. To run tests, use the following command:

   ```bash
   yarn test
   ```

## Configuration

Here is the structure of the `.env` file:
[.env.example](./.env.example)

## Documentation

### Presentation

- [Presentation Slide](https://docs.google.com/presentation/d/114Wj28tu0CcoU7MDziyzfrPS2Xwy8yZPodxTQjLTqBs/edit?usp=sharing)

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
