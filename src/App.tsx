import { useRawAnimations } from './useRawAnimations'
import OrbitCursor from './components/OrbitCursor'
import Toggles from './components/Toggles'

const YEAR = new Date().getFullYear()

export default function App() {
  useRawAnimations()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const btn = e.currentTarget.querySelector('.btn')
    if (btn) btn.textContent = "Sent \u2014 we'll be in touch"
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <OrbitCursor />

      {/* ====================== NAV ====================== */}
      <header className="nav" id="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="The Raw home">
            <span className="mark"><img src="/lockup.svg" alt="The Raw" /></span>
          </a>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#results">Results</a>
            <a href="#roster">Talent</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-cta">
            <a className="btn primary" href="#contact">Let's Talk</a>
            <button className="menu-toggle" aria-label="Menu">&#9776;</button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ====================== HERO ====================== */}
        <section className="hero" id="hero">
          <div className="hero-video" id="heroVideo" aria-hidden="true">
            <iframe
              src="https://www.youtube-nocookie.com/embed/wdT2-MivGiM?autoplay=1&mute=1&loop=1&playlist=wdT2-MivGiM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3"
              title="The Raw background reel"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          <img className="hero-emblem" src="/hero-emblem.webp" alt="" data-parallax="0.18" />
          <div className="wrap">
            <span className="kicker eyebrow">The Raw &middot; Global Culture &middot; Est. 1990</span>
            <h1 className="hero-title">
              <span className="line"><span>Access</span></span>
              <span className="line"><span className="accent">Is Everything</span></span>
            </h1>
            <p className="lead">Your backstage pass to talent &amp; influence. From cultural icons to unforgettable campaigns, let's create moments that matter.</p>
            <div className="hero-cta">
              <a className="btn primary magnetic" href="#services">Discover How We Work</a>
              <a className="btn ghost magnetic" href="#contact">Start a Project</a>
            </div>
          </div>
          <div className="scrollcue"><span className="bar" /> Scroll</div>
        </section>

        {/* ====================== MARQUEE ====================== */}
        <div className="marquee" data-marquee data-speed="0.6">
          <div className="track">
            <span className="item">Our Talent <span className="dot" /> Is Your Opportunity <span className="dot" /></span>
            <span className="item outline">Our Talent <span className="dot" /> Is Your Opportunity <span className="dot" /></span>
            <span className="item">Our Talent <span className="dot" /> Is Your Opportunity <span className="dot" /></span>
            <span className="item outline">Our Talent <span className="dot" /> Is Your Opportunity <span className="dot" /></span>
          </div>
        </div>

        {/* ====================== WHO WE ARE ====================== */}
        <section className="block who" id="about">
          <div className="wrap grid2">
            <div className="reveal">
              <span className="kicker eyebrow">Who We Are</span>
              <h2 className="lines"><span className="ln"><span>We're not here</span></span><span className="ln"><span>to fit in. We're here</span></span><span className="ln"><span>to shake things up.</span></span></h2>
            </div>
            <div className="body reveal">
              <p>Your brand deserves to be more than just in the room; it deserves to <strong>own the conversation.</strong></p>
              <p><strong>The Raw</strong> is not your average talent agency &mdash; we're the industry's backstage pass for brands that want to make noise.</p>
              <p>We connect the dots between top-tier talent and ambitious clients to unlock sponsorships and endorsements that make an impact.</p>
              <a className="btn ghost magnetic" href="#services" style= marginTop: 14 >Discover How We Work</a>
            </div>
          </div>
        </section>

        {/* ====================== SERVICES ====================== */}
        <section className="block services" id="services">
          <div className="wrap">
            <div className="svc-head">
              <div className="reveal">
                <span className="kicker eyebrow">Sponsorships, Partnerships &amp; Endorsements</span>
                <h2 className="dh" style= marginTop: 14 >Connecting<br />Talent &amp; Brands</h2>
              </div>
              <p className="lead reveal" style= maxWidth: '34ch' >From strategy to execution &mdash; end-to-end solutions that make an impact.</p>
            </div>
            <div className="svc-list">
              <article className="svc reveal" data-svc>
                <span className="num">01</span>
                <div><h3>Sponsorships &amp; Endorsements</h3><div className="detail"><p>We bridge the gap between talent and brands, creating powerful partnerships that drive real impact &mdash; across NRL, Rugby Union, UFC, NBA, Boxing, Motorsport and Soccer, plus micro-to-macro influencers, music artists and cultural trendsetters. Collaborations that feel authentic and mutually beneficial.</p></div></div>
                <span className="plus">+</span>
              </article>
              <article className="svc reveal" data-svc>
                <span className="num">02</span>
                <div><h3>Talent Collaboration</h3><div className="detail"><p>Access to 1,000+ talents and experience with 100+ brands. We've been behind the hype of some of the biggest R&amp;B festivals in the Southern Hemisphere, like Juicy Fest &mdash; and we position your brand at the forefront of what's trending.</p></div></div>
                <span className="plus">+</span>
              </article>
              <article className="svc reveal" data-svc>
                <span className="num">03</span>
                <div><h3>Festival Activation</h3><div className="detail"><p>We bring brands and festivals together to create unforgettable experiences. On-site and digital activations that are immersive, interactive and culturally relevant &mdash; from large-scale sponsorships to curated brand moments that match the festival's energy and your vision.</p></div></div>
                <span className="plus">+</span>
              </article>
              <article className="svc reveal" data-svc>
                <span className="num">04</span>
                <div><h3>Custom Solutions</h3><div className="detail"><p>Every brand and campaign is unique. From high-quality collateral to tailored digital assets for athletes, talent and campaigns, our in-house marketing team delivers seamless integration and flawless execution &mdash; strategies that maximise engagement and drive real results.</p></div></div>
                <span className="plus">+</span>
              </article>
            </div>
            <div style= marginTop: 40  className="reveal"><a className="btn primary magnetic" href="#contact">Let's Talk Strategy</a></div>
          </div>
        </section>

        {/* ====================== STATS ====================== */}
        <section className="block stats" id="results">
          <div className="wrap">
            <span className="kicker eyebrow reveal" style= justifyContent: 'center' >Proven Success With The Raw</span>
            <div className="stat-grid">
              <div className="stat reveal"><div className="n"><span data-count="25">0</span>+</div><div className="lbl">Major Festival Activations</div></div>
              <div className="stat reveal"><div className="n"><span data-count="100">0</span>+</div><div className="lbl">Brands Worked With</div></div>
              <div className="stat reveal"><div className="n"><span data-count="1000">0</span>+</div><div className="lbl">Influencers Activated</div></div>
            </div>
          </div>
        </section>

        {/* ====================== CASE STUDY ====================== */}
        <section className="block case">
          <div className="wrap">
            <span className="kicker eyebrow reveal">Cover Story</span>
            <h2 className="dh reveal" style= marginTop: 14 >From In The Room<br />To Owning It</h2>
            <div className="case-row reveal">
              <div className="case-cell"><span className="tag">Client Challenge</span><p>Brand X needed to break into the cultural conversation.</p></div>
              <div className="case-cell"><span className="tag">Solution</span><p>We connected them with Celebrity Y, creating a viral campaign that reached Z million impressions.</p></div>
              <div className="case-cell"><span className="tag">Result</span><p>ROI increased by 400%, setting new industry benchmarks.</p></div>
            </div>
          </div>
        </section>

        {/* ====================== INDUCTEE INDEX (scroll reveal) ====================== */}
        <section className="index-list" id="featured">
          <div className="wrap">
            <div className="head">
              <span className="kicker eyebrow reveal">Built For The Culture</span>
              <h2 className="dh reveal" style= marginTop: 14 >Worn Worldwide</h2>
              <p className="reveal">A fusion of anti-hero energy and global culture. Scroll the index &mdash; every chapter of The Raw, in focus.</p>
            </div>
          </div>
          <div className="ilist-wrap">
            <ul className="ilist" id="ilist">
              <li className="irow reveal" data-img="cover"><a href="#contact"><span className="idx">001</span><span className="iname">Global Culture</span></a></li>
              <li className="irow reveal" data-img="cover2"><a href="#contact"><span className="idx">002</span><span className="iname">Cover Story</span></a></li>
              <li className="irow reveal" data-img="street"><a href="#contact"><span className="idx">003</span><span className="iname">Street Energy</span></a></li>
              <li className="irow reveal" data-img="street2"><a href="#contact"><span className="idx">004</span><span className="iname">Chaos &amp; Culture</span></a></li>
              <li className="irow reveal" data-img="cover"><a href="#contact"><span className="idx">005</span><span className="iname">Festival Access</span></a></li>
              <li className="irow reveal" data-img="street"><a href="#contact"><span className="idx">006</span><span className="iname">Worn Worldwide</span></a></li>
            </ul>
          </div>
          <figure className="ifloat" id="ifloat" aria-hidden="true">
            <img data-key="cover" src="/m_cover.webp" alt="" />
            <img data-key="cover2" src="/m_cover2.webp" alt="" />
            <img data-key="street" src="/m_street.webp" alt="" />
            <img data-key="street2" src="/m_street2.webp" alt="" />
          </figure>
        </section>

        {/* ====================== ROSTER ====================== */}
        <section className="roster" id="roster">
          <div className="wrap">
            <span className="kicker eyebrow reveal">Experience With A-List Talent</span>
            <h2 className="dh reveal" style= marginTop: 14 >The Names<br />We Move With</h2>
          </div>
          <div className="rows">
            <div className="marquee alt" data-marquee data-speed="0.5"><div className="track">
              <span className="item outline">Ashanti <span className="dot" /> Twista <span className="dot" /> T-Pain <span className="dot" /> T.I. <span className="dot" /> Trey Songz <span className="dot" /> Mario <span className="dot" /> Fabolous <span className="dot" /> Nelly <span className="dot" /></span>
              <span className="item outline">Ashanti <span className="dot" /> Twista <span className="dot" /> T-Pain <span className="dot" /> T.I. <span className="dot" /> Trey Songz <span className="dot" /> Mario <span className="dot" /> Fabolous <span className="dot" /> Nelly <span className="dot" /></span>
            </div></div>
            <div className="marquee alt" data-marquee data-speed="0.5" data-reverse="true"><div className="track">
              <span className="item">Ja Rule <span className="dot" /> Ne-Yo <span className="dot" /> Bow Wow <span className="dot" /> Xzibit <span className="dot" /> Pretty Ricky <span className="dot" /> M&yacute;a <span className="dot" /> Mario <span className="dot" /></span>
              <span className="item">Ja Rule <span className="dot" /> Ne-Yo <span className="dot" /> Bow Wow <span className="dot" /> Xzibit <span className="dot" /> Pretty Ricky <span className="dot" /> M&yacute;a <span className="dot" /> Mario <span className="dot" /></span>
            </div></div>
          </div>
        </section>

        {/* ====================== REACH ====================== */}
        <section className="block reach">
          <div className="wrap grid2">
            <div className="reveal">
              <span className="kicker eyebrow">Global Reach</span>
              <h2 className="dh" style= marginTop: 14 >On The Ground.<br />Everywhere Online.</h2>
            </div>
            <div className="reveal">
              <p className="lead">Physical activations executed across diverse markets, paired with unmatched digital reach &mdash; over a billion streams across all social platforms and partner networks.</p>
              <div className="places">
                <span className="chip">New Zealand</span><span className="chip">Australia</span>
                <span className="chip">Dubai</span><span className="chip">Abu Dhabi</span>
                <span className="chip">Bali</span><span className="chip">USA</span>
                <span className="chip hot">1B+ Streams</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================== FORMULA ====================== */}
        <section className="block formula">
          <div className="wrap">
            <span className="kicker eyebrow reveal" style= justifyContent: 'center' >Our Formula For Success</span>
            <div className="eq">
              <span className="term reveal">Cultural<br />Strategy</span>
              <span className="op reveal">+</span>
              <span className="term reveal">Authentic<br />Talent</span>
              <span className="op reveal">+</span>
              <span className="term reveal">Tailored<br />Campaigns</span>
              <span className="op reveal">=</span>
              <span className="term result reveal">Unforgettable<br />Impact</span>
            </div>
          </div>
        </section>

        {/* ====================== CONTACT ====================== */}
        <section className="block contact" id="contact">
          <div className="wrap grid2">
            <div className="reveal">
              <span className="kicker eyebrow">Let's Talk</span>
              <h2>Ready To<br />Disrupt?</h2>
              <p className="lead" style= marginTop: 20 >Send us a message, and let's make it happen.</p>
              <p style= marginTop: 18 ><a className="btn ghost magnetic" href="mailto:benny@therawculture.io">benny@therawculture.io</a></p>
            </div>
            <form className="form reveal" onSubmit={onSubmit}>
              <div className="field"><label>Name</label><input type="text" placeholder="Your name" required /></div>
              <div className="field"><label>Email</label><input type="email" placeholder="you@brand.com" required /></div>
              <div className="field"><label>Services of Interest</label>
                <select defaultValue=""><option>Sponsorships &amp; Endorsements</option><option>Talent Collaboration</option><option>Festival Activation</option><option>Social Media Marketing</option><option>Custom Solutions</option></select>
              </div>
              <div className="field"><label>Budget Range</label>
                <select defaultValue=""><option>Not sure on a budget</option><option>$1k–$5k</option><option>$5k–$20k</option><option>$20k–$100k</option><option>$100k+</option></select>
              </div>
              <div className="field"><label>Message</label><textarea rows={3} placeholder="Tell us what you're building" /></div>
              <button className="btn primary" type="submit" style= justifySelf: 'start', marginTop: 8 >Submit</button>
            </form>
          </div>
        </section>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer>
        <div className="wrap foot">
          <div className="brand"><span className="mark" style= width: 64 ><img src="/lockup.svg" alt="The Raw" /></span></div>
          <div className="socials">
            <a href="https://www.instagram.com/therawcultr" aria-label="Instagram">IG</a>
            <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
            <a href="https://youtube.com" aria-label="YouTube">YT</a>
            <a href="https://facebook.com" aria-label="Facebook">f</a>
          </div>
          <div className="legal">&copy; {YEAR} The Raw &middot; Global Culture &middot; Est. 1990</div>
        </div>
      </footer>

      <Toggles />
    </>
  )
}
