const progressColumns = [
  {
    header: "Employee",
    accessor: "employeeName",
  },
  {
    header: "Cars Sent Progress",
    accessor: "carsSentProgress",
    render: (row: any) => (
      <span
        className={`font-bold ${
          row.carsSentProgress > 0
            ? "text-green-600"
            : row.carsSentProgress < 0
              ? "text-red-600"
              : "text-gray-600"
        }`}
      >
        {row.carsSentProgress > 0 ? "▲" : row.carsSentProgress < 0 ? "▼" : "—"}
        {row.carsSentProgress}%
      </span>
    ),
  },
  {
    header: "Average Time Progress",
    accessor: "averageTimeProgress",
    render: (row: any) => (
      <span
        className={`font-bold ${
          row.averageTimeProgress > 0
            ? "text-green-600"
            : row.averageTimeProgress < 0
              ? "text-red-600"
              : "text-gray-600"
        }`}
      >
        {row.averageTimeProgress > 0
          ? "▲"
          : row.averageTimeProgress < 0
            ? "▼"
            : "—"}{" "}
        {row.averageTimeProgress}%
      </span>
    ),
  },
];
export default progressColumns;
