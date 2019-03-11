import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import { fetchLogsForGrid } from "../rest/ajax.js";
import store from "../stores/store.js";

const columns = [
  { key: "ipaddress", name: "SOURCE IP", resizable: true },
  { key: "type", name: "SEVERITY", sortDescendingFirst: true },
  { key: "message", name: "DESCRIPTION" },
  { key: "timestamp", name: "TIMESTAMP", sortDescendingFirst: true }
].map(c => ({ ...c, ...defaultColumnProperties }));

const defaultColumnProperties = {
  sortable: true,
  width: 120
};

const sortRows = (sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return [...rows].sort(comparer);
};

class Grid extends React.Component {
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
  render() {
    return (
      <div className="grid">
        <ReactDataGrid
          columns={columns}
          rowGetter={i => store.getState().logs[i]}
          rowsCount={10} //store.getState().logs.length}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
      </div>
    );
  }
}

export default Grid;
