/*Quando Usar Context
Contexto (context) é indicado para compartilhar dados que podem ser considerados
 “globais” para a árvore de componentes do React. Usuário autenticado ou o idioma
  preferido, são alguns casos comuns. No exemplo do código a seguir, nós passamos
   um tema a fim de estilizar o componente Button. */

   class App extends React.Component {
    render() {
      return <Toolbar theme="dark" />;
    }
  }
  
  function Toolbar(props) {
    // O componente Toolbar deve receber uma prop extra chamada "theme"
    // e repassar para o componente ThemedButton.
    // Isso pode ser bem trabalhoso porque, se cada botão na aplicação
    // precisar saber o tema, este (o tema) teria que ser repassado por
    // todos os componentes.
    return (
      <div>
        <ThemedButton theme={props.theme} />
      </div>
    );
  }
  
  class ThemedButton extends React.Component {
    render() {
      return <Button theme={this.props.theme} />;
    }
  }
  /*Usando contexto, nós podemos evitar passar prop através de elementos intermediários.*/


  // Context nos permite passar um valor a fundo da árvore de componente
// sem explicitamente passa-la por cada componente.
// Crie um Context para o tema atual (com "light" como padrão).
//const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use um Provider para passar o tema atual para a árvore abaixo.
    // Qualquer componente pode acessa-la, não importa quão profundo esteja.
    // Neste exemplo, nós passamos "dark" como tema atual.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// Um componente antecessor não precisa mais
// passar o tema explicitamente.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Atribua um contextType para ler o context do tema atual.
  // React vai encontrar o Provider acima mais próximo e vai usa-lo.
  // Neste exemplo, o tema atual é "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

/*Antes de você usar Contexto
Contexto (context) é usado principalmente quando algum dado precisa ser acessado por
 muitos componentes em diferentes níveis. Use contexto moderadamente uma vez que
  isto pode dificultar a reutilização de componentes.

Se você apenas quer evitar passar algumas props por muitos níveis, composição de
 componente geralmente é uma solução mais simples que Contexto (context).

Considere por exemplo o componente Page que passa as props user e avatarSize por
 vários níveis abaixo de modo que os componentes Link e Avatar profundamente
  aninhados, podem ler essas props. */

/*  <Page user={user} avatarSize={avatarSize} />
// ... que renderiza ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... que renderiza ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... que renderiza ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>*/

/*Pode parecer redundante passar para baixo as props user e avatarSize através de
 vários níveis se no final apenas o componente Avatar realmente precisa usa-las.
  Além disso, é incômodo sempre que o componente Avatar precisar de mais props do
   topo, você também precisar adicionar todas elas por todos os níveis intermediários.

Uma forma de resolver este problema sem contexto é atribuir o próprio componente
 Avatar a uma prop do componente Page, assim os componentes intermediários não
  precisam saber sobre a prop user ou o avatarSize: */

  function Page(props) {
    const user = props.user;
    const userLink = (
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    );
    return <PageLayout userLink={userLink} />;
  }
  
  // Agora temos:
  /*<Page user={user} avatarSize={avatarSize} />
  // ... que renderiza ...
  <PageLayout userLink={...} />
  // ... que renderiza ...
  <NavigationBar userLink={...} />
  // ... que renderiza ...
  {props.userLink}*/

  /*Com esta mudança, apenas o componente Page do topo precisa saber sobre os
   componentes Link e Avatar e das props user e avatarSize.

Esta inversão de controle pode fazer seu código mais limpo em vários casos, reduzindo
 a quantidade de props que você precisa passar através da sua aplicação e dando mais
  controle para os componentes raiz. Essa inversão, entretanto, não é a escolha certa
   em todos os casos; mover mais complexabilidade para o topo da árvore, faz com que
    estes componentes fiquem mais complicados e forçando os componentes dos níveis
     mais abaixo ficarem mais flexíveis do que você gostaria.

Você não está limitado a um único filho por componente, Você pode passar vários
 componentes filhos ou até mesmo ter vários slots de componentes filhos como
  documentado aqui: */

  function Page(props) {
    const user = props.user;
    const content = <Feed user={user} />;
    const topBar = (
      <NavigationBar>
        <Link href={user.permalink}>
          <Avatar user={user} size={props.avatarSize} />
        </Link>
      </NavigationBar>
    );
    return (
      <PageLayout
        topBar={topBar}
        content={content}
      />
    );
  }

  /*Este padrão é suficiente para vários casos onde você precisa separar um componente
   filho de seu pai imediato. Você pode ainda ir mais longe com render props se o
    filho precisa se comunicar com o pai antes de ser renderizado.

Contudo, às vezes o mesmo dado precisa ser acessado por vários componentes na árvore
 e em diferentes níveis de aninhamento. Contexto (context) deixa você “transmitir”
  este dado e mudanças do mesmo para todos componentes abaixo. Exemplos comuns onde
   usar contexto pode ser mais simples que as alternativas incluem o gerenciamento
    de localização atual, tema, ou um dado em cache.

API

React.createContext */

//const MyContext = React.createContext(defaultValue);

/*Cria um objeto Contexto (context). Quando o React renderiza um componente que assina
 este objeto Contexto (context), este vai ler o valor atual do Provider superior na
  árvore que estiver mais próximo.

O argumento defaultValue (valor padrão) é usado apenas quando o componente não
 corresponder com um Provider acima dele na árvore. Este valor padrão pode ser útil
  para testar componentes isoladamente, sem envolvê-los. Observação: passando
   undefined como um valor de Provider não faz com que os componentes consumidores
    do Provider usem defaultValue.

Context.Provider */

