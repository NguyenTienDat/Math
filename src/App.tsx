import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Lightbulb, 
  HelpCircle,
  BookOpen,
  Star,
  LayoutGrid,
  ArrowRight
} from 'lucide-react';
import { getQuestionsByGrade } from './data/allQuestions';
import { Question, QuestionType, GradeLevel } from './types';

export default function App() {
  const [view, setView] = useState<'home' | 'quiz'>('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const startQuiz = (grade: GradeLevel) => {
    const qList = getQuestionsByGrade(grade);
    setQuestions(qList);
    setSelectedGrade(grade);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setView('quiz');
  };

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    setIsAnswered(true);

    const option = currentQuestion.options.find(o => o.id === optionId);
    if (option?.value === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const goHome = () => {
    setView('home');
    setSelectedGrade(null);
  };

  const renderVisual = (question: Question) => {
    if (!question.visualData) return null;

    switch (question.type) {
      case QuestionType.COUNTING_CUBES:
        return (
          <div className="relative w-full aspect-video bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
            <svg viewBox="0 0 400 300" className="w-full h-full max-w-md">
              <defs>
                <linearGradient id="cubeTop" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D1FAE5" />
                  <stop offset="100%" stopColor="#A7F3D0" />
                </linearGradient>
                <linearGradient id="cubeSide" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6EE7B7" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
              {[0, 1, 2].map(row => 
                [0, 1, 2].map(col => {
                  const x = 200 + (col - row) * 40;
                  const y = 150 + (col + row) * 20;
                  return (
                    <g key={`b-${row}-${col}`} transform={`translate(${x}, ${y})`}>
                      <path d="M0 -20 L40 0 L0 20 L-40 0 Z" fill="url(#cubeTop)" stroke="#059669" strokeWidth="1" />
                      <path d="M0 20 L40 0 L40 40 L0 60 Z" fill="url(#cubeSide)" stroke="#059669" strokeWidth="1" />
                      <path d="M0 20 L-40 0 L-40 40 L0 60 Z" fill="#10B981" stroke="#059669" strokeWidth="1" />
                    </g>
                  );
                })
              )}
              <g transform="translate(200, 110)">
                <path d="M0 -20 L40 0 L0 20 L-40 0 Z" fill="url(#cubeTop)" stroke="#059669" strokeWidth="2" />
                <path d="M0 20 L40 0 L40 40 L0 60 Z" fill="url(#cubeSide)" stroke="#059669" strokeWidth="2" />
                <path d="M0 20 L-40 0 L-40 40 L0 60 Z" fill="#10B981" stroke="#059669" strokeWidth="2" />
              </g>
            </svg>
          </div>
        );
      case QuestionType.PATTERNS:
        return (
          <div className="flex items-center justify-center gap-4 py-8 bg-slate-50 rounded-2xl border border-slate-100">
            {question.visualData?.sequence?.map((item: string, i: number) => (
              <div key={i} className="text-4xl w-16 h-16 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200">
                {item === '?' ? <HelpCircle className="text-blue-500 w-8 h-8 animate-pulse" /> : item}
              </div>
            ))}
          </div>
        );
      case QuestionType.LOGIC:
        if (question.visualData?.characters) {
          return (
            <div className="flex items-end justify-center gap-8 py-12 bg-slate-50 rounded-2xl border border-slate-100 min-h-[240px]">
              {question.visualData.characters.map((char: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: char.height * 1.5 }}
                    className="w-12 rounded-t-2xl shadow-sm relative"
                    style={{ backgroundColor: char.color }}
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                    </div>
                  </motion.div>
                  <span className="font-bold text-slate-600">{char.name}</span>
                </div>
              ))}
            </div>
          );
        }
        return null;
      case QuestionType.GEOMETRY:
        return (
          <div className="flex items-center justify-center py-8 bg-slate-50 rounded-2xl border border-slate-100">
            <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                d="M100 40 L160 160 L40 160 Z"
                fill="#DBEAFE"
                stroke="#3B82F6"
                strokeWidth="8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  if (view === 'home') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm mb-4"
            >
              <Star className="w-4 h-4 fill-current" />
              CHƯƠNG TRÌNH TOÁN TƯ DUY CHUẨN QUỐC TẾ
            </motion.div>
            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Học Toán Thật <span className="text-blue-600">Vui!</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Khám phá thế giới toán học thông qua các bài tập tư duy logic, hình học và đố vui đầy thú vị.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {([1, 2, 3, 4, 5] as GradeLevel[]).map((grade) => (
              <motion.button
                key={grade}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startQuiz(grade)}
                className="group relative bg-white p-8 rounded-[40px] border-2 border-slate-100 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BookOpen className="w-24 h-24 text-blue-600" />
                </div>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white font-bold text-2xl shadow-lg ${
                  grade === 1 ? 'bg-emerald-500' : 
                  grade === 2 ? 'bg-blue-500' : 
                  grade === 3 ? 'bg-indigo-500' : 
                  grade === 4 ? 'bg-purple-500' : 'bg-rose-500'
                }`}>
                  {grade}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Lớp {grade}</h3>
                <p className="text-slate-500 mb-6">30 câu hỏi tư duy logic & toán đố thực tế.</p>
                
                <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                  Bắt đầu học <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            ))}

            <div className="bg-slate-900 p-8 rounded-[40px] text-white flex flex-col justify-center">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
                <LayoutGrid className="w-4 h-4" />
                SẮP RA MẮT
              </div>
              <h3 className="text-2xl font-bold mb-2">Đấu Trường Toán Học</h3>
              <p className="text-slate-400">Thi đấu trực tuyến cùng bạn bè khắp cả nước.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8FAFC]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="math-card max-w-lg w-full p-12 text-center"
        >
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Hoàn thành bài học!</h1>
          <p className="text-slate-600 text-lg mb-8">
            Bạn đã trả lời đúng <span className="text-blue-600 font-bold">{score}</span> trên <span className="font-bold">{questions.length}</span> câu hỏi Lớp {selectedGrade}.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => startQuiz(selectedGrade as GradeLevel)}
              className="w-full bg-blue-600 text-white py-4 rounded-full text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Làm lại
            </button>
            <button 
              onClick={goHome}
              className="w-full bg-slate-100 text-slate-600 py-4 rounded-full text-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={goHome}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-sm">
            Câu {currentIndex + 1}
          </div>
          <h2 className="text-xl font-bold text-slate-800">Lớp {selectedGrade}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-32 md:w-48 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-slate-500">{currentIndex + 1}/{questions.length}</span>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                {currentQuestion.text}
              </h1>
              {renderVisual(currentQuestion)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrect = isAnswered && option.value === currentQuestion.correctAnswer;
                const isWrong = isAnswered && isSelected && option.value !== currentQuestion.correctAnswer;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isAnswered}
                    className={`
                      option-btn
                      ${isSelected ? 'selected' : ''}
                      ${isCorrect ? 'correct' : ''}
                      ${isWrong ? 'wrong' : ''}
                    `}
                  >
                    <span className="mr-2">{option.value}</span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5" />}
                    {isWrong && <XCircle className="w-5 h-5" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-8 border-t border-slate-100"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ĐÁP ÁN
                    </div>
                    <div className="inline-flex items-center px-8 py-3 bg-green-50 border-2 border-green-500 text-green-700 rounded-full font-bold text-lg">
                      {currentQuestion.correctAnswer}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest font-bold text-xs">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      GIẢI THÍCH
                    </div>
                    <div className="bg-blue-50/50 p-6 rounded-3xl text-slate-700 leading-relaxed whitespace-pre-line text-lg">
                      {currentQuestion.explanation}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-12 flex items-center justify-between pb-8">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Quay lại
        </button>

        {isAnswered && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            {currentIndex === questions.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </footer>
    </div>
  );
}
