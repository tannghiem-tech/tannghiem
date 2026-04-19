import { useState, useEffect } from 'react';
import { 
  Calculator, 
  History, 
  Info, 
  Trash2, 
  User, 
  Scale, 
  Ruler,
  RotateCcw,
  Activity,
  AlertCircle
} from 'lucide-react';
import { cn } from './utils/cn';

interface BMIRecord {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  date: string;
  unit: 'metric' | 'imperial';
}

const CATEGORIES = [
  { label: 'Thiếu cân', min: 0, max: 18.5, color: 'text-blue-500', bg: 'bg-blue-500', advice: 'Bạn cần ăn uống đầy đủ dinh dưỡng và có thể tham khảo ý kiến chuyên gia dinh dưỡng.' },
  { label: 'Bình thường', min: 18.5, max: 24.9, color: 'text-green-500', bg: 'bg-green-500', advice: 'Tuyệt vời! Hãy duy trì lối sống lành mạnh và chế độ ăn uống hiện tại.' },
  { label: 'Tiền béo phì', min: 25, max: 29.9, color: 'text-yellow-500', bg: 'bg-yellow-500', advice: 'Bạn nên chú ý hơn đến chế độ ăn uống và tăng cường hoạt động thể chất.' },
  { label: 'Béo phì độ I', min: 30, max: 34.9, color: 'text-orange-500', bg: 'bg-orange-500', advice: 'Bạn nên thiết lập một kế hoạch giảm cân khoa học và tập thể dục đều đặn.' },
  { label: 'Béo phì độ II', min: 35, max: 39.9, color: 'text-red-500', bg: 'bg-red-500', advice: 'Cảnh báo! Bạn nên tham khảo ý kiến bác sĩ để có biện pháp can thiệp kịp thời.' },
  { label: 'Béo phì độ III', min: 40, max: 100, color: 'text-red-700', bg: 'bg-red-700', advice: 'Mức độ nguy hiểm. Hãy tìm kiếm sự trợ giúp y tế chuyên nghiệp ngay lập tức.' },
];

