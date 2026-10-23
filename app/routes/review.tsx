import { useEffect, useMemo, useRef, useState } from "react";
import { Link, type MetaFunction } from "react-router";
import { Provenance, Said } from "../components/Mark";
import { useReview } from "../components/ReviewContext";
import Shell from "../components/Shell";
import {
  CATEGORIES,
  CATEGORY_LIST,
  type CategoryId,
} from "../content/categories";
import { HUMAN, HUMAN_IDS, type HumanId } from "../content/human";
import {
  KIND_LABEL,
  REVIEW_ITEMS,
  STATUS_EXPLAIN,
  STATUS_LABEL,
  needsReview,
  type ReviewItem,
  type Status,
  type Verdict,
} from "../content/review";
import { pageMeta } from "../meta";

export const meta: MetaFunction = () =>
  pageMeta(
    "Review: Empyrean Gate V2",
    "Who wrote each part of the V2 plans, and a walk-through to check the AI's drafts.",
  );

/** The order statuses are counted and listed in: what needs a person first. */
const ORDER: Status[] = [
  "flagged",
  "changed",
  "unsure",
  "ai",
  "mixed",
  "doc",
  "reviewed",
  "human",
];

/** Where each ledger entry landed on the site. */
const USED_IN = new Map<HumanId, ReviewItem[]>();
for (const item of REVIEW_ITEMS) {
  for (const id of [...(item.credit?.h ?? []), ...(item.conflict?.h ?? [])]) {
    USED_IN.set(id, [...(USED_IN.get(id) ?? []), item]);
  }
}

function Walk({ items, start }: { items: ReviewItem[]; start?: string }) {
  const { me, review, statusOf } = useReview();
  const [current, setCurrent] = useState<string | undefined>(start);
  const [back, setBack] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const pending = items.filter((i) => needsReview(statusOf(i.id)!));
  const item = items.find((i) => i.id === current) ?? pending[0] ?? undefined;

  useEffect(() => {
    if (start) setCurrent(start);
  }, [start]);

  const next = (from: ReviewItem) => {
    const at = items.indexOf(from);
    const after = [...items.slice(at + 1), ...items.slice(0, at)].find(
      (i) => i.id !== from.id && needsReview(statusOf(i.id)!),
    );
    setBack((b) => [...b, from.id]);
    setCurrent(after?.id);
    setNote("");
    setError("");
  };

  const act = async (verdict: Verdict) => {
    if (!item) return;
    if (verdict === "wrong" && !note.trim()) {
      setError("Say what's wrong, so it can be fixed.");
      noteRef.current?.focus();
      return;
    }
    setBusy(true);
    try {
      await review(item.id, verdict, note.trim() || undefined);
      next(item);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof Element && t.closest("input, textarea, select")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!item) return;
      if (e.key === "y") act("ok");
      else if (e.key === "u") act("unsure");
      else if (e.key === "n") act("wrong");
      else if (e.key === "s" || e.key === "ArrowRight") next(item);
      else if (e.key === "ArrowLeft" && back.length) {
        setCurrent(back[back.length - 1]);
        setBack((b) => b.slice(0, -1));
      } else return;
      e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!item) {
    return (
      <div className="walk walk-done">
        <h3>Nothing left to review here.</h3>
        <p>Every item in this view is human, or has been checked.</p>
      </div>
    );
  }

  const status = statusOf(item.id)!;
  return (
    <div className="walk" data-status={status}>
      <p className="walk-where">
        <span>
          {pending.length} to go
          {item.category && <> · {CATEGORIES[item.category].name}</>} ·{" "}
          {KIND_LABEL[item.kind]}
        </span>
        <Link to={item.href}>See it on its page</Link>
      </p>
      <h3>{item.title}</h3>
      <p className="walk-text">{item.text}</p>
      <div className="walk-prov">
        <Provenance rid={item.id} />
      </div>
      {me ? (
        <>
          <textarea
            ref={noteRef}
            className="walk-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A note (needed for Wrong): what's right instead, or who would know"
            rows={2}
          />
          <p className="walk-actions">
            <button
              type="button"
              className="button"
              disabled={busy}
              onClick={() => act("ok")}
            >
              Looks right <kbd>Y</kbd>
            </button>
            <button
              type="button"
              className="button button-ghost"
              disabled={busy}
              onClick={() => act("unsure")}
            >
              Not sure <kbd>U</kbd>
            </button>
            <button
              type="button"
              className="button button-warn"
              disabled={busy}
              onClick={() => act("wrong")}
            >
              Wrong <kbd>N</kbd>
            </button>
            <button
              type="button"
              className="button button-ghost"
              disabled={busy}
              onClick={() => next(item)}
            >
              Skip <kbd>S</kbd>
            </button>
          </p>
          {error && <p className="review-error">{error}</p>}
        </>
      ) : (
        <p className="fine">
          Reviews are recorded through the site's feedback service, which isn't
          open here. Sign in on v2.empyreangate.org, or run{" "}
          <code>bun run dev</code>.
        </p>
      )}
    </div>
  );
}

