class Hello extends React.Component {
    render() {
      return <div>Hello {this.props.toWhat}</div>;
    }
  }
  
  ReactDOM.render(
    <Hello toWhat="World" />,
    document.getElementById('root')
  );

  /*pode ser compilado para esse código que não usa JSX: */

  class Hello extends React.Component {
    render() {
      return React.createElement('div', null, `Hello ${this.props.toWhat}`);
    }
  }
  
  ReactDOM.render(
    React.createElement(Hello, {toWhat: 'World'}, null),
    document.getElementById('root')
  );

  /*Se você estiver curioso para ver mais exemplos de como JSX é convertido para
   JavaScript, pode checar o compilador online do Babel.

O componente pode ser fornecido como uma string, como uma subclasse de React.Component
 ou como uma função simples.

Se você se cansar de ter que digitar sempre React.createElement, um padrão comum
 é atribuir a função à uma variável auxiliar: */

 const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);

/*Se você utilizar essa forma resumida de React.createElement, pode ser quase tão 
conveniente de utilizar o React sem JSX.

Por outro lado, você pode buscar por projetos da comunidade como react-hyperscript
 e hyperscript-helpers que oferecem uma sintaxe mais amigável. */