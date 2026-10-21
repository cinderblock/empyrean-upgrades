import {
  itemRange,
  moneyRange,
  subtotal,
  unitRange,
  type LineItem,
} from "../content/budget";
import Confidence from "./Confidence";

/** Line items as a table: what, how many, each, total, and how sure. */
export default function LineItems({
  items,
  caption,
}: {
  items: LineItem[];
  caption: string;
}) {
  return (
    <div className="table-wrap">
      <table className="items">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col" className="num">
              Qty
            </th>
            <th scope="col" className="num">
              Each
            </th>
            <th scope="col" className="num">
              Total
            </th>
            <th scope="col">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} id={`item-${item.id}`}>
              <th scope="row">
                {item.name}
                {item.detail && <span className="item-sub">{item.detail}</span>}
                {item.qtyNote && (
                  <span className="item-sub">Count: {item.qtyNote}</span>
                )}
              </th>
              <td className="num">{item.qty.toLocaleString("en-US")}</td>
              <td className="num">{moneyRange(unitRange(item))}</td>
              <td className="num">{moneyRange(itemRange(item))}</td>
              <td>
                <Confidence item={item} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={3}>
              Parts
            </th>
            <td className="num">{moneyRange(subtotal(items))}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
