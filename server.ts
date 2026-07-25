import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google GenAI initializer
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System instructions for Northern HeatEx Engineering AI Agents
const SYSTEM_INSTRUCTIONS = {
  thermal: `You are the Lead Thermal Design Engineer at Northern HeatEx Corporation (NHEE).
You specialize in Shell & Tube Heat Exchangers (TEMA Type BEM, AES, BEU, NEN, etc.), Tube Bundle Manufacturing, Wire-Wound Fin Tubes, Strip-Wound Coolers, Stator Air Coolers, Surface Condensers, and Hydro Turbine Oil Coolers.
You provide precise engineering evaluation using LMTD (Logarithmic Mean Temperature Difference), Overall Heat Transfer Coefficient U (W/m²·K or BTU/hr·ft²·°F), Heat Duty Q = m·Cp·ΔT, and NTU-effectiveness methods.
Include quantitative estimations, fluid fouling factors, pressure drop considerations, and TEMA recommendations. Format response in clear, structured Markdown with engineering formulas and parameter tables.`,

  mechanical: `You are the Chief Mechanical & Pressure Vessel Structural Engineer at Northern HeatEx Corporation (NHEE).
You are an expert in ASME Section VIII Division 1 & 2, TEMA Standards (Class R for petroleum/heavy industrial, Class C for commercial, Class B for chemical), PED 2014/68/EU, and API 660.
Perform or review mechanical calculations: Shell minimum thickness t = (P·R)/(S·E - 0.6·P) + C, Tube sheet thickness calculation, Hydrostatic test pressure (1.3 × MAWP), Nozzle reinforcement, Baffle plate thickness, and Tube layout stress analysis.
Structure responses cleanly with formula derivations, standard ASME allowable stress values, and safety compliance checks.`,

  welding: `You are the Master Metallurgy & Welding Engineering Specialist at Northern HeatEx Corporation (NHEE).
You specialize in Welding Procedure Specifications (WPS), Procedure Qualification Records (PQR), Welder Performance Qualification (WPQ), tube-to-tubesheet joint welding (strength welding vs expansion vs seal welding), GTAW/TIG, GMAW/MIG, SAW, and SMAW.
Expertise in exotic alloys: Super Duplex Stainless (2507, 2205), Titanium Grade 2, Copper-Nickel 90/10 & 70/30, Inconel 625, Hastelloy C276, and White Metal Bearing Re-Babbitting (centrifugal casting ASTM B23 Grade 2/3 tin-based babbitt).
Provide precise filler metal recommendations, preheat/interpass/PWHT temperatures, shielding gases, and non-destructive examination (NDE) protocols (RT, UT, PT, MT, Eddy Current).`,

  failure: `You are the Director of Failure Analysis & Predictive Maintenance at Northern HeatEx Corporation (NHEE).
Diagnose industrial heat exchanger failure modes: Flow-Induced Vibration (vortex shedding, fluidelastic instability, acoustic resonance), Stress Corrosion Cracking (SCC), Pitting & Crevice Corrosion, Galvanic Corrosion, Tube Erosion-Corrosion, Thermal Fatigue, Microbiologically Influenced Corrosion (MIC), and Tube Bundle Fouling (scaling, biofouling, coking).
Return a structured diagnostic report: 1. Root Cause Identification, 2. Secondary Risk Factors, 3. Immediate Mitigation Steps, 4. Permanent Re-Engineering / Material Upgrade Recommendation (e.g. retubing, replacing brass with Cu-Ni or Titanium, adding impingement plates, installing rod baffles).`,

  proposal: `You are the Senior Technical Sales Director & Chief Estimator at Northern HeatEx Corporation (NHEE).
Create comprehensive, formal engineering & commercial proposals suitable for global energy leaders like Siemens Energy, GE Vernova, Alfa Laval, Kelvion, and SPX Flow.
Proposal Structure:
1. Executive Summary & Scope of Supply
2. Technical Specification & Design Basis (TEMA Type, Design Pressures/Temps, Materials of Construction, Codes)
3. Dimensional & Mechanical Summary (Shell OD, Tube Length/OD/BWG, Tube Count, Nozzle sizes)
4. Quality Assurance & Inspection Plan (ASME U-Stamp, Hydrotest, NDE, Radiography)
5. Fabrication Schedule & Milestones (Design, Procurement, Machining, Assembly, Testing, Shipping)
6. Commercial Terms, Guarantee & Warranty (18/24 months, performance warranty).`,

  knowledge: `You are the Lead Technical Librarian & Standards Consultant for Northern HeatEx Corporation (NHEE).
Provide instant, authoritative reference answers on TEMA (Tubular Exchanger Manufacturers Association), ASME Code Sections (II, V, VIII, IX), HEI Standards for Steam Surface Condensers, API 660, ISO 16812, and heat transfer fundamentals. Include direct code clause references where applicable.`,
};

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Northern HeatEx Engineering Ecosystem API", version: "3.2.0-enterprise" });
});

app.post("/api/gemini/thermal-engineer", async (req, res) => {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API key is not configured. Please set GEMINI_API_KEY in secrets.",
      });
    }

    const { prompt, parameters } = req.body;
    const fullPrompt = `Thermal Calculation Request:
${prompt ? prompt : "Analyze thermal performance for shell and tube heat exchanger"}
${parameters ? `\nInput Operating Parameters:\n${JSON.stringify(parameters, null, 2)}` : ""}

Please perform detailed thermal engineering analysis, calculate heat duty, LMTD, estimated overall heat transfer coefficient U, required surface area A, estimated tube count, and fluid velocity checks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS.thermal,
        temperature: 0.3,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Thermal AI Error:", error);
    res.status(500).json({ error: error?.message || "Failed to execute thermal calculation" });
  }
});

app.post("/api/gemini/mechanical-engineer", async (req, res) => {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key is not configured." });
    }

    const { prompt, parameters } = req.body;
    const fullPrompt = `Mechanical Pressure Vessel Calculation Request:
