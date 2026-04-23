import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Cpu, Zap } from 'lucide-react';

export default function FeatureAnalysisPage() {
  const csaOptimizationData = [
    { target: "C (Regularization)", value: 87.4 },
    { target: "Sigma (Kernel width)", value: 4.2 },
    { target: "Epsilon (Tube size)", value: 0.12 },
  ];

  const selectedFeatures = [
    2, 3, 4, 5, 6, 8, 14, 23, 26, 29, 30, 35, 36, 37, 38
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-indigo-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        <h2 className="text-3xl font-black mb-4 flex items-center gap-4 text-white drop-shadow-md relative z-10">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-lg">
             <Zap className="text-white" size={28} />
          </div>
          XGBoost Feature Selection
        </h2>
        <p className="text-indigo-200 text-sm mb-8 max-w-3xl relative z-10">
          Features extracted and selected using Gini impurity reduction from the raw 41-feature space. 
          This heavily optimizes the downstream deep learning and SVM classifiers.
        </p>
        
        <div className="flex flex-wrap gap-4 relative z-10">
          {selectedFeatures.map(feat => (
            <span key={feat} className="px-5 py-3 bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30 text-cyan-300 rounded-xl text-sm font-bold shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-105 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 cursor-default flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></span>
              Feature #{feat}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-indigo-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none"></div>
         <h2 className="text-3xl font-black mb-4 flex items-center gap-4 text-white drop-shadow-md relative z-10">
            <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-xl shadow-lg">
               <Cpu className="text-white" size={28} />
            </div>
            Algorithm Parameter Bounds
         </h2>
         <p className="text-indigo-200 text-sm mb-8 max-w-3xl relative z-10">
           Visualization of RBF-SVM parameter bounds iteratively optimized using flocking memory mechanisms and particle swarms.
         </p>
         
         <div className="h-72 bg-slate-950/50 p-6 rounded-2xl border border-indigo-500/10 shadow-inner relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={csaOptimizationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#312e81" horizontal={false} />
              <XAxis type="number" stroke="#818cf8" tick={{fill: '#818cf8'}} axisLine={{stroke: '#312e81'}} />
              <YAxis dataKey="target" type="category" stroke="#818cf8" width={180} tick={{fill: '#818cf8', fontWeight: 'bold'}} axisLine={{stroke: '#312e81'}} />
              <RechartsTooltip cursor={{fill: '#1e1b4b'}} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#fff', borderRadius: '0.75rem', backdropFilter: 'blur(10px)' }} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                {csaOptimizationData.map((entry, index) => (
                  <cell key={`cell-${index}`} fill={index === 0 ? '#06b6d4' : index === 1 ? '#a855f7' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}
