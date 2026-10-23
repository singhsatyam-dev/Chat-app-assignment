import EmojiPicker from "emoji-picker-react";

//emoji picker application
export default function EmojiPickerButton({
  open,
  onToggle,
  onEmojiSelect,
  pickerRef,
  buttonRef,
}) {
  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        aria-label="Open emoji picker"
        aria-expanded={open}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl transition hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        😊
      </button>

      {open && (
        <div
          ref={pickerRef}
          className="absolute bottom-full right-0 z-50 mb-3 overflow-hidden rounded-xl shadow-xl"
        >
          <EmojiPicker
            onEmojiClick={onEmojiSelect}
            width={320}
            height={400}
            previewConfig={{ showPreview: false }}
            searchPlaceHolder="Search emoji..."
          />
        </div>
      )}
    </>
  );
}
