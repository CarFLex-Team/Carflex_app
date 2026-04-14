import formatNumber from "@/lib/formatNumber";

export default function FormInput({
  value,
  onChange,
  label,
  error,
  isFormatNumber,
  icon,
  placeholder,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: boolean;
  isFormatNumber?: boolean;
  icon?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-primary font-medium">{label}</label>
        {error && <p className="text-red-500  text-sm">Required</p>}
      </div>
      <div className="relative">
        <input
          required={required}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(
              isFormatNumber ? formatNumber(e.target.value) : e.target.value,
            )
          }
          className="p-4 rounded-md w-full border border-gray-300  text-primary 
                focus:outline-none focus:ring-2 focus:ring-primary "
        />
        {icon && (
          <span className="absolute right-4 top-4 text-gray-500">{icon}</span>
        )}
      </div>
    </div>
  );
}
