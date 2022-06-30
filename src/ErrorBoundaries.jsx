class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Atualiza o state para que a próxima renderização mostre a UI alternativa.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Você também pode registrar o erro em um serviço de relatórios de erro
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Você pode renderizar qualquer UI alternativa
        return <h1>Algo deu errado.</h1>;
      }
  
      return this.props.children; 
    }
  }
//E então você pode usá-la como um componente qualquer:

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>

/*Error boundaries funcionam como o bloco catch {} do JavaScript, mas para componentes.
 Apenas componentes de classe podem ser error boundaries. Na prática, na maioria das
  vezes você irá declarar um componente error boundary uma vez e usá-lo em toda a
   aplicação.

Note que as error boundaries apenas capturam erros nos componentes abaixo delas na
 árvore. Uma error boundary não pode capturar um erro em si mesma. Se uma error
  boundary falhar ao tentar renderizar a mensagem de erro, o erro será propagado
   para a error boundary mais próxima acima dela. Isto também é parecido com a
    forma que o bloco catch {} funciona no JavaScript. 
    
    Demonstração ao vivo
Veja este exemplo de como declarar e usar uma error boundary com React 16.

Onde colocar error boundaries
Você é quem decide a granularidade das errors boundaries. Você pode envolver
 componentes da rota superior para exibir uma mensagem como “Algo deu errado”
  para o usuário, da mesma forma que frameworks server-side costumam lidar com
   travamentos. Você também pode envolver widgets individuais em uma error boundary
    para protegê-los de quebrar o restante da aplicação.

Novo comportamento para erros não tratados
Esta alteração tem uma implicação importante. A partir do React 16, erros que não
 forem tratados por uma error boundary irão fazer com que toda a árvore de componentes
  React seja desmontada.

Nós debatemos esta decisão, mas em nossa experiência é pior deixar uma UI corrompida
 ser exibida do que removê-la completamente. Por exemplo, em um produto como o
  Messenger, deixar a UI quebrada visível poderia fazer com que alguém envie uma
   mensagem para a pessoa errada. Do mesmo modo, é pior para um app de pagamentos
    exibir um valor errado do que não renderizar nada.

Esta alteração significa que quando você migrar para o React 16, você provavelmente
 irá descobrir alguns travamentos existentes em sua aplicação que antes passavam
  despercebidos. Adicionar errors boundaries permite que você forneça uma experiência
   de usuário melhor quando algo der errado.

Por exemplo, o Facebook Messenger envolve o conteúdo da barra lateral, do painel de
 informações, do histórico da conversa e do input de mensagem em error boundaries
  separadas. Se algum componente em uma destas áreas da UI quebrar, o restante
   continua funcionando.

Nós também encorajamos que você use serviços de relatório de erros JS (ou faça o
     seu próprio) para que você possa ficar sabendo sobre exceções não tratadas
      quando elas acontecerem em produção e consertá-las.

Stack traces de componentes
O React 16 registra todos os erros ocorridos durante a renderização no console em
 desenvolvimento, mesmo que a aplicação absorva-os acidentalmente. Além da mensagem
  de erro e a stack do JavaScript, ele também fornece as stack traces do componente.
   Agora você pode ver onde exatamente na árvore de componentes a falha aconteceu:

Erro capturada por um componente Error Boundary
Você também pode ver os nomes dos arquivos e números das linhas na stack trace do
 componente. Isto funciona por padrão em projetos do Create React App:

Erro capturado por componente Error Boundary com os números das linhas
Se você não usar o Create React App, você pode adicionar este plugin manualmente na
 sua configuração do Babel. Note que isto é destinado apenas para desenvolvimento e
  deve ser desativado em produção.

Nota

Os nomes de componentes exibidos na stack trace dependem da propriedade Function.name.
 Se você der suporte a navegadores antigos e dispositivos que podem não fornecer isto
  nativamente (como o IE 11), considere a inclusão de um poyfill de Function.name no
   bundle da sua aplicação, como o function.name-polyfill. Outra alternativa é definir
    a propriedade displayName explicitamente em todos os seus componentes.

Que tal usar try/catch?
try / catch é ótimo, mas só funciona para código imperativo:*/

try {
    showButton();
  } catch (error) {
    // ...
  }

  /*Contudo, componentes React são declarativos e especificam o que deve ser
   renderizado: */

   <Button />

   /*Error boundaries preservam a natureza declarativa do React e se comportam como
    você esperaria. Por exemplo, mesmo se um erro ocorrer em um método
     componentDidUpdate causado por um setState em algum lugar profundo da árvore, ele
      ainda vai propagar corretamente para a error boundary mais próxima.

Como ficam os manipuladores de evento?
Error boundaries não tratam erros dentro de manipuladores de evento.

O React não precisa que as error boundaries se recuperem de erros em manipuladores de
 evento. Ao contrário do método de renderização e dos métodos do ciclo de vida,
  manipuladores de evento não acontecem durante a renderização. Então, se eles
   quebrarem, o React ainda sabe o que exibir na tela.

Se você precisar capturar um erro dentro de um manipulador de evento, use a declaração
 comum de try / catch do JavaScript: */

 class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      try {
        // Faz alguma coisa que pode quebrar
      } catch (error) {
        this.setState({ error });
      }
    }
  
    render() {
      if (this.state.error) {
        return <h1>Capturei um erro.</h1>
      }
      return <button onClick={this.handleClick}>Clique em mim</button>
    }
  }

  /*Note que o exemplo acima está demonstrando um comportamento comum de JavaScript
   e não usa error boundaries.
 */