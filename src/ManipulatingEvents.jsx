function Form() {
    function handleSubmit(e) {
      e.preventDefault();
      console.log('Você clicou em enviar.');
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Enviar</button>
      </form>
    );
  }

  /*heres 'e' is a synthetic event. the React define these events syntethics accordingly
  with the specification W3C. so, we dont need be afraid with the compatibility between
  browsers. the events React dont work exacly the same way that the native events.
  React generally you dont need to call addEventListener to add liesteners when our
  element is initially rendered.
  when you define a component using one class ES6, one common pattern is that one events
  manipulator be the method in the class.
   Example, this component Toogle render one botton
  that allows the user toggle between the states 'ON' & 'OFF': */
  class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // Aqui utilizamos o `bind` para que o `this` funcione dentro da nossa callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
  
/*need to be careful with the meaning of this in the callbacks JSX. In JavaScript, the class
methods are not linked by default. if you forgot to bind this.handleClick and take him to
onClick, 'this' ill be undefined when a function ill be actually called.

this isn't a specific pattern of React. it is one part of the how functions works at javascript.
generally, if you refer one method without () after him, like onClick={this.handleClick},
you have to do bind manual of this method.

if call 'bind' all the time bothers you, it have 2 ways to do it. if you are using the
experimental syntax you can link callbacks correctly:*/

class LoggingButton extends React.Component {
    // Essa sintaxe garante que o `this` seja vinculado ao handleClick.
    // Atenção: essa é uma sintaxe *experimental*.
    handleClick = () => {
      console.log('this is:', this);
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          Clique Aqui
        </button>
      );
    }
  } //this syntax are habillited by default in Create React App.

/*if you dont are using the class fields syntax, you can use one arrow function as callback: */

class LoggingButton extends React.Component {
    handleClick() {
      console.log('this is:', this);
    }
  
    render() {
      // Essa sintaxe garante que o `this` seja vinculado ao handleClick.
      return (
        <button onClick={() => this.handleClick()}>
          Click me
        </button>
      );
    }
  }

  /*the problem of this syntax is that one different callback is created always when you LoggingButton is rendered.
  in the majority of cases, its ok. but, if this callback pass though inferior components
  through the props, these components ill do one extra rendering.
  generally the recommended is constructor link or the field syntax class to deny this type of 
  perfomance problem.
  
  Passing Arguments to Events Manipulators
  
  inside of a repetition structure, its common want to pass one extra parameter to one 
  event manipulator. for example, if id is ID of line identification,  any of them 2 ll work:*/

/*<button onClick={(e) => this.deleteRow(id, e)}>Deletar linha</button>
<button onClick={this.deleteRow.bind(this, id)}>Deletar linha</button>

  the 2 lines above are equally and they use arrow functgions & Function.prototype.bind respectively.
  
  and both cases, the argument 'e' representating the event of React ill be passing
  the second argument after the ID. with one arrow function, we have to pass it explicity.
  but with the 'bind' another plus arguments ill be automatically forwarded. */