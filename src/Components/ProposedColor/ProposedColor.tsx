import { ProposedColorProps } from "../../types"
import classes from "./ProposedColor.module.css"


const ProposedColor = ({ active, color, changeSelectedColor }: ProposedColorProps) => {
    return (
        <div
            className={`${classes.colorItem} ${active ? classes.colorItemActive : ""} `}
            style={{ backgroundColor: color }}
            onClick={() => changeSelectedColor(color)}
        />
    )
}

export default ProposedColor