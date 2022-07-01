class SomePlugin extends React.Component {
    componentDidMount() {
      this.$el = $(this.el);
      this.$el.somePlugin();
    }
  
    componentWillUnmount() {
      this.$el.somePlugin('destroy');
    }
  
    render() {
      return <div ref={el => this.el = el} />;
    }
  }
  /*Note que nós definimos ambos componentDidMount e componentWillUnmount métodos do
   ciclo de vida. Muitos plugins jQuery adicionam listeners de eventos para o DOM,
    e é importante removê-los no componentWillUnmount. Se o plugin não fornece um
     método para limpeza, você vai provavelmente ter que criar o seu próprio, lembrando
      de remover qualquer listener do plugin registrado para evitar vazamento de
       memória.

Integrando com o plugin jQuery Chosen
Para um exemplo mais concreto desses conceitos, vamos escrever um wrapper mínimo
 para o plugin Chosen, que aumenta as opções () do <select>.

Nota:

Apenas porque isto é possível, não significa que esta é a melhor maneira para apps
 React. Nós encorajamos você a utilizar componentes React quando você puder.
  Componentes React são fáceis de reutilizar em aplicacões React, e muitas vezes
   fornecem mais controle sobre seu comportamento e aparência.

Primeiro, vamos olhar o que Chosen faz no DOM.

Se você chamá-lo em um nó DOM <select>, ele lê os atributos do nó DOM original,
 esconde-os com um estilo inline, e então adiciona um nó DOM separado com sua
  própria representação visual, logo após o <select>. Em seguida, ele dispara um
   evento do jQuery, para notificar sobre as alterações.

Vamos supor que esta é a API para o nosso React componente <Chosen>: */

function Example() {
    return (
      <Chosen onChange={value => console.log(value)}>
        <option>vanilla</option>
        <option>chocolate</option>
        <option>strawberry</option>
      </Chosen>
    );
  }

  /*Nós vamos implementá-lo como um componente não controlado pela simplicidade.

Primeiro, vamos criar um component vazio com um método render() onde nós retornamos
 o <select> em volta de uma <div> */

 class Chosen extends React.Component {
    render() {
      return (
        <div>
          <select className="Chosen-select" ref={el => this.el = el}>
            {this.props.children}
          </select>
        </div>
      );
    }
  }

  /*Note como envolvemos o <select> em uma <div> extra. Isto é necessário porque
   Chosen vai adicionar um outro elemento DOM logo após o <select> que passamos para
    ele. Contudo, no que diz respeito ao React, <div> sempre tem apenas um único
     filho. Isto é como nós garantimos que as atualizações do React não vão conflitar
      com o nó extra do DOM adicionado pelo Chosen. É importante que se você
       modificar o DOM fora do fluxo do React, você deve garantir que React não tem
        um motivo para acessar esses nós do DOM.

Em seguida, vamos implementar os métodos do ciclo de vida. Nós vamos precisar
 inicializar Chosen com a referência para o <select> no componentDidMount, e
  destruí-lo no componentWillUnmount. */

 // componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();
//  }
  
//  componentWillUnmount() {
    this.$el.chosen('destroy');
//  }

/*Note que React não atribui nenhum significado especial para o campo this.el. Isto
 apenas funciona porque nós atribuimos anteriormente um valor para este campo, com
  um ref no método render(): */

  <select className="Chosen-select" ref={el => this.el = el}></select>

  /*Isto é suficiente para renderizar o nosso componente, mas também queremos ser notificados quando os valores mudarem. Para fazer isto, vamos assinar os eventos de change do jQuery no <select> controlado pelo Chosen.

Nós não vamos passar this.props.onChange diretamente para o Chosen porque as
 propriedades do componente, podem mudar ao longo do tempo e isto inclui os
  manipuladores de evento (event handlers) . Como alternativa, vamos declarar
   um método handleChange() que chama o this.props.onChange e subscreve o evento
    change do jQuery: */

  //  componentDidMount() {
        this.$el = $(this.el);
        this.$el.chosen();
      
        this.handleChange = this.handleChange.bind(this);
        this.$el.on('change', this.handleChange);
   //   }
      
 //     componentWillUnmount() {
        this.$el.off('change', this.handleChange);
        this.$el.chosen('destroy');
  //    }
      
 //     handleChange(e) {
        this.props.onChange(e.target.value);
//      }

      /*Finalmente, existe mais uma coisa a se fazer. Em React, propriedades podem
       mudar ao longo do tempo. Por exemplo, o componente <Chosen> pode ter diferentes
        filhos se o estado do componente pai alterar. Isto significa que nos pontos
         de integração, é importante que a atualização do DOM seja feita manualmente
          em resposta as atualizações das propriedades, já que não vamos deixar o
           React gerenciar o DOM.

A documentação do Chosen, sugere que nós podemos utilizar a API do jQuery trigger()
 para notificar sobre as mudanças do elemento DOM original. Nós vamos deixar o
  React cuidar da atualização this.props.children dentro do <select>, mas também
   vamos adicionar um método do ciclo de vida componentDidUpdate(), que notifica
    Chosen sobre as mudanças na lista de filhos: */

