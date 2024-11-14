import React from 'react';
import { useForm, UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type FormProps<TFieldValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFieldValues>;
  children: (methods: UseFormReturn<TFieldValues>) => React.ReactNode;
  schema?: z.ZodType<TFieldValues>;
  className?: string;
};

export const Form = <TFieldValues extends FieldValues>({
  onSubmit,
  children,
  schema,
  className,
}: FormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>({
    mode: 'onSubmit',
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <form onSubmit={(e) => {
      console.log("e",e)
      e.preventDefault();
      methods.handleSubmit(onSubmit)(e);
    }} className={className}>
      {children(methods)}
    </form>
  );
};
