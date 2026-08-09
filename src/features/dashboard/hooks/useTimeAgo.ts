import { useState, useEffect } from "react";
import { getTimeAgo } from "../utils/getTimeAgo";

export function useTimeAgo(dataUpdatedAt: number): string {
  const [, setTick] = useState<number>(0);

  useEffect(() => {
    if (!dataUpdatedAt) return;

    const intervalId = setInterval(() => {
      setTick((prevTick) => prevTick + 1);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [dataUpdatedAt]);

  if (!dataUpdatedAt) return "";

  return getTimeAgo(dataUpdatedAt);
}