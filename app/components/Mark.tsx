import { useState, type ReactNode } from "react";
import { HUMAN, type HumanId, type Said as Entry } from "../content/human";
import {
  REVIEW_BY_ID,
  STATUS_EXPLAIN,
  pacific,
  STATUS_LABEL,
  type Status,
  type Verdict,
} from "../content/review";
import { useReview } from "./ReviewContext";
import Tip from "./Tip";

/** Short badge text: the mark has to fit beside a heading. */
const SHORT: Record<Status, string> = {
  human: "Human",
  mixed: "Human + AI",
  reviewed: "Reviewed",
  flagged: "Flagged",
  unsure: "Not sure",
  changed: "Changed",
  doc: "From a doc",
  ai: "AI draft",
};

/** Asks the feedback layer to open its form on an item. */
export function openFeedback(rid: string, kind: "comment" | "wrong") {
  const item = REVIEW_BY_ID.get(rid);
  window.dispatchEvent(
    new CustomEvent("v2-feedback", {
      detail: { kind, target: { rid, label: item?.title } },
    }),
  );
}

/**
 * What people said, as the ledger has it. Spans only: marks sit inside
 * paragraphs and headings, where a list would end the paragraph.
 */
export function Said({ ids }: { ids: readonly HumanId[] }) {
  return (
    <span className="said">
      {ids.map((id) => {
        const h: Entry = HUMAN[id];
        return (
          <span key={id} className="said-item">
            <span className="said-who">
              {h.who}, {h.at} <span className="said-id">{id}</span>
            </span>
            <q>{h.said}</q>
            {h.aiReading && (
              <span className="said-reading">AI's reading: {h.aiReading}</span>
            )}
          </span>
        );
      })}
    </span>
  );
}

/** The detail behind a mark: who said what, any conflict, any review. */
export function Provenance({ rid }: { rid: string }) {
  const { statusOf, reviews } = useReview();
  const item = REVIEW_BY_ID.get(rid);
  if (!item) return null;
  const status = statusOf(rid)!;
  const r = reviews[rid];
  return (
    <>
      <span className="tip-line">
        <strong>{STATUS_LABEL[status]}.</strong> {STATUS_EXPLAIN[status]}
      </span>
      {item.conflict && (
        <span className="tip-line prov-conflict">
          <strong>Differs from what was said.</strong> {item.conflict.note}
          <Said ids={item.conflict.h} />
        </span>
      )}
      {item.credit?.h && (
        <span className="tip-line">
          {item.credit.what && (
            <>
              <strong>Theirs:</strong> {item.credit.what}.{" "}
            </>
          )}
          <Said ids={item.credit.h} />
        </span>
      )}
      {item.credit?.doc && (
        <span className="tip-line">
          <strong>Document:</strong> {item.credit.doc}
        </span>
      )}
      {r && (
        <span className="tip-line">
          {r.verdict === "ok"
            ? "Checked"
            : r.verdict === "wrong"
              ? "Flagged"
              : "Unsure"}{" "}
          by {r.who}, {pacific(r.at)}
          {r.note && <>: “{r.note}”</>}
        </span>
      )}
    </>
  );
}

/** The review buttons, wherever an item is shown. */
export function ReviewActions({
  rid,
  onDone,
}: {
  rid: string;
  onDone?: (verdict: Verdict) => void;
}) {
  const { me, review } = useReview();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (!me) return null;
  const act = async (verdict: Verdict) => {
    setBusy(true);
    setError("");
    try {
      await review(rid, verdict);
      onDone?.(verdict);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <span className="review-actions">
      <button type="button" disabled={busy} onClick={() => act("ok")}>
        Looks right
      </button>
      <button type="button" disabled={busy} onClick={() => act("unsure")}>
        Not sure
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => openFeedback(rid, "wrong")}
      >
        Wrong…
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => openFeedback(rid, "comment")}
      >
        Comment…
      </button>
      {error && <span className="review-error">{error}</span>}
    </span>
  );
}

/** The badge: who drove this, and whether anyone has checked it. */
export function Mark({ rid }: { rid: string }) {
  const { statusOf, feedback } = useReview();
  const item = REVIEW_BY_ID.get(rid);
  if (!item) return null;
  const status = statusOf(rid)!;
  const open = feedback.filter(
    (f) => f.target?.rid === rid && f.status === "open" && f.kind !== "review",
  ).length;
  return (
    <Tip
      className={`rmark rmark-${status}${item.conflict ? " rmark-conflict" : ""}`}
      label={
        <>
          {item.conflict && <span aria-hidden="true">≠ </span>}
          {SHORT[status]}
          {open > 0 && <span className="rmark-count"> · {open}</span>}
        </>
      }
    >
      <Provenance rid={rid} />
      <ReviewActions rid={rid} />
    </Tip>
  );
}

type Tag = "div" | "li" | "p" | "tr" | "section";

/**
 * A block a reviewer can check: it carries its id for the feedback picker, and its status for the review-mode highlight.
 */
export function Reviewable({
  rid,
  as: As = "div",
  id,
  className,
  children,
}: {
  rid: string;
  as?: Tag;
  /** The anchor; `r-<rid>` unless the block already has one. */
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const { statusOf } = useReview();
  const item = REVIEW_BY_ID.get(rid);
  return (
    <As
      id={id ?? `r-${rid}`}
      className={className}
      data-rid={rid}
      data-status={statusOf(rid)}
      data-conflict={item?.conflict ? "" : undefined}
    >
      {children}
    </As>
  );
}
