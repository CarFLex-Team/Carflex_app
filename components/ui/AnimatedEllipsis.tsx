export default function AnimatedEllipsis() {
  return (
    <div className="flex items-center justify-start space-x-1">
      <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
      <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
      <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
    </div>
  );
}
