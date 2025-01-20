import { useEffect } from 'react'

import classes from "./ToolsBar.module.css"
import ProposedColor from '../ProposedColor/ProposedColor'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../Redux/store'
import { changeColor } from '../../Redux/colorSlice'

const ToolsBar = () => {

    //some example colors
    const proposedColors = useSelector((state: RootState) => state.color.proposedColors);

    const selectedColor = useSelector((state: RootState) => state.color.selectedColor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!selectedColor) {
            //first from list
            dispatch(changeColor(proposedColors[0]));
        }
    });

    const changeSelectedColor = (color: string) => {
        dispatch(changeColor(color));
    };

    return (
        <div className={classes.toolsBar}>
            {proposedColors.map((color, idx) => {
                return <ProposedColor
                    key={idx}
                    active={color === selectedColor}
                    color={color}
                    changeSelectedColor={changeSelectedColor}
                />
            })}
        </div>
    )
}

export default ToolsBar