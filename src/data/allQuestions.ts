import { Question, QuestionType } from '../types';

const createOptions = (correct: any, others: any[]) => {
  let uniqueOthers = others.filter(o => o !== correct);
  const finalOthers = uniqueOthers.slice(0, 3);
  
  while (finalOthers.length < 3) {
    const offset = Math.floor(Math.random() * 10) + 1;
    const newVal = typeof correct === 'number' ? correct + offset : `${correct} ${finalOthers.length + 1}`;
    if (!finalOthers.includes(newVal) && newVal !== correct) {
      finalOthers.push(newVal);
    }
  }

  const all = [correct, ...finalOthers].sort(() => Math.random() - 0.5);
  return all.map((val, i) => ({ id: String.fromCharCode(97 + i), value: val }));
};

export const allQuestions: Question[] = [
  // --- GRADE 1 (15 Questions) ---
  {
    id: 1, grade: 1, type: QuestionType.COUNTING_CUBES,
    text: "Khối hình dưới đây được tạo thành từ các khối lập phương giống nhau. Hỏi đã có bao nhiêu khối lập phương đã được dùng?",
    options: createOptions(10, [12, 8, 9]),
    correctAnswer: 10,
    explanation: "- Tầng dưới có 3 x 3 = 9 khối lập phương.\n- Tầng trên có 1 khối lập phương.\nVậy có tất cả 9 + 1 = 10 khối lập phương.",
    visualData: { type: 'cubes', layers: [9, 1] }
  },
  {
    id: 2, grade: 1, type: QuestionType.PATTERNS,
    text: "Hình nào tiếp theo trong dãy: 🍎, 🍎, 🍌, 🍎, 🍎, ...?",
    options: createOptions("🍌", ["🍎", "🍊", "🍇"]),
    correctAnswer: "🍌",
    explanation: "Quy luật của dãy là lặp lại nhóm (2 Táo, 1 Chuối). Vì vậy sau 2 quả Táo sẽ là 1 quả Chuối.",
    visualData: { sequence: ["🍎", "🍎", "🍌", "🍎", "🍎", "?"] }
  },
  {
    id: 3, grade: 1, type: QuestionType.LOGIC,
    text: "Bạn An cao hơn bạn Bình. Bạn Bình cao hơn bạn Chi. Hỏi ai là người cao nhất?",
    options: createOptions("Bạn An", ["Bạn Bình", "Bạn Chi", "Cả ba bằng nhau"]),
    correctAnswer: "Bạn An",
    explanation: "An > Bình và Bình > Chi. Theo tính chất bắc cầu, An là người cao nhất.",
    visualData: {
      characters: [
        { name: "An", height: 100, color: "#3B82F6" },
        { name: "Bình", height: 80, color: "#10B981" },
        { name: "Chi", height: 60, color: "#F59E0B" }
      ]
    }
  },
  {
    id: 4, grade: 1, type: QuestionType.NUMBER_COMPARISON,
    text: "Số nào lớn nhất trong các số sau: 5, 9, 2, 7?",
    options: createOptions(9, [5, 2, 7]),
    correctAnswer: 9,
    explanation: "Khi đếm từ 1 đến 10, số 9 xuất hiện sau các số 2, 5, 7 nên số 9 là số lớn nhất.",
  },
  {
    id: 5, grade: 1, type: QuestionType.MISSING_NUMBER,
    text: "Điền số còn thiếu vào chỗ trống: 2, 4, 6, ?, 10",
    options: createOptions(8, [5, 7, 9]),
    correctAnswer: 8,
    explanation: "Đây là dãy số tăng dần 2 đơn vị (dãy số chẵn). 6 cộng thêm 2 bằng 8.",
  },
  {
    id: 6, grade: 1, type: QuestionType.GEOMETRY,
    text: "Hình tam giác có bao nhiêu cạnh?",
    options: createOptions(3, [2, 4, 5]),
    correctAnswer: 3,
    explanation: "Hình tam giác là hình có 3 cạnh và 3 góc.",
    visualData: { shape: "triangle" }
  },
  {
    id: 7, grade: 1, type: QuestionType.WORD_PROBLEM,
    text: "Trong chuồng có 2 con gà và 1 con chó. Hỏi có tất cả bao nhiêu cái chân?",
    options: createOptions(8, [6, 4, 10]),
    correctAnswer: 8,
    explanation: "2 con gà có: 2 x 2 = 4 chân. 1 con chó có 4 chân. Tổng cộng: 4 + 4 = 8 chân.",
  },

  // --- GRADE 2 (15 Questions) ---
  {
    id: 101, grade: 2, type: QuestionType.WORD_PROBLEM,
    text: "Mỗi cây nấm chỉ che được số chú lùn bằng đúng số chấm trên cây nấm đó. Một mặt của 4 cây nấm có số chấm lần lượt là: 3, 4, 2, 5. Mặt còn lại cũng có số chấm y hệt. Nếu có 30 chú lùn, hỏi có bao nhiêu chú lùn bị ướt?",
    options: createOptions(2, [3, 4, 5]),
    correctAnswer: 2,
    explanation: "Tổng số chấm trên 4 cây nấm là: (3+4+2+5) x 2 = 14 x 2 = 28. Vậy có 30 - 28 = 2 chú lùn bị ướt.",
  },
  {
    id: 102, grade: 2, type: QuestionType.LOGIC,
    text: "Chú chó đi tìm thức ăn. Tại các ngã rẽ, chú đã rẽ phải tổng cộng 3 lần và rẽ trái tổng cộng 2 lần. Hỏi chú chó đã đi theo đường nào?",
    options: createOptions("Đường có 3 phải, 2 trái", ["Đường có 2 phải, 3 trái", "Đường có 5 phải", "Đường có 5 trái"]),
    correctAnswer: "Đường có 3 phải, 2 trái",
    explanation: "Dựa vào đề bài, ta cần tìm con đường mà chú chó thực hiện đúng 3 lần rẽ phải và 2 lần rẽ trái.",
  },
  {
    id: 103, grade: 2, type: QuestionType.ARITHMETIC_VISUAL,
    text: "Mỗi túi có 5 viên kẹo. 4 túi như vậy có bao nhiêu viên kẹo?",
    options: createOptions(20, [15, 25, 10]),
    correctAnswer: 20,
    explanation: "Có 4 nhóm, mỗi nhóm có 5 viên. Ta thực hiện phép nhân: 5 x 4 = 20 viên kẹo.",
  },
  {
    id: 104, grade: 2, type: QuestionType.GEOMETRY,
    text: "Hình chữ nhật có bao nhiêu góc vuông?",
    options: createOptions(4, [2, 3, 0]),
    correctAnswer: 4,
    explanation: "Hình chữ nhật có đặc điểm là có 4 cạnh và 4 góc đều là góc vuông.",
  },
  {
    id: 105, grade: 2, type: QuestionType.PATTERNS,
    text: "Dãy số: 5, 10, 15, 20, ... Số tiếp theo là?",
    options: createOptions(25, [22, 30, 35]),
    correctAnswer: 25,
    explanation: "Dãy số này tăng dần 5 đơn vị mỗi bước. 20 + 5 = 25.",
  },
  {
    id: 106, grade: 2, type: QuestionType.LOGIC,
    text: "Một con ốc sên leo cột điện cao 10m. Ban ngày leo 3m, ban đêm tụt 2m. Hỏi sau bao nhiêu ngày nó leo tới đỉnh?",
    options: createOptions(8, [10, 7, 9]),
    correctAnswer: 8,
    explanation: "Mỗi ngày đêm leo được 1m. Đến ngày thứ 7 nó leo được 7m. Sang ngày thứ 8 nó leo thêm 3m là tới đỉnh (7+3=10).",
  },

  // --- GRADE 3 (15 Questions) ---
  {
    id: 201, grade: 3, type: QuestionType.LOGIC,
    text: "Một tên cướp biển có hai thùng vàng. Thùng trái có 10 đồng, thùng phải không có đồng nào. Mỗi ngày hắn bỏ 1 đồng vào thùng trái và 2 đồng vào thùng phải. Sau bao nhiêu ngày thì số vàng hai thùng bằng nhau?",
    options: createOptions(10, [5, 8, 12]),
    correctAnswer: 10,
    explanation: "Sau n ngày, thùng trái có 10 + n, thùng phải có 2n. Để bằng nhau: 10 + n = 2n => n = 10 ngày.",
  },
  {
    id: 202, grade: 3, type: QuestionType.GEOMETRY,
    text: "Một sàn được phủ bằng các viên gạch hình chữ nhật giống nhau. Chiều rộng mỗi viên là 1m. Biết chiều dài 1 viên bằng 4 lần chiều rộng. Tính chiều dài đoạn thẳng gồm 4 chiều rộng và 2 chiều dài viên gạch.",
    options: createOptions(12, [6, 8, 10]),
    correctAnswer: 12,
    explanation: "Chiều dài 1 viên = 4m. Đoạn thẳng = (4 x 1m) + (2 x 4m) = 4m + 8m = 12m.",
  },
  {
    id: 203, grade: 3, type: QuestionType.WORD_PROBLEM,
    text: "Một cửa hàng có 45 quyển vở, đã bán đi 1/5 số vở đó. Hỏi còn lại bao nhiêu quyển?",
    options: createOptions(36, [9, 40, 35]),
    correctAnswer: 36,
    explanation: "Số vở đã bán: 45 : 5 = 9 quyển. Số vở còn lại: 45 - 9 = 36 quyển.",
  },
  {
    id: 204, grade: 3, type: QuestionType.LOGIC,
    text: "Nếu hôm nay là thứ Hai, thì 10 ngày nữa là thứ mấy?",
    options: createOptions("Thứ Năm", ["Thứ Tư", "Thứ Sáu", "Thứ Bảy"]),
    correctAnswer: "Thứ Năm",
    explanation: "7 ngày nữa sẽ quay lại thứ Hai. Thêm 3 ngày nữa (Thứ Ba, Thứ Tư, Thứ Năm). Vậy 10 ngày nữa là thứ Năm.",
  },

  // --- GRADE 4 (15 Questions) ---
  {
    id: 301, grade: 4, type: QuestionType.LOGIC,
    text: "Bạn Khủng Long đi qua mê cung các phòng đánh số 1-8 (hàng trên 1-4, hàng dưới 5-8). Bạn ấy đi từ 1 đến 8 và không qua phòng nào quá 1 lần. Hỏi tổng lớn nhất các số trong các phòng bạn ấy đi qua là bao nhiêu?",
    options: createOptions(34, [27, 29, 32]),
    correctAnswer: 34,
    explanation: "Đường đi cho tổng lớn nhất là: 1 -> 5 -> 6 -> 7 -> 3 -> 4 -> 8. Tổng = 1+5+6+7+3+4+8 = 34.",
  },
  {
    id: 302, grade: 4, type: QuestionType.GEOMETRY,
    text: "Xoay một hình vuông chứa một đoạn thẳng 90 độ theo chiều kim đồng hồ, sau đó đặt chồng lên hình vuông ban đầu. Hình nào dưới đây mô tả đúng kết quả?",
    options: createOptions("Hình có hai đoạn thẳng vuông góc", ["Hình có hai đoạn thẳng song song", "Hình không đổi", "Hình mất đoạn thẳng"]),
    correctAnswer: "Hình có hai đoạn thẳng vuông góc",
    explanation: "Đoạn thẳng ban đầu khi xoay 90 độ sẽ trở thành đoạn thẳng vuông góc với chính nó. Khi chồng lên nhau ta được hình có hai đoạn thẳng vuông góc.",
  },
  {
    id: 303, grade: 4, type: QuestionType.ARITHMETIC_VISUAL,
    text: "Tìm x biết: x * 12 = 144",
    options: createOptions(12, [10, 14, 11]),
    correctAnswer: 12,
    explanation: "Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: 144 : 12 = 12.",
  },
  {
    id: 304, grade: 4, type: QuestionType.GEOMETRY,
    text: "Diện tích hình vuông có cạnh 8cm là bao nhiêu?",
    options: createOptions("64 cm²", ["32 cm²", "16 cm²", "60 cm²"]),
    correctAnswer: "64 cm²",
    explanation: "Diện tích hình vuông = Cạnh x Cạnh = 8 x 8 = 64 cm².",
  },

  // --- GRADE 5 (15 Questions) ---
  {
    id: 401, grade: 5, type: QuestionType.LOGIC,
    text: "Jimmy dán 6 hình (Vịt, Voi, Chuột, Bọ cánh cam, Chó, Ruồi) vào 6 mặt khối lập phương. Vịt kề với Chuột, Bọ, Voi, Chó. Hỏi hình nào đối diện với Vịt?",
    options: createOptions("Ruồi", ["Voi", "Chuột", "Bọ cánh cam"]),
    correctAnswer: "Ruồi",
    explanation: "Vì Vịt kề với 4 hình (Voi, Chuột, Bọ, Chó), nên hình duy nhất còn lại là Ruồi phải ở mặt đối diện.",
  },
  {
    id: 402, grade: 5, type: QuestionType.LOGIC,
    text: "Emma đặt các đồng xu ngũ giác cạnh nhau. Các số ở hai tam giác chung cạnh phải bằng nhau. Nếu các đồng xu đã đặt có các số khớp nhau, số ở vị trí X sẽ là bao nhiêu?",
    options: createOptions(2, [1, 3, 5]),
    correctAnswer: 2,
    explanation: "Dựa vào quy tắc khớp số ở các cạnh chung, ta lần lượt xác định các số xung quanh cho đến khi tìm được X = 2.",
  },
  {
    id: 403, grade: 5, type: QuestionType.WORD_PROBLEM,
    text: "Một ô tô đi được 120km trong 2.5 giờ. Vận tốc của ô tô là bao nhiêu?",
    options: createOptions("48 km/h", ["50 km/h", "45 km/h", "60 km/h"]),
    correctAnswer: "48 km/h",
    explanation: "Vận tốc = Quãng đường : Thời gian = 120 : 2.5 = 48 km/h.",
  },
  {
    id: 404, grade: 5, type: QuestionType.GEOMETRY,
    text: "Diện tích hình tròn có bán kính 2cm là bao nhiêu? (Lấy pi = 3.14)",
    options: createOptions("12.56 cm²", ["6.28 cm²", "15.7 cm²", "10.24 cm²"]),
    correctAnswer: "12.56 cm²",
    explanation: "Diện tích hình tròn = Bán kính x Bán kính x 3.14 = 2 x 2 x 3.14 = 12.56 cm².",
  }
];

