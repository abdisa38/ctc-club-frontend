import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button";
import { Menu, X, Github, Twitter, Linkedin, Instagram, Mail, ArrowRight, ArrowUpRight, Send } from "lucide-react";
import { Input } from "../ui/Input";
import { toast } from "sonner";
import ctcLogo from "../../../assets/f6c46c16a776a1f63a42e49b36947669f8dcc942.png";

export function PublicLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterFeedback, setNewsletterFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      const message = "Please enter a valid email address.";
      setNewsletterFeedback({ type: "error", message });
      toast.error(message);
      return;
    }

    try {
      const rawStored = localStorage.getItem("ctc-newsletter-subscribers");
      const existingList = rawStored ? JSON.parse(rawStored) : [];
      const subscribers = Array.isArray(existingList) ? existingList : [];

      if (!subscribers.includes(normalizedEmail)) {
        subscribers.push(normalizedEmail);
        localStorage.setItem("ctc-newsletter-subscribers", JSON.stringify(subscribers));
      }

      const message = "Thanks. Your email has been saved for updates.";
      setNewsletterFeedback({ type: "success", message });
      setEmail("");
      toast.success(message);
    } catch {
      const message = "Could not save your email right now. Please try again.";
      setNewsletterFeedback({ type: "error", message });
      toast.error(message);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore Courses", to: "/courses" },
    { label: "Community", to: "https://t.me/fullstackdeveloper_abdi" },
    { label: "About", to: "/about" },
  ];

  return (
    <div className="dark flex min-h-screen flex-col bg-[#050117] text-white">
      {!isAuthPage && (
        <header
          className={`sticky top-0 z-50 w-full transition-all duration-500 ${
            scrolled
              ? "bg-[#08061a]/60 backdrop-blur-2xl border-b border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 items-center px-6 lg:px-8 gap-10 max-w-[1400px] w-full">
            <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-auto group">
              <div className="relative">
                <img src={ctcLogo} alt="CTC Club" className="h-9 w-9 rounded-xl ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                CTC <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Club</span>
              </span>
            </Link>

            <nav className="hidden md:flex gap-0.5 justify-end">
              {navLinks.map((link) => (
                link.to.startsWith("http") ? (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3.5 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200 text-slate-300 hover:text-white hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-3.5 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                      location.pathname === link.to
                        ? "text-indigo-600 bg-indigo-50/80 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden md:inline-flex font-semibold text-[13px] text-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white h-9 px-4 rounded-lg"
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="hidden md:inline-flex font-semibold text-[13px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm shadow-indigo-500/25 h-9 px-5 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/30"
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5 text-slate-700 dark:text-slate-300" /> : <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-white/95 backdrop-blur-xl dark:bg-[#0c0f1a]/95 border-t border-slate-100 dark:border-slate-800/50 overflow-hidden"
              >
                <div className="px-6 py-5 space-y-1">
                  {navLinks.map((link) => (
                    link.to.startsWith("http") ? (
                      <a
                        key={link.to}
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                          location.pathname === link.to
                            ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <Button variant="outline" className="w-full h-11 rounded-xl font-semibold" asChild>
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600" asChild>
                      <Link to="/register">Get Started Free</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {!isAuthPage && (
        <footer className="bg-[#09090b] text-slate-400 py-12 border-t border-purple-500/10">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
              {/* Brand */}
              <div>
                <Link to="/" className="flex items-center gap-2.5 mb-5 group">
                  <img src={ctcLogo} alt="CTC Club" className="h-9 w-9 rounded-xl transition-transform group-hover:scale-105" />
                  <span className="text-lg font-bold text-white">
                    CTC <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Club</span>
                  </span>
                </Link>
                <p className="text-sm leading-relaxed text-slate-400 mb-5">
                  Tech learning platform for university students.
                </p>
                <div className="flex gap-2">
                  {[
                    { Icon: Github, href: "https://github.com/abdisa38" },
                    { Icon: Twitter, href: "https://x.com/bdi3889" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/abdisa-awel-92b963383/" },
                    { Icon: Instagram, href: "https://www.instagram.com/abdisa3889/" },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 hover:bg-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white text-sm font-semibold mb-5 tracking-wide">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/courses"
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white text-sm font-semibold mb-5 tracking-wide">Contact</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0 text-indigo-400" />
                    <a href="mailto:abdisaawel313@gmail.com" className="hover:text-white transition-colors">
                      abdisaawel313@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 flex-shrink-0 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                    </svg>
                    <a href="tel:+251938890645" className="hover:text-white transition-colors">
                      0938890645
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Send className="h-4 w-4 flex-shrink-0 text-indigo-400" />
                    <a href="https://t.me/bdisa38" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      @bdisa38
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-300">
                &copy; {new Date().getFullYear()} CTC Club. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-slate-300 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-sm text-slate-300 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
