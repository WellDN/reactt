<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/> //all the attributes aria-* are totally suported in JSX. while the majority proprieties are in camelCase, these attributes have to be hyphen-case beucase they're in HTML.

/*Linguagem HTML
Linguagem é a base da acessibilidade em um aplicativo da web. Usando os elementos HTML
 corretamente para reforçar o significado da informação em nossos sites, muitas vezes
  a acessibilidade pode vir gratuitamente.
  
  Às vezes, quebramos a semântica de HTML quando adicionamos elementos <div> ao nosso
   JSX somente para fazer nosso código React funcionar, especialmente ao trabalhar com
    listas (<ol>, <ul> e <dl>) e HTML <table>. Nesses casos, devemos usar React
     Fragments para agrupar vários elementos. <> declara fragmentos.

Por exemplo,*/

import React, { Fragment } from 'react';

function ListaDeItems({ item }) {
  return (
    <Fragment>
      <dt>{item.nome}</dt>
      <dd>{item.descricao}</dd>
    </Fragment>
  );                                           // '<>' é uma sintax curta para fragment
}

function Glossario(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListaDeItems item={item} key={item.id} />
      ))}
    </dl>
  );
}
/*Você pode mapear uma coleção de items para uma matriz de fragmentos como faria com
 qualquer outro tipo de elemento: */

 function Glossario(props) {
    return (
      <dl>
        {props.items.map(item => (
          // Fragments também aceitam `key`(chave) prop quando estão mapeando coleções
          <Fragment key={item.id}>
            <dt>{item.nome}</dt>
            <dd>{item.descricao}</dd>
          </Fragment>
        ))}
      </dl>
    );
  }

  /*Quando você não precisa de nenhum prop na tag Fragment você pode usar a syntax
   curta, se a sua configuração suportar: */

   function ListaDeItems({ item }) {
    return (
      <>
        <dt>{item.nome}</dt>
        <dd>{item.descricao}</dd>
      </>
    );  //<> this replace fragment.
  }

  /*Formulários Acessíveis
Rótulos
Todos os elements de um formulário HTML, como <input> e <textarea>, precisam ser
 rotulados. Precisamos fornecer rótulos descritivos pois são expostos aos leitores
  de tela.

Os seguintes artigos nos mostram como fazer isso:


Embora essas práticas HTML padrão possam ser usadas diretamente em React, observe
 que o atributo for está escrito como htmlFor em JSX: */

 <label htmlFor="nomeDaEntrada">Nome:</label>
 <input id="nomeDaEntrada" type="text" name="nome"/>

 /*Notificando erros ao usuário
Situações de erro precisam ser entendidas por todos os usuários. Os artigos a seguir
 nos mostram como expor os erros aos leitores de tela
 
 Mecanismos para pular conteúdo
São mecanismos para permitir que os usuários ignorem as seções de navegação anteriores
 em seu aplicativo, pois isso ajuda e acelera a navegação pelo teclado.

Skiplinks ou Links para Pular Navegação são links de navegação ocultos que só se tornam
 visíveis quando os usuários interagem com a página usando o teclado. Eles são muito
  fáceis de implementar com alguns estilos e âncoras de páginas
  Também use elementos e pontos de referência, como <main> e <aside>, para demarcar
   regiões de páginas como tecnologia assistiva, permitindo que o usuário navegue
    rapidamente para estas seções.
    
    Programaticamente gerenciando o foco
Aplicações em React modificam continuamente o HTML DOM durante o tempo de execução,
 às vezes levando à perda de foco do teclado ou a um elemento inesperado. Para
  consertar isso, precisamos programar o foco do teclado na direção certa, de
   maneira programática. Por exemplo, redefinindo o foco do teclado para um
    botão que abriu uma janela modal depois que essa janela restrita é fechada.
    Dessa maneira, primeiro criamos uma referência a um elemento no JSX de uma
     classe de componente:*/

     class EntradaDeTexto extends React.Component {
        constructor(props) {
          super(props);
          // Cria um ref para guardar o inputDeTexto no DOM 
          this.inputDeTexto = React.createRef();
        }
        render() {
        // Use a `ref` callback para guardar a referencia do texto no input dentro do DOM 
        // elemento em um campo (por exemplo, this.inputDeTexto).
          return (
            <input
              type="text"
              ref={this.inputDeTexto}
            />
          );
        }
      }

      /*Então podemos nos concentrar em outro lugar em nosso componente quando
       necessário: */

       focus() {
        // Focalize explicitamente a entrada de texto usando a API DOM 
        // Nota: estamos acessando o DOM "atual" para obter o elemento
        this.textInput.current.focus();
      }

      /*Às vezes, um componente pai precisa definir o foco para um elemento em um
       componente filho. Nós podemos fazer isso expondo as referências DOM aos
        componentes pais, através de um prop especial no componente filho que
         encaminha a referência do pai o elemento filho. */

         function EntradaDeTexto(props) {
            return (
              <div>
                <input ref={props.inputRef} />
              </div>
            );
          }
          
          class ComponentePai extends React.Component {
            constructor(props) {
              super(props);
              this.inputElement = React.createRef();
            }
            render() {
              return (
                <EntradaDeTexto inputRef={this.inputElement} />
              );
            }
          }
          
          // Agora você pode definir o foco quando necessário.
          this.inputElement.current.focus();

          /*Ao usar um HOC(Componente de alta ordem) para estender componentes é
           recomendado encaminhar a ref para o componente de menor order usando a
            função de React forwardRef. Se um terceiro HOC não passar a referência,
             o padrão acima ainda pode ser usado como fallback.

Um ótimo exemplo de gerenciamento de foco é o react-aria-modal. Este é um exemplo
 relativamente raro de uma janela modal totalmente acessível. Não só define o foco
  inicial o botão cancelar (impedindo o usuário do teclado de ativar acidentalmente
     a ação de sucesso) e interceptar o foco do teclado dentro do modal, ele também
      redefine o foco de volta para o elemento que inicialmente acionou o modal.

Nota:

Embora esse seja um recurso de acessibilidade muito importante, também é uma técnica
 que deve ser usada de maneira criteriosa. Use-o para reparar o comportamento do foco
  do teclado quando ele é alterado, e não para tentar antecipar como os usuários
   desejam usar os aplicativos. 
   
   
   Movimentos do mouse e ponteiro (cursor)
Certifique-se de que todas as funcionalidades expostas através do movimento de mouse
 ou ponteiro também possam ser acessadas usando apenas o teclado. Se depender apenas
  do movimento do mouse, haverá muitos casos em que usuários de teclado não poderão
   usar seu aplicativo.

Isso geralmente é implementado ao anexar um click ao objeto de janela que fecha o
 popover:*/

 class ClickForaExemplo extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { isOpen: false };
      this.toggleContainer = React.createRef();
  
      this.onClickHandler = this.onClickHandler.bind(this);
      this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
    }
  
    componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
    }
  
    onClickHandler() {
      this.setState(currentState => ({
        isOpen: !currentState.isOpen
      }));
    }
  
    onClickOutsideHandler(event) {
      if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
        this.setState({ isOpen: false });
      }
    }
  
    render() {
      return (
        <div ref={this.toggleContainer}>
          <button onClick={this.onClickHandler}>Selecione uma opção</button>
          {this.state.isOpen && (
            <ul>
              <li>Opção 1</li>
              <li>Opção 2</li>
              <li>Opção 3</li>
            </ul>
          )}
        </div>
      );
    }
  }

  /*Isso pode funcionar bem para usuários com dispositivos com ponteiro, como um mouse.
   Mas, operá-lo apenas com o teclado quebra a funcionalidade ao passar para o próximo
    elemento, já que o objeto window nunca recebe um evento click. Isso pode levar a
     uma funcionalidade escondida que impede os usuários de usar seu aplicativo.
     
     A mesma funcionalidade pode ser obtida usando manipuladores de eventos
      apropriados, como onBlur e onFocus:*/

      class ExamploDeBlur extends React.Component {
        constructor(props) {
          super(props);
      
          this.state = { isOpen: false };
          this.timeOutId = null;
      
          this.onClickHandler = this.onClickHandler.bind(this);
          this.onBlurHandler = this.onBlurHandler.bind(this);
          this.onFocusHandler = this.onFocusHandler.bind(this);
        }
      
        onClickHandler() {
          this.setState(currentState => ({
            isOpen: !currentState.isOpen
          }));
        }
      
        // Fechamos o popover no próximo tick usando setTimeout.
        // Isso é necessário porque precisamos primeiro checar se
        // outro filho do elemento recebeu foco como
        // o evento blur é acionado antes do novo evento de foco.
        onBlurHandler() {
          this.timeOutId = setTimeout(() => {
            this.setState({
              isOpen: false
            });
          });
        }
      
        // Se o elemento filho receber foco, não feche o popover.
        onFocusHandler() {
          clearTimeout(this.timeOutId);
        }
      
        render() {
          // O React nos ajuda cancelando o blur e
          // focando nos eventos do elemento pai.
          return (
            <div onBlur={this.onBlurHandler}
                 onFocus={this.onFocusHandler}>
              <button onClick={this.onClickHandler}
                      aria-haspopup="true"
                      aria-expanded={this.state.isOpen}>
                Selecione uma opção
              </button>
              {this.state.isOpen && (
                <ul>
                  <li>Opção 1</li>
                  <li>Opção 2</li>
                  <li>Opção 3</li>
                </ul>
              )}
            </div>
          );
        }
      }

      /*Esse código expõe a funcionalidade para usuários de dispositivo de mouse e
       teclado. Observe também os aria-* props adicionados para suportar usuários de
        leitores de tela. Por motivos de simplicidade a interação com as setas nas
         opções de popover não foram implementados. 
         Este é um exemplo de muitos casos em que, depender apenas dos eventos de
          ponteiro e o mouse, pode quebrar a funcionalidade para usuários de teclado.
           Sempre testar com o teclado realçará imediatamente as áreas problemáticas
            que podem ser corrigidas usando manipuladores de eventos com
             reconhecimento de teclado.

             Widgets mais complexos
Uma experiência do usuário mais complexa não significa ser menos acessível.
 Considerando que a acessibilidade é mais facilmente alcançada programando o mais
  próximo possível do HTML, até mesmo o widget mais complexo pode ser programado de
   forma acessível.

Aqui, exigimos conhecimento de ARIA Roles, bem como ARIA States and Properties. Estas
 são caixas de ferramentas preenchidas com atributos HTML que são totalmente
  suportados no JSX e nos permitem construir componentes em React totalmente
   funcionais e totalmente acessíveis.

   Ferramentas de Desenvolvimento e Teste
Há várias ferramentas que podemos usar para ajudar na criação de aplicativos acessíveis.

O Teclado
Há várias ferramentas que podemos usar para ajudar na criação de aplicativos da Web acessíveis.

Desconectando o seu mouse.
Usando Tab e Shift+Tab navegue pelo site.
Usando Enter para clicar elementos.
Se necessário, usando o teclado e as setas, interaja com alguns elementos, como menus e dropdowns.
Assistência ao desenvolvimento
Podemos verificar alguns recursos de acessibilidade diretamente em nosso código JSX.
 Frequentemente, as verificações do intellisense já são fornecidas em IDEs JSX para
  as funções, estados e propriedades do ARIA. Nós também temos acesso à seguintes
   ferramentas:

eslint-plugin-jsx-a11y
O eslint-plugin-jsx-a11y plugin para ESLint fornece feedback sobre o linting da AST
 em relação a problemas de acessibilidade no seu JSX. Muitos dos IDE permitem integrar
  essas descobertas diretamente na análise de código e nas janelas de código-fonte.

Create React App tem este plugin com um subconjunto de regras ativadas. Se você
 quiser ativar ainda mais regras de acessibilidade, você pode criar um arquivo
  .eslintrc na raiz do seu projeto com este conteúdo:
*/

{
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }

  /*Testando acessibilidade no navegador
Existem várias ferramentas que podem executar auditorias de acessibilidade em páginas
 da Web em seu navegador. Por favor, use-as em combinação com outras verificações
  de acessibilidade mencionadas aqui, pois elas podem somente testar a acessibilidade
   técnica do seu HTML.
  */