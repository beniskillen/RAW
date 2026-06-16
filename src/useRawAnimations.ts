import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ports the original vanilla animation stack (Lenis + GSAP + ScrollTrigger)
 * into a single React effect. Runs once after the first paint.
 */
export function useRawAnimations() {
  useEffect(() => {
    const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches
    let motionOn = !REDUCE
    if (REDUCE) document.documentElement.dataset.reduce = 'true'

    let lenis: Lenis | null = null
    const tickers: Array<(t: number) => void> = []
    const cleanups: Array<() => void> = []
    let rafIds: number[] = []

    /* ---------- Lenis smooth scroll, synced to GSAP ticker ---------- */
    function initLenis() {
      if (!motionOn) return
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
      lenis.on('scroll', () => ScrollTrigger.update())
      const fn = (t: number) => lenis && lenis.raf(t * 1000)
      gsap.ticker.add(fn)
      tickers.push(fn)
      gsap.ticker.lagSmoothing(0)
    }

    /* ---------- in-view reveals ---------- */
    function initReveals() {
      const els = [...document.querySelectorAll('.reveal, .lines')]
      if (!motionOn) { els.forEach((e) => e.classList.add('is-in')); return }
      document.querySelectorAll('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 42, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        })
      })
      document.querySelectorAll('.lines').forEach((el) => {
        gsap.to(el.querySelectorAll('.ln > span'), {
          y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onStart: () => el.classList.add('is-in'),
        })
      })
    }

    /* ---------- hero intro ---------- */
    function initHero() {
      if (!motionOn) {
        document.querySelectorAll<HTMLElement>('.hero h1 .line span').forEach((s) => (s.style.transform = 'none'))
        return
      }
      gsap.set('.hero h1 .line span', { yPercent: 115 })
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('.hero h1 .line span', { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0.2)
        .from('.hero .lead', { autoAlpha: 0, y: 24, duration: 0.8 }, '-=.6')
        .from('.hero-cta .btn', { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.1 }, '-=.5')
    }

    /* ---------- parallax ---------- */
    function initParallax() {
      if (!motionOn) return
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || '') || 0.2
        gsap.to(el, {
          yPercent: amt * 100, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }

    /* ---------- infinite marquees ---------- */
    function initMarquees() {
      document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((m) => {
        const track = m.querySelector<HTMLElement>('.track')
        if (!track) return
        const dir = m.dataset.reverse === 'true' ? -1 : 1
        const speed = (parseFloat(m.dataset.speed || '') || 0.6) * dir
        if (!motionOn) return
        const w = track.scrollWidth / 2
        let x = 0
        const fn = () => {
          x -= speed
          if (dir > 0 && x <= -w) x = 0
          if (dir < 0 && x >= 0) x = -w
          track.style.transform = 'translateX(' + x + 'px)'
        }
        gsap.ticker.add(fn)
        tickers.push(fn)
      })
    }

    /* ---------- animated counters ---------- */
    function initCounters() {
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const end = +(el.dataset.count || 0)
        if (!motionOn) { el.textContent = String(end); return }
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString() },
        })
      })
    }

    /* ---------- services accordion ---------- */
    function initServices() {
      document.querySelectorAll<HTMLElement>('[data-svc]').forEach((s) => {
        const handler = () => {
          const open = s.classList.contains('open')
          document.querySelectorAll('[data-svc]').forEach((o) => o.classList.remove('open'))
          if (!open) s.classList.add('open')
          setTimeout(() => ScrollTrigger.refresh(), 450)
        }
        s.addEventListener('click', handler)
        cleanups.push(() => s.removeEventListener('click', handler))
      })
    }

    /* ---------- magnetic buttons ---------- */
    function initMagnetic() {
      if (!motionOn || matchMedia('(pointer:coarse)').matches) return
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect()
          gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4 })
        }
        const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.4)' })
        btn.addEventListener('mousemove', move)
        btn.addEventListener('mouseleave', leave)
        cleanups.push(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave) })
      })
    }

    /* ---------- nav state + mobile menu + smooth anchor scroll ---------- */
    function initNav() {
      const nav = document.getElementById('nav')
      if (!nav) return
      const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
      const links = document.querySelector<HTMLElement>('.nav-links')
      const toggle = document.querySelector<HTMLElement>('.menu-toggle')
      if (toggle && links) {
        const t = () => {
          const open = links.style.display === 'flex'
          Object.assign(links.style, {
            display: open ? '' : 'flex', position: 'absolute', top: '100%', left: '0', right: '0',
            flexDirection: 'column', gap: '4px', padding: '20px var(--gut)', background: 'rgba(10,8,7,.96)',
          })
        }
        toggle.addEventListener('click', t)
        cleanups.push(() => toggle.removeEventListener('click', t))
      }
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        const click = (e: Event) => {
          const sel = a.getAttribute('href')
          if (!sel || sel === '#') return
          const target = document.querySelector<HTMLElement>(sel)
          if (target) {
            e.preventDefault()
            if (lenis) lenis.scrollTo(target, { offset: -70 })
            else target.scrollIntoView({ behavior: 'smooth' })
          }
        }
        a.addEventListener('click', click)
        cleanups.push(() => a.removeEventListener('click', click))
      })
    }

    /* ---------- inductee index: hover-follow image + scroll-active row ---------- */
    function initIndexList() {
      const sec = document.getElementById('featured')
      const rows = [].slice.call(document.querySelectorAll('.irow')) as HTMLElement[]
      const float = document.getElementById('ifloat')
      if (!sec || !rows.length || !float) return
      const imgs = [].slice.call(float.querySelectorAll('img')) as HTMLElement[]
      function setActive(key: string | null, row: HTMLElement) {
        imgs.forEach((im) => im.classList.toggle('on', im.getAttribute('data-key') === key))
        rows.forEach((r) => r.classList.toggle('active', r === row))
      }
      const fine = matchMedia('(hover:hover) and (pointer:fine)').matches && motionOn
      if (fine) {
        let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty
        rows.forEach((row) => {
          row.addEventListener('mouseenter', () => { setActive(row.getAttribute('data-img'), row); float!.classList.add('show') })
        })
        const mm = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
        sec.addEventListener('mousemove', mm, { passive: true })
        sec.addEventListener('mouseleave', () => { float!.classList.remove('show'); rows.forEach((r) => r.classList.remove('active')) })
        const loop = () => {
          cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14
          float!.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) translate(-50%,-50%)'
          rafIds.push(requestAnimationFrame(loop))
        }
        loop()
      } else {
        float.classList.add('show', 'pinned')
        const onScroll = () => {
          const mid = innerHeight / 2; let best: HTMLElement | null = null, bd = 1e9
          rows.forEach((r) => { const b = r.getBoundingClientRect(); const c = b.top + b.height / 2; const d = Math.abs(c - mid); if (d < bd) { bd = d; best = r } })
          const inView = sec.getBoundingClientRect()
          const within = inView.top < innerHeight * 0.85 && inView.bottom > innerHeight * 0.15
          float!.classList.toggle('show', within)
          if (best) setActive(best.getAttribute('data-img'), best)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        onScroll()
        cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) })
      }
    }

    /* ---------- RAW orbit badge: custom cursor + scroll-driven spin ---------- */
    function initOrbit() {
      const orbit = document.getElementById('rawOrbit')
      const ring = document.getElementById('orbitText')
      if (!orbit || !ring) return
      const coarse = matchMedia('(pointer:coarse)').matches
      if (coarse || !motionOn) { orbit.style.display = 'none'; return }
      document.documentElement.classList.add('orbit-cursor')
      const HOT = 'a,button,input,textarea,select,label,.tile,.irow,[data-svc],[role="button"]'
      let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, auto = 0, rot = 0, started = false
      const mm = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (!started) { started = true; orbit.classList.add('live') } }
      window.addEventListener('mousemove', mm, { passive: true })
      const leave = () => orbit.classList.remove('live')
      const enter = () => { if (started) orbit.classList.add('live') }
      document.addEventListener('mouseleave', leave)
      document.addEventListener('mouseenter', enter)
      const over = (e: MouseEvent) => { const t = e.target as Element; if (t.closest && t.closest(HOT)) orbit.classList.add('hot') }
      const out = (e: MouseEvent) => { const t = e.target as Element; if (t.closest && t.closest(HOT)) orbit.classList.remove('hot') }
      const down = () => orbit.classList.add('press')
      const up = () => orbit.classList.remove('press')
      window.addEventListener('mouseover', over, { passive: true })
      window.addEventListener('mouseout', out, { passive: true })
      window.addEventListener('mousedown', down, { passive: true })
      window.addEventListener('mouseup', up, { passive: true })
      const frame = () => {
        auto += 0.2
        cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2
        rot = auto + window.scrollY * 0.18
        ring.style.transform = 'rotate(' + rot + 'deg)'
        orbit.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) translate(-50%,-50%)'
        rafIds.push(requestAnimationFrame(frame))
      }
      frame()
      cleanups.push(() => {
        window.removeEventListener('mousemove', mm)
        document.removeEventListener('mouseleave', leave)
        document.removeEventListener('mouseenter', enter)
        window.removeEventListener('mouseover', over)
        window.removeEventListener('mouseout', out)
        window.removeEventListener('mousedown', down)
        window.removeEventListener('mouseup', up)
        document.documentElement.classList.remove('orbit-cursor')
      })
    }

    function boot() {
      initLenis()
      initHero(); initReveals(); initParallax(); initMarquees()
      initCounters(); initServices(); initMagnetic(); initNav(); initOrbit(); initIndexList()
      ScrollTrigger.refresh()
    }

    let started = false
    const start = () => { if (started) return; started = true; boot() }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    return () => {
      window.removeEventListener('load', start)
      tickers.forEach((fn) => gsap.ticker.remove(fn))
      rafIds.forEach((id) => cancelAnimationFrame(id))
      cleanups.forEach((fn) => fn())
      ScrollTrigger.getAll().forEach((st) => st.kill())
      if (lenis) lenis.destroy()
    }
  }, [])
}
