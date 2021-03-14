import React from "react";
import { DataTableProps } from "./DataTableProps";
import { ColumnDef } from "./interfaces";
import { Table } from "./TableView";

function getDefaultColumns(rows: any[]): ColumnDef[] {
  return Object.keys(rows[0]).map((key) => ({
    key,
    caption: key
  }));
}

function ensureColumns(
  columns: ColumnDef[] = [],
  rows: unknown[] = []
): ColumnDef[] {
  if (columns.length > 0) return columns;
  if (rows.length === 0) return [];

  return getDefaultColumns(rows);
}

function NoDataView() {
  return <div>No Data</div>;
}

export function DataTable(props: DataTableProps) {
  const { rows = [], columns } = props;

  const hasData = rows.length > 0;
  const View = hasData ? Table : NoDataView;
  const viewProps = {
    ...props,
    rows,
    columns: ensureColumns(columns)
  };

  return (
    <section className="data-table">
      <View {...viewProps} />
    </section>
  );
}
