class Clock extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
  function tick() {
    root.render(<Clock date={new Date()} />);
  }
  
  setInterval(tick, 1000);

/*this example converts the function to class.
1.create one calss ES6, with the same name, extending React.component.
2.add a unic method empty called render().
3.move the body of the function to the method render().
4.Replace props to this.propsin the body of the render().
5.delete the declaration of the function empty remaining

Clock is now defined as an class now instead of function

the method render will be called always when an refresh happens, but
when we render <Clock> in the same DOM, only when one exclusivly instance
of the class Clock will be used. this allow us to make more resources,
like a local state and the methods.
*/