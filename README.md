# [Python Kids Challenge | أبطال بايثون](https://if-statements-t8dy.vercel.app/)

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://if-statements-t8dy.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646C99?style=for-the-badge&logo=vite)](https://vitejs.dev/)

> **Python Kids Interactive Educational Challenge** is a modern, gamified web application designed to teach primary school students (Grades 4, 5, and 6) the fundamentals of Python programming, specifically **Conditional Statements (`if`, `elif`, `else`)**, logical operators, and coding concepts through an engaging, animated challenge.

---

## 🌟 Key Features

### 🌐 Bilingual (العربية / English)
- Complete instant localization for all UI texts, questions, answer choices, and error prompts.
- Fluid bidirectional layout support (**RTL** for Arabic, **LTR** for English).
- Native Web Speech API announcer delivering instant voice encouragement in both Arabic and English.

### 🎮 Gamified Experience & Interactive Mascot
- **Friendly Python Mascot** that reacts dynamically with animated expressions (happy, thinking, celebrating, warning) based on user interactions.
- Interactive sound effects (Web Audio API synthesis) for clicks, correct answers, mistakes, and victory fanfare.
- Dynamic confetti celebrations on completing the challenge.

### 🛡️ Challenge Security & Anti-Cheat System (3 Lives)
- Each student begins the challenge with **3 Hearts / Lives**.
- Browser security monitoring via **Fullscreen API**, **Page Visibility API**, and window blur/focus detection.
- Attempting to switch tabs or exit fullscreen triggers a warning modal and deducts one life.
- Losing all 3 lives ends the attempt with a "Challenge Failed" screen.
- Active session auto-restores if the page is refreshed.

### 📚 Adaptive 18-Question Bank
- Carefully crafted questions on Python `if`, `elif`, `else`, comparison operators (`==`, `!=`, `>`, `<`), and indentation.
- Formatted Python code snippets with syntax highlighting aesthetics.
- Grade selection (**Grade 4**, **Grade 5**, **Grade 6**) prioritizing age-appropriate questions.
- Detailed question review modal displaying student answers vs. correct solutions with explanations.

### 🏆 Hall of Fame / Leaderboard
- Tracks top students by score, accuracy percentage, time taken, and remaining lives.
- Fully stored locally via browser `LocalStorage` (no backend or external database required).

### 📱 Responsive & Kid-Friendly UI
- Streamlined mobile-first interface.
- Custom modern confirmation toast modal when attempting to exit the challenge.
- Dark theme with vibrant kid-friendly neon accents and smooth Framer Motion animations.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio & Speech:** Web Audio API & Web Speech Synthesis API
- **Persistence:** Browser `LocalStorage`

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── common/              # Header, ConfirmToast, Global controls
│   ├── leaderboard/         # Hall of Fame table & badges
│   ├── mascot/              # Animated 3D-styled Python mascot
│   ├── quiz/                # QuestionCard, ProgressBar, AnswerReviewModal
│   ├── registration/        # Student name & grade selection screen
│   ├── results/             # VictoryScreen, FailedScreen
│   └── security/            # StartChallengeModal, SecurityWarningModal
├── data/
│   └── questions.ts         # 18 Bilingual Python questions
├── hooks/
│   ├── useQuizSecurity.ts   # Anti-cheat, tab-switch & fullscreen detection
│   └── useQuizTimer.ts      # Elapsed time tracking hook
├── types/
│   └── quiz.ts              # TypeScript models and interfaces
├── utils/
│   ├── sound.ts             # Web Audio API sound generator
│   ├── speech.ts            # Web Speech synthesis engine
│   ├── storage.ts           # LocalStorage wrapper
│   └── translations.ts      # Bilingual dictionary (AR & EN)
├── App.tsx                  # Core state orchestrator & screen router
└── main.tsx                 # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/josephmagdy2001/IF-statements.git
   cd IF-statements
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment on Vercel

The application is pre-configured with `vercel.json` for seamless deployment:

1. Import the repository in [Vercel](https://vercel.com/).
2. Framework Preset will be automatically detected as **Vite**.
3. Deploy!

Live URL: **[https://if-statements-t8dy.vercel.app/](https://if-statements-t8dy.vercel.app/)**

---

## 👨‍💻 Author

Developed with ❤️ by **Joseph Magdy**  
*Software Engineer*  
- GitHub: [@josephmagdy2001](https://github.com/josephmagdy2001)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
