import React from 'react';
import logo from './logo.svg';
import './App.css';


class PostForm extends React.Component {
  constructor(props) {
    super(props); 
      this.state = { boast_or_roast: true, post: ''}
    }
    myChangeHandler = (event) => {
      this.setState({post: event.target.value});
      console.log(this.state)
    }
    myBandRHandler = (event) => {
      this.setState({ boast_or_roast: event.target.checked });
      console.log(this.state)
    }
    myHandlerSumbit = async (event) => {
      event.preventDefault();
      const response = await fetch('http://localhost:8000/post/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({post: this.state.post,
          boast_or_roast: this.state.boast_or_roast})
      });
      const data = await response.json();
      window.location.reload() 
    }
  render() {
    return (
      <form onSubmit={this.myHandlerSumbit}>
        <input type='text' onChange={this.myChangeHandler}></input>
        <input type='submit'></input>
        <input type='checkbox' checked={this.state.boast_or_roast} onChange={this.myBandRHandler}></input>
        
      </form>
    )
  }
}

// class VotesForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { up_votes: 0, down_votes: 0 }
//   }
//   myUpVoteHandler = (event, id) => {
//     event.preventDefault();
//     const upVote = this.state.posts.map((data) => {

//     })
//   }
// }

class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
      posts: []
   }
 }
  async componentDidMount(){
    try {
      const res = await fetch('http://localhost:8000/post/');
      const posts = await res.json();
      this.setState({
        posts
      });
    }
  finally{} } 
 
  render() {
    return (
      <>
      <div>
        <PostForm></PostForm>
        <ul>
          {this.state.posts.map((data) => (
            <li>
              Boast or Roast: {`${data.boast_or_roast}`}<br></br>
              Post: {data.post}<br></br>
              Up Votes: {data.up_votes}<br></br>
              Down Votes: {data.down_votes}<br></br>
              Posted: {data.submission_time}<br></br>
              <br></br>
            </li>

          ))}
        </ul>
      </div></>
    )
  }
}

export default App;
