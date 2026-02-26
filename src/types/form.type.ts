import type { FormHTMLAttributes, ReactNode, Ref } from 'react';
import type {
  DefaultValues,
  FieldValues,
  Path,
  UseFormReturn
} from 'react-hook-form';

export type FieldError = { type: string; message: string };

export type ErrorMaps<TFields extends FieldValues> = Record<
  string,
  Array<[Path<TFields>, FieldError]>
>;

type AsyncDefaultValues<T> = (payload?: unknown) => Promise<T>;

export type UseBaseFormProps<T extends Record<string, any>> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  defaultValues: DefaultValues<T> | AsyncDefaultValues<T>;
  initialValues?: T;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  schema: any;
};

export type BaseFormProps<T extends Record<string, any>> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'children' | 'onSubmit'
> & {
  ref?: Ref<HTMLFormElement>;
  children: ReactNode;
  onSubmit: (values: T) => Promise<void> | void;
  form: UseFormReturn<T>;
};
