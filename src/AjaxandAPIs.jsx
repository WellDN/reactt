const { useEffect } = require("react");

{
    "items"/*:*/ [
        { "id": 1, "name": "Apples", "price": "$2l" },
        { "id": 2, "name" : "Peaches", "price": "$5"} //A API de exemplo retorna um objeto JSON.
    ]
}

    class myComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isLoaded: false,
                items: []
            };
        }

        componentDidMount() {
            fetch("https://api.example.com/items")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                //Nota: É importante lidar com os erros aqui
                // em vez de um bloco catch() para não recebermos
                //exceção de erros dos componentes.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }

        render() {
            const { error, isLoaded, items} = this.state;
            if (error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else {
                return (
                    <ul>
                        {items.map(item => (
                            <li key ={item.id}>
                                {item.name} {item.price}
                            </li>
                        ))}
                    </ul>
                );
            }
        }
    }

    /*Aqui está o equivalente com Hooks: */

    function MyComponent() {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState ([]);

        //Nota: O array [] deps vazio significa
        //este useEffect será executado uma vez
        //semelhante ao componentDidMount()
        useEffect(() => {
            fetch("https://api.example.com/items")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                //Nota: é importante lidar com erros aqui
                //em vez de um bloco catch() para não receber
                //exceções de erros reais nos componentes.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [])

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key ={item.id}>
                            {item.name} {item.price}
                        </li>
                    ))}
                </ul>
            );
        }
    }