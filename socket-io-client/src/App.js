import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

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
                The temperature in Campina Grande, Brazil is:
                <br />
                {response.temperature} °F at {(new Date(response.time*1000)).toString()}
              </h1>

          :
          <FadeLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={true}
          />
        }
      </div>
    );
  }
}
export default App;
