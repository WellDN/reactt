const { render } = require("react-dom");
const { transformWithEsbuild } = require("vite");

<button onclick={this.handleClick}></button> //passando um manipulador de eventos(onClick) para um componente.

/*Se você precisa ter acesso ao componente pai no manipulador, você também precisa dar
 bind em uma função na instância do componente (veja abaixo)

Como eu dou bind em uma função na instância de um componente?
Dependendo da sintaxe e etapas de build que você está usando, existem diversas
 maneiras de ter certeza que as funções tem acesso aos atributos dos componentes
  como this.props e this.state.

Bind no Constructor (ES2015) */

class Foo extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('Clicado');
    }
    render() {
        return <button onClick={this.handleClick}>Clique
        em mim!</button>;
    }
}

/*Propriedades de Classe (Stage 3 Proposal) */

class Foo extends Component {
    // Nota: esta sintaxe é experimental e ainda não padronizada
    handleClick = () => {
        console.log('Clicado');
    }
    render() {
        return <button onClick={this.handleClick}>Clique
        em mim!</button>;
    }
}

/*Bind no Render */

class Foo extends Component {
    handleClick() {
        console.log('Clicado');
    }
    render() {
        return <button onClick=
        {this.handleClick.bind(this)}>Clique em mim!</button>;
    }
}

/*Ao usar Function.prototype.bind no render, uma nova função é criada cada vez que o
 componente é renderizado, o que pode afetar a performance (veja abaixo).

Arrow Function no Render */

class Foo extends Component {
    handleClick() {
        console.log('Clicado');
    }
    render() {
        return <button onClick={() =>
        this.handleClick()}>Clique em mim!</button>;
    }
}

/*Nota:

Ao usar uma arrow function no render, uma nova função é criada cada vez que o
 componente é renderizado, que pode quebrar otimizações com base em comparação de
  identidade on strict.

Devemos usar arrow functions em métodos de render?
De um modo geral, sim, é certo. E muitas das vezes é a maneira mais fácil de enviar
 parâmetros para funções de callback.

Se você tiver problemas de performance, de qualquer jeito, otimize!

Porquê binding é necessário afinal?
Em JavaScript, estes dois code snippets não são equivalentes: */

obj.method();

var method = obj.method;
method();

/*Métodos de binding ajudam a garantir que o segundo snippet funcione da mesma maneira
 que o primeiro.

Com React, tipicamente você precisa dar bind apenas nos métodos que você passa para
 outros componentes. Por exemplo, <button onClick={this.handleClick}> passa
  this.handleCLick logo você deve dar bind nele. Entretanto, é desnecessário usar bind
   no método render ou nos métodos do ciclo de vida: nós não passamos ele à outros
    componentes.

Este post por Yehuda Katz explica o que binding é e como funcionam as funções do
 JavaScript, em detalhes.

Porquê minha função é chamada toda vez que o componente renderiza?
Certifique-se que você não está chamando a função quando for passar para o componente:*/

render() //{
    // Errado: handleClick é chamado ao invés de ser passado como referência!
    return <button onClick={this.handleClick()}>Clique
    em mim!</button>
//}

/*Em vez disso, passe a própria função (sem parentêses): */

render() //{
    // Correto: handeClick é passado como referência!
    return <button onClick={this.handleClick}>Click em mim!</button>
//}

/*Como eu passo um parâmetro para um manipulador de evento ou um callback?
Você pode usar uma arrow function para envolver um manipulador de eventos e passar
 parâmetros: */

// <button onClick={() => this.handleClick(id)} />

/*isto é equivalente que chamar o .bind: */

//<button onClick={this.handleClick.bind(this, id)} />

/*Exemplo: Passando parâmetros usando arrow functions {#exemplo-passando-parâmetros-usando-arrow-functions}*/

//const A = 65 // código de caractere ASCII

