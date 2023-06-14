const sanitizeInput = (input:string) => {
    // Null check
    if (input === null || input === undefined) {
        return '';
    }

    // Ensureing input is a string
    input = String(input);

    // Sanitize potentially dangerous characters
    input = input.replace(/&/g, '&amp;'); 
    input = input.replace(/</g, '&lt;'); 
    input = input.replace(/>/g, '&gt;'); 
    input = input.replace(/"/g, '&quot;');
    input = input.replace(/'/g, '&#039;'); 

    return input;
}


function decodeHtmlEntities(encodedString:string) {
    // String replace all entities
    return encodedString.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}


export { sanitizeInput, decodeHtmlEntities };