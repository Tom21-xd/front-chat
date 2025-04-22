export default function MessageBubble({
    role,
    content,
  }: {
    role: 'user' | 'ai';
    content: string;
  }) {
    const isUser = role === 'user';
    return (
      <div
        className={`p-3 rounded max-w-[85%] whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-500 text-white self-end ml-auto text-right'
            : 'bg-gray-200 text-gray-900 self-start mr-auto text-left'
        }`}
      >
        {content}
      </div>
    );
  }
  