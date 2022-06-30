render() //{
    return (
      <React.Fragment>
        <ChildA />
        <ChildB />
        <ChildC />
      </React.Fragment>
    );
  //}      //shorter syntax '<>'

  /*Motivação
Um padrão comum é para um componente retornar uma lista de filhos. Considerando
 o código React a seguir: */

 class Table extends React.Component {
    render() {
      return (
        <table>
          <tr>
            <Columns />
          </tr>
        </table>
      );
    }
  }

  /*<Columns /> precisaria retornar múltiplos elementos <td> para que o HTML
   renderizado fosse válido. Se um div pai for usado dentro do render() de
    <Columns />, então o HTML resultante será inválido. */

    class Columns extends React.Component {
        render() {
          return (
            <div>
              <td>Hello</td>
              <td>World</td>
            </div>
          );
        }
      }

      // Resulta na seguinte  <Table />:

      <table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>

//Os Fragmentos resolvem este problema.

//Uso

class Columns extends React.Component {
    render() {
      return (
        <React.Fragment>
          <td>Hello</td>
          <td>World</td>
        </React.Fragment>
      );
    }
  }

  //que resulta em uma <Table /> correta:

  <table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>

/*Sintaxe curta
Existe uma sintaxe nova e mais curta que você pode usar para declarar fragmentos.
 Parecem tags vazias: */

 class Columns extends React.Component {
    render() {
      return (
        <>
          <td>Hello</td>
          <td>World</td>
        </>
      );
    }
  }

  /*Você pode usar <></> da mesma forma que você usaria qualquer outro elemento,
   exceto que ele não suporta chaves ou atributos.
   
   Fragmentos com chaves

Fragmentos declarados com <React.Fragment> podem ter chaves. Um caso de uso para isso
 é mapear uma coleção para um array de fragmentos - por exemplo, para criar uma lista
  de descrição:*/

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Sem a `key`, React irá disparar um aviso
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

/*key é o único atributo que pode ser passado para o Fragment. */