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
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

function generateTicketReference(): string {
  return `JSM-REQ-${Date.now().toString().slice(-4)}`;
}

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
    const ref = generateTicketReference();
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
    <div className="bg-[#070B12] border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-xl text-white">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-[#D4AF37] uppercase block">
                  Step {step} of 3
                </span>
                <p className="text-xs font-semibold text-white mt-0.5">
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
                      s === step ? "w-6 bg-[#D4AF37]" : "w-2 bg-white/20"
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
                    <Label htmlFor="service" className="text-xs font-semibold uppercase text-neutral-300 block">
                      Primary Service Needed <span className="text-[#D4AF37]">*</span>
                    </Label>
                    <select
                      id="service"
                      {...register("service")}
                      className="w-full h-11 px-3.5 bg-[#0D131F] border border-white/15 rounded-lg text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] min-h-[44px]"
                    >
                      <option value="Private Security Guarding" className="bg-[#070B12] text-white">Private Security Guarding (100% EPF & ESIC Compliant)</option>
                      <option value="Housekeeping & Facility Management" className="bg-[#070B12] text-white">Housekeeping &amp; Facility Management</option>
                      <option value="Contractual Manpower Supply" className="bg-[#070B12] text-white">Contractual Manpower Supply</option>
                      <option value="Tender & GeM Procurement Supply" className="bg-[#070B12] text-white">Tender &amp; GeM Procurement Supply</option>
                      <option value="Digital Automation & WhatsApp QR" className="bg-[#070B12] text-white">Digital Automation &amp; WhatsApp QR</option>
                      <option value="Multi-Service Bundled Contract" className="bg-[#070B12] text-white">Multi-Service Bundled Contract</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs font-semibold uppercase text-neutral-300 block">
                        Premises City / District <span className="text-[#D4AF37]">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="e.g. Trichy, Chennai, Coimbatore"
                        {...register("city")}
                        className="h-11 rounded-lg bg-[#0D131F] border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] min-h-[44px]"
                      />
                      {errors.city && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="headcount" className="text-xs font-semibold uppercase text-neutral-300 block">
                        Estimated Headcount Needed
                      </Label>
                      <select
                        id="headcount"
                        {...register("headcount")}
                        className="w-full h-11 px-3.5 bg-[#0D131F] border border-white/15 rounded-lg text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] min-h-[44px]"
                      >
                        <option value="1 - 5 Personnel" className="bg-[#070B12] text-white">1 – 5 Personnel</option>
                        <option value="6 - 15 Personnel" className="bg-[#070B12] text-white">6 – 15 Personnel</option>
                        <option value="16 - 30 Personnel" className="bg-[#070B12] text-white">16 – 30 Personnel</option>
                        <option value="30+ Large Deployment" className="bg-[#070B12] text-white">30+ Enterprise Workforce</option>
                        <option value="Event / Short-term Requirement" className="bg-[#070B12] text-white">Short-Term Event Squad</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full h-11 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs mt-2 min-h-[44px] shadow-lg transition-colors"
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
                      <Label htmlFor="name" className="text-xs font-semibold uppercase text-neutral-300 block">
                        Your Full Name <span className="text-[#D4AF37]">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        {...register("name")}
                        className="h-11 rounded-lg bg-[#0D131F] border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] min-h-[44px]"
                      />
                      {errors.name && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-semibold uppercase text-neutral-300 block">
                        Phone / WhatsApp Number <span className="text-[#D4AF37]">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className="h-11 rounded-lg bg-[#0D131F] border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] tabular-nums min-h-[44px]"
                      />
                      {errors.phone && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase text-neutral-300 block">
                        Email Address (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        {...register("email")}
                        className="h-11 rounded-lg bg-[#0D131F] border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] min-h-[44px]"
                      />
                      {errors.email && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="company" className="text-xs font-semibold uppercase text-neutral-300 block">
                        Company / Society Name
                      </Label>
                      <Input
                        id="company"
                        placeholder="e.g. ABC Industrial Park / Tower RWA"
                        {...register("company")}
                        className="h-11 rounded-lg bg-[#0D131F] border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-full sm:w-1/3 h-11 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 border-white/15 min-h-[44px]"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-2/3 h-11 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs min-h-[44px] shadow-lg transition-colors"
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
                    <Label htmlFor="requirements" className="text-xs font-semibold uppercase text-neutral-300 block">
                      Requirement Scope &amp; Shift Notes
                    </Label>
                    <Textarea
                      id="requirements"
                      rows={3}
                      placeholder="Mention specific shift hours (e.g. 24/7 or Day only), property square footage, or target start date..."
                      {...register("requirements")}
                      className="rounded-lg bg-[#0D131F] border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] leading-relaxed resize-none"
                    />
                  </div>

                  <div className="p-3.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-neutral-300 space-y-1 shadow-sm">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#D4AF37]" />
                      JSM Service Commitment:
                    </p>
                    <p className="text-neutral-400">An operations manager will review your submission and contact you within 2 business hours to schedule the free site assessment.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-full sm:w-1/3 h-11 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 border-white/15 min-h-[44px]"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-2/3 h-11 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs shadow-lg min-h-[44px] transition-colors"
                    >
                      {isSubmitting ? "Dispatching..." : "Submit Assessment Request"}
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
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full tabular-nums">
                Ticket Reference: {referenceId}
              </span>
              <h3 className="text-xl font-semibold text-white pt-2">Assessment Request Received</h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed text-pretty">
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
                className="text-xs text-neutral-400 hover:text-white font-semibold min-h-[44px]"
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
