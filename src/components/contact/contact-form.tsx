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
import { CheckCircle2 } from "lucide-react";

const formSchema = zod.object({
  category: zod.string({ required_error: "Please select a service category" }),
  requirements: zod.string().min(10, { message: "Please enter at least 10 characters describing your requirements" }),
  name: zod.string().min(2, { message: "Name must be at least 2 characters" }),
  email: zod.string().email({ message: "Please enter a valid email address" }),
  phone: zod.string().min(10, { message: "Please enter a valid phone number" }),
  company: zod.string().optional(),
});

type FormData = zod.infer<typeof formSchema>;

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const nextStep = async () => {
    let fieldsToValidate: ("category" | "requirements" | "name" | "email" | "phone" | "company")[] = [];
    if (step === 1) fieldsToValidate = ["category"];
    else if (step === 2) fieldsToValidate = ["requirements"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 md:p-8 max-w-xl mx-auto shadow-sm">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-bold text-[#C5A880] uppercase tracking-widest">Step {step} of 3</span>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step ? "w-8 bg-[#C5A880]" : "w-2 bg-zinc-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-black tracking-tight">What service do you require?</h3>
                  <p className="text-xs text-zinc-500 font-medium">Select the primary category of your operational requirements.</p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-zinc-600 font-semibold">Service Category</Label>
                    <select
                      id="category"
                      {...register("category")}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-black focus:border-[#C5A880] outline-none transition-colors text-sm shadow-sm"
                    >
                      <option value="">Select a category...</option>
                      <option value="security">Elite Security Services</option>
                      <option value="facilities">Integrated Facilities Management</option>
                      <option value="digital">Digital & Creative Media</option>
                      <option value="events">Event Planning & Management</option>
                      <option value="property">Real Estate & Property Management</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    {errors.category && (
                      <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-black tracking-tight">Describe your requirements</h3>
                  <p className="text-xs text-zinc-500 font-medium">Provide some brief details about the scale, scope, and duration of the service.</p>

                  <div className="space-y-2">
                    <Label htmlFor="requirements" className="text-zinc-600 font-semibold">Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="e.g., Close protection detail for 3 executives visiting London next month..."
                      {...register("requirements")}
                      className="min-h-[150px] bg-white border-zinc-200 text-black focus-visible:border-[#C5A880] focus-visible:ring-0 rounded-xl text-sm"
                    />
                    {errors.requirements && (
                      <p className="text-xs text-red-500 mt-1">{errors.requirements.message}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-black tracking-tight">Tell us about yourself</h3>
                  <p className="text-xs text-zinc-500 font-medium">We will use these details to contact you with a customized proposal.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-zinc-600 font-semibold">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                        className="bg-white border-zinc-200 text-black focus-visible:border-[#C5A880] focus-visible:ring-0 rounded-xl text-sm"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-zinc-600 font-semibold">Company (Optional)</Label>
                      <Input
                        id="company"
                        placeholder="Enterprise Inc."
                        {...register("company")}
                        className="bg-white border-zinc-200 text-black focus-visible:border-[#C5A880] focus-visible:ring-0 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-600 font-semibold">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        {...register("email")}
                        className="bg-white border-zinc-200 text-black focus-visible:border-[#C5A880] focus-visible:ring-0 rounded-xl text-sm"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-zinc-600 font-semibold">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+44 20 7123 4567"
                        {...register("phone")}
                        className="bg-white border-zinc-200 text-black focus-visible:border-[#C5A880] focus-visible:ring-0 rounded-xl text-sm"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4 border-t border-zinc-200/60">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-full h-12"
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-grow bg-black text-white hover:bg-zinc-800 font-semibold rounded-full h-12"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-grow bg-black text-white hover:bg-zinc-800 font-semibold rounded-full h-12"
                  >
                    Submit Assessment Request
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-500 rounded-full">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-bold text-black tracking-tight">Request Received</h3>
            <p className="text-zinc-500 max-w-md mx-auto leading-relaxed text-sm">
              Thank you for submitting your assessment request. A senior JSM advisor will review your requirements and contact you within 15 minutes.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
              }}
              variant="outline"
              className="border-zinc-200 text-zinc-600 hover:text-black rounded-full px-6 h-11"
            >
              Submit Another Request
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
