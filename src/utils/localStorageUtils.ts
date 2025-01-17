export const saveStateToLocalStorage = (state: unknown): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

export const loadStateFromLocalStorage = <T>(): T | undefined => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined; // Return undefined to allow Redux to use the default initial state
    }
    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};

  