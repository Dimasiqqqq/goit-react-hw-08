import css from "./Contacts.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = () => {
	const filteredContacts = useSelector(selectFilteredContacts);

	return (
		<ul className={css.list}>
			{filteredContacts.map((contact) => {
				return (
					<li className={css.item} key={contact.id}>
						<Contact name={contact.name} number={contact.number} id={contact.id} />
					</li>
				);
			})}
		</ul>
	);
};

export default ContactList;