//    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
          this.$el.trigger("chosen:updated");
        }
//      }

      /*Desta forma, Chosen vai saber atualizar o DOM quando os filhos do <select>
       gerenciados pelo React mudarem.

A implementação completa do componente Chosen se parece com isto: */

class Chosen extends React.Component {
    componentDidMount() {
      this.$el = $(this.el);
      this.$el.chosen();
  
      this.handleChange = this.handleChange.bind(this);
      this.$el.on('change', this.handleChange);
    }
    
    componentDidUpdate(prevProps) {
      if (prevProps.children !== this.props.children) {
        this.$el.trigger("chosen:updated");
      }
    }
  
    componentWillUnmount() {
      this.$el.off('change', this.handleChange);
      this.$el.chosen('destroy');
    }
    
    handleChange(e) {
      this.props.onChange(e.target.value);
    }
  
    render() {
      return (
        <div>
          <select className="Chosen-select" ref={el => this.el = el}>
            {this.props.children}
          </select>
        </div>
      );
    }
  }

  /*Integrando com Outras Bibliotecas de View
React pode ser incorporado em outras aplicações graças a flexibilidade do
 ReactDOM.render().

Apesar do React ser popularmente utilizado para carregar um único componente no DOM,
 ReactDOM.render() também pode ser chamado múltiplas vezes por partes independentes
  da UI, que pode ser pequeno como um botão, ou grande como uma aplicação.

De fato, isto é exatamente como React é utilizado no Facebook. Isto nos permite
 escrever aplicações por partes, e combiná-las com nosso template existente gerado
  pelo servidor e outros códigos no cliente.

Substituindo Renderização baseada em String com React
Um padrão comum em aplicações web mais antigas, é descrever pedaços do DOM como
 uma string e inseri-las no DOM utilizando: $el.html(htmlString). Estes pontos do
  código, são perfeitos para introduzir React. Apenas reescreva a renderização
   baseada em string para um componente React.

Então, a seguinte implementação com jQuery… */

$('#container').html('<button id="btn">Say Hello</button>');
$('#btn').click(function() {
  alert('Hello!');
});

/*…poderia ser reescrita utilizando um componente React: */

function Button() {
    return <button id="btn">Say Hello</button>;
  }
  
  ReactDOM.render(
    <Button />,
    document.getElementById('container'),
    function() {
      $('#btn').click(function() {
        alert('Hello!');
      });
    }
  );

  /*A partir daqui, você pode iniciar movendo mais lógica para o componente e começar
   adotando mais práticas comuns do React. Por exemplo, em componentes é melhor não
    confiar em IDs porque o mesmo componente pode ser renderizado diversas vezes. Ao
     invés disso, nós vamos utilizar o sistema de eventos do React e registrar o
      manipulador de clique diretamente no elemento <button>: */

      function Button(props) {
        return <button onClick={props.onClick}>Say Hello</button>;
      }
      
      function HelloButton() {
        function handleClick() {
          alert('Hello!');
        }
        return <Button onClick={handleClick} />;
      }
      
      ReactDOM.render(
        <HelloButton />,
        document.getElementById('container')
      );

      /*Você pode ter tantos componentes isolados você quiser, e usar ReactDOM.render()
       para renderizá-los em diferentes containers do DOM. Gradualmente, com você
        convertendo mais da sua aplicação para React, você vai estar apto para
         combiná-los em componentes maiores, e mover algumas das chamadas do
          ReactDOM.render() para cima da hierarquia.

Incorporando React em Backbone
Backbone tipicamente utiliza strings HTML, ou funções template que geram strings, para
 criar o conteúdo para seus elementos DOM. Este processo, também, pode ser substituido
  por uma renderização de um componente React.

Abaixo, nós vamos criar uma view Backbone chamada ParagraphView. Isto vai subscrever
 a função render() do Backbone, para renderizar um componente <Paragraph> React no
  elemento DOM fornecido pelo Backbone (this.el). Aqui, nós também estamos utilizando
   ReactDOM.render(): */

   function Paragraph(props) {
    return <p>{props.text}</p>;
  }
  
  const ParagraphView = Backbone.View.extend({
    render() {
      const text = this.model.get('text');
      ReactDOM.render(<Paragraph text={text} />, this.el);
      return this;
    },
    remove() {
      ReactDOM.unmountComponentAtNode(this.el);
      Backbone.View.prototype.remove.call(this);
    }
  });

  /*É importante também chamar ReactDOM.unmountComponentAtNode() no método remove,
   para que o React cancele os manipuladores de eventos e outros recursos associados
    com a árvore do componente quando ele é removido.

Quando um componente é removido de dentro de uma árvore React, a limpeza ocorre
 automaticamente, mas como estamos removendo toda a árvore na mão, nós devemos
  chamar este método.

Integrando com um Modelo de Camadas
Embora seja geralmente recomendado a utilização de um fluxo de dados unidirecional
 como React state, Flux, ou Redux, componentes React podem utilizar um modelo de
  camadas de outros frameworks e bibliotecas.

Utilizando Modelos Backbone em Componentes React
A maneira mais simples de se consumir modelos e coleções do Backbone para um
 componente React, é assinar os vários eventos de mudança e manualmente forçar
  uma atualização.

Componentes responsáveis por renderizar modelos devem escutar os eventos de
 'change', enquanto componentes responsáveis por renderizar coleções devem escutar
  os eventos de 'add' e 'remove'. Em ambos os casos, chame this.forceUpdate() para
   re-renderizar o componente com o novo dado.

No exemplo abaixo, o componente List renderiza uma coleção do Backbone, usando o
 componente Item para renderizar cada item em individual. */

 class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.model.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.props.model.off('change', this.handleChange);
  }

  render() {
    return <li>{this.props.model.get('text')}</li>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.collection.on('add', 'remove', this.handleChange);
  }

  componentWillUnmount() {
    this.props.collection.off('add', 'remove', this.handleChange);
  }

  render() {
    return (
      <ul>
        {this.props.collection.map(model => (
          <Item key={model.cid} model={model} />
        ))}
      </ul>
    );
  }
}

