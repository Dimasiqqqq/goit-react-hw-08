import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

import { IoPersonAddSharp } from "react-icons/io5";

import css from "./RegistrationForm.module.css";

const UserRegisterSchema = Yup.object().shape({
	name: Yup.string()
		.required("User name is required!")
		.min(2, "User name must be at least 2 characters!")
		.max(50, "User name must be less than 50 characters!"),
	email: Yup.string().required("Email is required!").email("Must be a valid email!"),
	password: Yup.string().required("Password is required!").min(8, "Password must be at least 8 characters!"),
});

const INITIAL_FORM_DATA = {
	name: "",
	email: "",
	password: "",
};

const RegisterForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (data, formActions) => {
		console.log("data Register: ", data);
		dispatch(register(data));
		formActions.resetForm();
		formActions.setErrors({});
	};

	return (
		<Formik validationSchema={UserRegisterSchema} initialValues={INITIAL_FORM_DATA} onSubmit={handleSubmit}>
			<Form className={css.form}>
				<h2 className={css.formTitle}>Register</h2>
				<div>
					<label className={css.label} htmlFor="nameField">
						User name:
					</label>
					<Field className={css.field} id="nameField" placeholder="William Smith" type="text" name="name" />
					<ErrorMessage className={css.errorMsg} name="name" component="span" />
				</div>
				<div>
					<label className={css.label} htmlFor="mailField">
						Email:
					</label>
					<Field className={css.field} id="mailField" placeholder="wilsmith@fox.com" type="email" name="email" />
					<ErrorMessage className={css.errorMsg} name="email" component="span" />
				</div>
				<div>
					<label className={css.label} htmlFor="passwordField">
						Password:
					</label>
					<Field className={css.field} id="passwordField" placeholder="Enter your password" type="password" name="password" />
					<ErrorMessage className={css.errorMsg} name="password" component="span" />
				</div>

				<button className={css.button} type="submit" title="Click to register new user" aria-label="Register user">
					Register <IoPersonAddSharp />
				</button>
			</Form>
		</Formik>
	);
};

export default RegisterForm;