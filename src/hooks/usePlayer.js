import _ from 'underscore'
import {colors} from "../common/colors";
import {useState} from "react";

export const usePlayer = () => {
    const [color, setColor] = useState(_.sample(colors));

    return {
        name: color.name,
        color: color.code,
    }
}
