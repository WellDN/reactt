class HelloMessage extends React.Component {
    render() {
        return <div>Olá <x-search>{this.Props.name}</x-search></div>
    }
}  

/*Nota:

Componentes Web geralmente expõem uma API imperativa. Por exemplo, um Componente Web
 video pode expor as funções play() e pause(). Para acessar as APIs imperativas de um
  Componente Web, você precisará usar um ref para interagir diretamente com o nó do
   DOM. Se você está utilizando Componentes Web de terceiros, a melhor solução é
    escrever um componente React que se comporte como um wrapper para o seu Componente
     Web.

Os eventos emitidos por um Componente Web podem não se propagar apropriadamente através
 da árvore de renderização do React. Você precisará anexar manualmente os manipuladores
  de eventos para lidar com esses eventos em seus componentes React.

Uma confusão comum é que os Componentes Web utilizam “class” ao invés de “className”. */

function BrickFlipbox() {
    return (
      <brick-flipbox class="demo">
        <div>frente</div>
        <div>verso</div>
      </brick-flipbox>
    );
  }

  /*Usando React nos seus Componentes Web */

  class XSearch extends HTMLElement {
    connectedCallback() {
      const mountPoint = document.createElement('span');
      this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
  
      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
  customElements.define('x-search', XSearch);

  /*this wont work at Babel.*/