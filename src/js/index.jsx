import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';


class QuoteRandom extends React.Component{
  constructor(props){
    super(props);
    
    this.state={
      quotes:[],
      author: ''
    }
    
    this.decideClick = this.decideClick.bind(this)
    this.decideLoad = this.decideLoad.bind(this)
  }
  
   componentDidMount() {
    this.decideLoad.bind(this)
      window.addEventListener('load', this.decideLoad);
      
   }

   decideLoad() {
    let currentComponent = this;
    fetch('https://talaikis.com/api/quotes/')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        response.json().then(function(data) {
         response = data;
         

         currentComponent.setState({
                quotes:response
            })
            currentComponent.setState({author: currentComponent.state.quotes[Math.floor((Math.random() * 50) + 1)]});
         console.log(currentComponent.state.author)
        });
      }
    )
   }
  
   decideClick() {
    this.setState({author: this.state.quotes[Math.floor((Math.random() * 50) + 1)]})
  }
  
  render(){
    return(
      <div className="container">
   
        <h2 className="quote">{this.state.author.quote} 
        </h2>
        <h5 className="quote">"{this.state.author.author}" 
        </h5>
        <h5>category - {this.state.author.cat}</h5>
        <button onClick={this.decideClick}>Next Quote</button>
      </div>
    )
  }
}

render(<QuoteRandom/>,document.getElementById('quote'));