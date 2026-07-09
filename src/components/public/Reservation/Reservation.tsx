'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';
import styles from './Reservation.module.css';

/* ═══════════════════════════════════════════════════════
   Reservation — Premium booking form
   
   Fields: name, phone, email, date, time, guests,
   special request. Real-time validation.
   Success: animated confirmation.
   ═══════════════════════════════════════════════════════ */

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  request: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Reservation() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', date: '', time: '', guests: '2', request: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Enter a valid 10-digit number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="reservation" className={`section ${styles.section}`} aria-labelledby="reserve-heading">
      <div className={`container ${styles.container}`}>
        {/* Left info */}
        <ScrollReveal preset="fadeLeft" className={styles.info}>
          <span className="label-uppercase">Book a Table</span>
          <h2 id="reserve-heading" className="heading-2">
            Reserve Your <span className="text-gradient">Experience</span>
          </h2>
          <p className={styles.infoText}>
            Join us for an unforgettable dining experience. Our warm ambiance
            and aromatic biryanis await you. Book your table and let us
            take care of the rest.
          </p>
          <div className={styles.infoDetails}>
            <div className={styles.infoItem}><Clock size={18} /> <span>Open: 11 AM – 11 PM</span></div>
            <div className={styles.infoItem}><Users size={18} /> <span>Up to 20 guests per booking</span></div>
            <div className={styles.infoItem}><CalendarDays size={18} /> <span>Book up to 30 days ahead</span></div>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal preset="fadeRight" delay={0.2} className={styles.formWrapper}>
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                className={styles.success}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 size={64} className={styles.successIcon} />
                </motion.div>
                <h3 className={styles.successTitle}>Table Reserved!</h3>
                <p className={styles.successText}>
                  We&apos;ve sent a confirmation to {form.email}.<br />
                  See you on {form.date} at {form.time}!
                </p>
                <Button variant="secondary" onClick={() => { setIsSuccess(false); setForm({ name: '', phone: '', email: '', date: '', time: '', guests: '2', request: '' }); }}>
                  Book Another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                noValidate
              >
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="res-name" className={styles.label}><User size={14} /> Full Name</label>
                    <input id="res-name" type="text" className={`${styles.input} ${errors.name ? styles.inputError : ''}`} placeholder="John Doe" value={form.name} onChange={(e) => handleChange('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'res-name-err' : undefined} />
                    {errors.name && <span id="res-name-err" className={styles.error}>{errors.name}</span>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="res-phone" className={styles.label}><Phone size={14} /> Phone</label>
                    <input id="res-phone" type="tel" className={`${styles.input} ${errors.phone ? styles.inputError : ''}`} placeholder="9876543210" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'res-phone-err' : undefined} />
                    {errors.phone && <span id="res-phone-err" className={styles.error}>{errors.phone}</span>}
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="res-email" className={styles.label}><Mail size={14} /> Email</label>
                  <input id="res-email" type="email" className={`${styles.input} ${errors.email ? styles.inputError : ''}`} placeholder="john@example.com" value={form.email} onChange={(e) => handleChange('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'res-email-err' : undefined} />
                  {errors.email && <span id="res-email-err" className={styles.error}>{errors.email}</span>}
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="res-date" className={styles.label}><CalendarDays size={14} /> Date</label>
                    <input id="res-date" type="date" className={`${styles.input} ${errors.date ? styles.inputError : ''}`} min={minDate} value={form.date} onChange={(e) => handleChange('date', e.target.value)} aria-invalid={!!errors.date} />
                    {errors.date && <span className={styles.error}>{errors.date}</span>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="res-time" className={styles.label}><Clock size={14} /> Time</label>
                    <input id="res-time" type="time" className={`${styles.input} ${errors.time ? styles.inputError : ''}`} min="11:00" max="22:00" value={form.time} onChange={(e) => handleChange('time', e.target.value)} aria-invalid={!!errors.time} />
                    {errors.time && <span className={styles.error}>{errors.time}</span>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="res-guests" className={styles.label}><Users size={14} /> Guests</label>
                    <select id="res-guests" className={styles.input} value={form.guests} onChange={(e) => handleChange('guests', e.target.value)}>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="res-request" className={styles.label}><MessageSquare size={14} /> Special Request <span className={styles.optional}>(optional)</span></label>
                  <textarea id="res-request" className={styles.textarea} rows={3} placeholder="Any dietary requirements or special occasion?" value={form.request} onChange={(e) => handleChange('request', e.target.value)} />
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} leftIcon={<CalendarDays size={18} />}>
                  Confirm Reservation
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
