"use client";

import React, { useState, useEffect, useId } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck,
  Building2,
  Briefcase
} from "lucide-react";

/**
 * Service Mandate Options matching PROJECT.md interface contract
 * and ServicesSection catalog.
 */
export const SERVICE_OPTIONS = [
  { value: "talent-acquisition", label: "Senior Talent Acquisition (Employer Mandate)" },
  { value: "candidate-registration", label: "Executive Candidate Registration (Apply for ₹12L–₹1Cr Roles)" },
  { value: "executive-search", label: "Executive Search & Board Advisory" },
  { value: "bulk-hiring", label: "Bulk & Specialized Technical Hiring" },
  { value: "campus-lateral", label: "Campus & Lateral Fast-Track Programmes" },
  { value: "hr-advisory", label: "Strategic HR & Compensation Advisory" },
] as const;

/**
 * Role Compensation Bands matching RoleBandsSection and CONFIRM_ITEMS.md.
 * Tags [CONFIRM: role band] maintained in compliance with Requirement R3.
 */
export const ROLE_BAND_OPTIONS = [
  { value: "₹12 LPA – ₹25 LPA", label: "₹12 LPA – ₹25 LPA (Mid-Senior Leadership) [CONFIRM: role band]" },
  { value: "₹25 LPA – ₹50 LPA", label: "₹25 LPA – ₹50 LPA (Functional Heads & Directors) [CONFIRM: role band]" },
  { value: "₹50 LPA – ₹1 Cr", label: "₹50 LPA – ₹1 Cr (Executive & C-Suite) [CONFIRM: role band]" },
  { value: "Above ₹1 Cr", label: "Above ₹1 Cr (Enterprise / Custom Mandate) [CONFIRM: role band]" },
  { value: "Multiple Bands / Bulk", label: "Multiple Compensation Bands / Scaled Squads" },
] as const;

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  roleBand: string;
  company: string;
  notes: string;
  honeypot: string;
}

export interface EnquiryFormProps {
  initialService?: string;
  initialRoleBand?: string;
  className?: string;
  onSuccess?: (referenceId: string) => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  roleBand?: string;
  company?: string;
  notes?: string;
  honeypot?: string;
}

/**
 * Validates a single field or entire form state.
 */
function validateField(name: keyof EnquiryFormData, value: string): string | undefined {
  const trimmed = value.trim();

  switch (name) {
    case "name":
      if (!trimmed) {
        return "Please enter your full name (minimum 2 characters).";
      }
      if (trimmed.length < 2) {
        return "Name must be at least 2 characters.";
      }
      if (trimmed.length > 100) {
        return "Name must not exceed 100 characters.";
      }
      return undefined;

    case "email":
      if (!trimmed) {
        return "Please provide your corporate or contact email address.";
      }
      // Strict standard email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed)) {
        return "Please enter a valid email address (e.g., name@company.com).";
      }
      return undefined;

    case "phone":
      if (!trimmed) {
        return "Please provide a direct phone number for mandate coordination.";
      }
      // Standard phone format: 10 to 15 digits, allowing spaces, +, -, and parentheses
      if (!/^[0-9+() -]{10,15}$/.test(trimmed)) {
        return "Please enter a valid phone number (10 to 15 digits).";
      }
      return undefined;

    case "service":
      if (!trimmed) {
        return "Please select a service mandate.";
      }
      return undefined;

    case "company":
      if (trimmed.length > 150) {
        return "Company name must not exceed 150 characters.";
      }
      return undefined;

    case "notes":
      if (trimmed.length > 2000) {
        return "Mandate notes must not exceed 2000 characters.";
      }
      return undefined;

    default:
      return undefined;
  }
}

/**
 * Accessible Enquiry Form Component
 *
 * Implements:
 * - 100% visible labels on every form control via matching id and htmlFor
 * - Hidden anti-spam honeypot defense (tabIndex={-1}, aria-hidden="true", toBeHidden())
 * - Responsive 1-column collapse on viewports below 760px (grid-cols-1 md:grid-cols-2)
 * - 44px+ minimum tap target ergonomics
 * - Real-time and on-blur validation with aria-live="polite" error announcements
 * - Serverless API submission (/api/contact) with loading, success, and error recovery states
 * - Warm Paper & Ink editorial design system styling
 */
