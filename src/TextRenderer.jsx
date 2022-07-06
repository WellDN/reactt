import TestRenderirer from 'react-test-renderer'; //ES6
var TestRenderer = require('react-test-renderer'); // ES5 com npm

/*Visão Geral
Este pacote fornece um renderizador React que pode ser usado para renderizar componentes React para objetos JavaScript puros, sem depender do DOM ou de um ambiente móvel nativo.

Essencialmente, esse pacote facilita a captura de um snapshot da hierarquia de visualização da plataforma (semelhante a uma árvore DOM) processada por um componente React DOM ou React Native sem usar um navegador ou jsdom.

Exemplo: */

import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }

/*Você pode usar o recurso de teste de snapshot do Jest para salvar automaticamente
 uma cópia da árvore JSON em um arquivo e verificar em seus testes que ela não foi 
 alterada: aprenda mais.

Você também pode percorrer o resultado para encontrar nós específicos e fazer
 verificações sobre eles. */

 import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Olá</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

//const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);

/*TestRenderer
TestRenderer.create()
TestRenderer.act()
Instância de TestRenderer
testRenderer.toJSON()
testRenderer.toTree()
testRenderer.update()
testRenderer.unmount()
testRenderer.getInstance()
testRenderer.root
TestInstance
testInstance.find()
testInstance.findByType()
testInstance.findByProps()
testInstance.findAll()
testInstance.findAllByType()
testInstance.findAllByProps()
testInstance.instance
testInstance.type
testInstance.props
testInstance.parent
testInstance.children


Referência
TestRenderer.create() */

TestRenderer.create(element, options);

/*Cria uma instância do TestRenderer com o elemento React fornecido. Este método não
 usa o DOM real, mas ainda renderiza completamente a árvore de componentes na memória
  para que você possa fazer verificações sobre ela. Retorna uma instância TestRender.

TestRenderer.act() */

TestRenderer.act(callback);

/*Similar to the act() helper from react-dom/test-utils, TestRenderer.act prepares
 a component for assertions. Use this version of act() to wrap calls to
  TestRenderer.create and testRenderer.update. */

  import {create, act} from 'react-test-renderer';
import App from './app.js'; // The component being tested

// render the component
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();

// update with some different props
act(() => {
  root.update(<App value={2}/>);
})

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();

/*testRender.toJSON() */

testRenderer.toJSON()

/*Retorna um objeto representando a árvore renderizada. Essa árvore contém apenas
 os nós específicos da plataforma como <div> ou <View> e suas props, mas não contém
  nenhum componente criado pelo usuário. Isso é útil para testes de snapshot.

testRenderer.toTree() */

testRenderer.toTree()

/*Retorna um objeto representando a árvore renderizada. A representação é mais
 detalhada que a fornecida por toJSON(), e inclui os componentes criados pelo
  usuário. Você provavelmente não precisa desse método, a menos que esteja escrevendo
   sua própria biblioteca de asserções sobre o renderizador de teste.

testRenderer.update() */

testRenderer.update(element)

/*Re-renderiza a árvore na memória com um novo elemento raiz. Isso simula uma
 atualização do React na raiz. Se o novo elemento tiver o mesmo tipo e chave
  do elemento anterior, a árvore será atualizada; caso contrário, ele irá montar
   novamente uma nova árvore.

testRenderer.unmount() */

testRenderer.unmount()

/*Desmonta a árvore na memória, acionando os eventos de ciclo de vida apropriados.

testRenderer.getInstance() */

testRenderer.getInstance()

/*Retorna a instância correspondente ao elemento raiz, se disponível. Isso não
 funcionará se o elemento raiz for um componente de função, porque eles não possuem
  instâncias.

testRenderer.root */

testRenderer.root

/*Retorna o objeto raiz “instância de teste” que é útil para fazer asserções sobre
 nós específicos na árvore. Você pode usá-lo para encontrar outras “instâncias de
  teste” mais abaixo.

testInstance.find() */

testInstance.find(test)

/*Encontra uma única instância de teste descendente para a qual test(testInstance)
 retorne true. Se test(testInstance) não retornar true para exatamente uma instância
  de teste, isso causará um erro.

testInstance.findByType() */

testInstance.findByType(type)

/*Encontra uma única instância de teste descendente com o type fornecido. Se não
 houver exatamente uma instância de teste com o type fornecido, isso causará um erro.

testInstance.findByProps() */

testInstance.findByProps(props)

/*Encontra uma única instância de teste descendente com os props fornecidos. Se não
 houver exatamente uma instância de teste com os props fornecidos, isso causará um
  erro.

testInstance.findAll() */

testInstance.findAll(test)

/*Encontra todas as instâncias de teste descendentes para as quais test(testInstance)
 retorne true.

testInstance.findAllByType() */

testInstance.findAllByType(type)

/*Encontra todas as instâncias de teste descendentes com o type fornecido.

testInstance.findAllByProps() */

testInstance.findAllByProps(props)

/*Encontra todas as instâncias de teste descendentes com os props fornecidos.

testInstance.instance */

testInstance.instance

/*A instância do componente correspondente a essa instância de teste. Está disponível
 apenas para componentes de classe, pois os componentes de função não possuem
  instâncias. Ele corresponde ao valor this dentro do componente fornecido.

testInstance.type */

testInstance.type

/*O tipo de componente correspondente a essa instância de teste. Por exemplo, um
 componente <Button /> tem o tipo Button.

testInstance.props */

testInstance.props

/*Os props correspondentes a essa instância de teste. Por exemplo, um componente
 <Button size="small"/> possui {size: 'small'} como props.

testInstance.parent */

testInstance.parent 

/*A instância de teste pai desta instância de teste.

testInstance.children */

testInstance.children

/*As instâncias de testes descendentes desta instância de teste.

Ideias
Você pode passar a função createNodeMock para TestRenderer.create como opção, que
 permite mocks personalizados de refs. createNodeMock aceita o elemento atual e deve
  retornar um objeto mock de ref. Isso é útil quando você testa um componente que
   depende de refs. */

   import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // mock de uma função de focus
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);