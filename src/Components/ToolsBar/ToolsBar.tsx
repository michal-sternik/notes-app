import React, { useEffect } from 'react'

import classes from "./ToolsBar.module.css"
import ProposedColor from '../ProposedColor/ProposedColor'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../Redux/store'
import { changeColor } from '../../Redux/colorSlice'

const ToolsBar = () => {

    //some example colors
    const proposedColors: string[] = ['#ff9063', '#f0d075', '#0dccfb', '#be8dff', '#daf383']

    const selectedColor = useSelector((state: RootState) => state.color.selectedColor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!selectedColor) {
            //first from list
            dispatch(changeColor(proposedColors[0]));
        }
    }, []);

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