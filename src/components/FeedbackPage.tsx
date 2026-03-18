import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { MessageSquareHeart, Star, Send, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { UserData } from "@/types/finance";

// EmailJS public configuration – replace with your own IDs from emailjs.com
const EMAILJS_SERVICE_ID = "service_123456";
const EMAILJS_TEMPLATE_ID = "template_qcmanlx";
const EMAILJS_PUBLIC_KEY = "OWQa4kYXSOEY6otok";

interface Props {
  userData: UserData;
}

export function FeedbackPage({ userData }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    user_name: userData.username || "",
    user_email: "",
    message: "",
    rating: 0,
  });
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.user_name.trim()) e.user_name = "Name is required.";
    if (!form.user_email.trim()) e.user_email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email))
      e.user_email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Please describe your issue or feedback.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: form.user_name,
          user_email: form.user_email,
          message: form.message,
          rating: form.rating ? `${form.rating} / 5 ⭐` : "Not rated",
          to_email: "websitesever112@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ user_name: userData.username || "", user_email: "", message: "", rating: 0 });
    } catch {
      setStatus("error");
    }
  };

  const Field = ({
    label,
    error,
    children,
  }: {
    label: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-red-danger">{error}</p>}
    </div>
  );

  return (
    <section className="flex flex-col items-center gap-6 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg"
      >
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 glow-effect">
          <MessageSquareHeart size={28} className="text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-black text-foreground mb-1">
          Share Your <span className="text-primary">Feedback</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          We value your feedback to improve SmartSave AI.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="glass-card p-6 sm:p-8 w-full max-w-lg"
      >
        {status === "success" ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <CheckCircle2 size={56} className="text-green-success" />
            <h2 className="text-xl font-bold text-foreground">Feedback Sent!</h2>
            <p className="text-sm text-muted-foreground">
              ✅ Your feedback has been sent successfully! Thank you for helping us improve.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <Field label="Your Name *" error={errors.user_name}>
              <input
                type="text"
                value={form.user_name}
                onChange={(e) => setForm({ ...form, user_name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </Field>

            {/* Email */}
            <Field label="Email Address *" error={errors.user_email}>
              <input
                type="email"
                value={form.user_email}
                onChange={(e) => setForm({ ...form, user_email: e.target.value })}
                placeholder="you@example.com"
                className="h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </Field>

            {/* Message */}
            <Field label="Issue / Feedback *" error={errors.message}>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                placeholder="Describe your issue or suggestion..."
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
              />
            </Field>

            {/* Star Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">
                Rating <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setForm({ ...form, rating: star })}
                    className="p-0.5 transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      size={28}
                      className={`transition-colors ${
                        star <= (hovered || form.rating)
                          ? "fill-gold text-gold"
                          : "text-muted fill-transparent"
                      }`}
                    />
                  </button>
                ))}
                {form.rating > 0 && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form.rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Error banner */}
            {status === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                <XCircle size={16} />
                ❌ Failed to send feedback. Please try again.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 h-11 w-full rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Feedback
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Your message will be sent directly to the SmartSave AI team.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}
