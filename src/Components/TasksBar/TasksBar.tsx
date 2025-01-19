import classes from "./TasksBar.module.css"
import { TaskStatus } from '../../types'
import Task from '../Task/Task';
import { useTasks } from '../../hooks/useTasks';
import { Chip } from "@mui/material";



const TasksBar = () => {

    const { tasks, addTask, updateTask, deleteTask, generateRandomTasks } = useTasks();


    return (
        <div className={classes.tasksBar}>
            <div className={classes.tasksTitleAndRandomTasksButtonBar}>
                <h1 className={classes.h1}>
                    Manage your notes
                </h1>
                <Chip
                    label="Generate example tasks"
                    variant="filled"
                    onClick={generateRandomTasks}
                    sx={{
                        backgroundColor: 'pink',
                        height: 'auto',
                        minHeight: '30px',
                        '& .MuiChip-label': {
                            // display: 'block',
                            whiteSpace: 'normal',
                        },
                    }} />
            </div>
            <hr
                className={classes.hr}
            />
            <div className={classes.taskContainer}>
                <Task modeStatus={TaskStatus.NEW} onAddTask={addTask} />

                {tasks.map((task) => (
                    <Task
                        key={task.taskId}
                        modeStatus={TaskStatus.DISPLAY}
                        task={task}
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
                    />
                ))}




            </div>
        </div>
    )
}

export default TasksBar