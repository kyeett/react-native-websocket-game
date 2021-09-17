import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';

const WebsocketComponent = ({onMessage, onError, url, setWebsocket}) => {
    const [ws, setWs] = useState(null);

    const onOpen = () => {
        console.log('open')
    }
    const onClose = () => {
        console.log('close')
    }

    let reconnect = false

    const handleWebSocketSetup = () => {
        const ws = new WebSocket(url)

        ws.onopen = () => {
            onOpen && onOpen()
            setWebsocket(ws)
        }
        ws.onmessage = (event) => {
            onMessage && onMessage(event)
        }
        ws.onerror = (error) => {
            onError && onError(error)
        }
        ws.onclose = () => reconnect ? handleWebSocketSetup() : (onClose && onClose())
        setWs(ws)
    }

    useEffect(() => {
        handleWebSocketSetup()
        // Anything in here is fired on component mount.
        return () => {
            ws?.close()
        }
    }, [])

    return (
        <View></View>
    );
};

const styles = StyleSheet.create({})

export default WebsocketComponent;
