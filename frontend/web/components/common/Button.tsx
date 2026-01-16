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
	primary: 'bg-primary-400 text-text-primary hover:bg-primary-500',
	secondary:
		'bg-transparent border border-primary-400 text-primary-400 hover:border-primary-500 hover:text-primary-600',
	ghost: 'bg-transparent text-text-primary hover:bg-primary-200/10 hover:text-primary-400',
	danger: 'bg-danger-500 text-white hover:bg-danger-700',
	link: 'bg-transparent text-text-primary hover:text-primary-400 hover:underline',
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: 'px-5 py-1.5 text-sm',
	md: 'px-6 py-2 text-base',
	lg: 'px-10 py-3 text-lg',
	xl: 'px-14 py-4 text-xl',
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
            transition-colors duration-200
						hover:cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg
            disabled:opacity-50 disabled:cursor-not-allowed 
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
