/*
 * @see:
 * https://www.baeldung.com/java-email-validation-regex#regular-expression-by-rfc-5322-for-email-validation
 * */
export const EMAIL_REGEX = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;

/*
 * at least one letter
 * at least one number
 * it can have a special characters
 * it can have an uppercase letter
 * it must be minimum 8 characters long
 * */
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
