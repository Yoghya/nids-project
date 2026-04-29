import React from 'react';
import { Shield, Cpu, Activity, Database, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="card card-hoverable">
        <div className="bg-glow-fuchsia"></div>
        <div className="bg-glow-cyan"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="title-primary">
              Network Intrusion Detection System
            </h1>
            <p className="text-lg text-indigo-200 mb-8 leading-relaxed font-medium">
              A state-of-the-art, machine learning-driven cybersecurity platform designed to protect cloud computing environments from malicious actors, real-time packet injections, and brute-force attacks.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/metrics')} className="btn-primary">
                View Performance Metrics
              </button>
              <button onClick={() => navigate('/monitor')} className="btn-secondary">
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

        <div className="card-sm card-hoverable">
          <div className="p-4 bg-cyan-500/10 rounded-2xl w-max mb-6 border border-cyan-500/20">
            <Database className="text-cyan-400" size={32} />
          </div>
          <h3 className="text-xl font-black text-white mb-3">XGBoost Feature Selection</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Raw network packets contain overwhelming amounts of data. We utilize XGBoost trees to calculate Gini impurity, slicing 41 raw features down to the 15 most critical mathematical indicators of an attack, boosting model speed and accuracy.
          </p>
        </div>

        <div className="card-sm card-hoverable">
          <div className="p-4 bg-fuchsia-500/10 rounded-2xl w-max mb-6 border border-fuchsia-500/20">
            <Cpu className="text-fuchsia-400" size={32} />
          </div>
          <h3 className="text-xl font-black text-white mb-3">Deep Learning Array</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            The platform executes a parallel array of Artificial Neural Networks (ANN), Deep Neural Networks (DNN), and Recurrent Neural Networks (RNN) constructed entirely from scratch using pure NumPy to evaluate complex non-linear attack vectors.
          </p>
        </div>

        <div className="card-sm card-hoverable">
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
