import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { REVIEW_BY_ID } from "../content/review";
import type { Kind, Target } from "../../worker/feedback";
import { useReview } from "./ReviewContext";

/**
 * Feedback on anything, right on the page: select text and comment on it,
 * point at any section, item, image or diagram, or comment on the page as a
 * whole. Shown only in review mode (`?review=off` hides it) and only where
 * the feedback API answers. Never printed.
 *
 * Everything it adds lives in `.fb-root` (or carries `data-fb`), so the
 * picker and the selection chip never treat it as page content.
 */

const NAME_KEY = "v2-feedback-name";

const KIND_LABEL: Record<Exclude<Kind, "review">, string> = {
  comment: "Comment",
  wrong: "Something's wrong",
  question: "Question",
};

/** What the picker may land on, when no reviewable block is nearer. */
const PICKABLE =
  "[data-rid], img, svg, canvas, figure, table, tr, li, p, h1, h2, h3, h4, blockquote, section, .card";

function ours(el: Element | null): boolean {
  return !!el?.closest(".fb-root, [data-fb]");
}

/** A CSS path back to the nearest ancestor with an id (or main). */
function selectorOf(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== document.body) {
    if (node.id) {
      parts.unshift(`#${CSS.escape(node.id)}`);
      break;
    }
    const parent: Element | null = node.parentElement;
    const tag = node.tagName.toLowerCase();
    if (!parent) break;
    const same = [...parent.children].filter(
      (c) => c.tagName === node!.tagName,
    );
    parts.unshift(
      same.length > 1 ? `${tag}:nth-of-type(${same.indexOf(node) + 1})` : tag,
    );
    node = parent;
  }
  return parts.join(" > ");
}

/** A human name for an element: its rid's title, a heading, alt text. */
function labelOf(el: Element): string | undefined {
  const rid = el.closest("[data-rid]")?.getAttribute("data-rid");
  const item = rid ? REVIEW_BY_ID.get(rid) : undefined;
  if (item) return item.title;
  const alt = el.getAttribute("alt") ?? el.getAttribute("aria-label");
  if (alt) return alt;
  const heading = el.matches("h1, h2, h3, h4")
    ? el
    : el.querySelector("h1, h2, h3, h4, caption, figcaption");
  const text = (heading ?? el).textContent?.trim().replace(/\s+/g, " ");
  return text ? text.slice(0, 120) : undefined;
}

function targetOf(el: Element, at?: { x: number; y: number }): Target {
  const rect = el.getBoundingClientRect();
  const rid = el.closest("[data-rid]")?.getAttribute("data-rid") ?? undefined;
  return {
    rid,
    selector: selectorOf(el),
    label: labelOf(el),
    tag: el.tagName.toLowerCase(),
    point:
      at && rect.width && rect.height
        ? {
            x: Math.round(((at.x - rect.left) / rect.width) * 1000) / 1000,
            y: Math.round(((at.y - rect.top) / rect.height) * 1000) / 1000,
          }
        : undefined,
  };
}

/** The current selection as a target, if it is page text worth quoting. */
function selectionTarget(): Target | undefined {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return undefined;
  const exact = sel.toString().trim();
  if (!exact) return undefined;
  const range = sel.getRangeAt(0);
  const node = range.commonAncestorContainer;
  const el = node instanceof Element ? node : node.parentElement;
  if (!el || ours(el) || !el.closest("main")) return undefined;
  const block = el.closest(PICKABLE) ?? el;
  const whole = block.textContent ?? "";
  const at = whole.indexOf(exact);
  return {
    ...targetOf(block),
    quote: {
      exact: exact.slice(0, 1000),
      prefix: at > 0 ? whole.slice(Math.max(0, at - 40), at) : undefined,
      suffix:
        at >= 0
          ? whole.slice(at + exact.length, at + exact.length + 40)
          : undefined,
    },
  };
}

