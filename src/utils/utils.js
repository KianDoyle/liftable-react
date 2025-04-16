export const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

export const hideSearchResults = () => {
  setSearchTerm("");
  setFilteredLifters([]);
};