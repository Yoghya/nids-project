import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Database, BarChart3, ShieldAlert, Cpu, Home } from 'lucide-react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TrainingPage from './pages/TrainingPage';
import MonitorPage from './pages/MonitorPage';
import FeatureAnalysisPage from './pages/FeatureAnalysisPage';
import OptimizationInsightsPage from './pages/OptimizationInsightsPage';

const SidebarLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-fuchsia-600/80 to-indigo-600/80 text-white font-bold shadow-[0_0_15px_rgba(192,38,211,0.5)] border border-fuchsia-400/50' 
          : 'hover:bg-white/10 text-indigo-200 hover:text-white hover:translate-x-1'
      }`}
    >
      <Icon size={20} className={isActive ? "text-white" : "text-cyan-400"} />
      {children}
    </Link>
  );
};

function AppContent() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-fuchsia-500/30 overflow-hidden relative">
      {/* Dynamic Global Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/30 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Sidebar - Glassmorphism */}
      <aside className="w-72 bg-slate-900/40 backdrop-blur-2xl border-r border-indigo-500/20 flex flex-col z-20 shadow-2xl">
        <div className="p-8 border-b border-indigo-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 z-0"></div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 flex items-center gap-3 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <ShieldAlert className="text-fuchsia-500" size={32} />
            NexusGuard
          </h1>
          <p className="text-xs font-semibold text-indigo-300 mt-2 uppercase tracking-widest relative z-10">Advanced Threat Intelligence</p>
        </div>
        
        <nav className="flex-1 p-5 space-y-3">
          <SidebarLink to="/" icon={Home}>Home</SidebarLink>
          <SidebarLink to="/dashboard" icon={BarChart3}>Dashboard</SidebarLink>
          <SidebarLink to="/training" icon={Activity}>Model Training</SidebarLink>
          <SidebarLink to="/monitor" icon={ShieldAlert}>Packet Monitor</SidebarLink>
          <SidebarLink to="/insights" icon={Activity}>Optimization Insights</SidebarLink>
          <SidebarLink to="/features" icon={Cpu}>Feature Analysis</SidebarLink>
        </nav>
        
        <div className="p-6 border-t border-indigo-500/20">
          <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></div>
             <div className="w-2 h-2 rounded-full bg-emerald-400 absolute mr-2"></div>
             <span className="text-xs font-bold text-emerald-300 tracking-wide ml-4">SYSTEM ONLINE</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-transparent z-10 relative scroll-smooth custom-scrollbar">
        <header className="bg-slate-900/30 backdrop-blur-md border-b border-indigo-500/10 px-10 py-5 sticky top-0 z-30 shadow-lg">
          <h2 className="text-xl font-bold text-indigo-100 flex items-center gap-3">
            <span className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full block"></span>
            Machine Learning-Based Intrusion Detection Platform
          </h2>
        </header>
        <div className="p-10 min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/monitor" element={<MonitorPage />} />
            <Route path="/insights" element={<OptimizationInsightsPage />} />
            <Route path="/features" element={<FeatureAnalysisPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
