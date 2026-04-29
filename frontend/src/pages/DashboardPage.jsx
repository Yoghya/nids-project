import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Database, Activity, RefreshCw } from 'lucide-react';
import { MetricTable, AccuracyTable } from '../components/Tables';

const DatasetSection = ({ datasetName, data }) => {
  if (!data) return null;
  
  const sectionContainerClass = "card card-hoverable";
  const sectionHoverBarClass = "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700";
  const sectionTitleClass = "title-tertiary";
  const sectionTitleBarClass = "w-2 h-8 bg-gradient-to-b from-cyan-400 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]";

  return (
    <div className={sectionContainerClass}>
      <div className={sectionHoverBarClass}></div>
      
      <h3 className={sectionTitleClass}>
        <div className={sectionTitleBarClass}></div> 
        {datasetName} Evaluation Matrix
      </h3>
      
      <div className="grid grid-cols-1 gap-6">
        <AccuracyTable data={data} />
        <MetricTable title="Precision" metricIndex={0} data={data} />
        <MetricTable title="Recall" metricIndex={1} data={data} />
        <MetricTable title="F1-Score" metricIndex={2} data={data} />
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [comparisonData, setComparisonData] = useState({ nsl_kdd: null, unr_idd: null });
  const [isComparing, setIsComparing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const mapBackendData = (metrics) => {
    if (!metrics) return null;
    const models = ["ANN", "RNN", "DNN", "SVM_CSA", "CSA_PSO_SVM"];
    const classes = ["DoS", "Probe", "R2L"];
    const adapted = {};

    models.forEach(m => {
      let displayName = m;
      if (m === 'SVM_CSA') displayName = 'SVM-CSA';
      if (m === 'CSA_PSO_SVM') displayName = 'CSA-PSO-SVM';
      
      adapted[displayName] = {
        Accuracy: metrics.Accuracy[m] / 100
      };
      classes.forEach(c => {
        adapted[displayName][c] = [
          metrics.Precision[c][m] / 100,
          metrics.Recall[c][m] / 100,
          metrics.FScore[c][m] / 100
        ];
      });
    });
    return adapted;
  };

  const handleCompare = async () => {
    setIsComparing(true);
    setErrorMsg(null);
    try {
      const [resNsl, resUnr] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/metrics/NSL-KDD`),
        axios.get(`${API_BASE_URL}/api/metrics/UNR-IDD`)
      ]);
      
      const nslData = resNsl.data.status === 'success' ? mapBackendData(resNsl.data.data.metrics) : null;
      const unrData = resUnr.data.status === 'success' ? mapBackendData(resUnr.data.data.metrics) : null;
      
      setComparisonData({ nsl_kdd: nslData, unr_idd: unrData });
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
      setErrorMsg(err.message + " (Check console for details)");
    } finally {
      setIsComparing(false);
    }
  };

  useEffect(() => {
    handleCompare();
  }, []);

  const pageContainerClass = "page-container";
  const heroBannerClass = "relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.3)] border border-indigo-500/30 group h-64";
  const heroOverlayClass = "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10";
  const heroContentClass = "absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col md:flex-row justify-between items-end";
  const heroTitleClass = "text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-2 flex items-center gap-3";
  
  const btnSyncingClass = "btn-disabled";
  const btnIdleClass = "btn-primary";

  const gridContainerClass = "grid grid-cols-1 xl:grid-cols-2 gap-8 items-start";
  const emptyStateClass = "flex flex-col items-center justify-center py-24 text-slate-500 bg-slate-900/30 backdrop-blur-md rounded-3xl border border-indigo-500/20 border-dashed shadow-[0_0_30px_rgba(0,0,0,0.2)]";

  return (
    <div className={pageContainerClass}>
      
      {/* Vibrant Hero Banner */}
      <div className={heroBannerClass}>
        <div className="absolute inset-0 bg-slate-900 z-0">
           {/* Fallback color if image fails to load */}
        </div>
        <img 
          src="/banner.png" 
          alt="Network Intrusion Detection System" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen group-hover:scale-105 transition-transform duration-1000 z-0"
        />
        <div className={heroOverlayClass}></div>
        
        <div className={heroContentClass}>
          <div>
            <h2 className={heroTitleClass}>
              <Database className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" /> 
              Global Performance Matrices
            </h2>
            <p className="text-indigo-200 text-sm font-medium drop-shadow-md">
              Real-time deep learning & hybrid optimization evaluation mappings.
            </p>
          </div>
          <button 
            onClick={handleCompare} 
            disabled={isComparing}
            className={isComparing ? btnSyncingClass : btnIdleClass}
          >
            {isComparing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5 animate-pulse" />}
            {isComparing ? 'Syncing...' : 'Live Sync Metrics'}
          </button>
        </div>
      </div>
      
      {(comparisonData.nsl_kdd || comparisonData.unr_idd) ? (
        <div className={gridContainerClass}>
          <DatasetSection datasetName="NSL-KDD" data={comparisonData.nsl_kdd} />
          <DatasetSection datasetName="UNR-IDD" data={comparisonData.unr_idd} />
        </div>
      ) : (
        <div className={emptyStateClass}>
          <Database className="w-16 h-16 opacity-30 mb-6 animate-pulse text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          <h3 className="text-2xl font-black text-indigo-300 mb-2 drop-shadow-sm">Metrics Data Absent</h3>
          <p className="text-slate-400 font-medium text-center">
            Go to Model Training first or click Live Sync if DB is populated.
            <br/><br/>
            Current API URL: <span className="text-fuchsia-400 font-mono bg-fuchsia-900/30 px-2 py-1 rounded">{API_BASE_URL}</span>
          </p>
          {errorMsg && (
            <div className="mt-6 p-4 bg-rose-900/40 border border-rose-500/50 rounded-xl text-rose-300 text-sm font-bold">
              Error fetching data: {errorMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
