export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-200"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
