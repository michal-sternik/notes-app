import { SxProps } from "@mui/material";

export const chipStyle: SxProps = {
    backgroundColor: 'rgb(243, 136, 175);',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgb(230, 120, 160)',
    },
};

export const toggleButtonStyle: SxProps = {
    color: "rgb(243, 136, 175)",
    backgroundColor: "transparent",
    border: "1px solid rgb(243, 136, 175)",
    "&.Mui-selected": {
        color: "white",
        backgroundColor: "rgb(243, 136, 175)",
        "&:hover": {
            backgroundColor: "rgb(243, 136, 175)",
        },
    },
    "&:hover": {
        color: "white",
        backgroundColor: "rgb(230, 120, 160)",
    },
};
