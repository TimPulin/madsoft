function setProgressInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getProgressFromLocalStorage(key: string) {
  localStorage.getItem(key);
}

export { setProgressInLocalStorage, getProgressFromLocalStorage };
