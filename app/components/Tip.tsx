import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * On-demand detail that works on a phone: tap (or click, or Enter) the
 * trigger to open it, tap anywhere else or press Escape to close. A mouse
 * hovering also opens it. Never `title=`, which a touch screen can't show.
 *
 * Use it for detail that would clutter the page, never for the only copy of
 * something a reader needs: every figure behind a Tip is also on /budget.
 */
export default function Tip({
  label,
  children,
  className,
}: {
  /** The trigger's visible text. */
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  /** Opened by a hovering mouse, so leaving closes it again. */
  const byHover = useRef(false);
  const root = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (root.current?.contains(e.target as Node)) return;
      byHover.current = false;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      byHover.current = false;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep the panel on screen: nudge it sideways if it would overflow.
  useLayoutEffect(() => {
    const el = panel.current;
    if (!open || !el) return;
    el.style.setProperty("--tip-shift", "0px");
    const rect = el.getBoundingClientRect();
    const margin = 8;
    let shift = 0;
    if (rect.left < margin) shift = margin - rect.left;
    else if (rect.right > window.innerWidth - margin) {
      shift = window.innerWidth - margin - rect.right;
    }
    el.style.setProperty("--tip-shift", `${shift}px`);
  }, [open]);

  return (
    <span
      ref={root}
      className={`tip${className ? ` ${className}` : ""}`}
      data-open={open || undefined}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || open) return;
        byHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse" || !byHover.current) return;
        byHover.current = false;
        setOpen(false);
      }}
    >
      <button
        type="button"
        className="tip-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          // A click on a hover-opened tip pins it open rather than closing
          // it. Read from the ref: the hover's render may not have committed
          // yet, so `open` here can be stale.
          if (byHover.current) {
            byHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((o) => !o);
        }}
      >
        {label}
      </button>
      <span
        ref={panel}
        id={id}
        className="tip-panel"
        role="note"
        hidden={!open}
      >
        {children}
      </span>
    </span>
  );
}
