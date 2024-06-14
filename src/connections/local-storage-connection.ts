function setExamSessionInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getExamSessionFromLocalStorage(
  key: string
): { progressIndex: number; timeLeft: number } | null {
  const session = localStorage.getItem(key);
  if (session) {
    return JSON.parse(session);
  }
  return null;
}

function deleteExamSessionFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export {
  setExamSessionInLocalStorage,
  getExamSessionFromLocalStorage,
  deleteExamSessionFromLocalStorage,
};
