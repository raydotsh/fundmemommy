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

      if (res.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-base-100 text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
            <div className="min-w-0 pr-2 text-base font-bold leading-none sm:text-xl">
              fund me mommy.
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#hero" className="hover:text-muted-text transition">
                Home
              </a>
              <a href="#this-week" className="hover:text-muted-text transition">
                This Week
              </a>
              <a href="#features" className="hover:text-muted-text transition">
                Stats
              </a>
              <a href="#faq" className="hover:text-muted-text transition">
                Contact Us
              </a>
            </nav>

            <div className="flex shrink-0 items-center space-x-2 sm:space-x-4">
              <a
                href="#hero"
                className="hidden md:block bg-foreground text-base-100 px-4 py-2 rounded-full"
              >
                Subscribe
              </a>

              <button
                onClick={toggleMenu}
                className="rounded-full p-2 md:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <svg
                  className="w-6 h-6"
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
              className="absolute right-0 top-0 h-full w-full max-w-[20rem] bg-base-100 p-5 shadow-xl sm:max-w-[22rem] sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={toggleMenu}
                className="float-right rounded-full p-2"
                aria-label="Close menu"
              >
                ✕
              </button>

              <nav className="mt-14 space-y-3">
                <a href="#hero" className="block rounded-xl px-3 py-2">
                  Home
                </a>
                <a href="#this-week" className="block rounded-xl px-3 py-2">
                  This Week
                </a>
                <a href="#features" className="block rounded-xl px-3 py-2">
                  Stats
                </a>
                <a href="#faq" className="block rounded-xl px-3 py-2">
                  Contact Us
                </a>
                <a
                  href="#hero"
                  className="mt-6 inline-flex rounded-full bg-black px-5 py-3 text-white"
                >
                  Subscribe
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
            <h1 className="mb-5 text-3xl font-bold leading-tight text-balance sm:mb-6 sm:text-5xl lg:text-6xl">
              Your mommy didn&apos;t approve your idea, but we will.
            </h1>

            <p className="mx-auto mb-7 max-w-xl text-sm leading-7 text-muted-text sm:mb-8 sm:text-lg lg:mx-0 lg:max-w-2xl">
              Not just another newsletter. We also review tech projects worth
              your attention so that you don&apos;t.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row lg:mx-0"
            >
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-full border border-base-300 px-4 py-3"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black px-6 py-3 font-bold text-white sm:w-auto"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="mt-4 text-sm text-muted-text">
              Join 00,350+ readers worldwide now
            </p>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="aspect-square w-full max-w-[16rem] overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-sm md:max-w-md">
              <img
                src="/hero.jpg"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-base-300 bg-base-100 p-6 text-center sm:p-12">
              <div className="text-4xl font-bold mb-2">350</div>
              <div className="text-muted-text uppercase text-sm">
                Total readers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="rounded-2xl border bg-base-100 p-5 sm:p-6">
            <h3 className="font-bold mb-2">Project Spotlight</h3>
            <p>10 indie tech projects you haven&apos;t heard of yet.</p>
          </div>

          <div className="rounded-2xl border bg-base-100 p-5 sm:p-6">
            <h3 className="font-bold mb-2">Founder Story</h3>
            <p>The person behind the project gets their share of fame.</p>
          </div>

          <div className="rounded-2xl border bg-base-100 p-5 sm:p-6">
            <h3 className="font-bold mb-2">Sunday Drop</h3>
            <p>Lands in your inbox every week.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-base-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="rounded-2xl bg-base-100 p-5 sm:p-6">
            <h3 className="font-bold mb-2">What is FMM about?</h3>
            <p className="text-muted-text">
              Important shifts in technology and marketing.
            </p>
          </div>

          <div className="rounded-2xl bg-base-100 p-5 sm:p-6">
            <h3 className="font-bold mb-2">Who is it for?</h3>
            <p className="text-muted-text">
              Founders, tech enthusiasts, and builders.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-200 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <div className="text-xl font-bold mb-2">FMM</div>
            <p className="text-muted-text">
              STOP SLEEPING. START KNOWING.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">NAVIGATION</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#faq">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <a
              href="#hero"
              className="bg-black text-white px-6 py-3 rounded-full inline-block"
            >
              Subscribe now
            </a>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
