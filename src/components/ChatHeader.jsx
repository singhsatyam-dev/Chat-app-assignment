// header 
export default function ChatHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white">
        {/* chat image */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">Chat Room</h1>
        <p className="text-sm text-slate-500">
          A simple place to share your thoughts
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Online
      </div>
    </header>
  );
}
