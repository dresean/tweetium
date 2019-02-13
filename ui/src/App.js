import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('https://tweetium.herokuapp.com/users')
    .then(res => {
      const users = res.data
      this.setState({users})
    })
    .catch(err => {
      console.log('err')
    })
  }
  render() {
    const user = this.state.users.slice()
    const mapped = user.map(item => {
      return(
      <div key={item.userId}>
        <li>
          {item.name} {item.age}
        </li>
      </div>
      )  
    })
    return (
      <div className="App">
        <ul>
          {mapped}
        </ul>
      </div>
    );
  }
}

export default App;