export default function Review() {
  const { statusOf } = useReview();
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [start, setStart] = useState<string>();

  // ?item= and ?cat= are read after hydration: the page is prerendered bare.
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const item = q.get("item");
    const c = q.get("cat") as CategoryId | null;
    if (c && c in CATEGORIES) setCat(c);
    if (item) setStart(item);
  }, []);

  const items = useMemo(
    () => REVIEW_ITEMS.filter((i) => cat === "all" || i.category === cat),
    [cat],
  );
  const counts = new Map<Status, number>();
  for (const i of items) {
    const s = statusOf(i.id)!;
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  const done = items.filter((i) => !needsReview(statusOf(i.id)!)).length;

  return (
    <Shell>
      <section className="hero hero-small">
        <p className="kicker">Review</p>
        <h1>Who wrote what, and what still needs checking</h1>
        <p className="lede">
          Most of these plans were drafted by AI from a few days of
          conversation. Everything a person said is in the ledger below;
          everything else is the AI's guess or design choice until someone
          checks it. Every block on the site carries a mark saying which.
        </p>
        <ul className="status-key">
          {ORDER.map((s) => (
            <li key={s}>
              <span className={`rmark-swatch rmark-${s}`} />
              <b>{STATUS_LABEL[s]}</b>: {STATUS_EXPLAIN[s]}
            </li>
          ))}
          <li>
            <span className="rmark-swatch rmark-conflict" />
            <b>≠ Differs</b>: the AI's call goes against what a person said.
            These come first.
          </li>
        </ul>
        <p className="fine">
          Turn the marks and the feedback button off with{" "}
          <code>?review=off</code> on any page (it sticks), back on with{" "}
          <code>?review=on</code>. They never print.
        </p>
      </section>

      <section className="section section-tight" aria-labelledby="progress">
        <h2 id="progress">
          Progress{" "}
          <span className="h-amount">
            {done} of {items.length} checked or human
          </span>
        </h2>
        <label className="review-filter">
          Show{" "}
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as CategoryId | "all")}
          >
            <option value="all">every category</option>
            {CATEGORY_LIST.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <div
          className="review-bar"
          role="img"
          aria-label={`${done} of ${items.length} checked or human`}
        >
          {ORDER.map((s) =>
            counts.get(s) ? (
              <span
                key={s}
                className={`rmark-${s}`}
                style={{ flexGrow: counts.get(s) }}
              >
                {STATUS_LABEL[s]} {counts.get(s)}
              </span>
            ) : null,
          )}
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="walk">
        <h2 id="walk">Walk through</h2>
        <p className="section-lede">
          One item at a time: conflicts first, then the AI's biggest decisions
          (what V2 does, the leading parts, the most expensive lines), then the
          detail. Keys: <kbd>Y</kbd> right, <kbd>U</kbd> not sure, <kbd>N</kbd>{" "}
          wrong, <kbd>S</kbd> skip, <kbd>←</kbd> back.
        </p>
        <Walk items={items} start={start} />
      </section>

      <section className="section section-tight" aria-labelledby="all">
        <h2 id="all">Every item</h2>
        <div className="table-wrap">
          <table className="items review-list">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Kind</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => {
                const s = statusOf(i.id)!;
                return (
                  <tr key={i.id} data-status={s}>
                    <th scope="row">
                      <Link to={i.href}>{i.title}</Link>
                      {i.category && (
                        <span className="item-sub">
                          {CATEGORIES[i.category].name}
                        </span>
                      )}
                    </th>
                    <td>{KIND_LABEL[i.kind]}</td>
                    <td>
                      <button
                        type="button"
                        className={`rmark-chip rmark-${s}`}
                        onClick={() => {
                          setStart(i.id);
                          document.getElementById("walk")?.scrollIntoView();
                        }}
                      >
                        {i.conflict && "≠ "}
                        {STATUS_LABEL[s]}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="ledger">
        <h2 id="ledger">What people said</h2>
        <p className="section-lede">
          Every statement from the planning conversations that shaped the plans,{" "}
          {HUMAN_IDS.length} in all. Where the AI read more into one than was
          said, it says so. Also in the repo as <code>docs/human-input.md</code>
          .
        </p>
        <ol className="ledger">
          {HUMAN_IDS.map((id) => {
            const h = HUMAN[id];
            const used = USED_IN.get(id) ?? [];
            return (
              <li key={id} id={id}>
                <Said ids={[id]} />
                <span className="ledger-meaning">{h.meaning}</span>
                {"supersededBy" in h && (
                  <span className="item-sub">
                    Replaced by {h.supersededBy}.
                  </span>
                )}
                {used.length > 0 && (
                  <span className="item-sub">
                    On the site:{" "}
                    {used.map((u, n) => (
                      <span key={u.id}>
                        {n > 0 && ", "}
                        <Link to={u.href}>{u.title}</Link>
                      </span>
                    ))}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </Shell>
  );
}
