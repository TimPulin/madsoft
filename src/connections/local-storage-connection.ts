function setExamSessionInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getExamSessionFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

function deleteExamSessionFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export {
  setExamSessionInLocalStorage,
  getExamSessionFromLocalStorage,
  deleteExamSessionFromLocalStorage,
};
