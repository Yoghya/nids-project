import React from 'react';

export const MetricTable = ({ title, metricIndex, data }) => {
  const models = Object.keys(data);
  const classes = ["DoS", "Probe", "R2L"];

  const getMaxInClass = (attackClass) => {
    let maxVal = -1;
    models.forEach((m) => {
      const val = data[m][attackClass][metricIndex];
      if (val > maxVal) maxVal = val;
    });
    return maxVal;
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-xl border border-indigo-500/20 shadow-lg">
      <h4 className="text-sm font-black mb-4 text-fuchsia-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(192,38,211,0.5)]">{title} Matrix</h4>
      <div className="overflow-x-auto rounded-lg border border-indigo-500/20 custom-scrollbar">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-indigo-200 uppercase bg-gradient-to-r from-slate-900 to-slate-800 border-b border-indigo-500/30">
            <tr>
              <th className="px-5 py-4 border-r border-indigo-500/20 font-bold tracking-wider">Attack Class</th>
              {models.map(m => (
                <th key={m} className="px-5 py-4 text-center font-bold tracking-wider">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, rowIdx) => {
               const maxColValue = getMaxInClass(cls);
               return (
                <tr key={cls} className={`border-b border-indigo-500/10 ${rowIdx % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-900/30'} hover:bg-indigo-900/30 transition-colors duration-300`}>
                  <td className="px-5 py-4 font-bold text-white border-r border-indigo-500/20">{cls}</td>
                  {models.map(m => {
                    const value = data[m][cls][metricIndex];
                    const isBest = value === maxColValue && value > 0;
                    return (
                      <td key={m} className={`px-5 py-4 text-center transition-all duration-500 ${
                        isBest 
                          ? 'text-cyan-300 font-black bg-cyan-900/30 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]' 
                          : 'text-slate-400 font-medium'
                      }`}>
                        {(value * 100).toFixed(2)}%
                      </td>
                    );
                  })}
                </tr>
               );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AccuracyTable = ({ data }) => {
  const models = Object.keys(data);
  
  const getMaxAccuracy = () => {
    let maxVal = -1;
    models.forEach(m => {
      const val = data[m]["Accuracy"];
      if (val > maxVal) maxVal = val;
    });
    return maxVal;
  };

  const maxAcc = getMaxAccuracy();

  return (
    <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-xl border border-indigo-500/20 shadow-lg mb-2">
      <h4 className="text-sm font-black mb-4 text-cyan-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Accuracy Matrix</h4>
      <div className="overflow-x-auto rounded-lg border border-indigo-500/20 custom-scrollbar">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-indigo-200 uppercase bg-gradient-to-r from-slate-900 to-slate-800 border-b border-indigo-500/30">
            <tr>
              <th className="px-5 py-4 border-r border-indigo-500/20 font-bold tracking-wider">Model Name</th>
              <th className="px-5 py-4 text-center font-bold tracking-wider">Global Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m, rowIdx) => {
              const value = data[m]["Accuracy"];
              const isBest = value === maxAcc && value > 0;
              return (
                <tr key={m} className={`border-b border-indigo-500/10 ${rowIdx % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-900/30'} hover:bg-indigo-900/30 transition-colors duration-300`}>
                  <td className="px-5 py-4 font-bold text-white border-r border-indigo-500/20">{m}</td>
                  <td className={`px-5 py-4 text-center transition-all duration-500 ${
                    isBest 
                      ? 'text-cyan-300 font-black bg-cyan-900/30 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]' 
                      : 'text-slate-400 font-medium'
                  }`}>
                    {(value * 100).toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
