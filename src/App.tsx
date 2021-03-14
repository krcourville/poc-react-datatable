import React, { useState, useEffect } from "react";
import axios from "axios";

import "./components/datatable/DataTable.css";

import { DataTable, ColumnDef } from "./components/datatable";
import { PhotoCell } from "./components/PhotoCell";

interface DataItem {
  id: number;
  fname: string;
  lname: string;
}

const columns: ColumnDef[] = [
  { key: "fname", caption: "First Name" },
  { key: "lname", caption: "Last Name" },
  {
    key: "photo",
    caption: "Photo",
    textAlign: "center",
    cellRenderer: PhotoCell
  }
];

const keySelector = (row: DataItem) => row.id;

const getData = async () => {
  const { data } = await axios.get("https://randomuser.me/api/", {
    params: {
      results: 20
    }
  });
  return data.results.map((item: any) => ({
    id: item.email,
    fname: item.name.first,
    lname: item.name.last,
    photo: item.picture.thumbnail
  }));
};

const App = () => {
  const [rows, updateRows] = useState<DataItem[]>([]);
  const [selectedRows, updateSelectedRows] = useState<DataItem[]>([]);
  useEffect(() => {
    getData().then(updateRows);
  }, []);
  const handleRowSelectionChange = (selectedRows: unknown[] = []) => {
    updateSelectedRows(selectedRows as DataItem[]);
  };
  return (
    <section>
      {selectedRows.length > 0 && (
        <div>
          <label>Selected People;</label>
          <ul>
            {selectedRows.map((row) => (
              <li key={`${row.fname}-${row.lname}`}>
                {row.fname} {row.lname}
              </li>
            ))}
          </ul>
        </div>
      )}

      <DataTable
        columns={columns}
        rows={rows}
        selectedRows={selectedRows}
        keySelector={keySelector}
        onRowSelectionChange={handleRowSelectionChange}
      />
    </section>
  );
};

export default App;