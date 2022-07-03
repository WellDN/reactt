class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.input = React.createRef();
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.input.current.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" ref={this.input} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  } //este código aceita um único nome em um componente não controlado

  /*Como um componente não controlado mantém a fonte de verdade no DOM, às vezes é mais
   fácil integrar código React e não React ao usar componentes não controlados. Também
    pode conter menos código se você quiser fazer gambiarra. Caso contrário, você
     geralmente deve usar componentes controlados.

Se ainda não estiver claro qual tipo de componente você deve usar para uma situação
 específica, você pode achar útil este artigo sobre inputs controlados e não
  controlados.

Valores padrão
No ciclo de vida de renderização do React, o atributo value nos elementos de formulário
 substituirá o valor no DOM. Com um componente não controlado, você geralmente deseja
  que o React especifique o valor inicial, mas que deixa as atualizações subsequentes
   não controladas. Para lidar com esse tipo de caso, você pode especificar o atributo
    defaultValue em vez de value. Alterar o valor do atributo defaultValue após a
     montagem de um componente não causará nenhuma atualização do valor no DOM. */

 //    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                defaultValue="Bob"
                type="text"
                ref={this.input} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
 //     }

      /*Da mesma forma, <input type="checkbox"> e <input type="radio"> suporta
       defaultChecked, e <select> e <textarea> suporta defaultValue.

A Tag de input de arquivo
Em HTML, um <input type="file"> permite que o usuário escolha um ou mais arquivos
 do armazenamento do dispositivo para serem carregados em um servidor ou manipulados
  por JavaScript por meio da API de arquivos. */

  <input type="file" />

  /*No React, um <input type="file" /> é sempre um componente não controlado porque
   seu valor só pode ser definido por um usuário e não programaticamente

Você deve usar a API de arquivos para interagir com os arquivos. O exemplo a seguir
 mostra como criar um ref no nó DOM para acessar arquivo(s) em um manipulador de envio.
  */

 class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
    }
    handleSubmit(event) {
      event.preventDefault();
      alert(
        `Selected file - ${this.fileInput.current.files[0].name}`
      );
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input type="file" ref={this.fileInput} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      );
    }
  }
  
  ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
  );

  /* */