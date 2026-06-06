import React, { useState } from 'react';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: string[]) => void;
  count: number;
}

export const InputModal: React.FC<InputModalProps> = ({ isOpen, onClose, onSubmit, count }) => {
  const [inputs, setInputs] = useState<string[]>(Array(count).fill(''));

  if (!isOpen) return null;

  const handleChange = (index: number, val: string) => {
    const next = [...inputs];
    next[index] = val;
    setInputs(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Python Input Required</h3>
            <p className="text-slate-400 text-sm mt-1">
              Your program has {count} {count === 1 ? 'input()' : 'input()'} call{count > 1 && 's'}. Please provide values before running.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-4 pr-1">
            {inputs.map((val, idx) => (
              <div key={idx} className="space-y-2">
                <label className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
                  Input #{idx + 1} Value
                </label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  placeholder={`Value for input() #${idx + 1}`}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 hover:text-white transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition duration-200 shadow-lg shadow-indigo-500/20"
            >
              Run Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
