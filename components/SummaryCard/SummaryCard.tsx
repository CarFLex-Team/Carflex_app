export function SummaryCard({
  title,
  data,
  bgColor,
  percentage,
  percentageLabel,
}: {
  title: string;
  data: any[] | any;
  bgColor?: string;
  percentage?: number;
  percentageLabel?: string;
}) {
  return (
    <div
      className={`${bgColor || "bg-primary"} border border-gray-200 rounded-lg p-4 shadow-sm w-full  min-h-30  `}
    >
      <p className="text-base text-gray-200 font-semibold">{title}</p>
      <p className=" text-white font-bold text-2xl ">
        {Array.isArray(data) ? data.length : data}
      </p>
      {percentage !== undefined && (
        <>
          <div className="mt-2 bg-gray-200 rounded-full h-0.5">
            <div
              className="bg-green-500 h-0.5 rounded-full"
              style={{ width: `${percentage || 0}%` }} // Set width based on percentage
            ></div>
          </div>
          <div className="text-sm  text-gray-300">
            {percentage || 0}% Of {percentageLabel}
          </div>
        </>
      )}
    </div>
  );
}
