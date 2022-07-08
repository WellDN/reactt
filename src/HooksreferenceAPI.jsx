import { useCallback, useDebugValue, useEffect, useImperativeHandle } from "react";

const [state, setState] = useState(initialState); //basic hook state that return a value and a function that refresh the value.

/*Durante a renderização inicial, o estado retornado é o mesmo que o valor passado como
 argumento inicial (initialState).

A função setState é usada para atualizar o estado. Ela aceita um novo valor de estado
 e coloca na fila de re-renderização do componente. */

 setState(newState);

 /*Durante as próximas re-renderizações, o primeiro valor retornado por useState
  sempre será o estado mais recente após a aplicação das atualizações.

Nota

React garante que a identidade da função setState é estável e não será alterada nos
 re-renderizadores. É por isso que é seguro omitir da lista de dependências useEffect
  ouuseCallback.

Atualizações Funcionais
Se um novo estado for calculado usando o estado anterior, você pode passar uma função
 para setSate. A função receberá o valor anterior e retornará um valor atualizado.
  Aqui está um exemplo de um componente de contador que usa as duas formas de usar
   o setState: */

   function Counter ({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
        <>
        Contador: {count}
        <button onClick={() =>
            setCount(initialCount)}>Reniciar</button>
            <button onClick={() => setCount(prevCount =>
            prevCount -1)}>-</button>
        <button onClick={()=> setCount(prevCount =>
        prevCount +1)}>+</button>
        </>
    )
   }

   /*Os botões ”+” e ”-” usam a forma funcional, porque o valor atualizado é baseado
    no valor anterior. Mas o botão “Reiniciar” usa a forma normal, porque ele sempre
     define a contagem de volta para o valor inicial.

Se sua função de atualização retornar exatamente o mesmo valor que o estado atual, o
 renderizador subsequente será ignorado completamente.

Nota

Ao contrário do método setState encontrado em componentes de classe, useState não
 combina automaticamente os objetos atualizados. Você pode replicar esse comportamento
  por combinar a função que atualiza o objeto e o estado anterior usando a sintaxe
   object spread */

//   const [state, setState] = useState ({});
   setState(prevState = {
    //Object.assign também funcionaria
//    return {...prevState, ...updatedValues};
   });

   /*Outra opção é o useReducer, que é mais adequada para gerenciar objetos de
    estado que contêm vários sub-valores.

Estado Inicial Preguiçoso
O argumento initialState é o estado usado durante a primeira renderização. Nas
 próximas renderizações, ele é desconsiderado. Se o estado inicial é o resultado
  desse demorado processamento, você pode fornecer uma função, no qual será executada
   apenas na primeira renderização: */

 //  const [state, setState] = useState(() => {
//    const initialState = someExpensiveComputation(props);
    return initialState;
  //});

  
  /*Pulando Atualização de Estado
Se você atualizar o estado do Hook com o mesmo valor do estado atual, React irá pular
 a atualização sem renderizar os filhos ou disparar os efeitos. (React usa o algoritmo
     de comparação Object.is.)

Note que o React pode ainda precisar renderizar esse componente específico novamente
 antes de sair. Isso não deveria ser uma preocupação porque o React não irá ser “mais
  profundo” do que o necessário na árvore. Se você está fazendo um processamento mais
   demorado enquanto renderiza, você pode otimizar isso usando useMemo.

useEffect */

useEffect(didUpdate);

