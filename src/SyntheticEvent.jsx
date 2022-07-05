/*boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type    */    //SyntheticEvent Attributes ^^

/*Eventos Suportados
O React normaliza eventos para que eles possam ter propriedades consistentes entre os
 navegadores.

Os manipuladores de evento (event handlers) abaixo são acionados por um evento na fase
 de propagação (bubbling). Para registrar um manipulador de evento para a fase de
  captura, adicione Capture como sufixo do nome do evento. Por exemplo, ao invés de
   usar onClick, você usaria onClickCapture para manipular o evento de clique na fase
    de captura.

Eventos do Clipboard
Eventos de Composição (Composition)
Eventos do Teclado
Eventos de Foco
Eventos de Formulário
Eventos Genéricos
Eventos do Mouse
Eventos do Ponteiro (Pointer)
Eventos de Seleção
Eventos de Toque (Touch)
Eventos da Interface do Usuário (UI)
Eventos de Rolagem (Wheel)
Eventos de Mídia
Eventos de Imagem
Eventos de Animação
Eventos de Transição
Outros Eventos
Referência
Eventos do Clipboard
Nome dos eventos: */

//onCopy onCute onPaste

//Propriedades:

// DOMDataTransfer clipboardData

/*Eventos de Composição (Composition)
Nome dos eventos:

onCompositionEnd onCompositionStart onCompositionUpdate
Propriedades:

string data
Eventos do Teclado
Nome dos eventos:

onKeyDown onKeyPress onKeyUp
Propriedades:

boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
A propriedade key pode receber quaisquer valores documentados na especificação
 de eventos do DOM Level 3.

Eventos de Foco
Nome dos eventos:

onFocus onBlur
Esses eventos de foco funcionam em todos os elementos do React DOM, não apenas em
 elementos de formulário.

Propriedades:

DOMEventTarget relatedTarget
onFocus
O evento onFocus é chamado quando o elemento (ou algum elemento dentro dele) recebe
 o foco. Por exemplo, é chamado quando o usuário clica em um input de texto. */

 function Example() {
    return (
      <input
        onFocus={(e) => {
          console.log('Focos no input');
        }}
        placeholder="onFocus é acionado quando você clica nesta entrada."
      />
    )
  }

  /*onBlur
O manipulador de eventos onBlur é chamado quando o foco deixa o elemento
 (ou deixa algum elemento dentro dele). Por exemplo, é chamado quando o usuário clica
  fora de um input de texto focado. */

  function Example() {
    return (
      <input
        onBlur={(e) => {
          console.log('Disparado porque esta entrada perdeu o foco');
        }}
        placeholder="onBlur é acionado quando você clica nesta entrada e clica fora dela."
      />
    )
  }

  /*Detecção de Foco Entrando e Saindo
Você pode usar currentTarget e relatedTarget para diferenciar se os eventos de foco ou
 desfoque originaram-se de fora do elemento pai. Aqui está uma demonstração que você
  pode copiar e colar que mostra como detectar o foco de um elemento filho, focalizando
   o próprio elemento e o foco entrando ou saindo de toda a subárvore. */

   function Example() {
    return (
      <div
        tabIndex={1}
        onFocus={(e) => {
          if (e.currentTarget === e.target) {
            console.log('focos dele');
          } else {
            console.log('focus no elemento filho', e.target);
          }
          if (!e.currentTarget.contains(e.relatedTarget)) {
            // Não acionado ao trocar o foco entre os elementos filhos
            console.log('foco entrou no proprio elemento');
          }
        }}
        onBlur={(e) => {
          if (e.currentTarget === e.target) {
            console.log('desfoque dele');
          } else {
            console.log('desfoque no elemento filho', e.target);
          }
          if (!e.currentTarget.contains(e.relatedTarget)) {
            // Não acionado ao trocar o foco entre os elementos filhos
//            console.log(focos a esquerda'');
          }
        }}
      >
        <input id="1" />
        <input id="2" />
      </div>
    );
  }

  /*Eventos de Formulário
Nome dos eventos: 

onChange onInput onInvalid onReset onSubmit

Eventos Genéricos
Nome dos eventos:

onError onLoad
Eventos do Mouse
Nome dos eventos:

onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
Os eventos onMouseEnter e onMouseLeave propagam do elemento do lado esquerdo ao evento que está entrando, ao invés do bubbling comum e não tem uma fase de captura.

Propriedades:

boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
Eventos do Ponteiro
Nome dos eventos:

onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
Os eventos onPointerEnter e onPointerLeave propagam do elemento do lado esquerdo ao
 evento que está entrando, ao invés do bubbling comum e não tem uma fase de captura.

Propriedades:

Como definido na especificação da W3, os eventos de ponteiro estendem os Eventos do
 Mouse com as seguintes propriedades:

number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
Uma nota em relação a compatiblidade entre navegadores:

Os eventos de ponteiro ainda não tem suporte em todos os navegadores (no momento da
     escrita deste artigo, navegadores que oferecem suporte são: Chrome, Firefox, Edge
      e Internet Explorer). O React deliberadamente não fornece um polyfill para
       outros navegadores, pois um polyfill que seja compilante com os padrōes
        aumentaria drasticamente o tamanho do bundle do react-dom.

Se sua aplicação necessita de eventos de ponteiro, recomendamos adicionar um polyfill
 de terceiros.

Eventos de Seleção
Nome dos eventos:

onSelect
Eventos de Toque (Touch)
Nome dos eventos:

onTouchCancel onTouchEnd onTouchMove onTouchStart
Propriedades:

boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
Eventos da Interface do Usuário (UI)
Nome dos eventos:

onScroll
Nota

Começando com React 17, o evento onScroll não borbulha no React. Isso corresponde ao
 comportamento do navegador e evita a confusão quando um elemento rolável aninhado
  dispara eventos em um pai distante.

Propriedades:

number detail
DOMAbstractView view
Eventos de Rolagem (Wheel)
Nome dos eventos:

onWheel
Propriedades:

number deltaMode
number deltaX
number deltaY
number deltaZ
Eventos de Mídia
Nome dos eventos:

onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
Eventos de Imagem
Nome dos eventos:

onLoad onError
Eventos de Animação
Nome dos eventos:

onAnimationStart onAnimationEnd onAnimationIteration
Propriedades:

string animationName
string pseudoElement
float elapsedTime
Eventos de Transição
Nome dos eventos:

onTransitionEnd
Propriedades:

string propertyName
string pseudoElement
float elapsedTime
Outros Eventos
Nome dos eventos:

onToggle*/



