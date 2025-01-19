export const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })
};

export const validateNoteField = (field: string) => field.trim() === "";
