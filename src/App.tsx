import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GradeLevel, StudentSession, LeaderboardEntry, MascotMood, Language } from './types/quiz';
import { QUESTION_BANK } from './data/questions';
import { storage } from './utils/storage';
import { translations } from './utils/translations';
import { soundFx } from './utils/sound';
import { announcer } from './utils/speech';
import { useQuizSecurity } from './hooks/useQuizSecurity';
import { useQuizTimer } from './hooks/useQuizTimer';

// Components
import { Header } from './components/common/Header';
import { Mascot } from './components/mascot/Mascot';
import { RegistrationScreen } from './components/registration/RegistrationScreen';
import { StartChallengeModal } from './components/security/StartChallengeModal';
import { SecurityWarningModal } from './components/security/SecurityWarningModal';
import { ProgressBar } from './components/quiz/ProgressBar';
import { QuestionCard } from './components/quiz/QuestionCard';
import { AnswerReviewModal } from './components/quiz/AnswerReviewModal';
import { VictoryScreen } from './components/results/VictoryScreen';
import { FailedScreen } from './components/results/FailedScreen';
import { LeaderboardScreen } from './components/leaderboard/LeaderboardScreen';

type AppScreen = 'register' | 'quiz' | 'victory' | 'failed' | 'leaderboard';

export const App: React.FC = () => {
  // Language & Localization
  const [lang, setLang] = useState<Language>('ar');

  // App Navigation
  const [screen, setScreen] = useState<AppScreen>('register');
  const [previousScreen, setPreviousScreen] = useState<AppScreen>('register');
  const [showStartModal, setShowStartModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Student & Game state
  const [studentName, setStudentName] = useState<string>('');
  const [grade, setGrade] = useState<GradeLevel>('Grade 4');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [remainingLives, setRemainingLives] = useState<number>(3);
  const [violationsCount, setViolationsCount] = useState<number>(0);

  // Sound & Visuals
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [mascotMessage, setMascotMessage] = useState<string | undefined>();

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Filter questions for the selected grade (or all 18 questions prioritizing that grade's focus)
  const currentQuestions = useMemo(() => {
    const gradeQuestions = QUESTION_BANK.filter(q => q.grade === grade);
    const otherQuestions = QUESTION_BANK.filter(q => q.grade !== grade);
    return [...gradeQuestions, ...otherQuestions];
  }, [grade]);

  // Timer
  const isTimerRunning = screen === 'quiz';
  const { seconds: timeSpentSeconds, formattedTime, resetTimer } = useQuizTimer(isTimerRunning);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedLang = storage.getLanguage();
    setLang(savedLang);
    announcer.setLanguage(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;

    const muted = storage.isSoundMuted();
    setIsMuted(muted);
    soundFx.setMuted(muted);
    announcer.setMuted(muted);

    setLeaderboard(storage.getLeaderboard());

    // Restore existing session if any
    const saved = storage.getSession();
    if (saved && !saved.isCompleted && saved.remainingLives > 0) {
      setStudentName(saved.studentName);
      setGrade(saved.grade);
      setRemainingLives(saved.remainingLives);
      setCurrentIndex(saved.currentQuestionIndex);
      setUserAnswers(saved.answers);
      setViolationsCount(saved.violationsCount || 0);
      setScreen('quiz');
    }
  }, []);

  // Language toggle handler
  const toggleLanguage = () => {
    const nextLang: Language = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    storage.setLanguage(nextLang);
    announcer.setLanguage(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  // Save session when relevant state updates
  useEffect(() => {
    if (screen === 'quiz' && studentName) {
      const session: StudentSession = {
        studentName,
        grade,
        startTime: Date.now() - (timeSpentSeconds * 1000),
        remainingLives,
        currentQuestionIndex: currentIndex,
        answers: userAnswers,
        isCompleted: false,
        score: calculateCurrentScore(),
        correctCount: calculateCorrectCount(),
        incorrectCount: calculateIncorrectCount(),
        timeSpentSeconds,
        violationsCount,
      };
      storage.saveSession(session);
    }
  }, [screen, studentName, grade, remainingLives, currentIndex, userAnswers, timeSpentSeconds, violationsCount]);

  // Scoring calculations
  const calculateCurrentScore = useCallback((): number => {
    let score = 0;
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += q.points;
      }
    });
    return score;
  }, [currentQuestions, userAnswers]);

  const calculateCorrectCount = useCallback((): number => {
    let count = 0;
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        count += 1;
      }
    });
    return count;
  }, [currentQuestions, userAnswers]);

  const calculateIncorrectCount = useCallback((): number => {
    let count = 0;
    currentQuestions.forEach(q => {
      const ans = userAnswers[q.id];
      if (ans !== undefined && ans !== q.correctIndex) {
        count += 1;
      }
    });
    return count;
  }, [currentQuestions, userAnswers]);

  const handleChallengeFailed = useCallback(() => {
    storage.clearSession();
    setScreen('failed');
  }, []);

  // Deduct life callback
  const handleDeductLife = useCallback((_reason: string) => {
    setRemainingLives(prev => {
      const nextLives = Math.max(0, prev - 1);
      if (nextLives === 0) {
        handleChallengeFailed();
      }
      return nextLives;
    });
    setViolationsCount(prev => prev + 1);
    setMascotMood('warning');
    setMascotMessage(lang === 'ar' ? 'انتبه! مغادرة الشاشة تستهلك محاولة!' : 'Careful! Leaving the screen loses a life!');
  }, [lang, handleChallengeFailed]);

  // Security Hook
  const {
    isFullscreen,
    showWarningModal,
    warningMessage,
    dismissWarning,
    requestFullscreen,
    exitFullscreen,
  } = useQuizSecurity({
    enabled: screen === 'quiz',
    lives: remainingLives,
    onDeductLife: handleDeductLife,
    onGameOver: handleChallengeFailed,
  });

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      requestFullscreen();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    announcer.setMuted(nextMuted);
    storage.setSoundMuted(nextMuted);
  };

  // Start Registration handler
  const handleRegister = (name: string, selectedGrade: GradeLevel) => {
    setStudentName(name);
    setGrade(selectedGrade);
    setCurrentIndex(0);
    setUserAnswers({});
    setRemainingLives(3);
    setViolationsCount(0);
    resetTimer();
    setShowStartModal(true);
  };

  const handleConfirmStart = () => {
    setShowStartModal(false);
    requestFullscreen();
    setScreen('quiz');
  };

  // Answer selection
  const handleSelectOption = (optionIndex: number) => {
    const currentQ = currentQuestions[currentIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  // Submit quiz handler
  const handleSubmitQuiz = () => {
    const score = calculateCurrentScore();
    const correctCount = calculateCorrectCount();
    const incorrectCount = calculateIncorrectCount();
    const totalQ = currentQuestions.length;
    const percentage = Math.round((correctCount / totalQ) * 100);

    const entry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      studentName,
      grade,
      score,
      correctCount,
      incorrectCount,
      totalQuestions: totalQ,
      percentage,
      remainingLives,
      completionTimeSeconds: timeSpentSeconds,
      completedAt: new Date().toISOString(),
    };
    const updated = storage.saveLeaderboardEntry(entry);
    setLeaderboard(updated);

    storage.clearSession();
    setScreen('victory');
  };

  const handleGoHome = () => {
    if (screen === 'quiz') {
      if (!window.confirm(translations[lang].leaveQuizConfirm)) {
        return;
      }
    }
    storage.clearSession();
    setCurrentIndex(0);
    setUserAnswers({});
    setRemainingLives(3);
    setViolationsCount(0);
    resetTimer();
    setScreen('register');
  };

  const handlePlayAgain = () => {
    storage.clearSession();
    setCurrentIndex(0);
    setUserAnswers({});
    setRemainingLives(3);
    setViolationsCount(0);
    resetTimer();
    setScreen('register');
  };

  const openLeaderboard = () => {
    setPreviousScreen(screen);
    setScreen('leaderboard');
  };

  const handleClearLeaderboard = () => {
    localStorage.removeItem('pykids_leaderboard');
    setLeaderboard([]);
  };

  const currentQ = currentQuestions[currentIndex];

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white ${lang === 'ar' ? 'font-sans' : 'font-sans'}`}>
      {/* Security Warning Modal */}
      <SecurityWarningModal
        isOpen={showWarningModal}
        message={warningMessage}
        remainingLives={remainingLives}
        lang={lang}
        onDismiss={dismissWarning}
      />

      {/* Pre-challenge Instructions Modal */}
      {showStartModal && (
        <StartChallengeModal
          studentName={studentName}
          grade={grade}
          lang={lang}
          onStart={handleConfirmStart}
          onCancel={() => setShowStartModal(false)}
        />
      )}

      {/* Answer Review Modal */}
      <AnswerReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        questions={currentQuestions}
        userAnswers={userAnswers}
        lang={lang}
      />

      {/* Main Header */}
      <Header
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        lives={remainingLives}
        studentName={screen !== 'register' ? studentName : undefined}
        grade={grade}
        lang={lang}
        onToggleLanguage={toggleLanguage}
        onOpenLeaderboard={screen !== 'leaderboard' ? openLeaderboard : undefined}
        onHomeClick={screen !== 'register' ? handleGoHome : undefined}
      />

      {/* Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-2 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {screen === 'register' && (
            <RegistrationScreen
              key="register"
              lang={lang}
              onRegister={handleRegister}
              onOpenLeaderboard={openLeaderboard}
            />
          )}

          {screen === 'quiz' && currentQ && (
            <div key="quiz" className="w-full">
              {/* Top Progress & Stats Bar */}
              <ProgressBar
                currentIndex={currentIndex}
                total={currentQuestions.length}
                score={calculateCurrentScore()}
                timeFormatted={formattedTime}
                lang={lang}
              />

              {/* Side Mascot Floating Buddy */}
              <div className={`hidden lg:block fixed ${lang === 'ar' ? 'left-6' : 'right-6'} bottom-8 z-20 pointer-events-none`}>
                <Mascot mood={mascotMood} size="sm" message={mascotMessage} />
              </div>

              {/* Main Question Card */}
              <QuestionCard
                question={currentQ}
                currentIndex={currentIndex}
                totalQuestions={currentQuestions.length}
                selectedOption={userAnswers[currentQ.id]}
                lang={lang}
                onSelectOption={handleSelectOption}
                onNext={() => setCurrentIndex(prev => Math.min(currentQuestions.length - 1, prev + 1))}
                onPrev={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                onSubmit={handleSubmitQuiz}
                onMascotMoodChange={(mood, msg) => {
                  setMascotMood(mood);
                  setMascotMessage(msg);
                }}
              />
            </div>
          )}

          {screen === 'victory' && (
            <VictoryScreen
              key="victory"
              studentName={studentName}
              grade={grade}
              score={calculateCurrentScore()}
              totalQuestions={currentQuestions.length}
              correctCount={calculateCorrectCount()}
              incorrectCount={calculateIncorrectCount()}
              remainingLives={remainingLives}
              completionTimeFormatted={formattedTime}
              lang={lang}
              onPlayAgain={handlePlayAgain}
              onReviewAnswers={() => setShowReviewModal(true)}
              onViewLeaderboard={openLeaderboard}
              onGoHome={handleGoHome}
            />
          )}

          {screen === 'failed' && (
            <FailedScreen
              key="failed"
              studentName={studentName}
              grade={grade}
              answeredCount={Object.keys(userAnswers).length}
              totalQuestions={currentQuestions.length}
              lang={lang}
              onRetry={handlePlayAgain}
              onReviewAnswers={() => setShowReviewModal(true)}
              onGoHome={handleGoHome}
            />
          )}

          {screen === 'leaderboard' && (
            <LeaderboardScreen
              key="leaderboard"
              entries={leaderboard}
              lang={lang}
              onBack={() => setScreen(previousScreen)}
              onClear={handleClearLeaderboard}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Global Kid-Friendly Footer */}
      <footer className="w-full text-center py-4 border-t border-slate-800/60 text-xs text-slate-400 select-none">
        <p className="mb-1 text-slate-400">
          {lang === 'ar'
            ? '🐍 تحدي بايثون التفاعلي للأطفال • مخصص للمراحل الابتدائية الصف 4 و 5 و 6'
            : '🐍 Python Kids Interactive Educational Challenge • Built for Grades 4, 5 & 6'}
        </p>
        <p className="font-medium text-slate-300 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Developed with ❤️ by</span>
          <span className="text-yellow-400 font-bold tracking-wide">Joseph Magdy</span>
          <span className="text-slate-500">•</span>
          <span className="text-indigo-400 font-semibold">Software Engineer</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