/** Scroll to what a piece of feedback is about, and flash it. */
function show(target: Target | undefined) {
  if (!target) return;
  let el: Element | null = null;
  if (target.rid)
    el = document.querySelector(`[data-rid="${CSS.escape(target.rid)}"]`);
  if (!el && target.selector) {
    try {
      el = document.querySelector(target.selector);
    } catch {}
  }
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("fb-flash");
  setTimeout(() => el!.classList.remove("fb-flash"), 1600);
}

function describe(target: Target | undefined): string {
  if (!target) return "This page as a whole";
  if (target.quote) return `“${target.quote.exact.slice(0, 140)}”`;
  return target.label ?? target.tag ?? "Something on the page";
}

export default function FeedbackLayer() {
  const { on, setOn, me, send } = useReview();
  const { pathname } = useLocation();
  const [panel, setPanel] = useState(false);
  const [picking, setPicking] = useState(false);
  const [box, setBox] = useState<DOMRect | null>(null);
  const [chip, setChip] = useState<{
    x: number;
    y: number;
    target: Target;
  } | null>(null);
  const [form, setForm] = useState<{
    target?: Target;
    kind: Exclude<Kind, "review">;
  } | null>(null);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      setName(localStorage.getItem(NAME_KEY) ?? "");
    } catch {}
  }, []);

  const openForm = useCallback(
    (target: Target | undefined, kind: Exclude<Kind, "review"> = "comment") => {
      setForm({ target, kind });
      setPanel(false);
      setChip(null);
      setNotice("");
      setTimeout(() => textarea.current?.focus(), 0);
    },
    [],
  );

  // A mark's "Wrong…" or "Comment…" asks for the form on its item.
  useEffect(() => {
    const onAsk = (e: Event) => {
      const { kind, target } = (e as CustomEvent).detail;
      openForm(target, kind);
    };
    window.addEventListener("v2-feedback", onAsk);
    return () => window.removeEventListener("v2-feedback", onAsk);
  }, [openForm]);

  // Selecting page text offers a comment on it: by mouse, keyboard or a
  // long press, so it listens for the selection settling, not for a click.
  useEffect(() => {
    if (!on || !me) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const target = selectionTarget();
        if (!target) return setChip(null);
        const rect = window
          .getSelection()!
          .getRangeAt(0)
          .getBoundingClientRect();
        setChip({
          x: Math.min(rect.left + rect.width / 2, innerWidth - 90),
          y: Math.min(rect.bottom + 8, innerHeight - 48),
          target,
        });
      }, 250);
    };
    const onScroll = () => setChip(null);
    document.addEventListener("selectionchange", onChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Text selected before the API answered still gets its chip.
    onChange();
    return () => {
      clearTimeout(timer);
      document.removeEventListener("selectionchange", onChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [on, me]);

  // Pointing: outline what's under the pointer, take it on click.
  useEffect(() => {
    if (!picking) return;
    const under = (x: number, y: number) => {
      const hit = document.elementFromPoint(x, y);
      if (!hit || ours(hit)) return null;
      return hit.closest("[data-rid]") ?? hit.closest(PICKABLE);
    };
    const onMove = (e: PointerEvent) => {
      const el = under(e.clientX, e.clientY);
      setBox(el ? el.getBoundingClientRect() : null);
    };
    const onClick = (e: MouseEvent) => {
      if (ours(e.target as Element)) return;
      e.preventDefault();
      e.stopPropagation();
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      // Images and diagrams keep the spot; text blocks don't need it.
      const media = hit?.closest("img, svg, canvas");
      const el = media ?? under(e.clientX, e.clientY);
      setPicking(false);
      setBox(null);
      if (el) openForm(targetOf(el, { x: e.clientX, y: e.clientY }));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPicking(false);
      setBox(null);
    };
    document.addEventListener("pointermove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("fb-picking");
    return () => {
      document.removeEventListener("pointermove", onMove, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("fb-picking");
    };
  }, [picking, openForm]);

  // A new page closes whatever was open.
  useEffect(() => {
    setPanel(false);
    setChip(null);
    setPicking(false);
  }, [pathname]);

  if (!on) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !body.trim()) return;
    setSending(true);
    try {
      try {
        localStorage.setItem(NAME_KEY, name);
      } catch {}
      const item = form.target?.rid
        ? REVIEW_BY_ID.get(form.target.rid)
        : undefined;
      // "Wrong" about a reviewable item flags it: a review, with the note.
      const flag = form.kind === "wrong" && item;
      await send({
        kind: flag ? "review" : form.kind,
        verdict: flag ? "wrong" : undefined,
        body,
        target: form.target,
        name: name || undefined,
        hash: item?.hash,
      });
      setForm(null);
      setBody("");
      setNotice("Thanks. Sent.");
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      setNotice((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fb-root" aria-live="polite">
      {picking && box && (
        <div
          className="fb-box"
          style={{
            left: box.left - 3,
            top: box.top - 3,
            width: box.width + 6,
            height: box.height + 6,
          }}
        />
      )}
      {picking && (
        <p className="fb-hint">
          Click what you want to comment on. <kbd>Esc</kbd> cancels.
        </p>
      )}

      {chip && !form && (
        <button
          type="button"
          className="fb-chip"
          style={{ left: chip.x, top: chip.y }}
          onClick={() => openForm(chip.target)}
        >
          Comment on this
        </button>
      )}

      {form && (
        <form className="fb-form" onSubmit={submit}>
          <p className="fb-on">
            <span className="label">About</span>
            <button
              type="button"
              className="fb-link"
              onClick={() => show(form.target)}
            >
              {describe(form.target)}
            </button>
          </p>
          <fieldset className="fb-kinds">
            <legend className="sr-only">Kind</legend>
            {(Object.keys(KIND_LABEL) as (keyof typeof KIND_LABEL)[]).map(
              (k) => (
                <label key={k}>
                  <input
                    type="radio"
                    name="fb-kind"
                    checked={form.kind === k}
                    onChange={() => setForm({ ...form, kind: k })}
                  />
                  {KIND_LABEL[k]}
                </label>
              ),
            )}
          </fieldset>
          <textarea
            ref={textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={
              form.kind === "wrong"
                ? "What's wrong, and what's right?"
                : "Your comment"
            }
            rows={4}
            maxLength={4000}
            required
          />
          <input
            className="fb-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Your name (optional${me?.who ? `; you're signed in as ${me.who}` : ""})`}
            maxLength={60}
          />
          <p className="fb-actions">
            <button
              type="submit"
              className="button"
              disabled={sending || !body.trim()}
            >
              {sending ? "Sending…" : "Send"}
            </button>
            <button
              type="button"
              className="button button-ghost"
              onClick={() => setForm(null)}
            >
              Cancel
            </button>
          </p>
        </form>
      )}

      {panel && !form && (
        <div className="fb-panel" role="dialog" aria-label="Feedback">
          {me ? (
            <>
              <p className="fb-actions">
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setPanel(false);
                    setPicking(true);
                  }}
                >
                  Point at something
                </button>
                <button
                  type="button"
                  className="button button-ghost"
                  onClick={() => openForm(undefined)}
                >
                  This page
                </button>
              </p>
              <p className="fine">Or select any text to comment on it.</p>
            </>
          ) : (
            <p className="fine">
              Feedback isn't open here (sign in on the live site to leave some).
              The review marks still show.
            </p>
          )}
          <p className="fine">
            <button
              type="button"
              className="fb-link"
              onClick={() => setOn(false)}
            >
              Hide review marks and feedback
            </button>{" "}
            (bring them back with <code>?review=on</code>)
          </p>
        </div>
      )}

      {notice && <p className="fb-notice">{notice}</p>}

      <button
        type="button"
        className="fb-button"
        aria-expanded={panel}
        onClick={() => {
          setForm(null);
          setPicking(false);
          setPanel((p) => !p);
        }}
      >
        Feedback
      </button>
    </div>
  );
}
