import React from "react";
import { withRouter } from "react-router-dom";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>test</div>;
  }
}

export default withRouter(Test);
