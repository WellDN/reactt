class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);

export default Clock

  //componente clock está sendo reutilizado e encapsulado. ele irá configurar seu próprio temporazidor e se
  //atualizar a cada segundo.