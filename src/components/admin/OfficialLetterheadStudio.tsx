import React, { useState, useEffect, useRef } from "react";
import { UserRole } from "../../types";
import { CompanyLogo } from "../common/CompanyLogo";
import logoImg from "../../assets/images/northern_heatex_logo_1784964393778.jpg";
import {
  FileText,
  Printer,
  Download,
  Plus,
  History,
  Search,
  Trash2,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Lock,
  Sparkles,
  Calendar,
  Hash,
  User,
  Send,
  Eye,
  Edit3,
  QrCode,
  FileSpreadsheet,
  Layers,
  ChevronRight,
} from "lucide-react";
import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
} from "docx";

interface OfficialLetterheadStudioProps {
  currentRole?: UserRole;
  onSwitchRole?: (role: UserRole) => void;
}

export interface LetterRecord {
  id: string;
  refNo: string;
  deptCode: string;
  year: number;
  sequenceNo: number;
  date: string;
  recipientName: string;
  recipientTitle: string;
  recipientOrg: string;
  recipientAddress: string;
  recipientEmail: string;
  subject: string;
  salutation: string;
  bodyParagraphs: string[];
  specTable?: { label: string; value: string }[];
  closingText: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryDept: string;
  includeDigitalStamp: boolean;
  includeQRVerification: boolean;
  status: "Draft" | "Dispatched" | "Archived";
  createdAt: string;
}

// Department short codes dictionary
const DEPARTMENTS = [
  { code: "ENG", name: "Design & Engineering Division" },
  { code: "QA", name: "Quality Assurance & ASME Inspection" },
  { code: "SALES", name: "Commercial & International Sales" },
  { code: "ADMIN", name: "Executive Administration" },
  { code: "PURCHASE", name: "Procurement & Material Management" },
  { code: "HR", name: "Human Resources & Talent" },
  { code: "PROD", name: "Workshop & Fabrication Plant" },
  { code: "RND", name: "Thermal Innovation & R&D" },
];

const DEFAULT_SAMPLE_LETTERS: LetterRecord[] = [
  {
    id: "letter-001",
    refNo: "NHEC/ENG/2026/001",
    deptCode: "ENG",
    year: 2026,
    sequenceNo: 1,
    date: "26 July 2026",
    recipientName: "Mr. Rajesh Malhotra",
    recipientTitle: "Chief General Manager (Mechanical)",
    recipientOrg: "BHEL Power Station Project",
    recipientAddress: "Sector 14, BHEL Complex, Ranipur, Haridwar, Uttarakhand - 249403",
    recipientEmail: "rmalhotra@bhel.in",
    subject: "Technical Clearance & Guarantee Certificate for 1,250 kW Stator Air Coolers (Ref: BHEL/PO/2026/890)",
    salutation: "Dear Sir,",
    bodyParagraphs: [
      "We are pleased to inform you that the manufacturing and hydro-testing of 02 sets of Double Tubesheet Stator Air Coolers against your Purchase Order (Ref: BHEL/PO/2026/890) have been successfully completed at our Haridwar Works.",
      "The equipment has undergone rigorous 100% Radiographic Testing (RT) on shell longitudinal seams and Hydrostatic Pressure Testing at 45.5 Bar(g) under full Third-Party Inspection (TPI) clearance. The measured thermal duty meets the design criteria of 1,250 kW at specified cooling water inlet conditions.",
      "Please find attached herewith the ASME Manufacturer's Data Report (Form U-1) and raw material test certificates for Cu-Ni 70/30 tubes. We request you to schedule the final dispatch inspection.",
    ],
    specTable: [
      { label: "Equipment Tag", value: "SAC-01A / SAC-01B" },
      { label: "ASME Code Stamp", value: "ASME Sec VIII Div 1 & TEMA Class R" },
      { label: "Tube Material", value: "SB-111 C71500 (Cu-Ni 70/30) 19.05mm OD" },
      { label: "Hydrotest Pressure", value: "45.5 Bar (Shell) / 12.0 Bar (Tube)" },
      { label: "Warranty Coverage", value: "24 Months from commissioning date" },
    ],
    closingText: "Thanking you and assuring you of our best engineering services at all times.",
    signatoryName: "Er. A. K. Sharma",
    signatoryTitle: "Director of Engineering & Operations",
    signatoryDept: "Design & Engineering Division",
    includeDigitalStamp: true,
    includeQRVerification: true,
    status: "Dispatched",
    createdAt: "2026-07-26T10:00:00.000Z",
  },
  {
    id: "letter-002",
    refNo: "NHEC/QA/2026/014",
    deptCode: "QA",
    year: 2026,
    sequenceNo: 14,
    date: "24 July 2026",
    recipientName: "Dr. S. K. Chatterji",
    recipientTitle: "Head of Inspection Division",
    recipientOrg: "Siemens Energy India Ltd",
    recipientAddress: "Industrial Estate, Sector 3, Noida, UP - 201301",
    recipientEmail: "sk.chatterji@siemens-energy.com",
    subject: "Quality Audit Approval & Tube Joint Pneumatic Expansion Release Notice",
    salutation: "Respected Dr. Chatterji,",
    bodyParagraphs: [
      "With reference to the Quality Assurance Audit conducted on 22nd July 2026 at Northern HeatEx Corporation Haridwar Works, we hereby confirm that all minor observations regarding GTAW strength welding of Super Duplex 2205 tubesheets have been resolved.",
      "The 5-roll pneumatic tube expansion process has been verified using precision digital torque limiters and helium leak testing at 1.5 bar. All joints passed zero-leakage threshold standards.",
    ],
    specTable: [
      { label: "Audit Reference", value: "SEIL-QA-2026-901" },
      { label: "Joint Qualification", value: "WPS / PQR # NHEC-2205-GTAW-04" },
      { label: "Helium Leak Rate", value: "< 1 x 10^-6 mbar·l/s (Passed)" },
    ],
    closingText: "Yours faithfully,",
    signatoryName: "Quality Assurance Department",
    signatoryTitle: "Chief Inspector (ASME Authorized Inspector)",
    signatoryDept: "Quality Assurance Division",
    includeDigitalStamp: true,
    includeQRVerification: true,
    status: "Dispatched",
    createdAt: "2026-07-24T14:30:00.000Z",
  },
];

