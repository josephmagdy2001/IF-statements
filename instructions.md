# Project: Python Kids Interactive Quiz Game

Act as a Senior React Engineer, UI/UX Designer, and Educational Game Developer.

Build a fully functional, animated Python quiz game for primary school students (Grades 4, 5, and 6).

## 1. Technology Stack

Use ONLY:

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hooks
- Browser APIs
- LocalStorage
- Web Audio API

STRICT RESTRICTIONS:

- No Laravel.
- No PHP.
- No backend.
- No database.
- No API server.
- No external authentication service.

The entire application must run independently in the browser.

## 2. Student Registration

Create an animated registration screen.

Fields:

- Student Name.
- Grade: Grade 4, Grade 5, Grade 6.

Display an animated 3D-style Python mascot.

Save student information in LocalStorage.

Prevent empty names and duplicate active registrations.

## 3. Quiz Security – Three Attempts

Every student starts with exactly 3 lives.

Display three animated heart icons.

Implement:

- Fullscreen API.
- Page Visibility API.
- Window blur/focus detection.
- Tab switching detection.
- Fullscreen exit detection.

Every distinct detected violation deducts exactly one life.

Important:

- Prevent duplicate event handling.
- Avoid deducting multiple lives for the same event.
- Display a warning animation.
- Play a warning sound.
- Save remaining lives in LocalStorage.
- Restore the quiz session after refreshing the page.
- End the quiz when lives reach zero.
- Display "Challenge Failed" when the student loses all lives.

Before starting, explain that leaving the quiz screen consumes one life.

Do not claim that browser-only security can completely prevent tab switching or bypasses. Implement detection and deterrence only.

## 4. Quiz Questions

Display exactly one question per screen.

Each screen contains:

- Question number.
- Progress bar.
- Student name.
- Three remaining lives.
- Question text.
- Four answer options.
- Previous button.
- Next button.
- Submit button.

When an answer is selected:

- Show immediate visual feedback.
- Green for correct answers.
- Red for incorrect answers.
- Show the correct answer.
- Display a simple explanation.
- Play the appropriate sound.
- Animate the mascot.

Preserve selected answers when navigating between questions.

Do not allow duplicate score calculations.

## 5. Question Bank

Create at least 15 questions divided into three levels.

Grade 4 – Easy:

- Variables.
- Assignment operator (=).
- Basic IF.
- Simple conditions.

Grade 5 – Medium:

- ELSE.
- Comparison operator (==).
- Predicting code output.
- Real-life conditions.

Grade 6 – Hard:

- ELIF.
- Multiple conditions.
- Nested logical thinking.
- Python code output challenges.

Use practical examples:

- Traffic lights.
- Weather.
- Secret passwords.
- Treasure hunting.
- Finding keys.
- Left and right paths.

Every question must contain four answers, one correct answer, and a simple explanation.

## 6. Audio System

Implement a global sound control.

Add a mute/unmute button.

Correct answer:

- Applause sound.
- "Good Job!"
- "Excellent!"

Incorrect answer:

- Soft error sound.
- "Oops! Try Again!"

Security violation:

- Warning sound.
- "You lost one life!"

Final results:

- Celebration sound.
- Victory music.

Use Web Speech API for voice announcements when supported, with audio fallbacks.

Requirements:

- Avoid overlapping audio.
- Stop previous voice announcements before playing new ones.
- Respect mute globally.
- Keep sound volume comfortable for children.

## 7. Animations

Use Framer Motion.

Implement:

- Smooth question transitions.
- Animated progress bar.
- Animated hearts.
- Confetti.
- Floating stars.
- Correct-answer celebration.
- Incorrect-answer feedback.
- Mascot reactions.
- Animated buttons.
- Victory screen.
- Leaderboard transitions.

Use colorful, friendly, child-oriented visuals.

## 8. Scoring

Scoring system:

- Easy: 10 points.
- Medium: 20 points.
- Hard: 30 points.

Calculate the score based on correct answers.

Display:

- Total questions.
- Correct answers.
- Incorrect answers.
- Final score.
- Percentage.
- Remaining lives.

Store all results in LocalStorage.

## 9. Leaderboard

Create a persistent local leaderboard.

Save every completed student's:

- Name.
- Grade.
- Score.
- Correct answers.
- Incorrect answers.
- Completion time.
- Registration date.
- Rank.

Display the top three students in an animated podium:

1st Place – Gold.
2nd Place – Silver.
3rd Place – Bronze.

Display the remaining students in a table below the podium.

Ranking rules:

1. Highest score first.
2. Shortest completion time breaks ties.
3. Use a deterministic final tie-breaker.

Update the leaderboard automatically whenever a student completes the challenge.

IMPORTANT:
LocalStorage is browser-specific. The leaderboard must clearly indicate that rankings are stored on this device only and are not shared across different computers or browsers.

## 10. Final Results

Create an animated victory screen.

Display:

- "Congratulations, Python Hero!"
- Student name.
- Final score.
- Rank.
- Percentage.
- Correct and incorrect answers.
- Remaining lives.

Performance messages:

90–100%: "Outstanding! You're a Python Master!"
70–89%: "Excellent Work!"
50–69%: "Good Effort! Keep Practicing!"
Below 50%: "Keep Learning! Never Give Up!"

Add:

- View Leaderboard.
- Review Answers.
- Play Again.

## 11. UI/UX

Design a premium educational gaming interface.

Use:

- Blue, purple, yellow, green, and orange.
- Rounded cards.
- Soft shadows.
- Gradients.
- 3D-style cartoon illustrations.
- Large readable typography.
- Responsive desktop and tablet layouts.

The application must be easy for children aged 9–12.

## 12. Teacher Mode

Add a separate Teacher Presentation Mode.

Teacher Mode:

- Does not consume student attempts.
- Does not register student scores.
- Allows the instructor to reveal correct answers.
- Allows moving between questions.
- Allows explaining each answer.

Student Challenge Mode:

- Enforces the three-life system.
- Saves student progress.
- Calculates scores.
- Updates the local leaderboard.

## 13. Code Quality

Use:

- Reusable React components.
- Custom Hooks.
- TypeScript interfaces.
- Separation of concerns.
- Clean folder structure.
- Centralized quiz data.
- Centralized audio management.
- Centralized LocalStorage management.

Do not put the entire application in one component.

## 14. Final Requirements

Build a complete working React application, not a static design.

Test:

- Registration.
- All quiz questions.
- Previous and Next navigation.
- Answer selection.
- Correct and incorrect feedback.
- Score calculation.
- Three attempts.
- Fullscreen exit detection.
- Tab switching detection.
- Refresh recovery.
- Audio mute/unmute.
- Leaderboard ranking.
- Teacher Mode.

Start by creating the project structure and implementing the complete application.

Do not introduce any backend or database dependencies.
خليه دايزين ممتاز
اعمل الاسئله مانول هنا ك داتابيز بالاختيارات الصح والغلط ومش عايز داش بورد ولا شي
