import { FormControl } from "@angular/forms";
import { LoginForm } from "./login";

export interface RegistrationForm extends LoginForm {
    confirmationPassword: FormControl<string>;
}