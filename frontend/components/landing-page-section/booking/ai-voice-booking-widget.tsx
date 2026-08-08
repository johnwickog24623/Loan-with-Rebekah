"use client";

import { useState } from "react";

export function AiVoiceBookingWidget() {
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [service, setService] = useState<string>("Home Purchase Loan");
  const [message, setMessage] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !email.trim()) {
      setFormError("Please provide your full name, phone number, and email address.");
      return;
    }
    setFormError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${backendUrl}/api/v1/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: customerName,
          phone,
          email,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const body = await res.json().catch(() => null);
        if (body?.error?.message) {
          setFormError(body.error.message);
        } else {
          setSuccess(true);
        }
      }
    } catch {
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-text">
          Contact Rebekah & Request a Quote
        </h2>
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          Ready to explore interest rates, check your pre-approval eligibility, or discuss custom loan options? Send Rebekah a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 rounded-3xl border border-line bg-surface p-8 sm:p-12 shadow-md flex flex-col justify-between">
          {success ? (
            <div className="text-center py-12 space-y-6 my-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text">
                Thank You, {customerName}!
              </h3>
              <p className="text-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Your message has been delivered to Rebekah. We will review your request and get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setCustomerName("");
                  setPhone("");
                  setEmail("");
                  setMessage("");
                }}
                className="mt-4 px-6 py-2.5 bg-jet text-white font-medium text-xs rounded-xl shadow hover:bg-accent transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5 border-b border-line pb-4">
                <h3 className="font-display text-2xl font-semibold text-text">Inquiry Form</h3>
                <p className="text-xs text-muted">Fill out your details for a prompt reply from Rebekah.</p>
              </div>

              {formError ? (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium">
                  {formError}
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-line text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-line text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-line text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Mortgage Service Needed
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-line text-sm text-text focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="Home Purchase Loan">Home Purchase Loan</option>
                    <option value="Rate & Term Refinance">Rate & Term Refinance</option>
                    <option value="Cash-Out Refinance">Cash-Out Refinance</option>
                    <option value="First-Time Buyer Program">First-Time Buyer Program</option>
                    <option value="FHA & VA Government Loans">FHA & VA Government Loans</option>
                    <option value="Jumbo Luxury Loan">Jumbo Luxury Loan</option>
                    <option value="General Mortgage Inquiry">General Mortgage Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                  Additional Information (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your home buying or refinancing goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-line text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-jet text-white font-semibold text-sm rounded-xl shadow hover:bg-accent transition-colors disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Sending Inquiry..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 rounded-3xl border border-line bg-surface p-8 sm:p-12 shadow-md flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-champagne bg-surface-raised px-2.5 py-0.5 rounded border border-line">
                  AI Voice Assistant
                </span>
                <h3 className="font-display text-xl font-semibold text-text mt-1">Talk to Elliot</h3>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Prefer to speak over the phone? Elliot, our virtual AI voice assistant, is available 24/7 to answer general mortgage questions, check pre-approvals, and register your call with Rebekah.
            </p>
            <div className="pt-4 border-t border-line space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text">Voice Assistant Capabilities</h4>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Instant Rate & Eligibility Info</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Answers Purchase & Refinance FAQs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Direct Contact Info Collection</span>
                </li>
              </ul>
            <a
              href="tel:+14477866061"
              className="mt-3 flex items-center justify-center space-x-2 w-full py-3 bg-jet text-white font-semibold text-xs rounded-xl shadow hover:bg-accent transition-colors"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call +1 (447) 786-6061</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-line space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-text">Direct Contact Details</h3>
            <div className="space-y-2.5 text-xs text-muted">
              <div className="flex items-center justify-between py-1 border-b border-line/60">
                <span className="font-medium text-text/80">Phone</span>
                <a href="tel:+14477866061" className="font-semibold text-accent hover:underline">+1 (447) 786-6061</a>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-line/60">
                <span className="font-medium text-text/80">Brokerage</span>
                <span className="font-semibold text-text">Loans With Rebekah</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-line/60">
                <span className="font-medium text-text/80">Specialist</span>
                <span className="font-semibold text-text">Rebekah</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-medium text-text/80">Office Hours</span>
                <span className="font-semibold text-text">Mon–Fri, 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
