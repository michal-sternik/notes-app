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
import { formatDate, validateNoteField } from '../../utils'



const Task = ({ modeStatus, task, onAddTask, onUpdateTask, onDeleteTask }: TaskProps) => {

    const selectedColor = useSelector((state: RootState) => state.color.selectedColor);
    const newTaskColor = task?.color || selectedColor;

    const [currentDate, setCurrentDate] = useState<string>(task?.addedDate ? formatDate(new Date(task!.addedDate)) : "");

    const [title, setTitle] = useState<string>(task?.title ? task!.title : "");
    const [description, setDescription] = useState<string>(task?.description ? task!.description : "");
    const [titleEmpty, setTitleEmpty] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);

    const [mode, setMode] = useState<TaskStatus>(modeStatus);

    const [deleteClicked, setDeleteClicked] = useState(false);



    //current date and time while creating new task
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
    });


    const handleAddTask = () => {
        if (validateNoteField(title) || validateNoteField(description)) return;

        const newTask: TaskType = {
            taskId: -1, //placeholder, will be replaced in onAddTask function after maxId calculation
            title: title.trim(),
            description: description.trim(),
            addedDate: new Date(),
            color: newTaskColor
        };

        onAddTask!(newTask);

        setTitle("")
        setDescription("")

    }

    const handleSave = () => {
        if (validateNoteField(title) || validateNoteField(description)) return;


        //task is not undefined, because we're in EDIT mode, so after the validation
        //there exists for sure task object with all props needed
        const updatedTask = {
            ...task!,
            title: title.trim(),
            description: description.trim(),
        };
        onUpdateTask!(updatedTask);


        setMode(TaskStatus.DISPLAY);
    };

    const handleClearInput = () => {
        setTitle("")
        setDescription("")
    }

    const handleEdit = () => {
        setMode(TaskStatus.EDIT);
    };


    const handleCancel = () => {
        setTitle(task!.title);
        setDescription(task!.description);

    };

    //delete animation
    const fadeOut = (cb: () => void) => {
        setDeleteClicked(true)
        setTimeout(() => cb(), 300);
    }
    const handleDelete = () => {
        onDeleteTask!(task!.taskId);
        setDeleteClicked(true)
    };



    const renderIconButton = (IconComponent: React.ElementType, onClick: () => void, label: string) => {

        const iconButtonStyle: SxProps =
        {
            color: "rgb(243, 136, 175)",
            backgroundColor: "white",


            "&:hover": {
                color: "white",
                backgroundColor: "rgb(230, 120, 160)",
            },
            borderRadius: '50%',

        }

        return (
            <IconButton
                aria-label={label}
                sx={iconButtonStyle}
                onClick={onClick}
            >
                <IconComponent />
            </IconButton>
        )
    };


    return (
        <div
            className={
                classes.task
            }
            style={{
                backgroundColor: mode === TaskStatus.DISPLAY && task ? task.color : newTaskColor,
                opacity: deleteClicked ? 0 : 1, transition: 'opacity 0.3s ease-out',
            }}
        >

            {mode === TaskStatus.DISPLAY && task ? (
                // display task mode
                <>
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
                </>
                // new task/edit mode
            ) : (
                <>

                    <TextField
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        placeholder="Cook vegetables..."
                        required
                        value={title}
                        error={titleEmpty}
                        helperText={titleEmpty ? "Title cannot be empty." : ""}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setTitleEmpty(e.target.value.trim() === "");
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
                        helperText={descriptionEmpty ? "Description cannot be empty." : ""}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setDescriptionEmpty(e.target.value.trim() === "");
                        }}
                    />
                </>
            )}

            {/* footer for every TaskStatus is the same, different buttons */}
            <div
                className={
                    classes.taskFooter
                }
            >
                <Typography variant="caption" display="block" gutterBottom>
                    {mode === TaskStatus.DISPLAY && task
                        ? formatDate(new Date(task.addedDate))
                        : currentDate}
                </Typography>
                <div className={classes.taskFooterButtons}>
                    {mode === TaskStatus.DISPLAY && task ? (
                        // display mode
                        <>
                            {renderIconButton(DeleteIcon, () => fadeOut(() => handleDelete()), "delete")}
                            {renderIconButton(EditIcon, handleEdit, "edit")}
                        </>
                    ) : (
                        <>
                            {renderIconButton(
                                //new mode/edit mode
                                mode === TaskStatus.EDIT ? UndoIcon : DeleteIcon,
                                () =>
                                    mode === TaskStatus.EDIT
                                        ? handleCancel()
                                        : handleClearInput(),
                                mode === TaskStatus.EDIT ? "cancel" : "delete"
                            )}
                            {renderIconButton(
                                mode === TaskStatus.EDIT ? CheckIcon : AddIcon,
                                () =>
                                    mode === TaskStatus.EDIT
                                        ? handleSave()
                                        : handleAddTask(),
                                mode === TaskStatus.EDIT ? "save" : "add"
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );

}
export default Task