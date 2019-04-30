import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: {},
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {response.temperature && response.time
          ?
              <h1>
                The temperature in San Diego is:
                <br />
                {response.temperature} °F at {(new Date(response.time*1000)).toString()}
              </h1>

          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;
