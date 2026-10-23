// when @ is typed fot mention
export default function MentionSuggestions({
  users,
  activeIndex,
  onSelect,
}) {
  if (users.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 z-40 mb-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Mention someone
      </p>

      {users.map((username, index) => (
        <button
          key={username}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(username)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
            index === activeIndex
              ? "bg-indigo-50 text-indigo-700"
              : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
            {username.charAt(0)}
          </span>

          <span className="font-medium">{username}</span>
        </button>
      ))}
    </div>
  );
}
