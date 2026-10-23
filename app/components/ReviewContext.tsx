import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COMMITTED,
  REVIEW_BY_ID,
  REVIEW_DEFAULT,
  REVIEW_KEY,
  statusOf,
  type Review,
  type Status,
  type Verdict,
} from "../content/review";
import type { Feedback, Kind, Target } from "../../worker/feedback";

/** The feedback API, as the browser sees it. */
const API = "/__feedback";

export interface Draft {
  kind: Kind;
  body: string;
  target?: Target;
  verdict?: Verdict;
  /** The reviewed item's text hash. */
  hash?: string;
  name?: string;
  /** Defaults to this page. */
  page?: string;
}

interface ReviewState {
  /** Marks and the feedback button showing (`?review=`, remembered). */
  on: boolean;
  setOn(on: boolean): void;
  /** Who the API says we are, or null when feedback isn't open to us here. */
  me: { who: string } | null;
  /**
   * What this visitor has sent since the page loaded. The site never reads
   * feedback back: agents do, with `bun run feedback`.
   */
  feedback: Feedback[];
  /** Committed reviews with any newer live ones on top. */
  reviews: Record<string, Review>;
  statusOf(rid: string): Status | undefined;
  send(draft: Draft): Promise<Feedback>;
  review(rid: string, verdict: Verdict, note?: string): Promise<void>;
}

const noop = async () => {
  throw new Error("Feedback isn't available here.");
};

const Context = createContext<ReviewState>({
  on: REVIEW_DEFAULT,
  setOn: () => {},
  me: null,
  feedback: [],
  reviews: COMMITTED,
  statusOf: (rid) => {
    const item = REVIEW_BY_ID.get(rid);
    return item && statusOf(item);
  },
  send: noop,
  review: noop,
});

export const useReview = () => useContext(Context);

/**
 * Runs before first paint (root.tsx), so marks never flash on for someone who
 * turned them off: `?review=off|on` sets the remembered choice, and the root
 * element carries it as `data-review` for the stylesheet.
 */
export const REVIEW_SCRIPT = `(function(){var d=${REVIEW_DEFAULT ? '"on"' : '"off"'},k=${JSON.stringify(REVIEW_KEY)},v=d;try{var q=new URLSearchParams(location.search).get("review");if(q==="off"||q==="0")localStorage.setItem(k,"off");if(q==="on"||q==="1")localStorage.setItem(k,"on");v=localStorage.getItem(k)||d}catch(e){}document.documentElement.setAttribute("data-review",v)})()`;

/** The latest live review per item. */
function liveReviews(feedback: Feedback[]): Record<string, Review> {
  const out: Record<string, Review> = {};
  for (const f of feedback) {
    const rid = f.target?.rid;
    if (f.kind !== "review" || !rid || !f.verdict || !f.hash) continue;
    if (out[rid] && out[rid].at > f.at) continue;
    out[rid] = {
      hash: f.hash,
      verdict: f.verdict,
      who: f.name ? `${f.name} (${f.who})` : f.who,
      at: f.at,
      note: f.body || undefined,
    };
  }
  return out;
}

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [on, setOnState] = useState(REVIEW_DEFAULT);
  const [me, setMe] = useState<ReviewState["me"]>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    setOnState(document.documentElement.dataset.review === "on");
  }, []);

  const setOn = useCallback((next: boolean) => {
    const v = next ? "on" : "off";
    try {
      localStorage.setItem(REVIEW_KEY, v);
    } catch {}
    document.documentElement.dataset.review = v;
    setOnState(next);
  }, []);

  useEffect(() => {
    if (!on) return;
    let live = true;
    (async () => {
      try {
        const res = await fetch(`${API}/me`, { credentials: "same-origin" });
        if (!res.ok || !live) return;
        setMe(await res.json());
      } catch {
        // No API here (a static preview): the marks still work.
      }
    })();
    return () => {
      live = false;
    };
  }, [on]);

  const reviews = useMemo(() => {
    const live = liveReviews(feedback);
    const merged: Record<string, Review> = { ...COMMITTED };
    for (const [rid, r] of Object.entries(live)) {
      if (!merged[rid] || merged[rid].at < r.at) merged[rid] = r;
    }
    return merged;
  }, [feedback]);

  const send = useCallback(async (draft: Draft) => {
    const res = await fetch(API, {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...draft,
        page: draft.page ?? location.pathname,
        build: __BUILD__ || undefined,
        viewport: { w: innerWidth, h: innerHeight },
      }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? `Error ${res.status}`);
    setFeedback((all) => [...all, body as Feedback]);
    return body as Feedback;
  }, []);

  const review = useCallback(
    async (rid: string, verdict: Verdict, note?: string) => {
      const item = REVIEW_BY_ID.get(rid);
      if (!item) throw new Error(`No such item: ${rid}`);
      await send({
        kind: "review",
        verdict,
        body: note ?? "",
        target: { rid, label: item.title },
        page: item.href.split("#")[0],
        hash: item.hash,
      });
    },
    [send],
  );

  const value = useMemo<ReviewState>(
    () => ({
      on,
      setOn,
      me,
      feedback,
      reviews,
      statusOf: (rid) => {
        const item = REVIEW_BY_ID.get(rid);
        return item && statusOf(item, reviews);
      },
      send,
      review,
    }),
    [on, setOn, me, feedback, reviews, send, review],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
