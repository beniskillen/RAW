/** Floating spinning RAW badge that becomes the custom cursor. */
export default function OrbitCursor() {
  return (
    <div className="raw-orbit" id="rawOrbit" aria-hidden="true">
      <span className="orbit-disc" />
      <svg className="orbit-text" id="orbitText" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="orbitPath" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text fontSize="15">
          <textPath href="#orbitPath" startOffset="0">
            THE RAW • GLOBAL CULTURE • ACCESS IS EVERYTHING • 
          </textPath>
        </text>
      </svg>
      <span className="orbit-mark">
        <img src="/rmark.svg" alt="" />
      </span>
    </div>
  )
}
