import React from "react";
import { useRouter } from "../context/RouterContext";
import { InquiryFormSection } from "../components/home/InquiryFormSection";
import { 
  MapPin, Phone, Mail, Clock, Send, ShieldCheck, Building2, Globe2, Calendar 
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-12">
      {/* Contact Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            HARIDWAR WORKS MANUFACTURING PLANT & HEAD OFFICE
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Connect With Our Engineering Team
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Direct access to senior thermal design engineers in Haridwar, Uttarakhand. Submit duty parameters or CAD drawings for 12-hour response.
          </p>
        </div>
      </div>

      {/* Plant Contact Info & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0056A6]" /> Plant Address
          </h3>

          <div className="space-y-4 text-xs font-mono text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#0056A6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm font-sans font-bold">Haridwar Manufacturing Plant</strong>
                <span>Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar – 249407, Uttarakhand, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
              <Phone className="w-5 h-5 text-[#0056A6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm font-sans font-bold">Engineering Hotline</strong>
                <span>+91 97603 62826</span>
                <span className="block">+91 95575 65742</span>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
              <Mail className="w-5 h-5 text-[#0056A6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm font-sans font-bold">Official Work Emails</strong>
                <span className="block font-mono text-xs text-[#0056A6] font-bold">inquiry@northernheatex.co.in</span>
                <span className="block font-mono text-xs">northernheatex@outlook.in</span>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
              <Clock className="w-5 h-5 text-[#0056A6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm font-sans font-bold">Operating Hours</strong>
                <span>24 Hours / 7 Days (Emergency Outage Response)</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("inquiry");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[#0056A6] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs uppercase font-mono tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Technical Meeting
            </button>
          </div>
        </div>

        {/* Embedded Interactive Map Container */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between">
          <div className="p-4 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <Globe2 className="w-4 h-4" /> Haridwar Works Geographic Location
            </span>
            <span>Jwalapur, Haridwar – 249407</span>
          </div>

          <div className="h-[340px] w-full bg-slate-950 relative">
            <iframe
              title="Haridwar Works Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8!2d78.10!3d29.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjknNTUnNDguMCJOIDc4wrAwNicwMC4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <InquiryFormSection />
    </div>
  );
};
