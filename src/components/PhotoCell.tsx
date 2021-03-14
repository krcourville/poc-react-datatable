import React from "react";
import { CellRenderProps } from "./datatable";

export function PhotoCell(props: CellRenderProps) {
  const { value } = props;
  return <img src={value} />;
}