export const OfficialLetterheadStudio: React.FC<OfficialLetterheadStudioProps> = ({
  currentRole = "Company Administrator",
  onSwitchRole,
}) => {
  const isAdmin = currentRole === "Company Administrator" || currentRole === "Super Administrator";

  // History state loaded from LocalStorage
  const [history, setHistory] = useState<LetterRecord[]>(() => {
    try {
      const saved = localStorage.getItem("nhec_official_letters_history");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_SAMPLE_LETTERS;
  });

  // Active Letter Draft State
  const [deptCode, setDeptCode] = useState<string>("ENG");
  const [year, setYear] = useState<number>(2026);
  const [seqNo, setSeqNo] = useState<number>(15);
  const [refNo, setRefNo] = useState<string>("NHEC/ENG/2026/015");

  const [date, setDate] = useState<string>("26 July 2026");
  const [recipientName, setRecipientName] = useState<string>("Er. Vikas Gupta");
  const [recipientTitle, setRecipientTitle] = useState<string>("General Manager (Projects)");
  const [recipientOrg, setRecipientOrg] = useState<string>("NTPC Thermal Power Station");
  const [recipientAddress, setRecipientAddress] = useState<string>(
    "Ramagundam Super Thermal Power Station, Peddapalli, Telangana - 505215"
  );
  const [recipientEmail, setRecipientEmail] = useState<string>("vgupta@ntpc.co.in");

  const [subject, setSubject] = useState<string>(
    "Official Performance Warranty & Tube Bundle Inspection Report (Ref: NTPC/PO/4509)"
  );
  const [salutation, setSalutation] = useState<string>("Dear Sir,");

  const [bodyText, setBodyText] = useState<string>(
    `We are pleased to submit the official inspection documentation and performance clearance certificate for the Replacement Surface Condenser Tube Bundle supplied under PO #NTPC/PO/4509.\n\nAll 420 seamless Titanium Grade 2 tubes have been non-destructively tested (Eddy Current Testing) and hydrostatically proved at 20 Bar(g). The equipment is fully warranted for 24 months from the date of trial operation.\n\nKindly acknowledge receipt and issue the final completion clearance.`
  );

  const [specTable, setSpecTable] = useState<{ label: string; value: string }[]>([
    { label: "Equipment Tag", value: "TB-NTPC-2026-R1" },
    { label: "Tube Material", value: "ASTM B338 Grade 2 Titanium" },
    { label: "Design Code", value: "HEI / TEMA Class R / ASME Sec VIII Div 1" },
    { label: "Warranty Term", value: "24 Months Full Operational Guarantee" },
  ]);

  const [closingText, setClosingText] = useState<string>("Yours faithfully,");
  const [signatoryName, setSignatoryName] = useState<string>("Er. A. K. Sharma");
  const [signatoryTitle, setSignatoryTitle] = useState<string>("Director of Engineering & Operations");
  const [signatoryDept, setSignatoryDept] = useState<string>("Design & Engineering Division");
  const [includeDigitalStamp, setIncludeDigitalStamp] = useState<boolean>(true);
  const [includeQRVerification, setIncludeQRVerification] = useState<boolean>(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [activeSubTab, setActiveSubTab] = useState<"editor" | "history">("editor");

  const printRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-update Ref No when Dept, Year, or Seq changes
  useEffect(() => {
    const formattedSeq = String(seqNo).padStart(3, "0");
    setRefNo(`NHEC/${deptCode}/${year}/${formattedSeq}`);
  }, [deptCode, year, seqNo]);

  // Save history to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("nhec_official_letters_history", JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Preset Template Loader
  const handleLoadTemplate = (templateType: string) => {
    if (templateType === "compliance") {
      setSubject("Technical Compliance Clearance & ASME Hydrotest Certificate");
      setBodyText(
        `We hereby confirm that the manufactured Heat Exchanger assembly has successfully passed all ASME Section VIII Div 1 pressure safety tests and TEMA Class R dimensional tolerances at our Haridwar Works.\n\nAll non-destructive examinations (RT, UT, PT, and Hydrotest) were witnessed and signed off by the Authorized Inspection Inspector. The equipment is ready for packaging and dispatch.`
      );
      setSpecTable([
        { label: "ASME Stamp", value: "ASME SEC VIII DIV 1 (Form U-1 Attached)" },
        { label: "Hydrotest Pressure", value: "48.0 Bar(g) for 60 Minutes" },
        { label: "TPI Inspection", value: "Cleared with Zero Defect Clearance" },
      ]);
    } else if (templateType === "warranty") {
      setSubject("Official 24-Month Performance & Material Warranty Guarantee");
      setBodyText(
        `Northern HeatEx Corporation hereby guarantees that the equipment supplied is manufactured from prime certified materials and free from defects in workmanship or thermal rating design.\n\nIn the event of any mechanical defect occurring within 24 months of commissioning or 30 months from dispatch, Northern HeatEx Corporation undertakes to repair or replace the affected tube bundle free of charge.`
      );
      setSpecTable([
        { label: "Warranty Duration", value: "24 Months from commissioning" },
        { label: "Coverage", value: "Thermal Duty & Mechanical Integrity" },
        { label: "Standard", value: "ASME VIII Div 1 & TEMA Class C" },
      ]);
    } else if (templateType === "price-revision") {
      setSubject("Commercial Revision Notice & Raw Material Alloy Surcharge Adjustment");
      setBodyText(
        `Due to recent fluctuations in international Super Duplex 2205 nickel/molybdenum alloy surcharges, we request a minor adjustment in the unit line item cost as permitted under Clause 14 of our commercial framework agreement.\n\nPlease review the attached revised commercial schedule and confirm approval.`
      );
      setSpecTable([
        { label: "Original Base PO", value: "₹74,36,400 INR" },
        { label: "Alloy Escalation", value: "+3.2% per LME Nickel Index" },
        { label: "Revised PO Value", value: "₹76,74,360 INR" },
      ]);
    } else if (templateType === "po-ack") {
      setSubject("Purchase Order Acknowledgement & Manufacturing Schedule Release");
      setBodyText(
        `We acknowledge with thanks the receipt of your Purchase Order for the fabrication of 04 Units High-Pressure Feedwater Coolers.\n\nEngineering drawings have been initiated and detailed ASME calculations will be submitted within 7 working days for your engineering approval.`
      );
      setSpecTable([
        { label: "Target Delivery", value: "10 Weeks from Drawing Approval" },
        { label: "Plant Location", value: "Haridwar Works, Phase II, India" },
      ]);
    }
    showToast(`Template '${templateType.toUpperCase()}' inserted successfully.`);
  };

  // Save current letter to history
  const handleSaveToHistory = () => {
    const bodyParagraphs = bodyText.split("\n\n").filter((p) => p.trim().length > 0);
    const newRecord: LetterRecord = {
      id: `letter-${Date.now()}`,
      refNo,
      deptCode,
      year,
      sequenceNo: seqNo,
      date,
      recipientName,
      recipientTitle,
      recipientOrg,
      recipientAddress,
      recipientEmail,
      subject,
      salutation,
      bodyParagraphs,
      specTable,
      closingText,
      signatoryName,
      signatoryTitle,
      signatoryDept,
      includeDigitalStamp,
      includeQRVerification,
      status: "Dispatched",
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => [newRecord, ...prev.filter((item) => item.refNo !== refNo)]);
    setSeqNo((prev) => prev + 1);
    showToast(`Letter ${refNo} saved to persistent dispatch history!`);
  };

  // Retrieve & load historic letter
  const handleRetrieveLetter = (record: LetterRecord) => {
    setDeptCode(record.deptCode || "ENG");
    setYear(record.year || 2026);
    setSeqNo(record.sequenceNo || 1);
    setRefNo(record.refNo);
    setDate(record.date);
    setRecipientName(record.recipientName);
    setRecipientTitle(record.recipientTitle);
    setRecipientOrg(record.recipientOrg);
    setRecipientAddress(record.recipientAddress);
    setRecipientEmail(record.recipientEmail);
    setSubject(record.subject);
    setSalutation(record.salutation);
    setBodyText(record.bodyParagraphs.join("\n\n"));
    setSpecTable(record.specTable || []);
    setClosingText(record.closingText);
    setSignatoryName(record.signatoryName);
    setSignatoryTitle(record.signatoryTitle);
    setSignatoryDept(record.signatoryDept);
    setIncludeDigitalStamp(record.includeDigitalStamp);
    setIncludeQRVerification(record.includeQRVerification);

    setActiveSubTab("editor");
    showToast(`Loaded letter ${record.refNo} into Letterhead Studio.`);
  };

  // Delete historic letter
  const handleDeleteRecord = (id: string) => {
    if (confirm("Are you sure you want to delete this official letter record?")) {
      setHistory((prev) => prev.filter((item) => item.id !== id));
      showToast("Record deleted from history.");
    }
  };

  // Print Letterhead directly
  const handlePrint = () => {
    window.print();
  };

  // Export to PDF
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth(); // 210
      const margin = 18;

      // Header Banner Accent Lines
      doc.setFillColor(0, 51, 102); // #003366 Deep Corporate Navy
      doc.rect(0, 0, pageWidth, 8, "F");

      doc.setFillColor(217, 119, 6); // Gold line
      doc.rect(0, 8, pageWidth, 2, "F");

      // Company Branding Header - Centered
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 102);
      doc.text("NORTHERN HEATEX CORPORATION", pageWidth / 2, 22, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Carry Legacy: Noor Engineering Works (Est. 1983) • Heavy Industrial Works", pageWidth / 2, 27, { align: "center" });

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(217, 119, 6);
      doc.text("ISO 9001:2015 Certified Plant", pageWidth / 2, 31, { align: "center" });

      // Divider line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, 35, pageWidth - margin, 35);

      let currentY = 42;

      // Reference Number & Date Box
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`Ref. No: ${refNo}`, margin, currentY);

      doc.setFont("helvetica", "bold");
      doc.text(`Date: ${date}`, pageWidth - margin, currentY, { align: "right" });

      currentY += 10;

      // Recipient Block
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text("To,", margin, currentY);
      currentY += 5;

      doc.text(recipientName, margin, currentY);
      currentY += 4.5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);

      if (recipientTitle) {
        doc.text(recipientTitle, margin, currentY);
        currentY += 4.5;
      }
      if (recipientOrg) {
        doc.setFont("helvetica", "bold");
        doc.text(recipientOrg, margin, currentY);
        doc.setFont("helvetica", "normal");
        currentY += 4.5;
      }
      if (recipientAddress) {
        const addressLines = doc.splitTextToSize(recipientAddress, 110);
        doc.text(addressLines, margin, currentY);
        currentY += addressLines.length * 4.5;
      }

      currentY += 6;

      // Subject Block
      doc.setFillColor(241, 245, 249); // light background
      doc.rect(margin, currentY - 4, pageWidth - margin * 2, 8 + Math.ceil(subject.length / 80) * 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(0, 51, 102);

      const subjLines = doc.splitTextToSize(`Subject: ${subject}`, pageWidth - margin * 2 - 4);
      doc.text(subjLines, margin + 2, currentY + 1);
      currentY += subjLines.length * 4.5 + 8;

      // Salutation
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(salutation, margin, currentY);
      currentY += 7;

      // Body Paragraphs
      const bodyParagraphs = bodyText.split("\n\n").filter((p) => p.trim().length > 0);
      bodyParagraphs.forEach((para) => {
        const splitPara = doc.splitTextToSize(para, pageWidth - margin * 2);
        doc.text(splitPara, margin, currentY);
        currentY += splitPara.length * 5 + 4;
      });

      // Specification Table if present
      if (specTable && specTable.length > 0) {
        currentY += 2;
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);

        specTable.forEach((row) => {
          doc.rect(margin, currentY, 60, 7);
          doc.rect(margin + 60, currentY, pageWidth - margin * 2 - 60, 7);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(8.5);
          doc.setTextColor(30, 41, 59);
          doc.text(row.label, margin + 2, currentY + 4.8);

          doc.setFont("helvetica", "normal");
          doc.setTextColor(51, 65, 85);
          doc.text(row.value, margin + 63, currentY + 4.8);

          currentY += 7;
        });
        currentY += 6;
      }

      currentY += 4;
      // Closing
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(closingText, margin, currentY);
      currentY += 8;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(0, 51, 102);
      doc.text("For NORTHERN HEATEX CORPORATION", margin, currentY);
      currentY += 14;

      // Digital Stamp Box
      if (includeDigitalStamp) {
        doc.setDrawColor(0, 51, 102);
        doc.rect(margin, currentY - 10, 45, 12);
        doc.setFontSize(7);
        doc.setTextColor(0, 51, 102);
        doc.text("DIGITALLY SIGNED & SEALED", margin + 2, currentY - 5);
        doc.text("AUTHORIZED SIGNATURE", margin + 2, currentY - 1);
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(signatoryName, margin, currentY + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(signatoryTitle, margin, currentY + 10);
      doc.text(signatoryDept, margin, currentY + 14);

      // Footer
      const footerY = 275;
      doc.setFillColor(0, 51, 102);
      doc.rect(0, footerY, pageWidth, 2, "F");

      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(
        "Works & Office: B-42/43, Heavy Industrial Area, Phase II, Haridwar, Uttarakhand - 249403, India",
        margin,
        footerY + 6
      );
      doc.text(
        "Tel: +91 1334 234567 • Email: info@northernheatex.com • Web: www.northernheatex.com",
        margin,
        footerY + 10
      );
      doc.text(
        `GSTIN: 05AAACN1996E1Z2 • CIN: U28113UR1996PTC021004 • Document Ref: ${refNo}`,
        margin,
        footerY + 14
      );

      doc.text("Page 1 of 1", pageWidth - margin, footerY + 14, { align: "right" });

      doc.save(`Official_Letter_${refNo.replace(/\//g, "_")}.pdf`);
      showToast(`Exported ${refNo} as high-res PDF.`);
    } catch (err) {
      console.error(err);
      showToast("Error exporting PDF letter.");
    }
  };

  // Export to Word (.docx) file
  const handleExportWord = async () => {
    try {
      const tableRows = [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
              },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "Specification Parameter", bold: true, size: 18 })],
                }),
              ],
            }),
            new TableCell({
              width: { size: 70, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
              },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "Value / ASME Compliance Detail", bold: true, size: 18 })],
                }),
              ],
            }),
          ],
        }),
      ];

      specTable.forEach((row) => {
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: row.label, bold: true, size: 18 })] })],
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: row.value, size: 18 })] })],
              }),
            ],
          })
        );
      });

      const bodyParagraphs = bodyText.split("\n\n").filter((p) => p.trim().length > 0);

      const docxDocument = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1000,
                  bottom: 1000,
                  left: 1200,
                  right: 1200,
                },
              },
            },
            children: [
              // Company Header Title - Centered
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "NORTHERN HEATEX CORPORATION",
                    bold: true,
                    size: 32,
                    color: "003366",
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Noor Engineering Works (Est. 1983) • Heavy Industrial Equipment Plant",
                    size: 18,
                    color: "64748B",
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "ISO 9001:2015 CERTIFIED PLANT",
                    bold: true,
                    size: 16,
                    color: "D97706",
                  }),
                ],
              }),
              new Paragraph({ text: "" }), // spacing

              // Ref and Date
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: `Date: ${date}`, bold: true, size: 20 })],
              }),
              new Paragraph({
                children: [new TextRun({ text: `Ref. No: ${refNo}`, bold: true, size: 22, color: "003366" })],
              }),
              new Paragraph({ text: "" }),

              // Recipient
              new Paragraph({ children: [new TextRun({ text: "To,", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: recipientName, bold: true, size: 20 })] }),
              ...(recipientTitle
                ? [new Paragraph({ children: [new TextRun({ text: recipientTitle, size: 18 })] })]
                : []),
              ...(recipientOrg
                ? [new Paragraph({ children: [new TextRun({ text: recipientOrg, bold: true, size: 18 })] })]
                : []),
              ...(recipientAddress
                ? [new Paragraph({ children: [new TextRun({ text: recipientAddress, size: 18 })] })]
                : []),
              new Paragraph({ text: "" }),

              // Subject
              new Paragraph({
                children: [
                  new TextRun({
                    text: `SUBJECT: ${subject.toUpperCase()}`,
                    bold: true,
                    size: 20,
                    color: "003366",
                  }),
                ],
              }),
              new Paragraph({ text: "" }),

              // Salutation
              new Paragraph({ children: [new TextRun({ text: salutation, size: 20 })] }),
              new Paragraph({ text: "" }),

              // Body Paragraphs
              ...bodyParagraphs.flatMap((para) => [
                new Paragraph({
                  children: [new TextRun({ text: para, size: 20 })],
                }),
                new Paragraph({ text: "" }),
              ]),

              // Spec Table
              ...(specTable.length > 0
                ? [
                    new Table({
                      width: { size: 100, type: WidthType.PERCENTAGE },
                      rows: tableRows,
                    }),
                    new Paragraph({ text: "" }),
                  ]
                : []),

              // Closing
              new Paragraph({ children: [new TextRun({ text: closingText, size: 20 })] }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "For NORTHERN HEATEX CORPORATION",
                    bold: true,
                    size: 20,
                    color: "003366",
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              ...(includeDigitalStamp
                ? [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "[OFFICIALLY DIGITALLY SIGNED & STAMPED]",
                          bold: true,
                          size: 16,
                          color: "003366",
                        }),
                      ],
                    }),
                  ]
                : []),
              new Paragraph({ children: [new TextRun({ text: signatoryName, bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: signatoryTitle, size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: signatoryDept, size: 18 })] }),
              new Paragraph({ text: "" }),
              new Paragraph({ text: "" }),

              // Footer
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Northern HeatEx Corporation • Haridwar Works, B-42/43 Heavy Industrial Area, Phase II, Haridwar, Uttarakhand - 249403, India",
                    size: 14,
                    color: "64748B",
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(docxDocument);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Official_Letter_${refNo.replace(/\//g, "_")}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast(`Exported ${refNo} as Word (.docx) document.`);
    } catch (err) {
      console.error(err);
      showToast("Failed to generate Word document.");
    }
  };

  // Filtered History
  const filteredHistory = history.filter((item) => {
    const matchesDept = filterDept === "All" || item.deptCode === filterDept;
    const matchesSearch =
      searchQuery === "" ||
      item.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipientOrg.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-cyan-300 border border-cyan-500/50 px-5 py-3 rounded-2xl shadow-2xl font-mono text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Access Banner & Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> ADMIN EXCLUSIVE TOOL
              </span>
              <span className="px-3 py-1 bg-white/10 text-cyan-300 rounded-full">
                Role: <strong className="text-white">{currentRole}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-7 h-7 text-cyan-400" /> Official Company Letterhead & Dispatch Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Create, customize, print, and export official correspondence on Northern HeatEx high-end company letterhead with auto-generated reference numbers, PDF/Word downloads, and persistent dispatch history.
            </p>
          </div>

          {/* Quick Actions & Role Guard Toggle */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {!isAdmin && onSwitchRole && (
              <button
                onClick={() => onSwitchRole("Company Administrator")}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg transition cursor-pointer"
              >
                <Lock className="w-4 h-4" /> Unlock Admin Privileges
              </button>
            )}

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveSubTab("editor")}
                className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSubTab === "editor"
                    ? "bg-[#0056A6] text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Edit3 className="w-4 h-4" /> Letterhead Studio
              </button>
              <button
                onClick={() => setActiveSubTab("history")}
                className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSubTab === "history"
                    ? "bg-[#0056A6] text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <History className="w-4 h-4" /> Letter History ({history.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isAdmin && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-200 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Note: Official letter issuance is restricted to Company Administrators. You are currently viewing in preview mode.</span>
          </div>
          {onSwitchRole && (
            <button
              onClick={() => onSwitchRole("Company Administrator")}
              className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px] cursor-pointer"
            >
              Switch to Admin
            </button>
          )}
        </div>
      )}

      {/* SUB-TAB 1: EDITOR & PREVIEW */}
      {activeSubTab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: EDITOR CONTROLS */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-xs font-mono text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Edit3 className="w-4 h-4" /> Letter Configuration & Reference
              </h3>
              <span className="text-[10px] text-slate-500 uppercase">Live Sync</span>
            </div>

            {/* Department & Reference Number Generator */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5" /> Department & Auto Reference No.
                </span>
                <span className="text-[10px] text-slate-400">Year: {year}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Department Code</label>
                  <select
                    value={deptCode}
                    onChange={(e) => setDeptCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white font-bold"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.code} - {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Sequence #</label>
                  <input
                    type="number"
                    value={seqNo}
                    onChange={(e) => setSeqNo(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-cyan-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Generated Letter Ref No.</label>
                <input
                  type="text"
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/50 text-cyan-400 p-2.5 rounded-xl font-bold tracking-wider text-sm"
                />
              </div>
            </div>

            {/* Quick Templates Selector */}
            <div className="space-y-2">
              <label className="block text-slate-400 text-[11px] font-bold">
                Insert Official Template (1-Click)
              </label>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  onClick={() => handleLoadTemplate("compliance")}
                  className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-300 transition cursor-pointer"
                >
                  <strong className="text-cyan-300 block">ASME Hydro Clearance</strong>
                  <span className="text-[10px] text-slate-500">TPI & Code Stamp</span>
                </button>
                <button
                  onClick={() => handleLoadTemplate("warranty")}
                  className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-300 transition cursor-pointer"
                >
                  <strong className="text-amber-300 block">24-Mo Guarantee</strong>
                  <span className="text-[10px] text-slate-500">Tube Bundle Warranty</span>
                </button>
                <button
                  onClick={() => handleLoadTemplate("price-revision")}
                  className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-300 transition cursor-pointer"
                >
                  <strong className="text-emerald-300 block">Price Revision</strong>
                  <span className="text-[10px] text-slate-500">Alloy Surcharge</span>
                </button>
                <button
                  onClick={() => handleLoadTemplate("po-ack")}
                  className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-300 transition cursor-pointer"
                >
                  <strong className="text-indigo-300 block">PO Ack & Schedule</strong>
                  <span className="text-[10px] text-slate-500">Plant Dispatch</span>
                </button>
              </div>
            </div>

            {/* Date & Recipient Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Recipient Email</label>
                  <input
                    type="text"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Designation / Title</label>
                  <input
                    type="text"
                    value={recipientTitle}
                    onChange={(e) => setRecipientTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Organization / Client</label>
                  <input
                    type="text"
                    value={recipientOrg}
                    onChange={(e) => setRecipientOrg(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Postal Address</label>
                <textarea
                  rows={2}
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl"
                />
              </div>
            </div>

            {/* Subject & Salutation */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Letter Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-amber-300 p-2 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Salutation</label>
                <input
                  type="text"
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Letter Content (Paragraphs separated by double line break)</label>
                <textarea
                  rows={6}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 p-3 rounded-xl font-sans text-xs leading-relaxed"
                />
              </div>
            </div>

            {/* Signatory & Authorization Stamps */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <span className="text-cyan-400 font-bold block">Signatory & Authorization</span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Signatory Name</label>
                  <input
                    type="text"
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Signatory Designation</label>
                  <input
                    type="text"
                    value={signatoryTitle}
                    onChange={(e) => setSignatoryTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeDigitalStamp}
                    onChange={(e) => setIncludeDigitalStamp(e.target.checked)}
                    className="accent-cyan-500 rounded"
                  />
                  <span>Digital Seal Stamp</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeQRVerification}
                    onChange={(e) => setIncludeQRVerification(e.target.checked)}
                    className="accent-cyan-500 rounded"
                  />
                  <span>Anti-Forgery QR Code</span>
                </label>
              </div>
            </div>

            {/* Save & Dispatch Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleSaveToHistory}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4" /> Save Letter & Record Dispatch
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: ELEGANT LIVE A4 LETTERHEAD PREVIEW */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Export Toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-slate-200">Official Letterhead A4 Live Preview</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
                  title="Print A4 Letter"
                >
                  <Printer className="w-4 h-4 text-cyan-300" /> Print
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-3.5 py-2 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  title="Save as PDF File"
                >
                  <Download className="w-4 h-4 text-rose-400" /> Export PDF
                </button>
                <button
                  onClick={handleExportWord}
                  className="px-3.5 py-2 bg-blue-950 hover:bg-blue-900 text-blue-200 border border-blue-700 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  title="Save as Word (.docx) File"
                >
                  <FileText className="w-4 h-4 text-blue-400" /> Save Word (.docx)
                </button>
              </div>
            </div>

            {/* A4 CANVAS PRINT CONTAINER */}
            <div className="overflow-x-auto pb-4">
              <div
                ref={printRef}
                className="print:p-0 print:m-0 print:bg-white print:text-black print:shadow-none bg-white text-slate-900 rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-[800px] min-h-[1050px] mx-auto relative flex flex-col justify-between font-sans border border-slate-200"
                style={{ aspectRatio: "1 / 1.414" }}
              >
                {/* Watermark Background Logo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                  <CompanyLogo variant="full" size="lg" lightBackground={true} />
                </div>

                {/* LETTERHEAD HEADER - CENTRALLY ALIGNED */}
                <div>
                  <div className="border-b-2 border-[#003366] pb-4 mb-6 text-center">
                    {/* Centered Image with Logo & Name */}
                    <div className="flex justify-center mb-2">
                      <img
                        src={logoImg}
                        alt="Northern HeatEx Corporation Logo & Name"
                        className="max-h-28 sm:max-h-36 object-contain select-none pointer-events-none"
                      />
                    </div>

                    {/* Centered Subtitle Details */}
                    <div className="space-y-1 font-mono text-center">
                      <p className="text-[11px] text-slate-600 tracking-tight font-medium">
                        Carry Legacy: <strong className="text-slate-800">Noor Engineering Works (Est. 1983)</strong> • Heavy Industrial Equipment Plant
                      </p>
                      <p className="text-[10px] text-amber-800 font-bold tracking-wide">
                        ISO 9001:2015 Certified Plant
                      </p>
                    </div>

                    {/* Double Accent Gold Stripe */}
                    <div className="h-1 bg-gradient-to-r from-[#003366] via-amber-500 to-[#003366] mt-3 rounded-full" />
                  </div>

                  {/* METADATA BLOCK: REF & DATE */}
                  <div className="flex justify-between items-center text-xs font-mono mb-6 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 font-normal">REF NO: </span>
                      <strong className="text-[#003366] font-bold text-sm tracking-wider">{refNo}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-normal">DATE: </span>
                      <strong className="text-slate-900 font-bold">{date}</strong>
                    </div>
                  </div>

                  {/* RECIPIENT BLOCK */}
                  <div className="text-xs space-y-1 mb-6 text-slate-800">
                    <p className="font-bold text-slate-900">To,</p>
                    <p className="font-extrabold text-sm text-[#003366]">{recipientName}</p>
                    {recipientTitle && <p className="font-medium text-slate-700">{recipientTitle}</p>}
                    {recipientOrg && <p className="font-bold text-slate-900">{recipientOrg}</p>}
                    {recipientAddress && <p className="whitespace-pre-line text-slate-600 leading-relaxed max-w-lg">{recipientAddress}</p>}
                    {recipientEmail && <p className="text-[11px] font-mono text-cyan-700">Email: {recipientEmail}</p>}
                  </div>

                  {/* SUBJECT BLOCK */}
                  <div className="mb-6 bg-slate-100/80 border-l-4 border-[#003366] p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-[#003366] uppercase tracking-wide">
                      <span className="underline font-extrabold">SUBJECT:</span> {subject}
                    </p>
                  </div>

                  {/* SALUTATION & BODY PARAGRAPHS */}
                  <div className="space-y-4 text-xs leading-relaxed text-slate-800">
                    <p className="font-bold text-slate-900">{salutation}</p>

                    {bodyText.split("\n\n").map((para, idx) => (
                      <p key={idx} className="text-justify leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* SPECIFICATION TABLE */}
                  {specTable && specTable.length > 0 && (
                    <div className="my-6">
                      <table className="w-full text-xs border-collapse border border-slate-300">
                        <thead>
                          <tr className="bg-[#003366] text-white font-mono">
                            <th className="border border-slate-300 p-2 text-left w-1/3 font-bold">Parameter / Requirement</th>
                            <th className="border border-slate-300 p-2 text-left font-bold">Compliance Specification</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specTable.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                              <td className="border border-slate-300 p-2 font-bold text-slate-900">{row.label}</td>
                              <td className="border border-slate-300 p-2 text-slate-800">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* CLOSING & SIGNATURE */}
                  <div className="mt-8 space-y-4 text-xs">
                    <p className="font-medium text-slate-800">{closingText}</p>
                    <div>
                      <p className="font-bold text-[#003366] text-xs">For NORTHERN HEATEX CORPORATION</p>
                      <p className="text-[10px] text-slate-500 font-mono">(Formerly Noor Engineering Works, Est. 1983)</p>
                    </div>

                    <div className="pt-6 flex items-end justify-between">
                      {/* Signature Lines */}
                      <div className="space-y-1">
                        {includeDigitalStamp && (
                          <div className="mb-2 p-2 inline-block border-2 border-[#003366] rounded-lg text-center bg-blue-50/50">
                            <span className="text-[9px] font-mono font-bold text-[#003366] block uppercase">
                              ✓ DIGITALLY SEALED & VERIFIED
                            </span>
                            <span className="text-[8px] text-slate-500 block">NORTHERN HEATEX HARIDWAR WORKS</span>
                          </div>
                        )}
                        <p className="font-extrabold text-sm text-slate-900">{signatoryName}</p>
                        <p className="text-slate-700 font-medium">{signatoryTitle}</p>
                        <p className="text-slate-500 text-[11px] font-mono">{signatoryDept}</p>
                      </div>

                      {/* Anti-Forgery QR Code Seal */}
                      {includeQRVerification && (
                        <div className="text-center font-mono space-y-1 border border-slate-200 p-2 rounded-lg bg-slate-50">
                          <div className="w-14 h-14 bg-slate-900 text-white mx-auto flex items-center justify-center rounded">
                            <QrCode className="w-10 h-10 text-cyan-400" />
                          </div>
                          <span className="text-[8px] text-slate-500 block uppercase">Verify Authenticity</span>
                          <span className="text-[8px] font-bold text-[#003366] block">{refNo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="pt-6 border-t border-slate-300 text-[9px] font-mono text-slate-600 space-y-1 text-center mt-12">
                  <div className="flex justify-between items-center text-slate-800 font-bold border-b border-slate-200 pb-1 mb-1">
                    <span>REGD WORKS: B-42/43 HEAVY INDUSTRIAL AREA, PHASE II, HARIDWAR, UTTARAKHAND - 249403, INDIA</span>
                    <span>PAGE 1 OF 1</span>
                  </div>
                  <p>
                    TEL: +91 1334 234567 • EMAIL: info@northernheatex.com • WEB: www.northernheatex.com • GSTIN: 05AAACN1996E1Z2
                  </p>
                  <p className="text-[8px] text-slate-500 italic">
                    This document is issued on official Northern HeatEx Corporation letterhead and is binding for engineering correspondence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: DISPATCH HISTORY & RETRIEVAL */}
      {activeSubTab === "history" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 font-mono text-xs text-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" /> Official Letter Dispatch Archive
              </h3>
              <p className="text-xs text-slate-400">
                Retrieve, view, edit, duplicate, or re-print past official company letters.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Ref No, Subject, Client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white w-64"
                />
              </div>

              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-bold"
              >
                <option value="All">All Departments</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.code} - {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Letter Records List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="p-12 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800">
                <FileText className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p>No dispatch letter records match your search filter.</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-cyan-950 text-cyan-400 border border-cyan-500/40 rounded-lg font-bold text-sm">
                        {item.refNo}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] uppercase">
                        Dept: {item.deptCode}
                      </span>
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" /> {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRetrieveLetter(item)}
                        className="px-3 py-1.5 bg-[#0056A6] hover:bg-blue-600 text-white rounded-lg flex items-center gap-1 transition cursor-pointer font-bold text-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Retrieve & Edit
                      </button>

                      <button
                        onClick={() => {
                          handleRetrieveLetter(item);
                          setSeqNo((prev) => prev + 1);
                          showToast("Letter duplicated as new draft with updated Ref No!");
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1 transition cursor-pointer text-xs"
                      >
                        <Copy className="w-3.5 h-3.5" /> Duplicate
                      </button>

                      <button
                        onClick={() => handleDeleteRecord(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    <div className="md:col-span-8 space-y-1">
                      <h4 className="font-bold text-amber-300 text-sm">{item.subject}</h4>
                      <p className="text-slate-400 line-clamp-2 text-[11px] leading-relaxed">
                        {item.bodyParagraphs[0]}
                      </p>
                    </div>

                    <div className="md:col-span-4 bg-slate-900 p-3 rounded-xl border border-slate-800/80 space-y-1 text-[11px]">
                      <div className="text-slate-400">Recipient:</div>
                      <div className="font-bold text-white">{item.recipientName}</div>
                      <div className="text-slate-300">{item.recipientOrg}</div>
                      <div className="text-cyan-400 text-[10px] truncate">{item.recipientEmail}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const LetterheadGenerator = OfficialLetterheadStudio;
export default OfficialLetterheadStudio;
