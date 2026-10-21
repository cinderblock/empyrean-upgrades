import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { DRAFT } from "../content/budget";
import { CATEGORY_LIST } from "../content/categories";
import { SITE } from "../content/site";

function Mark() {
  return (
    <svg className="mark" viewBox="-50 -50 100 100" aria-hidden="true">
      <circle r="44" />
      <circle r="15" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={(Math.sin(a) * 15).toFixed(1)}
            y1={(-Math.cos(a) * 15).toFixed(1)}
            x2={(Math.sin(a) * 44).toFixed(1)}
            y2={(-Math.cos(a) * 44).toFixed(1)}
          />
        );
      })}
    </svg>
  );
}

/** Header, footer and the draft banner around every page. */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="masthead">
        <NavLink to="/" className="brand" end>
          <Mark />
          <span>
            Empyrean Gate <b>{SITE.version}</b>
          </span>
        </NavLink>
        <nav aria-label="Site">
          <NavLink to="/" end>
            Overview
          </NavLink>
          <NavLink to="/budget">Budget</NavLink>
          <details className="nav-plans">
            <summary>Plans</summary>
            <ul>
              {CATEGORY_LIST.map((c) => (
                <li key={c.id}>
                  <NavLink to={`/plans/${c.id}`}>{c.name}</NavLink>
                </li>
              ))}
            </ul>
          </details>
          <a
            className="nav-cta"
            href={SITE.donate}
            target="_blank"
            rel="noreferrer"
          >
            Give
          </a>
        </nav>
      </header>
      {DRAFT && (
        <p className="draft-banner" role="note">
          Draft: these figures are early estimates, not quotes. Every number
          says how sure we are of it.
        </p>
      )}
      <main id="main">{children}</main>
      <footer className="footer">
        <p>
          The Empyrean Gate is a project of the{" "}
          <a href={SITE.entheos} target="_blank" rel="noreferrer">
            Entheos
          </a>{" "}
          community. The story, photos and the pattern playground are at{" "}
          <a href={SITE.parent}>empyreangate.org</a>.
        </p>
        <p className="footer-fine">
          Figures gathered {SITE.figuresAsOf}. Totals are the high end of each
          range plus contingency, rounded up.
        </p>
      </footer>
    </>
  );
}