/*Aceita uma função que contém um código imperativo, possivelmente efetivo.

Mutações, assinaturas, temporizadores, logs e outros side effects não são permitidos
 dentro do corpo principal de um componente funcional (React se refere a isso como
     render phase). Usá-los levará a erros confusos e inconsistências na UI.

Em vez disso, use useEffect. A função passada para useEffect será executada depois que
 a renderização estiver disponível na tela. Pense em efeitos como um rota de fuga do
  mundo puramente funcional do React para o mundo imperativo.

Por padrão, os efeitos são executados após cada renderização concluída, mas você pode
 optar por dispará-los somente quando determinados valores receberam atualização.

Limpando um Efeito
Muitas vezes, os efeitos criam recursos que precisam ser limpos antes que o componente
 deixe a tela, como uma assinatura ou o ID de um temporizador. Para fazer isso, a
  função passada para useEffect pode retornar uma função de limpeza do efeito. Por
   exemplo, para criar uma assinatura: */

   useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
        //Limpa a assinatura antes do componente deixar a tela
        subscription.unsubscribe();
    };
   });

   /*A função de limpeza é executada antes que o componente seja removido da UI para 
   evitar vazamento de memória. Entretanto, se um componente renderiza várias vezes
    (como eles normalmente fazem), o efeito anterior é limpo antes de executar o
     próximo efeito. No nosso exemplo, isto significa que uma nova assinatura é criada
      em cada atualização. Para evitar disparar um efeito em cada atualização,
       consulte a próxima seção.

Tempo dos Efeitos
Ao contrário de componentDidMount e componentDidUpdate, a função passada para useEffect
 dispara após a renderização, durante o evento adiado. Isto torna o useEffect adequado
  para os muitos efeitos colaterais comuns, como a criação de assinaturas e
   manipuladores de eventos, porque a maioria dos tipos de trabalho não deve bloquear
    o navegador ao atualizar a tela.

No entanto, nem todos os efeitos podem ser adiados. Por exemplo, uma alteração no
 DOM visível para o usuário, deve disparar sincronizadamente antes da próxima
  renderização, para que o usuário não perceba uma inconsistência visual. (A distinção
     é conceitualmente semelhante a ouvintes de eventos ativos x passivos.) Para
      estes tipos de efeitos, React fornece um Hook adicional chamado useLayoutEffect.
       Tem a mesma estrutura que useEffect, mas é diferente quando disparado.

Embora useEffect seja adiado até a próxima renderização do navegador, é mais garantido
 disparar antes de qualquer nova renderização. React sempre apagará os efeitos de
  uma renderização anterior antes de iniciar uma nova atualização.

Disparando um Efeito Condicionalmente
O comportamento padrão para efeitos é disparar o efeito após cada renderização
 concluída. Desta maneira, o efeito é sempre recriado se uma de suas dependências for
  alterada.

No entanto, isto pode ser excessivo em alguns casos, como o exemplo de assinatura da 
seção anterior. Nós não precisamos criar uma nova assinatura toda vez que atualizar,
 apenas se a props source for alterada.

Para implementar isso, passe um segundo argumento para useEffect que pode ser um
 array de valores em que o efeito observa. Nosso exemplo atualizado agora se parece
  com isso: */

  useEffect(
    () => {
      const subscription = props.source.subscribe();
      return () => {
        subscription.unsubscribe();
      };
    },
    [props.source],
  );

  /*Agora, a assinatura só será recriada quando props.source for alterado.

Nota

Se você usar essa otimização, tenha certeza de que a array inclua qualquer valor do
 escopo acima (como props e state) que mude com o tempo e que ele seja usado pelo
  efeito. Caso contrário, seu código fará referência a valores obsoletos de
   renderizações anteriores. Saiba mais sobre como lidar com funções e o que fazer
    quando a matriz muda com muita frequência.

Se você quer executar um efeito e limpá-lo apenas uma vez (na montagem e desmontagem),
 você pode passar um array vazio ([]) como segundo argumento. Isso conta ao React que
  o seu efeito não depende de nenhum valor das props ou state, então ele nunca precisa
   re-executar. Isso não é tratado como um caso especial — ele segue diretamente a
    maneira como o array de entrada sempre funcionam.

Se você passar um array vazio ([]), a props e o state passados dentro do efeito sempre
 terão seus valores iniciais. Enquanto passando [] como segundo parâmetro aproxima-se
  do modelo mental familiar de componentDidMount e componentWillUnmount, geralmente
   hás melhores soluções para evitar efeitos repetidos com muita frequência.
    Além disso, não esqueça de que o React adia a execução do useEffect até o
     navegador ser pintado, então fazer trabalho extra é menos problemático.

Recomendamos usar as regras do exhaustive-deps como parte do nosso pacote
 eslint-plugin-react-hooks. Ele avisa quando as dependências são especificadas
  incorretamente e sugere uma correção.

O array de dependências não é passada como argumentos para a função de efeito.
 Conceitualmente, no entanto, é o que eles representam: todos os valores
  referenciados dentro da função de efeito também devem aparecer no array de
   dependências. No futuro, um compilador suficientemente avançado poderia
    criar esse array automaticamente.

useContext */