//<MyContext.Provider value={/* algum valor */}>


/*Cada objeto Contexto (context) vem com um componente Provider que permite componentes
 consumidores a assinarem mudanças no contexto.

O componente Provider aceita uma prop value que pode ser passada para ser consumida
 por componentes que são descendentes deste Provider. Um Provider pode ser conectado
  a vários consumidores. Providers podem ser aninhados para substituir valores mais
   ao fundo da árvore.

Todos consumidores que são descendentes de um Provider serão renderizados novamente
 sempre que a prop value do Provider for alterada. A propagação do Provider aos
  seus descendentes (incluído .contextType e useContext), não está condicionada 
  ao método shouldComponenteUpdate, logo, o consumidor é atualizado mesmo quando
   um componente antepassado ignora uma atualização.

Mudanças são determinadas comparando os valores novos com os anteriores usando o
 mesmo algorítimo de Object.is.

Nota

A forma como as mudanças são determinadas, podem causar alguns problemas quando se
 atribui objetos como value: veja Ressalvas

Class.contextType */

class MyClass extends React.Component {
    componentDidMount() {
      let value = this.context;
      /* faz um side-effect na montagem utilizando o valor de MyContext */
    }
    componentDidUpdate() {
      let value = this.context;
      /* ... */
    }
    componentWillUnmount() {
      let value = this.context;
      /* ... */
    }
    render() {
      let value = this.context;
      /* renderiza algo com base no valor de MyContext */
    }
  }
  MyClass.contextType = MyContext;

  /*A propriedade contextType pode ser atribuída a um objeto Contexto (Context) criado
   por React.createContext(). Usar esta propriedade permite que você consuma o valor
    atual mais próximo deste tipo de contexto usando this.context. Você pode
     referencia-lo em qualquer momento nos métodos de ciclo-de-vida, incluindo a
      função render.

Nota:

Você pode assinar apenas um contexto usando esta API. Se você precisa ler mais de um
 contexto, veja Consumindo vários Contextos.

Se você está usando o recurso experimental public class fields syntax, você pode usar
 um campo estático da classe para inicializar o seu contextType. */

 class MyClass extends React.Component {
    static contextType = MyContext;
    render() {
      let value = this.context;
      /* renderiza algo baseado no valor */
    }
  }

  /*Context.Consumer

  <MyContext.Consumer>
 {value => /* renderiza algo baseado no valor do context */ /*}
  </MyContext.Consumer>
/*
  /*Um componente React que assina mudanças de contexto. Usar este componente permite
   você assinar a um contexto por um function component.

Requer uma function as a child. A função recebe o valor atual do contexto e retorna
 um nó React. O argumento value passado para a função será igual ao value da prop
  do Provider do contexto mais próximo acima na árvore. Se não houver um Provider
   para este contexto acima, o argumento value será igual a defaultValue que foi
    passado ao criar o contexto com createContext().

Nota

Para mais informações sobre o padrão “function as a child” veja, render props.

Context.displayName
O objeto Context aceita uma propriedade string displayName. React DevTools usa essa
 string para determinar o que exibir para o contexto.

Por exemplo, o seguinte componente aparecerá como MyDisplayName no DevTools: */

const MyContext = React.createContext(/* algum valor */);
MyContext.displayName = 'MyDisplayName';

//<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
//<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools

/*Exemplos
Contexto Dinâmico
Um exemplo mais complexo com valores dinâmicos para o tema:

theme-context.js */

export const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  };
  
//  export const ThemeContext = React.createContext(
    themes.dark // default value
//  );

 //themed-button.js

 import { ThemeContext } from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

//export default ThemedButton;

//app.js

import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// Um componente intermediário que usa componente ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // O ThemedButton button dentro de ThemeProvider
    // usa o tema do estado enquanto os demais usam
    // o tema padrão dark
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);

/*Atualizando o Contexto de um componente aninhado
Geralmente é necessário atualizar o contexto de um componente que está aninhado em
 algum lugar da árvore de componentes. Neste caso, você pode passar uma função para
  o contexto, permitindo assim que consumidores possam atualizar o contexto.

theme-context.js */

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
  });

  //theme-toggler-button.js

  import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;

//app.js

import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // Estado também contém a função de atualização
    // Passando para o provedor de contexto
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // Todo o estado é passado para o provedor
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);

/*Consumindo vários Contextos
Para que o contexto possa continuar renderizando rapidamente, o React precisa manter
 cada consumidor de contexto separado em um nó da árvore. */

 // Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // Componente App fornece os valores inicias do context
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// Um componente pode consumir vários contexts.
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

/*Se dois ou mais valores de contexto são utilizados juntos com frequência, você pode
 considerar criar o seu próprio render prop.

Nota

Para mais informações sobre render prop, veja render props.

Ressalvas
Contexto (context) usa referência de identidade para determinar quando renderizar
 novamente, por este motivo, existem alguns casos que podem desencadear renderizações
  não intencionais em consumidores quando algum componente que antecede um Provider
   é renderizados. Por exemplo, o código abaixo vai re-renderizar todos consumidores
    toda vez que o Provider re-renderizar porque um novo objeto é sempre criado para
     value: */

     class App extends React.Component {
        render() {
          return (
            <MyContext.Provider value={{something: 'something'}}>
              <Toolbar />
            </MyContext.Provider>
          );
        }
      }

      /*Para contornar isso, mova a prop value para o state do nível antecessor. */

      class App extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            value: {something: 'something'},
          };
        }
      
        render() {
          return (
            <MyContext.Provider value={this.state.value}>
              <Toolbar />
            </MyContext.Provider>
          );
        }
      }

    