export default function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="8" y2="12"></line>
                <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            <span>{message}</span>
        </div>
    );
}
