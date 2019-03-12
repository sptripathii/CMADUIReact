import React from "react";
import logo from "../../images/logo.png"; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

const logoStyle = {
  height: "200px"
};
export function Logo() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" style={logoStyle} />;
}