const value = useContext(myContext);

/*Aceita um objeto de contexto (o valor retornado de React.createContext) e retorna
 o valor atual do contexto. O valor de contexto atual é determinado pela prop value do
  <MyContext.Provider> mais próximo acima do componente de chamada na árvore.

Quando o <MyContext.Provider> mais próximo acima do componente for atualizado, este
 Hook acionará um novo renderizador com o value de contexto mais recente passando
  para o provedor MyContext. Mesmo que um ancestral use React.memo ou
   shouldComponentUpdate, um renderizador ainda ocorrerá começando no próprio
    componente usando useContext.

Não esqueça que o argumento para useContext deve ser o objeto de contexto em si:

Correto: useContext(MyContext)
Incorreto: useContext(MyContext.Consumer)
Incorreto: useContext(MyContext.Provider)
Um componente que chama useContext será sempre renderizado novamente quando o valor
 do contexto for alterado. Se voltar a renderizar o componente é caro, você pode
  otimizá-lo usando o memoization.

Dica

Se você estiver familiarizado com a API de contexto antes de Hooks, useContext
 (MyContext) é equivalente a static contextType = MyContext em uma classe, ou a
  <MyContext.Consumer>.

useContext(MyContext) só permite que você leia o contexto e assine suas alterações.
 Você ainda precisa de um <MyContext.Provider> acima na árvore para fornecer o valor
  para este contexto.

Juntar as peças com Context.Provider */

const themes = {
  light: {
    foreground: "#0000000",
    background: "#eeeeeee"
  },
  dark: {
    foreground: "#fffffff",
    background: "#2222222"
  }
};

const ThemeContext = 
React.creteContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background,
    color: theme.foredground}}>
      Eu sou estilizado pelo tema do context!
    </button>
  );
}

/*Este exemplo é modificado para hooks a partir de um exemplo anterior no Guia
 Avançado de Context, onde você pode encontrar mais informações sobre quando e como
  usar o Context.

Hooks Adicionais
Os próximos Hooks são variações dos princípios básicos da seção anterior ou apenas
 necessários para um caso de uso específico. Não se estresse sobre aprendê-los antes
  dos princípios básicos.

useReducer */

const [/*state*/, dispatch]  = useReducer(reducer, initialArg, init);

/*Uma alternativa para useState. Aceita um reducer do tipo (state, action) => newState
 e retorna o estado atual, junto com um método dispatch. (Se você está familiarizado
   com o Redux, você já sabe como isso funciona.)

useReducer é geralmente preferível em relação ao useState quando se tem uma lógica
 de estado complexa que envolve múltiplos sub-valores, ou quando o próximo estado
  depende do estado anterior. useReducer também possibilita a otimização da performance
   de componentes que disparam atualizações profundas porque é possível passar o
    dispatch para baixo, ao invés de callbacks.

Aqui está o exemplo do contador na seção useState, reescrito para usar um reducer: */

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
        default:
          throw new Error();
  }
}

function Counter () {
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <>
    Contador: {state.count}
    <button onClick={() => dispatch ({type:
    'decrement'})}>.</button>
    <button onClick={() => dispatch ({type:
    'increment'})}>+</button>
    </>
  );
}

/*Nota

React garante que a identidade da função dispatch seja estável e não será alterada
 nos re-renderizadores. É por isso que é seguro omitir da lista de dependências
  useEffect ou useCallback.

Determinando o Estado Inicial
Há duas maneiras diferentes de inicializar o estado useReducer. Pode você escolher
 qualquer uma dependendo do seu caso de uso. A maneira mais simples é passar o estado
  inicial como um segundo argumento: */

