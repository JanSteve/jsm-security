"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Shield, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  User, 
  Mail, 
  ArrowRight, 
  Loader2, 
  Award,
  FileCheck
} from "lucide-react";
import { brandData } from "@/data/brand";

export default function BookAssessmentPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  const [bookingData, setBookingData] = useState({
    facilityType: "Manufacturing & Industrial Plant",
    location: "Tiruchirappalli (Trichy)",
    estimatedGuards: "4–8 Guards",
    housekeepingNeeded: "Yes, Daily Deep Cleaning",
    currentPainPoint: "Late arrivals and lack of replacement when guards are absent.",
    contactPerson: "",
    designation: "",
    companyName: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTimeSlot: "Morning (10:00 AM – 1:00 PM)",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.companyName || !bookingData.phone || !bookingData.contactPerson) return;

    setIsSubmitting(true);
    const generatedRef = `JSM-ASSESS-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefId(generatedRef);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.contactPerson,
          phone: bookingData.phone,
          email: bookingData.email,
          facilityName: bookingData.companyName,
          service: `On-Site Assessment Request: ${bookingData.facilityType} (${bookingData.estimatedGuards})`,
          headcount: `${bookingData.estimatedGuards} | Housekeeping: ${bookingData.housekeepingNeeded}`,
          location: bookingData.location,
          notes: `Designation: ${bookingData.designation}. Preferred Date/Time: ${bookingData.preferredDate} (${bookingData.preferredTimeSlot}). Pain Points: ${bookingData.currentPainPoint}. Ref: ${generatedRef}.`,
          referenceId: generatedRef,
        }),
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Booking submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1A1F2E] pt-24 pb-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 text-left border-b border-[#E5E7EB] pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E5BA8] uppercase tracking-wider">
            <Calendar size={14} />
            <span>Executive Consultation &bull; Major AR Devadoss</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F1922] tracking-tight">
            Schedule a Confidential Site Security &amp; Facility Assessment.
          </h1>
          <p className="text-sm sm:text-base text-[#4A5160] max-w-2xl leading-relaxed">
            Our Head of Operations, Major AR Devadoss (Army-Veteran), will review your perimeter vulnerability, shift rosters, and statutory compliance protocols with zero obligation.
          </p>
        </div>

        {!isSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Multi-Step Form (8 cols) */}
            <div className="lg:col-span-8 bg-[#F8F9FA] border border-[#E5E7EB] p-6 sm:p-8 space-y-6 rounded-[4px] text-left">
              
              {/* Stepper Progress */}
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 text-xs font-semibold">
                <span className={step >= 1 ? "text-[#1E5BA8]" : "text-[#4A5160]"}>
                  1. Facility Profile
                </span>
                <span className="text-[#E5E7EB]">&bull;&bull;&bull;</span>
                <span className={step >= 2 ? "text-[#1E5BA8]" : "text-[#4A5160]"}>
                  2. Scope &amp; Pain Points
                </span>
                <span className="text-[#E5E7EB]">&bull;&bull;&bull;</span>
                <span className={step >= 3 ? "text-[#1E5BA8]" : "text-[#4A5160]"}>
                  3. Contact &amp; Schedule
                </span>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-[#0F1922]">
                    Step 1: Tell us about your facility
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1.5">
                      Facility Category *
                    </label>
                    <select
                      value={bookingData.facilityType}
                      onChange={(e) => setBookingData({ ...bookingData, facilityType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                    >
                      <option>Manufacturing &amp; Industrial Plant</option>
                      <option>Corporate IT Park / SEZ Campus</option>
                      <option>Hospital &amp; Healthcare Facility</option>
                      <option>Commercial Office Building</option>
                      <option>Logistics &amp; Warehouse Hub</option>
                      <option>Educational Campus / University</option>
                      <option>Other Commercial Property</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1.5">
                      Operational Location in Tamil Nadu *
                    </label>
                    <select
                      value={bookingData.location}
                      onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                    >
                      <option>Tiruchirappalli (HQ &amp; Central TN)</option>
                      <option>Chennai (OMR / Sriperumbudur / Guindy)</option>
                      <option>Coimbatore (Industrial Outposts)</option>
                      <option>Hosur (Manufacturing SEZ)</option>
                      <option>Salem (Steel &amp; Industrial Corridor)</option>
                      <option>Madurai (Southern Regional Hub)</option>
                      <option>Tirunelveli &amp; Tuticorin</option>
                      <option>Erode &amp; Tiruppur</option>
                    </select>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 h-[44px] rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>Continue to Scope &amp; Pain Points</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-[#0F1922]">
                    Step 2: Security &amp; Facility Requirements
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1.5">
                      Estimated Guard Force Required
                    </label>
                    <select
                      value={bookingData.estimatedGuards}
                      onChange={(e) => setBookingData({ ...bookingData, estimatedGuards: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                    >
                      <option>1–3 Guards (Small Facility)</option>
                      <option>4–8 Guards (Medium Plant / Office)</option>
                      <option>9–15 Guards (Large Industrial Campus)</option>
                      <option>16+ Guards (Multi-Shift Aviation / Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1.5">
                      Mechanized Housekeeping Scope
                    </label>
                    <select
                      value={bookingData.housekeepingNeeded}
                      onChange={(e) => setBookingData({ ...bookingData, housekeepingNeeded: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                    >
                      <option>Yes, Daily Deep Cleaning &amp; Ride-On Scrubbing</option>
                      <option>Yes, 3x per Week Maintenance</option>
                      <option>No, Security Guarding Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1.5">
                      Current Operational Pain Point or Challenge
                    </label>
                    <textarea
                      rows={3}
                      value={bookingData.currentPainPoint}
                      onChange={(e) => setBookingData({ ...bookingData, currentPainPoint: e.target.value })}
                      placeholder="e.g. Unreliable absenteeism, poor turnout, high shrinkage, or statutory compliance risks..."
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                    />
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 h-[44px] rounded-[4px] border border-[#E5E7EB] text-xs font-semibold text-[#4A5160] hover:bg-white"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 h-[44px] rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>Continue to Schedule</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-semibold text-[#0F1922]">
                    Step 3: Contact &amp; Consultation Window
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                        Company / Facility Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={bookingData.companyName}
                        onChange={(e) => setBookingData({ ...bookingData, companyName: e.target.value })}
                        placeholder="e.g. Hyundai Tier-1 Vendor"
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={bookingData.contactPerson}
                        onChange={(e) => setBookingData({ ...bookingData, contactPerson: e.target.value })}
                        placeholder="e.g. Suresh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8] tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        placeholder="e.g. suresh@company.com"
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.preferredDate}
                        onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={bookingData.preferredTimeSlot}
                        onChange={(e) => setBookingData({ ...bookingData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] text-xs text-[#1A1F2E] outline-none focus:ring-1 focus:ring-[#1E5BA8]"
                      >
                        <option>Morning (10:00 AM – 1:00 PM)</option>
                        <option>Afternoon (2:00 PM – 4:00 PM)</option>
                        <option>Evening (4:00 PM – 7:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 h-[44px] rounded-[4px] border border-[#E5E7EB] text-xs font-semibold text-[#4A5160] hover:bg-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-[44px] rounded-[4px] bg-[#10A870] hover:bg-[#0D875A] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-subtle"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Confirming Booking...</span>
                        </>
                      ) : (
                        <span>Confirm Site Assessment Request</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Credentials Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="bg-[#F8F9FA] border border-[#E5E7EB] p-5 space-y-3.5 rounded-[4px]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F1922]">
                  <Award size={16} className="text-[#9C7A3C]" />
                  <span>Founder-Led Site Audit</span>
                </div>
                <p className="text-xs text-[#4A5160] leading-relaxed">
                  Direct evaluation conducted by Major AR Devadoss (Army-Veteran) and Sweety J (Proprietor &amp; MD).
                </p>
                <div className="pt-2 border-t border-[#E5E7EB] space-y-2 text-xs text-[#1A1F2E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#10A870]" />
                    <span>Perimeter &amp; Gate Audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#10A870]" />
                    <span>Statutory EPF/ESIC Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#10A870]" />
                    <span>2-Hour SLA Commitment</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] p-5 space-y-2 rounded-[4px]">
                <span className="text-xs font-semibold text-[#0F1922]">Direct Operations Desk:</span>
                <div className="text-xs text-[#4A5160]">
                  Phone: <a href={`tel:${brandData.contact.phone}`} className="font-semibold text-[#1E5BA8]">{brandData.contact.phoneDisplay}</a>
                </div>
                <div className="text-xs text-[#4A5160]">
                  Email: <a href={`mailto:${brandData.contact.email}`} className="text-[#1E5BA8]">{brandData.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#F8F9FA] border border-[#E5E7EB] p-8 sm:p-12 text-center space-y-4 rounded-[4px] max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#E8F8F2] text-[#10A870] flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#0F1922]">
              Site Assessment Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed">
              Your appointment request (Ref: <strong className="text-[#0F1922] font-mono">{refId}</strong>) has been scheduled. Major AR Devadoss will contact you at <strong className="text-[#0F1922]">{bookingData.phone}</strong> to confirm the exact on-site arrival window.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="px-6 h-[44px] rounded-[4px] bg-[#0F1922] text-white text-xs font-semibold flex items-center justify-center"
              >
                Return to Homepage
              </Link>
              <a
                href={`https://wa.me/${brandData.contact.whatsapp}?text=Hi%20JSM,%20I%20just%20booked%20an%20assessment%20ref%20${refId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 h-[44px] rounded-[4px] border border-[#10A870] text-[#10A870] hover:bg-[#E8F8F2] text-xs font-semibold flex items-center justify-center"
              >
                WhatsApp Us Directly
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
