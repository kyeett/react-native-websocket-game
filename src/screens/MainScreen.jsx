import React, {useReducer, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WebsocketComponent from "../components/websocket";
import Example from "../components/Example";
import _ from 'underscore'
import _c from 'underscore-contrib'
import {colors} from "../common/colors";

const reducer = (state, action) => {
    console.log('update_color', action)
    switch (action?.type) {
        case 'client_connected':
            console.log('yeah client connected!')
            state.client_id = action.client_id
            return state
        case 'game_created':
            console.log('game created!', action)
            state.games.push({id: action.id})
            return state
        case 'update_color':
            let grid = [...state.grid]
            grid[action.index] = {code: action.color}
            return {...state, grid: grid}
        default:
            return state
    }
}

const newGrid = () => {
    const width = 8
    const height = 8
    return _c.repeat(width * height, {code: '#34495e'})
}

export const MainScreen = () => {
    const [feed, sendMessage] = useWebsocket()
    // feed,
    // https://rxjs.dev/guide/overview
    // https://rxjs.dev/api/webSocket/webSocket

    const player = usePlayer()
    // player.changeName
    const game = useGame()
    // game.grid
    // game.score
    // game.currentPlayer
    // game.reset()
    // game.performActionPressed
    // game.changeColor
    // game.upgradeTile
    // game.changeColor(player.ID, player.color)

    // Q: set up subscriptions (like in AWS Amplify demo?)
    // Q: How to handle websocket connection?
    // Q: How to pass information from child component? (Websocket component)
    // Q: use multiple useState/useReducer?
    // Q: TESTER?? HUR TESTAR MAN? MOCK?
    const [websocket, setWebsocket] = useState(null);
    const [state, dispatch] = useReducer(reducer, {color: _.sample(colors), grid: newGrid()});

    try {
        const result = await fetch('www.google.com')
        dispatch({type: 'fetch_complete', payload: result})
    } catch (e) {
        dispatch({type: 'fetch_error', payload: e})
    }


    const localAddr = "192.168.86.23:8080"
    const addMessage = (message) => {
        try {
            let data = JSON.parse(message.data)
            dispatch(data)
        } catch (e) {
            console.log('error', e)
        }
    }

    const sendMessage = (data) => {
        console.log('yeah!')
        websocket?.send(data)
    }

    let youAreText = `You
    
are

${state.color.name}
`
    for (let i = 0; i < 10; i++) {
        Math.random();
    }

    const handlePress = (index) => {
        sendMessage(JSON.stringify({type: 'update_color', index: index, color: state.color.code}))
        // dispatch({type: 'update_color', index: index, color: state.color})
    };

    return (
        <View style={styles.container}>
            <WebsocketComponent
                url={`ws://${localAddr}/ws`}
                onError={(error) => console.log(error)}
                onMessage={addMessage}
                setWebsocket={setWebsocket}
            />
            <View style={[styles.you, {backgroundColor: state.color.code}]}>
                <Text style={styles.youText}>{youAreText}</Text>
                <Text>{state.grid[0].code}</Text>
                <Text>{state.color.code}</Text>
            </View>
            <Example grid={state.grid} onPress={handlePress}/>
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
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    youText: {
        textAlign: 'center',
        fontWeight: 'bold',
    }

});
