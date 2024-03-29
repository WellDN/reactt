import React, { useState } from 'react';

function Example() {
  // Declare uma nova variável de state, a qual chamaremos de "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}

/*Essa nova função useState é o primeiro “Hook” que nós iremos aprender, mas este
 exemplo é só um gostinho. Não se preocupe se isso ainda não fizer sentido!

Você pode começar a aprender Hooks na próxima página. Nesta página, nós iremos
 continuar explicando porque nós estamos adicionando Hooks em React e como eles podem
  ajudar a escrever boas aplicações. 
  
  Sem Quebras de Compatibilidade
Antes de continuar, note que Hooks são:

Completamente opcionais. Você pode experimentar Hooks em alguns componentes sem
 reescrever nenhum código existente. Mas você não tem que aprender ou usar Hooks agora
  se não quiser.
100% retrocompatíveis. Hooks não possuem nenhuma quebra de compatibilidade.
Disponível agora. Hooks estão disponíveis no release v16.8.0.
Não temos planos de remover classes do React. Você pode aprender mais sobre a
 estratégia de adoção gradual para Hooks na seção inferior desta página.

Hooks não substituem seu conhecimento dos conceitos de React. Ao invés disso, Hooks
 proveem uma API mais direta para os conceitos de React que você já conhece: props,
  state, context, refs e ciclo de vida. Como iremos mostrar em breve, Hooks também
   oferecem uma poderosa nova forma de combiná-los.

Se você só quiser começar a aprender Hooks, sinta-se livre para pular direto para a
 próxima página! Você também pode continuar lendo esta página para aprender mais sobre
  o porquê de estarmos adicionando Hooks e como nós iremos começar a usá-los sem
   reescrever nossas aplicações.

Motivação
Hooks resolvem uma variedade de problemas aparentemente separados em React que
 encontramos ao longo de cinco anos escrevendo e mantendo milhares de componentes.
  Esteja você aprendendo React, usando diariamente, ou até mesmo se prefere outra
   biblioteca com um modelo de componente parecido, você reconhecerá alguns destes
    problemas.

É Difícil Reutilizar Lógica com Estado entre Componentes
React não oferece uma forma de “vincular” comportamento reutilizável em um componente
 (por exemplo, conectar um componente a uma store). Se você já trabalhou com React por
  um tempo, você pode estar familiarizado com padrões como render props e higher-order
   components que tentam resolver isso. Mas estes padrões requerem que você reestruture
    seus componentes quando você os usa, o que pode parecer atrapalhado e tornar o
     código mais difícil de entender. Se você ver uma aplicação React típica com
      React DevTools, você provavelmente irá encontrar um “inferno de wrappers” de
       componentes rodeados de camadas de providers, consumers, high-order components,
        render props, e outras abstrações. Apesar de podermos filtrar eles na DevTools,
         isso aponta para um problema mais profundo: React precisa de uma primitiva
          melhor para compartilhar lógica com estado.

Com Hooks, você pode extrair lógica com estado de um componente de uma forma que possa
 ser testada independentemente e reutilizada. Hooks permitem reutilizar lógica com
  estado sem mudar sua hierarquia de componentes. Isso torna fácil de compartilhar
   Hooks com vários outros componentes ou com a comunidade.

Nós iremos discutir mais sobre isso em Construindo Seus Próprios Hooks.

Componentes Complexos se Tornam Difíceis de Entender
Nós frequentemente temos que manter componentes que começam simples mas crescem para
 uma bagunça incontrolável de lógica com estado e efeitos colaterais. Cada método de
  ciclo de vida frequentemente contêm uma mistura de lógicas que não se relacionam.
   Por exemplo, componentes podem pegar dados em componentDidMount e
    componentDidUpdate. Contudo, o método componentDidMount pode conter algumas lógicas
     não relacionadas que configuram event listeners, com a limpeza deles em
      componentWillUnmount. Código mutuamente relacionado, que mudam juntos, acabam
       ficando separados, mas trechos de código completamente não relacionados acabam
        ficando juntos em um único método. Isso torna muito fácil a introdução de bugs
         e inconsistências.

Em muitos casos não é possível quebrar esses componentes em pedaços menores porque a
 lógica com estado está espalhada por toda parte. Também é difícil de testá-los. Isso
  é uma das razões pelas quais muitas pessoas preferem combinar React com uma
   biblioteca separada de gerenciamento de estado. Contudo, isso frequentemente
    introduz muitas abstrações, requer que você pule entre arquivos diferentes, e
     faz com que a reutilização de componentes seja mais difícil.

Para resolver isso, Hooks permitem que você divida um componente em funções menores
 baseadas em pedaços que são relacionados (como configurar uma subscription ou
     captura de dados), em vez de forçar uma divisão baseada nos métodos de ciclo
      de vida. Você também pode optar por gerenciar o estado local com um reducer
       para torná-lo mais previsível.

Nós iremos discutir mais sobre isso em Usando o Effect Hook.

Classes Confundem tanto Pessoas quanto Máquinas
Além de deixar o reuso de código e a organização de código mais difícil, nós
 percebemos que classes podem ser uma grande barreira no aprendizado de React. Você
  tem que entender como o this funciona em JavaScript, o que pode ser diferente de
   como funciona na maioria das linguagens. Você tem que lembrar de fazer bind de
    event handlers. Sem propostas de sintaxe instáveis, o código pode ficar muito
     verboso. As pessoas podem entender props, state e fluxo de dados de cima para
      baixo perfeitamente bem, mas ainda tem dificuldade com classes. A distinção
       entre componentes de classe e de função em React e quando utilizar cada um
        deles acabam levando a desentendimentos, mesmo entre desenvolvedores
         experientes de React.

Adicionalmente, React já foi lançado há mais ou menos cinco anos e nós queríamos ter
 certeza que ele se mantivesse relevante pelos próximos cinco anos. Assim como
  Svelte, Angular, Glimmer, e outros mostraram, compilação ahead-of-time de
   componentes tem um grande potencial no futuro. Especialmente se não estiver
    limitado a templates. Recentemente, estivemos experimentando com component
     folding usando Prepack e estamos encontrando resultados promissores. Porém,
      percebemos que componentes de classe podem encorajar padrões não intencionais
       que fazem com que essas otimizações recaiam em um caminho mais lento. Classes
        apresentam problemas para ferramentas dos dias de hoje, também. Por exemplo,
         classes não minificam muito bem e elas fazem com que hot reloading funcione
          de forma inconsistente e não confiável. Nós queremos disponibilizar uma API
           que torne mais provável o código permanecer no caminho otimizável.

Para resolver esses problemas, Hooks permitem você usar mais das funcionalidades de
 React sem classes. Conceitualmente, componentes React sempre estiveram mais
  próximos de funções. Hooks adotam funções, mas sem sacrificar o espírito prático de
   React. Hooks proveem acesso a válvulas de escape imperativas e não requerem você
    a aprender técnicas complexas de programação funcional ou reativa.
    
    Exemplos

Hooks at a Glance é um bom lugar para começar a aprender Hooks.

Estratégia Gradual de Adoção
TLDR: Não há planos de remover classes de React.

Nós sabemos que desenvolvedores React estão focados em entregar produtos e não têm
 tempo de checar cada nova API que está sendo lançada. Hooks são muito novos e pode
  ser melhor esperar por mais exemplos e tutoriais antes de considerar aprender ou
   adotá-los.

Nós também entendemos que o padrão de novas primitivas, para serem adicionadas ao
 React, deva ser extremamente alto. Para leitores curiosos, nós preparamos uma
  detalhada RFC que vai a fundo na motivação com mais detalhes e provê uma perspectiva
   extra sobre decisões específicas de design e o estado da arte.

Crucialmente, Hooks funcionam lado a lado com código existente para que você possa 
adotá-los gradualmente. Não há pressa para migrar para Hooks. Nós recomendamos evitar
 “grandes reescritas” de código, especialmente para componentes de classe complexos
  já existentes. É preciso mudar um pouco a mente para começar a “pensar em hooks”.
   Em nossa experiência, é melhor praticar a utilização de Hooks inicialmente em
    componentes novos e não críticos e garantir que todo o time se sinta confortável
     com eles. Depois de experimentar Hooks, sinta-se livre para nos mandar feedback,
      positivo ou negativo.

Nós planejamos que os Hooks cubram todas os casos de uso existentes para classes, mas
 nós iremos continuar a suportar componentes de classe por um bom tempo no futuro. No
  Facebook, nós temos milhares de componentes escritos em React e nós absolutamente
   não temos planos de reescrevê-los. Em vez disso, nós estamos começando a usar Hooks
    em código novo, lado a lado com classes.*/