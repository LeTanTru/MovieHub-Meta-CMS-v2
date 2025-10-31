import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib';

type RowProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function Row({ children, className, ...rest }: RowProps) {
  const childCount = Array.isArray(children) ? children.length : 1;

  return (
    <div
      className={cn(
        'mb-6 flex w-full flex-row',
        childCount > 1 ? 'gap-x-4' : 'pr-4',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
