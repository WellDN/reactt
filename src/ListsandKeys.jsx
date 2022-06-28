const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

/*this code prints [2, 4, 6, 8, 10] in the console.

in the react, transform array in lists of elements its pretty much
the same.*/

/*Rendering Multiples Components: it can create elements collections
and add in JSX using {}.

Below, it interate for the array numbers using function map() in JS.
ill return one elements <li> to each item. finally, attributes the 
elements array resultly to listItems:*/

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

/*added all array listItems inside of one element <ul> and rendered
them in the DOM.*/

ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root') //this code shows a non ondorened list of numbers
  );
/*
Component of Basic List

generally youll render lists inside an component.

It can refactor the example  before in one component that accept a array of
numbers and return a list of elements.*/

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );

 /*add a key to the items in the list inside number.map() and solve
 the key value that are missing. */

 function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
/*
Keys: the keys helps React to indeifty wich items changed, removed
or added. the keys should be attribuited to the elements inside the
array to give one identity stable to the elements:*/

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);

/*the better way to choose one key its use a string that indetify
only one item in the item list beetwen the others. in the majority you
would use IDs of your data as key:*/

const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

/*when you have none ID stable to the rendered items, you can use index
of the item as key as the last resource: */

const todoItems = todos.map((todo, index) =>
  // Apenas faça isso caso os itens não possuam IDs estáveis
  <li key={index}>
    {todo.text}
  </li>
);

/*not recommended use index to key the performance get worse use index only if its the only way 

Extracting Components with Keys

the keys only make sense when the array context are encapsulating the
items. For example, if you extract the component ListItem, you have to
let key in the elements <ListItem /> instead of let the element <li>
inside the ListItem.
Example: Incurrectly Keys use*/

function ListItem(props) {
    const value = props.value;
    return (
      // Errado! Não há necessidade de definir a chave aqui:
      <li key={value.toString()}>
        {value}
      </li>
    );
  }
  
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      // Errado! A chave deveria ser definida aqui:
      <ListItem value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );


  //Example: Currenctly Key use 


  function ListItem(props) {
    // Correto! Não há necessidade de definir a chave aqui:
    return <li>{props.value}</li>;
  }
  
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      // Correto! A chave deve ser definida dentro do array.
      <ListItem key={number.toString()} value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );

  /*Por via de regra, os elementos dentro der uma função() devem 
  especificar chaves.
  
  Keys Have be Unic only in between Brothers Elements. but they dont need
  to be the only ones globally it can be use the same keys to create
  two different arrays:*/

  function Blog(props) {
    const sidebar = (
      <ul>
        {props.posts.map((post) =>
          <li key={post.id}>
            {post.title}
          </li>
        )}
      </ul>
    );
    const content = props.posts.map((post) =>
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );
    return (
      <div>
        {sidebar}
        <hr />
        {content}
      </div>
    );
  }
  
  const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];
  ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
  );

  /*
  As chaves servem como uma dica para o React. Mas elas não são passadas para os
   componentes. Se você precisar do mesmo valor em um componente, defina ele explicitamente
    como uma prop com um nome diferente:
 */
    const content = posts.map((post) =>
    <Post
      key={post.id}
      id={post.id}
      title={post.title} />
  );

  /*No exemplo acima, o componente Post pode acessar props.id. Mas, não pode acessar props.key.

Incluindo map() no JSX
Nos exemplos acima declaramos uma variável listItems separada e adicionamos ela no JSX:

Including map() in jsx

in the examples above we declared one variable listItems separed and added in the JSX:*/

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <ListItem key={number.toString()}
                value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  /*the JSX allows include any expression inside the keys, so it can add an result to
  map() directly:*/

  function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()}
                    value={number} />
        )}
      </ul>
    );
  }
  /*someti0mes this results in the code cleaner. but this pattern too can be confused.
  Like in JavaScript, depends if you decide if its worth extract a variable to increase
  lengibility. Remember that if a function map() body have a lot of lvl's, it can be
  good moment to extract a component. */