export const usePlayers = () => {
    const [counter, setCounter] = useState(0);

    const setColor = (color) => {
    }

    const fetchPlayer = () => {
    }

    useEffect(() => {
        // componetDidMount
        setCounter((state) => state + 1)

        fetch('hej').then((result) => {

        }).catch((e) => {}).finally(() => {})
        (async () => {
            try {
                const result = await fetch('hej')
            } catch(e) {

            } finally {

            }

        })()
        return () => {
            // componentWillUnmount
        };
    }, []);


    return {
        setColor: setColor,
        counter: counter,
    }
}
