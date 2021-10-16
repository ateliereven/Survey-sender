const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // from emailregex.com

const validateEmails = (emails) => {
    let invalidEmails = emails.split(',') // splits emails on the commas and creates and array.
        .map(email => email.trim()) // trim removes spaces. all strings are then assembled together and returned in a new array
        .filter(email => re.test(email) === false);  //filter out valid emails, capture invalid emails in the array

    if (invalidEmails.length) {
        if (invalidEmails.includes("")) { //if there is an empty string after the comma, don't accept a trailing comma
            return 'Remove the comma or add another email address'
        }
        return `These email addresses are invalid: ${invalidEmails}`;
    }
};

export default validateEmails;