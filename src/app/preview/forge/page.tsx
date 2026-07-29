'use client'

import { useState } from 'react'
import { useReveal } from '@/components/templates/aurora/use-reveal'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  Code2,
  Layers3,
  MessageSquare,
  Play,
  Plus,
  Radio,
  Sparkles,
  Users,
} from 'lucide-react'

// Template content is intentionally centralized so a new course can be swapped in quickly.
const modules = [
  { week: '01-02', title: 'Frame the problem', copy: 'Turn a vague idea into a sharp product brief, audience map, and measurable outcome.', tag: 'Strategy' },
  { week: '03-04', title: 'Prototype the system', copy: 'Build a working interface and the reusable primitives that keep it coherent.', tag: 'Design + code' },
  { week: '05-07', title: 'Test with real users', copy: 'Run focused interviews, read behavior, and improve the parts that create friction.', tag: 'Research' },
  { week: '08-10', title: 'Polish and publish', copy: 'Ship the final product, document the decisions, and present a credible case study.', tag: 'Launch' },
]

const faqs = [
  { q: 'Who is this program designed for?', a: 'Forge is built for designers, developers, and product-minded generalists who already know the basics and want a structured way to ship stronger work.' },
  { q: 'How much time should I plan each week?', a: 'Most members spend six to eight hours per week across live studio sessions, project work, and feedback. Every live session is recorded.' },
  { q: 'Do I need to use a specific tool stack?', a: 'No. The curriculum teaches decisions and systems, not a single app. Starter files are provided for popular design and development workflows.' },
  { q: 'Can I use Forge as a team training program?', a: 'Yes. The template includes a team enrollment path that can be adapted for private cohorts, internal workshops, or client education.' },
]

const testimonials = [
  { quote: 'I stopped collecting tutorials and finally shipped a product I can defend in an interview.', name: 'Maya Chen', role: 'Product designer' },
  { quote: 'The critique rhythm changed how I make decisions. My work is faster and much more intentional.', name: 'Jon Bell', role: 'Frontend engineer' },
  { quote: 'Every week produced something useful. By the end, I had a real launch instead of another concept.', name: 'Nia Ford', role: 'Independent maker' },
]

