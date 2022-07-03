/*Na medida em que sua aplicação cresce, você pode capturar muitos bugs com checagem
 de tipos. Em algumas aplicações, você pode usar extensões do JavaScript como Flow ou
  TypeScript para checar os tipos de toda a sua aplicação. Porém, mesmo se você não
   usá-las, React possui algumas habilidades de checagem de tipos nativas. Para
    executar a checagem de tipos nas props para um componente, você pode atribuir à
     propriedade em especial propTypes: */

     import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};

/*Neste exemplo, estamos usando um componente de classe, mas a mesma funcionalidade
 também pode ser aplicada a componentes de função ou componentes criados por React.memo
  ou React.forwardRef.

PropTypes exporta uma variedade de validadores que podem ser usados para certificar que
 os dados que você recebe são válidos. Neste exemplo, utilizamos PropTypes.string.
  Quando um valor inválido for fornecido a uma prop, um alerta será exibido no console
   JavaScript. Por motivos de performance, propTypes é checado apenas em modo de
    desenvolvimento.

PropTypes
Aqui está um exemplo documentando os diferentes tipos de validadores fornecidos: */

import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // A React element type (ie. MyComponent).
  optionalElementType: PropTypes.elementType,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A required value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};

/*Exigindo Filho Único (Single Child)
Com PropTypes.element você pode especificar que apenas um único filho pode ser passado
 para um componente como children. */

 import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

/*Valores Padrão de Props (Default Prop Values)

Você pode definir valores padrão (default) para suas props através da atribuição à
 propriedade especial defaultProps: */

 class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }
  
  // Specifies the default values for props:
  Greeting.defaultProps = {
    name: 'Stranger'
  };
  
  // Renders "Hello, Stranger":
  ReactDOM.render(
    <Greeting />,
    document.getElementById('example')
  );

  /*Se você está usando um plugin Babel como plugin-proposal-class-properties, você
   também poderá declarar defaultProps como propriedade estática dentro de uma classe
    de componente React. Essa sintaxe ainda não foi finalizada e irá exigir uma etapa
     de compilação para funcionar em um navegador. Para mais informações, veja
      proposal-class-fields. */

      class Greeting extends React.Component {
        static defaultProps = {
          name: 'stranger'
        }
      
        render() {
          return (
            <div>Hello, {this.props.name}</div>
          )
        }
      }

      /*A defaultProps será usada para garantir que this.props.name tenha um valor caso
       não tenha sido especificado pelo componente pai. A checagem de tipos de
        propTypes acontece após defaultProps ser resolvida, logo a checagem também será
         aplicada à defaultProps.

         Function Componentes
Se você estiver usando function componentes em seu desenvolvimento, pode desejar fazer
 algumas pequenas alterações para permitir que os PropTypes sejam aplicados
  corretamente.

Digamos que você tenha um componente como este:
 */

export default function HelloWorldComponent({ name }) {
    return (
      <div>Hello, {name}</div>
    )
  }

  /*Para adicionar PropTypes, você pode declarar o componente em uma função separada
   antes de exportar, da seguinte forma: */

   function HelloWorldComponent({ name }) {
    return (
      <div>Hello, {name}</div>
    )
  }
  
//  export default HelloWorldComponent

  /*Então, você pode adicionar PropTypes diretamente ao HelloWorldComponent: */

  import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

//HelloWorldComponent.propTypes = {
  name: PropTypes.string
//}

//export default HelloWorldComponent