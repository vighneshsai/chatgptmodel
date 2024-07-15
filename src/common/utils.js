export function dateConversion  (datetimeString) {
    const dateObject = new Date(datetimeString);
    const day = dateObject.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Get month (months are zero-based) and pad with leading zero if needed
    const year = dateObject.getFullYear().toString(); // Get full year
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate)
    return formattedDate
}
