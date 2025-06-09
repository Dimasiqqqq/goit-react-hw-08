import { IoPersonSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { apiDeleteUserContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";

const Contact = ({ name, number, id }) => {
	const dispatch = useDispatch();

	return (
		<div className={css.contactCard}>
			<div className={css.contactData}>
				<p>
					<span>
						<IoPersonSharp />
					</span>
					<span className={css.contactValue}>{name}</span>
				</p>
				<p>
					<span>
						<BsFillTelephoneFill />
					</span>
					<span className={css.contactValue}>{number}</span>
				</p>
			</div>
			<button type="button" onClick={() => dispatch(apiDeleteUserContact(id))}>
				Delete
			</button>
		</div>
	);
};

export default Contact;