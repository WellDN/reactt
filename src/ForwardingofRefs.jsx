function FancyButton(props) {
    return (
      <button className="FancyButton">
        {props.children}
      </button>
    );
  }

  /*Componentes React escondem seus detalhes de implementação, inclusive suas saídas
   renderizadas. Outros componentes usando o FancyButton geralmente não precisarão obter uma ref para o elemento interno button do DOM. Isso é bom pois previne os componentes de se basearem demasiadamente na estrutura do DOM de cada um.

Embora essa encapsulação seja desejável para componentes com nível de aplicação como
 FeedStory ou Comment, ela pode ser incoveniente para componentes “folhas” altamente
  reutilizáveis como FancyButton ou MyTextInput. Esses componentes tendem a serem
   usados em toda a aplicação de uma maneira similar como os elementos button e
    input do DOM, e acessar seus nós do DOM pode ser inevitável para o gerenciamento
     de foco, seleção ou animações.

Encaminhamento de ref é um recurso opt-in que permite que alguns componentes tomem
 uma ref que eles recebam e a repassem para baixo (em outras palavras, “encaminhem”)
  para um filho.

No exemplo abaixo, FancyButton usa React.forwardRef para obter a ref passada para
 ele e então a encaminha para o button do DOM que ele renderiza: */

 const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));
  
  // Você agora pode obter a ref diretamente para o button do DOM:
  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;

  /*Desta forma, componentes usando FancyButton podem obter uma referência ao nó DOM button subjacente e acessá-lo se necessário — como se eles usassem um button DOM diretamente.

Aqui está uma explicação passo-a-passo sobre o que acontece no exemplo acima:

Nós criamos uma React ref ao chamar React.createRef e atribuí-la a uma variável ref.
Nós passamos nossa ref para <FancyButton ref={ref}> especificando-a como um atributo JSX.
O React passa a ref como um segundo argumento para a função (props, ref) => ... dentro de fowardRef.
Nós encaminhamos esse argumento ref para <button ref={ref}> especificando-a como um atributo JSX.
Quando a ref estiver anexada, ref.current irá apontar para o nó <button> do DOM.
Nota

O segundo argumento ref só existe quando você define um componente com a chamada
 React.forwardRef. Componentes funcionais ou de classe não recebem o argumento ref,
  e ref também não está disponível nas props.

Encaminhamento de ref não é limitado aos componentes do DOM. Você pode encaminhar refs
 para componentes de classe também.

Nota para quem mantém uma biblioteca de componentes
Quando você começar a usar fowardRef em uma biblioteca de componentes, você deve
 tratar isso como uma mudança abrupta e lançar uma nova versão maior. Isso porque
  sua biblioteca provavelmente terá um comportamento observável diferente
   (como para onde as refs são atribuídas, ou quais tipos são exportados) e isso
    pode ocasionar quebras em aplicações ou em outras bibliotecas que dependem do
     comportamento antigo.

Aplicar React.fowardRef condicionalmente quando ele existe também não é recomendado
 pelas mesmas razões: isso muda como sua biblioteca se comporta e potencialmente
  pode quebrar as aplicações para seus usuários quando eles derem upgrade no
   próprio React.

Encaminhamento de refs em componentes de ordem superior
Esta técnica também pode ser particulamente útil com componentes de ordem superior
 (também conhecidos como HOCs). Vamos começar com o exemplo de um HOC que da log de
  props de componente para o console: */

  function logProps(WrappedComponent) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('props antigas:', prevProps);
        console.log('novas props:', this.props);
      }
  
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  
    return LogProps;
  }

  /*O HOC “logProps” passa todas as props para o componente que ele envolve, assim
   a saída renderizada será a mesma. Por exemplo, podemos usar este HOC para dar
    log em todas as props que são passadas para nosso componente “fancy button”: */

    class FancyButton extends React.Component {
        focus() {
          // ...
        }
      
        // ...
      }
      
      // Ao invés de exportar FancyButton, nós exportamos LogProps.
      // De qualquer forma, isso irá renderizar o FancyButton
      export default logProps(FancyButton);

      /*Existe uma ressalva sobre o exemplo acima: refs não serão aceitas. Isso porque
       ref não é uma prop. Assim como key é tratada de forma diferente pelo React.
        Se você adiciona uma ref a um HOC, a ref irá referir-se ao componente mai
         externo e não ao componente encapsulado.

Isso significa que refs destinadas para nosso componente FancyButton terão que ser
 anexadas, na verdade, ao componente LogProps: */

 import FancyButton from './FancyButton';

const ref = React.createRef();

// O componente FancyButton que importamos é o HOC LogProps
// Mesmo que a saída renderizada seja a mesma,
// Nossa ref vai apontar para LogProps ao invês do componente interno FancyButton!
// Isso significa que nós não podemos chamar e.g. ref.current.focus()
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;

/*Felizmente, nós podemos encaminhar refs explicitamente para o componente interno
 FancyButton usando a API React.forwardRef. React.forwardRef aceita uma função de
  render que recebe parâmetros props e ref e retorna um nó React. Por exemplo: */

  function logProps(Component) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        const {forwardedRef, ...rest} = this.props;
  
        // Atribui a prop "fowardRef" como uma ref
        return <Component ref={forwardedRef} {...rest} />;
      }
    }
  
    // Note o segundo parâmetro "ref" fornecido pelo React.fowardRef.
    // Nós podemos passá-lo para LogProps como qualquer outra props regular, e.g. "fowardedRef"
    // E ela pode ser anexada ao componente
    return React.forwardRef((props, ref) => {
      return <LogProps {...props} forwardedRef={ref} />;
    });
  }

  /*Exibindo um nome customizável em DevTools
React.forwardRef aceita uma função de renderização. React DevTools usa esta função
 para determinar o que exibir para o componente de encaminhamento de ref.

Por exemplo, o componente a seguir vai aparecer como ”ForwardRef” no DevTools: */

const WrappedComponent = React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });

  /*Se você nomear a função de renderização, DevTools também irá incluir
   seu nome (e.g. ForwardRef(myFunction)”): */

   const WrappedComponent = React.forwardRef(
    function myFunction(props, ref) {
      return <LogProps {...props} forwardedRef={ref} />;
    }
  );

  /*Você inclusive pode definir a propriedade displayName da função para incluir
   o componente que você está envolvendo: */

   function logProps(Component) {
    class LogProps extends React.Component {
      // ...
    }
  
    function forwardRef(props, ref) {
      return <LogProps {...props} forwardedRef={ref} />;
    }
  
    // Dê a este componente um nome mais visivelmente amigável no DevTools
    // e.g. "ForwardRef(logProps(MyComponent))"
    const name = Component.displayName || Component.name;
    forwardRef.displayName = `logProps(${name})`;
  
    return React.forwardRef(forwardRef);
  }