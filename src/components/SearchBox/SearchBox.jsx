import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilterName } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

const SearchBox = () => {
	const dispatch = useDispatch();
	const selectNameFilter = useSelector(selectFilterName);

	return (
		<div className={css.searchBox}>
			<p className={css.searchTitle}>Find contacts by name</p>
			<input
				className={css.searchInput}
				type="text"
				onChange={(evt) => dispatch(changeFilter(evt.target.value))}
				placeholder="Type a name for search"
				value={selectNameFilter}
				spellCheck="true"
			/>
		</div>
	);
};

export default SearchBox;