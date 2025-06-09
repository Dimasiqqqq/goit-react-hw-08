import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { apiAddUserContact } from "../../redux/contacts/operations";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const initialValues = {
	name: "",
	number: "",
};

const ContactFormSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "User name must be at least 3 characters!")
		.max(50, "User name must be less than 50 characters!")
		.required("User name is required!"),
	number: Yup.string()
		.matches(/^\d{3}-\d{2}-\d{2}$/, {
			message: "Invalid number",
			excludeEmptyString: false,
		})
		.required("Number is required!"),
});

const ContactForm = () => {
	const dispatch = useDispatch();

	const nameFieldId = nanoid();
	const numberFieldId = nanoid();

	const handleFormSubmit = (formData, formActions) => {
		dispatch(apiAddUserContact(formData));
		formActions.resetForm();
		formActions.setErrors({});
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={ContactFormSchema}>
			<Form className={css.form}>
				<div>
					<label className={css.label} htmlFor={nameFieldId}>
						Name
					</label>
					<Field className={css.field} id={nameFieldId} type="text" name="name" placeholder="William Smith" />
					<ErrorMessage className={css.errorMsg} name="name" component="span" />
				</div>
				<div>
					<label className={css.label} htmlFor={numberFieldId}>
						Number
					</label>
					<Field className={css.field} id={numberFieldId} type="tel" name="number" placeholder="111-11-11" />
					<ErrorMessage className={css.errorMsg} name="number" component="span" />
				</div>
				<button className={css.button} type="submit">
					Add contact
				</button>
			</Form>
		</Formik>
	);
};

export default ContactForm;