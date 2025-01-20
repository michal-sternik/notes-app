export enum TaskStatus {
    NEW = 'NEW',
    DISPLAY = 'DISPLAY',
    EDIT = 'EDIT',
}


export interface ProposedColorProps {
    active: boolean;
    color: string;
    changeSelectedColor: (color: string) => void
}

export interface TaskType {
    taskId: number,
    title: string;
    description: string;
    addedDate: Date;
    color: string;
}

export interface TaskProps {
    modeStatus: TaskStatus;
    task?: TaskType;
    onAddTask?: (newTask: TaskType) => void;
    onUpdateTask?: (updatedTask: TaskType) => void;
    onDeleteTask?: (taskId: number) => void;
}

export interface SortType {
    type: SortTypeEnum;
    ascending: boolean;
}

export enum SortTypeEnum {
    TITLE,
    DESCRIPTION,
    ADDEDDATE
}