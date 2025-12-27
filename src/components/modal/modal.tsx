'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib';
import { createPortal } from 'react-dom';
import { useIsMounted } from '@/hooks';
import { X } from 'lucide-react';
import { Button } from '@/components/form';

export interface ModalProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
  backdrop?: boolean;
  closeOnBackdropClick?: boolean;
  title?: string | ReactNode;
  showClose?: boolean;
  width?: number;
  variants?: {
    initial: Record<string, any>;
    animate: Record<string, any>;
    exit: Record<string, any>;
  };
}

export default function Modal({
  children,
  open,
  onClose,
  backdrop = true,
  closeOnBackdropClick = false,
  className,
  title,
  showClose = true,
  variants = {
    initial: {
      y: -100,
      opacity: 0,
      scale: 0.95
    },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: -100, opacity: 0, scale: 0.95 }
  },
  width,
  ...rest
}: ModalProps) {
  const isMounted = useIsMounted();
  if (!isMounted) return;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'fixed inset-0 z-20 flex items-center justify-center',
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...rest}
        >
          {backdrop && (
            <motion.div
              className='backdrop absolute inset-0 bg-black/50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOnBackdropClick ? onClose : undefined}
            />
          )}

          <motion.div
            className='content relative h-[80vh] rounded-lg bg-white shadow-[0px_0px_10px_2px] shadow-black/40'
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.15, ease: 'linear' }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: width ?? 'auto' }}
          >
            {(title || showClose) && (
              <div className='flex items-center justify-between border-b border-gray-200 px-4'>
                <div className='text-base font-semibold text-gray-800'>
                  {title}
                </div>

                {showClose && (
                  <Button
                    className='p-0! text-gray-500 transition hover:text-black'
                    onClick={onClose}
                    variant={'ghost'}
                  >
                    <X className='size-5' />
                  </Button>
                )}
              </div>
            )}

            <>{children}</>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
