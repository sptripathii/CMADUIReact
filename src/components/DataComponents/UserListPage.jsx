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
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 500
  }
});

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
        <Paper className={styles.root}>
          <Table className={styles.table}>
            <TableHead style={headStyle}>
              <TableRow>
                <TableCell align="center">User Id</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Devices</TableCell>
                <TableCell align="center">Refresh Interval</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myrows.map(row => (
                <TableRow key={row.userid}>
                  <TableCell align="center">{row.userid}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.devices}</TableCell>
                  <TableCell align="center">{row.refreshInterval}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    return <div />;
  }
}

const headStyle = {
  background: "#3f51b5"
};

export default withStyles(styles)(UserListPage);
