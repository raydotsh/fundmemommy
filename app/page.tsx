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
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 gap-4">
            <div className="text-lg sm:text-xl font-bold whitespace-nowrap">
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

            <div className="flex items-center space-x-4">
              <a
                href="#hero"
                className="hidden md:block bg-foreground text-base-100 px-4 py-2 rounded-full"
              >
                Subscribe
              </a>

              <button onClick={toggleMenu} className="md:hidden p-2">
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
              className="absolute right-0 top-0 h-full w-72 bg-base-100 shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={toggleMenu} className="float-right p-2">
                ✕
              </button>

              <nav className="mt-12 space-y-4">
                <a href="#hero" className="block">
                  Home
                </a>
                <a href="#this-week" className="block">
                  This Week
                </a>
                <a href="#features" className="block">
                  Stats
                </a>
                <a href="#faq" className="block">
                  Contact Us
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your mommy didn't approve your idea, but we will.
            </h1>

            <p className="text-base sm:text-lg text-muted-text mb-8 max-w-2xl mx-auto lg:mx-0">
              Not just another newsletter. We also review tech projects worth
              your attention so that you don't.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0"
            >
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full border border-base-300"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-black text-white rounded-full font-bold"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="text-sm text-muted-text mt-4">
              Join 00,350+ readers worldwide now
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square bg-white shadow-lg rounded-lg overflow-hidden">
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="bg-base-100 border border-base-300 rounded-2xl p-8 sm:p-12 text-center w-full max-w-sm">
              <div className="text-4xl font-bold mb-2">350</div>
              <div className="text-muted-text uppercase text-sm">
                Total readers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-base-100 border rounded-2xl p-6">
            <h3 className="font-bold mb-2">Project Spotlight</h3>
            <p>10 indie tech projects you haven’t heard of yet.</p>
          </div>

          <div className="bg-base-100 border rounded-2xl p-6">
            <h3 className="font-bold mb-2">Founder Story</h3>
            <p>The person behind the project gets their share of fame.</p>
          </div>

          <div className="bg-base-100 border rounded-2xl p-6">
            <h3 className="font-bold mb-2">Sunday Drop</h3>
            <p>Lands in your inbox every week.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-base-100 rounded-2xl p-6">
            <h3 className="font-bold mb-2">What is FMM about?</h3>
            <p className="text-muted-text">
              Important shifts in technology and marketing.
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6">
            <h3 className="font-bold mb-2">Who is it for?</h3>
            <p className="text-muted-text">
              Founders, tech enthusiasts, and builders.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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