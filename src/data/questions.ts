import { Question } from '../types/quiz';

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // GRADE 4 - EASY (Variables, Assignment =, Basic If) - 10 Points Each
  // ==========================================
  {
    id: 'g4-q1',
    grade: 'Grade 4',
    difficulty: 'easy',
    points: 10,
    title: 'Variable Magic Box',
    topic: 'Variables',
    question: 'In Python, how do we store the color "green" inside a variable named light?',
    questionArabic: 'في لغة بايثون، كيف نقوم بتخزين اللون "green" داخل متغير اسمه light؟',
    codeSnippet: '# Choose the correct way to store a value:\n???',
    options: [
      'light = "green"',
      'light == "green"',
      '"green" -> light',
      'store light "green"'
    ],
    correctIndex: 0,
    explanation: 'We use a single equal sign (=) to store a value into a variable! It is called the assignment operator.',
    explanationArabic: 'نستخدم علامة يساوي واحدة (=) لتخزين قيمة داخل متغير، وتسمى معامل التعيين (Assignment).',
    hint: 'Remember: One equal sign (=) puts a value inside the box!'
  },
  {
    id: 'g4-q2',
    grade: 'Grade 4',
    difficulty: 'easy',
    points: 10,
    title: 'Computer Instructions',
    topic: 'Computers & Thinking',
    question: 'Do computers think like humans on their own?',
    questionArabic: 'هل يفكر الكمبيوتر مثل الإنسان من تلقاء نفسه؟',
    options: [
      'Yes, computers have human brains',
      'No, computers need instructions to follow',
      'Yes, computers make up their own rules',
      'Computers only think when playing games'
    ],
    correctIndex: 1,
    explanation: 'Computers don\'t think like humans. We must give them clear instructions step by step!',
    explanationArabic: 'الكمبيوتر لا يفكر بمفرده، بل نحن نعطيه تعليمات وأوامر واضحة ومحددة لينفذها.',
    hint: 'Think about what slide 2 says: "Computers don\'t think like humans. We give them instructions."'
  },
  {
    id: 'g4-q3',
    grade: 'Grade 4',
    difficulty: 'easy',
    points: 10,
    title: 'What Does IF Mean?',
    topic: 'Basic IF',
    question: 'In programming, what is the meaning of the keyword "if"?',
    questionArabic: 'في البرمجة، ما معنى كلمة "if"؟',
    codeSnippet: 'if condition:\n    print("Action!")',
    options: [
      'Repeat this forever',
      'Do this IF the condition is TRUE',
      'Delete the code',
      'Stop the computer'
    ],
    correctIndex: 1,
    explanation: '"if" checks a condition. If the condition is true, the computer performs the instruction inside!',
    explanationArabic: 'كلمة "if" معناها: لو الشرط صحيح، نفذ الأمر البرمجي التابع له.',
    hint: 'If = لو الشرط صحيح'
  },
  {
    id: 'g4-q4',
    grade: 'Grade 4',
    difficulty: 'easy',
    points: 10,
    title: 'Number of Keys',
    topic: 'Variables',
    question: 'What is the value of the variable "keys" after running this code?',
    questionArabic: 'ما هي قيمة المتغير keys بعد تشغيل هذا الكود؟',
    codeSnippet: 'keys = 3\nprint(keys)',
    options: [
      '"keys"',
      '3',
      '0',
      'Error'
    ],
    correctIndex: 1,
    explanation: 'The variable keys holds the number 3, so print(keys) will output 3!',
    explanationArabic: 'المتغير keys يحمل الرقم 3، لذا ستتم طباعة 3 على الشاشة.',
    hint: 'The number 3 is stored in the box called keys.'
  },
  {
    id: 'g4-q5',
    grade: 'Grade 4',
    difficulty: 'easy',
    points: 10,
    title: 'First Python Decision',
    topic: 'Simple Conditions',
    question: 'What will this Python program print?',
    questionArabic: 'ماذا سيطبع هذا البرنامج؟',
    codeSnippet: 'score = 10\nif score == 10:\n    print("Winner")',
    options: [
      'Winner',
      'score',
      '10',
      'Nothing'
    ],
    correctIndex: 0,
    explanation: 'Since score is equal to 10, the if condition is True and it prints "Winner"!',
    explanationArabic: 'بما أن score يساوي 10 بالفعل، فإن الشرط صحيح ويطبع كلمة "Winner"!',
    hint: 'Does score equal 10? Yes!'
  },
  {
    id: 'g4-q6',
    grade: 'Grade 4',
    difficulty: 'easy',
    points: 10,
    title: 'Assignment vs Comparison',
    topic: 'Operators',
    question: 'Which symbol is used ONLY to store a value into a variable?',
    questionArabic: 'أي رمز يُستخدم فقط لتخزين وحفظ قيمة داخل المتغير؟',
    codeSnippet: 'hero_name ??? "Alex"',
    options: [
      '==',
      '=',
      '!=',
      '+'
    ],
    correctIndex: 1,
    explanation: '= is the assignment operator (stores a value). == is the comparison operator (checks if two things are equal).',
    explanationArabic: '= لتخزين وحفظ القيمة، بينما == لمقارنة القيمتين والتأكد من تساويهما.',
    hint: 'Single = for storing, Double == for comparing!'
  },

  // ==========================================
  // GRADE 5 - MEDIUM (ELSE, Comparison ==, Output Prediction) - 20 Points Each
  // ==========================================
  {
    id: 'g5-q1',
    grade: 'Grade 5',
    difficulty: 'medium',
    points: 20,
    title: 'Traffic Light Decision',
    topic: 'If / Else',
    question: 'What will be printed when light is set to "green"?',
    questionArabic: 'ماذا سيُطبع عندما تكون الإشارة خضراء "green"؟',
    codeSnippet: 'light = "green"\nif light == "green":\n    print("You can cross!")\nelse:\n    print("Please stop!")',
    options: [
      'Please stop!',
      'You can cross!',
      'You can cross! and Please stop!',
      'Nothing'
    ],
    correctIndex: 1,
    explanation: 'light == "green" evaluates to True, so only the block under if executes ("You can cross!").',
    explanationArabic: 'الشرط light == "green" صحيح، لذلك ينفذ أمر If فقط ويطبع "You can cross!".',
    hint: 'Slide 4: light is green, so the computer says You can cross!'
  },
  {
    id: 'g5-q2',
    grade: 'Grade 5',
    difficulty: 'medium',
    points: 20,
    title: 'What Does ELSE Mean?',
    topic: 'Else Statement',
    question: 'When does the code inside an "else:" block run?',
    questionArabic: 'متى يعمل الكود الموجود داخل أمر else:؟',
    codeSnippet: 'if condition:\n    # Code 1\nelse:\n    # Code 2 runs when?',
    options: [
      'Only when the if condition is FALSE',
      'Only when the if condition is TRUE',
      'It always runs no matter what',
      'It never runs'
    ],
    correctIndex: 0,
    explanation: '"else" runs when the if condition is NOT true (False)! It means: otherwise, do this.',
    explanationArabic: 'يعمل أمر else عندما يكون شرط if غير صحيح (False)، ومعناه: وإلا، افعل هذا.',
    hint: 'Else = لو الشرط غير صحيح'
  },
  {
    id: 'g5-q3',
    grade: 'Grade 5',
    difficulty: 'medium',
    points: 20,
    title: 'Sunny or Rainy Day?',
    topic: 'Predicting Output',
    question: 'What does this weather program print?',
    questionArabic: 'ماذا سيطبع برنامج الطقس التالي؟',
    codeSnippet: 'weather = "rainy"\nif weather == "sunny":\n    print("Play outside!")\nelse:\n    print("Play inside!")',
    options: [
      'Play outside!',
      'Play inside!',
      'weather',
      'sunny'
    ],
    correctIndex: 1,
    explanation: 'weather is "rainy", so weather == "sunny" is False. The else block runs and prints "Play inside!"',
    explanationArabic: 'المتغير weather يحمل قيمة "rainy" وليس "sunny"، فالشرط خاطئ وينتقل إلى else ليطبع "Play inside!".',
    hint: 'Is the weather sunny? No, it is rainy!'
  },
  {
    id: 'g5-q4',
    grade: 'Grade 5',
    difficulty: 'medium',
    points: 20,
    title: 'Secret Password Challenge',
    topic: 'Real-life Conditions',
    question: 'A student enters "python123". What will the game output?',
    questionArabic: 'طالب أدخل كلمة السر "python123". ماذا ستكون نتيجة اللعبة؟',
    codeSnippet: 'password = "python123"\nif password == "python123":\n    print("Welcome to the game!")\nelse:\n    print("Wrong password!")',
    options: [
      'Wrong password!',
      'Welcome to the game!',
      'python123',
      'Access Denied'
    ],
    correctIndex: 1,
    explanation: 'The entered password matches "python123" exactly, so the welcome message is displayed!',
    explanationArabic: 'كلمة المرور مطابقة تماماً للكلمة السرية، لذا يطبع "Welcome to the game!".',
    hint: 'Check slide 5: Correct password grants welcome access!'
  },
  {
    id: 'g5-q5',
    grade: 'Grade 5',
    difficulty: 'medium',
    points: 20,
    title: 'Which Color Match?',
    topic: 'Output Prediction',
    question: 'What is the output of this Python code?',
    questionArabic: 'ما ناتج هذا الكود من العرض التقديمي؟',
    codeSnippet: 'color = "blue"\nif color == "red":\n    print("Red")\nelse:\n    print("Other")',
    options: [
      'Red',
      'Other',
      'blue',
      'Error'
    ],
    correctIndex: 1,
    explanation: 'color is "blue", which is not "red". So the condition color == "red" is False, triggering the else clause to print "Other"!',
    explanationArabic: 'اللون هو blue وليس red، الشرط غير صحيح وبالتالي ينفذ else ويطبع "Other".',
    hint: 'Slide 5 question: color = "blue", if color == "red"...'
  },
  {
    id: 'g5-q6',
    grade: 'Grade 5',
    difficulty: 'medium',
    points: 20,
    title: 'Difference between = and ==',
    topic: 'Comparison Operator',
    question: 'In the line: if key == "left": what does "==" do?',
    questionArabic: 'في السطر: if key == "left": ما وظيفة الرمز "=="؟',
    options: [
      'It stores "left" into key',
      'It checks and compares if key equals "left"',
      'It deletes the key',
      'It turns key into a number'
    ],
    correctIndex: 1,
    explanation: '== is the comparison operator. It checks whether the value in key is equal to "left" without modifying it.',
    explanationArabic: '== يقارن ويفحص هل القيمة المخزنة في key تساوي "left" أم لا.',
    hint: 'Slide 4: light == "green" # Check the value and compare'
  },

  // ==========================================
  // GRADE 6 - HARD (ELIF, Multiple Conditions, Treasure Hunt, Output Mastery) - 30 Points Each
  // ==========================================
  {
    id: 'g6-q1',
    grade: 'Grade 6',
    difficulty: 'hard',
    points: 30,
    title: 'What is ELIF?',
    topic: 'Elif Concept',
    question: 'What does "elif" stand for and when do we use it in Python?',
    questionArabic: 'ما هو اختصار "elif" ومتى نستخدمه في بايثون؟',
    options: [
      'Else If – to test another condition when the previous one is false',
      'Every Loop If – to repeat forever',
      'Extra Line In File – to add text',
      'Exit Level If – to quit the game'
    ],
    correctIndex: 0,
    explanation: 'elif is short for "Else If". We use it when we have multiple possibilities to test one by one in order!',
    explanationArabic: 'elif اختصار لـ Else If ومعناها: وإلا، جرّب شرطاً آخر عندما يكون الشرط السابق غير صحيح.',
    hint: 'Slide 6: elif اختصار لـ Else If، وتُستخدم لما يكون عندنا أكثر من احتمال.'
  },
  {
    id: 'g6-q2',
    grade: 'Grade 6',
    difficulty: 'hard',
    points: 30,
    title: 'Treasure Maze – Hidden Key',
    topic: 'Elif Decision Chain',
    question: 'What is the output of this code when key is "hidden"?',
    questionArabic: 'ما ناتج هذا الكود عندما يكون المفتاح مخفي "hidden"؟',
    codeSnippet: 'key = "hidden"\nif key == "left":\n    print("Left")\nelif key == "right":\n    print("Right")\nelse:\n    print("Search")',
    options: [
      'Left',
      'Right',
      'Search',
      'hidden'
    ],
    correctIndex: 2,
    explanation: 'key is not "left" (False), and key is not "right" (False). Both failed, so the else branch executes and prints "Search"!',
    explanationArabic: 'المفتاح ليس left وليس right، فكلا الشرطين غير صحيح، لذا يذهب البرنامج إلى else ويطبع "Search"!',
    hint: 'Slide 5 & 6: neither left nor right, so we must Search!'
  },
  {
    id: 'g6-q3',
    grade: 'Grade 6',
    difficulty: 'hard',
    points: 30,
    title: 'Traffic Light with Yellow',
    topic: 'Multiple Conditions',
    question: 'What will this Python program print for traffic control?',
    questionArabic: 'ماذا سيطبع برنامج إشارة المرور الذكي التالي؟',
    codeSnippet: 'signal = "yellow"\nif signal == "green":\n    print("Go!")\nelif signal == "yellow":\n    print("Get Ready!")\nelse:\n    print("Stop!")',
    options: [
      'Go!',
      'Get Ready!',
      'Stop!',
      'Go! Get Ready!'
    ],
    correctIndex: 1,
    explanation: 'signal is "yellow". The first if is false, so it checks elif signal == "yellow", which is True! It prints "Get Ready!" and stops.',
    explanationArabic: 'الإشارة yellow، شرط if الأول خطأ، فينتقل إلى elif ويجد الشرط صحيحاً ويطبع "Get Ready!".',
    hint: 'Check the yellow condition in the middle!'
  },
  {
    id: 'g6-q4',
    grade: 'Grade 6',
    difficulty: 'hard',
    points: 30,
    title: 'Treasure Chest Level',
    topic: 'Nested / Sequential Logic',
    question: 'What will print when coins = 50 and has_key = False?',
    questionArabic: 'ماذا سيطبع الكود عندما coins = 50 و has_key = False؟',
    codeSnippet: 'coins = 50\nhas_key = False\n\nif coins >= 100:\n    print("Golden Chest")\nelif has_key == True:\n    print("Silver Chest")\nelse:\n    print("Wooden Chest")',
    options: [
      'Golden Chest',
      'Silver Chest',
      'Wooden Chest',
      'Game Over'
    ],
    correctIndex: 2,
    explanation: 'coins (50) is not >= 100 (False), and has_key is False (not True). Therefore, the else block runs and prints "Wooden Chest"!',
    explanationArabic: 'العملات 50 (أقل من 100) والمفتاح غير موجود، لذلك يفشل الشرطان ويتم تنفيذ else وطباعة "Wooden Chest"!',
    hint: 'Evaluate each condition in sequence from top to bottom.'
  },
  {
    id: 'g6-q5',
    grade: 'Grade 6',
    difficulty: 'hard',
    points: 30,
    title: 'Order of Conditions in ELIF',
    topic: 'Logic Execution Order',
    question: 'In Python, once a condition in an IF-ELIF-ELSE chain evaluates to True, what happens to the remaining checks?',
    questionArabic: 'في بايثون، عندما يتحقق أول شرط صحيح في سلسلة IF-ELIF-ELSE، ماذا يحدث لبقية الشروط؟',
    options: [
      'Python executes the matching block and skips the rest of the chain',
      'Python continues and executes all other blocks anyway',
      'Python crashes and shows an error',
      'Python restarts from the beginning'
    ],
    correctIndex: 0,
    explanation: 'Python executes the first True block and immediately skips all subsequent elif and else branches in that block.',
    explanationArabic: 'بايثون ينفذ أول شرط صحيح يقابله ويتخطى باقي شروط elif و else تماماً.',
    hint: 'Slide 6: "نختبر الاحتمالات بالترتيب، وبمجرد تحقق أحدهما ننفذه وننتهي"'
  },
  {
    id: 'g6-q6',
    grade: 'Grade 6',
    difficulty: 'hard',
    points: 30,
    title: 'Hero Path Decision',
    topic: 'Complex Output Prediction',
    question: 'What is the final message shown by this hero navigation code?',
    questionArabic: 'ما هي الرسالة النهائية التي يظهرها كود توجيه البطل؟',
    codeSnippet: 'path = "right"\nenergy = 80\n\nif path == "left":\n    print("Enter the Cave")\nelif path == "right" and energy > 50:\n    print("Fly Over Castle")\nelse:\n    print("Rest at Camp")',
    options: [
      'Enter the Cave',
      'Fly Over Castle',
      'Rest at Camp',
      'Cave & Castle'
    ],
    correctIndex: 1,
    explanation: 'path is "right" and energy (80) is greater than 50. Both parts of the condition are True, so it prints "Fly Over Castle"!',
    explanationArabic: 'المسار هو right والطاقة 80 أكبر من 50، كلا الجزأين صحيح فيتحقق شرط elif ويطبع "Fly Over Castle"!',
    hint: 'path == "right" is True AND energy > 50 is True!'
  }
];

