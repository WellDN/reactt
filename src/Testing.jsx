/*Você pode testar componentes React de forma similar a como testa outros códigos
 JavaScript.

Há algumas maneiras de testar componentes React. Em geral, os testes podem ser feitos
 de duas formas:

Renderizando árvores de componentes em um ambiente de testes simplificado e confirmando
 o seu output.
Executando uma aplicação completa em um ambiente de navegador real (também conhecido
     como testes “end-to-end”).
Esta seção da documentação se concentra nas estratégias de teste para o primeiro
 caso. Embora os testes end-to-end completos possam ser muito úteis para impedir
  regressões em casos importantes, esses testes não estão relacionados a componentes
   React em particular e estão fora do escopo desta seção.

Tradeoffs
Ao escolher uma ferramenta de teste, vale a pena considerar alguns tradeoffs:

Velocidade de iteração vs Ambiente real: Algumas ferramentas oferecem um ciclo de
 feedback muito rápido entre fazer uma alteração e ver o resultado, mas não reflete
  o comportamento do navegador com precisão. Outras ferramentas podem usar um ambiente
   de navegador real, mas reduzem a velocidade da iteração e são mais precárias em um
    servidor de integração contínua.
Quanto mock eu devo usar: Nos componentes, a diferença entre um teste de “unidade” e
 um de “integração” pode ser confusa. Se você estiver testando um formulário, o teste
  também deve testar os botões dentro dele? Ou um componente de botão deve ter seu
   próprio conjunto de testes? A refatoração de um botão deve falhar o teste do
    formulário?
Diferentes respostas podem funcionar para diferentes times e produtos.

Ferramentas recomendadas
Jest é um test runner JavaScript que permite a você acessar o DOM através do jsdom.
 Mesmo o jsdom sendo apenas uma aproximação de como um navegador funciona, é bom o
  suficiente para testar componentes React. Jest oferece uma excelente velocidade de
   iteração combinada com recursos poderosos como mock de módulos e temporizadores
    para que você tenha mais controle sobre como o código é executado.

React Testing Library é um conjunto de utilitários que permitem testar componentes
 React sem depender dos detalhes de implementação. Essa abordagem facilita a
  refatoração e também te orienta para as melhores práticas de acessibilidade.
   Embora não forneça uma maneira de renderizar “superficialmente” um componente
    sem seus filhos, um test runner como o Jest permite fazer isso através de mock.
 */