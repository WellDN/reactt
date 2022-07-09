/*Testing receips using Jest*/

import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
    //Configura um elemento do DOM como alvo do teste
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    //Limpa ao sair
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

/*Você pode utilizar um padrão diferente, mas tenha em mente que queremos executar uma
 limpeza mesmo que o teste falhe. Caso contrário, os testes podem impactar outros,
  alterando o comportamento. Isso faz com que eles sejam difíceis de serem depurados.

act()
Quando estiver escrevendo testes de UI, tarefas como renderização, eventos de usuário
 ou busca de testes podem ser considerados como “unidades” de interação com a interface
  do usuário. react-dom/test-utils provê um auxiliar chamado act() que garante que
   todas as atualizações relacionadas a esses “usuários” estejam sendo processadas e
    aplicadas ao DOM antes que você faça alguma declaração de testes. */

    act(() => {
        // renderizar componentes
    });
    // fazer declarações de teste

    /*Isso ajuda seus testes a serem executados próximo do que os usuários
     experimentariam quando estiverem usando sua aplicação. O restante dos exemplos
      utilizam a função act() para ter essas garantias.

Você pode achar que utilizar o act() diretamente um pouco verboso demais. Para evitar
 um pouco do boilerplate, você pode usar uma biblioteca como a React Testing Library,
  cujo as funções auxiliares são encapsuladas com o act().

Nota:

O nome act vem do padrão Arrange-Act-Assert.

Renderizando
Popularmente, você deseja testar se um componente renderiza corretamente dado a prop
 recebida. Considere um componente simples que renderiza uma mensagem baseado em uma
  prop: */

  // hello.js

  import React from "react";

  export default function Hello(props) {
    if (props.name) {
        return <h1>Hello, {props.name}!</h1>
    } else {
        return <span>Hey, stranger</span>;
    }
  }

  /*Nós podemos criar o seguinte teste para esse componente: */

  import React from "react";
  import { render, unmountComponenteAtNode } from "react-dom";
  import { act } from "react-dom/test-utils";

  import Hello from "./hello";

  let ccontainer = null;
  beforeEach(() => {
    // Configurar o elemento do DOM como o alvo da renderização
    ccontainer = document.createElemente("div");
    document.body.appendChild(ccontainer);
  });

  afterEach(() => {
    //Limpar ao sair
    unmountComponenteAtNode(ccontainer);
    ccontainer.remove();
    ccontainer = null;
  });

  it("renders with or without a name", () => {
    act(() => {
        render(<Hello/>, ccontainer);
    });
    expect(ccontainer.textContent).toBe("Hey, stranger");

    act(() => {
        render(<Hello name="Jenny" />, ccontainer);
    });
    expect(ccontainer.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Hello name="Margaret" />, ccontainer);
    });
    expect(ccontainer.textContent).toBe("Hello, Margaret!");
  });

  /*Busca de Dados
Ao invés de realizar chamadas reais para uma API, você pode transformar a requisição
 em mock com dados fictícios. Transformando o dado em mock com dados “falsos” previne
  testes incompletos por causa de um backend indisponível, além de torná-los mais
   rápidos. Nota: Você ainda pode querer executar um subconjunto de testes usando um
    framework ”end-to-end” que valida se a aplicação inteira está funcionando em
     conjunto. */

     // user.js

     import React, { useState, useEffect } from "react";

     export default function user(props) {
        const [user, setUser] = useState(null);

        async function fetchUserData(id) {
            const response = await fetch("/" + id);
            setUser(await response.json());
        }

        useEffect(() => {
            fetchUserData(props.id);
        }, [props.id]);

        if (!user) {
            return "loading...";
        }

        return (
            <details>
                <summary>{user.name}</summary>
                <strong>{user.age}</strong> years old
                <br />
                lives in {user.adress}
            </details>
        );
     }

     /*Nós podemos escrever os testes para o componente: */

     //user.test.js

     import React from "react";
     import { render, unmountComponentAtNode} from "react-dom";
     import { act } from "react-dom/test-utils";
     import User from "./user";

     let containerr = null;
     beforeEach(() => {
        //configurar o elemento do DOM como o alvo da renderização
        containerr = document.createElement("div");
        document.body.appendChild(containerr);
     });

     afterEach(() => {
        // limpar a saída
        unmountComponenteAtNode(containerr);
        containerr.remove();
        containerr = null;
     });

     it("renders user data", async () => {
        const fakeUser = {
            name: "joni Baez",
            age: "32",
            adress: "123, Charming avanue"
        };
        jest.spyOn(global, "fetch").mochImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
        );

        //Usar a versão assíncrona de act para aplicar Promises resolvidas
        await act(async () => {
            render(<User id="123" />, containerr);
        });

        expect(containerr.querySelector("summary").textContent)
        .toBe(fakeUser.name);

        expect(containerr.querySelector("strong").textContent)
        .toBe(fakeUser.age);

        expect(containerr.textContent).toContain(fakeUser.adress);

        //remover o mock para garantir que os testes estão completamente isolados
        global.fetch.mockRestore();
     });

     /*Transformando módulos em mock
Alguns módulos podem não funcionar corretamente dentro de um ambiente de testes ou
 podem não ser essenciais para o teste em sí. Transformando eles em mock com dados
  fictícios pode facilitar a escrita dos testes para seu próprio código.

Considere um componente Contact que possui um componente terceiro GoogleMap embutido:*/

