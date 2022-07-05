//ReactDOM.render(element, contair[, callback])

import { createPortal } from "react-dom"

/*Renderiza o um elemento do React no DOM no container fornecido e retorna uma
 referência ao componente (ou retorna null para componentes sem state)

Se o elemento do React foi previamente renderizado no container, isso vai realizar
 uma atualização nele e só alterar o DOM conforme necessário para refletir o elemento
  do React mais recente.

Se a callback opcional for fornecida, ela será executada depois do componente ser
 renderizado ou atualizado.

Nota:

ReactDOM.render() controla o conteúdo do nó contêiner que você passa. Qualquer
 elemento do DOM que existe dentro será substituído na primeira chamada. As próximas
  chamadas usam o algoritmo de diferenciação do React para atualizações eficientes.

ReactDOM.render() não modifica o nó contêiner (só modifica os filhos do contêiner).
 Pode ser possível inserir um componente em um nó já existente no DOM sem sobrescrever
  os filhos existentes.

ReactDOM.render() atualmente retorna uma referência à instância raiz de ReactComponent.
 Porém, usar esse valor de retorno é legado e deve ser evitado porque versões futuras
  do React podem renderizar componentes assincronamente em alguns casos. Se você
   precisa de uma referência da instância raiz de ReactComponent, a solução preferida
    é de anexar uma callback de ref para o elemento raiz.

Usar ReactDOM.render() para hidratar um contêiner renderizado no servidor está
 deprecado e será removido no React 17. Ao invés disso, use hydrate().

hydrate() */

//ReactDOM.hydrate(element, contair[, callback])

/*O mesmo que render(), mas é usado para hidratar um contêiner cujo o conteúdo HTML
 foi renderizado pelo ReactDOMServer. O React tentará anexar event listeners ao markup
  existente.

O React espera que o conteúdo renderizado seja idêntico entre o servidor e o cliente.
 Ele pode consertar diferenças no conteúdo de texto, mas você deve tratar
  incompatibilidades como erros e ajustá-las. Em modo de desenvolvimento, o React avisa
   sobre incompatibilidades durante a hidratação. Não existem garantias de que
    diferenças entre atributos serão consertadas em caso de incompatibilidade. Isso é
     importante por questões de performance porque na maioria dos aplicativos,
      incompatibilidades são raras e, portanto, validar todo o markup seria
       proibitivamente caro.

Se um único atributo de elemento ou conteúdo de texto é inevitavelmente diferente entre
 o servidor e o cliente (como por exemplo, um timestamp), você pode silenciar o aviso
  adicionando suppressHydrationWarning={true} ao elemento. Só funciona à um nível de
   profundidade, e destina-se a ser uma válvula de escape. Não use em excesso. A não
    ser que o conteúdo seja um texto, o React ainda não vai tentar consertar, então ele
     pode permanecer inconsistente até futuras atualizações.

Se você precisa propositalmente renderizar algo diferente no servidor e no cliente,
 você pode fazer uma renderização de dois passos. Componentes que renderizam algo
  diferente no cliente podem ler uma variável de state como this.state.isClient, que
   você pode atribuir o valor true no componentDidMount(). Dessa forma o passo de
    renderização inicial irá renderizar o mesmo conteúdo que o servidor, evitando
     incompatibilidades, mas um passo adicional acontecerá sincronamente logo após a
      hidratação. Note que essa abordagem fará seus componentes mais lentos porque
       eles tem de renderizar duas vezes, então use com cautela.

Lembre-se de estar atento à experiência de usuário em conexões lentas. O código
 JavaScript pode carregar significativamente depois da renderização inicial do HTML,
  então se você renderizar algo diferente no passo do cliente, a transição pode ser
   áspera. No entanto, se executado bem, pode ser benéfico renderizar uma “casca” da 
   aplicação no servidor, e só mostrar ferramentas extras no lado do cliente. Para
    aprender como fazer isso sem encontrar problemas de incompatibilidade do markup,
     consulte a explicação do parágrafo anterior.

unmountComponentAtNode() */

ReactDOM.unountComponentAtNode(container)

/*Remove do DOM um componente React já montado e limpa seus manipuladores de evento
 (event handlers) e estado (state). Se nenhum componente foi montado no contêiner,
  chamar essa função não faz nada. Retorna true se um componente foi desmontado e
   false se não tinha nenhum componente para desmontar.

findDOMNode()
Nota:

findDOMNode é uma válvula de escape usada para acessar o nó subjacente do DOM. Na
 maioria dos casos, o uso dessa válvula de escape é desencorajado porque perfura
  a abstração do componente. Foi deprecado em StrictMode. */

  ReactDOM.findDOMNode(component)

  /* Se esse componente foi montado no DOM, isso retorna o elemento do DOM nativo do
   navegador. Esse método é útil para ler valores fora do DOM, como valores de campos
    de formulário e realizar medições do DOM. Na maioria dos casos, você pode anexar
     uma ref ao nó do DOM e evitar completamente o uso de findDOMNode.

Quando um componente renderiza null ou false, findDOMNode retorna null. Quando um
 componente renderiza uma string, findDOMNode retorna um nó de texto do DOM contendo
  esse valor. A partir do React 16, um componente pode retornar um fragmento com
   múltiplos filhos, nesse caso findDOMNode irá retornar o nó do DOM correspondente
    ao primeiro filho não vazio.

Nota:

findDOMNode só funciona em componentes montados (ou seja, componentes que foram postos
     no DOM). Se você tentar chamar isso em um componente que não foi montado ainda
      (como chamar findDOMNode() no render() em um componente que ainda tem que ser
       criado) uma exceção será lançada.

findDOMNode não pode ser usado em componentes funcionais.

createPortal()*/

ReactDOM.createPortal(child, container)

/*Cria um portal. Portais provêm uma forma de renderizar filhos em um nó do DOM que
 existe fora da hierarquia do componente do DOM. */