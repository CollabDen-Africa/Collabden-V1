/**
 * BackgroundPattern Component
 * Renders large blue glowing circles (868x868px) across the website
 * 
 * Circle layout:
 * - CENTER circles: Fully visible, positioned at various scroll depths
 * - RIGHT EDGE circles: Half visible, pushed 434px beyond right edge
 * - LEFT EDGE circles: Half visible, pushed 434px beyond left edge
 */
export default function BackgroundPattern() {
  return (
    <div className="bg-pattern-wrapper" aria-hidden="true">
      {/* CENTER circles - Fully visible */}
      <div className="bg-circle bg-circle--center-1" />
      <div className="bg-circle bg-circle--center-2" />
      <div className="bg-circle bg-circle--center-3" />
      <div className="bg-circle bg-circle--center-4" />

      {/* RIGHT EDGE circles - Half visible */}
      <div className="bg-circle bg-circle--right-1" />
      <div className="bg-circle bg-circle--right-2" />
      <div className="bg-circle bg-circle--right-3" />

      {/* LEFT EDGE circles - Half visible */}
      <div className="bg-circle bg-circle--left-1" />
      <div className="bg-circle bg-circle--left-2" />
      <div className="bg-circle bg-circle--left-3" />
    </div>
  );
}
