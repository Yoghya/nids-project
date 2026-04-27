import React from 'react';
import { Shield, Cpu, Activity, Database, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 md:pb-10">
      {/* Hero Section */}
      <div className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-indigo-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[150%] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] left-[-10%] w-[80%] h-[150%] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 mb-6 drop-shadow-md">
              Network Intrusion Detection System
            </h1>
            <p className="text-lg text-indigo-200 mb-8 leading-relaxed font-medium">
              A state-of-the-art, machine learning-driven cybersecurity platform designed to protect cloud computing environments from malicious actors, real-time packet injections, and brute-force attacks.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/metrics')} className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)] border border-fuchsia-400/50 hover:scale-105 transition-all">
                View Performance Metrics
              </button>
              <button onClick={() => navigate('/monitor')} className="px-6 py-3 rounded-xl font-bold bg-slate-800/80 hover:bg-slate-700/80 text-cyan-400 border border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 transition-all flex items-center gap-2">
                <Network size={20} /> Start Live Sniffer
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center w-64 h-64 relative">
             <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
             <Shield size={120} className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)] relative z-10" />
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-indigo-500/20 shadow-lg hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 bg-cyan-500/10 rounded-2xl w-max mb-6 border border-cyan-500/20">
            <Database className="text-cyan-400" size={32} />
          </div>
          <h3 className="text-xl font-black text-white mb-3">XGBoost Feature Selection</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Raw network packets contain overwhelming amounts of data. We utilize XGBoost trees to calculate Gini impurity, slicing 41 raw features down to the 15 most critical mathematical indicators of an attack, boosting model speed and accuracy.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-indigo-500/20 shadow-lg hover:border-fuchsia-500/40 hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 bg-fuchsia-500/10 rounded-2xl w-max mb-6 border border-fuchsia-500/20">
            <Cpu className="text-fuchsia-400" size={32} />
          </div>
          <h3 className="text-xl font-black text-white mb-3">Deep Learning Array</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            The platform executes a parallel array of Artificial Neural Networks (ANN), Deep Neural Networks (DNN), and Recurrent Neural Networks (RNN) constructed entirely from scratch using pure NumPy to evaluate complex non-linear attack vectors.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-indigo-500/20 shadow-lg hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 bg-emerald-500/10 rounded-2xl w-max mb-6 border border-emerald-500/20">
            <Activity className="text-emerald-400" size={32} />
          </div>
          <h3 className="text-xl font-black text-white mb-3">Hybrid CSA-PSO Optimization</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our Multi-Class Support Vector Machine (SVM) achieves 99.9% accuracy by using a novel biological optimization layer. It combines the global exploration of Crow Search with the localized mathematical exploitation of Particle Swarms.
          </p>
        </div>

      </div>
    </div>
  );
}
