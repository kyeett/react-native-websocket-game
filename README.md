

## Questions
* Is it OK to pass variables to the hook (url for websockets, ...)?
* UI libraries? material-ui, kitten, ...
* How do you test hooks properly?
* Overall event handler?

```
    useEffect(() => {
        const subscription = webSocket(url);
        // TODO: How do you do this?
        setStatus(STATUS_CONNECTED)
        subscription.subscribe(
            {
                next: handleMessage,
                error: err => setStatus(STATUS_ERROR),
                complete: () => setStatus(STATUS_DISCONNECTED)
            }
        );
        setSubject(subscription)

        return () => {
            subscription.unsubscribe()
            // ComponentWillUnmount
        };
    }, []);

```

* useContext, när?

## Lessons learnt
* https://docs.nestjs.com
* https://www.apollographql.com/
