import ScrollReveal from "scrollreveal";
import { BiBook } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { type FC, useState, useEffect } from "react";
import Modal, { ModalTrigger } from "@/Components/Modal";
import ModalProvider from "@/Contexts/Modal/ModalProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FaSearch,
  FaUserPlus,
  FaClock,
  FaUsers,
  FaChartLine,
  FaBars,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Home: FC = () => {
  useEffect(
    () =>
      ["About", "Features", "Contacts"].forEach((ids, index) =>
        ScrollReveal().reveal(`#${ids}`, {
          delay: (index + 1) * 100,
          reset: true,
          easing: "ease-in-out",
        })
      ),
    []
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <BiBook className="w-8 h-8" />,
      title: "Vast Collection",
      description: "Access over 100,000 books, journals, and digital resources",
    },
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "Smart Search",
      description:
        "Find exactly what you need with our intelligent search system",
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "24/7 Access",
      description: "Browse and reserve books anytime from anywhere",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Community",
      description: "Join reading groups and literary events",
    },
  ];

  const stats = [
    { number: "100K+", label: "Books Available" },
    { number: "50K+", label: "Active Members" },
    { number: "1M+", label: "Books Borrowed" },
    { number: "24/7", label: "Online Access" },
  ];

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Navbar */}
        <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-circle btn-ghost rounded-full"
              >
                <FaBars className="w-5 h-5" />
              </button>
              {mobileMenuOpen && (
                <ul className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-xl bg-base-100 rounded-box w-52">
                  <li>
                    <a href="#About">About</a>
                  </li>
                  <li>
                    <a href="#Features">Features</a>
                  </li>
                  <li>
                    <a href="#Contacts">Contacts</a>
                  </li>
                </ul>
              )}
            </div>
            <Link to="/" className="btn btn-ghost text-xl gap-2 rounded-full">
              <BiBook className="w-6 h-6 text-primary" />
              <span className="font-bold bg-gradient-to-right from-primary to-secondary bg-clip-text">
                CityLibrary
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1">
              <li>
                <a
                  href="#About"
                  className="hover:text-primary transition-colors rounded-full"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#Features"
                  className="hover:text-primary transition-colors rounded-full"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#Contacts"
                  className="hover:text-primary transition-colors rounded-full"
                >
                  Contacts
                </a>
              </li>
            </ul>
          </div>

          <div className="navbar-end gap-2">
            <button className="btn btn-ghost btn-sm sm:btn-md rounded-full">
              Sign In
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero min-h-[calc(100vh-4rem)] py-12 lg:py-0" id="About">
          <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl px-4 gap-8 lg:gap-12">
            {/* Hero Image */}
            <div className="flex-1 relative">
              <div className="relative z-10">
                <img
                  src="image.svg"
                  alt="Library"
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300"
                />
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-base-100 p-4 rounded-2xl shadow-xl hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-12 items-center justify-center flex">
                        <FaChartLine size="20" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">Reading Progress</p>
                      <p className="text-sm text-base-content/70">
                        Track your journey
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="badge badge-primary badge-lg mb-4 gap-2 rounded-full">
                <FaCheckCircle /> Trusted by 50,000+ Readers
              </div>

              <h1 className="text-5xl lg:text-5xl font-bold leading-tight mb-6">
                Your Gateway to
                <span className="block bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mt-2">
                  Endless Knowledge
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-base-content/70 mb-8 max-w-2xl">
                Discover, borrow, and enjoy thousands of books from the comfort
                of your home. Join CityLibrary today and embark on your reading
                adventure.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl rounded-full">
                  Get Started Free
                  <FaArrowRight />
                </button>
                <button className="btn btn-outline btn-lg gap-2 rounded-full">
                  <BiBook />
                  Browse Collection
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-base-content/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-base-200/50 py-20" id="Features">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Why Choose <span className="text-primary">CityLibrary?</span>
              </h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Experience the future of library management with features
                designed for modern readers
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl"
                >
                  <div className="card-body items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                    <p className="text-base-content/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="card bg-linear-to-r from-primary to-secondary text-primary-content shadow-2xl rounded-3xl">
              <div className="card-body items-center text-center py-12">
                <h2 className="card-title text-3xl lg:text-5xl font-bold mb-4">
                  Ready to Start Reading?
                </h2>
                <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-2xl">
                  Join thousands of book lovers and get instant access to our
                  entire collection
                </p>
                <div className="card-actions">
                  <ModalTrigger>
                    <button className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <FaUserPlus className="w-5 h-5" />
                      Create Free Account
                    </button>
                  </ModalTrigger>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="footer footer-center p-6 sm:p-10 bg-base-200 text-base-content"
          id="Contacts"
        >
          <div className="w-full max-w-7xl">
            <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold">
              <BiBook className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span>CityLibrary</span>
            </div>
            <p className="max-w-md mt-2 text-sm sm:text-base px-4">
              Your trusted partner in knowledge discovery since 2024
            </p>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base">
              <a className="link link-hover">About</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Privacy</a>
              <a className="link link-hover">Terms</a>
            </div>
          </div>
          <div className="w-full">
            <p className="text-xs sm:text-sm text-center px-4">
              Copyright © 2024 - All rights reserved by CityLibrary
            </p>
          </div>
        </footer>
      </div>
      <Modal>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <FaXmark className="w-5 h-5" />
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </Modal>
    </>
  );
};

const ModalWrapper = () => {
  return (
    <ModalProvider>
      <Home />
    </ModalProvider>
  );
};
export const Route = createFileRoute("/")({
  component: ModalWrapper,
});
