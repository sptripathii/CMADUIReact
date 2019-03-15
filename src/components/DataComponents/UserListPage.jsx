import React from "react";
import { fetchUsers } from "../../rest/userAjax.js";
import userStore from "../../stores/userStore.js";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "80%",
    marginTop: "180px",
    overflowX: "auto"
  },
  table: {
    minWidth: 500,
    borderStyle: "groove",
    marginTop: "60px"
  },
  divTag: {
    marginTop: "60px"
  }
});
const tableStyle = {
  marginTop: "60px",
  borderStyle: "groove"
};
class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      anchorEl: null
    };
    userStore.subscribe(() => {
      console.log(
        "UserList::Updating userlist view" + userStore.getState().user
      );
      this.forceUpdate();
    });
  }

  componentWillMount() {
    this.setState(fetchUsers(this.props.authToken));
  }

  render() {
    var myrows = userStore.getState().userList;
    if (myrows !== undefined && myrows.length > 0)
      return (
        <div className={styles.divTag}>
          <Paper className={styles.root}>
            <Table style={tableStyle}>
              <TableHead style={headStyle}>
                <TableRow>
                  <TableCell align="center" borderStyle="groove">
                    User Id
                  </TableCell>
                  <TableCell align="center" borderStyle="groove">
                    User Name
                  </TableCell>
                  <TableCell align="center" borderStyle="groove">
                    Devices
                  </TableCell>
                  <TableCell align="center" borderStyle="groove">
                    Refresh Interval
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myrows.map(row => (
                  <TableRow borderStyle="groove" key={row.userid}>
                    <TableCell align="center" borderStyle="groove">
                      {row.userid}
                    </TableCell>
                    <TableCell align="center" borderStyle="groove">
                      {row.userName}
                    </TableCell>
                    <TableCell align="center" borderStyle="groove">
                      {row.devices}
                    </TableCell>
                    <TableCell align="center" borderStyle="groove">
                      {row.refreshInterval}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    return <div />;
  }
}

const headStyle = {
  backgroundColor: "#4969d4",
  background: "#439ce2",
  color: "#f2f2f2",
  fontSize: "1em",
  fontWeight: "800",
  border: "rgba(0, 0, 0, 0.87)",
  borderStyle: "solid",
  top: "60px"
};

export default withStyles(styles)(UserListPage);
