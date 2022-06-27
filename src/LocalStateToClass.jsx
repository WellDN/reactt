class Clock extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  } //replace the props and put an state


  //add an constructor class that add the inicial data in this.state:

  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }  //the props goes to the constructor now (constructor(props)) super(props) this.state = {date: new Date()};

  //components of classes should always call the constructor with props. constructor(props).
  

  

