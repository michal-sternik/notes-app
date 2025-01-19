import ToolsBar from '../Components/ToolsBar/ToolsBar'
import TasksBar from '../Components/TasksBar/TasksBar'
import classes from "./RootLayout.module.css"



const RootLayout = () => {
    return (
        <div className={classes.rootLayoutDesign}>
            <ToolsBar />
            <TasksBar />
        </div>
    )
}

export default RootLayout