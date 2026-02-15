import { LucideArrowUpSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnimatedEllipsis from "../ui/AnimatedEllipsis";
type Message = {
  text: string;
  sender: "user" | "bot";
};
export default function FreeTextMode({ session }: { session?: any }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi How Can I Help You Today?", sender: "bot" },
  ]);
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async () => {
    const user_input = userInput;
    setUserInput("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: user_input, sender: "user" },
    ]);

    try {
      setBotTyping(true);
      const response = await fetch(
        "https://webhooks.eliaracarflex.cfd/webhook/Eliara",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: user_input,
          }),
        },
      );

      const result = await response.json();
      console.log("AI Response:", result);
      //   setBotTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: result.output, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error in ChatBot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to get AI response", sender: "bot" },
      ]);
    } finally {
      setBotTyping(false);
    }
  };
  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [userInput]);
  return (
    <>
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-3xs px-4 py-2 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              } `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {botTyping && (
          <div className="flex justify-start">
            <div className="max-w-3xs px-4 py-2 bg-gray-200 text-black rounded-2xl rounded-bl-none">
              <AnimatedEllipsis />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center gap-1 ">
        <input
          id="message"
          name="message"
          value={userInput}
          autoComplete="off"
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          placeholder="Ask your question or describe your issue..."
          className="w-full p-2 rounded-xl h-10 m-0 border border-gray-400 focus:ring-1 focus:ring-primary focus:border-transparent text-primary"
        />
        <button
          onClick={handleSubmit}
          className="p-1  text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
        >
          <LucideArrowUpSquare size={26} />
        </button>
      </div>
    </>
  );
}
