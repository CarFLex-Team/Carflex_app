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

export default function SheetTable<T>({
  title,
  columns,
  data,
  action,

  isLoading = false,
  onRowClick,
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl bg-white p-5 m-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
        {action}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse ">
          <thead>
            <tr className="border-b border-gray-300  text-center text-sm text-gray-500 ">
              {columns.map((col, i) => (
                <th key={i} className="p-2 min-w-20 ">
                  {col.header}
                </th>
              ))}
              {renderActions && <th className="text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={renderActions ? columns.length + 1 : columns.length}
                  className="py-6 text-center text-sm text-gray-500"
                >
                  <LoadingSpinner />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={renderActions ? columns.length + 1 : columns.length}
                  className="py-6 text-center text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`border border-gray-300 ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="py-3 px-2 text-sm  whitespace-nowrap 
             overflow-auto 
              max-w-42 text-center border border-gray-300"
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
