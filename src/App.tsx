import QuadraticSolver from './components/QuadraticSolver';
import DoraemonCharacter from './components/DoraemonCharacter';
import MathFacts from './components/MathFacts';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-8 px-4 relative overflow-hidden">
      {/* Doraemon Theme Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-xl mb-4 border-4 border-white relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 rounded-full border-2 border-white"></div>
            <div className="text-white text-5xl">🔧</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 drop-shadow-md">
            Túi Đồ Thần Kỳ Doraemon
          </h1>
          <p className="text-xl text-blue-500 font-medium">Giải Phương Trình Bậc Hai</p>
          <p className="text-sm text-gray-600 mt-2">🎯 Dụng cụ thần kỳ giúp giải toán nhanh chóng!</p>
        </div>
      </div>

      <QuadraticSolver />

      {/* Math Facts */}
      <MathFacts />

      {/* Doraemon Character */}
      <DoraemonCharacter />

      {/* Decorative Elements */}
      <div className="fixed top-4 right-4 text-6xl opacity-20 pointer-events-none animate-pulse">
        🎋
      </div>
      <div className="fixed bottom-4 left-4 text-6xl opacity-20 pointer-events-none animate-pulse">
        🍡
      </div>
      
      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-8 text-center">
        <div className="bg-white bg-opacity-70 rounded-2xl p-6 shadow-lg border-2 border-blue-200">
          <p className="text-sm text-gray-600 mb-2">
            💡 <strong>Mẹo học tập:</strong> Phương trình bậc hai là nền tảng quan trọng trong toán học!
          </p>
          <p className="text-xs text-gray-500">
            Hãy thử các phương pháp giải khác nhau để hiểu sâu hơn về bản chất của phương trình 📐
          </p>
        </div>
      </div>
    </div>
  );
}
