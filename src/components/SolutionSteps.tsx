import { useState } from 'react';

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

interface Props {
  solution: Solution;
  formatNumber: (num: number) => string;
}

export default function SolutionSteps({ solution, formatNumber }: Props) {
  const [activeMethod, setActiveMethod] = useState<'delta' | 'complete' | 'vieta' | 'graph'>('delta');

  const { a, b, c, discriminant, x1, x2, vertex } = solution;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-300">
      <h3 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center gap-2">
        <span className="text-3xl">📚</span>
        Các Phương Pháp Giải
      </h3>

      {/* Method Selector - Doraemon Tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button
          onClick={() => setActiveMethod('delta')}
          className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            activeMethod === 'delta'
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <div className="text-2xl mb-1">🔷</div>
          Công thức Delta
        </button>
        <button
          onClick={() => setActiveMethod('complete')}
          className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            activeMethod === 'complete'
              ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          <div className="text-2xl mb-1">🟣</div>
          Hoàn Thành Bình Phương
        </button>
        <button
          onClick={() => setActiveMethod('vieta')}
          className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            activeMethod === 'vieta'
              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          <div className="text-2xl mb-1">🟢</div>
          Định lý Viète
        </button>
        <button
          onClick={() => setActiveMethod('graph')}
          className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            activeMethod === 'graph'
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          <div className="text-2xl mb-1">📊</div>
          Phương Pháp Đồ Thị
        </button>
      </div>

      {/* Method Content */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200">
        {activeMethod === 'delta' && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-blue-700 flex items-center gap-2">
              <span>🔷</span> Phương pháp Delta (Δ)
            </h4>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <p className="font-semibold text-blue-700 mb-2">Bước 1: Tính Delta</p>
                <p className="font-mono bg-blue-50 p-3 rounded">
                  Δ = b² - 4ac = ({b})² - 4×({a})×({c})
                </p>
                <p className="font-mono bg-blue-50 p-3 rounded mt-2">
                  Δ = {b * b} - {4 * a * c} = {formatNumber(discriminant)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <p className="font-semibold text-blue-700 mb-2">Bước 2: Xét dấu Delta</p>
                {discriminant > 0 ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-semibold">
                      ✅ Δ = {formatNumber(discriminant)} &gt; 0 → Phương trình có 2 nghiệm phân biệt
                    </p>
                  </div>
                ) : discriminant === 0 ? (
                  <div className="space-y-2">
                    <p className="text-blue-600 font-semibold">
                      ✅ Δ = 0 → Phương trình có nghiệm kép
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-orange-600 font-semibold">
                      ⚠️ Δ = {formatNumber(discriminant)} &lt; 0 → Phương trình vô nghiệm
                    </p>
                  </div>
                )}
              </div>

              {solution.hasRealRoots && (
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-700 mb-2">Bước 3: Tính nghiệm</p>
                  {discriminant === 0 ? (
                    <div className="space-y-2">
                      <p className="font-mono bg-blue-50 p-3 rounded">
                        x = -b/(2a) = -({b})/(2×{a}) = {formatNumber(x1!)}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-mono bg-blue-50 p-3 rounded">
                        x₁ = (-b + √Δ)/(2a) = (-({b}) + √{formatNumber(discriminant)})/(2×{a})
                      </p>
                      <p className="font-mono bg-green-100 p-3 rounded font-bold">
                        x₁ = {formatNumber(x1!)}
                      </p>
                      <p className="font-mono bg-blue-50 p-3 rounded mt-3">
                        x₂ = (-b - √Δ)/(2a) = (-({b}) - √{formatNumber(discriminant)})/(2×{a})
                      </p>
                      <p className="font-mono bg-green-100 p-3 rounded font-bold">
                        x₂ = {formatNumber(x2!)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeMethod === 'complete' && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-purple-700 flex items-center gap-2">
              <span>🟣</span> Phương pháp Hoàn Thành Bình Phương
            </h4>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-purple-700 mb-2">Bước 1: Chia cả hai vế cho a</p>
                <p className="font-mono bg-purple-50 p-3 rounded">
                  x² + ({formatNumber(b/a)})x + ({formatNumber(c/a)}) = 0
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-purple-700 mb-2">Bước 2: Chuyển c/a sang vế phải</p>
                <p className="font-mono bg-purple-50 p-3 rounded">
                  x² + ({formatNumber(b/a)})x = {formatNumber(-c/a)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-purple-700 mb-2">Bước 3: Thêm (b/2a)² vào cả 2 vế</p>
                <p className="font-mono bg-purple-50 p-3 rounded">
                  x² + ({formatNumber(b/a)})x + ({formatNumber((b/(2*a))**2)}) = {formatNumber(-c/a + (b/(2*a))**2)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-purple-700 mb-2">Bước 4: Viết thành bình phương</p>
                <p className="font-mono bg-purple-50 p-3 rounded">
                  (x + {formatNumber(b/(2*a))})² = {formatNumber(discriminant/(4*a*a))}
                </p>
              </div>

              {solution.hasRealRoots ? (
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="font-semibold text-purple-700 mb-2">Bước 5: Giải phương trình</p>
                  <div className="space-y-2">
                    <p className="font-mono bg-purple-50 p-3 rounded">
                      x + {formatNumber(b/(2*a))} = ±√{formatNumber(discriminant/(4*a*a))}
                    </p>
                    <p className="font-mono bg-purple-50 p-3 rounded">
                      x + {formatNumber(b/(2*a))} = ±{formatNumber(Math.sqrt(discriminant/(4*a*a)))}
                    </p>
                    <p className="font-mono bg-green-100 p-3 rounded font-bold">
                      x₁ = {formatNumber(x1!)} hoặc x₂ = {formatNumber(x2!)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-orange-600 font-semibold">
                    Vế phải &lt; 0, nên phương trình vô nghiệm thực
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeMethod === 'vieta' && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-green-700 flex items-center gap-2">
              <span>🟢</span> Định lý Viète
            </h4>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <p className="font-semibold text-green-700 mb-2">Định lý Viète</p>
                <p className="mb-2">Nếu x₁, x₂ là hai nghiệm của phương trình ax² + bx + c = 0, thì:</p>
                <div className="font-mono bg-green-50 p-3 rounded space-y-1">
                  <p>• Tổng hai nghiệm: x₁ + x₂ = -b/a</p>
                  <p>• Tích hai nghiệm: x₁ × x₂ = c/a</p>
                </div>
              </div>

              {solution.hasRealRoots ? (
                <>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <p className="font-semibold text-green-700 mb-2">Áp dụng</p>
                    <div className="space-y-2">
                      <p className="font-mono bg-green-50 p-3 rounded">
                        x₁ + x₂ = -({b})/({a}) = {formatNumber(-b/a)}
                      </p>
                      <p className="font-mono bg-green-50 p-3 rounded">
                        x₁ × x₂ = ({c})/({a}) = {formatNumber(c/a)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <p className="font-semibold text-green-700 mb-2">Kiểm tra với nghiệm đã tìm</p>
                    <div className="space-y-2">
                      <p className="font-mono bg-green-50 p-3 rounded">
                        {formatNumber(x1!)} + {formatNumber(x2!)} = {formatNumber(x1! + x2!)} ✓
                      </p>
                      <p className="font-mono bg-green-50 p-3 rounded">
                        {formatNumber(x1!)} × {formatNumber(x2!)} = {formatNumber(x1! * x2!)} ✓
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Mẹo:</strong> Định lý Viète giúp kiểm tra nhanh kết quả và tìm nghiệm thứ 2 khi đã biết nghiệm thứ nhất!
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                  <p className="text-orange-700">
                    Phương trình vô nghiệm nên không áp dụng được định lý Viète
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeMethod === 'graph' && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-red-700 flex items-center gap-2">
              <span>📊</span> Phương pháp Đồ Thị
            </h4>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                <p className="font-semibold text-red-700 mb-2">Dạng đồ thị Parabol</p>
                <p className="mb-2">
                  Phương trình y = {a}x² + {b}x + {c} có đồ thị là một Parabol
                </p>
                <div className="font-mono bg-red-50 p-3 rounded">
                  <p>• Hướng: {a > 0 ? '🔺 Hướng lên (a > 0)' : '🔻 Hướng xuống (a < 0)'}</p>
                  <p>• Trục đối xứng: x = {formatNumber(vertex!.x)}</p>
                  <p>• Đỉnh: ({formatNumber(vertex!.x)}, {formatNumber(vertex!.y)})</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                <p className="font-semibold text-red-700 mb-2">Nghiệm và giao điểm</p>
                <p className="mb-2">Nghiệm của phương trình chính là giao điểm của Parabol với trục Ox (y = 0)</p>
                {solution.hasRealRoots ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-semibold">
                      ✅ Parabol cắt trục Ox tại {x1 === x2 ? '1 điểm (tiếp xúc)' : '2 điểm'}
                    </p>
                    {x1 === x2 ? (
                      <p className="font-mono bg-red-50 p-3 rounded">
                        Điểm: ({formatNumber(x1!)}, 0)
                      </p>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-mono bg-red-50 p-3 rounded">
                          Điểm 1: ({formatNumber(x1!)}, 0)
                        </p>
                        <p className="font-mono bg-red-50 p-3 rounded">
                          Điểm 2: ({formatNumber(x2!)}, 0)
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-orange-600 font-semibold">
                    ⚠️ Parabol không cắt trục Ox (nằm hoàn toàn {a > 0 ? 'phía trên' : 'phía dưới'} trục Ox)
                  </p>
                )}
              </div>

              {/* Simple Graph Visualization */}
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                <p className="font-semibold text-red-700 mb-3">Minh họa đồ thị Parabol</p>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 relative" style={{ height: '350px' }}>
                  <svg width="100%" height="100%" viewBox="-10 -10 20 20" className="overflow-visible" preserveAspectRatio="xMidYMid meet">
                    {/* Grid */}
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="#444" strokeWidth="0.05" />
                    <line x1="0" y1="-10" x2="0" y2="10" stroke="#444" strokeWidth="0.05" />
                    
                    {/* Grid lines */}
                    {[-8, -6, -4, -2, 2, 4, 6, 8].map(i => (
                      <g key={i}>
                        <line x1={i} y1="-10" x2={i} y2="10" stroke="#333" strokeWidth="0.02" />
                        <line x1="-10" y1={i} x2="10" y2={i} stroke="#333" strokeWidth="0.02" />
                      </g>
                    ))}

                    {/* Parabola */}
                    <path
                      d={(() => {
                        let path = '';
                        const points = [];
                        for (let x = -10; x <= 10; x += 0.1) {
                          const y = a * x * x + b * x + c;
                          // Scale for better visualization
                          const scaleFactor = Math.max(1, Math.abs(a) * 2);
                          const scaledY = -y / scaleFactor; // Invert Y for SVG coordinate
                          if (scaledY >= -10 && scaledY <= 10) {
                            points.push(`${x},${scaledY}`);
                          }
                        }
                        if (points.length > 0) {
                          path = 'M ' + points.join(' L ');
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="url(#parabolaGradient)"
                      strokeWidth="0.2"
                      filter="url(#glow)"
                    />

                    {/* Gradient and glow effect definitions */}
                    <defs>
                      <linearGradient id="parabolaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="0.1" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Vertex */}
                    {vertex && (
                      <>
                        <circle
                          cx={vertex.x}
                          cy={-vertex.y / Math.max(1, Math.abs(a) * 2)}
                          r="0.35"
                          fill="#ef4444"
                          stroke="#dc2626"
                          strokeWidth="0.1"
                        />
                        <circle
                          cx={vertex.x}
                          cy={-vertex.y / Math.max(1, Math.abs(a) * 2)}
                          r="0.5"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="0.05"
                          opacity="0.3"
                        />
                      </>
                    )}

                    {/* Roots */}
                    {solution.hasRealRoots && (
                      <>
                        <circle cx={x1!} cy="0" r="0.35" fill="#10b981" stroke="#059669" strokeWidth="0.1" />
                        <circle cx={x1!} cy="0" r="0.5" fill="none" stroke="#10b981" strokeWidth="0.05" opacity="0.3" />
                        <circle cx={x2!} cy="0" r="0.35" fill="#10b981" stroke="#059669" strokeWidth="0.1" />
                        <circle cx={x2!} cy="0" r="0.5" fill="none" stroke="#10b981" strokeWidth="0.05" opacity="0.3" />
                      </>
                    )}
                  </svg>
                  
                  <div className="absolute top-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-blue-500"></div>
                      <span>Parabol</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Đỉnh</span>
                    </div>
                    {solution.hasRealRoots && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Nghiệm</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>💡 Ghi nhớ:</strong> Số nghiệm = Số giao điểm với trục Ox. Đỉnh Parabol nằm trên trục đối xứng x = -b/(2a)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
