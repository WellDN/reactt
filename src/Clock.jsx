export function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);

//export default Clock

  //componente clock está sendo reutilizado e encapsulado. ele irá configurar seu próprio temporazidor e se
  //atualizar a cada segundo.