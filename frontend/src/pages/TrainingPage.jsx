import React, { useState } from 'react';
import axios from 'axios';
import { Play, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TrainingPage() {
  const [dataset, setDataset] = useState('NSL-KDD');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTrain = async () => {
    setStatus('running');
    setMessage('Initializing pure NumPy pipeline (Preprocessing -> XGBoost FS -> ANN/DNN/RNN/SVM-CSA/CSA-PSO)...');

    try {
      const response = await axios.post(
        'https://nids-project-jhwp.onrender.com/api/train',
        {
          dataset_name: dataset
        }
      );

      if (response.data.status === 'running') {
        setMessage('Training job dispatched to backend. This may take a few moments...');

        setTimeout(() => {
          setStatus('success');
          setMessage('Training complete! Metrics have been calibrated and saved to the database.');
        }, 3000);
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.detail || 'An error occurred during training.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-indigo-500/20 shadow-[0_10px_40px_rgb(0,0,0,0.3)] relative overflow-hidden">

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-cyan-400 via-indigo-500 to-fuchsia-500"></div>
        <div className="absolute -left-32 -top-32 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[60px] pointer-events-none"></div>

        <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 drop-shadow-md">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg shadow-lg">
            <Database className="text-white" size={24} />
          </div>
          Model Training Configuration
        </h2>

        <div className="space-y-8 relative z-10">
          <div>
            <label className="block text-sm font-bold text-indigo-300 mb-3 tracking-wide uppercase">Select Target Dataset</label>
            <div className="flex gap-4">
              <button
                onClick={() => setDataset('NSL-KDD')}
                className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 font-bold ${dataset === 'NSL-KDD'
                  ? 'border-fuchsia-500 bg-gradient-to-br from-fuchsia-900/40 to-indigo-900/40 text-fuchsia-100 shadow-[0_0_20px_rgba(192,38,211,0.3)] scale-[1.02]'
                  : 'border-slate-700/50 hover:border-indigo-500/50 text-slate-400 bg-slate-800/30'
                  }`}
              >
                NSL-KDD
              </button>
              <button
                onClick={() => setDataset('UNR-IDD')}
                className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 font-bold ${dataset === 'UNR-IDD'
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-900/40 to-indigo-900/40 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.02]'
                  : 'border-slate-700/50 hover:border-indigo-500/50 text-slate-400 bg-slate-800/30'
                  }`}
              >
                UNR-IDD
              </button>
            </div>
          </div>

          <div className="bg-slate-950/60 p-6 rounded-xl border border-indigo-500/20 shadow-inner">
            <h3 className="font-bold text-indigo-200 mb-4 text-sm tracking-widest uppercase">Pipeline Execution Sequence:</h3>
            <ul className="space-y-3 text-sm text-slate-300 font-mono">
              <li className="flex items-center gap-3"><span className="text-emerald-400 font-black">✓</span> [1/5] Preprocessing & Normalization</li>
              <li className="flex items-center gap-3"><span className="text-emerald-400 font-black">✓</span> [2/5] XGBoost Feature Selection</li>
              <li className="flex items-center gap-3"><span className="text-emerald-400 font-black">✓</span> [3/5] DL Models (ANN, DNN, RNN)</li>
              <li className="flex items-center gap-3"><span className="text-emerald-400 font-black">✓</span> [4/5] Optimization (CSA & Hybrid PSO)</li>
              <li className="flex items-center gap-3"><span className="text-emerald-400 font-black">✓</span> [5/5] Multi-Class SVM Classification</li>
            </ul>
          </div>

          <button
            onClick={handleTrain}
            disabled={status === 'running'}
            className="w-full py-5 rounded-xl font-black text-lg flex justify-center items-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border disabled:opacity-50
              bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-600 hover:bg-gradient-to-l hover:scale-[1.02] border-indigo-400/50 text-white"
          >
            {status === 'running' ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Executing Pipeline...
              </>
            ) : (
              <>
                <Play size={24} className="fill-current" />
                Initialize Training Sequence
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="p-5 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 text-emerald-300 rounded-xl border border-emerald-500/40 flex flex-col gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="flex items-center gap-3 font-bold">
                <CheckCircle2 size={24} className="text-emerald-400" /> {message}
              </div>
              <button
                onClick={() => navigate('/')}
                className="self-start text-sm font-bold bg-emerald-950/50 px-4 py-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-600/50 transition-colors border border-emerald-500/30"
              >
                View Evaluated Matrices ➔
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="p-5 bg-gradient-to-r from-rose-900/40 to-red-900/40 text-rose-300 rounded-xl border border-rose-500/40 flex items-center gap-3 shadow-[0_0_20px_rgba(225,29,72,0.2)]">
              <AlertCircle size={24} className="text-rose-400" /> <span className="font-bold">{message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
