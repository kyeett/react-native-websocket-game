import _c from 'underscore-contrib'
import {useReducer} from "react";

const newGrid = () => {
    const width = 8
    const height = 8
    return _c.repeat(width * height, {code: '#34495e'})
}

const reducer = (state, action) => {
    console.log('EVENT!!', action)
    switch (action?.type) {
        case 'client_connected':
            console.log('yeah client connected!')
            state.client_id = action.client_id
            return state
        case 'update_color':
            let grid = [...state.grid]
            grid[action.index] = {code: action.color}
            return {...state, grid: grid}
        default:
            return state
    }
}

export const useGame = () => {
    const [state, dispatch] = useReducer(reducer, {grid: newGrid()});



    return {
        grid: state.grid,
        onGridPressed: (index) => console.log('pressed', index),
        handleMessage: dispatch
    }
}
