# 🏋️ FitLog — Workout Library

FitLog is a modern, responsive **workout library and workout planning application** built with **Next.js, TypeScript, and Tailwind CSS**.

Users can browse exercises, view detailed workout information, add exercises to their daily plan, save workouts for later, and track their workout progress.

The application features a **dark, modern, gym-focused interface** and is fully responsive across mobile, tablet, and desktop devices.

---

## 🚀 Technologies Used

| Technology             | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| **Next.js**            | React framework for building the application |
| **TypeScript**         | Type-safe development                        |
| **React**              | Building reusable UI components              |
| **Tailwind CSS**       | Responsive styling and modern UI design      |
| **Next.js App Router** | Page navigation and routing                  |
| **Lucide React**       | Icons throughout the application             |
| **LocalStorage**       | Persisting workout plan and saved workouts   |
| **REST API**           | Fetching workout and exercise data           |
| **Vercel**             | Application deployment                       |

---

## ✨ Features

* 🏋️ **Workout Library** — Browse workouts for different muscle groups.
* 🔍 **Workout Details** — View equipment, difficulty, sets, reps, duration, calories, rating, and instructions.
* 📋 **Today's Plan** — Add up to five workouts to your daily workout plan.
* ⭐ **Save for Later** — Save workouts and access them from the Saved tab.
* 📊 **Workout Metrics** — Track exercises, total minutes, and calories.
* ✅ **Mark as Done** — Mark completed workouts and track your progress.
* ❌ **Remove Workouts** — Easily remove workouts from your daily plan.
* 🔃 **Sort Workouts** — Sort exercises by duration, calories, or rating.
* 🔔 **Toast Notifications** — Get instant feedback when performing workout actions.
* 💾 **LocalStorage Persistence** — Plan and saved workouts remain available after page refresh.
* 📱 **Responsive Design** — Works smoothly on mobile, tablet, and desktop.
* 🚫 **Custom 404 Page** — Handles invalid routes with a custom not-found page.
* ⚡ **Loading State** — Displays a loading animation while workout data is being fetched.

---

## 📱 Responsive Design

FitLog is designed to provide a consistent experience across different screen sizes.

* **Mobile** — Optimized navigation and single-column workout layout.
* **Tablet** — Adaptive grid and spacing.
* **Desktop** — Full navigation and 3×4 workout library grid.

---

## 🛠️ Getting Started

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project:

```bash
cd fit-log
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm start
```

Starts the production server.

### Lint

```bash
npm run lint
```

Checks the project for code-quality and linting issues.

---

## 🌐 Main Routes

| Route           | Description                     |
| --------------- | ------------------------------- |
| `/`             | Workout Library                 |
| `/my-plan`      | Today's Plan and Saved Workouts |
| `/workout/[id]` | Workout Details                 |
| `/*`            | Custom 404 Page                 |

---

## 🚀 Deployment

FitLog is ready to be deployed with **Vercel**.

### Build before deployment

```bash
npm run build
```

After a successful build, deploy the project to Vercel.

---

## 🔗 Project Links

**Live Website:**
YOUR_LIVE_LINK

**GitHub Repository:**
YOUR_GITHUB_REPOSITORY_LINK

---

## 👨‍💻 Author

Zahin al Mahmud

Built with ❤️ using **Next.js, TypeScript, React, and Tailwind CSS**.s
