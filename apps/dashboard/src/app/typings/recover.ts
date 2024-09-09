import { FormControl } from "@angular/forms";
import { RegistrationForm } from "./registration";

export interface RecoverForm extends RegistrationForm {
    code: FormControl<string>;
}