export default function ForgeHome() {
  const root = useReveal<HTMLDivElement>()
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div ref={root}>
      <header className="f-nav">
        <div className="f-nav-inner">
          <a className="f-brand" href="#top" aria-label="Forge home">
            <span className="f-brand-mark"><Code2 size={17} /></span>
            <span>FORGE</span>
            <small>academy</small>
          </a>
          <nav className="f-nav-links" aria-label="Primary navigation">
            <a href="#program">Program</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#mentor">Mentor</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="f-btn f-btn-compact f-btn-primary" href="#enroll">
            Join cohort <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      <main>
        <section className="f-hero" id="top">
          <div className="f-orbit f-orbit-one" aria-hidden />
          <div className="f-orbit f-orbit-two" aria-hidden />
          <div className="f-container f-hero-grid">
            <div className="f-hero-copy">
              <span className="f-kicker"><span className="f-live" /> Applications open for Cohort 08</span>
              <h1 className="f-h1">
                <span className="f-mask"><span>Build the proof.</span></span>
                <span className="f-mask"><span className="f-display">Not just the portfolio.</span></span>
              </h1>
              <p className="f-lede">
                A ten-week product studio where ambitious digital makers turn one strong idea into a tested, polished launch.
              </p>
              <div className="f-hero-actions">
                <a className="f-btn f-btn-primary f-btn-large" href="#enroll">Explore the cohort <ArrowRight size={17} /></a>
                <a className="f-btn f-btn-ghost f-btn-large" href="#curriculum"><Play size={16} fill="currentColor" /> View syllabus</a>
              </div>
              <div className="f-hero-facts">
                <span><CalendarDays size={15} /> Starts Sep 14</span>
                <span><Clock size={15} /> 6-8 hrs / week</span>
                <span><Users size={15} /> 24 seats</span>
              </div>
            </div>

            <div className="f-studio-wrap" data-reveal>
              <div className="f-studio">
                <div className="f-studio-top">
                  <div>
                    <span className="f-mono-label">Student workspace</span>
                    <strong>Cohort 08 / Launch plan</strong>
                  </div>
                  <span className="f-online"><span /> Live</span>
                </div>
                <div className="f-progress">
                  <div className="f-progress-copy"><span>Program progress</span><b>72%</b></div>
                  <div className="f-progress-bar"><span /></div>
                </div>
                <div className="f-today">
                  <span className="f-mono-label">Today in the studio</span>
                  <div className="f-session">
                    <span className="f-session-icon"><Radio size={17} /></span>
                    <div><strong>Interface critique</strong><small>11:00 AM - Live room A</small></div>
                    <ArrowUpRight size={17} />
                  </div>
                </div>
                <div className="f-board">
                  <div className="f-board-head">
                    <span className="f-mono-label">This week</span>
                    <span>3 of 4 complete</span>
                  </div>
                  {[
                    ['Map the core flow', true],
                    ['Build the first pass', true],
                    ['Run two user tests', true],
                    ['Publish the reflection', false],
                  ].map(([label, done]) => (
                    <div className="f-task" key={label as string}>
                      <span className={done ? 'done' : ''}>{done ? <Check size={11} /> : null}</span>
                      <p>{label}</p>
                    </div>
                  ))}
                </div>
                <div className="f-studio-foot">
                  <div className="f-avatars"><i>MC</i><i>JB</i><i>NF</i><i>+21</i></div>
                  <span>Next feedback window closes Friday</span>
                </div>
              </div>
              <div className="f-studio-note"><Sparkles size={15} /> Built for active learning, not passive watching.</div>
            </div>
          </div>
        </section>

        <section className="f-toolbelt" aria-label="Program format">
          <div className="f-container f-toolbelt-grid">
            {['Live build rooms', 'Small-group critique', 'Reusable playbooks', 'Portfolio-ready launch'].map((item, index) => (
              <span key={item}><b>0{index + 1}</b>{item}</span>
            ))}
          </div>
        </section>

        <section className="f-section f-container" id="program">
          <div className="f-section-intro">
            <div>
              <span className="f-eyebrow">The learning system</span>
              <h2 className="f-h2">A studio rhythm that keeps work moving.</h2>
            </div>
            <p className="f-lede">Each week combines a focused lesson, a concrete build target, direct critique, and time to revise before the next decision.</p>
          </div>

          <div className="f-bento" data-reveal-stagger>
            <article className="f-bento-card f-bento-wide">
              <div className="f-card-icon"><Layers3 size={21} /></div>
              <span className="f-mono-label">Weekly build brief</span>
              <h3>One outcome. Clear constraints.</h3>
              <p>Every module ends in something visible, testable, and useful for the final launch.</p>
              <div className="f-brief">
                <div><span>Deliverable</span><strong>Interactive product flow</strong></div>
                <div><span>Success signal</span><strong>5 users complete the task</strong></div>
                <div><span>Review</span><strong>Thursday studio critique</strong></div>
              </div>
            </article>
            <article className="f-bento-card">
              <div className="f-card-icon"><MessageSquare size={21} /></div>
              <span className="f-mono-label">Useful feedback</span>
              <h3>Critique the decision, not the decoration.</h3>
              <p>Structured prompts keep every review specific, respectful, and actionable.</p>
              <div className="f-comment"><b>AM</b><span>The hierarchy is clear. Test whether the second step can disappear entirely.</span></div>
            </article>
            <article className="f-bento-card f-bento-tall">
              <div className="f-card-icon"><Radio size={21} /></div>
              <span className="f-mono-label">Live studio</span>
              <h3>Work beside people who are also shipping.</h3>
              <p>Drop-in build rooms create momentum without turning your week into meetings.</p>
              <div className="f-room">
                <div className="f-room-pulse"><span /><span /><span /></div>
                <strong>12 makers focused</strong>
                <small>Room closes in 38 min</small>
              </div>
            </article>
            <article className="f-bento-card f-bento-wide">
              <div className="f-card-icon"><BookOpen size={21} /></div>
              <span className="f-mono-label">Lifetime library</span>
              <h3>Keep the systems after the cohort ends.</h3>
              <p>Use the briefs, research scripts, QA lists, and presentation frameworks on your next project.</p>
              <div className="f-library">
                {['Discovery script', 'Flow audit', 'Launch checklist'].map((item) => <span key={item}>{item}<ArrowUpRight size={13} /></span>)}
              </div>
            </article>
          </div>
        </section>

        <section className="f-section f-curriculum" id="curriculum">
          <div className="f-container f-curriculum-grid">
            <div className="f-curriculum-copy">
              <span className="f-eyebrow">Curriculum</span>
              <h2 className="f-h2">Ten weeks from loose idea to credible launch.</h2>
              <p className="f-lede">The structure is rigorous, but the project stays yours. Adapt the template to product design, development, creative technology, or a focused business course.</p>
              <a href="#enroll" className="f-text-link">Download the full syllabus <ArrowRight size={15} /></a>
            </div>
            <div className="f-module-list" data-reveal-stagger>
              {modules.map((module, index) => (
                <article className="f-module" key={module.week}>
                  <div className="f-module-number">0{index + 1}</div>
                  <div>
                    <span className="f-mono-label">Weeks {module.week}</span>
                    <h3>{module.title}</h3>
                    <p>{module.copy}</p>
                  </div>
                  <span className="f-module-tag">{module.tag}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="f-section f-container">
          <div className="f-outcome">
            <div className="f-outcome-board" data-reveal>
              <div className="f-outcome-toolbar"><span /><span /><span /><b>case-study.final</b></div>
              <div className="f-outcome-canvas">
                <div className="f-canvas-copy">
                  <span>Featured launch</span>
                  <strong>Signal / a calmer way to plan complex work.</strong>
                  <small>Research - Product system - Frontend</small>
                </div>
                <div className="f-canvas-art"><i /><i /><i /></div>
              </div>
            </div>
            <div className="f-outcome-copy">
              <span className="f-eyebrow">The outcome</span>
              <h2 className="f-h2">Leave with work that shows how you think.</h2>
              <p className="f-lede">A polished result matters. A clear story about the constraints, evidence, and decisions behind it matters more.</p>
              <div className="f-metrics">
                <div><strong>4</strong><span>Shipped project milestones</span></div>
                <div><strong>12+</strong><span>Direct critique rounds</span></div>
                <div><strong>1</strong><span>Launch-ready case study</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="f-section f-mentor-section" id="mentor">
          <div className="f-container f-mentor">
            <div className="f-portrait" data-reveal>
              <div className="f-portrait-shape"><span>AK</span></div>
              <div className="f-portrait-caption"><span>Lead mentor</span><strong>Alex Kim</strong></div>
            </div>
            <div className="f-mentor-copy">
              <span className="f-eyebrow">Your mentor</span>
              <h2 className="f-h2">Direct guidance from someone still doing the work.</h2>
              <p className="f-lede">Alex has led product teams from first prototype through global launch. Forge distills that operating experience into a practical studio for independent makers.</p>
              <blockquote>&ldquo;The goal is not to make everyone work the same way. It is to help each person make stronger decisions on purpose.&rdquo;</blockquote>
              <div className="f-credentials">
                <span><Check size={15} /> 12 years building digital products</span>
                <span><Check size={15} /> Former design lead at two venture-backed teams</span>
                <span><Check size={15} /> 600+ makers taught through workshops and cohorts</span>
              </div>
            </div>
          </div>
        </section>

        <section className="f-section f-container">
          <div className="f-section-intro f-section-intro-centered">
            <div>
              <span className="f-eyebrow">From the studio</span>
              <h2 className="f-h2">Momentum looks different when the work is real.</h2>
            </div>
          </div>
          <div className="f-testimonials" data-reveal-stagger>
            {testimonials.map((item, index) => (
              <article key={item.name}>
                <span className="f-quote-number">0{index + 1}</span>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <div><strong>{item.name}</strong><span>{item.role}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="f-section f-container" id="enroll">
          <div className="f-enroll">
            <div className="f-enroll-copy">
              <span className="f-eyebrow">Cohort 08 enrollment</span>
              <h2 className="f-h2">Make the next ten weeks count.</h2>
              <p className="f-lede">Join the full studio or adapt this section for self-paced access, team training, a workshop series, or a digital course bundle.</p>
              <div className="f-guarantee"><Sparkles size={17} /> 14-day fit guarantee after the first live studio</div>
            </div>
            <div className="f-price-card">
              <span className="f-mono-label">One-time enrollment</span>
              <div className="f-price">$1,240 <small>USD</small></div>
              <p>Everything required to move one ambitious project from idea to launch.</p>
              <ul>
                {['10-week guided curriculum', 'Weekly live studio and critique', 'Private cohort community', 'Templates and resource library', 'Two 1:1 mentor reviews', 'Lifetime access to recordings'].map((item) => (
                  <li key={item}><Check size={16} />{item}</li>
                ))}
              </ul>
              <a className="f-btn f-btn-primary f-btn-large" href="#">Apply for Cohort 08 <ArrowRight size={17} /></a>
              <small className="f-price-note">Applications reviewed within two business days.</small>
            </div>
          </div>
        </section>

        <section className="f-section f-faq-section" id="faq">
          <div className="f-container f-faq-grid">
            <div>
              <span className="f-eyebrow">Questions</span>
              <h2 className="f-h2">A few things worth knowing.</h2>
              <p className="f-lede">Still deciding? Send a note to hello@forge.academy.</p>
            </div>
            <div className="f-faq">
              {faqs.map((item, index) => {
                const open = openFaq === index
                return (
                  <div className={`f-faq-item ${open ? 'open' : ''}`} key={item.q}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : index)} aria-expanded={open}>
                      <span>{item.q}</span><Plus size={18} />
                    </button>
                    <div className="f-faq-answer"><div><p>{item.a}</p></div></div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="f-container f-final">
          <div>
            <span className="f-eyebrow">Your next project can be the one</span>
            <h2>Stop preparing to begin.</h2>
          </div>
          <a className="f-btn f-btn-dark f-btn-large" href="#enroll">See if Forge fits <ArrowUpRight size={17} /></a>
        </section>
      </main>

      <footer className="f-footer">
        <div className="f-container">
          <div className="f-footer-top">
            <a className="f-brand" href="#top"><span className="f-brand-mark"><Code2 size={17} /></span><span>FORGE</span><small>academy</small></a>
            <p>A project-led course template for educators who teach by making.</p>
            <div>
              <a href="#program">Program</a>
              <a href="#curriculum">Curriculum</a>
              <a href="#mentor">Mentor</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
          <div className="f-footer-bottom"><span>Copyright {new Date().getFullYear()} Forge Academy</span><span>Template by Hyzr</span></div>
        </div>
      </footer>
    </div>
  )
}
