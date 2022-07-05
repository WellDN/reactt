function createMarkup() {
    return {__html: 'First &middot; Second'};
  }
  
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />; //dangerouslySetInnerHTML
  }
  
  /*htmlFor
Já que for é uma palavra reservada em JavaScript, em vez disso elementos React usam
 htmlFor.

onChange
O evento onChange se comporta como você esperaria que ele se comportasse: sempre que
 um campo do formulário muda, este evento é disparado. Nós intencionalmente não
  utilizamos o comportamento existente do navegador porque onChange é um termo
   inadequado para seu comportamento e o React depende deste evento para manipular
    input do usuário em tempo real.

selected
Se você quiser marcar uma <option> como selecionada, faça referência ao valor dessa
 opção no value de sua <select>. Confira “A tag de seleção” para obter instruções
  detalhadas.

style
Nota

Alguns exemplos na documentação utilizam style por conveniência, mas usar o atributo
 style como a forma principal de estilizar elementos geralmente não é recomendado. Na
  maioria dos casos, className deve ser usado para referenciar classes definidas em
   um arquivo de estilo CSS externo. style é geralmente usado em aplicações React para
    adicionar estilos computados dinamicamente em tempo de renderização. Veja também
     FAQ: Estilização e CSS.

O atributo style aceita um objeto JavaScript com propriedades em camelCase ao invés de
 uma string CSS. Isso é consistente com a propriedade do JavaScript style */

 const divStyle = {
    color: 'blue',
    backgroundImage: 'url(' + imgUrl + ')',
  };
  
  function HelloWorldComponent() {
    return <div style={divStyle}>Hello World!</div>;
  }

  /*Perceba que estes estilos não são auto prefixados. Para serem compatíveis com
   navegadores antigos você precisa fornecer as propriedades de estilos
    correspondentes: */

//    const divStyle = {
        WebkitTransition: 'all', // perceba o 'W' maiúsculo aqui
 //       msTransition: 'all' // 'ms' é o único prefixo de fornecedor minúsculo
//      };
      
      function ComponentWithTransition() {
        return <div style={divStyle}>Isto deve funcionar em diferentes navegadores</div>;
      }

      /*Chaves de style são em camelCase com o intuito de serem consistentes com o
       acesso de propriedades que são nós do DOM através do JS
        (ex. node.style.backgroundImage). Prefixos de fornecedor (vendor prefixes)
         diferentes de ms devem começar com a letra maiúscula. É por isso que
          WebkitTransition tem um “W” maiúsculo.

React vai acrescentar automaticamente um sufixo “px” para determinadas propriedades
 numéricas de inline style. Se você quiser usar unidades diferentes de “px”,
  especifique o valor como uma string com a unidade desejada. Por exemplo: */

  // Style resultante: '10px'
//<div style={{ height: 10 }}>
//  Hello World!
//</div>

// Style resultante: '10%'
//<div style={{ height: '10%' }}>
//  Hello World!
//</div>

/*Nem todas as propriedades de estilos são convertidas para strings pixel. Algumas
 permanecem sem unidade (exemplo: zoom, order, flex). Uma lista completa com as
  propriedades sem unidade pode ser vista aqui

suppressContentEditableWarning
Normalmente, existe um alerta quando um elemento contém outros elementos que também
 estão marcados como contentEditable. Assim sendo, não funcionará. Esse atributo
  interrompe esse alerta. Não faça uso dele. A não ser que você esteja construindo
   uma biblioteca como a Draft.js que gerencia contentEditable manualmente.

suppressHydrationWarning
Se você usa a renderização do React no lado do servidor, normalmente existe um
alerta para quando o servidor e o lado do cliente renderizam conteúdo de formas
 diferentes. Entretanto, em alguns casos raros, é muito difícil ou impossível de 
 garantir a correspondência exata. Por exemplo, é esperado que timestamps estejam
  diferentes no servidor e no cliente.

Se você definir suppressHydrationWarning para true, o React não lhe avisará sobre
 incompatibilidades nos atributos e no conteúdo daquele elemento. Isto só funciona
  dentro de 1 nível de profundidade e destina-se a ser usado como uma saída de 
  emergência. Não use excessivamente. Você pode ler mais sobre hydration na 
  documentação do ReactDOM.hydrate().

value
O atributo value é suportado pelos componentes <input>, <select> e <textarea>. Você
 pode usá-lo para definir o valor do componente. Isso é útil para construção de
  componentes controlados (controlled components). defaultValue é o equivalente
   para componentes não controlados (uncontrolled components), que define o valor
    do componente quando este é montado pela primeira vez.

Todos os atributos HTML suportados
A partir do React 16, qualquer atributo padrão ou personalizado é totalmente
 suportado.

O React sempre forneceu uma API centrada no JavaScript para o DOM. Uma vez que os
 componentes React geralmente recebem tanto props personalizadas quanto props
  relacionadas ao DOM, o React usa a convenção camelCase assim como as APIs do DOM: */

//  <div tabIndex={-1} />      // Assim como node.tabIndex DOM API
//<div className="Button" /> // Assim como node.className DOM API
//<input readOnly={true} />  // Assim como node.readOnly DOM API

/*Essas props funcionam de forma similar aos atributos HTML correspondentes, com
 exceção dos casos especiais documentados abaixo.

Alguns dos elementos DOM suportados pelo React incluem: 

accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap

Igualmente, todos os atributos SVG são totalmente suportados:

accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan 

Você também pode usar atributos personalizados, desde que todos eles estejam 
em letras minúsculas. */