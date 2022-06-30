// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42
// math.js
export function add(a, b) {
  return a + b;
}

//Bundle:

function add(a, b) {
    return a + b;
  }
  
  console.log(add(16, 26)); // 42

/*Nota:

Seu pacote provavelmente será bem diferente que o mostrado acima.

Se você estiver usando o Create React App, Next.js, Gatsby ou alguma outra ferramenta
 semelhante, você terá uma configuração do Webpack pronta para empacotar a sua
  aplicação.

Se não estiver usando, precisará configurar o empacotamento manualmente. Por exemplo,
 veja os guias de Instalação e Introdução na documentação do Webpack.

Dividindo o Código (Code Splitting)
Empacotamento é excelente, mas à medida que sua aplicação cresce, seu pacote crescerá
 também. Especialmente se você estiver usando grandes bibliotecas de terceiros. Você
  precisa ficar de olho em todo código que está incluindo no seu pacote, pois assim
   você evitará que o mesmo fique tão grande que faça sua aplicação levar um tempo
    maior para carregar.

Para evitar acabar com um pacote grande, é bom se antecipar ao problema e começar
 a “dividir” seu pacote. A divisão de código é um recurso suportado por empacotadores
  como Webpack, Rollup e Browserify (através de coeficiente de empacotamento
     (factor-bundle)) no qual pode-se criar múltiplos pacotes que podem ser
      carregados dinamicamente em tempo de execução.

Dividir o código de sua aplicação pode te ajudar a carregar somente o necessário
 ao usuário, o que pode melhorar dramaticamente o desempenho de sua aplicação.
  Embora você não tenha reduzido a quantidade total de código de sua aplicação,
   você evitou carregar código que o usuário talvez nunca precise e reduziu o
    código inicial necessário durante o carregamento.

import()
A melhor forma de introduzir a divisão de código em sua aplicação é através da
 sintaxe dinâmica import().

Antes: */

import { add } from './math';

console.log(add(16, 26));

// Depois: 

import("./math").then(math => {
    console.log(math.add(16, 26));
  });

  /*Quando o Webpack encontra esta sintaxe, automaticamente ele divide o código de sua
   aplicação. Se você está usando o Create React App, isto já está configurado e você
    pode começar a usá-lo imediatamente. Também é suportado por padrão no Next.js.

Se você está configurando o Webpack manualmente, provavelmente vai querer ler o guia
 de divisão de código do Webpack. Sua configuração do Webpack deverá ser parecida com
  isto.

Ao usar o Babel, você precisa se certificar que o Babel consegue analisar a sintaxe
 de importação dinâmica mas não está a transformando. Para isso, você precisará do
  @babel/plugin-syntax-dynamic-import.

React.lazy
Nota:

React.lazy e Suspense não estão disponíveis para renderização no lado servidor. Se
 você deseja fazer divisão de código em uma aplicação renderizada no servidor, nós
  recomendamos o pacote Loadable Components. Ele possui um ótimo guia para divisão
   de pacotes com renderização no servidor.

A função do React.lazy é permitir a você renderizar uma importação dinâmica como se
 fosse um componente comum.

Antes: */

import OtherComponent from './OtherComponent';

//Depois:

const OtherComponent = React.lazy(() => import('./OtherComponent'));

/*Isto automaticamente carregará o pacote contendo o OtherComponent quando este
 componente é renderizado pela primeira vez.

React.lazy recebe uma função que deve retornar um import(). Este último retorna uma
 Promise que é resolvida para um módulo com um export default que contém um componente
  React.

O componente lazy pode ser renderizado dentro de um componente Suspense, o que nos
 permite mostrar algum conteúdo de fallback (como um indicador de carregamento)
  enquanto aguardamos o carregamento do componente lazy. */

  import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Carregando...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}

/*A prop fallback aceita qualquer elemento React que você deseja renderizar enquanto
 se espera o componente ser carregado. Você pode colocar o componente Suspense em
  qualquer lugar acima do componente dinâmico. Você pode até mesmo ter vários
   componentes dinâmicos envolvidos em um único componente Suspense. */

   import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Carregando...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}

/*Error boundaries
Se algum outro módulo não for carregado (por exemplo, devido a uma falha na conexão),
 será disparado um erro. Você pode manusear estes erros para mostrar uma ótima
  experiência de usuário e gerenciar a recuperação através de Error Boundaries. Uma
   vez que tenha criado seu Error Boundary, você pode usá-lo em qualquer lugar acima
    de seus componentes dinâmicos para exibir uma mensagem de erro quando houver uma
     falha de conexão. */

     import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Carregando...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);

/*Divisão de Código Baseada em Rotas
Decidir onde introduzir a divisão de código em sua aplicação pode ser um pouco
 complicado. Você precisa ter certeza de escolher locais que dividirão os pacotes
  de forma uniforme, mas que não interrompa a experiência do usuário.

Um bom lugar para começar é nas rotas. A maioria das pessoas na web estão acostumadas
 com transições entre páginas que levam algum tempo para carregar. Você também tende
  a re-renderizar toda a página de uma só vez para que seus usuários não interajam
   com outros elementos na página ao mesmo tempo.

Aqui está um exemplo de como configurar a divisão de código baseada em rotas na sua
 aplicação usando bibliotecas como o React Router com React.lazy. */

 import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);

/*Exportações Nomeadas
React.lazy atualmente suporta apenas export default. Se o módulo que você deseja
 importar usa exportações nomeadas, você pode criar um módulo intermediário que
  usa export default. Isso garante que o tree shaking continue funcionando e que
você não importe componentes não utilizados. */

// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));