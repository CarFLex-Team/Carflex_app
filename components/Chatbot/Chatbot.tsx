import {
  LucideArrowUpSquare,
  LucideArrowLeft,
  Home,
  MessageCircle,
  X,
} from "lucide-react";
import { useState, useEffect, useRef, use } from "react";

// Message Type Definition
type Message = {
  text: string;
  sender: "user" | "bot";
};

const FormBasedMode = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(5);
  const [requestedDays, setRequestedDays] = useState(0);
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");

  const handleSubmit = () => {
    onSubmit({
      mode: "hr",
      data: {
        employee_name: employeeName,
        employee_email: employeeEmail,
        remaining_leave_days: remainingLeaveDays,
        requested_days: requestedDays,
        leave_start: leaveStart,
        leave_end: leaveEnd,
      },
    });
  };

  return (
    <div className="space-y-4">
      <input
        value={remainingLeaveDays}
        onChange={(e) => setRemainingLeaveDays(Number(e.target.value))}
        placeholder="Remaining Leave Days"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        value={requestedDays}
        onChange={(e) => setRequestedDays(Number(e.target.value))}
        placeholder="Requested Days"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        value={leaveStart}
        onChange={(e) => setLeaveStart(e.target.value)}
        type="date"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        value={leaveEnd}
        onChange={(e) => setLeaveEnd(e.target.value)}
        type="date"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-lightPrimary transition duration-300 cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
};

const FreeTextMode = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    onSubmit({
      mode: "text",
      data: { user_input: userInput },
    });
    setUserInput("");
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
    <div className="flex items-center gap-1">
      <input
        id="message"
        name="message"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        type="text"
        placeholder="Ask your question or describe your issue..."
        className="w-full p-2 rounded-xl h-10 m-0 border border-gray-300 focus:ring-1 focus:ring-primary focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
        className="p-1 bg-white text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
      >
        <LucideArrowUpSquare size={26} />
      </button>
    </div>
  );
};

const LoadingIndicator = () => (
  <div className="text-center text-gray-600">Loading...</div>
);

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [mode, setMode] = useState<"home" | "off" | "text" | "salary">("home");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi How Can I Help You Today?", sender: "bot" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Ref to scroll the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleDataSubmission = async (data: any) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.data.user_input, sender: "user" },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: result.reply || "AI response failed", sender: "bot" },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Error occurred while processing your request.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white rounded-4xl rounded-br-none shadow-lg space-y-4 overflow-auto">
      {/* Close Button */}
      <div className="flex justify-between items-center">
        {/* Back Arrow */}
        {mode !== "home" ? (
          <button
            onClick={() => {
              setMode("home");
            }}
            className=" hover:bg-gray-300 p-2 rounded-full transition duration-300 "
          >
            <LucideArrowLeft size={20} />
          </button>
        ) : (
          <div></div>
        )}
        <button
          onClick={onClose}
          className=" hover:bg-gray-300 p-2 rounded-full transition duration-300"
        >
          <X size={20} />
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center text-xl font-semibold text-primary">
        {mode === "text" && "Quick Questions"}
        {mode === "off" && "Request Off Days"}
        {mode === "salary" && "Ask for Salary"}
        {mode == "home" && (
          <div>
            <p>Hi Mazen, 👋</p>
            <p>How can we help?</p>
          </div>
        )}
      </div>

      {/* HR Mode Options */}
      {mode === "home" && (
        <div className="space-y-4">
          <button
            onClick={() => setMode("off")}
            className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Request Off Days
          </button>
          <button
            onClick={() => setMode("salary")}
            className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Ask for Salary
          </button>
          <button
            onClick={() => setMode("text")}
            className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Ask a Quick Question
          </button>
        </div>
      )}

      {/* Message Area */}
      {mode === "text" && (
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-3xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                } rounded-4xl`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Form for HR Mode based on selection */}
      {mode === "off" && <FormBasedMode onSubmit={handleDataSubmission} />}

      {/* Message Input Section */}
      {mode === "text" && <FreeTextMode onSubmit={handleDataSubmission} />}

      {/* Mode Switcher Fixed to Bottom
      {mode !== "text" && (
        <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-center py-2 px-4 bg-white shadow-md ">
          <button
            onClick={() => {
              setMode("home");
              setHrOptionSelected(null);
            }}
            className={`px-4 py-2 rounded-l-xl  transition flex items-center justify-center flex-1 text-primary ${mode === "home" ? "bg-gray-300 " : "hover:bg-gray-100"}`}
          >
            <Home size={25} />
          </button>
          <button
            onClick={() => {
              setMode("text");
              setHrOptionSelected(null);
            }}
            className={`px-4 py-2  rounded-r-xl transition flex items-center justify-center flex-1 text-primary ${mode === "text" ? "bg-gray-300 " : "hover:bg-gray-100"}`}
          >
            <MessageCircle size={25} />
          </button>
        </div>
      )} */}

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}
    </div>
  );
};

export default ChatBot;
