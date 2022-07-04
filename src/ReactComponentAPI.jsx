/*React permite definirmos componentes como classes (class components) ou como funções.
 Componentes definidos como classes possuem mais funcionalidades que serão detalhadas
  nesta página. Para definir um class component, a classe precisa estender
   React.Component: */

import { render } from "react-dom";

class Welcome extends React.component {
    render() {
        return <h1>Olá, {this.props.name}</h1>;
    }
}

/*O único método que você deve definir em uma subclasse de React.Component é chamado
 render(). Todos os outros métodos descritos nesta página são opcionais.

Nós somos fortemente contra a criação de seus próprios componentes base. Em
 componentes React, o reuso do código é obtido primariamente através de composição ao
  invés de herança. 
  
  O Ciclo de Vida de um Componente
Cada componente possui muitos “métodos do ciclo de vida” que você pode sobrescrever
 para executar determinado código em momentos particulares do processo. Você pode usar
  este diagrama do ciclo de vida para consulta. Na lista abaixo, os métodos do ciclo
   de vida mais usados estão marcados em negrito. O resto deles, existe para o uso em
    casos relativamente raros.

Montando (mounting)
Estes métodos são chamados na seguinte ordem quando uma instância de um componente
 está sendo criada e inserida no DOM:

constructor()
static getDerivedStateFromProps()
render()
componentDidMount()
Nota:

Estes métodos são considerados legado e você deve evitá-los em código novo:

UNSAFE_componentWillMount()
Atualizando
Uma atualização pode ser causada por alterações em props ou no state. Estes métodos
 são chamados na seguinte ordem quando um componente esta sendo re-renderizado:

static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()
Nota:

Estes métodos são considerados legado e você deve evitá-los em código novo:

UNSAFE_componentWillUpdate()
UNSAFE_componentWillReceiveProps()
Desmontando (unmounting)
Estes métodos são chamados quando um componente está sendo removido do DOM:

componentWillUnmount()
Tratando Erros
Estes métodos são chamados quando existir um erro durante a renderização, em um método
 do ciclo de vida, ou no construtor de qualquer componente-filho.

static getDerivedStateFromError()
componentDidCatch()
Outras APIs
Cada componente também fornece outras APIs:

setState()
forceUpdate()
Propriedades da Classe
defaultProps
displayName
Propriedades da Instância
props
state
Referência
Métodos Mais Usados do Ciclo de Vida
Os métodos desta seção cobrem a grande maioria dos casos de uso que você encontrará
 criando componentes React. Para uma referência visual, veja : este diagrama do ciclo
  de vida.

render()*/

render()

/*O método render() é o único método obrigatório em um class-component.

Quando chamado, ele examina this.props e this.state e retorna um dos seguintes tipos:

Elementos React. Tipicamente criados via JSX. Por exemplo, <div /> e <MyComponent />
 são elementos React que instruem o React para renderizar um nó do DOM, ou outro
  componente definido pelo usuário, respectivamente.
Arrays e fragmentos. Permitem que você retorne múltiplos elementos ao renderizar. Veja
 a documentação em fragments para mais detalhes.
Portals. Permitem que você renderize componentes-filhos em uma sub-árvore diferente do
 DOM. Veja a documentação em portals para mais detalhes.
String e números. Estes são renderizados como nós de texto no DOM.
Booleanos ou null. Não renderizam nada.(A maioria existe para suportar o padrão return
     test && <Child /> , onde test é um booleano.)
A função render() deve ser pura, o que significa que ela não modifica o state. Pois,
 ela retorna o mesmo resultado a cada vez que é chamada e isso não interage diretamente
  com o browser. Se você precisar interagir com o browser, faça isto no método
   componentDidMount() ou em outros métodos do ciclo de vida. Manter render() puro faz
    com que os componentes sejam fáceis de se trabalhar.

Nota

render() não será invocado se shouldComponentUpdate() retornar false.

constructor() */

constructor(props)

