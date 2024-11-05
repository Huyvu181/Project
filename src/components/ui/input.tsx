import React from 'react';

type InputProps = {
  label: string;
  type: string;
  error?: string;  
  registration: any;
  className?: string; 
};

export const Input = ({ label, type, error, registration,className }: InputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        type={type} 
        {...registration} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {error && <p className="mt-1 text-sm" style={{ color: 'red' }}>{error}</p>}
      
    </div>
  );
};
