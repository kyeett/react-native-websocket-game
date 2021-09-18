import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Example from "../components/Example";
import {useWebsocket} from "../hooks/useWebsocket";
import {useGame} from "../hooks/useGame";
import {usePlayer} from "../hooks/usePlayer";

// const localAddr = "ws://192.168.86.23:8080/ws"
// const localAddr = "ws://localhost:4060/game.Websocket"
const localAddr = "wss://home-y9si.encoreapi.com/prod/game.Websocket"

export const MainScreen = () => {
    const game = useGame()
    const player = usePlayer()
    const [status, sendMessage] = useWebsocket(localAddr, game.handleMessage)
    const onGridPressed = (index) => sendMessage({type:'update_color', index:index, color: player.color})

    return (
        <View style={styles.container}>
            <View style={[styles.you, {backgroundColor: player.color}]}>
                <Text style={styles.youText}>You{"\n\n"}are{"\n"}</Text>
                <Text style={styles.youText}>{status}</Text>
            </View>
            <Example grid={game.grid} onPress={onGridPressed}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    you: {
        width: 140,
        height: 140,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    youText: {
        textAlign: 'center',
        fontWeight: 'bold',
    }

});
