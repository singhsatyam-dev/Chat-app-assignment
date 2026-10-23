import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

//if no message there or when the mwsssage is send then the screen view
export default function ChatMessages({ messages, onLike }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main
      className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 px-4 py-6 sm:px-6"
      aria-live="polite"
    >
      {messages.length === 0 ? (
        <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
            ...
          </div>

          <h2 className="text-base font-semibold text-slate-800">
            Start the conversation
          </h2>

          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Send your first message. Try an emoji or type @ to mention a user.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} onLike={onLike} />
        ))
      )}

      <div ref={bottomRef} />
    </main>
  );
}
