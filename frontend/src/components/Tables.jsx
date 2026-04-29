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

  // Format data for Recharts
  // X-Axis will be the Attack Class, Bars will be the Models
  const chartData = classes.map(cls => {
    const row = { name: cls };
    models.forEach(m => {
      row[m] = parseFloat((data[m][cls][metricIndex] * 100).toFixed(2));
    });
    return row;
  });

  return (
    <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-xl border border-indigo-500/20 shadow-lg">
      <h4 className="text-sm font-black mb-6 text-fuchsia-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(192,38,211,0.5)]">{title} Matrix</h4>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4f46e5" opacity={0.2} vertical={false} />
            <XAxis dataKey="name" stroke="#818cf8" tick={{ fill: '#c7d2fe', fontWeight: 'bold' }} />
            <YAxis stroke="#818cf8" tick={{ fill: '#c7d2fe' }} domain={[0, 100]} />
            <Tooltip 
              cursor={{ fill: '#312e81', opacity: 0.4 }}
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#6366f1', borderRadius: '0.5rem', color: '#e0e7ff' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {models.map(m => (
              <Bar key={m} dataKey={m} fill={modelColors[m] || "#cbd5e1"} radius={[4, 4, 0, 0]}>
                <LabelList dataKey={m} position="top" fill="#f8fafc" fontSize={10} fontWeight="bold" formatter={(val) => `${val}%`} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
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
