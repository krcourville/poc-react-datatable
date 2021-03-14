import React from "react";
import { CellRenderProps, ColumnDef } from "./interfaces";

const resolveTableCellClasses = (col: ColumnDef) => {
  return [`text-${col.textAlign || "left"}`].join(" ");
};

function DefaultCellRenderer(props: CellRenderProps) {
  const { value } = props;
  return <span>{value}</span>;
}

export interface CellProps {
  column: ColumnDef;
  value: unknown;
}

function Cell(props: CellProps) {
  const { column } = props;
  const CellValue = column.cellRenderer ?? DefaultCellRenderer;
  return <CellValue {...props} />;
}

interface TableRowProps {
  row: any;
  columns: ColumnDef[];
  onClick: (item: unknown) => void;
  selected: boolean;
}

function TableRow(props: TableRowProps) {
  const { row, columns, onClick, selected } = props;

  const handleRowClick = (
    _evt: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ): void => {
    onClick(row);
  };

  return (
    <tr onClick={handleRowClick} className={selected ? "selected" : undefined}>
      {columns.map((col) => (
        <td key={col.key} className={resolveTableCellClasses(col)}>
          <Cell column={col} value={row[col.key]} />
        </td>
      ))}
    </tr>
  );
}

export interface TableProps  {
  rows: any[];
  selectedRows: any[];
  columns: ColumnDef[];
  keySelector: (row: any) => any;
  onRowSelectionChange?: (rows: unknown[]) => void;
}

export function Table(props: TableProps) {
  const { columns, rows, keySelector, onRowSelectionChange, selectedRows} = props;

  const handleItemClick = (item: unknown): void => {
    const exists = selectedRows.includes(item);
    const next = exists
      ? selectedRows.filter((f) => f !== item)
      : [...selectedRows, item];
    onRowSelectionChange && onRowSelectionChange(next);
  };

  const isSelected = (item: unknown) => selectedRows.includes(item);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className={resolveTableCellClasses(col)}>
              {col.caption}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <TableRow
            key={keySelector(row)}
            row={row}
            columns={columns}
            onClick={handleItemClick}
            selected={isSelected(row)}
          />
        ))}
      </tbody>
    </table>
  );
}