/*Se você não inicializar o state e não fizer o bind dos métodos, você não precisa
 implementar um construtor para seu componente

O construtor para um componente React é chamado antes que este componente seja montado.
 Quando estiver implementando o construtor para uma subclasse de React.Component, você
  deveria chamar super(props) antes de qualquer outra coisa. Caso contrário this.props
   será indefinido no construtor, o que pode levar a bugs.

Normalmente, em React, os construtores são usados somente para dois propósitos:

Inicializar local state através da atribuição de um objeto a this.state.
Ligação (binding) de um método manipulador de eventos à uma instância.
Você não deve chamar setState() no constructor(). Ao invés disso, se seu componente
 precisa de local state, atribua o initial state à this.state diretamente no
  construtor: */

//  constructor(props) {
    super(props);
    // Não chame this.setState() aqui!
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
 // }

  /*O método construtor é o único lugar onde você deve atribuir this.state
   diretamente. Em todos os outros métodos, você precisa usar this.setState().

Evite introduzir qualquer efeito colateral no construtor. Para estes casos use
 componentDidMount().

Nota

Evite copiar props no state! Este é um erro comum: */

//constructor(props) {
    super(props);
    // Não faça isso!
    this.state = { color: props.color };
//   }

   /*O problema é que isto é desnecessário (você pode usar this.props.color
     diretamente), e cria bugs (atualizações em color não serão refletidas no state).

Use este pattern somente se você quiser ignorar atualizações em props intencionalmente.
 Neste caso, faz sentido renomear a prop para ser chamada initialColor ou defaultColor.
  É possível então forçar um componente a “resetar” seu state interno através de
   mudando sua chave quando necessário.

componentDidMount() */

componentDidMount()

/*componentDidMount() É invocado imediatamente após um componente ser montado
 (inserido na árvore). Inicializações que exijam nós do DOM devem vir aqui. Se precisar
  carregar data de um endpoint remoto, este é um bom lugar para instanciar sua
   requisição.

Este método é um bom lugar para colocar qualquer subscrição. Se fizer isto, não esqueça
 de desinscrever no componentWillUnmount().

Você pode chamar setState() diretamente dentro do componentDidMount(). Ele irá
 disparar uma renderização extra, mas isto irá ocorrer antes que o browser atualize a
  tela. Isso garante que mesmo que o render() seja chamado duas vezes neste caso, o
   usuário não verá o state intermediário. Use este pattern com cuidado porque isto
    frequentemente causa issues de performance. Na maioria dos casos, você deve
     atribuir o initial state no constructor(). Isto pode, no entanto, ser necessário
      para casos como modais e tooltips quando você precisa mensurar um nó do DOM
       antes de renderizar algo que dependa de seu tamanho ou posição.

componentDidUpdate() */

componentDidUpdate(prevProps, prevState, snapshot)

/*componentDidUpdate() é invocado imediatamente após alguma atualização ocorrer. Este
 método não é chamado pelo initial render.

Use isto como uma oportunidade para alterar o DOM quando o componente for atualizado.
 Este também é um bom lugar para realizar requisições de rede enquanto compara as
  props atuais com as props anteriores (e.g. uma chamada de rede pode não ser
     necessária se as props não mudaram). */

//     componentDidUpdate(prevProps) {
        // Uso típico, (não esqueça de comparar as props):
        if (this.props.userID !== prevProps.userID) {
          this.fetchData(this.props.userID);
        }
//      }

      /*Você pode chamar setState() imediatamente dentro do componentDidUpdate() mas
       perceba que isto deve estar encapsulado em uma condição como no exemplo abaixo,
        ou você irá causar um loop infinito. Isto também causaria uma re-renderização
         extra, que por mais que não seja visível para o usuário pode afetar a
          performance do componente. Se você está tentando “espelhar” algum state
           para uma prop vinda de cima, considere usar a prop diretamente. Leia mais
            sobre porque copiar props no state causa bugs.

Se seu componente implementa o método getSnapshotBeforeUpdate() (o que é raro), o
 valor que ele retorna será passado como o terceiro parâmetro “snapshot” para
  componentDidUpdate(). Caso contrário este parâmetro será undefined.

Nota

componentDidUpdate() não será invocado se shouldComponentUpdate() retornar false.

componentWillUnmount() */

