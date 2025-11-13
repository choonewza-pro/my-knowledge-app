interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
}: CardProps) {
  const baseClasses = 'card';
  const variantClasses = {
    default: '',
    bordered: 'card-bordered',
    elevated: 'shadow-xl',
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-700 text-white',
  };
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  const hoverClasses = hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl' : '';
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`.trim();

  return (
    <div className={classes}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}