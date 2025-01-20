import classes from "./TasksBar.module.css"
import { SortTypeEnum, TaskStatus, TaskType } from '../../types'
import Task from '../Task/Task';
import useTasks from '../../hooks/useTasks';
import useTaskSorting from "../../hooks/useTaskSorting";
import usePagination from "../../hooks/usePagination";
import useTaskFiltering from "../../hooks/useTaskFiltering";
import { Chip, CircularProgress, Pagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { chipStyle, toggleButtonStyle } from './TaskBarMuiStyle';
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useState } from "react";



const TasksBar = () => {

    const MAX_ITEMS_PER_PAGE = 9;

    const { tasks, addTask, updateTask, deleteTask, generateRandomTasks } = useTasks();

    const { sortBy, handleSort, sortedTasks } = useTaskSorting(tasks);
    const { page, setPage, pagesCount, handlePageChange, paginatedTasks } = usePagination(sortedTasks(), MAX_ITEMS_PER_PAGE);
    const { filterOption, handleFilterChange } = useTaskFiltering(setPage);
    const [isLoading, setIsLoading] = useState(false);

    const showLoadingState = async (fn: () => Promise<void>) => {
        setIsLoading(true);
        try {
            await fn();
        } finally {
            setIsLoading(false);
        }
    };

    const getSortIcon = (sortType: SortTypeEnum) => {
        if (!sortBy || sortBy.type !== sortType) return undefined;
        return sortBy.ascending ? (
            <ArrowUpward sx={{ fill: 'white', }} />
        ) : (
            <ArrowDownward sx={{ fill: 'white', }} />
        );
    };

    return (
        <div className={classes.tasksBar}>
            <div className={classes.tasksTitleAndRandomTasksButtonBar}>
                <h1 className={classes.h1}>
                    Manage your notes
                </h1>
                <Chip
                    label={isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : "Generate example tasks"}
                    variant="filled"
                    onClick={() => showLoadingState(generateRandomTasks)}
                    sx={{
                        backgroundColor: 'rgb(243, 136, 175);',
                        color: 'white',
                        height: 'auto',
                        minHeight: '30px',
                        '& .MuiChip-label': {
                            // display: 'block',
                            whiteSpace: 'normal',
                        },
                        '&:hover': {
                            backgroundColor: 'rgb(230, 120, 160)', // Lekko ciemniejszy kolor tła na hover
                        },
                    }} />
            </div>

            <div className={classes.tasksSortingAndFiltering}>
                <p className={classes.p}> Sort by: </p>
                <div className={classes.tasksSortingAndFilteringButtons}>
                    <Chip
                        onClick={() => handleSort(SortTypeEnum.TITLE)}
                        size="small"
                        label={`Title`}
                        icon={getSortIcon(SortTypeEnum.TITLE)}
                        sx={chipStyle}

                    />
                    <Chip
                        onClick={() => handleSort(SortTypeEnum.DESCRIPTION)}
                        size="small"
                        label={`Description`}
                        icon={getSortIcon(SortTypeEnum.DESCRIPTION)}
                        sx={chipStyle}
                    />
                    <Chip
                        onClick={() => handleSort(SortTypeEnum.ADDEDDATE)}
                        size="small"
                        label={`Added date`}
                        icon={getSortIcon(SortTypeEnum.ADDEDDATE)}
                        sx={chipStyle}
                    />
                </div>
                <p className={classes.p}> Filter: </p>
                <ToggleButtonGroup
                    value={filterOption}
                    exclusive
                    onChange={handleFilterChange}
                    aria-label="Filter options"

                >
                    <ToggleButton
                        value="pagination"
                        sx={toggleButtonStyle}
                    >
                        Pagination
                    </ToggleButton>
                    <ToggleButton
                        value="full-list"
                        sx={toggleButtonStyle}
                    >
                        Full-List
                    </ToggleButton>
                </ToggleButtonGroup>

            </div>
            <hr
                className={classes.hr}
            />
            <div className={classes.taskContainer}>
                <Task modeStatus={TaskStatus.NEW} onAddTask={addTask} />



                {filterOption === 'pagination' ?
                    tasks && paginatedTasks().map((task) => (
                        <Task
                            key={task.taskId}
                            modeStatus={TaskStatus.DISPLAY}
                            task={task}
                            onUpdateTask={updateTask}
                            onDeleteTask={deleteTask}
                        />
                    ))
                    :
                    tasks && sortedTasks().map((task: TaskType) => (
                        <Task
                            key={task.taskId}
                            modeStatus={TaskStatus.DISPLAY}
                            task={task}
                            onUpdateTask={updateTask}
                            onDeleteTask={deleteTask}
                        />
                    ))}



            </div>

            {filterOption === 'pagination' ? (
                <div className={classes.paginationStyle}>
                    <Pagination count={pagesCount} page={page} onChange={handlePageChange} />
                </div>
            ) : null}

        </div >
    )
}

export default TasksBar