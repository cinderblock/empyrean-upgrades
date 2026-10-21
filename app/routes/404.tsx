import { Link, type MetaFunction } from "react-router";
import Shell from "../components/Shell";
import { pageMeta } from "../meta";

export const meta: MetaFunction = () =>
  pageMeta("Not found: Empyrean Gate V2", "There's no page here.");

export default function NotFound() {
  return (
    <Shell>
      <section className="hero hero-small">
        <p className="kicker">404</p>
        <h1>Nothing here.</h1>
        <p className="lede">
          That page doesn't exist, or has moved. The{" "}
          <Link to="/">overview</Link> and the <Link to="/budget">budget</Link>{" "}
          have everything.
        </p>
      </section>
    </Shell>
  );
}
