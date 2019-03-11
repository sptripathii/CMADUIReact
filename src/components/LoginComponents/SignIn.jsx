// import React from "react";
// import { onLogin } from "../../rest/ajax.js";
// import store from "../../stores/store.js";
// import loginStyle from "./loginStyle.css";
// import { graphql } from "react-apollo";
// import gql from "graphql-tag";

// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "admin2",
//       password: "admin2",
//       isAuthenticated: false
//     };

//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     onLogin(this.state.username, this.state.password);
//     this.props.history.push("/dashboard");
//   }

//   onUserNameChange(e) {
//     this.setState({ username: e.target.value });
//   }

//   onPasswordChange(e) {
//     this.setState({ password: e.target.value });
//   }

//   render() {
//     return (
//       <div className="inner-container">
//         <div className="header">Login</div>
//         <div className="box">
//           <div className="input-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               name="username"
//               className="login-input"
//               placeholder="Username"
//               onChange={this.onUserNameChange.bind(this)}
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="login-input"
//               placeholder="Password"
//               onChange={this.onPasswordChange.bind(this)}
//             />
//           </div>

//           <button
//             type="button"
//             className="login-btn"
//             onClick={this.onSubmit.bind(this)}
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default SignIn;
