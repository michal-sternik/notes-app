import { useState } from "react";

const useTaskFiltering = (setPage: (pageNumber: number) => void) => {
    const [filterOption, setFilterOption] = useState("pagination");

    const handleFilterChange = (_event: React.MouseEvent<HTMLElement>, value: string | null) => {
        if (value !== null) {
            if (value == "pagination") {
                setPage(1)
            }
            setFilterOption(value);
        }
    };

    return { filterOption, handleFilterChange };
};

export default useTaskFiltering;
