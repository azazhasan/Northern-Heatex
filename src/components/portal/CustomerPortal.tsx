import React, { useState } from "react";
import {
  CustomerProject,
  QAPStage,
  UploadedReport,
  TenderRecord,
  GuaranteeDetail
} from "../../types";
import {
  UserCheck,
  ShieldCheck,
  Download,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  UploadCloud,
  Award,
  DollarSign,
  AlertTriangle,
  Mail,
  Calendar,
  Building2,
  Check,
  Trash2,
  Eye,
  FileCheck,
  Layers,
  Send,
  RefreshCw,
  Info,
  Lock,
  ChevronRight,
  Sparkles,
  FileSpreadsheet,
  X
} from "lucide-react";

// --- DEFAULT DEPARTMENT QAP STAGES TEMPLATE ---
export const DEFAULT_DEPARTMENT_QAP_STAGES: QAPStage[] = [
  {
    id: "qap-1",
    stageNumber: 1,
    title: "Stage 1: Raw Material Inspection & MTR Verification",
    description: "Verification of Plate, Pipe, Tube & Flange Mill Test Reports (MTRs), PMI chemical testing & dimension clearance.",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-2",
    stageNumber: 2,
    title: "Stage 2: Cutting, Edge Preparation & Shell Rolling",
    description: "CNC Plasma/Waterjet cutting, edge beveling & shell plate rolling to roundness tolerance.",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-3",
    stageNumber: 3,
    title: "Stage 3: Fit-Up, Longitudinal & Circumferential Seam Assembly",
    description: "Shell cylinder alignment, tack welding, nozzle orientation & root opening inspection.",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-4",
    stageNumber: 4,
    title: "Stage 4: WPS Qualified Welding & Tube-to-Tubesheet Joining",
    description: "Submerged Arc Welding (SAW), GTAW orbital tube welding by ASME IX qualified welders.",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-5",
    stageNumber: 5,
    title: "Stage 5: Non-Destructive Examination (NDE)",
    description: "100% Radiographic Testing (RT), Ultrasonic (UT) & Liquid Penetrant (PT) clearance.",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-6",
    stageNumber: 6,
    title: "Stage 6: Post-Weld Heat Treatment (PWHT) & Stress Relieving",
    description: "Furnace stress relief thermal cycle as per ASME VIII Div 1 rules (if mandated).",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-7",
    stageNumber: 7,
    title: "Stage 7: Hydrostatic Pressure & Pneumatic Leak Testing",
    description: "Witnessed hydrotest at 1.5x MAWP for 1 hour with calibrated digital recorders.",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-8",
    stageNumber: 8,
    title: "Stage 8: Surface Preparation, Shot Blasting & Painting",
    description: "SA 2.5 grit blasting, inorganic zinc silicate & epoxy polyurethane topcoat (DFT check).",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-9",
    stageNumber: 9,
    title: "Stage 9: Final Inspection, TPI Stamping & Nameplate Fixing",
    description: "Third Party Inspection (TPI) final dimensional signoff, ASME U1 / Form R-1 stamping.",
    status: "Pending",
    attachedReports: []
  },
  {
    id: "qap-10",
    stageNumber: 10,
    title: "Stage 10: Dispatch, Packing & Site Handover",
    description: "Seaworthy crating, E-way bill dispatch, site installation & client handover clearance.",
    status: "Pending",
    attachedReports: []
  }
];

// --- INITIAL DEMO TENDERS & GUARANTEES DATA ---
const INITIAL_TENDER_RECORDS: TenderRecord[] = [
  {
    id: "tend-001",
    tenderNo: "TENDER/IOCL/2026/048",
    tenderTitle: "Supply & Erection of Heavy Duty TEMA BEM Heat Exchanger Units for Mathura Refinery",
    departmentName: "Indian Oil Corporation Ltd (IOCL), Mathura Refinery",
    participationStatus: "Awarded / Won",
    awardeeFirm: "Northern HeatEx Corporation",
    estimatedProjectValue: 45000000,
    currency: "INR",
    submissionDate: "2026-03-15",
    openingDate: "2026-04-01",
    emd: {
      amount: 500000,
      currency: "INR",
      form: "FDR",
      instrumentNo: "FDR-SBI-982310",
      issuingBank: "State Bank of India, Commercial Branch Haridwar",
      depositDate: "2026-03-10",
      validityCompletionDate: "2026-08-10",
      status: "Active / Deposited"
    },
    performanceGuarantee: {
      amount: 4500000,
      currency: "INR",
      form: "Bank Guarantee (BG)",
      instrumentNo: "BG-PNB-2026-881",
      issuingBank: "Punjab National Bank, Corporate Branch New Delhi",
      depositDate: "2026-04-10",
      validityCompletionDate: "2027-04-10",
      status: "Active / Deposited"
    },
    notifyEmails: ["accounts@northernheatex.com", "tenders@iocl.co.in"],
    emailSentOnCompletion: false,
    emailLogs: []
  },
  {
    id: "tend-002",
    tenderNo: "TENDER/NTPC/2026/912",
    tenderTitle: "Annual Maintenance & Retubing Rate Contract for Supercritical Steam Condensers",
    departmentName: "NTPC Limited, Singrauli Thermal Power Station",
    participationStatus: "Participated",
    awardeeFirm: "BHEL Engineering Services (L1 Bidder)",
    estimatedProjectValue: 28000000,
    currency: "INR",
    submissionDate: "2026-02-20",
    openingDate: "2026-03-05",
    emd: {
      amount: 300000,
      currency: "INR",
      form: "Demand Draft (DD)",
      instrumentNo: "DD-HDFC-009212",
      issuingBank: "HDFC Bank Ltd, Haridwar",
      depositDate: "2026-02-18",
      validityCompletionDate: "2026-06-18",
      status: "Released / Returned"
    },
    performanceGuarantee: {
      amount: 0,
      currency: "INR",
      form: "Bank Guarantee (BG)",
      instrumentNo: "N/A",
      issuingBank: "N/A",
      depositDate: "N/A",
      validityCompletionDate: "N/A",
      status: "Pending Deposit"
    },
    notifyEmails: ["tenders@northernheatex.com"],
    emailSentOnCompletion: false,
    emailLogs: []
  }
];