/*class Alphabet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justClicked: null,
            letters: Array.from({lenght: 26}, (_, i) =>
        String.fromCharCode(A + i))
        };
    }
    handleClick(letter) {
        this.setState({ justClicked: letter });
    }
    render() {
        return (
            <div>
                Você clicou: {this.state.justClicked}
                <ul>
                    {this.state.letter.map(letter =>
                        <li key={letter} onClick={() =>
                    this.handleClick(letter)}}/>
                    {letter}
                    </li>
                    )}
                </ul>
            </div>
        )
    }
}

    Exemplo: Passando parâmetros usando data-attributes
Em vez disso, você pode usar APIs do DOM para armazenar dados necessários para
 manipuladores de evento. Considere este approach caso você precise otimizar um
  grande número de elementos ou possua uma render tree que depende de verificações
   de igualdade do React.PureComponent.*/

   const A = 65 // código de cractere ASCII

   class Alphabet extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            justClicked: null,
            letter: Array.from({lenght: 26}, (_, i) =>
        String.fromCharCode(A + i))
        };
    }

    handleClick(e) {
        this.setState({
            justClicked: e.target.dataset.letter
        });
    }

    render() {
        return (
            <div>
                Você clicou: {this.state.justClicked}
                <ul>
                    {this.state.letters.map(letter =>
                        <li key={letter} data-letter ={letter}
                    onClick={this.handleClick}>
                        {letter}
                    </li>)}
                </ul>
            </div>
        )
    }
   }

   /*Como eu posso evitar que uma função seja chamada muito rapidamente ou chamada
    muitas vezes em seguida?
Se você tem um manipulador de eventos como onClick ou onScroll e quer evitar que o
 callback seja ativado muito rapidamente, então você pode limitar a taxa em que o 
 callback é executado. Isso pode ser feito usando:

throttling: amostra de mudanças com base em uma frequência baseada no tempo
 (eg _.throttle)
debouncing: publica alterações após um período de inatividade (eg _.debounce)
requestAnimationFrame throttling: amostra de mudanças baseadas em requestAnimationFrame
 (eg raf-schd)
Veja esta visualização para uma comparação entre as funções throttle e debounce.

Nota:

_.debounce, _.throttle e raf-schd fornecem um método cancel para cancelar callbacks
 atrasados. Você deve chamar este método a partir de componentWillUnmount ou verificar
  se o componente ainda está montado dentro da função atrasada.

Throttle
O throttling impede a função de ser chamada mais de uma vez em uma certa janela de
 tempo. O exemplo abaixo throttles o manipulador do evento “Click” para impedi-lo de
  ser chamado mais de uma vez por segundo. */

  import Throttle from 'loadash.throttle';

  class LoadMoreButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickThrottled =
    throttle(this.handleClick, 1000);
    }

    componentWillUnmount() {
        this.handleClickThrottled.cancel();
    }

    render() {
        return <button onClick=
    {this.handleClickThrottled}>Load More</button>;
    }

    handleClick() {
        this.props.loadMore();
    }
  }

  /*Debounce

O Debouncing garante que a função não vai ser executada até que uma certa quantidade
 de tempo tenha passado desde sua última chamada. Isso pode ser útil quando você tem
 que executar algum cálculo pesado em resposta a um evento que pode despachar
  rapidamente (eg rolagem ou evento de teclas). O exemplo abaixo debounces o texto com
   um atraso de 250ms. */

   import debounce from 'lodash.debounce';

   class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleCharge = this.handleCharge.bind(this);
        this.emitChangeDebounced =
    debounce(this.emitChange, 250);
    }

    componentWillUnmount() {
        this.emitChangeDebounced.cancel();
    }

    render() {
        return (
            <input
            type="text"
            onChange={this.handleChange}
            planceHolder="Search..."
            defaultValue={this.props.value}
            />
        );
    }

    handleChange(e) {
        this.emitChangeDebounced(e.target.value);
    }

    emitChange(value) {
        this.props.onChange(value);
    }
   }

   /*requestAnimationFrame throttling
requestAnimationFrame é uma maneira de enfileirar uma função para ser executada no
 browser no tempo ideal para a performance de renderização. A função que é enfileirada
  com requestAnimationFrame vai disparar no próximo frame. O browser trabalhará duro
   para garantir que haja 60 frames por segundo(60 fps). Entretanto, se o browser for
    incapaz disso, ele vai naturalmente limitar a quantidade de frames por segundo. Por
     exemplo, um dispostivo pode ser capaz de aguentar apenas 30fps e então você só 
     tera 30 frames por segundo. Usar requestAnimationFrame para throttling é uma 
     técnica útil para prevenir você de fazer mais de 60 atualizações em um segundo.
      Se você está fazendo 100 atualizações em um segundo, isso cria trabalho adicional
       para o browser que de qualquer maneira o usuário não será capaz de ver.

Nota:

Usar esta técnica capturará apenas o último valor publicado em um frame. Você pode
 ver um exemplo de como esta otimização funciona em MDN */

 import rafSchedule from 'raf-schd';

 class ScrollListener extends React.Componente {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);

        //Cria uma nova função para agendar atualizações.
        this.scheduleUpdate = rafSchedule(
            point => this.props.onScroll(ponto)
        );
    }

    handleScroll(e) {
        //QUando recebemos um evento de scroll, agenda-se uma atualização.
        //Se recerbemos muitos updates em um frames, publicaremos apenas o último valor.
        this.scheduleUpdate({ x: e.clientX, y: e.clientY
        });
    }

    componentWillUnmount() {
        //Cancela qualquer atualização pendente já que estamos demostando o componente.
        this.scheduleUpdate.cancel();
    }

    render() {
        return (
            <div 
            style={{ overflow: 'scroll' }}
            onScroll={this.handleScroll}
            >
                <img src="/my-huge-image.jpg" />
            </div>
        )
    }
  }

  /*Testando sua taxa limitante
Ao testar que o seu código de limitação de taxa funciona corretamente é útil ter a
 capacidade de avançar o tempo. Se você esta usando jest então você pdoe usar mock
  timers para avançar o tempo. Se você está usando requestAnimationFrame throttling
   você pode achar raf-stub uma ferramenta útil para controlar o instate dos quadros
    das animações. */