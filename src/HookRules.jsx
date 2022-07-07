//npm install eslint-plugin-react-hooks --save-dev
// Sua Configuração ESLint

import { useEffect } from "react";

/*{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {                                //ESLint Plugin install to use hooks
    // ...
    "react-hooks/rules-of-hooks": "error", // Verifica as regras dos Hooks
    "react-hooks/exhaustive-deps": "warn" // Verifica as dependências de effects
  }
}  

Você pode pular para próxima página agora, onde explicamos melhor como escrever seus
 próprios Hooks. Nessa página continuaremos explicando o motivo por trás dessas regras.

Explicação
Assim como aprendemos anteriormente, nós podemos usar diversos Hooks
 (States ou Effects) em um único componente:*/

 function Form() {
    // 1. Use a variável de estado (state) name
    const [name, setname] = useState('Mary');

    // 2.Use um efeito para persistir o formulário
    useEffect(function persistForm() {
        localStorage.setItem('formData', name);
    });

    // 3. Use a variável de estado (state) surname
    const [surname, setSurname] = useState('Poppins');

    //4. Use um efeito para atualizar o título
    useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
    });
    //....
 }

 /*Agora, como o React sabe qual o estado (state) correspondente ao useState
  chamado? A resposta é que o React depende da ordem em que os Hooks são chamados.
   Nosso exemplo funciona porque a ordem de chamada dos Hooks é a mesma sempre que o
    componente é renderizado: */

    // ------------
// Primeira renderização
// ------------
useState('Mary')           // 1. Inicializa a variável de estado (state) name com 'Mary'
useEffect(persistForm)     // 2. Adiciona um efeito para persistir o formulário
useState('Poppins')        // 3. Inicializa a variável de estado (state) surname com 'Poppins'
useEffect(updateTitle)     // 4. Adiciona um efeito para atualizar o título

// -------------
// Segunda renderização
// -------------
useState('Mary')           // 1. Lê a variável de estado (state) name (argumento ignorado)
useEffect(persistForm)     // 2. Substitui o efeito para persistir no formulário
useState('Poppins')        // 3. Lê a variável de estado (state) surname (argumento ignorado)
useEffect(updateTitle)     // 4. Substitui o efeito que atualiza o título

// ...

/*Enquanto a ordem dos Hooks chamados for a mesma entre as renderizações, o React
 pode associar um estado (state) local a cada um deles. Mas o que acontece se
  colocarmos uma chamada de Hook (por exemplo, o efeito persistForm) dentro de uma
   condição? */

   // 🔴 Nós estaremos quebrando a primeira regra por usar um Hook dentro de uma condição
if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }

  /*A condição name !== '' é true na primeira renderização, então chamamos o Hook
   dentro da condição. Entretanto, na próxima renderização o usuário pode limpar o
    formulário, fazendo com que a condição seja false. Agora que pulamos este Hook
     durante a renderização, a ordem das chamadas dos Hooks foi alterada: */

     useState('Mary')           // ✅  1. Lê a variável de estado (state) name (argumento é ignorado)
// useEffect(persistForm)  // 🔴  Agora, este Hook foi ignorado!
useState('Poppins')        // 🔴  Na ordem era pra ser 2 (mas foi 3). Falha ao ler a variável de estado (state) surname
useEffect(updateTitle)     // 🔴  Na ordem era pra ser 3 (mas foi 4). Falha ao substituir o efeito

/*O React não saberia o que retornar na segunda chamada do Hook useState. O React
 esperava que a segunda chamada de Hook nesse componente fosse ao efeito persistForm,
  assim como aconteceu na renderização anterior, mas a ordem foi alterada. A partir
   daí, toda vez que um Hook for chamado depois daquele que nós pulamos, o próximo
    também se deslocaria, levando a erros.

É por isso que os Hooks devem ser chamados no nível superior de nosso componente. Se
 nós queremos executar um efeito condicional, nós podemos colocar a condição dentro
  de nosso Hook: */

  useEffect(function persistForm() { //the hook cannot be inside the condition (if).
    // 👍  Legal! Agora não quebramos mais a primeira regra.
    if (name !== '') {
      localStorage.setItem('formData', name); 
    }
  });

  /*Note que você não precisa se preocupar com esse problema, se você usar a regra
   fornecida no plugin do ESLint. Mas agora você também sabe o porquê dos Hooks
    funcionarem dessa maneira, e quais os problemas que essas regras previnem. */