componentWillUnmount()

/*componentWillUnmount() é invocado imediatamente antes que um componente seja
 desmontado e destruído. Qualquer limpeza necessária deve ser realizada neste método,
  como invalidar timers, cancelar requisições de rede, ou limpar qualquer subscrição
   que foi criada no componentDidMount().

Não se deve chamar setState() em componentWillUnmount() porque o componente nunca irá
 será renderizado novamente. Uma vez que a instância do componente foi desmontada, ela
  nunca será montada de novo.

Métodos Raramente Usados
Estes métodos dessa seção correspondem a casos de uso incomuns. Eles são úteis de vez
 em quando, mas na maioria das vezes, seus componentes provavelmente não irão precisar
  de nenhum deles. Pode ver a maioria dos métodos abaixo neste diagrama do ciclo de
   vida se clicar na checkbox “Mostrar ciclos de vida menos comuns” no topo da página.

shouldComponentUpdate() */

shouldComponentUpdate(nextProps, nextState)

/*Use shouldComponentUpdate() para permitir que o React saiba se o resultado de um
 componente não é afetado pelas mudanças atuais em state ou props. O comportamento
  padrão é para re-renderizar a cada mudança do state, e na grande maioria dos casos
   você deve confiar no comportamento padrão.

shouldComponentUpdate() é executado antes da renderização, quando novas props ou state
 são recebidos. O valor default é true. Este método não é chamado na renderização
  inicial ou quando forceUpdate()é usado.

Este método existe somente para otimização de performance . Não confie nele para
 “evitar” a renderização, pois isso pode levar a bugs. Considere usar PureComponent no
  lugar de escrever shouldComponentUpdate() manualmente. PureComponent realiza uma
   comparação superficial das props e do state, e reduz as chances de pular um update
    necessário.

Se você está confiante que quer escrever isto manualmente, pode comparar this.props
 com nextProps e this.state com nextState e retornar false para informar o React que
  o update pode ser pulado. Perceba que retornando false não evita que componentes
   filhos sejam renderizados novamente quando o state deles sofrer alterações.

Não recomendamos fazer verificações de igualdade profundas ou usar JSON.stringify()
 dentro de shouldComponentUpdate(). Isto é ineficiente e irá prejudicar a performance.

Atualmente, se shouldComponentUpdate() retornar false, então
 UNSAFE_componentWillUpdate(), render(), e componentDidUpdate() não serão invocados.
  No futuro, React pode tratar shouldComponentUpdate() como uma dica ao invés de uma
   rigorosa diretiva, e retornar false pode continuar resultando em re-renderização do
    componente.

static getDerivedStateFromProps() */

//static getDerivedStateFromProps(props, state)

/*getDerivedStateFromProps é invocado imediatamente antes de chamar o método render,
 ambos na montagem inicial e nas atualizações subsequente. Devem retornar um objeto
  para atualizar o state, ou null para não atualizar nada.

Este método existe para casos de uso raros onde o state depende de mudanças nas props
 ao longo do tempo. Por exemplo, pode ser útil para implementar um componente
  <Transition> que compara seus filhos anteriores e próximos para decidir quais deles
   devem ser animados.

Derivando o state leva a código verboso e faz seus componentes difíceis de compreender.
 Tenha certeza de estar familiarizado com alternativas mais simples:

Se precisar executar um side effect (por exemplo, buscar dados ou uma animação) em
 resposta a uma alteração em props, use componentDidUpdate no lugar.
Se você quer recomputar alguns dados somente quando uma prop muda, use um auxiliar de
 memorização no lugar.
Se você quer “resetar” o state quando uma prop muda, considere criar um componente
 completamente controlado ou completamente controlado com uma chave instead.
Este método não tem acesso à instância do componente. Se você quiser, pode reusar o
 código entre o método getDerivedStateFromProps() e os métodos de outra classe
  extraindo funções puras para as props e state do componente, fora da definição da
   classe.

Perceba que este método é disparado a cada renderização, independentemente da razão.
 Isto está em contraste com UNSAFE_componentWillReceiveProps, que dispara somente
  quando um componente pai causa uma re-renderização e não como resultado de uma
   chamada local a setState.

getSnapshotBeforeUpdate() */