export default function App() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<typeof CATEGORIES[0] | null>(null);
  const [history, setHistory] = useState<BMIRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'calc' | 'history' | 'info'>('calc');

  useEffect(() => {
    const savedHistory = localStorage.getItem('bmi_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || h <= 0) return;

    let calculatedBmi = 0;
    if (unit === 'metric') {
      // weight in kg, height in cm
      calculatedBmi = w / ((h / 100) * (h / 100));
    } else {
      // weight in lbs, height in inches
      calculatedBmi = (w / (h * h)) * 703;
    }

    const roundedBmi = Math.round(calculatedBmi * 10) / 10;
    setBmi(roundedBmi);

    const cat = CATEGORIES.find(c => roundedBmi >= c.min && roundedBmi <= c.max) || CATEGORIES[CATEGORIES.length - 1];
    setCategory(cat);

    const newRecord: BMIRecord = {
      id: Date.now().toString(),
      weight: w,
      height: h,
      bmi: roundedBmi,
      category: cat.label,
      date: new Date().toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      unit
    };

    const updatedHistory = [newRecord, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('bmi_history', JSON.stringify(updatedHistory));
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory(null);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmi_history');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">HealthCheck BMI</h1>
          </div>
          <button 
            onClick={() => setActiveTab('info')}
            className={cn(
              "p-2 rounded-full transition-colors",
              activeTab === 'info' ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-slate-100"
            )}
          >
            <Info size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {activeTab === 'calc' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Unit Toggle */}
            <div className="bg-white p-1 rounded-xl border flex shadow-sm">
              <button
                onClick={() => { setUnit('metric'); reset(); }}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                  unit === 'metric' ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                Hệ mét (kg, cm)
              </button>
              <button
                onClick={() => { setUnit('imperial'); reset(); }}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                  unit === 'imperial' ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                Hệ Anh (lbs, inch)
              </button>
            </div>

            {/* Inputs */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Ruler size={16} /> Chiều cao ({unit === 'metric' ? 'cm' : 'inch'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? "Ví dụ: 170" : "Ví dụ: 67"}
                  className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Scale size={16} /> Cân nặng ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? "Ví dụ: 65" : "Ví dụ: 143"}
                  className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={calculateBMI}
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-200"
                >
                  Tính toán BMI
                </button>
                <button
                  onClick={reset}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-all flex items-center justify-center"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>

            {/* Result Display */}
            {bmi && category && (
              <div className="bg-white p-6 rounded-2xl border shadow-lg border-t-4 border-t-blue-500 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <p className="text-slate-500 font-medium">Chỉ số BMI của bạn</p>
                  <h2 className="text-5xl font-black text-slate-900">{bmi}</h2>
                  <div className={cn("inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider", category.bg, "text-white")}>
                    {category.label}
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {/* Visual Scale (Total scale maxed at BMI 50 for visualization) */}
                  <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-400" style={{ width: '37%' }} title="Thiếu cân"></div>
                    <div className="h-full bg-green-500" style={{ width: '13%' }} title="Bình thường"></div>
                    <div className="h-full bg-yellow-400" style={{ width: '10%' }} title="Tiền béo phì"></div>
                    <div className="h-full bg-orange-500" style={{ width: '10%' }} title="Béo phì độ I"></div>
                    <div className="h-full bg-red-500" style={{ width: '10%' }} title="Béo phì độ II"></div>
                    <div className="h-full bg-red-700" style={{ width: '20%' }} title="Béo phì độ III"></div>
                    
                    {/* Marker */}
                    <div 
                      className="absolute top-0 w-1.5 h-full bg-slate-900 border-x border-white shadow-md transition-all duration-1000 ease-out"
                      style={{ left: `${Math.min(Math.max((bmi / 50) * 100, 0), 100)}%`, transform: 'translateX(-50%)' }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                    <span>0</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40+</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <h4 className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                    <AlertCircle size={18} className="text-blue-500" />
                    Lời khuyên:
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {category.advice}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Lịch sử đo</h2>
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-red-500 text-sm font-medium flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-lg"
                >
                  <Trash2 size={16} /> Xóa hết
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="bg-white border rounded-2xl p-12 text-center space-y-4">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <History className="text-slate-300" size={32} />
                </div>
                <p className="text-slate-500">Chưa có dữ liệu lịch sử.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((record) => (
                  <div key={record.id} className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{record.bmi}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                          CATEGORIES.find(c => c.label === record.category)?.bg || 'bg-slate-500',
                          "text-white"
                        )}>
                          {record.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {record.height}{record.unit === 'metric' ? 'cm' : 'in'} • {record.weight}{record.unit === 'metric' ? 'kg' : 'lb'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{record.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold">Về chỉ số BMI</h2>
            
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed">
                Chỉ số khối cơ thể (BMI - Body Mass Index) là một phép tính dựa trên chiều cao và cân nặng, giúp xác định xem một người có cân nặng ở mức khỏe mạnh hay không.
              </p>
              
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-800">Bảng phân loại (WHO):</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {CATEGORIES.map(cat => (
                    <div key={cat.label} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                      <div className={cn("w-2 h-2 rounded-full", cat.bg)}></div>
                      <span className="font-medium">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                <AlertCircle className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-800 leading-relaxed">
                  Lưu ý: BMI không đo trực tiếp lượng mỡ cơ thể và không phản ánh chính xác cho vận động viên, người già hoặc phụ nữ mang thai.
                </p>
              </div>

              <button 
                onClick={() => setActiveTab('calc')}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold"
              >
                Quay lại tính toán
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t pb-safe">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-between items-center">
          <button 
            onClick={() => setActiveTab('calc')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'calc' ? "text-blue-600" : "text-slate-400"
            )}
          >
            <Calculator size={24} />
            <span className="text-[10px] font-bold">Máy tính</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'history' ? "text-blue-600" : "text-slate-400"
            )}
          >
            <History size={24} />
            <span className="text-[10px] font-bold">Lịch sử</span>
          </button>

          <button 
            onClick={() => {}} 
            className="flex flex-col items-center gap-1 text-slate-400 opacity-50 cursor-not-allowed"
          >
            <User size={24} />
            <span className="text-[10px] font-bold">Hồ sơ</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
