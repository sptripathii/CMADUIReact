import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { fetchLogsForGrid } from "../../rest/ajax.js";
import store from "../../stores/store.js";

const defaultColumnProperties = {
  sortable: true,
  width: 320
};

const columns = [
  { key: "id", name: "ID", resizable: true },
  { key: "ipaddress", name: "SOURCE IP", resizable: true },
  { key: "type", name: "SEVERITY", sortDescendingFirst: true },
  { key: "message", name: "DESCRIPTION" },
  { key: "timestamp", name: "TIMESTAMP" }
].map(c => ({ ...c, ...defaultColumnProperties }));

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

class DashboardGrid extends React.Component {
  // const [rows, setRows] = useState(store.getState().logs);
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {});
  };

  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.forceUpdate();
    });
    fetchLogsForGrid();
    console.log("Grid constructor...", store.getState());
  }

  //   onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
  //     this.setState(state => {
  //       alert("I am called");
  //       const rows = state.rows.slice();
  //       alert(rows[0].ipaddress.value);
  //       for (let i = fromRow; i <= toRow; i++) {
  //         rows[i] = { ...rows[i], ...updated };
  //       }
  //       return { rows };
  //     });
  //   };

  render() {
    //const [rows, setRows] = useState(50);
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => store.getState().logs[i]}
        rowsCount={store.getState().logs.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        onGridSort={(sortColumn, sortDirection) =>
          sortRows(sortColumn, sortDirection)
        }
        enableCellSelect={true}
      />
    );
  }
}

export default DashboardGrid;
