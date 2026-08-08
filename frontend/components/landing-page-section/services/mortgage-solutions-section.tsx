"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoanProgram {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  features: string[];
  icon: React.ReactNode;
}

export function MortgageSolutionsSection() {
  const [selectedId, setSelectedId] = useState<string>("purchase");

  const programs: LoanProgram[] = [
    {
      id: "purchase",
      title: "Home Purchase Loans",
      badge: "Most Popular",
      description: "Customized mortgage solutions designed to help you buy your dream home, second residence, or investment property with maximum buying power.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      stats: [
        { label: "Min. Down Payment", value: "3% - 5%" },
        { label: "Loan Terms", value: "15 - 30 Yrs" },
        { label: "Rate Lock", value: "60 Days" },
        { label: "Pre-Approval", value: "24 Hours" }
      ],
      features: [
        "Low Down Payment Options",
        "Fixed & Adjustable Rates",
        "Fast Pre-Approval Letter",
        "Dedicated Closing Advisor"
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: "refinance",
      title: "Rate & Term Refinance",
      badge: "Lower Monthly Payment",
      description: "Optimize your home financing by securing a lower interest rate, shortening your loan duration, or eliminating monthly mortgage insurance.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      stats: [
        { label: "Potential Savings", value: "$300+/mo" },
        { label: "Loan Terms", value: "10 - 30 Yrs" },
        { label: "Appraisal Waiver", value: "Available" },
        { label: "Turnaround", value: "14 - 21 Days" }
      ],
      features: [
        "Lower Monthly Interest Cost",
        "Switch ARM to Fixed Rate",
        "Shorter 15-Year Payoff Options",
        "Zero Out-of-Pocket Closing Costs"
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: "cashout",
      title: "Cash-Out Refinance",
      badge: "Access Home Equity",
      description: "Convert your accumulated home equity into liquid capital for home renovations, debt consolidation, investment opportunities, or major expenses.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      stats: [
        { label: "Max LTV Equity", value: "Up to 80%" },
        { label: "Payout Method", value: "Lump Sum" },
        { label: "Use of Funds", value: "Unrestricted" },
        { label: "Tax Benefit", value: "Consult CPA" }
      ],
      features: [
        "Lump-Sum Cash Proceeds",
        "Consolidate High-Interest Cards",
        "Fund Major Home Remodels",
        "Fixed Rate Security"
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: "firsttime",
      title: "First-Time Buyer Programs",
      badge: "Down Payment Support",
      description: "Guided home financing built specifically for first-time buyers with flexible credit criteria, down payment grants, and step-by-step counsel.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      stats: [
        { label: "Down Payment", value: "3% Minimum" },
        { label: "Grants", value: "Available" },
        { label: "Min Credit Score", value: "620+" },
        { label: "Education", value: "Included" }
      ],
      features: [
        "Down Payment Assistance",
        "Flexible Credit Requirements",
        "First-Time Buyer Grants",
        "Personalized Guidance"
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: "fha-va",
      title: "FHA & VA Government Loans",
      badge: "Government Backed",
      description: "Flexible government-insured mortgages including 0% down VA loans for military veterans and accessible 3.5% down FHA financing.",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=85",
      stats: [
        { label: "VA Down Payment", value: "0% Down" },
        { label: "FHA Down Payment", value: "3.5% Down" },
        { label: "VA Funding Fee", value: "Can Waive" },
        { label: "Streamline Refi", value: "IRRRL / FHA" }
      ],
      features: [
        "0% Down Payment for VA Borrowers",
        "Low Minimum Credit Thresholds",
        "Competitive Government Rates",
        "Streamline No-Appraisal Refinance"
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: "jumbo",
      title: "Jumbo Luxury Loans",
      badge: "High-Balance Financing",
      description: "Bespoke high-balance mortgage structures tailored for luxury estates, primary residences, and vacation retreats exceeding conventional limits.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
      stats: [
        { label: "Max Loan Amount", value: "Up to $5M+" },
        { label: "Down Payment", value: "From 10%" },
        { label: "Underwriting", value: "Portfolio Tailored" },
        { label: "Pricing", value: "Relationship Tier" }
      ],
      features: [
        "High-Balance Luxury Financing",
        "Custom Asset Underwriting",
        "Competitive High-Limit Rates",
        "Discreet Concierge Service"
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  const activeProgram = programs.find((p) => p.id === selectedId) || programs[0];

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-text">
          Mortgage Programs Crafted for Your Goals
        </h2>
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          From first-time homebuyers to luxury portfolio investors, Rebekah provides custom loan structures, competitive rates, and seamless clear-to-close guidance.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto p-2 bg-surface/80 border border-line rounded-2xl backdrop-blur-md shadow-sm">
        {programs.map((program) => {
          const isSelected = program.id === selectedId;
          return (
            <button
              key={program.id}
              onClick={() => setSelectedId(program.id)}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-jet text-white shadow-md border border-jet"
                  : "text-text/70 hover:text-text hover:bg-surface-raised"
              }`}
            >
              <span className={isSelected ? "text-accent" : "text-muted"}>{program.icon}</span>
              <span>{program.title}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProgram.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-3xl overflow-hidden border border-line bg-surface shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[500px]">
              <Image
                src={activeProgram.image}
                alt={activeProgram.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="text-xs uppercase font-bold tracking-widest text-champagne bg-surface-raised/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-line">
                  {activeProgram.badge}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  {activeProgram.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
                  {activeProgram.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-surface-raised/60">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-accent mb-2">Program Snapshot</h4>
                  <p className="text-sm text-text/85 leading-relaxed">
                    {activeProgram.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {activeProgram.stats.map((stat, idx) => (
                    <div key={idx} className="p-3.5 bg-surface rounded-2xl border border-line space-y-1 shadow-2xs">
                      <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">{stat.label}</span>
                      <span className="text-sm sm:text-base font-bold text-text block">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-text">Key Features & Advantages</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeProgram.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-surface/80 border border-line/60">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
                          ✓
                        </div>
                        <span className="text-xs font-medium text-text/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-muted">Ready to discuss rates for this program?</p>
                  <p className="text-sm font-semibold text-text">Rebekah offers custom rate locks & scenario modeling.</p>
                </div>
                <a
                  href="#booking"
                  className="w-full sm:w-auto px-6 py-3.5 bg-jet text-white font-medium text-xs rounded-xl shadow-md hover:bg-accent transition-colors text-center shrink-0 cursor-pointer"
                >
                  Book Call with Rebekah
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
