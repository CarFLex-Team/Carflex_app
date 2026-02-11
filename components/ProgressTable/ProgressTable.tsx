import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export type TableColumn<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  title?: string;
  columns: TableColumn<T>[];
  data: any[];
  action?: React.ReactNode;

  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  renderActions?: (row: T) => React.ReactNode;
};

export default function ProgressTable<T>({
  title,
  columns,
  data,
  action,

  isLoading = false,
  onRowClick,
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="flex flex-col rounded-xl p-5 shadow-sm h-full ">
      {/* Header */}
      {title && (
        <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      )}
      <h3 className="text-sm text-gray-400"> prev/current month</h3>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse h-full">
          <thead>
            <tr className="border-b border-gray-300 text-center text-sm text-gray-500">
              {columns.map((col, i) => (
                <th key={i} className="p-2 min-w-20">
                  {col.header}
                </th>
              ))}
              {renderActions && <th className="text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`border border-gray-300 ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-3 px-2 text-sm whitespace-nowrap text-center border border-gray-300"
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.accessor!] as React.ReactNode)}
                  </td>
                ))}
                {renderActions && (
                  <td className="text-center">{renderActions(row)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
