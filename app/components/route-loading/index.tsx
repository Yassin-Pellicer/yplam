"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type RouteLoadingContextValue = {
  startRouteLoading: () => void;
};

const RouteLoadingContext = createContext<RouteLoadingContextValue | null>(null);

export const RouteLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const stopRouteLoading = useCallback(() => {
    clearTimeoutRef();
    setIsLoading(false);
  }, []);

  const startRouteLoading = useCallback(() => {
    clearTimeoutRef();
    setIsLoading(true);

    // Safety timeout in case a navigation is canceled or route stays the same.
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      timeoutRef.current = null;
    }, 2500);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const settleTimeout = setTimeout(() => {
      stopRouteLoading();
    }, 120);

    return () => clearTimeout(settleTimeout);
  }, [pathname, searchParams, isLoading, stopRouteLoading]);

  useEffect(() => {
    return () => clearTimeoutRef();
  }, []);

  const contextValue = useMemo(
    () => ({ startRouteLoading }),
    [startRouteLoading]
  );

  return (
    <RouteLoadingContext.Provider value={contextValue}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[999] bg-background/55 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <p className="text-sm font-semibold text-foreground! tracking-tight">Loading...</p>
          </div>
        </div>
      )}
    </RouteLoadingContext.Provider>
  );
};

export const useRouteLoading = () => {
  const context = useContext(RouteLoadingContext);

  if (!context) {
    return {
      startRouteLoading: () => { },
    };
  }

  return context;
};
