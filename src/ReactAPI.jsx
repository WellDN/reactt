/*Transformando Elementos
O React provê várias APIs para manipulação de elementos:

cloneElement()
isValidElement()
React.Children
Fragments
O React também provê um componente para que você possa renderizar múltiplos elementos
 sem a necessidade de criar outro elemento que os envolva.

React.Fragment
Refs
React.createRef
React.forwardRef
Suspense
O Suspense permite que componentes “esperem” por algo antes de renderizar. Atualmente,
 o Suspense suporta somente uma finalidade: carregar componentes dinamicamente com
  React.lazy. Futuramente, ele prestará suporte para outras finalidades, como busca de
   dados.

React.lazy
React.Suspense
Hooks
Os Hooks são uma novidade no React 16.8. Eles permitem que você utilize o estado
 (state) e outras funcionalidades do React sem ter que escrever uma classe para isso.
  Os Hooks possuem uma seção dedicada na documentação e uma referência da API separada:

Hooks Básicos

useState
useEffect
useContext
Hooks Adicionais

useReducer
useCallback
useMemo
useRef
useImperativeHandle
useLayoutEffect
useDebugValue
Referência
React.Component
React.Component é a classe base para componentes React quando eles são definidos usando
 classes ES6: */

 class Greeting extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }


  /*React.PureComponent
React.PureComponent é similar a React.Component. A diferença entre eles é que o
 React.Component não implementa o shouldComponentUpdate(), enquanto o
  React.PureComponent a implementa com uma comparação superficial de props e state.

Se o método render() do seu componente React renderiza o mesmo resultado dados os
 mesmos props e state, você pode usar React.PureComponent para um aumento no desempenho
  em alguns casos.

Nota

O método shouldComponentUpdate() do React.PureComponent compara os objetos apenas
 superficialmente. Se eles contiverem estruturas de dados complexas, isto pode causar
  falso-negativos para diferenças mais profundas. Estenda PureComponent quando você
   espera possuir props e state simples, ou então use forceUpdate() quando você souber
    que ocorreram mudanças profundas na estrutura de dados.

Além disso, o método shouldComponentUpdate() do React.PureComponent pula atualizações
 de prop para toda a subárvore do componente. Esteja certo de que todos seus
  componentes que descendem dele também são “puros”.

React.memo */

const MyComponent = React.memo(function MyComponent(props) {
    /* renderize usando props */
  });

  /*O React.memo é um higher order component.

Se seu componente renderiza o mesmo resultado dados os mesmos props, você pode
 envolver nele uma chamada para React.memo para um aumento no desempenho em alguns
  casos, através da memoização do resultado. Isto significa que o React vai pular a
   renderização do componente e reutilizar o último resultado renderizado.

React.memo verifica apenas as alterações de prop. Se o seu componente de função
 envolvido em React.memo tiver um useState, useReducer ou useContext Hook em sua
  implementação, ele ainda será renderizado quando o estado ou o contexto mudar.

Por padrão, ele irá comparar apenas superficialmente os objetos nos props. Se você
 quiser controle sob a comparação, você também pode prover uma função customizada de
  comparação como segundo argumento. */

  function MyComponent(props) {
    /* renderize usando props */
  }
  function areEqual(prevProps, nextProps) {
    /*
    se prevProps e nextProps renderizam o mesmo resultado,
    retorne true.
    caso contrário, retorne false.
    */
  }
  export default React.memo(MyComponent, areEqual);

  /*Este método existe somente como uma otimização de performance. Não conte com ele
   para “prevenir” uma renderização, pois isso pode levar a bugs.

Nota

Ao contrário do método shouldComponentUpdate() de class components, a função areEqual
 retorna true se os props são iguais e false se os props não são iguais. É o inverso de
  shouldComponentUpdate.

createElement() */

React.createElement(
    type,
    [props],
    [...children]
  )

  /*Cria e retorna um novo elemento React do tipo determinado. O argumento type pode
   ser uma string contendo a tag name (como, por exemplo, 'div' ou 'span'), um
    componente React (uma classe ou uma função), ou um React fragment.

Código escrito utilizando JSX será convertido para utilizar React.createElement().
 Você tipicamente não invocará React.createElement() diretamente se você estiver
  usando JSX.
  
  cloneElement()*/

  React.cloneElement(
    element,
    [config],
    [...children]
  )

  /*Clona e retorna um novo elemento React usando element como ponto de partida. config
   deve conter todos os novos adereços, key ou ref. O elemento resultante terá os props
    do elemento original, com os novos props mesclados superficialmente. Novos
     elementos filhos substituirão os existentes. key e ref do elemento original serão
      preservados se não houver key e ref presentes na config.

React.cloneElement() é quase equivalente a: */

//<element.type {...element.props} {...props}>{children}</element.type>

/*No entanto, ele também preserva refs. Isto significa que se você possui um elemento
 filho com um ref nele, você não o roubará acidentalmente do seu antecessor. Você terá
  o mesmo ref ligado ao seu novo elemento. A nova ref ou key irá substituir as antigas,
   se houver.

Esta API foi introduzida como uma reposição ao React.addons.cloneWithProps(), que foi
 descontinuado.
 
 createFactory()*/

 React.createFactory(type)

 /*Retorna uma função que produz elementos React do tipo determinado. Assim como em
  React.createElement(), o argumento type pode ser uma string contendo o tag name
   (como, por exemplo, 'div' ou 'span'), um componente React (uma classe ou uma função),
    ou um React fragment.

Este helper é considerado legado, e nós encorajamos você a utilizar JSX ou
 React.createElement() diretamente como alternativa.

Em geral você não invocará React.createFactory() diretamente se estiver utilizando JSX.
 Veja React sem JSX para aprender mais.

isValidElement() */

