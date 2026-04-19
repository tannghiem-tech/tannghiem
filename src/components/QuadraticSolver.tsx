import { useState } from 'react';
import SolutionSteps from './SolutionSteps';

interface Solution {
  hasRealRoots: boolean;
  x1?: number;
  x2?: number;
  discriminant: number;
  vertex?: { x: number; y: number };
  a: number;
  b: number;
  c: number;
}

export default function QuadraticSolver() {
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('0');
  const [c, setC] = useState<string>('0');
  const [solution, setSolution] = useState<Solution | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const solveEquation = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      alert('Vui lòng nhập số hợp lệ!');
      return;
    }

    if (numA === 0) {
      alert('Hệ số a phải khác 0 để là phương trình bậc hai!');
      return;
    }

    // Simulate calculation delay for better UX
    setIsCalculating(true);
    setTimeout(() => {
      calculateSolution(numA, numB, numC);
      setIsCalculating(false);
    }, 300);
  };

  const calculateSolution = (numA: number, numB: number, numC: number) => {

    const discriminant = numB * numB - 4 * numA * numC;
    const vertex = {
      x: -numB / (2 * numA),
      y: -discriminant / (4 * numA)
    };

    if (discriminant < 0) {
      setSolution({
        hasRealRoots: false,
        discriminant,
        vertex,
        a: numA,
        b: numB,
        c: numC
      });
    } else if (discriminant === 0) {
      const x = -numB / (2 * numA);
      setSolution({
        hasRealRoots: true,
        x1: x,
        x2: x,
        discriminant,
        vertex,
        a: numA,
        b: numB,
        c: numC
      });
    } else {
      const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
      setSolution({
        hasRealRoots: true,
        x1,
        x2,
        discriminant,
        vertex,
        a: numA,
        b: numB,
        c: numC
      });
    }

    setShowSteps(true);
  };

  const reset = () => {
    setA('1');
    setB('0');
    setC('0');
    setSolution(null);
    setShowSteps(false);
  };

  const loadExample = (exA: string, exB: string, exC: string) => {
    setA(exA);
    setB(exB);
    setC(exC);
    setSolution(null);
    setShowSteps(false);
  };

  const formatNumber = (num: number): string => {
    return Math.abs(num - Math.round(num)) < 0.0001 
      ? Math.round(num).toString() 
      : num.toFixed(4);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Input Card - Doraemon Pocket Style */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 border-blue-300 relative overflow-hidden">
        {/* Decorative pocket opening */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-blue-500 rounded-b-full opacity-20"></div>
        
        <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <span className="text-3xl">📝</span>
          Nhập phương trình: ax² + bx + c = 0
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Coefficient A */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-2">
              Hệ số a
            </label>
            <div className="relative">
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-4 py-3 border-3 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg font-semibold text-gray-700 bg-blue-50"
                placeholder="a"
                step="any"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 font-bold">
                x²
              </div>
            </div>
          </div>

          {/* Coefficient B */}
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-2">
              Hệ số b
            </label>
            <div className="relative">
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full px-4 py-3 border-3 border-red-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none text-lg font-semibold text-gray-700 bg-red-50"
                placeholder="b"
                step="any"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 font-bold">
                x
              </div>
            </div>
          </div>

          {/* Coefficient C */}
          <div>
            <label className="block text-sm font-semibold text-yellow-600 mb-2">
              Hệ số c
            </label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="w-full px-4 py-3 border-3 border-yellow-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 outline-none text-lg font-semibold text-gray-700 bg-yellow-50"
              placeholder="c"
              step="any"
            />
          </div>
        </div>

        {/* Equation Display */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 mb-6 border-2 border-blue-200">
          <p className="text-center text-2xl font-bold text-gray-700">
            <span className="text-blue-600">{a || '0'}</span>x² + 
            <span className="text-red-600"> {b || '0'}</span>x + 
            <span className="text-yellow-600"> {c || '0'}</span> = 0
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={solveEquation}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
          >
            🎯 Giải Phương Trình
          </button>
          <button
            onClick={reset}
            className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🔄 Làm Mới
          </button>
        </div>

        {/* Quick Examples */}
        <div className="mt-6 pt-6 border-t-2 border-blue-200">
          <p className="text-sm font-semibold text-blue-700 mb-3">⚡ Ví dụ nhanh:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => loadExample('1', '-5', '6')}
              className="bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 text-sm font-semibold py-2 px-3 rounded-lg transition-all"
            >
              x²-5x+6=0
            </button>
            <button
              onClick={() => loadExample('1', '0', '-4')}
              className="bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 text-green-700 text-sm font-semibold py-2 px-3 rounded-lg transition-all"
            >
              x²-4=0
            </button>
            <button
              onClick={() => loadExample('1', '-4', '4')}
              className="bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 text-yellow-700 text-sm font-semibold py-2 px-3 rounded-lg transition-all"
            >
              x²-4x+4=0
            </button>
            <button
              onClick={() => loadExample('1', '2', '5')}
              className="bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 text-orange-700 text-sm font-semibold py-2 px-3 rounded-lg transition-all"
            >
              x²+2x+5=0
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {solution && showSteps && (
        <div className="space-y-6">
          {/* Quick Result Card */}
          <div className={`rounded-3xl shadow-2xl p-8 border-4 ${
            solution.hasRealRoots 
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' 
              : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300'
          }`}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">
                {solution.hasRealRoots ? '✅' : '⚠️'}
              </span>
              <span className={solution.hasRealRoots ? 'text-green-700' : 'text-orange-700'}>
                Kết Quả
              </span>
            </h3>
            
            {solution.hasRealRoots ? (
              <div className="space-y-3">
                {solution.x1 === solution.x2 ? (
                  <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                    <p className="text-lg text-gray-700">
                      Phương trình có <strong className="text-green-600">nghiệm kép</strong>:
                    </p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      x₁ = x₂ = {formatNumber(solution.x1!)}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      🎯 Parabol tiếp xúc trục hoành tại đỉnh
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                        <p className="text-gray-600 mb-1">Nghiệm thứ nhất:</p>
                        <p className="text-2xl font-bold text-green-600">
                          x₁ = {formatNumber(solution.x1!)}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                        <p className="text-gray-600 mb-1">Nghiệm thứ hai:</p>
                        <p className="text-2xl font-bold text-green-600">
                          x₂ = {formatNumber(solution.x2!)}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
                      <p className="text-sm text-blue-700">
                        📊 Khoảng cách giữa 2 nghiệm: {formatNumber(Math.abs(solution.x1! - solution.x2!))}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-4 border-2 border-orange-300">
                <p className="text-lg text-orange-700 font-semibold">
                  ⚠️ Phương trình vô nghiệm (không có nghiệm thực)
                </p>
                <p className="text-gray-600 mt-2">
                  Delta = {formatNumber(solution.discriminant)} &lt; 0
                </p>
              </div>
            )}
          </div>

          {/* Detailed Solutions */}
          <SolutionSteps solution={solution} formatNumber={formatNumber} />
        </div>
      )}
    </div>
  );
}