// map.js

import React from "react";

import { LoadScript, GoogleMap } from "react-google-mapsl";
export default function Map(props) {
    return (
        <LoadScript id="script-loader"
    googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap id="example-map" center=
    {props.center} />
    </LoadScript>
    );
}

//contact.js

import React from "react";
import Map from "./map";

export default function Contact(props) {
    return (
        <div>
            <adress>
                Contact {props.name} via{" "}
                <a data-testid="email" href={"mailto:" +
            props.email}>
                email
            </a>
            or on their <a data-testid="site" href=
            {props.site}>
                website
            </a>.
            </adress>
            <Map center={props.center} />
        </div>
    );
}

/*Se nós não queremos carregar esse componente nos nossos testes, nós podemos
 transformar a dependência em mock de um componente fictício e executar o teste: */

 // contact.test.js

 import React from "react";
 import { render, unmountComponenteAtNode } from "react-dom";
 import { act } from "react-dom/test-utils";

 import contact from "./contact";
 import MockedMap from "./map";

 jest.mock("./map", () => {
    return function DummyMap(props) {
        return (
            <div data-testid="map">
                {props.center.lat}:{props.center.long}
            </div>
        );
    };
 });

 //let container = null;
 beforeEach(() => {
    // configurar o elemento do DOM como o alvo da renderização
    container = document.createElemente("div");
    document.body.appendChild(container);
 });

 afterEach(() => {
    // limpar na saída
    unmountComponentAtNode(container);
    container.remove();
    container = null;
 });

 it("should render contact information", () => {
    const center = { lat: 0, long: 0 };
    act(() => {
        render(
            <Contact
            name="joni Baez"
            email="test@example.com"
            site="http://test.com"
            center={center}
            />,
        );
    });

    expect(
        container.querySelector("[data-testid='email']").getAttribute("href")
    ).toEqual("mailto:test@example.com");

    expect(
        container.querySelector("[data-testid='site']").getAttribute("href")
    ).toEqual("http://test.com");

    expect(
        container.querySelector('[data-testid="map"]').textContent).toEqual("0:0")
 });

 /*Eventos

Nós recomendamos despachar eventos reais de elementos do DOM e então afirmar no seu
 resultado. Considere um componente Toggle: */

 // toggle.js

 import React, { useState } from "react";

 export default function Toggle(props) {
    const [state, setState] = useState(false);
    return (
        <button
        onClick={() => {
            setState(previousState => !previousState);
            props.onChange(!state);
        }}
        data-testid="toggle"
        >
            {state === true ? "Turn off" : "Turn on"}
        </button>
    );
 }

 /*Poderíamos escrever testes para isso: */

 // toggle.test.js

 import React from "react";
 import { render, unmountComponentAtNode } from "react-dom";
 import { act } from "react-dom/test-utils";

 import Toggle from "./toggle";

 //let container = null;
 beforeEach(() => {
    //configurar o elemento do DOM como o alvo da renderização
    container = document.createElement("div");
    document.body.appendChild(container);
 });

 afterEach(() => {
    //limpar na saída
    unmountComponenteAtNode(container);
    container.remove();
    container = null;
 });

 it("changer value when clicked", () => {
    const onChange = jest.fn();
    act(() => {
        render(<Toggle onChange={onChange} />, container);
    });

    //buscar pelo elemento do botão e disparar alguns eventos de click nele
    const button = document.querySelector("[data-testid=toggle]");
    expect(button.innerHTML).toBe("Turn on");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", {
        bubbles: true 
        }));
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(button.innerHTML).toBe("Turn off");

    act(() => {
        for (let i = 0; i < 5; i++) {
            button.dispatchEvent(new MouseEvent("click", {
        bubles: true
            }));
        }
    });

    expect(onChange).toHaveBeenCalledTimes(6);
    expect(button.innerHTML).toBe("Turn on");
 });

 /*Os diferentes eventos do DOM e suas propriedades estão descritas em MDN. Note que
  você precisa passar { bubbles: true } em cada evento que for criado para que ele
   chegue ao React Listener pois o React delega os eventos ao root automaticamente.

Nota:

React Testing Library oferece um auxiliar mais conciso para disparar eventos

Temporizadores
Seu código pode usar funções baseadas em tempo como setTimeout para programar mais
 trabalhos no futuro. Nesse exemplo abaixo, um painel de múltipla escolha espera por
  uma seleção e avança, esgotando o tempo se uma seleção não é feita em 5 segundos: */

  // card.js

  import React, { useEffect } from "react";

  export default function Card(props) {
    useEffect(() => {
        const timeoutID = setTimout(() => {
            props.onSelect(null);
        }, 5000);
        return () => {
            clearTimeout(timeoutID);
        };
    }, [props.onSelect]);

    return [1, 2, 3, 4].map(choice => (
        <button
        key={choice}
        data-testid={choice}
        onClick={() => props.onSelect(choice)}
        >
            {choice}
        </button>
    ));
  }

  /*Nós podemos escrever testes para esse componente usando os mocks de temporizador
   do Jest e testando os diferentes estados que ele pode estar. */

   // card.test.js

   import React from "react";
   import { render, unmountComponenteAtNode } from "react-dom";
   import { act } from "react-dom/test-utils";

   import Card from "./card";

