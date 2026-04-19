import { useState } from "react";

type BMICategory = {
  label: string;
  color: string;
  bg: string;
  border: string;
  emoji: string;
  advice: string;
};

function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5)
    return {
      label: "Thiếu Cân",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-400",
      emoji: "🥗",
      advice:
        "Bạn đang thiếu cân. Hãy tăng cường dinh dưỡng, ăn đủ bữa và tham khảo ý kiến bác sĩ để có chế độ ăn phù hợp.",
    };
  if (bmi < 25)
    return {
      label: "Bình Thường",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-400",
      emoji: "💪",
      advice:
        "Tuyệt vời! Cân nặng của bạn đang ở mức lý tưởng. Hãy duy trì lối sống lành mạnh và tập thể dục đều đặn.",
    };
  if (bmi < 30)
    return {
      label: "Thừa Cân",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      emoji: "⚠️",
      advice:
        "Bạn đang thừa cân. Hãy điều chỉnh chế độ ăn uống, tăng cường vận động thể chất để cải thiện sức khỏe.",
    };
  if (bmi < 35)
    return {
      label: "Béo Phì Độ I",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-400",
      emoji: "🏃",
      advice:
        "Bạn đang béo phì độ I. Cần có kế hoạch giảm cân nghiêm túc kết hợp ăn uống lành mạnh và tập luyện thường xuyên.",
    };
  if (bmi < 40)
    return {
      label: "Béo Phì Độ II",
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-400",
      emoji: "🏥",
      advice:
        "Bạn đang béo phì độ II. Hãy tham khảo ngay ý kiến bác sĩ để có phác đồ điều trị và giảm cân an toàn.",
    };
  return {
    label: "Béo Phì Độ III",
    color: "text-red-700",
    bg: "bg-red-100",
    border: "border-red-600",
    emoji: "🚨",
    advice:
      "Bạn đang béo phì độ III (nghiêm trọng). Cần gặp bác sĩ ngay để được tư vấn và điều trị chuyên sâu.",
  };
}

