import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, CheckCircle, Wifi, WifiOff } from 'lucide-react';

export default function MonitorPage() {
  const [predictionLogs, setPredictionLogs] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [wsStatus, setWsStatus] = useState('disconnected'); // disconnected, connecting, connected
  const wsRef = useRef(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    setWsStatus('connecting');
    const ws = new WebSocket('ws://localhost:8000/ws/monitor');

    ws.onopen = () => {
      setWsStatus('connected');
      setIsScanning(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setPredictionLogs((prev) => {
          // Keep only the last 15 packets to prevent memory issues
          const newLogs = [data, ...prev].slice(0, 15);
          return newLogs;
        });
      } catch (err) {
        console.error("Error parsing websocket message", err);
      }
    };

    ws.onclose = () => {
      setWsStatus('disconnected');
      setIsScanning(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      ws.close();
    };

    wsRef.current = ws;
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
  };

  const toggleScanning = () => {
    if (isScanning) {
      disconnectWebSocket();
    } else {
      connectWebSocket();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="bg-slate-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-8 relative shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div>
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3 text-white drop-shadow-md">
              <Shield className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" size={32} /> 
              Real-time Node Monitor
            </h2>
            <p className="text-indigo-200 mb-6 max-w-3xl">
              Connects to the backend WebSocket (`/ws/monitor`) to stream real live packets captured via Scapy.
              Features are extracted and fed through the Multi-Class SVM-RBF classification tree.
              <strong className="text-fuchsia-300 ml-1 block mt-1">Note: The backend must be run with Administrator privileges to sniff network interfaces!</strong>
            </p>
          </div>
          <div className="mb-6 md:mb-0">
             <span className={`text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg ${
               wsStatus === 'connected' 
                ? 'bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 text-emerald-300 border border-emerald-500/50' 
                : 'bg-gradient-to-r from-red-600/30 to-rose-600/30 text-red-300 border border-red-500/50'
             }`}>
                <div className={`w-2.5 h-2.5 rounded-full ${wsStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`}></div>
                {wsStatus === 'connected' ? 'Connected' : wsStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
             </span>
          </div>
        </div>
        
        <button 
          onClick={toggleScanning}
          disabled={wsStatus === 'connecting'}
          className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg relative z-10 ${
            isScanning 
              ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] border border-rose-400/50 hover:scale-105'
              : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-cyan-400/50 hover:scale-105'
          }`}
        >
          {isScanning ? (
            <><WifiOff size={20} /> Terminate Packet Sniffer</>
          ) : (
            <><Wifi size={20} /> Initialize Live Capture</>
          )}
        </button>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
         <div className="flex justify-between items-center mb-6 border-b border-indigo-500/20 pb-4">
           <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                {isScanning && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-4 w-4 ${isScanning ? 'bg-cyan-500' : 'bg-slate-600'}`}></span>
              </span>
              Detection Audit Log
           </h2>
           <span className="text-xs text-indigo-300 font-mono bg-indigo-900/50 px-3 py-1 rounded-full border border-indigo-500/30">Total visible: {predictionLogs.length}</span>
         </div>
         
         <div className="space-y-4">
           {predictionLogs.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-16 text-indigo-300/50 border border-indigo-500/20 border-dashed rounded-xl bg-slate-900/20">
                <Wifi size={48} className="opacity-30 mb-4" />
                <p className="text-lg font-medium">No packets captured yet.</p>
                <p className="text-sm mt-1">Initialize the sniffer to begin.</p>
             </div>
           ) : (
             predictionLogs.map((log) => (
               <div key={log.id} className={`p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center border transition-all duration-300 hover:scale-[1.01] shadow-md ${
                 log.prediction !== 'Normal' 
                  ? 'bg-gradient-to-r from-rose-900/30 to-red-900/30 border-rose-500/40 shadow-[0_0_15px_rgba(225,29,72,0.15)]' 
                  : 'bg-slate-800/40 border-indigo-500/20 hover:border-indigo-500/40'
               }`}>
                 
                 <div className="flex gap-4 items-center w-full md:w-auto mb-4 md:mb-0">
                   {log.prediction !== 'Normal' ? (
                     <div className="p-2 bg-rose-500/20 rounded-lg">
                        <AlertTriangle className="text-rose-400 w-6 h-6 animate-pulse" />
                     </div>
                   ) : (
                     <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <CheckCircle className="text-emerald-400 w-6 h-6" />
                     </div>
                   )}
                   <div>
                     <p className="font-bold text-sm text-slate-200 font-mono tracking-tight">
                        <span className="text-indigo-400">{log.id}</span> | {log.src_ip} <span className="text-cyan-500">➔</span> {log.dst_ip}
                     </p>
                     <p className="text-xs text-slate-400 mt-1.5">{log.time} <span className="mx-2 text-indigo-500/50">•</span> Packet Size: <span className="text-cyan-300">{log.length} bytes</span></p>
                   </div>
                 </div>

                 <div className="flex flex-col md:items-end w-full md:w-auto pl-14 md:pl-0">
                   <div className="flex items-center gap-3">
                     <span className={`text-xs font-bold px-3 py-1.5 rounded-lg shadow-inner ${
                       log.prediction !== 'Normal' 
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30' 
                        : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                     }`}>
                       Confidence: {log.confidence}%
                     </span>
                     <span className={`text-lg font-black uppercase tracking-wider drop-shadow-md ${
                       log.prediction !== 'Normal' ? 'text-rose-400' : 'text-emerald-400'
                     }`}>
                       {log.prediction}
                     </span>
                   </div>
                   {log.prediction !== 'Normal' && (
                     <p className="text-xs text-rose-200 mt-3 font-mono flex items-center gap-2 bg-rose-900/40 px-3 py-1.5 rounded-lg border border-rose-500/20">
                        <span className="w-2 h-2 bg-rose-400 rounded-full inline-block animate-ping"></span>
                        ACTION: {log.suggestion}
                     </p>
                   )}
                 </div>

               </div>
             ))
           )}
         </div>
      </div>
    </div>
  );
}
