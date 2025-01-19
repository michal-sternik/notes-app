import { useEffect, useState } from 'react'
import classes from "./Task.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { Box, Divider, IconButton, SxProps, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import { TaskProps, TaskStatus, TaskType } from '../../types'
import { formatDate } from '../../utils'



const Task = ({ mode: initialMode, task, onAddTask, onUpdateTask }: TaskProps) => {

    const selectedColor = useSelector((state: RootState) => state.color.selectedColor);
    const newTaskColor = task?.color || selectedColor;
    const [currentDate, setCurrentDate] = useState<string>(task?.addedDate ? formatDate(new Date(task!.addedDate)) : "");
    const [title, setTitle] = useState<string>(task?.title ? task!.title : "");
    const [description, setDescription] = useState<string>(task?.description ? task!.description : "");
    const [titleEmpty, setTitleEmpty] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    const [mode, setMode] = useState<TaskStatus>(initialMode);


    useEffect(() => {
        if (mode === TaskStatus.NEW) {
            const updateDate = () => {
                const now = new Date();
                const formattedDate = formatDate(now)
                setCurrentDate(formattedDate);
            };

            updateDate();
            const interval = setInterval(updateDate, 1000);

            //cleanup function
            return () => clearInterval(interval);
        }
    }, []);


    const handleAddTask = () => {
        if (title.trim() === "" || description.trim() === "") {
            return
        }
        else {


            const newTask: TaskType = {
                taskId: -1,
                title: title.trim(),
                description: description.trim(),
                addedDate: new Date(),
                color: newTaskColor
            };

            if (onAddTask) onAddTask(newTask);

            setTitle("")
            setDescription("")
        }
    }
    const handleClearInput = () => {
        setTitle("")
        setDescription("")
    }

    const handleEdit = () => {
        setMode(TaskStatus.EDIT);
    };

    const handleSave = () => {
        if (title.trim() === "" || description.trim() === "") {
            return
        }

        if (task) {
            const updatedTask = {
                ...task,
                title: title.trim(),
                description: description.trim(),
            };
            if (onUpdateTask) onUpdateTask(updatedTask);
        }

        setMode(TaskStatus.DISPLAY);
    };

    const handleCancel = () => {
        setTitle(task!.title);
        setDescription(task!.description);

    };

    const iconButtonStyle: SxProps =
    {
        backgroundColor: 'grey',
        color: 'white',
        '&:hover': {
            backgroundColor: 'black',
        },
        borderRadius: '50%',

    }

    if (mode === TaskStatus.DISPLAY && task) {
        return (
            <div
                className={classes.displayTask}
                style={{ backgroundColor: task.color }}

            >

                <Typography>{task.title}</Typography>
                <Divider variant="middle" />

                <Box
                    sx={{
                        maxHeight: '150px',
                        overflow: 'auto',
                        width: '100%',
                        padding: '8px',
                        overflowWrap: 'anywhere',

                    }}
                >
                    <Typography variant="body1" color="textSecondary">
                        {task.description}
                    </Typography>
                </Box>

                <div className={classes.displayTaskFooter}>
                    <Typography variant="caption" display="block" gutterBottom>
                        {formatDate(new Date(task.addedDate))}
                    </Typography>
                    <div className={classes.taskFooterButtons}>
                        <IconButton
                            aria-label="delete"
                            sx={iconButtonStyle}
                            onClick={() => handleClearInput()}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            aria-label="edit"
                            sx={iconButtonStyle}
                            // type='submit'
                            onClick={() => handleEdit()}
                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={classes.newTask}
            style={{ backgroundColor: newTaskColor }}

        >

            <TextField
                id="standard-basic"
                label="Title"
                variant="standard"
                placeholder="Cook vegetables..."
                required
                value={title}
                error={titleEmpty}
                helperText={
                    titleEmpty ? "Title cannot be empty." : ""
                }
                onChange={(e) => {
                    setTitle(e.target.value)
                    //validation
                    if (e.target.value.trim() === "") {
                        setTitleEmpty(true)
                    }
                    else {
                        setTitleEmpty(false)
                    }

                }}
            />

            <TextField
                id="standard-textarea"
                label="Description"
                placeholder="Peel carrot, onion..."
                multiline
                variant="standard"
                rows={3}
                required
                value={description}
                error={descriptionEmpty}
                helperText={
                    descriptionEmpty ? "Description cannot be empty." : ""
                }
                onChange={(e) => {
                    setDescription(e.target.value)
                    //validation
                    if (e.target.value.trim() === "") {
                        setDescriptionEmpty(true)
                    }
                    else {
                        setDescriptionEmpty(false)
                    }
                }}
            />

            <div className={classes.newTaskFooter}>
                <Typography variant="caption" display="block" gutterBottom>
                    {currentDate}
                </Typography>
                <div className={classes.taskFooterButtons}>
                    <IconButton
                        aria-label="delete"
                        sx={iconButtonStyle}
                        onClick={() =>
                            mode === TaskStatus.EDIT ?
                                handleCancel()
                                :
                                handleClearInput()
                        }
                    >
                        {mode === TaskStatus.EDIT ? <UndoIcon /> : <DeleteIcon />}
                    </IconButton>
                    <IconButton
                        aria-label="add"
                        sx={iconButtonStyle}

                        onClick={() => mode === TaskStatus.EDIT ?
                            handleSave()
                            :
                            handleAddTask()}
                    >
                        {mode === TaskStatus.EDIT ? <CheckIcon /> : <AddIcon />}
                    </IconButton>
                </div>
            </div>
        </div>

    )
}
export default Task