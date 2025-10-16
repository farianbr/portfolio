"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have a project in mind? Let&apos;s work together
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="text-center text-sm text-green-600 dark:text-green-400">
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              )}

              {submitStatus === "error" && (
                <p className="text-center text-sm text-red-600 dark:text-red-400">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <FiMail className="h-5 w-5" />
                  <a
                    href="mailto:farianrahman1000@gmail.com"
                    className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    farianrahman1000@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/farianbr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
                  aria-label="GitHub"
                >
                  <FiGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
                  aria-label="Twitter"
                >
                  <FiTwitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="card">
              <h3 className="mb-2 font-semibold">Response Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I typically respond within 24 hours on weekdays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
