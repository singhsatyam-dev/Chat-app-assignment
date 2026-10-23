//timing of message
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

//message content after sending
export default function MessageItem({ message, onLike }) {
  return (
    <article className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
        {message.username.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-slate-900">
            {message.username}
          </span>

          <time className="text-xs text-slate-400">
            {formatTime(message.createdAt)}
          </time>
        </div>

        <div className="flex items-end gap-3">
          <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
            {message.text}
          </p>

          <button
            type="button"
            onClick={() => onLike(message.id)}
            aria-label={`Like message from ${message.username}. ${message.likes} likes`}
            className="mb-1 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.5a2 2 0 0 0 1.8-1.1l2.1-4.2a1.7 1.7 0 0 1 3.1 1.18Z" />
            </svg>

            <span>{message.likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