// --- DEMO SAMPLE PROJECTS FOR OPTIONAL 1-CLICK HYDRATION ---
const SAMPLE_DEMO_PROJECTS: CustomerProject[] = [
  {
    id: "proj-demo-101",
    projectNumber: "NHEE-2026-9041",
    title: "GE Vernova 450MW Gas Turbine Bearing Oil Cooler Retrofit",
    clientCompany: "GE Vernova Power Systems",
    temaType: "AES",
    status: "Stage 5: Non-Destructive Examination (NDE)",
    progressPercent: 50,
    estimatedDelivery: "2026-09-15",
    asmeStamped: true,
    qapStages: DEFAULT_DEPARTMENT_QAP_STAGES.map((stg) => {
      if (stg.stageNumber <= 4) {
        return {
          ...stg,
          status: "Completed",
          completionDate: `2026-0${stg.stageNumber + 4}-10`,
          inspectorName: "Third Party Inspector (TPI - Lloyd's Register)"
        };
      }
      if (stg.stageNumber === 5) {
        return {
          ...stg,
          status: "In Progress",
          inspectorName: "ASME Level II Radiography Lead"
        };
      }
      return stg;
    }),
    documents: [
      { title: "Third Party Inspection Clearance Data Form", type: "PDF", url: "#", size: "2.4 MB", uploadedAt: "2026-06-15" },
      { title: "TEMA Specification Datasheet - Rev 2", type: "PDF", url: "#", size: "1.1 MB", uploadedAt: "2026-05-10" }
    ],
    uploadedReports: [
      {
        id: "rep-1",
        title: "Plate & Tube Material Mill Test Certificate (MTR)",
        category: "MTR Certificate",
        fileName: "MTR_SA516_Grade70_Plates.pdf",
        fileSize: "1.8 MB",
        uploadedAt: "2026-05-12",
        uploadedBy: "Senior QA Inspector - Haridwar Works",
        visibleToClient: true,
        stageId: "qap-1"
      },
      {
        id: "rep-2",
        title: "100% Radiography (RT) Seam Weld Film Clearance Report",
        category: "Radiography RT Report",
        fileName: "RT_Seam_Weld_Clearance_004.pdf",
        fileSize: "3.2 MB",
        uploadedAt: "2026-06-20",
        uploadedBy: "NDT Level III Supervisor",
        visibleToClient: true,
        stageId: "qap-5"
      }
    ]
  }
];

