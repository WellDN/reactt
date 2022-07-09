/*Ainda não há um Hook equivalente para os ciclos de vida getSnapshotBeforeUpdate,
getDerivedStateFromError e componentDidCatch.

Hooks substituem render props e HOC (componente de alta-ordem, do inglês high-order
     component)?
Frequentemente, render props e HOC renderizam somente um filho. Nós achamos que Hooks
 são uma maneira mais simples de atender esse caso de uso. Ainda existe lugar para
  ambos os padrões (por exemplo, um componente de scroll virtual talvez tenha uma
     prop renderItem, ou um container visual talvez tenha sua própria estrutura DOM).
      Mas na maioria dos casos, Hooks serão suficiente e podem ajudar a reduzir o
       aninhamento na sua árvore.

    Testing Recipes (TestUtils)*/

       function Example() {
        const [count, setCount] = useState(0); //Component Counter
        useEffect(() => {
          document.title = `You clicked ${count} times`;
        });
        return (
          <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
              Click me
            </button>
          </div>
        );
      }
      
      /*Nós vamos testa-lo usando React DOM. Para garantir que o comportamento
       corresponde ao que acontece no browser, nós vamos envolver o código que
        renderiza e atualiza com ReactTestUtils.act(): */

        import React, { useCallback, useEffect } from 'react'; 
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
            //Testa a primeira renderização e efeito
            act(() => {
                ReactDOM.render(<Counter />, container);
            });
            const button = container.querySelector('button');
            const label = container.querySelector('p');
            expect(label.textContent).toBe('You clicked 0 times');
            expect(document.title).toBe('Your clicked 0 times');

            //Testa segunda renderização e efeito
            act(() => {
                button.dispatchEvent(new MouseEvent('click',
                {bubbles: true}));
            });
            expect(label.textContent).toBe('You clicked 1 times');
            expect(document.title).toBe('You clicked 1 times');
        });
            //...


        /*De Classes para Hooks
Como os métodos de ciclo de vida correspondem aos Hooks?

constructor: Funções não precisam de um constructor. Você pode inicializar o estado
 com o useState. Se calcular o estado for custoso, você pode passar uma função para
  o useState.
getDerivedStateFromProps: Não é necessário, agende um update enquanto estiver
 renderizando.
shouldComponentUpdate: Veja React.memo abaixo.
render: Este é o próprio corpo da função.
componentDidMount, componentDidUpdate, componentWillUnmount: O Hook useEffect pode
 expressar todas as combinações desses, (incluindo casos menos comuns).
getSnapshotBeforeUpdate, componentDidCatch e getDerivedStateFromError: Não há Hooks
 equivalentes para esses métodos ainda, mas eles serão adicionados em breve.
 
 Existe algo como variáveis de instância?
Sim! O Hook useRef() não é somente para DOM. O objeto “ref” é um container genérico no
 qual a propriedade current é mutável e pode conter qualquer valor, similar a uma
  propriedade de instância de uma classe.

Você pode escrever nele de dentro do useEffect:*/

function Timer() {
    const intervalRef = useRef();

    useEffect(() => {
        const id = setInternal(() => {
            // ...
        });
        intervalRef.current = id;
        return () => {
            clearInterval(intervalRef.current);
        };
    });

    // ...
}

