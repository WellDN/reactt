//<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>

/*Lembre que somente arquivos React terminados com .production.min.js são adequados
 para produção.

Brunch
Para uma build de produção do Brunch mais eficiente, instale o plugin terser-brunch:

# Se você usa npm
npm install --save-dev terser-brunch

# Se você usa Yarn
yarn add --dev terser-brunch

Então, para criar uma build de produção, adicione o argumento -p no comando build:

brunch build -p
Lembre que você somente precisa fazer isso para builds de produção. Você não deve
 passar o argumento -p ou aplicar esse plugin em desenvolvimento, porque ele irá
  esconder avisos úteis do React e fará as builds mais lentas.

Browserify
Para uma build de produção do Browserify mais eficiente, instale alguns plugins:

# Se você usa npm
npm install --save-dev envify terser uglifyify

# Se você usa Yarn
yarn add --dev envify terser uglifyify
Para criar uma build de produção, tenha certeza que você adicionou esses transforms
 (a ordem faz diferença):

O envify assegura que o ambiente que a build está configurado é o correto. Torne ele
 global (-g).
O uglifyify remove os imports de desenvolvimento. Torna ele global também (-g).
Finalmente, o bundle gerado é enviado para o terser para enxutar (entenda o porquê).
Por exemplo:

browserify ./index.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | terser --compress --mangle > ./bundle.js
Lembre que você somente precisar fazer isso para builds de produção. Você não deve
 aplicar esses plugins em desenvolvimento porque eles vão esconder avisos úteis do
  React, e farão as builds mais lentas.

Rollup
Para uma build de produção do Rollup mais eficiente, instale alguns plugins:

# Se você usa npm
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace
 rollup-plugin-terser

# Se você usa Yarn
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
Para criar uma build de produção, tenha certeza que você adicionou esses plugins,
 (a ordem faz diferença)

O replace assegura que o ambiente em que a build está configurado é o correto.
O commonjs fornece suporte para CommonJS no Rollup.
O terser comprime e enxuta o bundle final. */

plugins: [
    // ...
    require('rollup-plugin-replace')({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-terser')(),
    // ...
  ]

  /*Para um exemplo completo de setup veja esse gist.

Lembre que você somente precisa fazer isso para builds de produção. Você não deve
 aplicar o terser ou o replace com o valor de 'production'em desenvolvimento porque
  eles vão esconder avisos úteis do React, e farão as builds mais lentas.

webpack
Observação:

Se você está usando Create React App, por favor siga as instruções acima.
Esta seção é somente relevante se você configura o webpack diretamente.

O Webpack v4+ irá diminuir seu código por padrão no modo de produção. */

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* opções adicionais aqui */ })],
  },
};

