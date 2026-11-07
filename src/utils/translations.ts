import { Language } from '../types/quiz';

export interface Translations {
  appName: string;
  appBadge: string;
  appSubtitle: string;
  heroNameLabel: string;
  heroNamePlaceholder: string;
  nameErrorEmpty: string;
  nameErrorShort: string;
  selectGrade: string;
  startBtn: string;
  viewLeaderboard: string;
  livesLabel: string;
  questionLabel: string;
  ofLabel: string;
  completedLabel: string;
  ptsLabel: string;
  prevBtn: string;
  nextBtn: string;
  submitBtn: string;
  explanationCorrect: string;
  explanationIncorrect: string;
  reviewAnswers: string;
  leaderboardTitle: string;
  playAgain: string;
  homePage: string;
  rulesTitle: string;
  rulesIntro: string;
  rule1Title: string;
  rule1Desc: string;
  rule2Title: string;
  rule2Desc: string;
  rule3Title: string;
  rule3Desc: string;
  readyStart: string;
  cancelBtn: string;
  alertTitle: string;
  alertDesc: string;
  alertWarning: string;
  alertReturn: string;
  remainingText: string;
  failedTitle: string;
  failedDesc: string;
  failedSubtitle: string;
  questionsReached: string;
  retryBtn: string;
  victorySubtitle: string;
  finalScore: string;
  accuracy: string;
  correctAnswers: string;
  incorrectAnswers: string;
  totalTime: string;
  deviceNoticeTitle: string;
  deviceNoticeDesc: string;
  searchPlaceholder: string;
  allGrades: string;
  noHeroesYet: string;
  noHeroesDesc: string;
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
  otherChallengers: string;
  closeReview: string;
  leaveQuizConfirm: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: 'تحدي بايثون للأبطال',
    appBadge: 'أبطال بايثون الصغار 🐍',
    appSubtitle: 'مغامرات ممتعة في تعلم If و Else و Elif',
    heroNameLabel: 'اسم البطل / البطلة:',
    heroNamePlaceholder: 'اكتب اسمك هنا (مثال: يوسف، مريم، أحمد)...',
    nameErrorEmpty: 'من فضلك اكتب اسمك للبدء في المغامرة!',
    nameErrorShort: 'الاسم يجب أن يتكون من حرفين على الأقل!',
    selectGrade: 'اختر مرحلتك الدراسية:',
    startBtn: 'ابدأ مغامرة بايثون الآن',
    viewLeaderboard: 'عرض لوحة الشرف وقاعة المشاهير 🏆',
    livesLabel: 'المحاولات:',
    questionLabel: 'السؤال',
    ofLabel: 'من',
    completedLabel: 'مكتمل',
    ptsLabel: 'نقطة',
    prevBtn: 'السابق',
    nextBtn: 'التالي',
    submitBtn: 'إنهاء التحدي وحساب النتيجة',
    explanationCorrect: 'ممتاز ورائع! إليك توضيح الإجابة:',
    explanationIncorrect: 'حاولت بذكاء! إليك الشرح لتتعلم منه:',
    reviewAnswers: 'مراجعة الأسئلة والشرح',
    leaderboardTitle: 'لوحة الشرف والمتصدرين',
    playAgain: 'تحدي جديد',
    homePage: 'الصفحة الرئيسية',
    rulesTitle: 'قواعد التحدي ونظام الأمان',
    rulesIntro: 'مرحباً بك يا بطل! قبل دخول الحلبة، يرجى قراءة الشروط جيداً:',
    rule1Title: 'نظام المحاولات الثلاث (3 قلوب)',
    rule1Desc: 'لديك 3 أرواح فقط. مغادرة الشاشة، أو التبديل بين التبويبات يخصم قلباً واحداً!',
    rule2Title: 'وضع الشاشة الكاملة',
    rule2Desc: 'يعمل التحدي بالشاشة الكاملة لضمان التركيز التام.',
    rule3Title: 'اللعب النظيف',
    rule3Desc: 'يقوم النظام برصد أي خروج لتحفيز التركيز والتنافس العادل بين الطلاب.',
    readyStart: 'أنا جاهز، ابدأ التحدي!',
    cancelBtn: 'تراجع',
    alertTitle: 'انتبه! لقد غادرت شاشة التحدي!',
    alertDesc: 'تم رصد الخروج من النافذة أو تبديل التبويب، ولضمان العدالة تم خصم محاولة واحدة.',
    alertWarning: '⚠️ تحذير: إذا فقدت جميع المحاولات الثلاث، سينتهي التحدي فوراً!',
    alertReturn: 'العودة للتحدي بالشاشة الكاملة',
    remainingText: 'المتبقي:',
    failedTitle: 'انتهت المحاولات الثلاث!',
    failedDesc: 'لقد خسرت جميع المحاولات بسبب مغادرة شاشة التحدي المتكررة.',
    failedSubtitle: 'تذكر دائماً ألا تغادر الشاشة حتى تنتهي من جميع الأسئلة!',
    questionsReached: 'الأسئلة التي وصل إليها:',
    retryBtn: 'إعادة المحاولة من جديد',
    victorySubtitle: 'أداء بطولي استثنائي! أنت اليوم أحد عباقرة البرمجة في بايثون!',
    finalScore: 'النتيجة النهائية',
    accuracy: 'نسبة الدقة',
    correctAnswers: 'إجابات صحيحة',
    incorrectAnswers: 'إجابات خاطئة',
    totalTime: 'إجمالي الوقت',
    deviceNoticeTitle: 'تنبيه التخزين المحلي:',
    deviceNoticeDesc: 'تُحفظ سجلات لوحة الشرف بأمان داخل متصفح هذا الجهاز فقط.',
    searchPlaceholder: 'ابحث عن اسم الطالب...',
    allGrades: 'كل الصفوف',
    noHeroesYet: 'لا يوجد أبطال مسجلين بعد!',
    noHeroesDesc: 'كن أول بطل يكمل التحدي ويتربع على عرش الصدارة!',
    firstPlace: 'المركز الأول',
    secondPlace: 'المركز الثاني',
    thirdPlace: 'المركز الثالث',
    otherChallengers: 'بقية الأبطال المتنافسين',
    closeReview: 'إغلاق المراجعة',
    leaveQuizConfirm: 'هل أنت متأكد من رغبتك في مغادرة التحدي والعودة للرئيسية؟ سيتم إلغاء جلستك الحالية.',
  },
  en: {
    appName: 'PyKids Quiz',
    appBadge: 'Python Kids Challenge 🐍',
    appSubtitle: 'Interactive Python If / Else / Elif Adventures',
    heroNameLabel: 'Your Hero Name:',
    heroNamePlaceholder: 'Enter your name (e.g. Alex, Maya, Omar)...',
    nameErrorEmpty: 'Please enter your name to start the adventure!',
    nameErrorShort: 'Name must be at least 2 characters long!',
    selectGrade: 'Select Your Grade:',
    startBtn: 'Start Python Adventure',
    viewLeaderboard: 'View Local Hall of Fame Leaderboard 🏆',
    livesLabel: 'Lives:',
    questionLabel: 'Question',
    ofLabel: 'of',
    completedLabel: 'Completed',
    ptsLabel: 'pts',
    prevBtn: 'Previous',
    nextBtn: 'Next',
    submitBtn: 'Submit Quiz & Calculate Score',
    explanationCorrect: 'Awesome! Correct Explanation:',
    explanationIncorrect: 'Good Try! Here is why:',
    reviewAnswers: 'Review Answers',
    leaderboardTitle: 'Hall of Fame Leaderboard',
    playAgain: 'Play Again',
    homePage: 'Home Page',
    rulesTitle: 'Challenge Rules & Security',
    rulesIntro: 'Welcome! Before entering the arena, please review the rules carefully:',
    rule1Title: '3 Lives System',
    rule1Desc: 'You start with 3 lives. Leaving the screen or switching tabs deducts 1 life!',
    rule2Title: 'Fullscreen Mode',
    rule2Desc: 'The game runs in fullscreen for maximum focus and fair play.',
    rule3Title: 'Fair Play Policy',
    rule3Desc: 'Activity detection ensures fair competition among all learners.',
    readyStart: 'I Am Ready, Start!',
    cancelBtn: 'Go Back',
    alertTitle: 'Oops! Screen Left!',
    alertDesc: 'You left the quiz or switched tabs. Leaving the challenge consumes one life.',
    alertWarning: '⚠️ Warning: When lives reach zero, your challenge will immediately end!',
    alertReturn: 'Return to Quiz in Fullscreen',
    remainingText: 'Remaining:',
    failedTitle: 'Challenge Failed!',
    failedDesc: 'You lost all 3 lives due to leaving the quiz screen!',
    failedSubtitle: 'Remember never to leave the screen during your challenge!',
    questionsReached: 'Questions reached:',
    retryBtn: 'Try Challenge Again',
    victorySubtitle: 'Outstanding performance! You are a true Python coding hero!',
    finalScore: 'Final Score',
    accuracy: 'Accuracy',
    correctAnswers: 'Correct',
    incorrectAnswers: 'Incorrect',
    totalTime: 'Total Time',
    deviceNoticeTitle: 'Device Storage Notice:',
    deviceNoticeDesc: 'Rankings are securely saved in this web browser LocalStorage only.',
    searchPlaceholder: 'Search student hero name...',
    allGrades: 'All Grades',
    noHeroesYet: 'No heroes recorded yet!',
    noHeroesDesc: 'Be the first Python hero to complete the challenge and take the crown!',
    firstPlace: '1st Place',
    secondPlace: '2nd Place',
    thirdPlace: '3rd Place',
    otherChallengers: 'Other Challengers',
    closeReview: 'Close Review',
    leaveQuizConfirm: 'Are you sure you want to leave the challenge and return to the home page? Your attempt will be cancelled.',
  }
};
