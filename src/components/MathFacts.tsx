import { useState, useEffect } from 'react';

const facts = [
  {
    icon: '📜',
    title: 'Lịch sử',
    content: 'Phương trình bậc hai đã được người Babylon nghiên cứu từ 2000 năm trước Công nguyên!'
  },
  {
    icon: '🎯',
    title: 'Thực tế',
    content: 'Phương trình bậc hai được dùng để tính quỹ đạo bóng, thiết kế cầu và nhiều ứng dụng khác!'
  },
  {
    icon: '🔢',
    title: 'Khám phá',
    content: 'Công thức nghiệm tổng quát được nhà toán học Al-Khwarizmi người Persia phát triển vào thế kỷ 9!'
  },
  {
    icon: '⭐',
    title: 'Thú vị',
    content: 'Giá trị Delta (Δ) cho biết số nghiệm: Δ > 0 (2 nghiệm), Δ = 0 (1 nghiệm), Δ < 0 (vô nghiệm)'
  },
  {
    icon: '🎨',
    title: 'Hình học',
    content: 'Đồ thị của phương trình bậc hai là Parabol - đường cong hoàn hảo trong thiên nhiên!'
  },
  {
    icon: '💡',
    title: 'Ứng dụng',
    content: 'NASA sử dụng phương trình bậc hai để tính toán quỹ đạo tên lửa và vệ tinh!'
  }
];

export default function MathFacts() {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fact = facts[currentFact];

  return (
    <div className="max-w-5xl mx-auto my-8">
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl p-6 shadow-lg border-2 border-purple-200 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 text-9xl opacity-5">
          {fact.icon}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{fact.icon}</span>
            <h3 className="text-xl font-bold text-purple-700">
              Bạn có biết? - {fact.title}
            </h3>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            {fact.content}
          </p>
          
          {/* Progress dots */}
          <div className="flex gap-2 mt-4 justify-center">
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFact(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentFact 
                    ? 'w-8 bg-purple-500' 
                    : 'w-2 bg-purple-300 hover:bg-purple-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
