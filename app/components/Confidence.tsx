import { CONFIDENCE, type LineItem } from "../content/budget";
import Tip from "./Tip";

/** A line item's confidence, with what it means and where it came from. */
export default function Confidence({ item }: { item: LineItem }) {
  const c = CONFIDENCE[item.confidence];
  return (
    <Tip className={`confidence confidence-${item.confidence}`} label={c.label}>
      <strong>{c.label}.</strong> {c.explain}
      {item.note && <span className="tip-line">{item.note}</span>}
      {item.source && (
        <span className="tip-line">
          Price:{" "}
          <a href={item.source.url} target="_blank" rel="noreferrer">
            {item.source.label}
          </a>
        </span>
      )}
      {item.datasheet && (
        <span className="tip-line">
          <a href={item.datasheet} target="_blank" rel="noreferrer">
            Maker's specifications
          </a>
        </span>
      )}
    </Tip>
  );
}
