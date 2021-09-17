import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

export default function Example({grid, onPress}) {
    return (
        <FlatGrid
            itemDimension={30}
            data={grid}
            style={styles.gridView}
            staticDimension={300}
            spacing={5}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => onPress(index)}>
                    <View style={[styles.itemContainer, {backgroundColor: item.code}]}>
                        {/*<Text style={styles.itemCode}>{index}</Text>*/}
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 0,
        height: 30,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
