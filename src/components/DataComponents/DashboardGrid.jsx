import React from "react";
import ReactDataGrid from "react-data-grid";
import { fetchLogsForGrid } from "../../rest/ajax.js";
import store from "../../stores/store.js";
import InfiniteScroll from "react-infinite-scroller";

const defaultColumnProperties = {
  sortable: true,
  width: 280,
  background: "#4969d4"
};

// FOr scrollbar
// .react-grid-Canvas {
//   overflow: auto;
//  }

const columns = [
  { key: "id", name: "ID", resizable: true, width: 10 },
  { key: "ipaddress", name: "SOURCE IP", resizable: true },
  { key: "type", name: "SEVERITY", sortDescendingFirst: true },
  { key: "message", name: "DESCRIPTION", resizable: true, width: 320 },
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
    fetchLogsForGrid(this.props.authToken);
    console.log("Grid constructor...", store.getState());
    this.hasMore = true;
    this.initialLoad = true;
    this.loadMore = this.loadMore.bind(this);
    //this.loadFunc = this.handleChange.bind(this);
  }
  componentDidUpdate() {
    this.attachScrollListener();
  }
  componentDidMount() {
    fetchLogsForGrid(this.props.authToken);
  }

  attachScrollListener() {
    if (this.props.initialLoad) {
      this.scrollListener();
    }
  }

  loadMore() {
    this.hasMore = false;
    fetchLogsForGrid(this.props.authToken);
    this.hasMore = true;
    this.initialLoad = false;
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

  // loadFunc() {
  //   fetchLogsForGrid(this.props.authToken, this.state.page);
  //   this.setState({ pageNumber: pageNumber + 1 });
  // }

  render() {
    //const [rows, setRows] = useState(50);
    return (
      //\<div
      //   style={{ overflowY: "auto", height: "100vh" }}
      //   ref={ref => (this.scrollParentRef = ref)}
      // >
      <div>
        <div id="scrollableDiv" style={{ overflow: "auto" }}>
          <InfiniteScroll
            dataLength={400}
            initialLoad={this.initialLoad}
            loadMore={this.loadMore}
            hasMore={this.hasMore}
            //loader={<h4>Fetching next set of records</h4>}
            scrollableTarget="scrollableDiv"
          >
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
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default DashboardGrid;
