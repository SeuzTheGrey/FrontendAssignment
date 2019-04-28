import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import { throws } from 'assert';
//import { relative } from 'path';

class App extends Component {
  render() {


    this.state = {
      response: 0,
      body: ''
    }


// test endpoints
    const props = {
      Url: ['https://cognition.dev.stackworx.cloud/api/status',
        'https://ord.dev.stackworx.io/health',
        'https://api.durf.dev.stackworx.io/health',
        'https://prima.run/health',
        'http://httpstat.us/200',
        'http://httpstat.us/300',
        'http://httpstat.us/401',
        'http://httpstat.us/500',
        'http://httpstat.us/418',
        'http://httpstat.us/501',
        'http://httpstat.us/421']
    }


    //   for (let i = 0; i < Urlarray.length; i++) {
    //     var statusCodeArray = function getIt(Url) {
    //       const request = require('request');
    //       let gotten;
    //        request(Url, ((error, response, body) => {
    //          if (response == undefined) {
    //            this.setState({ response: "Undefined" });
    //          } else {
    //            this.setState({ response: response });
    //          }
    //
    //          this.setState({ response: response, body: body });
    //        }))
    //         .on('response', function (response) {
    //           console.log('Status', response && response.statusCode);
    //         });
    //      }
    //     statusCodeArray(Urlarray[i]);

    //     if (this.state.response == undefined) {
    //       props.status[i].response = "Undefined";
    //     } else {
    //       props.status[i].response = this.state.response;
    //     }

    //     props.status[i].body = this.state.body;
    //   }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Status props={props} />
        </p>
      </div>
    );
  }
}

class Status extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Url: props.props.Url,
      statusCode: [],
      time: new Date().getUTCMinutes()
    }


  }
// request from endpoints
  GetStatus = (Url) => {

    for (let i = 0; i < Url.length; i++) {

      const request = require('request');

      request(Url[i], ((error, response, body) => {

        sessionStorage.setItem('StatusCode' + i, response && response.statusCode);
        sessionStorage.setItem('body' + i, body);
      }))
        .on('response', function (response) {

          console.log('response:', response);
          console.log('Status:', response.statusCode);

        })
        .on('error', function (error) {
          console.error('Error: ', error && error.message)
        });

    }

  }

  StatusTick = () => {

    this.setState({
      time: new Date().getUTCMinutes()
    });
    this.GetStatus(this.state.Url);

  }

  componentDidMount() {
    this.setState({
      time: new Date().getUTCMinutes()
    });
    this.GetStatus(this.state.Url);
  }

  componentDidUpdate() {

    if(this.state.time == this.state.time + 5 )
    {
      this.setState();
      this.StatusTick();
    }

  }

  render() {

    

    var colorToBe = [];
// sets color of the box
    for (let i = 0; i < this.state.Url.length; i++) {
      if (sessionStorage.getItem('StatusCode' + i) == 200) {
        colorToBe[i] = 'green';
      } else if (sessionStorage.getItem('StatusCode' + i) < 200 || sessionStorage.getItem('StatusCode' + i) >= 201) {
        colorToBe[i] = 'red';

      } else {
        colorToBe[i] = 'grey';
      }
    }
// displays the response payload
    function displayPayload(payload) {

      return (

        alert(payload)

      );

    }


// displays the box
// refresh page to display, it doesnt work on first loading of the page.
    return (
      <ul className="box-list">
        <li style={{ backgroundColor: colorToBe[0] }}
          onClick={() => displayPayload(sessionStorage.getItem('body0'))}
          className="box">{sessionStorage.getItem('StatusCode0')}</li>
        <li style={{ backgroundColor: colorToBe[1] }}
          onClick={() => displayPayload(sessionStorage.getItem('body1'))}
          className="box">{sessionStorage.getItem('StatusCode1')}</li>
        <li style={{ backgroundColor: colorToBe[2] }}
          onClick={() => displayPayload(sessionStorage.getItem('body2'))}
          className="box">{sessionStorage.getItem('StatusCode2')}</li>
        <li style={{ backgroundColor: colorToBe[3] }}
          onClick={() => displayPayload(sessionStorage.getItem('body3'))}
          className="box">{sessionStorage.getItem('StatusCode3')}</li>
        <li style={{ backgroundColor: colorToBe[4] }}
          onClick={() => displayPayload(sessionStorage.getItem('body4'))}
          className="box">{sessionStorage.getItem('StatusCode4')}</li>
        <li style={{ backgroundColor: colorToBe[5] }}
          onClick={() => displayPayload(sessionStorage.getItem('body5'))}
          className="box">{sessionStorage.getItem('StatusCode5')}</li>
        <li style={{ backgroundColor: colorToBe[6] }}
          onClick={() => displayPayload(sessionStorage.getItem('body6'))}
          className="box">{sessionStorage.getItem('StatusCode6')}</li>
        <li style={{ backgroundColor: colorToBe[7] }}
          onClick={() => displayPayload(sessionStorage.getItem('body7'))}
          className="box">{sessionStorage.getItem('StatusCode7')}</li>
        <li style={{ backgroundColor: colorToBe[8] }}
          onClick={() => displayPayload(sessionStorage.getItem('body8'))}
          className="box">{sessionStorage.getItem('StatusCode8')}</li>
        <li style={{ backgroundColor: colorToBe[9] }}
          onClick={() => displayPayload(sessionStorage.getItem('body9'))}
          className="box">{sessionStorage.getItem('StatusCode9')}</li>
        <li style={{ backgroundColor: colorToBe[10] }}
          onClick={() => displayPayload(sessionStorage.getItem('body10'))}
          className="box">{sessionStorage.getItem('StatusCode10')}</li>
      </ul>


    );

  }
}





export default App;
