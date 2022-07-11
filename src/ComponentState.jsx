incrementCount() ///{
    //Nota: isso *não* vai funcionar como esperado.
    this.setState({count: this.state.count + 1});
//}

handleSomething() //{
    //Digamos que 'this.state.count' começa em 0.
    this.incrementCounter();
    this.incrementCounter();
    this.incrementCounter();
    // QUando o React renderizar novamento o componente, 'this.state.count' será 1 ,
    //mas voce esperava 3.
    //isso é porque a função 'incrementCount()' usa 'this.state.count',
    //mas o React não atualiza 'this.state.count' até o componente ser renderizado
    //novamente. então 'incrementCount()' acaba lendo 'this.state.count' como 0 todas
    //as vezes, e muda seu valor para 1.

    //A solução é exibida abaixo!
//}

/*Veja abaixo como solucionar esse problema. 

Como eu atualizo o state com valores que dependem do state atual?
Passe uma função ao invés de um objeto para setState para garantir que a chamada
 sempre use o valor mais recente do state (veja abaixo).

Qual é a diferença entre passar um objeto e uma função em setState?
Passar uma função de atualização permite que você acesse o valor atual do state
 dentro dela. Como as chamadas de setState são feitas em lotes, isso permite que
  você encadeie atualizações e garanta que elas se componham ao invés de entrar em
  conflito:*/

  incrementCount() //{
    this.setState((state) => {
        //Importante: use 'state' em vez de 'this.state' quando estiver atualizando.
        return {count: state.count + 1}
    });
 // }

  handleSomething() //{
    //Digamos que 'this.state.count' começa em 0.
    this.incrementCount();
    this.incrementCount();
    this.incrementCount();

    //Se voce ler 'this.state.count' agora, ele ainda seria 0.
    //mas quando o react renderizar novament o componente, ele será 3.
 // }

  /*Quando setState é assíncrono?
Atualmente, setState é assíncrono dentro de manipuladores de evento.

Isso garante que, por exemplo, caso tanto Parent quanto Child chamem setState após um
 evento de clique, Child não seja renderizado duas vezes. Em vez disso, React executa
  todas as atualizações de estado ao final do evento do navegador. Isso resulta numa
   melhoria de performance significativa para aplicativos maiores.

Isso é um detalhe de implementação, então evite depender disso diretamente. Em versões
 futuras, o React fará atualizações em lotes em mais casos.

Por que o React não atualiza this.state síncronamente?
Como explicado na seção anterior, React intencionalmente “espera” até todos os
 componentes terem chamado setState() em seus manipuladores de evento antes de começar
  a renderizar novamente. Isso aumenta performance por evitar renderizações
   desnecessárias.

No entanto, você pode ainda estar se perguntando porque o React simplesmene não
 atualiza this.state imediatamente, sem renderizar novamente.

Existem duas principais razões:

Isso quebraria a consistência entre props e state, causando problemas muito difíceis
 de debugar.
Isso tornaria algumas das novas funcionalidades em que estamos trabalhando impossíveis
 de implementar.
Esse comentário no GitHub se aprofunda em exemplos específicos.

 */