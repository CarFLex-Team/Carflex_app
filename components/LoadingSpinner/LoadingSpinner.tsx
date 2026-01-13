export default function LoadingSpinner({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
        size ? `h-${size} w-${size}` : "h-8 w-8"
      } ${color ? `border-${color}` : "border-primary"}`}
      role="status"
    >
      <span className="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
        Loading...
      </span>
    </div>
  );
}
