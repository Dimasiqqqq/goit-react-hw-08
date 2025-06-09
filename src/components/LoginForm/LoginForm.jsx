import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import * as Yup from "yup";

import css from "./LoginForm.module.css";

const UserRegisterSchema = Yup.object().shape({
	email: Yup.string().required("Email is required!").email("Must be a valid email!"),
	password: Yup.string().required("Password is required!").min(8, "Password must be at least 8 characters!"),
});

const INITIAL_FORM_DATA = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (formData, formActions) => {
		dispatch(login(formData));
		formActions.resetForm();
		formActions.setErrors({});
	};

	return (
		<Formik validationSchema={UserRegisterSchema} initialValues={INITIAL_FORM_DATA} onSubmit={handleSubmit}>
			<Form className={css.form}>
				<h2 className={css.formTitle}>Login</h2>
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
				<button className={css.button} type="submit" title="Click to log in user" aria-label="Log in user">
					Log In
				</button>
			</Form>
		</Formik>
	);
};

export default LoginForm;