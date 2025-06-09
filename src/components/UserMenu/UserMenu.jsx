import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUserData } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserData);

	return (
		<div className={css.usermenu}>
			<p className={css.username}>Welcome, {user.name}</p>
			<button type="button" onClick={() => dispatch(logout())}>
				Logout
			</button>
		</div>
	);
};