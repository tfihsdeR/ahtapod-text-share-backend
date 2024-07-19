//--------------------------------------------------
// This file contains time related utility functions
//--------------------------------------------------

export const getCurrentDateFormatted = async (country: 'tr'): Promise<Date> => {
    return new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
}