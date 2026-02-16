import { LucideArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import FreeTextMode from "./FreeTextMode";
import FormBasedMode from "./FormBasedMode";

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [mode, setMode] = useState<"home" | "off" | "text" | "salary">("home");
  const { data: session } = useSession();
  return (
    <div className="flex flex-col w-full h-full rounded-4xl rounded-br-none shadow-lg overflow-auto ">
      {/* Close Button */}
      <div className="flex justify-between items-center bg-primary  text-white p-4 rounded-tl-3xl sticky top-0 z-10 ">
        {mode !== "home" ? (
          <button
            onClick={() => {
              setMode("home");
            }}
            className="hover:bg-gray-600 p-2 rounded-full transition duration-300"
          >
            <LucideArrowLeft size={20} />
          </button>
        ) : (
          <div></div>
        )}
        <button
          onClick={onClose}
          className="hover:bg-gray-600 p-2 rounded-full transition duration-300"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col flex-1  bg-linear-to-b from-primary to-white ">
        <div className="p-4 flex flex-col flex-1">
          {/* Header Section */}
          <div className="text-center text-2xl font-semibold text-gray-100 mb-2 ">
            {mode === "text" && "Quick Questions"}
            {mode === "off" && "Request Off Days"}
            {mode === "salary" && "Ask for Salary"}
            {mode == "home" && (
              <div className="">
                <p>Hi {session?.user?.name || "User"},</p>
                <p>How can we help?</p>
              </div>
            )}
          </div>

          {mode === "home" && (
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <button
                onClick={() => setMode("text")}
                className="w-full bg-gray-200 py-6 rounded-md hover:bg-gray-300 transition shadow-lg"
              >
                Ask a Quick Question
              </button>

              <button
                onClick={() => setMode("off")}
                className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition shadow-lg "
              >
                Request Off Days
              </button>
            </div>
          )}
        </div>
        {mode === "off" && <FormBasedMode session={session} />}
        {mode === "text" && <FreeTextMode session={session} />}
      </div>
    </div>
  );
};

export default ChatBot;