/*Você pode aprender mais sobre isso na documentação do webpack.

Lembre que você somente precisa fazer isso para builds de produção. Você não deve
 aplicar TerserPlugin em desenvolvimento porque ele vai esconder avisos úteis do React,
  e farão as builds mais lentas.

Analisando componentes com o DevTools Profiler
react-dom 16.5+ e react-native 0.57+ fornecem melhorias nas capacidades de analise
 em modo de desenvolvimento com o React DevTools Profiler.

Uma visão geral do Profiler pode ser encontrada nesse artigo “Introducing the React
 Profiler”. Um vídeo com o passo a passo do profiler também está disponível no YouTube.

Se você ainda não tem o React DevTools instalado, você pode encontrá-lo aqui:

Extensão para Chrome
Extensão para Firefox
Pacote separado
Observação

Uma analise de uma build de produção do react-dom está disponível como
 react-dom/profiling. Leia mais sobre como usar esse pacote no fb.me/react-profiling

Observação

Antes do React 17, usamos o padrão User Timing API para criar o perfil de componentes
 com a guia de desempenho do chrome. Para um passo a passo mais detalhado, confira este
  artigo de Ben Schwarz.

Virtualizando Longas Listas
Se sua aplicação renderiza longas listas de informação
 (milhares ou centenas de linhas), nós recomendamos usar uma técnica conhecida
  como “windowing”. Esta técnica somente renderiza um pequeno conjunto de suas
   linhas e pode reduzir drasticamente o tempo que ele leva para re-renderizar os
    componentes bem como o número de nós criados no DOM.

react-window e react-virtualized são as bibliotecas de windowing mais populares. Eles
 fornecem diversos componentes reutilizáveis para exibir listas, grids e informações
  tabulares. Você pode também pode criar seu próprio componente de windowing,
   como o Twitter fez, se você quer algo mais específico para sua aplicacão.

Evite recompilação
O React cria e mantém sua representação interna da UI renderizada. Ele inclui os
 elementos do React que você retorna dos seus componentes. Essa representação evita
  que o React crie nós no DOM e acesse os existes sem necessidade, além do que essas
   operações podem ser mais lentas do que operações em objetos JavaScript. Algumas
    vezes esse processo é referenciado como “virtual DOM”, mas ele funciona da mesma
     forma no React Native.

Quando uma propriedade ou estado de um componente é alterado, o React decide se
 uma atualização do DOM atual é necessária comparando o novo elemento retornado
  com o antigo. Quando eles não forem iguais, o React irá alterar o DOM.

Embora o React somente altere os nós de DOM alterados, o re-rendering ainda leva
 algum tempo. Em muitos casos isso não é um problema, mas se a lentidão é perceptível,
  você pode aumentar velocidade dele sobrescrevendo a função de lifecycle
   shouldComponentUpdate, na qual é chamada antes do processo de re-rendering
    começar. A implementação padrão dessa função retorna true, deixando o React
     performar a alteração:

     shouldComponentUpdate(nextProps, nextState) {
        return true;
      }

    Se você sabe que em algumas situações seu componente não precisa ser alterado,
     você pode retornar false no shouldComponentUpdate ao invés, para pular o todo
      o processo de renderização, incluindo a chamada de render() nesse componente
       e seus filhos:

Na maioria dos casos, ao invés de escrever shouldComponentUpdate() na mão, você pode
 herdar do React.PureComponent. Ele equivale a implementação do shouldComponentUpdate()
  com uma comparação rasa entre as anteriores e novas propriedades e estados

shouldComponentUpdate em Ação
Abaixo podemos ver uma sub-árvore de componentes. Para cada uma, SCU define o que
 o shouldComponentUpdate retorna, e vDOMEq indica se os elementos renderizados pelo
  React são equivalentes. Finalmente, o círculo de cores indica se o componente tinha
   de ser reconciliado ou não.

should component update
Já que shouldComponentUpdate retornou false na sub-árvore iniciada no C2, React não
 tentou renderizar C2, e por consequência não invocou shouldComponentUpdate no C4 e C5.

Para C1 e C3, shouldComponentUpdate retornou true, então o React teve que descer até
 as folhas para checá-los. Para o C6 shouldComponentUpdate retornou true, e já que
  os elementos renderizados não são iguais, o React teve que alterar o DOM.

O último caso interessante é o C8. React teve que renderizar este componente, mas
 já que os elementos que ele retornou eram iguais aos previamente renderizados, ele
  não teve que alterar o DOM.

Note que o React somente teve de fazer mutações no DOM para o C6, no qual era
 inevitável. Para C8, ele abortou comparando os elementos React renderizados, e para
  a sub-árvore do C2 e C7, ele nem mesmo teve que comparar os elementos pois abortou
   no shouldComponentUpdate, e render não foi chamado.

Exemplos
Se seu componente muda quando as variáveis props.color ou state.count mudam, você
 poderia ter um shouldComponentUpdate que checa isso:*/

 class CounterButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (this.props.color !== nextProps.color) {
        return true;
      }
      if (this.state.count !== nextState.count) {
        return true;
      }
      return false;
    }
  
    render() {
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
  }
  /*Nesse código, shouldComponentUpdate só está checando se houve alguma mudança
   no props.color ou state.count. Se esses valores não são alterados, o componente
    não é alterado. Se seu componente ficou mais complexo, você pode usar um padrão
     similar fazendo uma comparação rasa (shallow comparison) entre todos os
      fields de props e state para determinar se o componente deve ser atualizado.
       Esse padrão é comum o suficiente para que o React forneça um helper para usar
        essa lógica - apenas herde de React.PureComponent. Então, essa é uma maneira
         mais simples de alcançar a mesma coisa: */

         class CounterButton extends React.PureComponent {
            constructor(props) {
              super(props);
              this.state = {count: 1};
            }
          
            render() {
              return (
                <button
                  color={this.props.color}
                  onClick={() => this.setState(state => ({count: state.count + 1}))}>
                  Count: {this.state.count}
                </button>
              );
            }
          }

          /*Na maior parte das vezes, você pode usar React.PureComponent em vez de 
          escrever seu próprio shouldComponentUpdate. Ele somente faz comparações
           rasas, então você não pode usá-lo caso as props ou state tenham sido
            alteradas de uma maneira que a comparação rasa não iria detectar.

Isso pode ser um problema com estruturas mais complexas. Por exemplo, vamos dizer
 que você quer um componente ListOfWords para renderizar uma lista de palavras
  separas por vírgulas, com um componente pai WordAdder que deixa você clicar em um
   botão para adicionar uma palavra para a lista. Esse código não faz o trabalho
    corretamente: */

    class ListOfWords extends React.PureComponent {
        render() {
          return <div>{this.props.words.join(',')}</div>;
        }
      }
      
      class WordAdder extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            words: ['marklar']
          };
          this.handleClick = this.handleClick.bind(this);
        }
      
        handleClick() {
          // Essa parte é um padrão ruim e causa um bug
          const words = this.state.words;
          words.push('marklar');
          this.setState({words: words});
        }
      
        render() {
          return (
            <div>
              <button onClick={this.handleClick} />
              <ListOfWords words={this.state.words} />
            </div>
          );
        }
      }

      /*O problema é que PureComponent vai fazer um comparação simples entre o valores
       antigos e novos de this.props.words. Já que esse código muta a lista de
        words no método handleClick do WordAdder, os antigos e novos valores de
         this.props.words serão comparados como iguais, mesmo que as atuais palavras
          da lista tenham mudado. A ListOfWords não irá alterar ainda que haja novas
           palavras que deveriam ser renderizadas.

O Poder de Não Mutar Dados
A maneira mais simples desse problema não acontecer é evitar mutar valores que são
 usados como propriedades ou estado. Por exemplo, o método handleClick abaixo poderia
  ser reescrito usando concat como: */

 // handleClick() {
    this.setState(state => ({
      words: state.words.concat(['marklar'])
    }));
 // }

  /*ES6 suporta a sintaxe de espalhamento no qual pode fazer isso mais fácil. Se
   você está usando Creact React App, esta sintaxe é disponível por padrão. */

 //  handleClick() {
    this.setState(state => ({
      words: [...state.words, 'marklar'],
    }));