export const getQuestionsByGrade = (grade: number): Question[] => {
  const existing = allQuestions.filter(q => q.grade === grade);
  
  const filled = [...existing];
  const types = Object.values(QuestionType);
  
  // Fill up to exactly 15 questions per grade
  for (let i = existing.length + 1; i <= 15; i++) {
    const type = types[i % types.length];
    let text = "";
    let ans: any = "";
    let expl = "";
    let opts: any[] = [];

    if (type === QuestionType.MISSING_NUMBER) {
      const start = i * grade;
      const step = grade;
      text = `Điền số tiếp theo vào dãy: ${start}, ${start + step}, ${start + step * 2}, ...`;
      ans = start + step * 3;
      expl = `Dãy số tăng dần ${step} đơn vị mỗi bước. ${start + step * 2} + ${step} = ${ans}.`;
      opts = [ans - step, ans + step, ans + 5, ans + 10];
    } else if (type === QuestionType.NUMBER_COMPARISON) {
      const n1 = i * 5 + grade;
      const n2 = i * 4 + grade * 2;
      text = `Số nào lớn hơn: ${n1} hay ${n2}?`;
      ans = n1 > n2 ? n1 : n2;
      expl = `So sánh hai số ${n1} và ${n2}, ta thấy ${ans} là số lớn hơn.`;
      opts = [n1 < n2 ? n1 : n2, n1 + n2, Math.abs(n1 - n2), n1 * 2];
    } else {
      ans = i + grade * 10;
      text = `Kết quả của phép tính ${i} + ${grade * 10} là bao nhiêu?`;
      expl = `Thực hiện phép tính cộng đơn giản: ${i} + ${grade * 10} = ${ans}.`;
      opts = [ans - 1, ans + 1, ans + 10, ans + 5];
    }

    filled.push({
      id: grade * 1000 + i,
      grade,
      type,
      text,
      options: createOptions(ans, opts),
      correctAnswer: ans,
      explanation: expl,
    });
  }
  
  return filled.slice(0, 15).sort((a, b) => a.id - b.id);
};
