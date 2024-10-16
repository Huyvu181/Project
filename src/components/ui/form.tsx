import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

type FormProps = {
  onSubmit: (values: any) => void;
  children: (methods: UseFormReturn) => React.ReactNode;
  schema?: any;  // Nếu có schema validation như Yup
};

export const Form = ({ onSubmit, children, schema }: FormProps) => {
  const methods = useForm({ mode: 'onSubmit' });  // Initialize useForm hook

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </form>
  );
};
