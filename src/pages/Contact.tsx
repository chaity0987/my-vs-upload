import React, { useState } from 'react';
import { PageId, ContactMessage } from '../types';
import { isValidEmail } from '../utils/validation';
import { formatDateToISO } from '../utils/dateCalculation';
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Heart,
} from 'lucide-react';

interface ContactPageProps {
  onSendMessage: (msg: ContactMessage) => void;
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSendMessage, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Support Inquiry');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError('Please enter a message of at least 10 characters.');
      return;
    }

    const newMessage: ContactMessage = {
      id: `MSG-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: formatDateToISO(new Date()),
    };

    onSendMessage(newMessage);
    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
          <span>We are Here to Help</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Contact & Support
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Need help with blood donor coordination, technical assistance, or general thalassemia queries? Reach out to our volunteer team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-8 border-2 border-red-200 shadow-xl space-y-6">
            <h3 className="font-bold text-lg text-slate-900 font-display border-b border-red-200 pb-3">
              Official Contact Info
            </h3>

            <div className="space-y-5 text-xs text-slate-600 font-medium">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Emergency Helplines</span>
                  <p className="text-slate-600 mt-0.5">National Health Call Center: <strong className="text-slate-900">16263</strong></p>
                  <p className="text-slate-600">Thalcare Helpdesk: <strong className="text-red-600">+880 1700-112233</strong></p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Email Inquiries</span>
                  <p className="text-slate-600 mt-0.5">support@thalcarebd.org</p>
                  <p className="text-slate-600">donors@thalcarebd.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Support Hub Address</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Thalcare BD Volunteer Center, Shahbagh Medical Corridor, Dhaka - 1000, Bangladesh.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Service Hours</span>
                  <p className="text-slate-600 mt-0.5">Emergency Directory: 24/7 Accessible</p>
                  <p className="text-slate-600">Helpline Team: 8:00 AM – 10:00 PM Daily</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-5 rounded-2xl bg-red-50 border-2 border-red-200 text-xs text-red-950 space-y-2 font-medium">
            <h4 className="font-bold flex items-center gap-1.5 text-red-900">
              <Heart className="w-4 h-4 text-red-600 fill-red-600" />
              <span>For Immediate Blood Transfusion Emergencies</span>
            </h4>
            <p className="text-red-900 leading-relaxed">
              If a patient requires blood within hours, we recommend simultaneously searching our voluntary donor list and contacting your hospital's blood transfusion medicine department directly.
            </p>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-[#fff8f8] rounded-3xl p-6 sm:p-8 border-2 border-red-200 shadow-xl">
          <div className="mb-6 pb-3 border-b border-red-200">
            <h3 className="font-bold text-lg text-slate-900 font-display">
              Send us a Message
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              We respond to inquiries and donor registrations promptly
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Your message has been recorded successfully.</p>
                <p className="text-emerald-700 mt-0.5">
                  Thank you for reaching out. Our support team will review your inquiry.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-input-name"
                  type="text"
                  placeholder="e.g. Farhana Yasmin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-input-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Contact Phone (Optional)
                </label>
                <input
                  id="contact-input-phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <select
                  id="contact-select-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                >
                  <option value="Support Inquiry">Support Inquiry</option>
                  <option value="Donor Coordination">Donor Coordination</option>
                  <option value="Patient Registration Help">Patient Registration Help</option>
                  <option value="Thalassemia Awareness">Thalassemia Awareness</option>
                  <option value="Volunteer Joining">Volunteer Joining</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Message / Query <span className="text-red-600">*</span>
              </label>
              <textarea
                id="contact-textarea-message"
                rows={4}
                placeholder="How can we assist you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-red-200 bg-white text-sm focus:outline-none focus:border-red-600"
              />
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