/*Se nós só quiséssemos criar um intervalo, não precisaríamos de ref (id poderia ser
     local do efeito), mas é útil se quisermos limpar o intervalo usando um manipulador
      de eventos: */

      //...
      function handleCancelClick() {
        clearInterval(intervalRef.current);
      }
      //...

      /*Conceitualmente, você pode pensar em refs como similares a variávels de
       instância em uma classe. A menos que você esteja fazendo inicialização lazy,
        evite definir refs durante a renderização — isso pode levar a comportamentos
         inesperados. Ao invés disso, normalmente você deseja modificar as refs nos
          manipuladores de eventos e efeitos.

Devo usar uma ou muitas variáveis de estado?
Se você está vindo de classes, você pode ser tentado a sempre chamar useState() uma
 vez e por todo o estado em um único objeto. Você pode fazer isso se quiser. Aqui
  segue um exemplo de um componente que segue o movimento do mouse. Nós guardamos sua
   posição e tamanho no estado local: */

   function Box() {
    const [state, setState] = useState({ left: 0, top:
    0, width: 100, height: 100});
    // ...
   }

   /*Agora vamos dizer que queremos escrever uma lógica que muda left e top quando
    o usuário move o seu mouse. Note que nós temos que mesclar esses campos no estado
     anterior manualmente: */

     // ...
     useEffect(() => {
        function handleWindowsMouseMove(e) {
            // Espalhando "...state" garante que width e height não se "percam"
            setState(state => ({ ...state, left: e.pageX,
            top: e.pageY}));
        }
        //Nota: essa implementação é um pouco simplificada
        window.addEventListener('mousemove',
        handleWindowsMouseMove);
        return () =>
        window.removeEventListener('mousemove',
        handleWindowMouseMove);
     }, []);
     //...

     /*Isto é porque quando atualizamos uma variável de estado, nós substituimos seu
      valor. É diferente de this.setState em uma classe, que mescla os campos
       atualizados no objeto.

Se você sente falta da mesclagem automática, você poderia escrever um Hook customizado,
 useLegacyState, que mescla o update no objeto. No entanto, nós recomendamos dividir o
  estado em múltiplas variáveis de estado baseado nos valores que tendem a mudar
   juntos.

Por exemplo, poderíamos dividir nosso componente em position e size e sempre substituir
 position sem a necessidade de mesclar: */

 function Box() {
    const [position, setPosition] = useState ({ left: 0,
    top: 0 });
    const [size, setSize] = useState({ width: 100,
    height: 100});

    useEffect(() => {
        function handleWindowMouseMove(e) {
            setPosition({ left: e.pageX, top: e.pageY});
        }
    })
    //...
 }

 /*Separar o estado em variáveis independentes também tem outro benefício. Torna mais
  fácil para extrair uma lógica relacionada para um Hook customizado posteriormente,
   como por exemplo: */

   function Box() {
    const position = useWindowPosition();
    const [size, setSize] = useState({ width: 100,
    height: 100 });
    //...
   }

   function useWindowPosition() {
    const [position, setPosition] = useState({ left: 0,
    top: 0 });
    useEffect(() => {
        //...
    }, []);
    return position;
   }

   /*Note como nós conseguimos mover a chamada useState da variável de estado position
    e o efeito relacionado para um Hook customizado sem alterar o seu código. Se todo
     o estado estivesse em um único objeto, extrair seria mais difícil.

Tanto colocar todo estado em um único useState e usar múltiplos useState para cada
 campo pode funcionar. Componentes tendem a ser mais legíveis quando você encontra
  um balanço entre esses dois extremos e agrupa estados relacionados em algunas
   variáveis de estado independentes. Se a lógica do estado se torna muito complexa,
    nós recomendamos gerenciá-la com um reducer ou com um Hook customizado.

Posso usar um efeito somente em updates?
Esse é um caso de uso raro. Se você precisar, você pode usar uma ref mutável para
 manualmente armazenar um valor boleano correspondente a se você está no primeiro
  render ou num subsequente, usando então essa flag no seu efeito. (Se você se
     encontrar fazendo isso regularmente, pode criar um Hook customizado pra isso.)

Como acessar as props ou o estado anterior?
Atualmente, você pode fazer isso manualmente com uma ref: */

function Counter() {
    const [count, setCount] = useState(0);

    const prevCountRef = useRef();
    useEffect(() => {
        prevCountRef.current = count;
    });
    const prevCount = prevCountRef.current;

    return <h1>Now: {count}, before: {prevCount}</h1>
}

/*isso pode ser um pouco confuso mas você pode extrair para um Hook customizado: */

function Counter() {
    const [count, setCount] = useState(0);

    const calculation = count + 100;
    const prevCalculation = usePrevious(calculation);
    //...
}

