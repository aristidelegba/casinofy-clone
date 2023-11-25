"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useMemo,
} from "react";

// Define your context type
type GlobalContextType = {
  isSpinning: boolean;
  setIsSpinning: React.Dispatch<boolean>;
};

// Define action types
type Action = { type: "SET_IS_SPINNING"; payload: boolean };

// Create the context with an initial value
export const initialContextValue: GlobalContextType = {
  isSpinning: false,
  setIsSpinning: () => {},
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create a custom hook for accessing the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

// Create a reducer function
const globalReducer = (
  state: GlobalContextType,
  action: Action
): GlobalContextType => {
  switch (action.type) {
    case "SET_IS_SPINNING":
      return { ...state, isSpinning: action.payload };
    default:
      return state;
  }
};

// Create a context provider component using useReducer
type GlobalContextProviderProps = {
  children: ReactNode;
} & GlobalContextType;

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const setIsSpinning = (newValue: boolean) => {
    dispatch({ type: "SET_IS_SPINNING", payload: newValue });
  };

  const [state, dispatch] = useReducer(globalReducer, {
    ...initialContextValue,
    setIsSpinning,
  });

  const contextValue: GlobalContextType = useMemo(
    () => ({
      ...state,
    }),
    [state]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
