'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { siteConfig, socialLinks } from '@/lib/site.config';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = 'Please enter your name.';
  if (!data.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(data.email))
    errors.email = 'Please enter a valid email address.';
  if (!data.subject.trim()) errors.subject = 'Please add a subject.';
  if (!data.message.trim()) errors.message = 'Please write a message.';
  else if (data.message.trim().length < 10)
    errors.message = 'Your message is a little short.';
  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Honeypot — bots fill hidden fields; humans never see it.
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Silently succeed for bots that tripped the honeypot.
    if (honeypot) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company: honeypot }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: keyof ContactFormData) =>
    `input ${errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''}`;

  return (
    <div className="container-wide py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="eyebrow mb-3">don&apos;t be a stranger</p>
          <h1 className="font-display text-4xl text-ink md:text-6xl">
            Let&apos;s talk
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-medium text-lg text-muted">
            Have a project in mind, a role to fill, or just want to say hi?
            Drop me a line — I read everything.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Honeypot — visually hidden, off-screen, not focusable */}
            <div aria-hidden="true" className="sr-only">
              <label htmlFor="company">Company (leave blank)</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={fieldClass('name')}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={fieldClass('email')}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={fieldClass('subject')}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-sm text-red-600">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${fieldClass('message')} resize-none`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>

            {/* Status — announced to screen readers */}
            <div aria-live="polite" role="status">
              {submitStatus === 'success' && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-accent">
                  <FiCheckCircle className="h-4 w-4" />
                  Got it — I&apos;ll be in touch soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-red-500">
                  <FiAlertCircle className="h-4 w-4" />
                  Something went wrong — try again, or email me directly.
                </p>
              )}
            </div>
          </form>

          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="eyebrow">the direct line</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-flex items-center gap-2.5 text-ink transition-colors hover:text-accent"
              >
                <FiMail className="h-5 w-5 text-accent" />
                {siteConfig.email}
              </a>
            </div>

            <div>
              <h2 className="eyebrow">find me elsewhere</h2>
              <div className="mt-4 flex gap-2.5">
                {socialLinks
                  .filter((s) => s.href.startsWith('http'))
                  .map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-line/20 bg-surface/50 text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
              </div>
            </div>

            <div className="card">
              <h3 className="eyebrow">a quick note</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                I usually reply within a day on weekdays. If it&apos;s urgent,
                email is the fastest way to reach me.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
