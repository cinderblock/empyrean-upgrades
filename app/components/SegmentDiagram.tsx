import type { CategoryId } from "../content/categories";

/**
 * Inside one truss segment: the power box beside the node box, mains never
 * crossing into the electronics, and every cable through a sealed entry.
 * `focus` brightens the part a category page is about.
 */
export default function SegmentDiagram({ focus }: { focus?: CategoryId }) {
  return (
    <figure className="seg" data-focus={focus}>
      <div className="seg-row">
        <div className="seg-ext">
          <span className="seg-cable seg-cable-ac">
            Mains from the previous segment
          </span>
          <span className="seg-cable seg-cable-eth">
            Ethernet from the previous segment
          </span>
        </div>

        <div className="seg-box seg-power">
          <h4>Power box</h4>
          <ul>
            <li>The 30 A trunk passes through, sealed in and out</li>
            <li>A ground-fault breaker for this segment</li>
            <li>12 V supply for the light controller (and pixels)</li>
            <li>54 V supply for the switch and its PoE ports</li>
          </ul>
        </div>

        <div className="seg-dc" aria-hidden="true">
          <span>DC only</span>
        </div>

        <div className="seg-box seg-node">
          <h4>Node box</h4>
          <ul>
            <li>
              <strong>Light controller</strong> (PixLite E4-S Mk3): 4 spokes
              wired, 4 outputs held for 128 spokes
            </li>
            <li>
              <strong>Switch</strong> (USW-Ultra): ring in, ring out, the
              controller, an internet port, 4 spare PoE+ ports
            </li>
          </ul>
        </div>

        <div className="seg-ext seg-ext-out">
          <span className="seg-cable seg-cable-ac">
            Mains to the next segment
          </span>
          <span className="seg-cable seg-cable-eth">
            Ethernet to the next segment
          </span>
          <span className="seg-cable seg-cable-px">4 spokes of pixels</span>
        </div>
      </div>
      <figcaption>
        One of the 16 segments. Every cable enters a box through a sealed gland
        or connector; mains stays in the power box, and only low-voltage DC
        crosses to the node box.
      </figcaption>
    </figure>
  );
}
