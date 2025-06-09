import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../components/DocumentTitle";
import Contacts from "../../components/Contacts/Contacts";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import { apiGetUserContacts } from "../../redux/contacts/operations";
import { selectContacts, selectError, selectIsLoading } from "../../redux/contacts/selectors";

export default function ContactsPage() {
	const dispatch = useDispatch();
	const items = useSelector(selectContacts);
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(apiGetUserContacts());
	}, [dispatch]);

	return (
		<>
			<DocumentTitle>Phonebook</DocumentTitle>
			<ContactForm />
			<SearchBox />
			{isLoading && <p>Loading contacts...</p>}
			{error && <p>{error}</p>}
			{/* {items.length > 0 && <Contacts />} */}
			<Contacts />
		</>
	);
}