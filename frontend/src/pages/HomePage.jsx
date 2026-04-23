import React from 'react';
import { Shield, Zap, Target, Eye, ShieldAlert, ShieldCheck, Database, Cpu, Network, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, color, delay }) => (
  <div 
    className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-6 shadow-2xl hover:bg-slate-800/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] group"
    style={{ animation: `fade-in-up 0.8s ease-out ${delay}s both` }}
  >
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${color}`}>
      <Icon size={28} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
    <p className="text-indigo-200/80 leading-relaxed font-light">{description}</p>
  </div>
);

const AttackCard = ({ title, type, description, icon: Icon, gradient }) => (
  <div className="relative group overflow-hidden rounded-2xl border border-white/5 transition-all duration-500 hover:scale-[1.02]">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
    <div className="relative z-10 p-8 h-full bg-slate-900/80 backdrop-blur-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-2xl font-bold text-white mb-1">{title}</h4>
          <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-md border border-white/5">{type}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-lg group-hover:animate-pulse">
          <Icon size={24} className="text-white/80 group-hover:text-white transition-colors" />
        </div>
      </div>
      <p className="text-slate-300 font-light leading-relaxed">{description}</p>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden border border-indigo-500/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-purple-900/50 to-slate-950 z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 px-10 py-24 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Next-Gen Threat Detection Active
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-400 tracking-tight mb-8 drop-shadow-sm leading-tight">
            Secure Your Network with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">NexusGuard</span>
          </h1>
          
          <p className="text-lg md:text-xl text-indigo-200/90 font-light max-w-2xl leading-relaxed mb-12">
            An advanced Machine Learning Intrusion Detection System engineered to identify, analyze, and neutralize network anomalies in real-time before they compromise your infrastructure.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
              <Eye size={20} />
              View Dashboard
            </Link>
            <Link to="/monitor" className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 text-white font-bold tracking-wide hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
              <Activity size={20} />
              Live Monitor
            </Link>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Intelligent Core Capabilities</h2>
          <p className="text-indigo-300 font-light max-w-2xl mx-auto">Powered by state-of-the-art hybrid machine learning algorithms to ensure maximum detection rates with minimal false positives.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Cpu} 
            title="Hybrid ML Engine" 
            description="Utilizes an ensemble of advanced algorithms including SVM, XGBoost, and Deep Neural Networks to cross-verify threats with high confidence."
            color="bg-gradient-to-br from-fuchsia-500 to-purple-600"
            delay={0.1}
          />
          <FeatureCard 
            icon={Zap} 
            title="Automated Optimization" 
            description="Employs Crow Search Algorithm (CSA) and Particle Swarm Optimization (PSO) to autonomously tune hyper-parameters for peak performance."
            color="bg-gradient-to-br from-cyan-500 to-blue-600"
            delay={0.2}
          />
          <FeatureCard 
            icon={Network} 
            title="Real-time Analytics" 
            description="Ingests and analyzes continuous streams of network packets, extracting vital features and classifying traffic with sub-millisecond latency."
            color="bg-gradient-to-br from-emerald-400 to-teal-600"
            delay={0.3}
          />
        </div>
      </section>

      {/* Threat Landscape */}
      <section className="relative px-4 py-16 rounded-3xl bg-slate-900/30 border border-indigo-500/10 mt-16 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="text-center mb-16 relative z-10">
          <span className="text-fuchsia-400 font-bold tracking-widest uppercase text-sm mb-2 block">Comprehensive Coverage</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Threat Categories Detected</h2>
          <p className="text-slate-400 max-w-3xl mx-auto font-light text-lg">
            NexusGuard categorizes anomalous network traffic into four primary attack classes, providing granular visibility into the nature of threats attempting to breach your network perimeter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <AttackCard 
            title="Denial of Service" 
            type="DoS"
            description="Detects attempts to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services. Examples include SYN floods, Smurf, and Teardrop attacks."
            icon={ShieldAlert}
            gradient="from-red-500 to-orange-600"
          />
          <AttackCard 
            title="Probe" 
            type="Surveillance"
            description="Identifies surveillance and probing activities designed to gather information about a network's topology, open ports, and vulnerabilities before launching a targeted attack. Examples include Portsweeps and IPsweeps."
            icon={Target}
            gradient="from-blue-500 to-indigo-600"
          />
          <AttackCard 
            title="Remote to Local" 
            type="R2L"
            description="Flags unauthorized access attempts from a remote machine to a local machine, bypassing authentication mechanisms to exploit vulnerabilities. Examples include Password guessing and FTP exploits."
            icon={ShieldCheck}
            gradient="from-amber-400 to-yellow-600"
          />
          <AttackCard 
            title="User to Root" 
            type="U2R"
            description="Monitors for privilege escalation attacks where a local user on a system attempts to illicitly gain root or administrative privileges to compromise the host entirely. Examples include Buffer overflows and Rootkits."
            icon={Database}
            gradient="from-fuchsia-500 to-purple-600"
          />
        </div>
      </section>

    </div>
  );
};

export default HomePage;
