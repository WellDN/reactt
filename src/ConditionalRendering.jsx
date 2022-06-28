/*in React, you can create distinct components that encapsulate the behavior that you need.
So, you can render only some elements, depending the state of our application.
 Rendering conditional in React works the same way as conditions works in JavaScript.
 use javascript operator as if or conditional operator to create elements representating
 the current state, and let React refresh the UI to match them. consider these two components:*/

 function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }

  /*we ill create a component Greeting that shows one of the two components if the user
  are logged in or not:*/

  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
  
  ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
  ); /*this version renders one 'greeting' differently depending the value of the props isLoggedIn.

 Element Variables: you can use variables to save elements. this can help to render
 conditionally the part of the component while the others results doesnt change.

consider these two new components representating the buttons of the logout and login:*/

function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }

  /* in the example below, ill be created an stateful component called LoginControl.

  The component ill render the <LoginButton /> or <LogoutButton /> depending of the
  current state. and it ill render <Greeting /> too. ex:*/

  class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }
  
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <LoginControl />,
    document.getElementById('root') //this code is a login & logout button.
  );

  /*Declare one variable and use one conditional declaration 'if' is a great way to render
  a component, but sometimes you could use a shorter syntax. Existe some ways to use
  inline conditions in JSX, explained below.

  If inline with the Logic Operator &&

  you can incorporate expressions in JSX encapsulating in keys. this includes an 
  logic operator && of Javascript. this can be convenient to include one element 
  conditionally:*/

  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
  
  const messages = ['React', 'Re: React', 'Re:Re: React'];
  ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
  ); 

  /* this works why in JavaScript, true ** expression are always avaiable as expression,
  and false && expression are always avaiable as false.

  Therefore, if the condition is true, the element ill after && appears in the result. If
  the element is false, React ill ignore.

  Note that return one false expression still making the element after && ill be jumped,
  but ill return th expression false. In the expression below, <div>0</div> ill return for
  rendering method.*/

  render() {
    const count = 0;
    return (
      <div>
        { count && <h1>Messages: {count}</h1>}
      </div>
    );
  }
/*
If-Else inline with Conditional Operator: Another method to render inline elements is
use the conditional operator in JavaScript condition ? true : false. 

in the example belo, ill use to render conditionally a little text block:*/

render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    );
  }

  /*can too be used to longer expressions, although what its happening be less obvious:*/

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {isLoggedIn
          ? <LogoutButton onClick={this.handleLogoutClick} />
          : <LoginButton onClick={this.handleLoginClick} />
        }
      </div>
    );
  }
  
  /*Just like JavaScript, you can decide the apropriated styled as base in whatever your team
  consider more readable.
  Rerember if always all the conditions became a lot complex, it can be a good moment to
  extract components.
  
  Avoiding a Component be Rendered
  
  in rare cases you can wish that a component hide even if it already get rendered to 
  another component. to do this, return null instead the rendered result.
  
  In the example below, the <WarningBanner /> is rendered depending the value of the prop
  called warn. if the prop value is false, the component isnt rendered:*/

  function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }
  
    return (
      <div className="warning">
        Warning!
      </div>
    );
  }
  
  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showWarning: true};
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }
  
    handleToggleClick() {
      this.setState(state => ({
        showWarning: !state.showWarning
      }));
    }
  
    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? 'Hide' : 'Show'}
          </button>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Page />,
    document.getElementById('root') //this code make an hide button returnung null on render.
  );

  /*Turn back null of the render method of the component dont affect the activation of
  the methods of the cicle of life of the component. For example, the method
  ComponentidUpdate ainda será chamado. */