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

  return (
    <div className="bg-[#0B0F17] border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-xl mx-auto shadow-2xl text-white">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#C5A880] block">
                  Step {step} of 3
                </span>
                <p className="text-xs font-bold text-white mt-0.5">
                  {step === 1 && "Operational scope"}
                  {step === 2 && "Contact details"}
                  {step === 3 && "Requirement notes"}
                </p>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step ? "w-6 bg-[#C5A880]" : "w-2 bg-zinc-800"
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
                    <Label htmlFor="service" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                      Primary Service Needed <span className="text-[#C5A880]">*</span>
                    </Label>
                    <select
                      id="service"
                      {...register("service")}
                      className="w-full h-11 px-3.5 bg-[#07090E] border border-zinc-700 rounded-2xl text-xs font-medium text-white focus:outline-none focus:border-[#C5A880] min-h-[44px]"
                    >
                      <option value="Private Security Guarding">Private Security Guarding (PSARA)</option>
                      <option value="Housekeeping & Facility Management">Housekeeping &amp; Facility Management</option>
                      <option value="Contractual Manpower Supply">Contractual Manpower Supply</option>
                      <option value="Tender & GeM Procurement Supply">Tender &amp; GeM Procurement Supply</option>
                      <option value="Scanning, Digitization & IT">Scanning, Digitization &amp; IT</option>
                      <option value="CSC Digital Citizen Services">CSC Digital Citizen Services</option>
                      <option value="Multi-Service Bundled Contract">Multi-Service Bundled Contract</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                        Premises City / District <span className="text-[#C5A880]">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="e.g. Trichy, Chennai, Coimbatore"
                        {...register("city")}
                        className="h-11 rounded-2xl bg-[#07090E] border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-[#C5A880] min-h-[44px]"
                      />
                      {errors.city && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="headcount" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                        Estimated Headcount Needed
                      </Label>
                      <select
                        id="headcount"
                        {...register("headcount")}
                        className="w-full h-11 px-3.5 bg-[#07090E] border border-zinc-700 rounded-2xl text-xs font-medium text-white focus:outline-none focus:border-[#C5A880] min-h-[44px]"
                      >
                        <option value="1 - 5 Personnel">1 – 5 Personnel</option>
                        <option value="6 - 15 Personnel">6 – 15 Personnel</option>
                        <option value="16 - 30 Personnel">16 – 30 Personnel</option>
                        <option value="30+ Large Deployment">30+ Enterprise Workforce</option>
                        <option value="Event / Short-term Requirement">Short-Term Event Squad</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full h-11 rounded-full bg-[#C5A880] hover:bg-[#b59870] text-black font-black text-xs mt-2 min-h-[44px] press-scale shadow-lg"
                  >
                    <span>Continue to contact details</span> <ArrowRight size={14} className="ml-1.5 text-black" />
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
                      <Label htmlFor="name" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                        Your Full Name <span className="text-[#C5A880]">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        {...register("name")}
                        className="h-11 rounded-2xl bg-[#07090E] border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-[#C5A880] min-h-[44px]"
                      />
                      {errors.name && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                        Phone / WhatsApp Number <span className="text-[#C5A880]">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className="h-11 rounded-2xl bg-[#07090E] border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-[#C5A880] font-mono tabular-nums min-h-[44px]"
                      />
                      {errors.phone && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                        Email Address (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        {...register("email")}
                        className="h-11 rounded-2xl bg-[#07090E] border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-[#C5A880] min-h-[44px]"
                      />
                      {errors.email && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="company" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                        Company / Society Name
                      </Label>
                      <Input
                        id="company"
                        placeholder="e.g. ABC Industrial Park / Tower RWA"
                        {...register("company")}
                        className="h-11 rounded-2xl bg-[#07090E] border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-[#C5A880] min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-1/3 h-11 rounded-full text-xs font-semibold bg-[#07090E] hover:bg-zinc-800 text-zinc-300 border-zinc-700 min-h-[44px] press-scale"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-2/3 h-11 rounded-full bg-[#C5A880] hover:bg-[#b59870] text-black font-black text-xs min-h-[44px] press-scale shadow-lg"
                    >
                      <span>Continue</span> <ArrowRight size={14} className="ml-1.5 text-black" />
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
                    <Label htmlFor="requirements" className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                      Requirement Scope &amp; Shift Notes
                    </Label>
                    <Textarea
                      id="requirements"
                      rows={3}
                      placeholder="Mention specific shift hours (e.g. 24/7 or Day only), property square footage, or target start date..."
                      {...register("requirements")}
                      className="rounded-2xl bg-[#07090E] border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-[#C5A880] leading-relaxed resize-none"
                    />
                  </div>

                  <div className="p-3.5 bg-[#07090E] border border-zinc-800 rounded-2xl text-[11px] text-zinc-300 space-y-1">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#C5A880]" />
                      JSM Service Commitment:
                    </p>
                    <p className="text-zinc-400">An operations manager will review your submission and contact you within 2 business hours to schedule the free site assessment.</p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-1/3 h-11 rounded-full text-xs font-semibold bg-[#07090E] hover:bg-zinc-800 text-zinc-300 border-zinc-700 min-h-[44px] press-scale"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 h-11 rounded-full bg-[#C5A880] hover:bg-[#b59870] text-black font-black text-xs shadow-lg min-h-[44px] press-scale"
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
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full tabular-nums">
                Ticket Reference: {referenceId}
              </span>
              <h3 className="text-xl font-black text-white pt-2">Assessment Request Received</h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed text-pretty">
                Thank you, <strong>{submittedData?.name}</strong>. Our operations desk has received your request for <strong>{submittedData?.service}</strong> in <strong>{submittedData?.city}</strong>.
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                }}
                className="text-xs text-zinc-400 hover:text-white font-semibold min-h-[44px] press-scale"
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
