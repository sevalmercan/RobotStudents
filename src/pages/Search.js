const Search = ({ placeholder, changeSearchInput }) => {
  return (
    <input
      icon="search"
      placeholder={placeholder}
      className="search"
      onChange={(e) => changeSearchInput(e.target.value)}
    />
  );
};

export default Search;
