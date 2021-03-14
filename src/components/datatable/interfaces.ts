export type TextAlignment = "left" | "center" | "right";

export interface ColumnDef {
  key: any;
  caption: string;
  textAlign?: TextAlignment;
  cellRenderer?: Function;
}

export interface CellRenderProps {
  value: any;
}

export interface RowSelectionChange {
  type: 'RowSelectionChange'
}

export interface RowEditModeChange {
  type: 'RowEditModeChange'
}

export type DataTableCallback = RowSelectionChange | RowEditModeChange;

