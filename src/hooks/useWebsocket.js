import {webSocket} from "rxjs/webSocket";
import {useEffect, useState} from "react";

const STATUS_CONNECTING = "CONNECTING"
const STATUS_CONNECTED = "CONNECTED"
const STATUS_ERROR = "ERROR"
const STATUS_DISCONNECTED = "DISCONNECTED"

export const useWebsocket = (url, handleMessage) => {
    const [status, setStatus] = useState(STATUS_CONNECTING);
    const [subject, setSubject] = useState(null);

    useEffect(() => {
        const subscription = webSocket(url);
        // TODO: How do you do this?
        setStatus(STATUS_CONNECTED)
        console.log('connected!')
        subscription.subscribe(
            {
                next: handleMessage,
                error: err => {
                    console.log('error', err)
                    setStatus(STATUS_ERROR)
                },
                complete: () => setStatus(STATUS_DISCONNECTED)
            }
        );
        setSubject(subscription)

        return () => {
            subscription.unsubscribe()
        };
    }, []);


    return [status, (message) => {
        console.log('send!', message)
        subject?.next(message)
    }]
}