/*É possível que no futuro o React forneça um Hook usePrevious pois esse é um caso de
 uso relativamente comum.

Veja também o padrão recomendado para estado derivado.

Por que estou vendo props obsoletos ou state dentro da minha função?
Qualquer função dentro de um componente, incluindo manipuladores de eventos e
 efeitos, “vê” as props e o state da renderização em que foi criado. Por exemplo,
  considere este código: */

  function example() {
    const [count, setCount] = useState(0);

    function handleAlertClick() {
        setTimeout(() => {
            alert('Você clicou: ' + count);
        }, 3000);
    }
  }

  return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Mostrar
        </button>
        <button onClick={handleAlertClick}>
            Mostrar aviso
        </button>
    </div>
  );
  
  /*Se você clicar primeiro em “Mostrar aviso” e incrementar o contador, o alerta
   mostrará a variável count no momento em que clicou no botão “Mostrar alerta”. Isso
    evita erros causados pelo código assumindo props e state não muda.

Se você intencionalmente queser ler o state lastest de algum retorno de chamada
 assincrono, você poderia mantê-lo em uma ref, mude-o e leia a partir dele.

Finalmente, outro possível motivo que você está vendo props obsoletos ou state é se
 você usa a otimização do “array de dependência”, mas não especificou corretamente
  todas as dependências. Por exemplo, se um efeito especifica [] como o segundo
   argumento mas lê someProp dentro, ele continuará “vendo” o valor inicial de
    someProps. A solução é remover o array de dependências ou corrigi-lo. Aqui está
     como você pode lidar com funções, e aqui está outras estratégias comuns para
      executar efeitos com menos frequência sem ignorar incorretamente as dependências.
       
      Como implementar getDerivedStateFromProps?
Enquanto você provavelmente não precisa dele, nos raros casos que você precisar
 (como ao implementar um componente de <Transition>), você pode atualizar o estado
  enquanto estiver renderizando. React vai re-renderizar o componente com o estado
   atualizado imediatamente após sair do primeiro render, então não seria custoso.

Aqui, nós guardamos o valor anterior da prop row em uma variável de estado para que
 possamos comparar:*/

 function ScrollView({row}) {
    const [isScrollingDown, setIsScrollingDown] =
    useState(false);
    const [prevRow, setPrevRow] = useState(null);

    if (row !== prevRow) {
        //Row mudou desde a ultima renderização. Atualize isScrollingDown
        setIsScrollingDown(prevRow !== null && row > prevRow);
        setPrevRow(row);
    }

    return `Scrolling down: ${isScrollingDown}`;
 }

 /*Isto pode parecer estranho a princípio, mas um update durante o render é exatamente
  o que getDerivedStateFromProps sempre foi conceitualmente.

Existe algo como forceUpdate?
Ambos os Hooks useState e useReducer evitam atualizações se o próximo valor é igual
 ao anterior. Alterar o estado diretamente e chamar setState não vai causar uma
  re-renderização.

Normalmente, você não deve alterar o estado local no React. No entanto, como uma
 alternativa, você pode usar um contador incremental para forçar um re-render mesmo
  se o estado não mudou: */

  const [ignored, forceUpdate] = useReducer (x => x +
    1, 0);

    function handleClick() {
        forceUpdate();
    }

    /*Tente evitar esse padrão se possível.

Posso fazer uma ref para um componente de função?
Enquanto você não deve precisar muito disso, você pode expor alguns métodos
 imperativos para um parente com o Hook useImperativeHandle.

Como posso medir um nó DOM?
Uma maneira rudimentar de medir a posição ou o tamanho de um nó DOM é usar um callback
 ref. React chamará esse callback sempre que a ref for anexado a um nó diferente. Aqui
  está uma pequena demonstração: */
  
  function MeasureExample() {
    const [height, setHeight] = useState(0);

    const measuredRef = useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientReact().height);
        }
    }, []);
  }

  return (
    <>
    <h1 ref ={measuredRef}>Hello, world</h1>
    <h2>O header acima tem {Math.round(height)}px de
    altura</h2>
    </>
  );

  /*Nós não escolhemos useRef neste exemplo porque um objeto ref não nos avisa sobre
   alterações para o valor atual da ref. A utilização de um callback ref garante que
    mesmo que um componente filho exiba o nó medido posteriormente (e.g. em resposta
         a um clique), ainda somos notificados sobre isso no componente pai e podemos
          atualizar as medições.

Note que nós passamos [] como um array de dependências para useCallback. Isso garante
 que nosso ref callback não seja alterado entre as novas renderizações e, portanto,
  o React não o chamará desnecessariamente.

Neste exemplo, a ref de callback será chamado somente quando o componente for montado
 e desmontado, pois o componente renderizado <h1> permance presente em todos os
  repetidores. Se você deseja ser notificado sempre que um componente é
   redimensionado, você pode usar ResizeObserver ou uma Hook de terceiros construído
    sobre ele.

Se você quiser, você pode extrair essa lógica em um Hook reutilizável: */