//  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
//  );

  /*React não usa a convenção state = initialState popularizada pelo Redux. O valor
   inicial precisa às vezes, depender de props e, portanto é especificado a partir da
    chamada do Hook. Se você se sentir bem sobre isso, você pode chamar
     useReducer(reducer, undefined, reducer) para simular o comportamento do Redux, mas
      não encorajamos isso.

Inicialização Preguiçosa
Você pode também criar um estado inicial mais lento. Para fazer isso, você pode passar
 uma função init como terceiro argumento. O estado inicial será setado para
  init(initialArg).

Isso nos permite extrair a lógica que calcula o estado inicial para fora do reducer.
 Isso é útil também para resetar um estado depois da resposta de uma ação: */

 function init(initialCount) {
  return {count: initialCount};
 }

 function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
        case 'reset':
        return init(action.payload);
        default:
          throw new Error();
  }
 }

 function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer,
     initialCount, init);
     return (
      <>
        Contador: {state.count}
        <button
            onClick={() => dispatch({type: 'reset',
          payload: initialCount})}>
            
            Reiniciar
            </button>
            <button onClick={() => dispatch({type:
            'decrement'})}>-</button>
            <button onClick={() => dispatch({type:
            'increment'})}>+</button>
            </>
     );
 }

 /*Pulando Fora da Ação
Se você retornar o mesmo valor do Hook Reducer que o valor do state atual, React irá
 pular a ação sem renderizar os filhos ou disparar os efeitos. (React usa o algoritmo
   de comparação Object.is.)

Note que o React ainda pode precisar renderizar aquele componente específico novamente
 antes de pular para fora da ação. Isso não deve ser um problema porque o React não
  vai se aprofundar desnecessariamente na árvore. Se você está fazendo cálculos de
   alto custo enquanto renderiza, você pode otimizá-los usando o useMemo.

useCallback */

const memoizedCallBack = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

/*Retorna um callback memoizado.

Recebe como argumentos, um callback e um array. useCallback retornará uma versão
 memoizada do callback que só muda se uma das entradas tiverem sido alteradas. Isto é
  útil quando utilizamos callbacks a fim de otimizar componentes filhos, que dependem
   da igualdade de referência para evitar renderizações desnecessárias (como por
     exemplo shouldComponentUpdate).

useCallback(fn, inputs) é equivalente a useMemo(() => fn, inputs)

Nota

O array não é usado como argumento para o callback. Conceitualmente, porém, é isso
 que eles representam: todos os valores referenciados dentro da função também devem 
 aparecer no array passado como argumento. No futuro, um compilador suficientemente
  avançado poderia criar este array automaticamente.

Recomendamos usar as regras do exhaustive-deps como parte do nosso pacote
 eslint-plugin-react-hooks. Ele avisa quando as dependências são especificadas 
 incorretamente e sugere uma correção.

useMemo */

const memoizedValue = useMemo(() => 
computeExpensiveValue(a,b), [a, b]);

/*Retorna um valor memoizado.

Recebe uma função create e um array como argumentos. O useMemo só recuperará o valor
 memoizado quando o array receber uma atualização. Esta otimização ajuda a evitar
  cálculos caros em cada renderização.

Lembre-se de que a função passada para useMemo será executa durante a renderização.
 Não faça nada lá que você normalmente não faria ao renderizar. Por exemplo, os side
  effects pertencem a useEffect, não à useMemo.

Se nenhum array for fornecido, um novo valor será calculado em cada renderização.

Você pode confiar em useMemo como uma otimização de desempenho, não como uma garantia
 semântica. No futuro, o React pode escolher “esquecer” alguns valores anteriormente
  agrupados e recalculá-los na próxima renderização, por exemplo, para liberar memória
   para outros componentes. Escreva seu código para que ele ainda funcione sem
    useMemo — e depois adicione-o para otimizar o desempenho.

Note

O array de entradas não é passado como argumento para a função. Conceitualmente, porém,
 é isso que eles representam: todos os valores referenciados dentro da função também
  devem aparecer no array passado como argumento. No futuro, um compilador
   suficientemente avançado poderia criar este array automaticamente.

Recomendamos usar as regras do exhaustive-deps como parte do nosso pacote
 eslint-plugin-react-hooks. Ele avisa quando as dependências são especificadas
  incorretamente e sugere uma correção.

useRef */

const refContainer = useRef(initialValue);

