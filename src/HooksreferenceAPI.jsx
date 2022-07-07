import { useEffect } from "react";

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
    const initialState = someExpensiveComputation(props);
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

  