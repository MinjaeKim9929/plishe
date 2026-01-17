'use client';

import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: `bg-primary-500 text-text-primary shadow-[0_4px_0_0_var(--color-primary-700)] hover:brightness-110 active:shadow-[0_0_0_0_var(--color-primary-700)] active:translate-y-[4px]`,
	secondary: `bg-surface text-primary-500 border border-primary-500
      shadow-[0_4px_0_0_var(--color-primary-500)]
      hover:bg-surface-hover
      active:shadow-[0_0_0_0_var(--color-border)] active:translate-y-[4px]`,
	ghost: `
      bg-transparent text-text-primary
      hover:bg-surface-hover
      active:bg-surface active:translate-y-[1px]
    `,
	danger: `
      bg-danger-500 text-white
      shadow-[0_4px_0_0_var(--color-danger-700)]
      hover:brightness-110
      active:shadow-[0_0_0_0_var(--color-danger-700)] active:translate-y-[4px]
    `,
	link: 'bg-transparent text-text-primary hover:text-primary-400 hover:underline',
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: 'px-5 py-1.5 text-sm min-h-[32px]',
	md: 'px-6 py-2 text-base min-h-[40px]',
	lg: 'px-10 py-3 text-lg min-h-[48px]',
	xl: 'px-14 py-4 text-xl min-h-[56px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			loading = false,
			fullWidth = false,
			disabled,
			className = '',
			children,
			...props
		},
		ref
	) => {
		const isDisabled = disabled || loading;

		return (
			<button
				ref={ref}
				disabled={isDisabled}
				className={`
            inline-flex items-center justify-center gap-2
            font-medium rounded-lg
            duration-100 ease-out transition-all
						hover:cursor-pointer
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0
						disabled:hover:cursor-not-allowed
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${fullWidth ? 'w-full' : ''}
            ${className}
          `}
				{...props}
			>
				{loading && (
					<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
					</svg>
				)}
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';
