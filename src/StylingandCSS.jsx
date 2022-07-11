render() //{
    return <span className="menu navigation-menu">Menu</span>
//}

/*É comum para classes do CSS dependerem de props ou o state do componente. */

render() //{
    let className = 'menu';
    if (this.props.isActive) {
        className += 'menu-active';
    }
    return <span className={className}>Menu</span>
//}

/*O que é CSS-in-JS?
“CSS-in-JS” se refere a um padrão onde o CSS é definido utilizando JavaScript no lugar
 de arquivos externos.

Note que esta funcionalidade não faz parte do React, mas é fornecida por bibliotecas
 de terceiros. React não possui uma opinião sobre como os estilos são definidos; se
  estiver em dúvida, um bom ponto de partida é definir seus estilos em um arquivo .css
   separado e referenciá-los usando className.
 */