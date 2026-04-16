'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log('API Response:', data);

      if (res.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-base-100 text-foreground">
      {/* Sticky Header */}
      <header
        id="header"
        className="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
            <div className="min-w-0 text-base font-bold leading-tight sm:text-xl">
              fund me mommy.
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#hero" className="transition hover:text-muted-text">
                Home
              </a>
              <a href="#this-week" className="transition hover:text-muted-text">
                This Week
              </a>
              <a href="#features" className="transition hover:text-muted-text">
                Stats
              </a>
              <a href="#faq" className="transition hover:text-muted-text">
                Contact Us
              </a>
            </nav>
            <div className="flex shrink-0 items-center space-x-3">
              <a
                href="#hero"
                className="hidden rounded-full bg-foreground px-4 py-2 text-base-100 transition hover:bg-opacity-80 md:block"
              >
                Subscribe
              </a>
              <button
                onClick={toggleMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 text-foreground transition hover:translate-y-0 hover:bg-base-200 md:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={toggleMenu}
          >
            <div
              className="fixed right-0 top-0 h-full w-[min(18rem,85vw)] border-l border-base-300 bg-base-100 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 pt-3">
                <button
                  onClick={toggleMenu}
                  className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 text-foreground transition hover:translate-y-0 hover:bg-base-200"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <nav className="mt-6 space-y-2">
                  <a
                    href="#hero"
                    className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  >
                    Home
                  </a>
                  <a
                    href="#this-week"
                    className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  >
                    This Week
                  </a>
                  <a
                    href="#features"
                    className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  >
                    Stats
                  </a>
                  <a
                    href="#faq"
                    className="block rounded-xl px-3 py-3 transition hover:bg-base-200 hover:text-muted-text"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#hero"
                    className="mt-4 block rounded-full bg-foreground px-4 py-3 text-center text-base-100 transition hover:bg-opacity-80"
                  >
                    Subscribe
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center bg-gradient-to-b from-base-100 to-base-200 px-4 py-16 text-left sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:space-x-12">
          <div className="w-full md:w-2/3">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Your mommy didn&apos;t approve your idea, but we will.
            </h1>
            <p className="mb-8 text-base text-muted-text sm:text-lg">
              Not just another newsletter. We also review tech projects worth
              your attention so that you don&apos;t. Founders get visibility. You
              get to stay ahead in the game.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-center sm:gap-2"
            >
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-base-300 px-4 py-3 sm:w-2/3 sm:min-w-0"
              />
              <button
                type="submit"
                className="rounded-full bg-black px-6 py-3 font-bold text-white transition-colors hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            <p className="mt-4 text-sm text-muted-text">
              Join 00,350+ readers worldwide now
            </p>
          </div>
          <div className="flex w-full flex-col items-center md:mt-0 md:w-1/3">
            <div className="flex w-full max-w-[18rem] items-center justify-center rounded-lg bg-white shadow-lg sm:max-w-xs md:h-80 md:w-80">
              <img
                src="/hero.jpg"
                alt="Hero"
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
            <p className="mt-4 text-lg font-bold">Project of the Day</p>
          </div>
        </div>
      </section>

      {/* Features / Stats Section */}
      <section
        id="features"
        className="relative overflow-hidden bg-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-radial from-base-300/20 to-transparent"></div>
        {/* Ticker */}
        <div className="mb-12 overflow-hidden border-y border-base-300 bg-base-100 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex animate-scroll whitespace-nowrap">
            <div className="flex items-center space-x-6">
              {[
                'TECH PROJECTS',
                'FOUNDER VISIBILITY',
                'INVESTOR INSIGHTS',
                'WEEKLY BRIEF',
                'HIGH-SIGNAL READS',
              ].map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-6 text-base font-medium text-foreground sm:text-lg"
                >
                  {item}
                  {index < 4 && <span className="text-muted-text">•</span>}
                </span>
              ))}
            </div>
            <div className="ml-6 flex items-center space-x-6">
              {[
                'TECH PROJECTS',
                'FOUNDER VISIBILITY',
                'INVESTOR INSIGHTS',
                'WEEKLY BRIEF',
                'HIGH-SIGNAL READS',
              ].map((item, index) => (
                <span
                  key={`dup-${index}`}
                  className="inline-flex items-center gap-6 text-base font-medium text-foreground sm:text-lg"
                >
                  {item}
                  {index < 4 && <span className="text-muted-text">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Stats Card */}
        <div className="relative z-10 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-base-300 bg-base-100 p-8 text-center transition-shadow hover:shadow-lg sm:max-w-md sm:p-12">
            <div className="mb-2 text-4xl font-bold">350</div>
            <div className="text-sm uppercase text-muted-text">
              Total readers
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Benefits Section */}
      <section
        id="newsletter-benefits"
        className="relative overflow-hidden bg-gradient-subtle px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-radial from-base-200/20 to-transparent"></div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-base-200 px-3 py-1 text-sm font-medium text-foreground">
              About this newsletter
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              What You Get
            </h2>
            <p className="text-muted-text">The Deal</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-2xl font-bold">01</span>
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm">
                  Project Spotlight
                </span>
              </div>
              <h3 className="font-bold">
                We dig up 10 indie tech projects you haven&apos;t heard of yet
              </h3>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-2xl font-bold">02</span>
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm">
                  Founder Story
                </span>
              </div>
              <h3 className="font-bold">
                The person behind the project gets their share of fame
              </h3>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-2xl font-bold">03</span>
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm">
                  Sunday Drop
                </span>
              </div>
              <h3 className="font-bold">
                Lands in your inbox on time just like your mom
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* This Week Section */}
      <section
        id="this-week"
        className="bg-gradient-to-b from-base-100 to-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-base-100 px-3 py-1 text-sm font-medium text-foreground">
              This Week
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">Coming Soon</h2>
          </div>
        </div>
      </section>

      {/* Prev Section */}
      <section
        id="prev"
        className="bg-gradient-subtle px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-base-200 px-3 py-1 text-sm font-medium text-foreground">
              Previous Issues
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">Coming Soon</h2>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative overflow-hidden bg-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-radial from-base-300/20 to-transparent"></div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-base-200 px-3 py-1 text-sm font-medium text-foreground">
              SOME QUESTIONS YOUR MOM WOULD ASK
            </div>
            <p className="mx-auto mb-6 max-w-2xl text-muted-text">
              fund me mommy is a website meant to educate and promote your
              projects, it&apos;s free of cost, so your mommy would approve too
            </p>
            <a
              href="#hero"
              className="inline-flex items-center text-foreground transition hover:text-muted-text"
            >
              Go to signup
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-2 font-bold">What is FMM about?</h3>
              <p className="text-muted-text">
                A concise briefing on the most important shifts in technology
                and marketing: what changed, why it matters and how to act on
                it.
              </p>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-2 font-bold">Who is it for?</h3>
              <p className="text-muted-text">
                Passionate tech enthusiasts, founders looking to get traction
                and your mom.
              </p>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-2 font-bold">How often do you send it?</h3>
              <p className="text-muted-text">
                Once a week. Enough to stay ahead, not enough to flood your
                inbox.
              </p>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-2 font-bold">Is it free?</h3>
              <p className="text-muted-text">
                Yes. Subscribe for free and get the full newsletter every week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="bg-gradient-to-r from-base-300 to-base-200 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-2 text-xl font-bold">FMM</div>
              <p className="text-muted-text">STOP SLEEPING. START KNOWING.</p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">NAVIGATION</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#this-week"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    This Week
                  </a>
                </li>
                <li>
                  <a
                    href="#prev"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    Previous Issues
                  </a>
                </li>
                <li>
                  <a
                    href="#hero"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-muted-text transition hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 sm:max-w-sm">
              <h3 className="mb-2 font-bold">Ready for the next drop?</h3>
              <p className="mb-4 text-muted-text">
                SUBSCRIBE BELOW. YOUR MOM WOULD BE PROUD.
              </p>
              <a
                href="#hero"
                className="inline-block rounded-full bg-foreground px-6 py-3 text-base-100 transition hover:bg-opacity-80"
              >
                Subscribe now
              </a>
            </div>
          </div>
          <div className="border-t border-base-200 pt-4">
            <p className="text-sm text-muted-text">
              © 2026 fundmemommy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
      <Toaster />
    </div>
  );
}
