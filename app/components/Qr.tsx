import QRCode from "qrcode";

/**
 * A QR code as inline SVG, drawn at prerender time: the printed sheet's way
 * back to the site. One path of unit squares, so it prints crisp at any size.
 */
export default function Qr({ value, label }: { value: string; label: string }) {
  const qr = QRCode.create(value, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  const quiet = 2;
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (qr.modules.get(x, y)) d += `M${x + quiet} ${y + quiet}h1v1h-1z`;
    }
  }
  const full = size + quiet * 2;
  return (
    <svg
      className="qr"
      viewBox={`0 0 ${full} ${full}`}
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
    >
      <rect width={full} height={full} fill="#fff" />
      <path d={d} fill="#000" />
    </svg>
  );
}
