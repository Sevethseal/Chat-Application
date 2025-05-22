# Chat Application

A modern chat and marketplace application built with Next.js, Supabase, Prisma, and deployed on Vercel. Users can log in with Google OAuth, view products in a grid, chat with sellers in real time, and log out securely.

## Live Demo

[View the live app on Vercel](https://chat-application-pi-eosin.vercel.app/login)

## Features

* **Social Login**: Google OAuth via Supabase Auth
* **Logout**: Secure session termination with a logout button in the navigation bar
* **Product Listing**: Responsive grid of products with dummy data for UI showcase
* **Real-time Chat**: Initiate chats with sellers via a built‑in chat window

## Tech Stack

| Layer          | Technology               |
| -------------- | ------------------------ |
| Frontend       | Next.js, React, Tailwind |
| Authentication | Supabase Auth (Google)   |
| Database       | Supabase Postgres        |
| ORM            | Prisma Client            |
| Deployment     | Vercel                   |

## Getting Started

1. **Clone the repo**:

   ```bash
   git clone https://github.com/Sevethseal/Chat-Application.git
   cd Chat-Application/apps/web
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create `.env.local`** in `apps/web` with:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   DATABASE_URL=<your-supabase-postgres-url>
   ```

4. **Generate Prisma Client** and start development server:

   ```bash
   npx prisma generate
   npm run dev
   ```

5. Open [http://localhost:3000/login](http://localhost:3000/login) in your browser.

## Deployment

1. **Push** your code to GitHub.
2. **Import** the project in Vercel and set the following Environment Variables under **Project Settings**:

   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `DATABASE_URL`
3. **Set the Root Directory** to `apps/web`.
4. **Deploy**!

## License

MIT © Your Name
