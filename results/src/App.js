import React from "react";
import PropTypes from "prop-types";


class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.txt}</h1>
        <b>Bold</b>
      </div>
    )
  }
}

App.defaultProps = {
  txt: "tihis is default"
}

export default App