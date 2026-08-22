"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";
import { brandData } from "@/data/brand";

const formSchema = zod.object({
  service: zod.string().min(1, { message: "Please select a service" }),
  city: zod.string().min(2, { message: "Please enter your city/location" }),
  headcount: zod.string().optional(),
  name: zod.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: zod.string().min(10, { message: "Please enter a valid 10-digit phone number" }),
  email: zod.string().email({ message: "Please enter a valid email address" }).optional().or(zod.literal("")),
  company: zod.string().optional(),
  requirements: zod.string().optional(),
});

type FormData = zod.infer<typeof formSchema>;

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "Private Security Guarding",
      city: "Tiruchirappalli (Trichy)",
      headcount: "1 - 5 Personnel",
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    let fieldsToValidate: ("service" | "city" | "headcount" | "name" | "phone" | "email" | "company" | "requirements")[] = [];
    if (step === 1) fieldsToValidate = ["service", "city"];
    else if (step === 2) fieldsToValidate = ["name", "phone"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const ref = `JSM-REQ-${Date.now().toString().slice(-4)}`;
    setReferenceId(ref);
    setSubmittedData(data);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          facilityName: data.company,
          service: data.service,
          headcount: data.headcount,
          location: data.city,
          notes: data.requirements,
          referenceId: ref,
        }),
      });
    } catch (err) {
      console.error('Failed to dispatch contact email:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 md:p-8 max-w-xl mx-auto shadow-sm">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-200/60 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
                  Step {step} of 3
                </span>
                <p className="text-xs font-bold text-black">
                  {step === 1 && "Operational Scope"}
                  {step === 2 && "Contact Details"}
                  {step === 3 && "Requirement Notes"}
                </p>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step ? "w-6 bg-black" : "w-2 bg-zinc-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Step 1: Service & Location */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="service" className="text-xs font-bold text-zinc-700">Primary Service Needed *</Label>
                    <select
                      id="service"
                      {...register("service")}
                      className="w-full h-11 px-3.5 bg-white border border-zinc-200 rounded-2xl text-xs font-medium text-zinc-900 focus:outline-none focus:border-black"
                    >
                      <option value="Private Security Guarding">Private Security Guarding</option>
                      <option value="Housekeeping & Facility Management">Housekeeping & Facility Management</option>
                      <option value="Contractual Manpower Supply">Contractual Manpower Supply</option>
                      <option value="Cash-in-Transit Operations">Cash-in-Transit Operations</option>
                      <option value="Event Security & Wedding Coordination">Event Security & Wedding Coordination</option>
                      <option value="Real Estate & Auction Site Support">Real Estate & Auction Site Support</option>
                      <option value="Software & Web Solutions">Software & Web Solutions</option>
                      <option value="Creative Media & Documentation">Creative Media & Documentation</option>
                      <option value="Multi-Service Bundled Contract">Multi-Service Bundled Contract</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs font-bold text-zinc-700">Premises City / District *</Label>
                      <Input
                        id="city"
                        placeholder="e.g. Trichy, Chennai, Coimbatore"
                        {...register("city")}
                        className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                      />
                      {errors.city && <p className="text-[10px] text-red-500">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="headcount" className="text-xs font-bold text-zinc-700">Estimated Headcount Needed</Label>
                      <select
                        id="headcount"
                        {...register("headcount")}
                        className="w-full h-11 px-3.5 bg-white border border-zinc-200 rounded-2xl text-xs font-medium text-zinc-900 focus:outline-none focus:border-black"
                      >
                        <option value="1 - 5 Personnel">1 - 5 Personnel</option>
                        <option value="6 - 15 Personnel">6 - 15 Personnel</option>
                        <option value="16 - 30 Personnel">16 - 30 Personnel</option>
                        <option value="30+ Large Deployment">30+ Large Deployment</option>
                        <option value="Event / Short-term Requirement">Event / Short-term Requirement</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full h-11 rounded-full bg-black hover:bg-zinc-800 text-white font-bold text-xs mt-2"
                  >
                    Continue to Contact Details <ArrowRight size={14} className="ml-1.5" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-bold text-zinc-700">Your Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        {...register("name")}
                        className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                      />
                      {errors.name && <p className="text-[10px] text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-bold text-zinc-700">Phone / WhatsApp Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="e.g. +91 94431 52000"
                        {...register("phone")}
                        className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                      />
                      {errors.phone && <p className="text-[10px] text-red-500">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold text-zinc-700">Email Address (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        {...register("email")}
                        className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                      />
                      {errors.email && <p className="text-[10px] text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="company" className="text-xs font-bold text-zinc-700">Company / Society Name</Label>
                      <Input
                        id="company"
                        placeholder="e.g. ABC Industrial Park / Tower RWA"
                        {...register("company")}
                        className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-1/3 h-11 rounded-full text-xs font-semibold"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-2/3 h-11 rounded-full bg-black hover:bg-zinc-800 text-white font-bold text-xs"
                    >
                      Continue <ArrowRight size={14} className="ml-1.5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Requirements & Final Submission */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="requirements" className="text-xs font-bold text-zinc-700">Requirement Scope & Shift Notes</Label>
                    <Textarea
                      id="requirements"
                      rows={3}
                      placeholder="Mention specific shift hours (e.g. 24/7 or Day only), property square footage, or target start date..."
                      {...register("requirements")}
                      className="rounded-2xl bg-white border-zinc-200 text-xs leading-relaxed"
                    />
                  </div>

                  <div className="p-3 bg-zinc-100 rounded-2xl text-[11px] text-zinc-600 space-y-1">
                    <p className="font-bold text-zinc-800 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#C5A880]" />
                      JSM Service Commitment:
                    </p>
                    <p>An operations manager will review your submission and contact you within 2 business hours to schedule the free site assessment.</p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-1/3 h-11 rounded-full text-xs font-semibold"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 h-11 rounded-full bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md"
                    >
                      {isSubmitting ? "Dispatching to Operations Desk..." : "Submit Assessment Request"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        ) : (
          /* Confirmation State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 text-center space-y-5"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Ticket Reference: {referenceId}
              </span>
              <h3 className="text-xl font-bold text-black pt-1">Assessment Request Received!</h3>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{submittedData?.name}</strong>. Our operations desk has received your request for <strong>{submittedData?.service}</strong> in <strong>{submittedData?.city}</strong>.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Operations,%20I%20have%20submitted%20site%20assessment%20request%20${referenceId}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageCircle size={15} /> WhatsApp Instant Verification
              </a>

              <Button
                variant="ghost"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                }}
                className="text-xs text-zinc-500 font-semibold"
              >
                Submit another request
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
