import { useState } from "react";
export default function FormBasedMode({
  employeeDetails,
}: {
  employeeDetails?: any;
}) {
  console.log("FormBasedMode Employee Details:", employeeDetails);
  const remainingLeaveDays = employeeDetails?.remaining_leave_days || 0;
  const [requestedDays, setRequestedDays] = useState("");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (
      !requestedDays ||
      !leaveStart ||
      !leaveEnd ||
      isNaN(Number(requestedDays))
    ) {
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://webhooks.eliaracarflex.cfd/webhook/virtual",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode: "hr",
            data: {
              employee_name: employeeDetails?.name,
              employee_email: employeeDetails?.email,
              remaining_leave_days: remainingLeaveDays,
              requested_days: requestedDays,
              leave_start: leaveStart,
              leave_end: leaveEnd,
            },
          }),
        },
      );

      const result = await response.json();
      setResponseMessage(
        result.message || "HR request submitted successfully.",
      );
    } catch (error) {
      console.error("Error submitting HR request:", error);
      setErrorMessage("Error submitting HR request.");
      setTimeout(() => setErrorMessage(""), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-4 flex-3 flex flex-col  p-4">
      <p className="text-left text-gray-200">
        Remaining Leave Days: {remainingLeaveDays}
      </p>
      <input
        value={requestedDays}
        onChange={(e) => setRequestedDays(e.target.value)}
        placeholder="Number of Requested Days"
        className="w-full p-2 border border-gray-200 rounded-md text-gray-200 focus:outline-none shadow-sm "
      />
      <input
        value={leaveStart}
        onChange={(e) => setLeaveStart(e.target.value)}
        type="date"
        className="w-full p-2 border border-gray-200 rounded-md text-gray-200 focus:outline-none shadow-sm"
      />
      <input
        value={leaveEnd}
        onChange={(e) => setLeaveEnd(e.target.value)}
        type="date"
        className="w-full p-2 border border-gray-200 rounded-md text-gray-200 focus:outline-none shadow-sm"
      />
      <p className="text-sm text-gray-600">{responseMessage}</p>
      <p className="text-sm text-red-500">{errorMessage}</p>
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-lightPrimary transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
