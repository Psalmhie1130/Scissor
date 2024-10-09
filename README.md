
# Scissor - URL Shortener Application

## Introduction

Scissor is a URL shortening application built with **React** and **TypeScript**. It helps users convert long URLs into short, manageable links as well as to make custom URL. The application also tracks the analytics for each shortened URL, providing a simple and user-friendly interface.

## Features

- Shorten long URLs
- Customize long URLs
- Track analytics (clicks, locations, etc.)
- Responsive design for all devices
- User authentication

## Important Notice

Before using Scissor, please ensure that cookies are **enabled** on your local machine. Cookies are required for managing user sessions and authentication data. Here's how to enable cookies in your browser:

1. **Google Chrome**:
   - Open Chrome and go to **Settings**.
   - Scroll down to **Privacy and security**.
   - Click on **Cookies and other site data**.
   - Ensure the option to allow cookies is enabled.

2. **Mozilla Firefox**:
   - Go to **Settings**.
   - Navigate to **Privacy & Security**.
   - Under **Cookies and Site Data**, make sure cookies are enabled.

3. **Safari**:
   - Open **Preferences** from the Safari menu.
   - Go to the **Privacy** tab.
   - Make sure "Block all cookies" is unchecked.

If cookies are not enabled, some functionalities like authentication and URL tracking will not work.

## How to Run the Project

### Installation

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/yourusername/scissor-url-shortener.git
cd scissor-url-shortener
```

Then install the required dependencies:

```bash
npm install
# or
yarn install
```

### Running the Application

Start the development server:

```bash
npm start
# or
yarn start
```

The app will be available at `http://localhost:3000`.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
# or
yarn build
```

This will generate the production-ready files in the `build/` directory.

## Technologies Used

- **React**: For building the user interface
- **TypeScript**: For type-safe development
- **MongoDB**: For authentication and database management
- **Yup**: For form validation
- **React Router**: For routing

## License

This project is licensed under the MIT License. For more details, check the [LICENSE](LICENSE) file.
```

This version combines everything into a single `README.md` file while maintaining clarity and structure.
