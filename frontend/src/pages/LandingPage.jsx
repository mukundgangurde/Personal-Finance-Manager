import { Link } from "react-router-dom"
import ArrowIcon from "../components/ArrowIcon"
import SecurityIcon from "../components/SecurityIcon"

const features = [
  {
    number: "01",
    title: "Record your expenses",
    description:
      "Save the amount, date, category, and payment method so it is easier to review where your money went.",
    icon: "down-right",
  },
  {
    number: "02",
    title: "Keep income in view",
    description:
      "Add income with its source and date, then see it included in your personal finance overview.",
    icon: "up-right",
  },
  {
    number: "03",
    title: "Follow investments",
    description:
      "Track the amount invested and current value to see your portfolio's recorded profit or loss.",
    icon: "◫",
  },
]

const steps = [
  {
    number: "01",
    title: "Create your account",
    description: "Register with your email and a strong password to get your private finance space.",
  },
  {
    number: "02",
    title: "Add what matters",
    description: "Record your income, everyday expenses, and investment details as you go.",
  },
  {
    number: "03",
    title: "See your overview",
    description: "Your dashboard brings your saved records together into a clear summary.",
  },
]

const stories = [
  {
    image: "photo-1554224155-8d04cb21cd6c",
    alt: "Person reviewing paperwork and financial notes at a desk",
    label: "Everyday spending",
    title: "Make the small numbers easier to follow.",
    description: "Keep expense details together, instead of relying on memory.",
  },
  {
    image: "photo-1579621970563-ebec7560ff3e",
    alt: "Coins and a small plant representing steady saving",
    label: "Your bigger picture",
    title: "Know how income and expenses add up.",
    description: "See your recorded income, spending, and balance in one place.",
  },
  {
    image: "photo-1559526324-4b87b5e36e44",
    alt: "A person looking at charts on a laptop",
    label: "Investments",
    title: "Keep an eye on what you have invested.",
    description: "Compare the amount invested with the current value you record.",
  },
]

const imageUrl = (photoId, width = 900) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link className="landing-brand" to="/" aria-label="Personal Finance Manager home">
          <span className="landing-brand-icon" aria-hidden="true">₹</span>
          <span>Personal Finance Manager</span>
        </Link>

        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#security">Privacy</a>
          <Link className="landing-nav-login" to="/login">Sign in</Link>
          <Link className="landing-nav-cta" to="/register">
            Get started <ArrowIcon direction="up-right" />
          </Link>
        </nav>
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span /> A little more clarity, every day</div>
            <h1>Your money.<br /><span>Your direction.</span></h1>
            <p className="hero-description">
              Bring income, everyday expenses, and investments into one simple
              place. See what you have recorded and make your next money decision
              with a clearer picture.
            </p>
            <div className="hero-actions">
              <Link className="hero-primary-button" to="/register">
                Create your account <ArrowIcon />
              </Link>
              <a className="hero-secondary-link" href="#features">
                Explore the features <ArrowIcon direction="down" />
              </a>
            </div>
            <div className="hero-note">
              <span className="hero-note-icon" aria-hidden="true">✦</span>
              Your finance records stay private to your account
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="hero-photo"
              src={imageUrl("photo-1460925895917-afdab827c52f", 1200)}
              alt="A person reviewing financial charts on a laptop"
              fetchPriority="high"
            />
            <div className="hero-photo-wash" />
            <div className="hero-photo-caption">
              <span className="hero-photo-caption-icon" aria-hidden="true">✳</span>
              <span>
                <strong>Your whole picture, together</strong>
                <small>Income · Expenses · Investments</small>
              </span>
            </div>
            <div className="hero-photo-tag">
              <span className="hero-photo-tag-dot" />
              A clearer view starts here
            </div>
          </div>
        </section>

        <section className="landing-trust-strip" aria-label="What you can manage">
          <span>YOUR FINANCIAL ESSENTIALS</span>
          <div><i className="strip-dot dot-purple" /> Income</div>
          <div><i className="strip-dot dot-orange" /> Expenses</div>
          <div><i className="strip-dot dot-green" /> Investments</div>
          <div><i className="strip-dot dot-blue" /> Your balance</div>
        </section>

        <section className="landing-features" id="features">
          <div className="section-heading">
            <div>
              <span className="section-kicker">LESS GUESSWORK, MORE CLARITY</span>
              <h2>The essentials, all in one place.</h2>
            </div>
            <p>
              Keep your day-to-day money records organized and get a helpful
              overview whenever you need one.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <div className="feature-card-top">
                  <span className="feature-icon">
                    <ArrowIcon direction={feature.icon} />
                  </span>
                  <span className="feature-number">{feature.number}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-story-section" aria-labelledby="story-title">
          <div className="story-heading">
            <span className="section-kicker">A CLEARER VIEW, STEP BY STEP</span>
            <h2 id="story-title">Make room for better money habits.</h2>
            <p>
              Start with the records you have today. Build a more complete
              picture over time.
            </p>
          </div>
          <div className="story-grid">
            {stories.map((story) => (
              <article className="story-card" key={story.label}>
                <div className="story-image-wrap">
                  <img
                    src={imageUrl(story.image)}
                    alt={story.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="story-card-copy">
                  <span className="story-label">{story.label}</span>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-how" id="how-it-works">
          <div className="how-intro">
            <span className="section-kicker">SIMPLE TO GET STARTED</span>
            <h2>Three steps to a clearer overview.</h2>
            <p>No complicated setup. Just add your records and let the dashboard bring them together.</p>
            <Link className="how-link" to="/register">
              Create your account <ArrowIcon />
            </Link>
          </div>
          <div className="how-steps">
            {steps.map((step) => (
              <article className="how-step" key={step.number}>
                <span className="how-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-security" id="security">
          <div className="security-icon"><SecurityIcon /></div>
          <div className="security-copy">
            <span className="section-kicker">YOUR ACCOUNT, YOUR RECORDS</span>
            <h2>Personal finances should stay personal.</h2>
            <p>
              Sign-in is required for finance pages. Your records are linked to
              your account, and the backend checks account ownership when it
              reads or changes them.
            </p>
          </div>
          <div className="security-points">
            <div><span aria-hidden="true">✓</span> Passwords stored as secure hashes</div>
            <div><span aria-hidden="true">✓</span> Private, account-based sessions</div>
            <div><span aria-hidden="true">✓</span> Finance records scoped to your account</div>
          </div>
        </section>

        <section className="landing-bottom-cta">
          <div>
            <span className="section-kicker">START WITH THE BIG PICTURE</span>
            <h2>Ready to make sense of your money?</h2>
            <p>Create an account and start building your personal finance overview.</p>
          </div>
          <Link className="hero-primary-button" to="/register">
            Get started <ArrowIcon />
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <Link className="landing-brand footer-brand" to="/">
          <span className="landing-brand-icon" aria-hidden="true">₹</span>
          <span>Personal Finance Manager</span>
        </Link>
        <span>More clarity for your everyday money.</span>
      </footer>
    </div>
  )
}

export default LandingPage
