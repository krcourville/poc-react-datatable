import { ColumnDef } from "./interfaces";

export interface DataTableProps {
  rows: any[];
  selectedRows: any[];
  columns?: ColumnDef[];
  keySelector: (row: any) => any;
  onRowSelectionChange?: (rows: unknown[]) => void;
}
