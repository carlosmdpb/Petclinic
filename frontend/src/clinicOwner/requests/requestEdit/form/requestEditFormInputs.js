import { formValidators } from "../../../../validators/formValidators";
import moment from 'moment';

export const requestEditFormInputs = [
  {
    tag: "Title",
    name: "title",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [
      formValidators.notEmptyValidator,
      formValidators.minMaxLengthValidator1
    ],  },
  {
    tag: "Description",
    name: "description",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [
      formValidators.notEmptyValidator,
      formValidators.minMaxLengthValidator2
    ],
  },

  {
    tag: "Type",
    name: "type",
    type: "select",
    values: ["None"],
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator, formValidators.notNoneTypeValidator],
  },
];