import { X } from "lucide-react";
import { useState } from "react";

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
      <p>You have {remainingLeaveDays} remaining leave days.</p>
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
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
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
  };

  return (
    <div className="space-y-4">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your query here"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Send
      </button>
    </div>
  );
};

const LoadingIndicator = () => (
  <div className="text-center text-gray-600">Loading...</div>
);

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [mode, setMode] = useState<"hr" | "text">("hr");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDataSubmission = async (data: any) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: JSON.stringify(data), sender: "user" },
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
      <button onClick={onClose} className="self-start ">
        <X size={24} />
      </button>

      {/* Mode Switcher */}
      <div className="space-x-4">
        <button
          onClick={() => setMode("hr")}
          className={`px-4 py-2 rounded-md transition ${mode === "hr" ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          HR Mode
        </button>
        <button
          onClick={() => setMode("text")}
          className={`px-4 py-2 rounded-md transition ${mode === "text" ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Text Mode
        </button>
      </div>

      {/* Chat Messages Display */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      {/* Mode Content */}
      {mode === "hr" ? (
        <FormBasedMode onSubmit={handleDataSubmission} />
      ) : mode === "text" ? (
        <FreeTextMode onSubmit={handleDataSubmission} />
      ) : null}

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}
    </div>
  );
};

export default ChatBot;
