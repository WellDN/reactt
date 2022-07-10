if (__DEV__) {
    console.error('Algo está errado.');             ///o código-base do react usa console.error para exibir avisos:
}

/*Os alertas só são ativados no desenvolvimento. Na produção, eles são retirados. Se
 você precisar impedir a execução de algum caminho do código, use o módulo invariant
  em vez disso: */

  var invariant = require ('invariant');

  invariant(
    2 + 2 === 4, 
    'Você não vai passar!'
  );

  /*O invariant é lançado quando a condição invariant é false.

“Invariant” é apenas uma maneira de dizer “essa condição sempre é verdadeira”. Você
 pode pensar nisso como fazer uma afirmação.

É importante manter o comportamento de desenvolvimento e produção similares. Então
 o invariant é lançado tanto no desenvolvimento quanto na produção. As mensagens de
  erro são substituídas automaticamente por códigos de erro em produção para evitar
   afetar negativamente o tamanho do byte.

Desenvolvimento e produção
Você pode usar a variável pseudo-global __DEV__ no código-base para proteger blocos
 de código usados apenas no desenvolvimento.

Ele é embutido durante a etapa de compilação e se transforma em verificações
 process.env.NODE_ENV! == 'production' nos builds do CommonJS.

Para builds autônomas, ele se torna true na build não-minificada e é completamente
 eliminado com os blocos if que ele guarda na construção minificada. */

 if (__DEV__) {
    //Esse código vai executar apenas no desenvolvimento.
 }

 /*Flow
Recentemente, começamos a introduzir verificações do Flow no código-base. Os arquivos 
marcados com a anotação @ flow no comentário do cabeçalho da licença estão sendo
 verificados com typecheck.

Aceitamos pull requests adicionando anotações do Flow ao código existente. Anotações
 de fluxo são assim: */

// ReactRef.detachRefs = function (
//    instance: ReactInstace,
//    element: ReactElement | number | null |
//    false,
// ): void {
    // ...
// }

 /*Quando possível, o novo código deve usar anotações do Flow. Você pode executar o yarn flow localmente para verificar seu código com o Flow.

Pacotes Múltiplos
React é um monorepo. Seu repositório contém vários pacotes separados para que suas alterações possam ser coordenadas em conjunto e os problemas residam em um só lugar.

React Core
O “core” do React inclui todas as React APIs de nível superior, por exemplo:

React.createElement()
React.Component
React.Children
O core React inclui apenas as APIs necessárias para definir os componentes. Não inclui
 o algoritmo de reconciliação ou qualquer código específico da plataforma. Ele é usado
  pelos componentes React DOM e React Native.

O código do React core está localizado em packages/react na árvore de origem. Está 
disponível no npm como o pacote react. A construção do navegador independente
 correspondente é chamada react.js,e exporta um global chamado React.

Renderizadores
O React foi originalmente criado para o DOM, mas depois foi adaptado para também
 suportar plataformas nativas com o React Native. Isso introduziu o conceito de 
 “renderizadores” para as partes internas do React.

Os renderizadores gerenciam como uma árvore no React se transforma nas chamadas de
 subjacentes da plataforma.

Renderizadores também são encontrados em packages/:

Renderizador de React DOM renderiza componentes React para o DOM. Implementa APIs do
 React de nível superior e está disponível como pacote npm react-dom. Ele também pode
  ser usado como um pacote de navegador autônomo chamado react-dom.js que exporta um 
  global do ReactDOM.
Renderizador do React Native renderiza componentes React para views nativas. É usado
 internamente pelo React Native.
Renderizador de testes do React renderiza componentes React para árvores JSON. É 
usado pela funcionalidade de teste de Snapshot atributo do Jest e está disponível como
 pacote npm react-test-renderer .
O único outro renderizador oficialmente suportado é o react-art. Costumava estar em um
 repositório GitHub separado mas nós os movemos para a árvore de código principal.

Nota:

Tecnicamente o react-native-renderer é uma camada muito fina que ensina o React a
 interagir com a implementação do React Native. O código específico da plataforma 
 real que gerencia as views nativas reside no repositório do React Native junto com
  seus componentes.

Reconciliadores
Até mesmo renderizadores muito diferentes, como o React DOM e o React Native, precisam
 compartilhar muita lógica. Em particular, o algoritmo de reconciliação deve ser o
  mais semelhante possível para que a renderização declarativa, os componentes 
  personalizados, o state, os lifecycle methods e os refs funcionem de maneira
   consistente em todas as plataformas.

Para resolver isso, diferentes renderizadores compartilham algum código entre eles.
 Nós chamamos essa parte do React de “reconciliador”. Quando uma atualização como
  setState() está agendado, o reconciliador chama o método render() em componentes
   na árvore e monta, atualiza ou desmonta.

Os reconciliadores não são empacotados separadamente porque atualmente não possuem uma
 API pública. Em vez disso, eles são usados exclusivamente por renderizadores como
  React DOM e React Native.

Reconciliador Stack
O reconciliador “stack” é a implementação que energiza o React 15 e o anterior. Desde
 então, paramos de usá-lo, mas está documentado em detalhes na próxima seção.

Reconciliador Fiber
O reconciliador de “fiber” é um novo esforço com o objetivo de resolver os problemas
 inerentes ao reconciliador de pilha e corrigir alguns problemas de longa data. Foi
  o reconciliador padrão desde o React 16.

Seus principais objetivos são:

Capacidade de dividir o trabalho ininterrupto em blocos.
Capacidade de priorizar, rebaixar e reutilizar o trabalho em andamento.
Capacidade de retroceder entre pais e filhos para dar suporte ao layout no React.
Capacidade de retornar vários elementos do método render().
Melhor suporte para limites de erro.
Você pode ler mais sobre a arquitetura do React Fiber aqui e aqui. Embora tenha sido
 fornecido com o React 16, os recursos assíncronos ainda não estão habilitados por
 padrão.

Seu código-fonte está localizado em packages/react-reconciler.

Sistema de Eventos
O React implementa uma camada sobre eventos nativos para suavizar as diferenças entre
 navegadores. Seu código fonte está localizado em packages/react-dom/src/events.

 */