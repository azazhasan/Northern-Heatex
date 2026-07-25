import React, { useState } from "react";
import { 
  Send, Upload, CheckCircle2, AlertCircle, RefreshCw, File 
} from "lucide-react";

export const InquiryFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    company: "",
    country: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    industry: "Power Generation",
    projectDescription: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (filesList: File[]) => {
    const formatted = filesList.map((f) => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
      type: f.name.split(".").pop()?.toUpperCase() || "FILE",
    }));
    setUploadedFiles((prev) => [...prev, ...formatted]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          files: uploadedFiles,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmissionResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || "Server error while logging inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-16 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0056A6] text-xs font-mono font-bold uppercase tracking-wider">
            <Send className="w-3.5 h-3.5 text-[#0056A6]" />
            DIRECT ENGINEERING INQUIRY & RFQ
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Request an Official Quotation
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Submit your thermal duty parameters, CAD drawings, or retubing scope. Our engineering team in Haridwar will respond within 12 business hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm relative">
          {submissionResult ? (
            <div className="space-y-6 font-mono text-xs">
              <div className="text-center space-y-3 pb-6 border-b border-slate-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-sans">RFQ Submitted Successfully</h3>
                <p className="text-[#0056A6]">Reference ID: <span className="font-extrabold bg-blue-50 px-3 py-1 rounded border border-blue-200">{submissionResult.refId}</span></p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-[#0056A6] uppercase tracking-wider">Submission Receipt</h4>
                <ul className="space-y-2 text-slate-700">
                  {submissionResult.nextSteps.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#0056A6] font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setSubmissionResult(null)}
                  className="bg-[#0056A6] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-800 font-bold block">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BHEL / NTPC / Indian Oil"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-800 font-bold block">Location / State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Haridwar, Uttarakhand"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-800 font-bold block">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Er. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-800 font-bold block">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rajesh@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-800 font-bold block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 97603 62826"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-800 font-bold block">WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+91 97603 62826"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-slate-800 font-bold block">Industry Sector</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none font-bold transition"
                >
                  <option value="Power Generation">Power Generation (Hydro / Thermal / Nuclear)</option>
                  <option value="Oil & Gas">Oil & Gas / Refinery / Petrochemical</option>
                  <option value="Chemical Manufacturing">Fertilizer & Chemical Manufacturing</option>
                  <option value="Steel & Metallurgy">Steel & Heavy Metallurgy</option>
                  <option value="Government & PSU">Government Sector & PSU Tender</option>
                </select>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-slate-800 font-bold block">Project Description & Specifications *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe heat duty, tube dimensions, materials (Copper, Stainless, CuNi), pressure requirements, or retubing scope..."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full bg-white border border-slate-300 focus:border-[#0056A6] rounded-xl p-3.5 text-slate-900 focus:outline-none font-sans transition"
                />
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-300 hover:border-[#0056A6] rounded-xl p-5 text-center space-y-2 bg-white transition font-mono"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0056A6] flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700">
                  <label htmlFor="file-upload" className="text-[#0056A6] font-bold hover:underline cursor-pointer">
                    Click to Upload CAD Files / Specs
                  </label>{" "}
                  or drag & drop
                </div>
                <p className="text-[10px] text-slate-400">
                  STEP, DWG, DXF, PDF, Word, Excel, ZIP (Up to 50MB)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 justify-center">
                    {uploadedFiles.map((file, idx) => (
                      <span key={idx} className="bg-blue-50 border border-blue-200 text-[#0056A6] px-3 py-1 rounded-lg text-xs flex items-center gap-2 font-bold">
                        <File className="w-3.5 h-3.5" />
                        <span>{file.name} ({file.size})</span>
                        <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 font-bold ml-1">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0056A6] hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>Submit Official RFQ</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