function MeasureExample() {
    const [rect, ref] = useClientReact();
    return (
        <>
        <h1 ref={ref}>hello, world</h1>
        {rect !== null &&
        <h2>O header acima tem
    {Math.round(rect.height)}px de altura</h2>
}
    </>
    );
}

function useClientReact() {
    const [rect, setRect] = useState(null);
    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientReact());
        }
    }, []);
    return [rect, ref];
}

/*O que const [thing, setThing] = useState() significa?
Se essa sintaxe não é familiar para você, confira a explicação na documentação do Hook
 State.

Otimizações de Performance
Posso pular um efeito nos updates?
Sim. Veja disparando um efeito condicionalmente. Note que esquecer de lidar com
 updates geralmente introduz bugs, por isso que este não é o comportamento padrão.

É seguro omitir funções da lista de dependências?
De um modo geral, não. */

function Example({ someProp }) {
    function doSomething() {
        console.log(someProp);
    }

    useEffect(() => {
        doSomething();
    }, []); //Isto não é seguro (ele chama `doSomething` que usa `someProp`)
}

/*É difícil lembrar quais props ou state são usados por funções fora do efeito. É por
 isso que normalmente você vai querer declarar funções necessárias para um efeito
  dentro dele. Então é fácil ver em quais valores do escopo do componente esse efeito
   depende: */

   function Example({ someProp }) {
    useEffect (() => {
        function doSomething() {
            console.log(someProp);
        }

        doSomething();
    }, []); //Ok neste exemplo porque não usamos *nenhum* dos vlaores do escopo do component
   }

   /*Vamos ver porque isso é importante.

Se você especificar uma lista de dependências como o último argumento para useEffect,
 useLayoutEffect, useMemo, useCallback, ou useImperativeHandle, ele deve incluir todos
  os valores usados dentro do callback e participar do fluxo de dados React. Isso
   inclui props, state e qualquer coisa derivada deles.

É somente seguro omitir uma função da lista de dependências se nada nela (ou as funções
     chamadas por ela) referenciar props, state ou valores derivados deles. Este
      exemplo tem um erro: */

      function ProductPage({ productId }) {
        const [product, setProduct] = useState(null);

        async function fetchProduct() {
            const response = await
            fetch('http://myapi/product/' + productId);
        //Usando productId prop
        const json = await response.json();
        setProduct(json);
        }

        useEffect(() => {
            fetchProduct();
        }, []); //Inválido porque `fetchproduct` usa ``productId`
        //...
      }

      /*A correção recomendada é mover essa função inside do seu efeito. Isso torna
       mais fácil ver quais props ou state seu efeito usa e garantir que todos sejam
        declarados: */

        function ProductPag({ productId}) {
            const [product, setProduct] = useState(null);

            useEffect(() => {
                //Ao mover essa função dentro do efeito, podemos ver calramente os
            //valores que ela usa.
            async function fetchProduct() {
                const response = await
            fetch('http://myapi/product/' + prodcutId);
            const json = await response.json();
            setProduct(json);
            }

            fetchProduct();
            }, [productId]); //Válido porque nossos efeitos usa somento productId
        }

        /*Isso também permite que você gerencie respostas fora de ordem com uma
         variável local dentro do efeito:  */

         useEffect(() => {
            let ignore = false;
            async function fetchProduct() {
                const response = await
            fetch('http://myapi/product/' + productId);
            const json = await response.json();
            if (!ignore) setProduct(json);
            }

            fetchProduct();
            return () => { ignore = true }; 
         }, [productId]);

         /*movida a função dentro do efeito para que não precise estar em sua lista
          de dependências. 
          
        Se por alguma razão você não pode mover uma função dentro de um efeito, existem mais algumas opções:

Você pode tentar mover essa função para fora do seu componente. Nesse caso, a função é
 garantida para não referenciar nenhum props ou state, e também não precisa estar na
  lista de dependências.
Se a função que você está chamando é um cálculo puro e é seguro ligar enquanto
 renderiza, você pode chamá-lo fora do efeito em vez disso, e fazer o efeito depender
  do valor retornado.
Como último recurso, você pode adicione uma função na dependência do efeito, mas
 envolva sua definição no useCallback Hook. Isso garante que ele não seja alterado em
  todas as renderizações, a menos que suas próprias dependências também sejam
   alteradas:  */

   function ProductPage ({ productId}) {
    //Envolva com useCallback para evitar alterações em todos os renderizadores
    const fetchProduct = useCallback(() => {
        // ... Faz algo com productId ...
    }, [productId]); //todas as dependencias useCallback são especificadas

    return <ProdcutDetails fetchProduct ={fetchProduct}
    />;
   }

   function ProductDetails({ fetchProduct }) {
    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]); //Todas as dependencias do useEffect são especificadas
    // ...
   }

   /*Note que no exemplo acima nós precisamos para manter a função na lista de
    dependências. Isso garante que uma mudança na productId prop do ProductPage aciona
     automaticamente uma busca no componente ProductDetails.

O que posso fazer se minhas dependências de efeito mudarem com muita frequência?
Às vezes, seu efeito pode estar usando o state que muda com muita freqüência. Você
 pode ser tentado a omitir esse state de uma lista de dependências, mas isso
  geralmente leva a erros: */

  function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(count + 1); //Este efeito depende do estado `count`
        }, 1000);
        return () => clearInterval(id);
    }, []); //Bug: `count` não é especificado como uma dependencia

    return <h1>{count}</h1>;
  }

  /*O conjunto vazio de dependências, [], significa que o efeito só será executado uma
   vez quando o componente for montado, e não em todas as re-renderizações. O problema
    é que dentro do callback setInterval, o valor de count não muda, porque nós
     criamos um fechamento com o valor de count configurando para 0 como era quando o
      retorno de chamada do efeito era executado. A cada segundo, este callback então
       chama setCount(0 + 1), então a contagem nunca vai acima de 1.

Especificando [count] como uma lista de dependências iria corrigir o bug, mas faria
 com que o intervalo fosse redefinido em cada alteração. Efetivamente, cada setInterval
  teria uma chance de executar antes de ser limpo (semelhante a um setTimeout). Isso
   pode não ser desejável. Para corrigir isso, podemos usar o form de atualização
    funcional do setState. Ele nos permite especificar como o state precisa mudar sem
     referenciar o state atual: */

     function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const id = setInterval(() => {
                setCount(c => c + 1); //isso não dpeende da viarável `count` fora
            }, 1000);
            return () => clearInterval(id);
        }, []); //Nosso efeito não usa nenhuma variável no escopo do componente
        return <h1>{count}</h1>
     }

     /*(A identidade da função setCount é garantida como estável, então é seguro
         omitir.)

Agora, o retorno de chamada setInterval é executado uma vez por segundo, mas sempre
 que a chamada interna para setCount pode usar um valor atualizado para count
  (chamado c no retorno do callback aqui.)

Em casos mais complexos (como se um state dependesse de outro state), tente mover a
 lógica de atualização de state para fora do efeito com o useReducer Hook. O artigo
  oferece um exemplo de como você pode fazer isso. A identidade da função dispatch do
   useReducer é sempre estável — mesmo se a função reducer for declarada dentro do
    componente e ler seus props.

Como último recurso, se você quer algo como this em uma classe, você precisa usar uma
 ref para manter uma variável mutável. Então você pode escrever e ler para ele. Por
  exemplo: */

  function Example(props) {
    //Mantenha as últimas props em um ref.
    const latestProps = useRef(props);
    useEffect(() => {
        latestProps.current = props;
    });

    useEffect(() => {
        function tick() {
            //leia as últimas props a qualquer momento
            console.log(latestProps.current);
        }

        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []); //Esse efeito nunca é executado novamente
  }

  /*Só faça isso se você não conseguir encontrar uma alternativa melhor, confiar em
   mutação torna os componentes menos previsíveis. Se houver um padrão específico que
    não seja bem traduzido, abra uma issue com um código de exemplo executável e
     podemos tentar ajudar.

Como implementar shouldComponentUpdate?
Você pode envolver o componente de função com React.memo para comparar
 superficialmente suas props: */

 const Button = React.memo((props) => {
    // seu componente
 });

 /*Este não é um Hook porque não compõe como um Hook normalmente faz. React.memo é o
  equivalente de PureComponent, mas compara somente props. (Você pode também adicionar
     um segundo argumento para especificar uma função de comparação que recebe as
      props velhas e novas. Se esta retorna true, o update é evitado.)

React.memo não compara estado porque não há nenhum único objeto de estado para
 comparar. Mas você pode tornar filhos puros também, ou até otimizar filhos
  específicos com useMemo.

Como memorizar cálculos?
O Hook useMemo permite que você evite cáculos entre múltiplas renderizações se
 “lembrando” dos cálculos feitos anteriormente: */

 const memoizedValue = useMemo(() => 
 computeExpensiveValue(a,b) , [a, b]);

 /*Esse código chama computeExpensiveValue(a, b). Mas se as dependências [a, b] não
  mudaram desde o último valor, useMemo não chama a função novamente e simplesmente
   retorna o valor retornado anteriormente.

Lembre-se que a função passada para useMemo é executada durante a renderização. Não 
faça nada que você normalmente não faria durante a renderização. Por exemplo, efeitos
 colaterais devem ser feitos usando useEffect, não useMemo.

Você pode confiar em useMemo como uma otimização de performace, não como uma garantia
 semântica. No futuro, React pode optar por “esquecer” alguns valores previamente
  memorizados e recalcular eles na próxima renderização, por exemplo para liberar
   memória para componentes fora da tela. Escreva seu código de maneira que ele 
   funcione sem useMemo — e então adicione-o para otimizar o desempenho. (Para raros
     casos aonde um valor nunca deve ser recomputado, você pode inicializar
      posteriomente uma ref.)

Convenientemente, useMemo também deixa você pular uma re-renderização custosa de um 
filho: */

function Parent ({ a, b}) {
    //somente re-renderizado se `a` muda:
    const child1 = useMemo (() => <Child1 a={a} />, [a]);
    //somente re-renderizado se `b` muda:
    const child2 = useMemo (() => <Child2 b={b} />, [b]);
    return (
        <>
        {child1}
        {child2}
        </>
    )
}

/*Note que essa abordagem não vai funcionar em um loop porque Hooks não podem ser
 postos dentro de loops. Mas você pode extrair um componente separado para os items
  da lista e chamar useMemo nele.

Como criar objetos custosos a demanda?
useMemo permite memorizar um cálculo custoso se as dependências são as mesmas. No
 entanto, ele não garante que a computação não será re-executada. Algumas vezes
  você precisa ter certeza que um objeto só é criado uma vez.

O primeiro caso de uso comum é quando criar o estado inicial é custoso: */

function Table(props) {
    //createRows() é executada em todo render
    const [rows, setRows] =
    useStated(createRows(props.count));
    //...
}

/*Para evitar re-criar o estado inicial, podemos passar uma função para useState: */

function Table(props) {
    //createRows() é só executada uma vez
    const [rows, setRows] = useState (() =>
    CreateRows(props.count));
    // ...
}

/*React só vai executar essa função durante a primeira renderização. Veja a API do 
 useState.

Você também pode ocasionalmente querer evitar recriar o valor inicial de useRef().
 Por exemplo, talvez você quer garantir que algumas instâncias de classe imperativa
  só seja criada uma vez: */

  function Image(props) {
  // IntersectionObserver é criado em todo render
  const ref = useRef(new
    IntersectionObserver(onIntersect));
    //...
  }

  /*useRef não aceita uma função como useState. Ao invés disso, você pode criar sua
  própria função que cria e define-o posteriormente: */

  function Image(props) {
    const ref = useref(null);
    
    //IntersectionOberserver é criado somente uma vez
    function getOberserver() {
        if (ref.current === null) {
            ref.current = new
        IntersectionObeserver(onIntersect);
        }
        return ref.current;
    }

    //quando voce precisar, execute getObserver()
    //...
  }

  /*Isto evita criar um objeto custoso até que ele seja realmente necessário pela
   primeira vez. Se você usa Flow ou TypeScript, você pode também dar getObserver()
    um tipo não nulo por conveniência.

Hooks são mais lentos por criar funções no render?
Não. Nos browsers modernos, o desempenho bruto de closures comparados à classes não
 difere significantemente exceto em casos extremos.

Em adição, considere que o design de Hooks é mais eficiente por alguns motivos:

Hooks evitam muito da sobrecarga que classes exigem, como o custo de criar instâncas
 de classes e fazer o bind the manipuladores de eventos no constructor.
Código idiomático usando Hooks evita aninhamento profundo de componentes que prevalece
 nas codebases que usam HOC, render props e context. Com árvores de componentes
  menores, React tem menos trabalho a fazer.
Tradicionalmente, preocupações de desempenho sobre funções inline no React tem sido
 relacionadas a como passar novas callbacks em cada renderização quebra as otimizações
  de shouldComponentUpdate nos componentes filho. Hooks abordam esse problema de três
   maneiras.

O Hook useCallback permite que você mantenha a mesma callback entre re-renderizações
 para que shouldComponentUpdate continue a funcionar: */

 // Não vai mudar ao menos que `a` ou `b` mude
 const memoizedCallback = useCallback (() => {
    doSomething(a, b);
 }, [a, b]);

 /*O Hook useMemo torna mais fácil controlar quando filhos específicos atualizam,
  reduzindo a necessidade de pure components.
Finalmente, o Hook useReducer reduz a necessidade de passar callbacks profundamente,
 como explicado abaixo.
Como evitar passar callbacks para baixo?
Nós descobrimos que a maioria das pessoas não gostam de passar callbacks manualmente
 através de cada nível de uma árvore de componente. Mesmo sendo mais explícito, pode
  parecer como um monte de “encanamento”.

Em árvores grandes de componentes, uma alternativa que recomendamos é passar para
 baixo a função dispatch do useReducer via context: */

 const TodosDispatch = React.createContext(null);

 function TodosApp() {
    //Nota: `dispatch` não vai mudar entre re-renderizações
    const [todos, dispatch] = useReducer(todosReducer);

    return (
        <TodosDispatch.Provider value={dispatch}>
            <DeepTree todos={todos} />
        </TodosDispatch.Provider>
    );
 }

 /*Qualquer filho na árvore dentro de TodosApp pode usar a função dispatch para
  disparar ações para o TodosApp: */

  function DeepChild(props) {
    // Se queremos executar uma ação, podemos pegar
    //dispatch do context.
    const dispatch = useCOntext(TodosDispatch);

    function handleClick() {
        dispatch ({ type: 'add', text: 'hello' });
    }

    return (
        <button onClick={handleCLick}>Add todo</button>
    );
  }

  /*Isso é mais mais conveniente do ponto de vista de manutenção (não há a necessidade
     de passar callbacks) e evita o problema de passar callbacks como um todo. Passando
      dispatch desta maneira é o padrão recomendado para atualizações profundas.

Note que você ainda pode escolher entre passar o estado da aplicação para baixo como
 props (mais explícito) ou como context (mais conveniente para atualizações bem
     profundas). Se você também usar context para o estado, use dois tipos de context
      diferentes — o dispatch nunca muda, então componentes que leem ele não precisam
       re-renderizar a menos que precisem também do estado da aplicação.

Como ler um valor frequentemente variável de useCallback?
Nota

Recomendamos passar dispatch para baixo com context ao invés de callbacks individuais
 em props. A abordagem abaixo só é mencionada aqui para a integralidade e como válvula
  de escape.

Em alguns casos raros você pode precirar memorizar uma callback com useCallback mas
 a memorização não funciona muito bem porque a função interna tem que ser recriada
  muitas vezes. Se a função que você está memorizando é um manipulador de eventos e
   não é usado durante a renderização, você pode usar ref como uma variável de
   instância e salvar o último valor nela manualmente: */

   function Form() {
    const [text, updateText] = useState(``);
    const textRef = useRef();

    useEffect(() => {
        textRef.current = text; //Guarda o valor na ref
    });

    const handleSubmit = useCallback(() => {
        const currentText = textRef.current; //Le o valor da ref
        alert(currentText);
    }, [textRef]); //Não recria handleSubmit como [text] faria

    return (
        <>
        <unput value={text} onChange={e =>
    updateText(e.target.value)} />
    <ExpensiveTree onSubmit={handleSubmit} />
    </>
    );
   }

   /*Este é um padrão um tanto confuso mas mostra que você pode usar essa válvula de
    escape se precisar. É mais suportável se você extrair para um Hook customizado: */

    function Form() {
        const [text, updateText] = useState('');
        //Será memorizado mesmo se `text` mudar:
        const handleSubmit = useEventCallback(() => {
            alert(text);
        }, [text]);

        return (
            <>
            <input value={text} onChange={e =>
        updateText(e.target.value)} />
        <ExpensiveTree onSubmit={handleSubmit} />
        </>
        );
    }

    function useEventCallback(fn, dependencies) {
        const ref = useRef(() => {
            throw new Error('Cannot call an event handler while rendering.');
        });

        useEffect(() => {
            ref.current = fn;
        }, [fn, ...dependencies]);

        return useCallback(() => {
            const fn = ref.current;
            return fn();
        }, [ref]);
    }

    /*Em ambos os casos, não recomendamos esse padrão e só estamos mostrando aqui para
     integralidade. É melhor evitar passar callbacks para baixo.

Por detrás das cortinas
Como o React associa chamadas de Hooks com componentes?
React acompanha o componente que está renderizando. Graças as Regras dos Hooks,
 sabemos que Hooks são chamados somente dentro de componentes React (ou Hooks
     customizados — que também só são chamados dentro de componentes React).

Existe uma lista interna de “células de memória” associadas a cada componente. Elas são
 somente objetos JavaScript aonde podemos colocar alguns dados. Quando você chama um
  Hook como useState(), é lido a célula atual (ou inicializada durante a primeira
     renderização), e então move o ponteiro para a próxima. É assim que múltiplas
      chamadas de useState() recebem seu estado local independente.

Quais são as referências que influênciaram a criação dos Hooks?
Hooks sintetizam ideias de diferentes fontes:

Nossos velhos experimentos com APIs funcionais no repositório react-future.
Experimentos da comunidade React com APIs de prop de renderização, incluindo Reactions
 Component feito por Ryan Florence.
A proposta da palavra chave adopt como um auxiliar para render props, feito por 
Dominic Gannaway.
Variáveis de estado e células de estado em DisplayScript.
Reducer components em ReasonReact.
Subscriptions em Rx.
Efeitos algébricos em Multicore OCaml. */

