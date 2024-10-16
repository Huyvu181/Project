import React from 'react';

type InputProps = {
  label: string;
  type: string;
  error?: string;  
  registration: any;
};

export const Input = ({ label, type, error, registration }: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...registration} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
