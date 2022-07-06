import { render } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; //ES6
var ReactTestUtils = require('react-dom/test-utils'); //ES5 com npm

/*Visão Geral
ReactTestUtils torna fácil para testar componentes em React utilizando framework de
 teste à sua escolha. No Facebook, nós utilizamos Jest para testar JavaScript sem
  dores. Aprenda como utilizar o Jest através do website do Jest Tutorial para React.

Nota:

Nós recomendamos usar o react-testing-library que é projetado para permitir e
 encorajar escrita de testes que utilizam seus componentes como os usuários finais
  utilizarão.

Para versões do React <= 16, a biblioteca Enzyme torna mais fácil afirmar(assert),
 manipular e analisar a saída dos componentes do React.

act()
mockComponent()
isElement()
isElementOfType()
isDOMComponent()
isCompositeComponent()
isCompositeComponentWithType()
findAllInRenderedTree()
scryRenderedDOMComponentsWithClass()
findRenderedDOMComponentWithClass()
scryRenderedDOMComponentsWithTag()
findRenderedDOMComponentWithTag()
scryRenderedComponentsWithType()
findRenderedComponentWithType()
renderIntoDocument()
Simulate
Referência
act()
Para preparar um componente para determinações, coloque o código de renderização e de
 atualizações dentro de uma chamada act(). Isso faz com que o teste rode mais próximo
  de como React funciona no browser.

Nota:

Se você usa react-test-renderer, ele provê um exportador de act que se comporta da
 mesma maneira.

Por exemplo, vamos dizer que nós temos esse componente Counter: */

class Counter extends React.Component {  //needs react.component to constructor&state
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {                                 //lifecycle componentDidMount to start determinate the start of the lifecycle
        document.title = `Você clicou ${this.state.count} 
        vezes`;
    }
    componentDidUpdate() {                              //lifecycle 2nd part of the lifecycle in that case update to determinate the refresh per time giving a update function to the element.
        document.title = `Você clicou ${this.state.count}
        vezes`;
    }
    handleClick() {                                    //handleClick are receiving the state count + 1 attribute, that make it count + 1 time each click.
        this.setState(state => ({
            count: state.count + 1,
        }))
    }
}
//render() {
    return (
        <div>
            <p>Você clicou {this.state.count} vezes</p>
            <button click={this.handleClick}>
                Clique aqui
            </button>
        </div>
    );                                                          //the HTML/DOM reference + the value attribuated inside the button
//}
//}

/*Aqui está como nós podemos testar: */

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Teste da primeira renderização e componentDidMount
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('Você clicou 0 vezes');
  expect(document.title).toBe('Você clicou 0 vezes');

  // Teste do segundo render e componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('Você clicou 1 vezes');
  expect(document.title).toBe('Você clicou 1 vezes');
});

/*Não esqueça que disparando eventos DOM apenas funciona quando o conteúdo do DOM é
 adicionado no document. Você pode usar um auxiliador como react-testing-library para
  reduzir o código de boilerplate.
O documento recipes contém mais detalhes sobre como act() se comporta, como exemplos
 e uso.
mockComponent() */

mockComponent(
    componentClass,
    [mockTagName]
)

/*Passe um módulo de componente mockado para este método para melhorá-lo com métodos
 que permitem a utilização como um dummy componente React. Ao invés de renderizar como
  de costume, o componente vai se tornar um simples <div> (ou outra tag se mockTagName
     for fornecido) contendo qualquer filho fornecido.

Nota:

mockComponent() é uma API legada. Nós recomendamos utilizar jest.mock().

isElement() */

isElement(element)

/*Retorna true se o elemento é um elemento React.*/


//isElementOfType()

isElementOfType(
    element,
    componenetClass
)

/*Retorna true se element é um elemento React cujo tipo é de um React componentClass.

isDOMComponent() */

isDOMComponent(instance)

/*Retorna true se instance é um componente DOM (como <div> ou <span>).

isCompositeComponent() */

isCompositeComponent(instance)

/*retor true se instance é um componente definido pelo usuário, como uma classe ou
função 

isCompositeComponentWithType()*/

isCompositeComponentWithType(
    instance,
    componentClass
)

/*retorna true se instance é um cmponenete cujo tipo é de um React componentClass. 

findAllInRenderedTree()*/

findAllInRenderedTree(
    tree,
    test
)

/*Cruza todos componentes em tree e acumula todos componentes em que test(component)
 seja true. Não é tão útil sozinho, mas é utilizado como primitivo para outros
  utilitários de teste.

scryRenderedDOMComponentsWithClass() */

scryRenderedDOMComponentsWithClass(
    tree,
    className
)

/*Encontra todos elementos DOM dos componentes na árvore de renderização que possuam
 o nome de classe igual a className.

findRenderedDOMComponentWithClass() */

findrenderedDOMComponentWithClass(
    tree,
    className
)

/*Similar a scryRenderedDOMComponentsWithClass() mas espera apenas um resultado, e
 retorna esse resultado, ou lança uma exceção se existir mais de um equivalente.

scryRenderedDOMComponentsWithTag() */

scryRenderedDOMComponentsWithTag(
    tree,
    tagName
)

/*Encontra todos elementos DOM do componente na árvore de renderização que possua
 a tag com o nome igual a tagName.

findRenderedDOMComponentWithTag() */

findRenderedDOMComponentWithTag(
    tree,
    tagName
)

/*Similar a scryRenderedDOMComponentsWithTag() mas espera apenas um resultado, e
 retorna esse resultado, ou lança uma exceção se existir mais de um equivalente.

scryRenderedComponentsWithType() */

scryRenderedComponentsWithType(
    tree,
    componentClass
)

/*Similar a scryRenderedComponentsWithType() mas espera apenas um resultado, e
 retorna esse resultado, ou lança uma exceção se existir mais de um equivalente.

renderIntoDocument() */

renderIntoDocument(element)

/*Renderiza um elemento React em um nó DOM desaclopado no documento. Esta função
 precisa de um DOM. É efetivamente equivalente à: */

 const domContainer = document.createElement('div');
 ReactDOM.render(element, domContainer);

 /*Nota:

Você precisa ter window, window.document e window.document.createElement disponíveis globalmente antes de importar React. Caso contrário o React vai pensar que não pode acessa o DOM e os métodos como setState não funcionarão.

Outros Utilitários
Simulate */

//Simulate.{eventName}(
    element,
    [eventData]
//)

/*Simule um dispacho de evento para um nó do DOM com dados opcionais do evento eventData.

Simulate tem um método para cada evento que React entende

Clicando em um elemento */

// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);

/*Alterando o valor de um campo de input e depois pressionando ENTER. */

// <input ref={(node) => this.textInput = node} />
//const node = this.textInput;
node.value = 'girafa';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});

/*Você precisa fornecer alguma propriedade de evento que está sendo usado em seu
 componente (e.g. keyCode, which, etc…) já que o React não está criando nenhum
  desses para você. */