React.isValidElement(object)

/*Verifica se o objeto é um elemento React. Retorna true ou false.

React.Children

React.Children provê utilitários para lidar com a estrutura de dados opaca
 this.props.children.

React.Children.map */

//React.Children.map(children, function[(thisArg)])

/*Invoca uma função em cada elemento filho imediato contido em children com this
 definido para thisArg. Se children for um array, a função será chamada para cada
  filho no array. Se children for null ou undefined, este método retornará null ou
   undefined ao invés de um array.

Nota

Se children for um Fragment ele será tratado como um elemento filho único.

React.Children.forEach */

//React.Children.forEach(children, function[(thisArg)])

/*igual a React.Children.map(), mas não retorna um array. */

// React.Children.count

React.Children.Counter(children)

/*Retorna o número total de componentes em children, igual ao número de vezes que o
 callback passado para map ou forEach seria invocado.

React.Children.only */

React.Children.only(children)

/*Verifica que children possui apenas um elemento filho (um elemento React) e o
 retorna. Caso contrário, este método lança um erro.

Nota

O React.Children.only() não aceita o valor retornado de React.Children.map() pois este
 é um array ao invés de um elemento React.

React.Children.toArray */

React.Children.toArray(children)

/*Retorna a estrutura de dados opaca children como um flat array com as chaves
 atribuídas a cada elemento filho. Útil se você deseja manipular coleções de elementos
  filhos em seus métodos de renderização, especialmente se você quiser reordenar ou
   repartir this.props.children antes de repassá-los.

Nota

React.Children.toArray() altera keys para preservar a semântica de arrays aninhados
 quando realizando o flatten de listas de elementos filho. Isto é, toArray prefixa
  cada key no array retornado, de tal modo que o key de cada elemento possui o escopo
   do array que o contém.

React.Fragment
O componente React.Fragment permite que você retorne múltiplos elementos num método
 render() sem precisar criar um elemento DOM adicional: */

// render() {
    return (
      <React.Fragment>
        Some text.
        <h2>A heading</h2>
      </React.Fragment>
    );
//  }

  /*Você também pode usar ele com a forma abreviada <></>. Para mais informações, veja
   React v16.2.0: Suporte Melhorado para Fragments.

React.createRef

React.createRef cria uma ref que pode ser anexada a elementos React através do atributo
 ref. */

 class MyComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.inputRef = React.createRef();
    }
  
    render() {
      return <input type="text" ref={this.inputRef} />;
    }
  
    componentDidMount() {
      this.inputRef.current.focus();
    }
  }

  /*React.forwardRef
React.forwardRef cria um componente React que encaminha o atributo ref que ele recebe
 para outro componente abaixo na árvore. Esta técnica não é muito comum, mas é
  particularmente útil nos dois cenários:

Encaminhando refs para componentes DOM
Encaminhando refs em higher-order-components
React.forwardRef aceita uma função de renderização como argumento. React chamará esta
 função com props e ref como seus dois argumentos. Esta função deve retornar um React
  node. */

  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));
  
  // You can now get a ref directly to the DOM button:
  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;

  /*No exemplo acima, React passa o ref dado para o elemento <FancyButton ref={ref}>
   como o segundo argumento para a função de renderização dentro da chamada
    React.forwardRef.

Como resultado, após React anexar o ref, ref.current irá apontar diretamente para a
 instância do elemento DOM <button> 
 
 React.lazy

React.lazy() permite que você defina um componente que é carregado dinamicamente. Isto
 ajuda a reduzir o tamanho do bundle, retardando o carregamento de componentes que não
  são utilizados durante a renderização inicial.

Você pode aprender como utilizar isto em nossa documentação de code splitting. Você
 pode também querer ver este artigo explicando como utilizar mais detalhadamente.*/

 // Este componente é carregado dinamicamente
const SomeComponent = React.lazy(() => import('./SomeComponent'));

/*Note que renderizar componentes lazy requer que exista um componente <React.Suspense>
 num nível mais alto da árvore de renderização. É assim que você especifica um indicador
  de carregamento.

Nota

Usar React.lazy com import dinâmico requer que Promises estejam disponíveis no ambiente
 JS. Isto requer um polyfill no IE11 e suas versōes anteriores.

React.Suspense

React.Suspense permite especificar o indicador de carregamento em caso de alguns
 componentes abaixo na árvore ainda não estarem prontos para renderizar. Atualmente,
  componentes de carregamento lazy são a única finalidade que o <React.Suspense> presta
   suporte: */

   // Este componente é carregado dinamicamente
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Mostra <Spinner> enquanto OtherComponent carrega
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}

/*Isto está documentado em nosso guia para code splitting. Note que componentes lazy
 podem estar em níveis profundos dentro da árvore de Suspense — ele não precisa
  envolver cada um deles. A melhor prática é colocar <Suspense> onde você quer ver um
   indicador de carregamento, mas utilizar lazy() onde você quiser realizar code
    splitting.

Enquanto o React não presta suporte a isto, no futuro nós planejamos permitir que
 Suspense lide com mais cenários como busca de dados. Você pode ler sobre isso em
  nosso roadmap.

Nota

React.lazy() e <React.Suspense> ainda não tem suporte através do ReactDOMServer. Esta
 é uma limitação conhecida que será resolvida futuramente. */