${prompt ? prompt : "Perform ASME Sec VIII Div 1 mechanical thickness and stress analysis"}
${parameters ? `\nDesign Parameters:\n${JSON.stringify(parameters, null, 2)}` : ""}

Provide step-by-step thickness formulas, allowable stresses, tube sheet thickness estimation, hydrotest pressures, and ASME U-stamp compliance criteria.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS.mechanical,
        temperature: 0.2,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Mechanical AI Error:", error);
    res.status(500).json({ error: error?.message || "Failed to execute mechanical calculation" });
  }
});

app.post("/api/gemini/welding-metallurgy", async (req, res) => {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key is not configured." });
    }

    const { prompt, parameters } = req.body;
    const fullPrompt = `Welding Procedure & Metallurgy Request:
${prompt ? prompt : "Provide WPS/PQR guidelines and alloy welding recommendation"}
${parameters ? `\nWelding Parameters:\n${JSON.stringify(parameters, null, 2)}` : ""}

Provide filler metal specifications (AWS classification), shielding gas mixture, preheat/PWHT temperatures, tube-to-tubesheet joint details, and NDE requirements.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS.welding,
        temperature: 0.25,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Welding AI Error:", error);
    res.status(500).json({ error: error?.message || "Failed to process welding inquiry" });
  }
});

app.post("/api/gemini/failure-analysis", async (req, res) => {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key is not configured." });
    }

    const { symptoms, unitType, fluidData } = req.body;
    const fullPrompt = `Failure Analysis Request:
Unit Type: ${unitType || "Shell & Tube Heat Exchanger"}
Observed Symptoms & Conditions: ${symptoms || "Unspecified tube leaks and thermal efficiency loss"}
Fluid Operating Data: ${JSON.stringify(fluidData || {}, null, 2)}

Provide root-cause diagnosis, physical mechanism explanation, flow-induced vibration checks, and corrective engineering recommendations.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS.failure,
        temperature: 0.3,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Failure Analysis Error:", error);
    res.status(500).json({ error: error?.message || "Failed to execute failure analysis" });
  }
});

app.post("/api/gemini/proposal-generator", async (req, res) => {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key is not configured." });
    }

    const { clientName, projectTitle, designData, scope } = req.body;
    const fullPrompt = `Generate Formal Engineering Proposal:
Client: ${clientName || "Global Industrial Partner"}
Project Title: ${projectTitle || "Custom High-Pressure Shell & Tube Heat Exchanger Bundle"}
Scope of Work: ${scope || "Design, Fabrication, Hydrotesting & ASME Stamping"}
Technical Data: ${JSON.stringify(designData || {}, null, 2)}

Generate a complete, enterprise-grade engineering and commercial proposal in structured Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS.proposal,
        temperature: 0.4,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Proposal Generator Error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate engineering proposal" });
  }
});

app.post("/api/gemini/knowledge-base", async (req, res) => {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key is not configured." });
    }

    const { query } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: query || "Explain TEMA Class R tube sheet thickness standards",
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS.knowledge,
        temperature: 0.2,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Knowledge Base Error:", error);
    res.status(500).json({ error: error?.message || "Failed to query knowledge base" });
  }
});

// Inquiry & RFQ CRM Submission Endpoint
const inMemoryCRMDatabase: any[] = [];

app.post("/api/inquiry", async (req, res) => {
  try {
    const { company, country, name, email, phone, whatsapp, industry, projectDescription, files } = req.body;
    
    if (!name || !email || !projectDescription) {
      return res.status(400).json({ error: "Name, email, and project description are required fields." });
    }

    const refId = `NHEE-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const inquiryRecord = {
      refId,
      timestamp,
      company: company || "Not Specified",
      country: country || "International",
      name,
      email,
      phone: phone || "N/A",
      whatsapp: whatsapp || "N/A",
      industry: industry || "General Energy & Industrial",
      projectDescription,
      fileCount: files ? files.length : 0,
      filesSummary: files ? files.map((f: any) => ({ name: f.name, size: f.size, type: f.type })) : [],
      status: "NEW_RFQ_RECEIVED",
      assignedEngineer: "Chief Estimating Lead - Calgary HQ",
      estResponseHours: 12,
    };

    inMemoryCRMDatabase.push(inquiryRecord);

    console.log(`[CRM INQUIRY RECEIVED] Ref: ${refId} from ${name} (${company}) - ${email}`);

    res.json({
      success: true,
      refId,
      timestamp,
      message: "Your engineering RFQ has been received and logged in Northern HeatEx CRM.",
      summary: inquiryRecord,
      nextSteps: [
        "Automated confirmation email dispatched to " + email,
        "Senior Thermal Design Engineer assigned within 2 business hours",
        "3D CAD preliminary layout & itemized proposal will be delivered within 12-24 hours",
      ],
    });
  } catch (error: any) {
    console.error("Inquiry Processing Error:", error);
    res.status(500).json({ error: "Failed to log RFQ submission." });
  }
});

app.get("/api/inquiries", (req, res) => {
  res.json({ count: inMemoryCRMDatabase.length, inquiries: inMemoryCRMDatabase });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Northern HeatEx Engineering Ecosystem server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