/*useRef retorna um objeto ref mutável, no qual a propriedade .current é inicializada
 para o argumento passado (initialValue). O objeto retornado persistirá durante todo
  o ciclo de vida do componente.

Um caso comum de uso é o acesso imperativamente a um componente filho: */

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` aponta para o evento de `focus` gerado pelo campo de texto
    inputEl.current.focus();
  };
  return (
    <>
    <input ref={inputEl} type="text" />
    <button onClick={onButtonClick}>Focus no inpu</button>
    </>
  );
}

/*Essencialmente, useRef é como uma “caixa” que pode conter um valor mutável em
 sua propriedade .current.

Você pode estar familiarizado com os refs principalmente como uma forma de acessar
 o DOM. Se você passar um objeto ref para React com <div ref = {myRef} />, React
  definirá sua propriedade .current para o nó DOM correspondente sempre que esse nó 
  for alterado.

No entanto, useRef () é útil para mais do que o atributo ref. É útil para manter
 qualquer valor mutável em torno, semelhante a como você usaria campos de instância em
  classes.

Isso funciona porque useRef () cria um objeto JavaScript simples. A única diferença
 entre useRef () e a criação de um objeto {current: ...} é que useRef lhe dará o
  mesmo objeto ref em cada render.

Tenha em mente que o useRef não avisa quando o conteúdo é alterado. Mover a
 propriedade .current não causa uma nova renderização. Se você quiser executar
  algum código quando o React anexar ou desanexar um ref a um nó DOM, convém usar
   um callback ref.

useImperativeHandle */

useImperativeHandle(ref, createhandle, [deps])

/*useImperativeHandle personaliza o valor da instância que está exposta aos
 componentes pai ao usar ref. Como sempre, na maioria dos casos, seria bom evitar um
  código imperativo usando refs. O useImperativeHandle deve ser usado com forwardRef:*/

  function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      }
    }));
    return <input ref={inputRef} /*...*/ />;
  }
  FancyInput = forwardRef(FancyInput);

  /*Neste exemplo, um componente pai que renderiza <FancyInput ref={inputRef} /> seria
   capaz de chamar inputRef.current.focus().

useLayoutEffect
A assinatura é idêntica a useEffect, mas dispara sincronizadamente após todas as
 alterações no DOM. Use isto para ler o layout do DOM e renderizar sincronizadamente.
  Atualizações agendadas dentro de useLayoutEffect serão liberadas de forma síncrona,
   antes que o navegador tenha a chance de atualizar.

Prefira o padrão useEffect quando possível, para evitar bloquear atualizações visuais.

Dica

Se você está migrando código de um componente de classe, useLayoutEffect dispara na
 mesma fase que componentDidMount e componentDidUpdate, No entanto, recomendamos
  iniciar com useEffect primeiro e apenas tentar useLayoutEffect se isso causar algum
   problema.

Se você usar a renderização do servidor, tenha em mente que nem useLayoutEffect nem
 useEffect podem ser executados até que o JavaScript seja baixado. É por isso que React
  avisa quando um componente renderizado pelo servidor contém useLayoutEffect. Para
   corrigir isso, mova essa lógica para useEffect (se não for necessário para a
     primeira renderização) ou retarde a exibição desse componente até depois que o
      cliente renderizar (se o HTML parecer quebrado até que useLayoutEffect seja
         executado).

Para excluir um componente que precisa de efeitos de layout do HTML renderizado pelo
 servidor, renderize-o condicionalmente com showChild && <Child /> e adie a exibição
  dele com useEffect (() => { setShowChild(true); }, []). Dessa forma, a UI não parece
   quebrada antes da hidratação.

useDebugValue */

useDebugValue(value)

/*useDebugValue pode ser usado para exibir um label em um custom hook em React DevTools.

Por exemplo, considere o custom hook useFriendStatus descrito em “Criando seus próprios Hooks”:*/

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  //...

  //mostra um `labe` no DevTools ao lado desse hook
  // ex. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}

/*Dica

Não recomendamos adicionar valores de depuração a cada custom hook criado. É mais
 valioso para custom hooks que são partes de bibliotecas compartilhadas.

Adiar a formatação de valores de depuração
Em alguns casos, exibir um valor formatado pode ser uma operação cara. Também é
 desnecessário a menos que um hook seja realmente inspecionado.

Por esta razão, useDebugValue aceita uma função de formatação como um segundo
 parâmetro opcional. Esta função só é chamada se os hooks forem inspecionados. Ele
  recebe o valor de depuração como parâmetro e deve retornar um valor de exibição
   formatado.

Por exemplo, um custom hook que retornou um valor Date poderia evitar chamar a função
 toDateString desnecessariamente passando o seguinte formatador: */

 useDebugValue(date ,date => date.toDateString());