getSnapshotBeforeUpdate(prevProps, prevState)

/*getSnapshotBeforeUpdate() é invocado imediatamente antes que o retorno da
 renderização mais recente seja escrito e.g. no DOM. Isto permite que o componente
  capture alguma informação do DOM (e.g. posição do scroll) antes que ela seja
   potencialmente alterada. Qualquer valor retornado por este método do ciclo de vida
    será passado como parâmetro para componentDidUpdate().

Este caso de uso não é comum, mas pode ocorrer em UIs como um thread de um chat que
 precise tratar a posição do scroll de uma maneira especial.

A snapshot value (or null) should be returned. O valor do snapshot (ou null) deve ser
 retornado

Por exemplo: */

class ScrollingList extends React.Component {
    constructor(props) {
      super(props);
      this.listRef = React.createRef();
    }
  
    getSnapshotBeforeUpdate(prevProps, prevState) {
      // Are we adding new items to the list?
      // Capture the scroll position so we can adjust scroll later.
      if (prevProps.list.length < this.props.list.length) {
        const list = this.listRef.current;
        return list.scrollHeight - list.scrollTop;
      }
      return null;
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      // If we have a snapshot value, we've just added new items.
      // Adjust scroll so these new items don't push the old ones out of view.
      // (snapshot here is the value returned from getSnapshotBeforeUpdate)
      if (snapshot !== null) {
        const list = this.listRef.current;
        list.scrollTop = list.scrollHeight - snapshot;
      }
    }
  
    render() {
      return (
        <div ref={this.listRef}>{/* ...contents... */}</div>
      );
    }
  }

  /*No exemplo acima, é importante lermos a propriedade scrollHeight em
   getSnapshotBeforeUpdate porque podem ocorrer delays entre a fase do ciclo de vida
    “renderização” (render) e a fase “commit” (commit getSnapshotBeforeUpdate e
         componentDidUpdate).

Error boundaries
Os error boundaries são componentes React que realizam o catch de erros de JavaScript
 em qualquer parte da sua árvore de componentes filhos, realiza o log destes erros e
  exibe uma UI de fallback ao invés da árvore de componentes que quebrou. Os Error
   boundary realizam o catch de erros durante a renderização, nos métodos do lifecycle
    e em construtores de toda a sua árvore descendente.

Um class component se torna um error boundary caso ele defina um dos (ou ambos)
 métodos do lifecycle static getDerivedStateFromError() ou componentDidCatch().
  Atualizar o state a partir destes lifecycles permite que você capture um erro
   JavaScript não tratado na árvore de descendentes e exiba uma UI de fallback.

Somente utilize error boundaries para recuperação de exceções inesperadas; não tente
 utilizá-lo para controlar o fluxo.

Para mais detalhes, veja Tratamento de Erros no React 16.

Nota

Os error boundaries somente realizam catch nos componentes abaixo dele na árvore. Um
 error boundary não pode realizar o catch de um erro dentro de si próprio.

static getDerivedStateFromError() */

//static getDerivedStateFromError()

/*Este lifecycle é invocado após um erro ser lançado por um componente descendente.
 Ele recebe o erro que foi lançado como parâmetro e deve retornar um valor para
  atualizar o state. */

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Atualize o state para que a próxima renderização exiba a UI de fallback.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // Você pode renderizar qualquer UI como fallback
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }

  /*Nota

getDerivedStateFromError() é chamado durante a fase de renderização, portanto efeitos
 colaterais (side-effects) não são permitidos. Para estes casos de uso, utilize
  componentDidCatch() como alternativa.

componentDidCatch() */

componentDidCatch(error, info)

