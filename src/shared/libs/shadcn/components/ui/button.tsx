import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/libs/cn';

/**
 * 버튼 컴포넌트
 * - selected 케이스 추가
 * - default 케이스 수정
 * - size 케이스 수정
 * @author 김영현
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-white text-[1.4rem] font-medium text-gray-950 rounded-full shadow-category-button hover:text-main md:text-[1.6rem] trans-colors-200',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-white shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        selected:
          'text-[1.4rem] trans-colors-200 font-medium bg-gray-hover text-white md:text-[1.6rem] rounded-full shadow-category-button',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3 ',
        sm: 'h-[3rem]  gap-[0.4rem] px-[2rem] py-[2rem]',
        md: 'h-[4rem]  gap-2 px-4 has-[>svg]:px-3',
        lg: 'h-[4.4rem]  gap-2.5 px-5 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
