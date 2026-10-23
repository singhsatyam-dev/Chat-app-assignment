import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessage";
import MessageInput from "./components/MessageInput";
import { useChat } from "./Hooks/useChat";

export default function App() {
  const { messages, sendMessage, likeMessage } = useChat();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <ChatHeader />

        <ChatMessages messages={messages} onLike={likeMessage} />

        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