export function EnquiryForm({
  initialService = "talent-acquisition",
  initialRoleBand = "₹12 LPA – ₹25 LPA",
  className = "",
  onSuccess,
}: EnquiryFormProps) {
  const formUid = useId();

  // Form State
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    roleBand: initialRoleBand,
    company: "",
    notes: "",
    honeypot: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");
  const [submittedSnapshot, setSubmittedSnapshot] = useState<EnquiryFormData | null>(null);

  // Sync initial props or hash changes on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("ctc=")) {
        const ctcMatch = hash.match(/ctc=(\d+)/);
        if (ctcMatch && ctcMatch[1]) {
          const ctcVal = parseInt(ctcMatch[1], 10);
          const targetBand =
            ctcVal < 2500000
              ? "₹12 LPA – ₹25 LPA"
              : ctcVal < 5000000
                ? "₹25 LPA – ₹50 LPA"
                : "₹50 LPA – ₹1 Cr";
          const timer = setTimeout(() => {
            setFormData((prev) => ({ ...prev, roleBand: targetBand }));
          }, 0);
          return () => clearTimeout(timer);
        }
      }
    }
  }, []);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If field was already touched, re-validate immediately for smooth correction
    if (touched[name]) {
      const fieldError = validateField(name as keyof EnquiryFormData, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  // Handle Input Blur
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name as keyof EnquiryFormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  // Run full validation check
  const validateForm = (): boolean => {
    const nextErrors: ValidationErrors = {};
    const fieldsToValidate: (keyof EnquiryFormData)[] = [
      "name",
      "email",
      "phone",
      "service",
      "company",
      "notes",
    ];

    let hasErrors = false;
    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        nextErrors[field] = err;
        hasErrors = true;
      }
    });

    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      roleBand: true,
      company: true,
      notes: true,
    });

    return !hasErrors;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Anti-spam honeypot defense check
    if (formData.honeypot && formData.honeypot.trim() !== "") {
      // Honeypot was filled: reject immediately
      setStatus("error");
      setStatusMessage("Submission rejected. Automated bot activity detected.");
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields before submitting.");

      // Focus first invalid input element
      const firstInvalidField = ["name", "email", "phone"].find(
        (f) => errors[f as keyof ValidationErrors] || validateField(f as keyof EnquiryFormData, formData[f as keyof EnquiryFormData])
      );
      if (firstInvalidField) {
        const el = document.getElementById(`enquiry-${firstInvalidField}`);
        if (el) el.focus();
      }
      return;
    }

    setStatus("submitting");
    setStatusMessage("Transmitting mandate brief to executive recruitment desk...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          roleBand: formData.roleBand,
          company: formData.company.trim(),
          notes: formData.notes.trim(),
          honeypot: formData.honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const ticket = result.referenceId || `JSM-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
        setReferenceId(ticket);
        setSubmittedSnapshot({ ...formData });
        setStatus("success");
        setStatusMessage(
          `Mandate brief received successfully. Ticket Reference: ${ticket}. Our executive recruitment desk will connect within 24 business hours.`
        );
        if (onSuccess) {
          onSuccess(ticket);
        }
      } else {
        setStatus("error");
        setStatusMessage(
          result.error || "Unable to submit your mandate brief. Please retry or contact our desk directly."
        );
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage(
        "Network connection interrupted. Please verify your connection or call our executive desk at +91 90808 63448."
      );
    }
  };

  // Reset form to clean idle state
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: initialService,
      roleBand: initialRoleBand,
      company: "",
      notes: "",
      honeypot: "",
    });
    setTouched({});
    setErrors({});
    setStatus("idle");
    setStatusMessage("");
    setReferenceId("");
    setSubmittedSnapshot(null);
  };

  // SUCCESS CONFIRMATION STATE
  if (status === "success") {
    return (
      <div
        role="region"
        aria-label="Mandate Brief Submission Confirmation"
        className={`bg-white border border-[#0E1116]/10 rounded-2xl p-6 sm:p-8 md:p-10 text-[#0E1116] shadow-sm animate-fade-rise ${className}`}
      >
        <div className="max-w-xl mx-auto text-center space-y-6">
          {/* Success Badge */}
          <div className="w-16 h-16 rounded-full bg-[#1F4E5F]/10 border border-[#1F4E5F]/20 text-[#1F4E5F] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-[#1F4E5F]" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4E5F]/8 border border-[#1F4E5F]/20 text-xs font-mono font-semibold text-[#1F4E5F]">
              <span>Ticket Reference:</span>
              <strong className="tabular-nums tracking-wider">{referenceId}</strong>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-[#0E1116]">
              Executive Mandate Brief Received
            </h3>

            <p className="text-sm sm:text-base font-sans text-[#4A5568] leading-relaxed max-w-md mx-auto text-pretty">
              Thank you, <strong className="text-[#0E1116]">{submittedSnapshot?.name}</strong>. Your talent specification has been registered directly at our Central Operations Desk.
            </p>
          </div>

          {/* SLA Commitment Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F6F3EE] border border-[#0E1116]/10 text-left space-y-2 text-xs sm:text-sm font-sans">
            <div className="flex items-center gap-2 font-semibold text-[#0E1116]">
              <Clock className="w-4 h-4 text-[#1F4E5F] shrink-0" aria-hidden="true" />
              <span>24-Business-Hour Response Commitment</span>
            </div>
            <p className="text-[#4A5568] leading-relaxed">
              A Lead Recruitment Partner will review your operational requirements, calibrate search parameters, and connect via telephone or email within 24 business hours.
            </p>
          </div>

          {/* Submitted Mandate Summary Card */}
          {submittedSnapshot && (
            <div className="rounded-xl border border-[#0E1116]/10 p-4 text-left space-y-2.5 text-xs font-sans bg-white">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#525866] block">
                Registered Mandate Overview
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#0E1116]/8">
                <div>
                  <span className="text-[#525866] block">Service Scope:</span>
                  <span className="font-medium text-[#0E1116]">
                    {SERVICE_OPTIONS.find((s) => s.value === submittedSnapshot.service)?.label || submittedSnapshot.service}
                  </span>
                </div>
                <div>
                  <span className="text-[#525866] block">Compensation Band:</span>
                  <span className="font-medium text-[#0E1116]">
                    {submittedSnapshot.roleBand}
                  </span>
                </div>
                <div>
                  <span className="text-[#525866] block">Contact Mobile:</span>
                  <span className="font-semibold text-[#0E1116] tabular-nums">
                    {submittedSnapshot.phone}
                  </span>
                </div>
                <div>
                  <span className="text-[#525866] block">Corporate Email:</span>
                  <span className="font-medium text-[#0E1116] break-all">
                    {submittedSnapshot.email}
                  </span>
                </div>
                {submittedSnapshot.company && (
                  <div className="sm:col-span-2">
                    <span className="text-[#525866] block">Organization:</span>
                    <span className="font-medium text-[#0E1116]">
                      {submittedSnapshot.company}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Commercial Invariant Notice */}
          <div className="flex items-center justify-center gap-2 text-xs font-sans text-[#525866]">
            <ShieldCheck className="w-4 h-4 text-[#1F4E5F]" aria-hidden="true" />
            <span>100% Contingency Model: Zero upfront retainers. Fee [CONFIRM: fee %] invoiced strictly upon joining.</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-[#0E1116] text-white text-xs sm:text-sm font-sans font-semibold hover:bg-[#C8553D] active:scale-[0.98] transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8553D] focus-visible:outline-offset-2"
            >
              Submit Another Mandate
            </button>

            <a
              href="tel:+919080863448"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#F6F3EE] border border-[#0E1116]/15 text-[#0E1116] text-xs sm:text-sm font-sans font-semibold hover:bg-[#0E1116]/5 transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#1F4E5F]" aria-hidden="true" />
              <span>Direct Desk: +91 90808 63448</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EDITING STATE (IDLE / SUBMITTING / ERROR)
  return (
    <div
      className={`bg-white border border-[#0E1116]/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm text-[#0E1116] ${className}`}
    >
      {/* Accessible Live Announcement Region for Assistive Technology */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>

      <div className="mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F3EE] border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F]">
          <Briefcase className="w-3.5 h-3.5 text-[#1F4E5F]" aria-hidden="true" />
          <span>Employer Mandate Intake</span>
        </div>
        <h3
          id="enquiry-form-title"
          className="text-xl sm:text-2xl font-heading font-medium text-[#0E1116] tracking-tight"
        >
          Submit Executive Hiring Requirement
        </h3>
        <p className="text-xs sm:text-sm text-[#4A5568] font-sans leading-relaxed text-pretty">
          Provide your candidate parameters below. Zero upfront fees. Invoiced strictly upon candidate onboarding [CONFIRM: fee %].
        </p>
      </div>

      {/* Global Error Banner (if submission failed) */}
      {status === "error" && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-6 p-4 rounded-xl bg-[#C8553D]/8 border border-[#C8553D]/30 text-[#0E1116] text-xs sm:text-sm font-sans space-y-1 animate-fade-rise"
        >
          <div className="flex items-center gap-2 font-semibold text-[#C8553D]">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Submission Action Required</span>
          </div>
          <p className="text-[#4A5568] pl-6 leading-relaxed">
            {statusMessage || "Please review the highlighted fields below."}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="enquiry-form-title"
        className="space-y-5"
      >
        {/* Anti-Spam Hidden Honeypot Defense:
            Mandatory: name="honeypot", data-honeypot="true", tabIndex={-1}, aria-hidden="true",
            hidden via CSS display: none and positioned off-screen.
            Verified by tests/e2e/home.spec.ts:238-245 */}
        <div
          aria-hidden="true"
          className="hidden"
          style={{ display: "none", position: "absolute", left: "-9999px" }}
        >
          <label htmlFor="enquiry-honeypot">Leave this field blank</label>
          <input
            type="text"
            id="enquiry-honeypot"
            name="honeypot"
            data-honeypot="true"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
          />
        </div>

        {/* 2-Column Responsive Form Grid:
            Must collapse to single column below 760px to satisfy tests/e2e/home.spec.ts:64-92.
            Using md:grid-cols-2 (768px+) strictly ensures single column on 360px, 390px, and 750px viewports. */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          data-grid-container="true"
        >
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="enquiry-name"
              id="enquiry-name-label"
              className="text-xs font-semibold uppercase tracking-wider text-[#0E1116] block"
            >
              Full Name <span className="text-[#C8553D]" aria-hidden="true">*</span>
              <span className="sr-only">(Required)</span>
            </label>
            <input
              type="text"
              id="enquiry-name"
              name="name"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "enquiry-name-error" : undefined}
              placeholder="e.g. Senthil Nathan"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === "submitting"}
              className={`h-11 min-h-[44px] w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#0E1116] placeholder:text-[#525866] focus:ring-2 focus:ring-[#C8553D]/20 outline-none transition-colors ${
                errors.name
                  ? "border-[#C8553D] focus:border-[#C8553D]"
                  : "border-[#0E1116]/18 focus:border-[#C8553D]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.name && (
              <p
                id="enquiry-name-error"
                role="alert"
                className="text-xs font-medium text-[#C8553D] mt-1 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* 2. Direct Phone / WhatsApp */}
          <div className="space-y-1.5">
            <label
              htmlFor="enquiry-phone"
              id="enquiry-phone-label"
              className="text-xs font-semibold uppercase tracking-wider text-[#0E1116] block"
            >
              Phone / WhatsApp <span className="text-[#C8553D]" aria-hidden="true">*</span>
              <span className="sr-only">(Required)</span>
            </label>
            <input
              type="tel"
              id="enquiry-phone"
              name="phone"
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
              placeholder="+91 98401 23456"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === "submitting"}
              className={`h-11 min-h-[44px] w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#0E1116] placeholder:text-[#525866] tabular-nums focus:ring-2 focus:ring-[#C8553D]/20 outline-none transition-colors ${
                errors.phone
                  ? "border-[#C8553D] focus:border-[#C8553D]"
                  : "border-[#0E1116]/18 focus:border-[#C8553D]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.phone && (
              <p
                id="enquiry-phone-error"
                role="alert"
                className="text-xs font-medium text-[#C8553D] mt-1 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* 3. Corporate Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="enquiry-email"
              id="enquiry-email-label"
              className="text-xs font-semibold uppercase tracking-wider text-[#0E1116] block"
            >
              Corporate Email <span className="text-[#C8553D]" aria-hidden="true">*</span>
              <span className="sr-only">(Required)</span>
            </label>
            <input
              type="email"
              id="enquiry-email"
              name="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "enquiry-email-error" : undefined}
              placeholder="senthil@apexindustries.in"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === "submitting"}
              className={`h-11 min-h-[44px] w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#0E1116] placeholder:text-[#525866] focus:ring-2 focus:ring-[#C8553D]/20 outline-none transition-colors ${
                errors.email
                  ? "border-[#C8553D] focus:border-[#C8553D]"
                  : "border-[#0E1116]/18 focus:border-[#C8553D]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.email && (
              <p
                id="enquiry-email-error"
                role="alert"
                className="text-xs font-medium text-[#C8553D] mt-1 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* 4. Organization / Company */}
          <div className="space-y-1.5">
            <label
              htmlFor="enquiry-company"
              id="enquiry-company-label"
              className="text-xs font-semibold uppercase tracking-wider text-[#0E1116] block"
            >
              Company / Organization
            </label>
            <input
              type="text"
              id="enquiry-company"
              name="company"
              autoComplete="organization"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "enquiry-company-error" : undefined}
              placeholder="e.g. Apex Industries Pvt Ltd"
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === "submitting"}
              className="h-11 min-h-[44px] w-full px-3.5 py-2.5 bg-white border border-[#0E1116]/18 rounded-xl text-sm text-[#0E1116] placeholder:text-[#525866] focus:border-[#C8553D] focus:ring-2 focus:ring-[#C8553D]/20 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.company && (
              <p
                id="enquiry-company-error"
                role="alert"
                className="text-xs font-medium text-[#C8553D] mt-1 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.company}</span>
              </p>
            )}
          </div>

          {/* 5. Service Mandate Selection */}
          <div className="space-y-1.5">
            <label
              htmlFor="enquiry-service"
              id="enquiry-service-label"
              className="text-xs font-semibold uppercase tracking-wider text-[#0E1116] block"
            >
              Service Mandate <span className="text-[#C8553D]" aria-hidden="true">*</span>
            </label>
            <select
              id="enquiry-service"
              name="service"
              required
              aria-required="true"
              value={formData.service}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === "submitting"}
              className="h-11 min-h-[44px] w-full px-3.5 py-2 bg-white border border-[#0E1116]/18 rounded-xl text-sm text-[#0E1116] focus:border-[#C8553D] focus:ring-2 focus:ring-[#C8553D]/20 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Target Role Compensation Band */}
          <div className="space-y-1.5">
            <label
              htmlFor="enquiry-role-band"
              id="enquiry-role-band-label"
              className="text-xs font-semibold uppercase tracking-wider text-[#0E1116] block"
            >
              Target Role Band <span className="text-[#525866] font-normal lowercase">(annual fixed CTC)</span>
            </label>
            <select
              id="enquiry-role-band"
              name="roleBand"
              value={formData.roleBand}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === "submitting"}
              className="h-11 min-h-[44px] w-full px-3.5 py-2 bg-white border border-[#0E1116]/18 rounded-xl text-sm text-[#0E1116] focus:border-[#C8553D] focus:ring-2 focus:ring-[#C8553D]/20 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ROLE_BAND_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7. Mandate Specification / Operational Notes */}
        <div className="space-y-1.5">
          <label
            htmlFor="enquiry-notes"
            id="enquiry-notes-label"
            className="text-xs font-semibold uppercase tracking-wider text-[#0E1116] block"
          >
            Role Specifications &amp; Location Details
          </label>
          <textarea
            id="enquiry-notes"
            name="notes"
            rows={4}
            maxLength={2000}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? "enquiry-notes-error" : undefined}
            placeholder="Outline target designation, operational location (e.g. Trichy plant, Chennai OMR tech hub, Bengaluru R&D), key technical requirements, or confidentiality parameters..."
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={status === "submitting"}
            className="w-full px-3.5 py-2.5 bg-white border border-[#0E1116]/18 rounded-xl text-sm text-[#0E1116] placeholder:text-[#525866] focus:border-[#C8553D] focus:ring-2 focus:ring-[#C8553D]/20 outline-none transition-colors resize-y leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.notes && (
            <p
              id="enquiry-notes-error"
              role="alert"
              className="text-xs font-medium text-[#C8553D] mt-1 flex items-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.notes}</span>
            </p>
          )}
        </div>

        {/* Commercial Assurance & Statutory Note */}
        <div className="p-3.5 rounded-xl bg-[#F6F3EE] border border-[#0E1116]/8 text-xs text-[#4A5568] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong>Contingency Model:</strong> Zero advance retainer required. Placement fees (8.33% [CONFIRM: fee %]) become due strictly upon candidate joining, backed by a 90-day replacement assurance [CONFIRM: fee %].
          </p>
        </div>

        {/* Form Submission Actions */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="min-h-[44px] min-w-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#0E1116] text-white text-sm font-sans font-semibold hover:bg-[#C8553D] active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#C8553D] focus-visible:outline-offset-2"
          >
            {status === "submitting" ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Transmitting Mandate Brief...</span>
              </>
            ) : status === "error" ? (
              <>
                <span>Retry Mandate Submission</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <span>Submit Mandate Brief</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>

          <span className="text-xs text-[#525866] font-sans text-center sm:text-right">
            Confidential mandate? Call desk:{" "}
            <a
              href="tel:+919080863448"
              className="font-semibold text-[#0E1116] hover:text-[#C8553D] underline underline-offset-4 transition-colors tabular-nums"
            >
              +91 90808 63448
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
