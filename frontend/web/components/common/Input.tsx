'use client';

import {
	type InputHTMLAttributes,
	forwardRef,
	type ReactNode,
	useId,
	useState,
	useEffect,
	useRef,
	useImperativeHandle,
} from 'react';

type InputVariant = 'default' | 'filled';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	variant?: InputVariant;
	size?: InputSize;
	label?: string;
	error?: string;
	helperText?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
	loading?: boolean;
	clearable?: boolean;
	showCharacterCount?: boolean;
	onClear?: () => void;
}

const variantStyles: Record<InputVariant, string> = {
	default: `
      bg-transparent border-2 border-border-strong
      hover:border-text-muted
      focus:border-primary-500 focus:ring-1 focus:ring-primary-500
      disabled:hover:border-border-strong
    `,
	filled: `
      bg-surface-elevated border-2 border-transparent
      hover:bg-surface-hover
      focus:bg-surface-hover focus:border-primary-500 focus:ring-1 focus:ring-primary-500
      disabled:hover:bg-surface-elevated
    `,
};

const sizeStyles: Record<InputSize, { input: string; icon: string }> = {
	sm: { input: 'h-8 px-3 text-sm', icon: 'w-4 h-4' },
	md: { input: 'h-10 px-4 text-base', icon: 'w-5 h-5' },
	lg: { input: 'h-12 px-4 text-lg', icon: 'w-5 h-5' },
};

const Spinner = ({ className }: { className?: string }) => (
	<svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
		<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
	</svg>
);

const ClearButton = ({ onClick, className }: { onClick: () => void; className?: string }) => (
	<button
		type="button"
		onClick={onClick}
		className={`
        text-text-muted hover:text-text-primary
        hover:cursor-pointer
        transition-colors duration-150
        focus:outline-none focus:text-text-primary
        ${className}
      `}
		aria-label="Clear input"
	>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			className="w-full h-full"
			aria-hidden="true"
		>
			<path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	</button>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			variant = 'default',
			size = 'md',
			label,
			error,
			helperText,
			leftIcon,
			rightIcon,
			fullWidth = false,
			loading = false,
			clearable = false,
			showCharacterCount = false,
			onClear,
			className = '',
			id,
			disabled,
			required,
			maxLength,
			value,
			defaultValue,
			onChange,
			...props
		},
		ref
	) => {
		const reactId = useId();
		const inputId = id || reactId;
		const hasError = Boolean(error);

		const internalRef = useRef<HTMLInputElement>(null);

		useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

		const [charCount, setCharCount] = useState(() => {
			if (typeof value === 'string') return value.length;
			if (typeof defaultValue === 'string') return defaultValue.length;
			return 0;
		});

		useEffect(() => {
			if (typeof value === 'string') {
				setCharCount(value.length);
			}
		}, [value]);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setCharCount(e.target.value.length);
			onChange?.(e);
		};

		const handleClear = () => {
			setCharCount(0);
			onClear?.();
			if (internalRef.current) {
				internalRef.current.value = '';
				internalRef.current.dispatchEvent(new Event('input', { bubbles: true }));
				internalRef.current.focus();
			}
		};

		const showClearButton = clearable && charCount > 0 && !disabled && !loading;
		const showRightIcon = rightIcon && !loading && !showClearButton;
		const showSpinner = loading;

		const getRightPadding = () => {
			if (showSpinner || showClearButton || showRightIcon) return 'pr-10';
			return '';
		};

		return (
			<div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
				{/* Label */}
				{label && (
					<label htmlFor={inputId} className="text-sm font-medium text-text-primary">
						{label}
						{required && (
							<span className="text-danger-500 ml-1" aria-hidden="true">
								*
							</span>
						)}
					</label>
				)}

				{/* Input wrapper */}
				<div className="relative">
					{/* Left icon */}
					{leftIcon && (
						<span
							aria-hidden="true"
							className={`
                  absolute left-3 top-1/2 -translate-y-1/2
                  text-text-muted pointer-events-none
                  transition-colors duration-150
                  ${sizeStyles[size].icon}
                `}
						>
							{leftIcon}
						</span>
					)}

					{/* Input element */}
					<input
						ref={internalRef}
						id={inputId}
						disabled={disabled}
						required={required}
						maxLength={maxLength}
						value={value}
						defaultValue={defaultValue}
						onChange={handleChange}
						aria-invalid={hasError}
						aria-required={required}
						aria-describedby={
							[
								hasError ? `${inputId}-error` : null,
								helperText && !hasError ? `${inputId}-helper` : null,
								showCharacterCount && maxLength ? `${inputId}-count` : null,
							]
								.filter(Boolean)
								.join(' ') || undefined
						}
						className={`
                peer w-full rounded-lg
                text-text-primary placeholder:text-text-muted
                outline-none transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variantStyles[variant]}
                ${sizeStyles[size].input}
                ${leftIcon ? 'pl-10' : ''}
                ${getRightPadding()}
                ${
									hasError
										? '!border-danger-500 hover:!border-danger-400 focus:!border-danger-500 focus:!ring-danger-500'
										: ''
								}
                ${className}
              `}
						{...props}
					/>

					{/* Right slot: Spinner / Clear button / Icon */}
					{(showSpinner || showClearButton || showRightIcon) && (
						<span
							className={`
                  absolute right-3 top-1/2 -translate-y-1/2
                  ${sizeStyles[size].icon}
                  ${showClearButton ? '' : 'pointer-events-none'}
                  ${hasError ? 'text-danger-500' : 'text-text-muted peer-focus:text-primary-500'}
                  transition-colors duration-150
                `}
						>
							{showSpinner && <Spinner className="w-full h-full" />}
							{showClearButton && <ClearButton onClick={handleClear} className="w-full h-full" />}
							{showRightIcon && <span aria-hidden="true">{rightIcon}</span>}
						</span>
					)}
				</div>

				{/* Bottom row: Error / Helper / Character count */}
				<div className="flex justify-between gap-2">
					<div className="flex-1">
						{hasError && (
							<p id={`${inputId}-error`} className="text-sm text-danger-500" role="alert">
								{error}
							</p>
						)}

						{!hasError && helperText && (
							<p id={`${inputId}-helper`} className="text-sm text-text-muted">
								{helperText}
							</p>
						)}
					</div>

					{showCharacterCount && maxLength && (
						<p
							id={`${inputId}-count`}
							className={`text-sm ${charCount >= maxLength ? 'text-danger-500' : 'text-text-muted'}`}
							aria-live="polite"
						>
							{charCount}/{maxLength}
						</p>
					)}
				</div>
			</div>
		);
	}
);

Input.displayName = 'Input';
