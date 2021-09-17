import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useKeyboard} from '@react-native-community/hooks'


const ChatInput = ({onSubmit}) => {
    const [text, setText] = useState("");
    const [showExtras, setShowExtras] = useState(true);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="your message"
                value={text}
                onChangeText={setText}
            />
            {text === "" ?
                <AntDesign style={styles.more} name="pluscircleo"/> :
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        padding: 5,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white',
    },
    more: {
        color: 'black',
        fontSize: 24,
        marginLeft: 5,
        marginRight: 5,
    },
    extras: {}
})

export default ChatInput;
