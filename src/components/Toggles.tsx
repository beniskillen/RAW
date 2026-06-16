import { useEffect, useState } from 'react'

/** Black & White toggle + Reduce Motion toggle (fixed, bottom corners). */
export default function Toggles() {
  const [bw, setBw] = useState(false)

  useEffect(() => {
    let on = false
    try { on = localStorage.getItem('raw-bw') === '1' } catch {}
    setBw(on)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('bw', bw)
  }, [bw])

  const toggleBw = () => {
    setBw((prev) => {
      const next = !prev
      try { localStorage.setItem('raw-bw', next ? '1' : '0') } catch {}
      return next
    })
  }

  const toggleMotion = () => {
    const reduced = document.documentElement.dataset.reduce === 'true'
    document.documentElement.dataset.reduce = String(!reduced)
    location.reload()
  }

  return (
    <>
      <button className="rm-toggle bw-toggle" id="bwToggle" aria-pressed={bw} onClick={toggleBw}>
        {bw ? 'Color' : 'B\u0026W'}
      </button>
      <button className="rm-toggle" id="rmToggle" onClick={toggleMotion}>
        Reduce Motion
      </button>
    </>
  )
}
