import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

// Colors for different models to keep it consistent
const modelColors = {
  "ANN": "#ec4899", // pink-500
  "RNN": "#8b5cf6", // violet-500
  "DNN": "#3b82f6", // blue-500
  "SVM-CSA": "#06b6d4", // cyan-500
  "CSA-PSO-SVM": "#10b981", // emerald-500
  "SVM_CSA": "#06b6d4", // fallback
  "CSA_PSO_SVM": "#10b981" // fallback
};

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
  
  // Format data for Recharts
  const chartData = models.map(m => ({
    name: m,
    Accuracy: parseFloat((data[m]["Accuracy"] * 100).toFixed(2)),
    fill: modelColors[m] || "#cbd5e1"
  }));

  return (
    <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-xl border border-indigo-500/20 shadow-lg mb-2">
      <h4 className="text-sm font-black mb-6 text-cyan-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Accuracy Matrix</h4>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 50, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4f46e5" opacity={0.2} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#818cf8" tick={{ fill: '#c7d2fe' }} />
            <YAxis type="category" dataKey="name" stroke="#818cf8" tick={{ fill: '#c7d2fe', fontWeight: 'bold' }} width={100} />
            <Tooltip 
              cursor={{ fill: '#312e81', opacity: 0.4 }}
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#22d3ee', borderRadius: '0.5rem', color: '#e0e7ff' }}
              formatter={(value) => [`${value}%`, 'Accuracy']}
            />
            <Bar dataKey="Accuracy" radius={[0, 4, 4, 0]} barSize={30}>
              {/* Add values exactly to the side of the bars */}
              <LabelList dataKey="Accuracy" position="right" fill="#22d3ee" fontSize={12} fontWeight="bold" formatter={(val) => `${val}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