/*Este lifecycle é invocado após um erro ter sido lançado por um componente
 descendente. Ele recebe dois parâmetros:

error - O erro que foi lançado.
info - Um objeto com uma chave componentStack contendo informações sobre qual
 componente lançou o erro.
componentDidCatch() é chamado durante a fase de “commit”, portanto efeitos colaterais
 (side-effects) não são permitidos. Ele deveria ser usado para, por exemplo, realizar
  o log de erros: */

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Atualize o state para que a próxima renderização exiba a UI de fallback.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // Examplo de "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      logComponentStackToMyService(info.componentStack);
    }
  
    render() {
      if (this.state.hasError) {
        // Você pode renderizar qualquer UI como fallback
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }

  /*As compilações de produção e desenvolvimento do React diferem ligeiramente na
   maneira como componentDidCatch() lida com erros.

No desenvolvimento, os erros irão borbulhar em window, isso significa que qualquer
 window.onerror ou window.addEventListener('error', callback) irá interceptar os erros
  que foram detectados por componentDidCatch().

Na produção, em vez disso, os erros não surgirão, o que significa que qualquer
 manipulador de erros ancestral receberá apenas erros não explicitamente detectados por
  componentDidCatch().

Nota

No evento de um erro, você pode renderizar uma UI de fallback com componentDidCatch()
 chamando setState, mas isto será depreciado numa release futura. Use static
  getDerivedStateFromError() para manipular a renderização de fallback como
   alternativa.

Métodos Legado do Ciclo de Vida
Os métodos do ciclo de vida abaixo estão marcados como “legado”. Eles ainda funcionam,
 mas não recomendamos utilizar eles em código novo. Você pode aprender mais sobre a
  migração de métodos legado do ciclo de vida neste post no blog.

UNSAFE_componentWillMount() */

UNSAFE_componentWillMount()

/*Nota

Este lifecycle era nomeado componentWillMount. Este nome continuará a funcionar até
 a versão 17. Utilize o codemod rename-unsafe-lifecycles para atualizar automaticamente
  seus componentes.

UNSAFE_componentWillMount() é invocado antes que o mounting ocorra. Ele é chamado
 antes de render(), portanto chamar setState() sincronamente neste método não irá
  acarretar numa renderização extra. Geralmente, nós recomendamos o constructor() como
   alternativa para inicializar o state.

Evite introduzir quaisquer efeitos colaterais (side-effects) ou subscriptions neste
 método. Para estes casos de uso, utilize componentDidMount().

Este é o único método do lifecycle chamado na renderização do servidor.

UNSAFE_componentWillReceiveProps() */

UNSAFE_componentWillReceiveProps(nextProps)

/*Nota

Este lifecycle era nomeado componentWillReceiveProps. Este nome continuará a funcionar
 até a versão 17. Utilize o codemod rename-unsafe-lifecycles para atualizar
  automaticamente seus componentes.

Nota

Utilizar este método do lifecycle frequentemente acarreta em bugs e inconsistências.

Se você precisar causar um side-effect (por exemplo, buscar dados um realizar uma
     animação) em resposta a uma mudança nas props, utilize o método do lifecycle
      componentDidUpdate como alternativa.
Se você usa componentWillReceiveProps para recomputar algum dado somente quando uma
 prop muda, utilize um memoization helper.
Se você usa componentWillReceiveProps para “resetar” algum state quando uma prop muda,
 considere ou criar um componente completamente controlado ou completamente não
  controlado com uma key como alternativa. Para outros casos de uso, siga as
   recomendações neste post do blog sobre derived state.
UNSAFE_componentWillReceiveProps() é invocado antes que um componente montado receba
 novas props. Se você precisa atualizar o estado em resposta a mudanças na prop
  (por exemplo, para resetá-lo), você pode comparar this.props e nextProps e realizar
   transições de state utilizando this.setState() neste método.

Note que se um componente pai causar a re-renderização do seu componente, este método
 será chamado mesmo se as props não foram alteradas. Certifique-se de comparar o valor
  atual e o próximo se você deseja somente manipular mudanças.

O React não chama UNSAFE_componentWillReceiveProps() com props iniciais durante o
 mounting. Ele só chama este método se alguma das props do componente puderem
  atualizar. Chamar this.setState() geralmente não desencadeia uma outra chamada
   UNSAFE_componentWillReceiveProps().

UNSAFE_componentWillUpdate() */

UNSAFE_componentWillUpdate(nextProps, nextState)

/* */