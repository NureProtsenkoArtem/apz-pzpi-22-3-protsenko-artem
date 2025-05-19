export const parseDate = (date?: string): string => {
    if (!date || !date.includes('T')) return "Дата не вказана";
    return date.split('T')[0];
};

export const parseTime = (isoDate: string): string => {
    const date = new Date(isoDate);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
};

export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};