//  };

/*Você pode também reescrever o código que muta os objetos para evitar mutação, em
 uma maneira similar. Por exemplo, vamos dizer que nós temos um objeto chamado
  colormap e nós queremos escrever uma função que muda colormap.right para 'blue'.
   Você poderia escrever: */

   function updateColorMap(colormap) {
    colormap.right = 'blue';
  }

  /*Para escrever isso sem mutar o objeto original, nós poderíamos usar o método
   Object.assign: */

   function updateColorMap(colormap) {
    return Object.assign({}, colormap, {right: 'blue'});
  }

  /*updateColorMap agora retorna um novo objeto, ao invés de mutar o valor o antigo.
   Object.assign é ES6 e requer um polyfill.

Object spread syntax facilita a atualização de objetos sem mutação: */

function updateColorMap(colormap) {
    return {...colormap, right: 'blue'};
  }

  /*Este recurso foi adicionado ao JavaScript no ES2018.

Se você está usando Create React App, ambos Object.assign e a sintaxe de espalhador
 de objeto estão disponíveis por padrão.

Quando você lida com objetos profundamente aninhados, atualizá-los de maneira imutável
 pode parecer complicado. Se você enfrentar esse problema, consulte Immer or
  immutability-helper. Essas bibliotecas permitem escrever código altamente legível
   sem perder os benefícios da imutabilidade. */