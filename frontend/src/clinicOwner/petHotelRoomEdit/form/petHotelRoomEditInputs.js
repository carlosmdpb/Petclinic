import { formValidators } from "../../../validators/formValidators";




export const petHotelRoomEditInputs = [
    {
        tag: "Name",
        name: "name",
        type: "text",
        defaultValue: "",
        isRequired: true,
        validators: [formValidators.notEmptyValidator],
    },
    {
        tag: "Type",
        name: "type",
        type: "select",
        defaultValue: "",
        isRequired: true,
        values: ['cat', 'dog', 'lizard', 'snake', 'bird', 'hamster', 'turtle'],
        validators: [formValidators.notEmptyValidator],
    },

    {
        tag: "Clinic",
        name: "clinic",
        type: "select",
        defaultValue: "",   
        isRequired: true,
        validators: [formValidators.notEmptyValidator],
    },
    {
        tag: "Size",
        name: "size",
        type: "number",
        defaultValue: "None",
        isRequired: true,
        validators: [formValidators.notEmptyValidator, formValidators.validSizeNumber],
    },
];
