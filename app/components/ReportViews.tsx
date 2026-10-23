import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/**
 * Tells the Worker about each page reached by a client-side navigation, which
 * never asks the server for HTML. The first page needs no report: the Worker
 * recorded its HTML (worker/visits.ts). Nothing is sent in development, where
 * no Worker answers.
 */
export function ReportViews() {
  const { pathname, search } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (import.meta.env.DEV) return;
    navigator.sendBeacon("/__view", pathname + search);
  }, [pathname, search]);
  return null;
}
