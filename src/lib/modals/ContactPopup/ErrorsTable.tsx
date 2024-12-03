import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/table";

const ErrorsTable = ({ data, errorsTableDataType }: any) => {
  if (data.length === 0) return null;

  const columns = Object.keys(data[0]);
  return (
    <div className="mt-10 max-h-[260px] overflow-y-auto">
      <Table>
        <TableHeader>
          {errorsTableDataType === "invalid_rows" ? (
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className="w-[100px]">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          ) : errorsTableDataType === "invalid_phones" ? (
            <TableRow>
              <TableHead className="w-[100px]">S No.</TableHead>
              <TableHead className="w-[100px]">Phone Number</TableHead>
              <TableHead className="w-[100px]">Error Message</TableHead>
            </TableRow>
          ) : (
            <TableRow>
              <TableHead className="w-[100px]">S No.</TableHead>
              <TableHead className="w-[100px]">Phone Number</TableHead>
              <TableHead className="w-[100px]">Error Message</TableHead>
            </TableRow>
          )}
        </TableHeader>
        <TableBody>
          {data.map((row: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              {errorsTableDataType === "invalid_rows" ? (
                columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="font-medium">
                    {Array.isArray(row[column]) ? (
                      <ul>
                        {row[column].map((item: any, itemIndex: number) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      row[column]
                    )}
                  </TableCell>
                ))
              ) : errorsTableDataType === "invalid_phones" ? (
                <>
                  <TableCell className="font-medium">{rowIndex}</TableCell>
                  <TableCell className="font-medium">{row}</TableCell>
                  <TableCell className="font-medium">
                    Invalid phone number
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="font-medium">{rowIndex}</TableCell>
                  <TableCell className="font-medium">{row}</TableCell>
                  <TableCell className="font-medium">
                    Duplicate phone number
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ErrorsTable;