const BMI_RANGES = [
  { label: "Thiếu cân", range: "< 18.5", color: "bg-blue-400" },
  { label: "Bình thường", range: "18.5 – 24.9", color: "bg-green-400" },
  { label: "Thừa cân", range: "25 – 29.9", color: "bg-yellow-400" },
  { label: "Béo phì độ I", range: "30 – 34.9", color: "bg-orange-400" },
  { label: "Béo phì độ II", range: "35 – 39.9", color: "bg-red-400" },
  { label: "Béo phì độ III", range: "≥ 40", color: "bg-red-700" },
];

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BMICategory | null>(null);
  const [errors, setErrors] = useState<{ weight?: string; height?: string }>({});

  const validate = () => {
    const newErrors: { weight?: string; height?: string } = {};
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!weight || isNaN(w) || w <= 0) {
      newErrors.weight = "Vui lòng nhập cân nặng hợp lệ.";
    } else if (unit === "metric" && (w < 10 || w > 500)) {
      newErrors.weight = "Cân nặng phải từ 10 đến 500 kg.";
    }

    if (!height || isNaN(h) || h <= 0) {
      newErrors.height = "Vui lòng nhập chiều cao hợp lệ.";
    } else if (unit === "metric" && (h < 50 || h > 300)) {
      newErrors.height = "Chiều cao phải từ 50 đến 300 cm.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;

    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);

    if (unit === "imperial") {
      weightKg = weightKg * 0.453592;
      heightM = heightM * 0.0254;
    } else {
      heightM = heightM / 100;
    }

    const result = weightKg / (heightM * heightM);
    const rounded = Math.round(result * 10) / 10;
    setBmi(rounded);
    setCategory(getBMICategory(rounded));
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setBmi(null);
    setCategory(null);
    setErrors({});
  };

  const getPointerPercent = (bmi: number) => {
    const min = 10;
    const max = 45;
    const clamped = Math.min(Math.max(bmi, min), max);
    return ((clamped - min) / (max - min)) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl mb-4">
            <span className="text-4xl">⚖️</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Tính Chỉ Số <span className="text-indigo-600">BMI</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Body Mass Index – Chỉ số khối cơ thể
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Unit Switcher */}
          <div className="flex bg-gray-100 p-1 m-6 rounded-xl">
            <button
              onClick={() => { setUnit("metric"); handleReset(); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                unit === "metric"
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Hệ Mét (kg / cm)
            </button>
            <button
              onClick={() => { setUnit("imperial"); handleReset(); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                unit === "imperial"
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Hệ Anh (lbs / in)
            </button>
          </div>

          <div className="px-6 pb-6 space-y-5">
            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giới tính
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setGender("male")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    gender === "male"
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">👨</span> Nam
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    gender === "female"
                      ? "border-pink-500 bg-pink-50 text-pink-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">👩</span> Nữ
                </button>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tuổi <span className="text-gray-400 font-normal">(tùy chọn)</span>
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Nhập tuổi của bạn..."
                min={1}
                max={120}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 transition"
              />
            </div>

            {/* Weight & Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cân nặng ({unit === "metric" ? "kg" : "lbs"})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); setErrors((p) => ({ ...p, weight: undefined })); }}
                  placeholder={unit === "metric" ? "VD: 65" : "VD: 143"}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 focus:outline-none transition ${
                    errors.weight ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-indigo-400"
                  }`}
                />
                {errors.weight && (
                  <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chiều cao ({unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => { setHeight(e.target.value); setErrors((p) => ({ ...p, height: undefined })); }}
                  placeholder={unit === "metric" ? "VD: 170" : "VD: 67"}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 focus:outline-none transition ${
                    errors.height ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-indigo-400"
                  }`}
                />
                {errors.height && (
                  <p className="text-red-500 text-xs mt-1">{errors.height}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-indigo-200 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-base"
              >
                🔍 Tính BMI
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                🔄 Reset
              </button>
            </div>

            {/* Result */}
            {bmi !== null && category !== null && (
              <div className={`mt-4 rounded-2xl border-2 ${category.border} ${category.bg} p-5`}>
                {/* BMI Number */}
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Chỉ số BMI của bạn</p>
                  <div className={`text-6xl font-black ${category.color}`}>{bmi}</div>
                  <div className={`inline-flex items-center gap-2 mt-2 px-4 py-1 rounded-full text-sm font-bold ${category.color} bg-white border ${category.border}`}>
                    <span>{category.emoji}</span>
                    <span>{category.label}</span>
                  </div>
                </div>

                {/* Gauge Bar */}
                <div className="mb-4">
                  <div className="relative h-4 rounded-full overflow-hidden flex">
                    <div className="flex-1 bg-blue-400" />
                    <div className="flex-1 bg-green-400" />
                    <div className="flex-1 bg-yellow-400" />
                    <div className="flex-1 bg-orange-400" />
                    <div className="flex-1 bg-red-400" />
                    <div className="flex-1 bg-red-700" />
                  </div>
                  <div className="relative h-4 -mt-4">
                    <div
                      className="absolute top-0 w-3 h-5 -mt-0.5 -translate-x-1/2 transition-all duration-700"
                      style={{ left: `${getPointerPercent(bmi)}%` }}
                    >
                      <div className="w-3 h-3 bg-white border-2 border-gray-800 rounded-full shadow" />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                    <span>10</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                    <span>40+</span>
                  </div>
                </div>

                {/* Advice */}
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-bold text-gray-800">💡 Lời khuyên: </span>
                    {category.advice}
                  </p>
                </div>

                {/* Ideal weight */}
                {height && (
                  <div className="mt-3 text-center text-xs text-gray-500">
                    📏 Cân nặng lý tưởng cho chiều cao này:{" "}
                    <span className="font-bold text-green-600">
                      {(18.5 * Math.pow(unit === "metric" ? parseFloat(height) / 100 : parseFloat(height) * 0.0254, 2)).toFixed(1)}
                      {" "}–{" "}
                      {(24.9 * Math.pow(unit === "metric" ? parseFloat(height) / 100 : parseFloat(height) * 0.0254, 2)).toFixed(1)}
                      {" "}{unit === "metric" ? "kg" : "lbs"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BMI Table */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wider">
            📊 Bảng Phân Loại BMI (WHO)
          </h2>
          <div className="space-y-2">
            {BMI_RANGES.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">
                  {item.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 pb-2">
          ⚕️ Kết quả chỉ mang tính tham khảo. Hãy tham khảo ý kiến bác sĩ để có đánh giá chính xác.
        </p>
      </div>
    </div>
  );
}
