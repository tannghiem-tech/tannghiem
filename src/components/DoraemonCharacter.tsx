export default function DoraemonCharacter() {
  return (
    <div className="fixed bottom-8 right-8 z-10 hidden lg:block">
      <div className="relative animate-bounce-slow">
        {/* Doraemon body */}
        <div className="relative w-32 h-40">
          {/* Head */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-500 rounded-full border-4 border-blue-600 shadow-xl">
            {/* Face */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-white rounded-full">
              {/* Eyes */}
              <div className="absolute top-2 left-2 w-6 h-8 bg-white rounded-full border-2 border-black overflow-hidden">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-2 right-2 w-6 h-8 bg-white rounded-full border-2 border-black overflow-hidden">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
              </div>
              
              {/* Nose */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 bg-red-500 rounded-full border-2 border-red-600"></div>
              
              {/* Whiskers */}
              <div className="absolute top-6 left-0 w-6 h-0.5 bg-black -translate-x-full"></div>
              <div className="absolute top-8 left-0 w-6 h-0.5 bg-black -translate-x-full"></div>
              <div className="absolute top-6 right-0 w-6 h-0.5 bg-black translate-x-full"></div>
              <div className="absolute top-8 right-0 w-6 h-0.5 bg-black translate-x-full"></div>
              
              {/* Mouth */}
              <svg className="absolute bottom-1 left-1/2 transform -translate-x-1/2" width="16" height="8" viewBox="0 0 16 8">
                <path d="M 0 0 Q 8 8 16 0" fill="none" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            
            {/* Bell */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-yellow-400 rounded-full border-2 border-yellow-500 shadow-md">
              <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1.5 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
          
          {/* Body */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-blue-500 rounded-b-3xl border-4 border-blue-600 border-t-0">
            {/* Pocket */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-white rounded-full border-2 border-gray-800">
              <div className="absolute top-0 left-0 right-0 h-3 bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Speech bubble */}
      <div className="absolute -top-16 -left-32 bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-blue-300 animate-pulse">
        <p className="text-sm font-semibold text-blue-600 whitespace-nowrap">Cùng giải toán nào! 🎯</p>
        <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r-2 border-b-2 border-blue-300"></div>
      </div>
    </div>
  );
}
