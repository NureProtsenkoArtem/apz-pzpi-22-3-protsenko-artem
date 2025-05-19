export const kgToLbs = (kg: number): number => {
    const poundsPerKg = 2.20462;
    return parseFloat((kg * poundsPerKg).toFixed(2));
};

export const gramsToOunces = (grams: number): number => {
    const ouncesPerGram = 0.035274;
    return parseFloat((grams * ouncesPerGram).toFixed(2));
}

export const ouncesToGrams = (ounces: number): number => {
    const gramsPerOunce = 28.3495;
    return parseFloat((ounces * gramsPerOunce).toFixed(2));
};

export const formatToLocalizedTime = (
    dateString: string | Date,
    language: string
): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(language === "en" ? "en-US" : "uk-UA", {
        hour: "numeric",
        minute: "2-digit",
        hour12: language === "en",
    });
};

export const formatDateByLanguage = (
    dateString: string | Date,
    language: string
): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    return date.toLocaleDateString(language === "en" ? "en-US" : "uk-UA", options);
};


export const convertLbsToKg = (lbs: number): number => {
    return parseFloat((lbs * 0.45359237).toFixed(2));
};

export const convertKgToLbs = (kg: number): number => {
    return parseFloat((kg / 0.45359237).toFixed(2));
};