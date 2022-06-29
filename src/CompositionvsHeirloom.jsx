/*Contenção
Alguns componentes não tem como saber quem serão seus elementos
 filhos. Isso é muito comum para componentes como o SideBar ou Dialog
  que representam “caixas” genéricas.
  
  o recomendado para esses componentes é prop especial children para
  passar os elementos filhos diretos para sua respectiva saída:*/

  function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }

  /*Isso permite outros componentes passar elementos filhos no próprio JSX: */

  function WelcomeDialog() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Bem-vindo
        </h1>
        <p className="Dialog-message">
          Obrigado por visitar a nossa espaçonave!
        </p>
      </FancyBorder>
    );
  }

  /*Qualquer conteúdo dentro da tag JSX do componente <FancyBorder> vai ser passado ao
   componente FancyBorder como prop children. Desde que FancyBorder renderize a
    {props.children} dentro de uma <div>, os elementos serão renderizados no resultado
     final.

Mesmo que seja incomum, as vezes pode ser que você precise de diversos “buracos” no
 componente. Em alguns casos você pode criar sua própria convenção e não utilizar a
  prop children: */

  function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
    );
  }
  
  function App() {
    return (
      <SplitPane
        left={
          <Contacts />
        }
        right={
          <Chat />
        } />
    );
  }

  /*Os elementos React como <Contacts/> e <Chat/> são apenas objetos, e você pode
   passá-los como props assim como faz com outros tipos de dados. Esta abordagem pode
    soar familiar como “slots” em outras bibliotecas, mas no React não existe
     limitações sobre o que pode ser passado como props.

 Especialização
Algumas vezes acabamos pensando em componentes como “casos especiais” de outros
 componentes, por exemplo, podemos dizer que o componente WelcomeDialog é um caso
  especial de Dialog.

No React, isto também pode ser obtido através do uso de composição, um componente
 específico renderiza um componente mais “genérico” e o configura com as suas
  respectivas props:*/

  function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          {props.title}
        </h1>
        <p className="Dialog-message">
          {props.message}
        </p>
      </FancyBorder>
    );
  }
  
  function WelcomeDialog() {
    return (
      <Dialog
        title="Bem-vindo"
        message="Obrigado por visitar a nossa espaçonave!" />
    );
  }

  /*A composição também irá funcionar para componentes escritos utilizando classe: */

  function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          {props.title}
        </h1>
        <p className="Dialog-message">
          {props.message}
        </p>
        {props.children}
      </FancyBorder>
    );
  }
  
  class SignUpDialog extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.state = {login: ''};
    }
  
    render() {
      return (
        <Dialog title="Programa de Exploração de Marte"
                message="Como gostaria de ser chamado?">
          <input value={this.state.login}
                 onChange={this.handleChange} />
          <button onClick={this.handleSignUp}>
            Cadastre-se!
          </button>
        </Dialog>
      );
    }
  
    handleChange(e) {
      this.setState({login: e.target.value});
    }
  
    handleSignUp() {
      alert(`Bem-vindo a bordo, ${this.state.login}!`);
    }
  }

  /*E sobre a herança?
No Facebook, nós usamos o React em milhares de componentes, e não encontramos nenhum
 caso que recomendaríamos criar componentes utilizando hierarquia de herança.

O uso de props e composição irá te dar toda flexibilidade que você precisa para
 customizar o comportamento e aparência dos componentes, de uma maneira explícita
  e segura. Lembre-se de que os componentes podem aceitar um número variável de props,
   incluindo valores primitivos, como int, array, boolean; assim como elementos React
    e funções.

E se você desejar reutilizar funcionalidades (não gráficas) entre componentes,
 sugerimos que você a extraia em módulos JavaScript. Os componentes podem importar
  essa função, objeto ou classe sem precisar estender. */