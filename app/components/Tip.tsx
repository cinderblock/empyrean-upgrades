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

  // The panel sits in the top layer (a popover), so no card or table that
  // clips its overflow can cut it off. That also takes it out of the flow:
  // place it by hand, under the trigger's right edge, kept on screen, and
  // above the trigger when there's no room below. Too tall for either side, it
  // takes the roomier one and scrolls, so it never covers its own trigger.
  // Again on scroll and resize.
  useLayoutEffect(() => {
    const el = panel.current;
    const trigger = root.current;
    if (!open || !el || !trigger) return;
    if (!el.matches(":popover-open")) el.showPopover();
    const place = () => {
      el.style.maxHeight = "";
      const t = trigger.getBoundingClientRect();
      const p = el.getBoundingClientRect();
      const margin = 8;
      const gap = 7;
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const left = Math.min(
        Math.max(margin, t.right - p.width),
        vw - margin - p.width,
      );
      const below = t.bottom + gap;
      const roomBelow = vh - margin - below;
      const roomAbove = t.top - gap - margin;
      let top: number;
      if (p.height <= roomBelow) top = below;
      else if (p.height <= roomAbove) top = t.top - gap - p.height;
      else if (roomBelow >= roomAbove) {
        el.style.maxHeight = `${roomBelow}px`;
        top = below;
      } else {
        el.style.maxHeight = `${roomAbove}px`;
        top = margin;
      }
      el.style.left = `${Math.max(margin, left)}px`;
      el.style.top = `${top}px`;
    };
    place();
    window.addEventListener("scroll", place, { capture: true, passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, { capture: true });
      window.removeEventListener("resize", place);
      if (el.matches(":popover-open")) el.hidePopover();
    };
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
        popover="manual"
      >
        {children}
      </span>
    </span>
  );
}
