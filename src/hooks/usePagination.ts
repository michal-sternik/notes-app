import { useState } from "react";
import { TaskType } from "../types";

const usePagination = (tasks: TaskType[] | null, itemsPerPage: number) => {
    const [page, setPage] = useState(1);
    const pagesCount = tasks ? Math.ceil(tasks.length / itemsPerPage) : 1;

    const paginatedTasks = () => {
        if (!tasks) return [];
        const sliceFrom = (page - 1) * itemsPerPage;
        const sliceTo = sliceFrom + itemsPerPage;
        return tasks.slice(sliceFrom, sliceTo);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return { page, setPage, pagesCount, handlePageChange, paginatedTasks };
};

export default usePagination;