//   let container = null;

    beforeEach(() => {
        //configurar o elemnto do DOM como o alvo da renderização
        container = document.createElement("div");
        document.body.appendChild(container);
        jest.useFakeTimers();
    });

    afterEach(() => {
        //limpar na saída
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.useRealTimers();
    });

    it("should select null after timing out", () => {
        const onSelect = jest.fn();
        act(() => {
            render(<Card onSelect={onSelect} />, container);
        });

        //move ahead in time by 100ms
        act(() => {
            jest.advanceTimersByTime(100);
        });
        expect(onSelect).not.tohaveBeenCalled();

        //and then move ahead by 5 seconds
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        expect(onSelect).tohaveBeenCalledWith(null);
    });

    it("should cleanup on being removed", () => {
        const onSelect = jest.fn();
        act(() => {
            render (<Card onSelect={onSelect} />, container);
        });
        act(()=> {
            jest.advanceTimersByTime(100);
        });
        expect(onSelect).not.toHaveBeenCalled();

        //unmount the app
        act(() => {
            render(null, container);
        });
        act(() => {
            jest.advanceTimbersByTime(5000);
        });
        expect(onSelect).not.toHaveBeenCalled();
    });

    it("should accept selections", () => {
        const onSelect = jest.fn();
        act(() => {
            render(<Card onSelect={onSelect} />, container);
        });

        act(() => {
            container
            .querySelector("[data-testid='2']")
            .dispatchEvent(new MouseEvent("click", {
        bubbles: true
            }));
        });

        expect(onSelect).toHaveBeenCalledWith(2);
    });

    /*Você pode usar os temporizadores fictícios apenas em alguns testes. Acima, nós
     habilitamos eles usando jest.useFakeTimers(). A principal vantagem que eles
      fornecem é que seus testes não precisam esperar os 5 segundos para executar e
       você também não precisa fazer o código ser mais convoluto apenas para o teste.

Testes de Snapshot
Frameworks como o Jest também permitem você salvar “snapshots” de dados com
 toMatchSnapshot / toMatchInlineSnapshot. Com essas funções, nós podemos “salvar” o
  resultado do componente renderizado e garantir que uma mudança nele precisa ser
   explicitamente apontada como uma mudança no snapshot.

Nesse exemplo, nós renderizamos um componente e formatamos o HTML renderizado com o
 pacote pretty, antes de salvá-lo como um inline snapshot. */

 // hello.test.jsx, again

 import React from "react";
 import { render, unmountComponentAtNode } from "react-dom";
 import { act } from "react-dom/test-utils";
 import pretty from "pretty";

 import Hello from "./hello";

 //let container = null;
 beforeEach(() => {
    //configurar o elemento do DOM como o alvo da renderização
    container = document.createElement("div");
    document.body.appendChild(container);
 });
 afterEach(() => {
    //limpar na saída
    unmountComponentAtNode(container);
    container.remove();
    container = null;
 });

 it("should render a greeting", () => {
    act(() => {
        render(<Hello />, container);
    });

    expect(
        pretty(container.innerHTMl)
    ).toMatchInlineSnapshot(); /*... gets filled automatically by jest...*/

    act(() => {
        render(<Hello name="Jenny" />, container);
    });

    expect(
        pretty(container.innerHTML)
    ).toMatchInlineSnapshot(); /*... gets filled automatically by jest ...*/

    act(() => {
        render(<Hello name="Margaret" />, container);
    });

    expect(
        pretty(container.innerHTML)
    ).toMatchInlineSnapshot(); /*... gets filled automatically by jest ...*/
 });

 /*Tipicamente é melhor fazer afirmações mais específicas do que utilizar snapshots.
  Esse tipo de teste inclui detalhes de implementação e portanto podem facilmente
   quebrar. Seletivamente transformar alguns componentes filhos em mock pode reduzir
    o tamanho do snapshot e mantê-los legíveis para o review de código.

Renderizações múltiplas
Em casos raros, você pode estar executando um teste em um componente que utiliza
 múltiplos renderizadores. Por exemplo, você pode estar executando testes de 
 snapshot em um componente com react-test-renderer, que internamente usa
  ReactDOM.render dentro de um componente filho para renderizar algum conteúdo. Nesse
   cenário, você pode encapsular as atualizações com o respectivo act() dos seus
    renderizadores. */

    import { act as domAct } from "react-dom/test-utils";
    import { act as testAct, create } from "react-test-renderer";
    //...
    let root;
    domAct(() => {
        testAct(() => {
            root = create(<App />);
        });
    });
    expect(root).toMatchSnapshot();
 