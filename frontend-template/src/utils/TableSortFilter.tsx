import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const TableSortFilter = ({ type, valueToCompare }: any) => {
  if (type === "text") {
    return {
      sorter: (a: any, b: any) => {
        a = a[valueToCompare] || "z";
        b = b[valueToCompare] || "z";
        return a.localeCompare(b);
      },
    };
  }
  if (type === "number") {
    return {
      sorter: (a: any, b: any) => {
        return (
          (b[valueToCompare] || a[valueToCompare]) &&
          a[valueToCompare] - b[valueToCompare]
        );
      },
    };
  }
  if (type === "date") {
    return {
      sorter: (a: any, b: any) => {
        a = a[valueToCompare] || dayjs(8640000000000000);
        b = b[valueToCompare] || dayjs(8640000000000000);
        // @ts-ignore
        return dayjs(a) - dayjs(b);
      },
    };
  }
};

export default TableSortFilter;
