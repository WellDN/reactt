const nome = 'Clementine';
ReactDOM.render(
  <h1 className="hello">Meu nome é {nome}!</h1>, //tabindex torna-se tabIndex em JSX. O atributo class também é escrito como className, já que class é uma palavra reservada em JavaScript.
  document.getElementById('root')
);

/*Elementos
Elementos React são os blocos de construção de aplicações React. Pode-se confundir
 elementos com um conceito mais amplamente conhecido como “componentes”. Um elemento
  descreve o que você quer ver na tela. Elementos React são imutáveis. */

  const elemento = <h1>Olá, mundo</h1>

  /*Tipicamente, elementos não são usados diretamente, mas são retornados dos
   componentes.

Componentes
Componentes React são pequenas peças reusáveis de código que retornam um elemento
 React para ser renderizado na página. A versão mais simples de um componente React é
  uma simples função JavaScript que retorna um elemento React: */

  function BemVindo(props) {
    return <h1>Olá, {props.nome}</h1>;
  }

/*Componentes também podem ser ES6 classes: */

class BemVindo extends React.Component {
    render() {
      return <h1>Olá, {this.props.nome}</h1>;
    }
  }

  /*Componentes podem ser quebrados em peças distintas de funcionalidade e usados em
   outros componentes. Componentes podem retornar outros componentes, arrays, strings
    e números. Uma regra de ouro é que se parte da sua UI é usada várias vezes
     (Botão, Painel, Avatar), ou é complexa suficiente (App, FeedStory, Comment), é
      uma boa candidata para ser um componente reutilisável. Nomes de componentes
       devem também sempre começar com letra maiúscula (<Wrapper/> ao invés de
        <wrapper/>). Veja esta documentação para mais informações sobre renderização
         de componentes.

props
props são entradas dos componentes React. Eles são dados passados por um componente
 pai para um componente filho.

Lembre que props são somente leitura. Eles não devem ser modificados desta forma: */

// Errado!
props.numero = 42;

/*Se você precisar modificar algum valor em resposta a uma entrada do usuário ou
 a uma resposta da rede, use state em vez disso.

props.children

props.children está disponível em todos os componentes. Ele contém o conteúdo entre
 as tags de abertura e fechamento de um componente. Por exemplo: */

 <BemVindo>Hello world!</BemVindo>

 /*A string Hello world! está disponível em props.children no componente BemVindo: */

 function BemVindo(props) {
    return <p>{props.children}</p>;
  }

  /*Para componentes definidos como classes, use this.props.children: */

  class BemVindo extends React.Component {
    render() {
      return <p>{this.props.children}</p>;
    }
  }

  /*state
Um componente precisa de state quando algum dado associado com este é alterado com o
 tempo. Por exemplo, um Checkbox componente pode precisar da propriedade isChecked no
  seu estado (state), e um componente NewsFeed pode querer observar a propriedade
   fetchedPosts do seu estado.

A diferença mais importante entre state e props é que props é passada de um componente
 pai, mas o state é gerenciado pelo próprio componente. Um componente não pode alterar
  suas props, mas pode alterar seu state.

Para cada parte específica de dados alterados, deve haver apenas um componente que o
 “possua” em seu estado. Não tente sincronizar estados de dois componentes diferentes.
  Em vez disso, [passe-o] (/ docs / lifting-state-up.html) para o seu ancestral
   compartilhado mais próximo e passe-o para baixo como props para ambos.

Métodos de Ciclo de Vida
Métodos de ciclo de vida são funcionalidades customizadas que são executadas durante
 as diferentes fases de um componente. Há métodos disponivéis quando o componente é
  criado e inserido no DOM (mounting), quando o componente é atualizado, e quando o
   componente é desmontado e removido do DOM.

Controlados vs. Componentes Não Controlados
React tem duas abordagens diferentes para lidar com inputs de formulários.

Um elemento de input de formulário cujo valor é controlado pelo React é chamado de 
componente controlado. Quando o usuário insere dados em um componente controlado o
 evento que manipula essa alteração é disparado e o seu codigo decide se o input é
  válido (renderizado com o valor atualizado). Se você não re-renderizar o elemento de
   formulário permanecerá inalterado.

Um componente não controlado funciona como um elemento de formulário fora do React.
 Quando um usuário insere dados em um campo de formulário (um input box, dropbox, etc)
  a informação atualizada é refletida sem necessidade do React fazer nada. No entanto,
   isso também significa que você não pode forçar o campo a ter um certo valor.

Na maioria dos casos você deve usar componentes controlados.

Keys
Uma “key” (chave) é um atributo de string especial que você precisa incluir quando
 estiver criando arrays de elementos. Chaves ajudam o React a identificar quais items
  foram alterados, quais foram adicionados, ou quais foram removidos. Chaves devem ser
   dadas a elementos em um array para dar a estes elementos uma identidade estável.

As chaves precisam ser únicas entre os elementos de um mesmo array. Eles não precisam
 ser exclusivos em toda a aplicação ou até mesmo em um único componente.

Não passe algo como Math.random() para as chaves. É importante que as chaves tenham
 uma “identidade estável” em re-renderizações para que o React possa determinar quando
  os items são adicionados, removidos, ou re-ordenados. Idealmente, chaves devem
   corresponder a identificadores únicos e estáveis vindos dos seus dados, como
    post.id.

Refs
React suporta um atributo especial que você pode adicionar a qualquer componente. O
 atributo ref pode ser um objeto criado por React.createRef() function ou uma função
  callback, ou uma string (em APIs legadas). Quando o atributo ref é uma função
   callback, a função recebe o elemento DOM subjacente ou uma instancia de classe 
   (dependendo do tipo de elemento) como argumento. Isso permite você ter acesso
    direto ao elemento DOM ou a instância do componente.

Use refs com moderação. Se você se encontrar usando refs frequentemente para “fazer
 as coisas acontecerem” na sua aplicação, considere se familiarizar com top-down data
  flow.

Eventos
Manipular eventos com elementos React tem algumas diferenças sintáticas:

Manipuladores de eventos React usam camelCase, em vez de lowercase.
Com JSX você passa uma função como manipulador de evento, em vez de uma string.
Reconciliação
Quando as props ou state de um componente são alterados, o React decide quando uma 
atualização do DOM é necessária comparando o novo elemento retornado com o anterior
 renderizado. Quando eles não são iguais, React atualiza o DOM. Este processo é
  chamado de “reconciliação”. */