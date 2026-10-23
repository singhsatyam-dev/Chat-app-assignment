import { useEffect, useRef, useState } from "react";
import { USER_LIST } from "../Hooks/useChat";
import EmojiPickerButton from "./EmojiPicker";
import MentionSuggestions from "./MentionSuggestion";

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionStart, setMentionStart] = useState(-1);
  const [activeMention, setActiveMention] = useState(0);

  const inputRef = useRef(null);
  const emojiRef = useRef(null);
  const emojiButtonRef = useRef(null);

  const filteredUsers = USER_LIST.filter((username) =>
    username.toLowerCase().startsWith(mentionQuery.toLowerCase()),
  );

  // close emoji picker when clicking outside
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowEmojis(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleChange(event) {
    const newValue = event.target.value;
    const cursorPosition = event.target.selectionStart;

    setValue(newValue);

    const textBeforeCursor = newValue.slice(0, cursorPosition);
    const match = textBeforeCursor.match(/(?:^|\s)@([a-zA-Z]*)$/);

    if (match) {
      setMentionQuery(match[1]);
      setMentionStart(cursorPosition - match[1].length - 1);
      setShowMentions(true);
      setActiveMention(0);
    } else {
      setShowMentions(false);
      setMentionQuery("");
      setMentionStart(-1);
    }
  }

  //mention function
  function insertMention(username) {
    if (mentionStart < 0) return;

    const input = inputRef.current;
    const cursorPosition = input?.selectionStart ?? value.length;

    const beforeMention = value.slice(0, mentionStart);
    const afterMention = value.slice(cursorPosition);
    const updatedValue = `${beforeMention}@${username} ${afterMention}`;

    setValue(updatedValue);
    setShowMentions(false);
    setMentionQuery("");
    setMentionStart(-1);

    requestAnimationFrame(() => {
      if (!input) return;

      const newPosition = beforeMention.length + username.length + 2;
      input.focus();
      input.setSelectionRange(newPosition, newPosition);
    });
  }

  //emoji adding function
  function insertEmoji(emojiData) {
    const emoji = emojiData.emoji;
    const input = inputRef.current;

    const start = input?.selectionStart ?? value.length;
    const end = input?.selectionEnd ?? value.length;

    const updatedValue = value.slice(0, start) + emoji + value.slice(end);

    setValue(updatedValue);
    setShowEmojis(false);
    setShowMentions(false);
    input?.focus();

    requestAnimationFrame(() => {
      if (!input) return;

      const newPosition = start + emoji.length;
      input.focus();
      input.setSelectionRange(newPosition, newPosition);
    });
  }

  //send message
  function handleSubmit(event) {
    event.preventDefault();

    if (!value.trim()) return;

    onSend(value);
    setValue("");
    setShowEmojis(false);
    setShowMentions(false);
    setMentionQuery("");
    setMentionStart(-1);
    inputRef.current?.focus();
  }

  //for mention key actions
  function handleKeyDown(event) {
    if (showMentions && filteredUsers.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveMention((previous) => (previous + 1) % filteredUsers.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveMention(
          (previous) =>
            (previous - 1 + filteredUsers.length) % filteredUsers.length,
        );
        return;
      }

      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        insertMention(filteredUsers[activeMention]);
        return;
      }

      if (event.key === "Escape") {
        setShowMentions(false);
        return;
      }
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
      <form onSubmit={handleSubmit} className="relative">
        {showMentions && (
          <MentionSuggestions
            users={filteredUsers}
            activeIndex={activeMention}
            onSelect={insertMention}
          />
        )}

        <div className="relative">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              aria-label="Type your message"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

            <EmojiPickerButton
              open={showEmojis}
              pickerRef={emojiRef}
              buttonRef={emojiButtonRef}
              onToggle={() => {
                setShowEmojis((previous) => !previous);
                setShowMentions(false);
              }}
              onEmojiSelect={insertEmoji}
            />

            <button
              type="submit"
              disabled={!value.trim()}
              className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Send</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>

          {/* emoji picker positioned above the input. */}
          {showEmojis && (
            <div className="pointer-events-none absolute bottom-full right-0 h-0 w-0" />
          )}
        </div>

        <p className="mt-2 px-1 text-xs text-slate-400">
          Press Enter to send. Type @ to mention someone
        </p>
      </form>
    </footer>
  );
}
