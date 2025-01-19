import { useEffect, useState } from 'react'
import classes from "./TasksBar.module.css"
import { TaskType, TaskStatus } from '../../types'
import Task from '../Task/Task';



const TasksBar = () => {

    const [tasks, setTasks] = useState<TaskType[]>([]);


    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(tasks);
    }, []);


    const addTask = (newTask: TaskType) => {

        let maxId = 0
        if (tasks.length > 0) {
            const tasksIds: number[] = tasks.map(task => task.taskId)
            maxId = Math.max(...tasksIds);
        }

        const newTaskWithId = { ...newTask, taskId: maxId + 1 };

        const updatedTasks = [...tasks, newTaskWithId];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const updateTask = (updatedTask: TaskType) => {
        const updatedTasks = tasks.map((t) =>
            t.taskId === updatedTask.taskId ? updatedTask : t
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <div className={classes.tasksBar}>
            <h1 className={classes.h1}>
                Manage your notes
            </h1>
            <hr
                className={classes.hr}
            />
            <div className={classes.taskContainer}>
                <Task mode={TaskStatus.NEW} onAddTask={addTask} />

                {tasks.map((task) => (
                    <Task
                        key={task.taskId}
                        mode={TaskStatus.DISPLAY}
                        task={task}
                        onUpdateTask={updateTask}
                    />
                ))}




            </div>
        </div>
    )
}

export default TasksBar