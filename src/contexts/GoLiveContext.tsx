import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState, AppStateStatus } from "react-native";

interface GoLiveContextType {
  isGoLive: boolean;
}

const GoLiveContext = createContext<GoLiveContextType | undefined>(undefined);

export const GoLiveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Start with Go Live enabled (app starts in foreground)
  const [isGoLive, setIsGoLive] = useState(true);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const backgroundTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const wasActive = appStateRef.current === "active";
      const isNowBackground = nextAppState.match(/inactive|background/);
      const isNowActive = nextAppState === "active";

      // Clear any pending background timeout
      if (backgroundTimeoutRef.current) {
        clearTimeout(backgroundTimeoutRef.current);
        backgroundTimeoutRef.current = null;
      }

      if (wasActive && isNowBackground) {
        // App is going to background - wait 3 seconds before disabling Go Live
        // This prevents rapid on/off cycles from brief interruptions
        backgroundTimeoutRef.current = setTimeout(() => {
          setIsGoLive(false);
          backgroundTimeoutRef.current = null;
        }, 3000); // 3 second grace period
      } else if (isNowActive) {
        // App came back to foreground - immediately enable Go Live
        setIsGoLive(true);
      }

      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
      if (backgroundTimeoutRef.current) {
        clearTimeout(backgroundTimeoutRef.current);
      }
    };
  }, []);

  return (
    <GoLiveContext.Provider value={{ isGoLive }}>
      {children}
    </GoLiveContext.Provider>
  );
};

export const useGoLive = () => {
  const context = useContext(GoLiveContext);
  if (context === undefined) {
    throw new Error("useGoLive must be used within a GoLiveProvider");
  }
  return context;
};
