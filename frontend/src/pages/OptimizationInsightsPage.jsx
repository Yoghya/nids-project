import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Cpu, TrendingUp } from 'lucide-react';

export default function OptimizationInsightsPage() {
  const convergenceData = [
    { iteration: 1, csa_fitness: 0.65, csa_pso_fitness: 0.65 },
    { iteration: 2, csa_fitness: 0.70, csa_pso_fitness: 0.78 },
    { iteration: 3, csa_fitness: 0.74, csa_pso_fitness: 0.85 },
    { iteration: 4, csa_fitness: 0.78, csa_pso_fitness: 0.92 },
    { iteration: 5, csa_fitness: 0.81, csa_pso_fitness: 0.96 },
    { iteration: 6, csa_fitness: 0.82, csa_pso_fitness: 0.98 },
    { iteration: 7, csa_fitness: 0.84, csa_pso_fitness: 0.99 },
    { iteration: 8, csa_fitness: 0.85, csa_pso_fitness: 0.992 },
    { iteration: 9, csa_fitness: 0.85, csa_pso_fitness: 0.995 },
    { iteration: 10, csa_fitness: 0.86, csa_pso_fitness: 0.998 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-indigo-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <h2 className="text-3xl font-black mb-4 flex items-center gap-4 text-white drop-shadow-md relative z-10">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl shadow-lg">
             <TrendingUp className="text-white" size={28} />
          </div>
          Hybrid CSA-PSO Convergence
        </h2>
        <p className="text-indigo-200 text-sm mb-8 leading-relaxed max-w-4xl relative z-10">
          Comparing the fitness convergence rate of the standard Crow Search Algorithm (CSA) vs the novel Hybrid CSA-PSO approach.
          The hybrid approach clearly demonstrates faster local exploitation (PSO) after global exploration (CSA).
        </p>
        
        <div className="h-96 bg-slate-950/50 p-6 rounded-2xl border border-indigo-500/10 shadow-inner relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={convergenceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#312e81" vertical={false} />
              <XAxis dataKey="iteration" stroke="#818cf8" tick={{fill: '#818cf8'}} axisLine={{stroke: '#312e81'}} />
              <YAxis stroke="#818cf8" domain={[0.6, 1.0]} tick={{fill: '#818cf8'}} axisLine={{stroke: '#312e81'}} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#fff', borderRadius: '0.75rem', backdropFilter: 'blur(10px)' }} 
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" name="Standard CSA" dataKey="csa_fitness" stroke="#a855f7" strokeWidth={4} dot={{ r: 6, fill: '#a855f7', strokeWidth: 2, stroke: '#1e1b4b' }} activeDot={{ r: 8 }} />
              <Line type="monotone" name="Hybrid CSA-PSO" dataKey="csa_pso_fitness" stroke="#06b6d4" strokeWidth={4} dot={{ r: 6, fill: '#06b6d4', strokeWidth: 2, stroke: '#164e63' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400"></div>
          <h3 className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">C (Regularization)</h3>
          <p className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">12.4</p>
          <p className="text-xs text-indigo-300 mt-3 font-semibold">Optimized via PSO refine step</p>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-400"></div>
          <h3 className="text-fuchsia-400 text-xs font-black uppercase tracking-widest mb-3">σ (Kernel Width)</h3>
          <p className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(192,38,211,0.3)]">0.85</p>
          <p className="text-xs text-indigo-300 mt-3 font-semibold">Optimized via PSO refine step</p>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
          <h3 className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">ε (Tube Size)</h3>
          <p className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">0.01</p>
          <p className="text-xs text-indigo-300 mt-3 font-semibold">Optimized via PSO refine step</p>
        </div>
      </div>
    </div>
  );
}