/*Extraindo Dados dos Modelos do Backbone
A abordagem acima, necessita que os componentes React tenham conhecimento dos modelos
 e coleções do Backbone. Se você planeja depois migrar para outra solução de
  gerenciamento de dados, você pode querer concentrar o conhecimento sobre Backbone
   em poucas partes do código.

Uma solução para isto, é extrair os atributos do model como simples dados, e
 manter essa lógica em um único local. A seguir, temos um higher-order component
  que extrai todos os atributos de um model Backbone para o estado, passando o dado
   para o componente em volta.

Desta forma, apenas o componente de ordem superior (higher-order component) precisa
 saber sobre implementações internas do model Backbone, e mais componentes da
  aplicação podem continuar agnósticos do Backbone.

No exemplo abaixo, nós vamos fazer uma cópia dos atributos do model para formar o
 estado inicial. Vamos assinar o evento de change (e cancelar no unmounting), e
  quando isto acontecer, nós atualizamos o estado com os atuais atributos do modelo.
   Finalmente, nos certificamos de que se a propriedade model mudar, nós não
    esqueceremos de cancelar a assinatura do modelo antigo, e assinar para o novo.

Note que este exemplo não pretende ser extenso no que diz respeito a trabalhar
 com Backbone, mas isto deve dar uma idéia de como abordar de uma maneira mais
  genérica: */

  function connectToBackboneModel(WrappedComponent) {
    return class BackboneComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = Object.assign({}, props.model.attributes);
        this.handleChange = this.handleChange.bind(this);
      }
  
      componentDidMount() {
        this.props.model.on('change', this.handleChange);
      }
  
      componentWillReceiveProps(nextProps) {
        this.setState(Object.assign({}, nextProps.model.attributes));
        if (nextProps.model !== this.props.model) {
          this.props.model.off('change', this.handleChange);
          nextProps.model.on('change', this.handleChange);
        }
      }
  
      componentWillUnmount() {
        this.props.model.off('change', this.handleChange);
      }
  
      handleChange(model) {
        this.setState(model.changedAttributes());
      }
  
      render() {
        const propsExceptModel = Object.assign({}, this.props);
        delete propsExceptModel.model;
        return <WrappedComponent {...propsExceptModel} {...this.state} />;
      }
    }
  }

  /*Para demonstrar, nós vamos conectar um componente React NameInput em um modelo
   Backbone, e atualizar seu atributo firstName toda vez que o valor do input mudar: */

   function NameInput(props) {
    return (
      <p>
        <input value={props.firstName} onChange={props.handleChange} />
        <br />
        My name is {props.firstName}.
      </p>
    );
  }
  
  const BackboneNameInput = connectToBackboneModel(NameInput);
  
  function Example(props) {
    function handleChange(e) {
      props.model.set('firstName', e.target.value);
    }
  
    return (
      <BackboneNameInput
        model={props.model}
        handleChange={handleChange}
      />
  
    );
  }
  
  const model = new Backbone.Model({ firstName: 'Frodo' });
  ReactDOM.render(
    <Example model={model} />,
    document.getElementById('root')
  );

  /*Esta técnica não se limita para o Backbone. Você pode utilizar React com 
  qualquer modelo de biblioteca, assinando as mudanças nos métodos de ciclo
   de vida e, opcionalmente, copiando os dados para o estado local do React. */