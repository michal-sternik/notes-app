import { useState } from "react";
import { SortType, SortTypeEnum, TaskType } from "../types";

const useTaskSorting = (tasks: TaskType[] | null) => {
    const [sortBy, setSortBy] = useState<SortType | null>(null);

    const sortedTasks = () => {
        if (!tasks) return [];

        const sortFunction = (a: TaskType, b: TaskType) => {
            if (sortBy?.type === SortTypeEnum.TITLE) {
                return sortBy.ascending
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            } else if (sortBy?.type === SortTypeEnum.DESCRIPTION) {
                return sortBy.ascending
                    ? a.description.localeCompare(b.description)
                    : b.description.localeCompare(a.description)
            } else if (sortBy?.type === SortTypeEnum.ADDEDDATE) {
                return sortBy.ascending
                    ? new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()
                    : new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
            }
            return 0;
        };

        return tasks.sort(sortFunction);
    };

    const handleSort = (sortType: SortTypeEnum) => {
        if (!sortBy) {
            setSortBy({ type: sortType, ascending: true });
        } else if (sortBy.type === sortType) {
            setSortBy({ type: sortType, ascending: !sortBy.ascending });
        } else {
            setSortBy({ type: sortType, ascending: true });
        }
    };

    return { sortBy, handleSort, sortedTasks };
};

export default useTaskSorting;
