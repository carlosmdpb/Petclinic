export const formValidators = {
    notEmptyValidator: {
        validate: (value) => {
            return value.trim().length > 0;
        },
        message: "The field cannot be empty"
    },
    telephoneValidator: {
        validate: (value) => {
            return value.trim().length === 9 && /^\d+$/.test(value);
        },
        message: "The telephone number must be 9 digits long and contain only numbers"
    },
    notNoneTypeValidator: {
        validate: (value) => {
            return value !== "None";
        },
        message: "Please, select a type"
    },
    validPhoneNumberValidator: {
        validate: (value) => {
            return value.trim().length === 9 && /^\d+$/.test(value);
        },
        message: "The phone number must be 9 digits long and contain only numbers"
    },
    validSizeNumber: {
        validate: (value) => {
            const numberValue = Number(value);
            return Number.isInteger(numberValue) && numberValue > 0;
        },
        message: "The value must be an Integer greater than 0 and it cannot be decimal"
    }
}
