# AI Resume Builder 🚀

A sophisticated resume building platform leveraging Next.js, React, and AI to help users create professional resumes effortlessly.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Anup4944/resume-builder/actions/workflows/main.yml)
[![Version](https://img.shields.io/badge/version-v0.1.0-blue)](https://github.com/Anup4944/resume-builder/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents 📚

- [About the Project](#about-the-project)
- [Key Features](#key-features) ✨
- [Tech Stack](#tech-stack) 🛠️
- [Project Structure](#project-structure) 📁
- [Getting Started](#getting-started) 🚀
- [Usage](#usage) 📝
- [Contributing](#contributing) 🙏
- [License](#license) 📄
- [Important Links](#important-links) 🔗

## About the Project 💡

The AI Resume Builder is a modern web application built with Next.js and React, designed to streamline the resume creation process. It utilizes AI capabilities to assist users in generating professional summaries and work experience entries, making it easier to craft compelling resumes that land dream jobs. The application integrates with Clerk for authentication and Stripe for subscription management, offering both free and premium features.

## Key Features ✨

- **AI-Powered Content Generation:** Leverage AI to generate professional summaries and detailed work experience descriptions.
- **Intuitive Resume Editor:** A step-by-step editor to guide users through creating each section of their resume.
- **Drag-and-Drop Functionality:** Easily reorder work experience and education entries.
- **Customization Options:** Personalize resume appearance with color choices and border styles (premium feature).
- **Subscription Management:** Integrated with Stripe for seamless subscription handling, offering free, premium, and premium plus tiers.
- **User Authentication:** Secure user accounts using Clerk for authentication and authorization.
- **Cloud Storage Integration:** Utilizes Vercel Blob for image uploads (user photos).
- **Responsive Design:** Ensures a seamless experience across all devices.
- **Auto-Save Functionality:** Automatically saves user progress as they work on their resumes.

## Tech Stack 🛠️

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Node.js, Express (implied by Next.js server actions)
- **Database:** Prisma, PostgreSQL
- **Authentication:** Clerk
- **Payment Processing:** Stripe
- **AI Integration:** OpenAI (GPT-4o mini)
- **Cloud Storage:** Vercel Blob
- **State Management:** Zustand (for modal state)
- **UI Components:** Radix UI, class-variance-authority, clsx
- **Utility Libraries:** date-fns, lucide-react, react-hook-form, react-color

## Project Structure 📁

The project follows a standard Next.js and React application structure:

```
resume-builder/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (main)/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── editor/
│   │   │   ├── resumes/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   ├── components/
│   │   │   ├── premium/
│   │   │   ├── ui/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── assets/
│   ├── styles/
│   ├── .eslintrc.json
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── prettier.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
├── .env.example
├── .gitignore
├── README.md
└── ...
```

## Getting Started 🚀

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js installed (v18 or higher recommended)
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anup4944/resume-builder.git
   cd resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and populate it with your environment variables. You can use `.env.example` as a template.

   ```
   # .env
   POSTGRES_URL=...
   POSTGRES_URL_NON_POOLING=...
   POSTGRES_USER=...
   POSTGRES_HOST=...
   POSTGRES_PASSWORD=...
   POSTGRES_DATABASE=...
   POSTGRES_URL_NO_SSL=...
   POSTGRES_PRISMA_URL=...
   CLERK_SECRET_KEY=...
   BLOB_READ_WRITE_TOKEN=...
   OPENAI_API_KEY=...
   STRIPE_SECRET_KEY=...
   STRIPE_WEB_HOOK_SECRET=...
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=...
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
   NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY=...
   NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY=...
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run database migrations (if using Prisma with a local database):
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage 📝

This project provides a user-friendly interface for creating professional resumes. Here's how to use it:

1.  **Sign Up/Sign In:** Users can sign up or log in using Clerk authentication.
2.  **Create New Resume:** Navigate to the "Your Resumes" page and click "New Resume" to start a new resume. Free tier users have a limit on the number of resumes they can create.
3.  **Editor Interface:** The resume editor is divided into several steps (General Info, Personal Info, Work Experience, Education, Skills, Summary).
    *   Fill in your details in each section.
    *   Use the AI tools (premium feature) to generate summaries and work experience entries.
    *   Customize the appearance (color, border style) with premium features.
    *   Your progress is saved automatically.
4.  **Preview and Print:** You can preview your resume and print it directly from the "Your Resumes" page.
5.  **Manage Subscription:** Visit the "Billing" page to view your current plan and upgrade to Premium or Premium Plus for advanced features.

### Real-world Use Cases 🌍

-   **Job Seekers:** Quickly create polished resumes tailored for specific job applications.
-   **Students:** Build foundational resumes for internships and entry-level positions.
-   **Professionals:** Update and enhance existing resumes with modern design and AI-assisted content.

## How to Use 📝

Follow the steps outlined in the **Usage** section. The application is designed to be intuitive, guiding users through the resume creation process. For AI features and advanced customization, a subscription to one of the premium tiers is required.

## Installation ⚙️

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Anup4944/resume-builder.git
    cd resume-builder
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Copy `.env.example` to `.env` and fill in the required credentials for Clerk, Stripe, Vercel Blob, OpenAI, and your database.

4.  **Database Setup:**
    If using Prisma, run migrations:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run the Application:**
    ```bash
    npm run dev
    ```

## Contributing 🙏

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Important Links 🔗

-   **Live Demo:** [[Link to Live Demo - if available](https://resume-builder-n6ld010s9-anup4944s-projects.vercel.app/)]
-   **Author's GitHub:** [https://github.com/Anup4944](https://github.com/Anup4944)

## Footer 📄

**AI Resume Builder**

-   **Repository:** [https://github.com/Anup4944/resume-builder](https://github.com/Anup4944/resume-builder)
-   **Author:** Anup
-   **Contact:** [Anup's Contact Information - if available]

--- 

Liked this project? ⭐ Star it, 🍴 Fork it, and 🐛 Report issues if you find any!


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