export const CustomerPortal: React.FC = () => {
  // PROJECTS STATE (starts BLANK as requested by user!)
  const [projects, setProjects] = useState<CustomerProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // TENDERS & GUARANTEES STATE
  const [tenders, setTenders] = useState<TenderRecord[]>(INITIAL_TENDER_RECORDS);

  // NAVIGATION TABS
  const [activeTab, setActiveTab] = useState<"projects" | "tenders" | "qap" | "downloads" | "tickets">("projects");

  // MODALS CONTROL
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddTenderModal, setShowAddTenderModal] = useState(false);
  const [showUploadReportModal, setShowUploadReportModal] = useState(false);
  const [activeEmailPreview, setActiveEmailPreview] = useState<{
    tenderNo: string;
    tenderTitle: string;
    recipient: string;
    subject: string;
    body: string;
  } | null>(null);

  // NEW PROJECT FORM STATE
  const [newProjectNo, setNewProjectNo] = useState(`NHEE-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newClientCompany, setNewClientCompany] = useState("");
  const [newTemaType, setNewTemaType] = useState<"BEM" | "AES" | "BEU" | "NEN" | "AKT" | "CFU">("BEM");
  const [newDeliveryDate, setNewDeliveryDate] = useState("2026-10-30");

  // REPORT UPLOAD FORM STATE
  const [reportTitle, setReportTitle] = useState("");
  const [reportCategory, setReportCategory] = useState<UploadedReport["category"]>("MTR Certificate");
  const [targetStageId, setTargetStageId] = useState<string>("qap-1");
  const [reportFileName, setReportFileName] = useState("");
  const [reportUploader, setReportUploader] = useState("QC Lead Engineer - Haridwar Works");
  const [reportVisibleClient, setReportVisibleClient] = useState(true);

  // NEW TENDER FORM STATE
  const [tenderNo, setTenderNo] = useState(`TENDER/REF/2026/${Math.floor(100 + Math.random() * 900)}`);
  const [tenderTitle, setTenderTitle] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [participationStatus, setParticipationStatus] = useState<TenderRecord["participationStatus"]>("Participated");
  const [awardeeFirm, setAwardeeFirm] = useState("Northern HeatEx Corporation");
  const [estValue, setEstValue] = useState<number>(15000000);
  const [submissionDate, setSubmissionDate] = useState("2026-06-01");
  const [openingDate, setOpeningDate] = useState("2026-06-15");

  // EMD Details
  const [emdAmount, setEmdAmount] = useState<number>(250000);
  const [emdForm, setEmdForm] = useState<GuaranteeDetail["form"]>("FDR");
  const [emdInstNo, setEmdInstNo] = useState("FDR-SBI-778210");
  const [emdBank, setEmdBank] = useState("State Bank of India, Haridwar");
  const [emdDepDate, setEmdDepDate] = useState("2026-05-10");
  const [emdCompDate, setEmdCompDate] = useState("2026-11-10");
  const [emdStatus, setEmdStatus] = useState<GuaranteeDetail["status"]>("Active / Deposited");

  // Performance Guarantee Details
  const [pgAmount, setPgAmount] = useState<number>(1500000);
  const [pgForm, setPgForm] = useState<GuaranteeDetail["form"]>("Bank Guarantee (BG)");
  const [pgInstNo, setPgInstNo] = useState("BG-PNB-2026-901");
  const [pgBank, setPgBank] = useState("Punjab National Bank, Corporate Branch");
  const [pgDepDate, setPgDepDate] = useState("2026-06-01");
  const [pgCompDate, setPgCompDate] = useState("2027-06-01");
  const [pgStatus, setPgStatus] = useState<GuaranteeDetail["status"]>("Active / Deposited");

  // Email Recipients
  const [notifyEmailsStr, setNotifyEmailsStr] = useState("accounts@northernheatex.com, tenders@northernheatex.com");

  // TICKET FORM
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Selected active project object
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || (projects.length > 0 ? projects[0] : null);

  // --- HANDLER: CREATE NEW PROJECT ---
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !newClientCompany.trim()) return;

    const newProj: CustomerProject = {
      id: `proj-${Date.now()}`,
      projectNumber: newProjectNo,
      title: newProjectTitle,
      clientCompany: newClientCompany,
      temaType: newTemaType,
      status: "Stage 1: Raw Material Inspection & MTR Verification",
      progressPercent: 10,
      estimatedDelivery: newDeliveryDate,
      asmeStamped: true,
      qapStages: DEFAULT_DEPARTMENT_QAP_STAGES.map((s) => ({ ...s, attachedReports: [] })),
      documents: [],
      uploadedReports: []
    };

    setProjects([newProj, ...projects]);
    setSelectedProjectId(newProj.id);
    setShowAddProjectModal(false);

    // Reset Form
    setNewProjectTitle("");
    setNewClientCompany("");
    setNewProjectNo(`NHEE-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  // --- HANDLER: UPLOAD INSPECTION REPORT ---
  const handleUploadReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !reportTitle.trim()) return;

    const newReport: UploadedReport = {
      id: `rep-${Date.now()}`,
      title: reportTitle,
      category: reportCategory,
      fileName: reportFileName || `${reportTitle.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
      fileSize: "2.4 MB",
      uploadedAt: new Date().toISOString().split("T")[0],
      uploadedBy: reportUploader,
      visibleToClient: reportVisibleClient,
      stageId: targetStageId
    };

    // Update project with attached report in project.uploadedReports & qapStages
    const updatedProjects = projects.map((p) => {
      if (p.id !== selectedProject.id) return p;

      const updatedStages = p.qapStages.map((stg) => {
        if (stg.id === targetStageId) {
          return {
            ...stg,
            attachedReports: [newReport, ...stg.attachedReports]
          };
        }
        return stg;
      });

      return {
        ...p,
        qapStages: updatedStages,
        uploadedReports: [newReport, ...p.uploadedReports]
      };
    });

    setProjects(updatedProjects);
    setShowUploadReportModal(false);
    setReportTitle("");
    setReportFileName("");
  };

  // --- HANDLER: CREATE NEW TENDER RECORD ---
  const handleCreateTenderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenderTitle.trim() || !departmentName.trim()) return;

    const emails = notifyEmailsStr.split(",").map((s) => s.trim()).filter(Boolean);

    const newTender: TenderRecord = {
      id: `tend-${Date.now()}`,
      tenderNo,
      tenderTitle,
      departmentName,
      participationStatus,
      awardeeFirm,
      estimatedProjectValue: Number(estValue),
      currency: "INR",
      submissionDate,
      openingDate,
      emd: {
        amount: Number(emdAmount),
        currency: "INR",
        form: emdForm,
        instrumentNo: emdInstNo,
        issuingBank: emdBank,
        depositDate: emdDepDate,
        validityCompletionDate: emdCompDate,
        status: emdStatus
      },
      performanceGuarantee: {
        amount: Number(pgAmount),
        currency: "INR",
        form: pgForm,
        instrumentNo: pgInstNo,
        issuingBank: pgBank,
        depositDate: pgDepDate,
        validityCompletionDate: pgCompDate,
        status: pgStatus
      },
      notifyEmails: emails,
      emailSentOnCompletion: false,
      emailLogs: []
    };

    setTenders([newTender, ...tenders]);
    setShowAddTenderModal(false);

    // Reset
    setTenderTitle("");
    setDepartmentName("");
    setTenderNo(`TENDER/REF/2026/${Math.floor(100 + Math.random() * 900)}`);
  };

  // --- HANDLER: TRIGGER & SEND EMD/PG MATURITY EMAIL NOTIFICATION ---
  const handleTriggerEmailAlert = (tender: TenderRecord, type: "EMD" | "PG") => {
    const detail = type === "EMD" ? tender.emd : tender.performanceGuarantee;
    const recipientStr = tender.notifyEmails.length > 0 ? tender.notifyEmails.join(", ") : "accounts@northernheatex.com";

    const subject = `[MATURITY NOTICE] ${type} Expiry & Release Request: ${tender.tenderNo}`;
    const body = `Dear Accounts & Project Department,

This is an official automated notification regarding the completion / expiry of the financial deposit for the following tender project:

==================================================
TENDER & PROJECT SPECIFICATION
==================================================
Tender Reference No: ${tender.tenderNo}
Project Title: ${tender.tenderTitle}
Department / Client: ${tender.departmentName}
Firm Status: ${tender.participationStatus}
Awardee Firm: ${tender.awardeeFirm}

==================================================
${type === "EMD" ? "EARNEST MONEY DEPOSIT (EMD)" : "PERFORMANCE GUARANTEE (PG)"} DETAILS
==================================================
Deposited Amount: ₹${detail.amount.toLocaleString()} (INR)
Deposit Instrument Form: ${detail.form} (Fixed Deposit Receipt / Bank Guarantee)
Instrument Ref Number: ${detail.instrumentNo}
Issuing Bank Name: ${detail.issuingBank}
Deposit Date: ${detail.depositDate}
Validity Completion / Maturity Date: ${detail.validityCompletionDate}
Current Status: ${detail.status}

==================================================
ACTION REQUIRED:
The specified deposit period has completed or reached maturity. Please initiate the formal refund/release application or bank guarantee release claim with ${tender.departmentName}.

Best regards,
Northern HeatEx Enterprise Portal Engine
Haridwar Works Operations
    `;

    // Save dispatch log in tender
    const newLog = {
      id: `log-${Date.now()}`,
      sentDate: new Date().toLocaleString(),
      recipientEmail: recipientStr,
      subject,
      body
    };

    setTenders(
      tenders.map((t) => {
        if (t.id !== tender.id) return t;
        return {
          ...t,
          emailSentOnCompletion: true,
          emailLogs: [newLog, ...t.emailLogs]
        };
      })
    );

    setActiveEmailPreview({
      tenderNo: tender.tenderNo,
      tenderTitle: tender.tenderTitle,
      recipient: recipientStr,
      subject,
      body
    });
  };

  // --- HANDLER: UPDATE QAP STAGE STATUS ---
  const handleUpdateQapStageStatus = (
    projId: string,
    stageId: string,
    newStatus: QAPStage["status"],
    inspector?: string
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projId) return p;

        const updatedStages = p.qapStages.map((stg) => {
          if (stg.id === stageId) {
            return {
              ...stg,
              status: newStatus,
              completionDate: newStatus === "Completed" ? new Date().toISOString().split("T")[0] : stg.completionDate,
              inspectorName: inspector || stg.inspectorName || "Haridwar Works Quality Inspector"
            };
          }
          return stg;
        });

        // Calculate progress percentage based on completed stages
        const completedCount = updatedStages.filter((s) => s.status === "Completed").length;
        const calcPercent = Math.round((completedCount / 10) * 100);

        return {
          ...p,
          qapStages: updatedStages,
          progressPercent: calcPercent === 0 ? 10 : calcPercent,
          status: updatedStages.find((s) => s.status === "In Progress")?.title || p.status
        };
      })
    );
  };

  // --- SUPPORT TICKET SUBMISSION ---
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject("");
      setTicketDesc("");
    }, 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] font-bold rounded uppercase">
              ASME & QAP Certified
            </span>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-cyan-400" /> Client & Customer Operations Portal
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Department QAP stage inspection tracking, tender participation, EMD/PG bank guarantee maturity & manual report uploads
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddProjectModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0056A6] hover:bg-blue-600 text-white font-mono text-xs font-bold rounded-lg transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add / Upload Project
          </button>

          <button
            onClick={() => setShowAddTenderModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold rounded-lg transition shadow-sm cursor-pointer"
          >
            <Award className="w-4 h-4" /> Add Tender & Guarantees
          </button>
        </div>
      </div>

      {/* PORTAL TAB NAVIGATION */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs bg-slate-950 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-3.5 py-2 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "projects"
              ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-sm"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          Live Client Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab("qap")}
          className={`px-3.5 py-2 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "qap"
              ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-sm"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileCheck className="w-4 h-4 text-emerald-400" />
          Department QAP Stages & Inspections
        </button>

        <button
          onClick={() => setActiveTab("tenders")}
          className={`px-3.5 py-2 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "tenders"
              ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-sm"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          Tender Participation & Bank Guarantees ({tenders.length})
        </button>

        <button
          onClick={() => setActiveTab("downloads")}
          className={`px-3.5 py-2 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "downloads"
              ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-sm"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Download className="w-4 h-4 text-blue-400" />
          Reports & CAD Downloads
        </button>

        <button
          onClick={() => setActiveTab("tickets")}
          className={`px-3.5 py-2 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "tickets"
              ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-sm"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <MessageSquare className="w-4 h-4 text-purple-400" />
          Engineering Support
        </button>
      </div>

      {/* --- TAB 1: LIVE PROJECTS (BLANK BY DEFAULT UNTIL UPLOADED) --- */}
      {activeTab === "projects" && (
        <div>
          {projects.length === 0 ? (
            /* BLANK / EMPTY STATE FOR PROJECTS */
            <div className="bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Layers className="w-8 h-8 text-cyan-500/80" />
              </div>

              <div className="max-w-md mx-auto space-y-1">
                <h4 className="text-base font-bold text-slate-200">No Active Projects Currently Loaded</h4>
                <p className="text-xs text-slate-400 font-mono">
                  All previous mock data has been cleared. Create or upload a new client project to track progress across department QAP stages.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowAddProjectModal(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Create & Upload New Project
                </button>

                <button
                  onClick={() => {
                    setProjects(SAMPLE_DEMO_PROJECTS);
                    setSelectedProjectId(SAMPLE_DEMO_PROJECTS[0].id);
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Load Sample Demo Project
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE PROJECTS LIST & DETAIL VIEW */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar Projects List */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                    Active Client Projects
                  </h4>
                  <button
                    onClick={() => setShowAddProjectModal(true)}
                    className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3 h-3" /> New Project
                  </button>
                </div>

                {projects.map((proj) => {
                  const isSelected = selectedProject?.id === proj.id;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition duration-200 space-y-2 ${
                        isSelected
                          ? "bg-slate-950 border-cyan-500 shadow-lg ring-1 ring-cyan-500/40"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-mono text-cyan-400 font-bold">{proj.projectNumber}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                          {proj.status}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-100 line-clamp-1">{proj.title}</h5>
                      <p className="text-[11px] text-slate-400 font-mono">{proj.clientCompany}</p>

                      {/* Progress Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>QAP Progress:</span>
                          <span className="text-cyan-300 font-bold">{proj.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${proj.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Project Main Detail Card */}
              {selectedProject && (
                <div className="lg:col-span-8 space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold">{selectedProject.projectNumber}</span>
                      <h4 className="text-lg font-bold text-slate-100">{selectedProject.title}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Client: {selectedProject.clientCompany} • TEMA: {selectedProject.temaType} • Delivery: {selectedProject.estimatedDelivery}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTab("qap");
                        }}
                        className="px-3 py-1.5 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs font-mono font-bold hover:bg-emerald-900 transition flex items-center gap-1.5"
                      >
                        <FileCheck className="w-3.5 h-3.5" /> View QAP Stages
                      </button>

                      <button
                        onClick={() => setShowUploadReportModal(true)}
                        className="px-3 py-1.5 bg-cyan-950 border border-cyan-700 text-cyan-300 rounded-lg text-xs font-mono font-bold hover:bg-cyan-900 transition flex items-center gap-1.5"
                      >
                        <UploadCloud className="w-3.5 h-3.5" /> Upload Report
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <span className="text-slate-500 text-[10px] uppercase block">Completion Rate</span>
                      <span className="text-base font-bold text-cyan-400">{selectedProject.progressPercent}%</span>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <span className="text-slate-500 text-[10px] uppercase block">Current QAP Stage</span>
                      <span className="text-xs font-bold text-emerald-400 line-clamp-1">{selectedProject.status}</span>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <span className="text-slate-500 text-[10px] uppercase block">Uploaded Reports</span>
                      <span className="text-base font-bold text-amber-400">{selectedProject.uploadedReports.length} Files</span>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <span className="text-slate-500 text-[10px] uppercase block">ASME Stamp</span>
                      <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> ASME U1 Verified
                      </span>
                    </div>
                  </div>

                  {/* Uploaded Inspection Reports Preview List */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-cyan-400" /> Inspection Reports & MTR Certificates
                      </h5>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        {selectedProject.uploadedReports.length} Client-Visible Document(s)
                      </span>
                    </div>

                    {selectedProject.uploadedReports.length === 0 ? (
                      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center text-xs text-slate-500 font-mono">
                        No inspection reports manually uploaded yet. Click "Upload Report" to attach MTRs, RT reports or hydrotest certificates.
                      </div>
                    ) : (
                      <div className="space-y-2 font-mono text-xs">
                        {selectedProject.uploadedReports.map((rep) => (
                          <div
                            key={rep.id}
                            className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4 hover:border-slate-700 transition"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-lg">
                                <FileCheck className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-200">{rep.title}</div>
                                <div className="text-[10px] text-slate-400">
                                  Category: {rep.category} • File: {rep.fileName} • Uploaded by {rep.uploadedBy} on {rep.uploadedAt}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] rounded font-bold">
                                Visible to Client
                              </span>
                              <button
                                onClick={() => alert(`Downloading inspection report file: ${rep.fileName}`)}
                                className="p-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 rounded-lg transition"
                                title="Download Report PDF"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: DEPARTMENT QAP STAGES (10 STAGE HOLD POINTS) --- */}
      {activeTab === "qap" && (
        <div className="space-y-5">
          {!selectedProject ? (
            <div className="bg-slate-950 p-8 border border-slate-800 rounded-2xl text-center space-y-3 font-mono">
              <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-sm text-slate-300 font-bold">Please create or select a project first to view QAP stages.</p>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-xs font-bold"
              >
                Create Project
              </button>
            </div>
          ) : (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedProject.projectNumber}</span>
                  <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-400" /> Department Quality Assurance Plan (QAP) Stages
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Official 10-stage manufacturing hold points, third-party inspection clearances & manual report attachments
                  </p>
                </div>

                <button
                  onClick={() => setShowUploadReportModal(true)}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <UploadCloud className="w-4 h-4" /> Attach Stage Report
                </button>
              </div>

              {/* 10 QAP STAGES LIST */}
              <div className="space-y-3 font-mono text-xs">
                {selectedProject.qapStages.map((stg) => {
                  const isCompleted = stg.status === "Completed";
                  const isInProgress = stg.status === "In Progress";
                  const isHold = stg.status === "Hold / NDE Required";

                  return (
                    <div
                      key={stg.id}
                      className={`p-4 rounded-xl border transition space-y-3 ${
                        isCompleted
                          ? "bg-slate-900 border-emerald-800/80 text-slate-200"
                          : isInProgress
                          ? "bg-cyan-950/70 border-cyan-500/80 text-cyan-200"
                          : isHold
                          ? "bg-amber-950/60 border-amber-600 text-amber-200"
                          : "bg-slate-900/40 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : isInProgress ? (
                              <Clock className="w-5 h-5 text-cyan-400 animate-pulse" />
                            ) : isHold ? (
                              <AlertTriangle className="w-5 h-5 text-amber-400" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                                {stg.stageNumber}
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="font-bold text-sm text-slate-100">{stg.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{stg.description}</div>
                            {stg.inspectorName && (
                              <div className="text-[10px] text-cyan-400 mt-1 font-semibold">
                                Inspector: {stg.inspectorName} {stg.completionDate ? `• Date: ${stg.completionDate}` : ""}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status Select dropdown to update QAP state */}
                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={stg.status}
                            onChange={(e) =>
                              handleUpdateQapStageStatus(
                                selectedProject.id,
                                stg.id,
                                e.target.value as QAPStage["status"]
                              )
                            }
                            className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Hold / NDE Required">Hold / NDE Required</option>
                          </select>
                        </div>
                      </div>

                      {/* Attached Reports under this QAP stage */}
                      {stg.attachedReports.length > 0 && (
                        <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                          <span className="text-[10px] text-emerald-400 font-bold block uppercase">
                            Attached Inspection Reports ({stg.attachedReports.length}):
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {stg.attachedReports.map((r) => (
                              <div
                                key={r.id}
                                className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-[11px]"
                              >
                                <span className="font-bold text-slate-200 truncate">{r.title}</span>
                                <button
                                  onClick={() => alert(`Downloading QAP Stage Report: ${r.fileName}`)}
                                  className="p-1 text-cyan-400 hover:text-cyan-200"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: TENDER PARTICIPATION & BANK GUARANTEES (EMD & PG) --- */}
      {activeTab === "tenders" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
                <Award className="w-5 h-5 text-amber-400" /> Firm Tender Participation & Financial Bank Guarantees
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Track tender participation, Earnest Money Deposits (EMD) & Performance Guarantees (PG) in FDR/BG/DD with automated expiry email alerts
              </p>
            </div>

            <button
              onClick={() => setShowAddTenderModal(true)}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold text-xs font-mono rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4" /> Add Tender Participation Record
            </button>
          </div>

          {/* TENDERS CARDS */}
          <div className="space-y-4 font-mono text-xs">
            {tenders.map((tend) => {
              const emdActive = tend.emd.status === "Active / Deposited";
              const pgActive = tend.performanceGuarantee.status === "Active / Deposited";

              return (
                <div key={tend.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  {/* Tender Top Info */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">{tend.tenderNo}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            tend.participationStatus === "Awarded / Won"
                              ? "bg-emerald-950 border-emerald-700 text-emerald-300"
                              : tend.participationStatus === "Participated"
                              ? "bg-blue-950 border-blue-700 text-blue-300"
                              : "bg-slate-900 border-slate-700 text-slate-400"
                          }`}
                        >
                          {tend.participationStatus}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-100 mt-1">{tend.tenderTitle}</h5>
                      <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" /> {tend.departmentName}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Est. Project Value</span>
                      <span className="text-base font-bold text-emerald-400">
                        ₹{tend.estimatedProjectValue.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Awarded To: {tend.awardeeFirm}</span>
                    </div>
                  </div>

                  {/* EMD & PG Financial Guarantees Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* EMD Box */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4" /> Earnest Money Deposit (EMD)
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            emdActive ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {tend.emd.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-slate-300 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Amount & Form:</span>
                          <span className="font-bold text-white">
                            ₹{tend.emd.amount.toLocaleString()} ({tend.emd.form})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Instrument No:</span>
                          <span className="font-bold text-cyan-300">{tend.emd.instrumentNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Issuing Bank:</span>
                          <span className="text-slate-200">{tend.emd.issuingBank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Validity Period Completion:</span>
                          <span className="font-bold text-amber-300">{tend.emd.validityCompletionDate}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleTriggerEmailAlert(tend, "EMD")}
                        className="w-full mt-2 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-amber-200 text-[11px] font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" /> Send Expiry Email Alert to Recipients
                      </button>
                    </div>

                    {/* Performance Guarantee (PG) Box */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="font-bold text-cyan-400 uppercase text-[11px] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4" /> Performance Guarantee (PG)
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            pgActive ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {tend.performanceGuarantee.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-slate-300 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Amount & Form:</span>
                          <span className="font-bold text-white">
                            ₹{tend.performanceGuarantee.amount.toLocaleString()} ({tend.performanceGuarantee.form})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Instrument No:</span>
                          <span className="font-bold text-cyan-300">{tend.performanceGuarantee.instrumentNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Issuing Bank:</span>
                          <span className="text-slate-200">{tend.performanceGuarantee.issuingBank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Validity Period Completion:</span>
                          <span className="font-bold text-amber-300">{tend.performanceGuarantee.validityCompletionDate}</span>
                        </div>
                      </div>

                      {tend.performanceGuarantee.amount > 0 && (
                        <button
                          onClick={() => handleTriggerEmailAlert(tend, "PG")}
                          className="w-full mt-2 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700 text-cyan-200 text-[11px] font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" /> Send PG Expiry Email Alert
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Email Notifications Log History */}
                  {tend.emailLogs.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sent Email Dispatch Logs ({tend.emailLogs.length}):
                      </span>
                      <div className="space-y-1">
                        {tend.emailLogs.map((log) => (
                          <div
                            key={log.id}
                            className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-[10px] text-slate-300 flex justify-between"
                          >
                            <span>To: {log.recipientEmail}</span>
                            <span className="text-slate-500">{log.sentDate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB 4: DATA REPORTS & CAD DOWNLOADS --- */}
      {activeTab === "downloads" && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              ASME Data Reports, CAD Downloads & Inspection Certificates
            </h4>

            <button
              onClick={() => setShowUploadReportModal(true)}
              className="px-3 py-1.5 bg-cyan-700 text-white rounded-lg font-bold flex items-center gap-1"
            >
              <UploadCloud className="w-3.5 h-3.5" /> Upload Document
            </button>
          </div>

          {!selectedProject ? (
            <div className="p-6 text-center text-slate-500">No active project selected. Please create or select a project.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProject.uploadedReports.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4 hover:border-cyan-500/60 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-100">{doc.title}</h5>
                      <p className="text-[11px] text-slate-400">{doc.category} • {doc.fileSize}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading: ${doc.fileName}`)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {selectedProject.documents.map((doc, idx) => (
                <div
                  key={`doc-${idx}`}
                  className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4 hover:border-cyan-500/60 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-100">{doc.title}</h5>
                      <p className="text-[11px] text-slate-400">{doc.type} • {doc.size}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading: ${doc.title}`)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 5: ENGINEERING SUPPORT TICKETS --- */}
      {activeTab === "tickets" && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6 font-mono text-xs">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
            Direct Senior Engineering Consultation & Quality Support
          </h4>

          {ticketSubmitted ? (
            <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Support ticket submitted! A senior thermal engineer will reply within 2 business hours.</span>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="text-slate-400">Inquiry Subject:</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Requesting QAP stage 5 NDE Radiography film review"
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-xl mt-1 focus:outline-none focus:border-cyan-500 font-bold"
                />
              </div>

              <div>
                <label className="text-slate-400">Detailed Description & Technical Requirements:</label>
                <textarea
                  rows={4}
                  required
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  placeholder="Provide details regarding ASME code exceptions, third-party inspection schedules, or design changes..."
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-xl mt-1 focus:outline-none focus:border-cyan-500 font-bold"
                />
              </div>

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" /> Submit Consultation Ticket
              </button>
            </form>
          )}
        </div>
      )}

      {/* --- MODAL 1: ADD NEW CLIENT PROJECT --- */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-4 font-mono text-xs text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create & Upload New Client Project
              </h4>
              <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Project Job Reference No.</label>
                <input
                  type="text"
                  required
                  value={newProjectNo}
                  onChange={(e) => setNewProjectNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Equipment / Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 500kW Heavy TEMA BEM Condenser Assembly"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Client Company / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indian Oil Corporation Ltd (IOCL)"
                  value={newClientCompany}
                  onChange={(e) => setNewClientCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">TEMA Design Type</label>
                  <select
                    value={newTemaType}
                    onChange={(e) => setNewTemaType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                  >
                    <option value="BEM">BEM (Fixed Tubesheet)</option>
                    <option value="AES">AES (Split Ring Floating)</option>
                    <option value="BEU">BEU (U-Tube Bundle)</option>
                    <option value="NEN">NEN (Integral Channel)</option>
                    <option value="AKT">AKT (Kettle Reboiler)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Est. Delivery Date</label>
                  <input
                    type="date"
                    value={newDeliveryDate}
                    onChange={(e) => setNewDeliveryDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                  />
                </div>
              </div>

              <p className="text-[10px] text-slate-400 pt-1">
                Note: Creating a new project automatically initializes the 10 Department QAP hold point stages for tracking.
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 font-bold rounded-lg text-xs text-slate-950 cursor-pointer"
                >
                  Create & Initialize QAP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: UPLOAD INSPECTION REPORT --- */}
      {showUploadReportModal && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-4 font-mono text-xs text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Upload Inspection & MTR Report
              </h4>
              <button onClick={() => setShowUploadReportModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadReportSubmit} className="space-y-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Document / Certificate Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hydrotest Witness Certificate @ 25 Bar"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Category</label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                  >
                    <option value="MTR Certificate">MTR Certificate</option>
                    <option value="Radiography RT Report">Radiography RT Report</option>
                    <option value="Hydrotest Witness Certificate">Hydrotest Witness Certificate</option>
                    <option value="PWHT Chart">PWHT Chart</option>
                    <option value="TPI Inspection Signoff">TPI Inspection Signoff</option>
                    <option value="QAP Stage Report">QAP Stage Report</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Attach to QAP Stage</label>
                  <select
                    value={targetStageId}
                    onChange={(e) => setTargetStageId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                  >
                    {DEFAULT_DEPARTMENT_QAP_STAGES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">File Name Attachment</label>
                <input
                  type="text"
                  placeholder="Hydrotest_Certificate_Witness_TPI.pdf"
                  value={reportFileName}
                  onChange={(e) => setReportFileName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg text-slate-300 font-bold"
                />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200 block">Make Visible to Client Portal</span>
                  <span className="text-[10px] text-slate-400">Client will be able to view & download this certificate directly</span>
                </div>
                <input
                  type="checkbox"
                  checked={reportVisibleClient}
                  onChange={(e) => setReportVisibleClient(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadReportModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg text-xs text-white cursor-pointer"
                >
                  Upload & Save Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ADD TENDER & BANK GUARANTEES --- */}
      {showAddTenderModal && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto max-h-screen">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full my-8 space-y-4 font-mono text-xs text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Award className="w-4 h-4" /> Record Firm Tender Participation & EMD / PG Guarantees
              </h4>
              <button onClick={() => setShowAddTenderModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTenderSubmit} className="space-y-4">
              {/* Tender Basic Info */}
              <div className="space-y-2 border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-cyan-400 uppercase">1. Tender & Department Overview</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Tender Reference No.</label>
                    <input
                      type="text"
                      required
                      value={tenderNo}
                      onChange={(e) => setTenderNo(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Department / Organization Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Indian Oil Corporation Ltd (IOCL)"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Tender Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Supply of TEMA Heat Exchanger Bundles"
                    value={tenderTitle}
                    onChange={(e) => setTenderTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Firm Participation Status</label>
                    <select
                      value={participationStatus}
                      onChange={(e) => setParticipationStatus(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    >
                      <option value="Participated">Participated</option>
                      <option value="Awarded / Won">Awarded / Won</option>
                      <option value="L1 Bidder">L1 Bidder</option>
                      <option value="Under Evaluation">Under Evaluation</option>
                      <option value="Non-Awarded">Non-Awarded</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Awardee Firm (Who Got It)</label>
                    <input
                      type="text"
                      required
                      value={awardeeFirm}
                      onChange={(e) => setAwardeeFirm(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Est. Project Value (₹)</label>
                    <input
                      type="number"
                      required
                      value={estValue}
                      onChange={(e) => setEstValue(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Earnest Money Deposit (EMD) Section */}
              <div className="space-y-2 border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-amber-400 uppercase">2. Earnest Money Deposit (EMD) Details</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">EMD Amount (₹)</label>
                    <input
                      type="number"
                      value={emdAmount}
                      onChange={(e) => setEmdAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Deposit Form</label>
                    <select
                      value={emdForm}
                      onChange={(e) => setEmdForm(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    >
                      <option value="FDR">FDR (Fixed Deposit Receipt)</option>
                      <option value="Bank Guarantee (BG)">Bank Guarantee (BG)</option>
                      <option value="Demand Draft (DD)">Demand Draft (DD)</option>
                      <option value="Online E-Transfer">Online E-Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Instrument No / Ref</label>
                    <input
                      type="text"
                      value={emdInstNo}
                      onChange={(e) => setEmdInstNo(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Issuing Bank Name</label>
                    <input
                      type="text"
                      value={emdBank}
                      onChange={(e) => setEmdBank(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Validity Completion Date</label>
                    <input
                      type="date"
                      value={emdCompDate}
                      onChange={(e) => setEmdCompDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Performance Guarantee (PG) Section */}
              <div className="space-y-2 border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-emerald-400 uppercase">3. Performance Guarantee (PG) Details</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">PG Amount (₹)</label>
                    <input
                      type="number"
                      value={pgAmount}
                      onChange={(e) => setPgAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">PG Deposit Form</label>
                    <select
                      value={pgForm}
                      onChange={(e) => setPgForm(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    >
                      <option value="Bank Guarantee (BG)">Bank Guarantee (BG)</option>
                      <option value="FDR">FDR (Fixed Deposit Receipt)</option>
                      <option value="Demand Draft (DD)">Demand Draft (DD)</option>
                      <option value="Online E-Transfer">Online E-Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">BG Instrument No</label>
                    <input
                      type="text"
                      value={pgInstNo}
                      onChange={(e) => setPgInstNo(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">PG Issuing Bank</label>
                    <input
                      type="text"
                      value={pgBank}
                      onChange={(e) => setPgBank(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">PG Expiry Completion Date</label>
                    <input
                      type="date"
                      value={pgCompDate}
                      onChange={(e) => setPgCompDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Email Recipients */}
              <div className="space-y-1">
                <label className="text-amber-400 font-bold block">Alert Email Addresses (Comma Separated)</label>
                <input
                  type="text"
                  value={notifyEmailsStr}
                  onChange={(e) => setNotifyEmailsStr(e.target.value)}
                  placeholder="accounts@northernheatex.com, client@iocl.co.in"
                  className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-bold text-white"
                />
                <span className="text-[10px] text-slate-500">
                  When specified period completes or reaches maturity, email notifications will be sent to these addresses with project & deposit details.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTenderModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 font-bold rounded-lg text-xs text-slate-950 cursor-pointer"
                >
                  Save Tender & Guarantees
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 4: EMAIL NOTIFICATION PREVIEW --- */}
      {activeEmailPreview && (
        <div className="fixed inset-0 z-[130] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 max-w-xl w-full space-y-4 font-mono text-xs text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" /> Automated Maturity Notification Email Sent
              </h4>
              <button onClick={() => setActiveEmailPreview(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-[11px] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Email notification dispatched successfully to specified recipient emails!</span>
            </div>

            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-500 font-bold">To:</span> <span className="text-cyan-300">{activeEmailPreview.recipient}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Subject:</span> <span className="text-amber-300 font-bold">{activeEmailPreview.subject}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {activeEmailPreview.body}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveEmailPreview(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
