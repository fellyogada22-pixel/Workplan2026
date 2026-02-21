import { useState, useEffect, useCallback } from "react";

/* ─── DESIGN TOKENS ─── */
const T = {
  bg: "#F9F8F5",
  surface: "#FFFFFF",
  ink: "#161616",
  muted: "#888888",
  dim: "#EBEBEB",
  border: "#E8E8E8",
  tax:  { c: "#C47B00", lt: "#FEF6E4", md: "#FDDFA0", dark: "#8A5500" },
  hr:   { c: "#0B7A4B", lt: "#E6F6EE", md: "#88D4AA", dark: "#095433" },
  fin:  { c: "#1A55CC", lt: "#E8EFFE", md: "#96B3F5", dark: "#103A8E" },
  mgmt: { c: "#6B28CC", lt: "#F0E9FD", md: "#C0A0F0", dark: "#4A1A8E" },
};

/* ─── DATA ─── */
const PILLARS = {
  tax:  { label: "Tax Advisory",     letter: "A", icon: "◆", ...T.tax  },
  hr:   { label: "HR Consultancy",   letter: "B", icon: "◆", ...T.hr   },
  fin:  { label: "Finance Advisory", letter: "C", icon: "◆", ...T.fin  },
  mgmt: { label: "Management",       letter: "D", icon: "◆", ...T.mgmt },
};

const TAGS = {
  diag:    { label: "Diagnostic", bg: "#FEF3C7", color: "#92400E" },
  month:   { label: "Monthly",    bg: "#DBEAFE", color: "#1E40AF" },
  qtr:     { label: "Quarterly",  bg: "#D1FAE5", color: "#065F46" },
  annual:  { label: "Annual",     bg: "#EDE9FE", color: "#5B21B6" },
  ongoing: { label: "Ongoing",    bg: "#F3F4F6", color: "#6B7280" },
};

const DATA = [
  /* TAX */
  { id:"t1", pillar:"tax", icon:"🔬", name:"Initial Tax Diagnostic Review",
    meta:"Fixed · KSh 40,000 · Month 1", output:"Tax Health Check Report",
    metrics:[{v:"3",l:"Years of KRA records reviewed"},{v:"1",l:"Tax Health Check Report delivered"},{v:"1",l:"Risk Register with ratings produced"},{v:"100%",l:"Tax heads covered (PAYE, VAT, WHT, CT)"}],
    tasks:[
      {id:"t1_1",txt:"Collect all statutory filing records from client (PAYE, VAT, WHT, CT)",tag:"diag"},
      {id:"t1_2",txt:"Review 3 years of KRA correspondence, assessments & objections",tag:"diag"},
      {id:"t1_3",txt:"Conduct tax health check across all tax heads; identify compliance gaps",tag:"diag"},
      {id:"t1_4",txt:"Prepare Tax Risk Register with risk ratings and remediation priorities",tag:"diag"},
      {id:"t1_5",txt:"Present findings and deliver Tax Health Check Report to client",tag:"diag"},
    ]},
  { id:"t2", pillar:"tax", icon:"🏗️", name:"Tax-Efficient Benefits Structuring",
    meta:"Retainer · Months 1–2", output:"Benefits Structuring Memo",
    metrics:[{v:"1",l:"Benefits Structuring Memo delivered"},{v:"3+",l:"Benefits categories reviewed (wellness, medical, pension)"},{v:"1",l:"Retirement benefits RBA compliance review"}],
    tasks:[
      {id:"t2_1",txt:"Map current employee benefits package (medical, wellness, pension, allowances)",tag:"diag"},
      {id:"t2_2",txt:"Analyse tax treatment of all benefits under Income Tax Act Cap 470",tag:"diag"},
      {id:"t2_3",txt:"Model tax-efficient structuring scenarios for benefits package",tag:"diag"},
      {id:"t2_4",txt:"Draft Benefits Structuring Memo with implementation recommendations",tag:"diag"},
      {id:"t2_5",txt:"Review retirement benefits compliance against RBA Guidelines",tag:"diag"},
    ]},
  { id:"t3", pillar:"tax", icon:"📅", name:"Statutory Filing & KRA Compliance",
    meta:"Retainer · Monthly cadence", output:"Filing Calendar + KRA/RBA Checklists",
    metrics:[{v:"12",l:"Monthly PAYE reviews per year"},{v:"4",l:"Quarterly KRA compliance checks"},{v:"1",l:"Annual filing calendar produced"},{v:"0",l:"Target KRA penalties or missed deadlines"}],
    tasks:[
      {id:"t3_1",txt:"Develop annual Filing Calendar covering all tax heads and deadlines",tag:"diag"},
      {id:"t3_2",txt:"Review and approve monthly PAYE returns before submission",tag:"month"},
      {id:"t3_3",txt:"Review Withholding Tax obligations on consultants and service providers",tag:"month"},
      {id:"t3_4",txt:"Review VAT returns and advise on input/output positions",tag:"month"},
      {id:"t3_5",txt:"Conduct quarterly KRA compliance check and update risk register",tag:"qtr"},
      {id:"t3_6",txt:"Advise on any KRA audits, objections or appeals as they arise",tag:"ongoing"},
      {id:"t3_7",txt:"Submit annual Corporation Tax return review",tag:"annual"},
    ]},
  /* HR */
  { id:"h1", pillar:"hr", icon:"📚", name:"HR Policy Manual & Employee Handbook",
    meta:"Retainer · Months 1–3", output:"HR Policy Manual & Employee Handbook",
    metrics:[{v:"8+",l:"Policies drafted or modernised"},{v:"1",l:"Complete Employee Handbook delivered"},{v:"100%",l:"Staff acknowledgement of new policies"},{v:"1",l:"Employment Act 2007 compliance audit"}],
    tasks:[
      {id:"h1_1",txt:"Audit existing HR policies, procedures and employment contracts",tag:"diag"},
      {id:"h1_2",txt:"Draft/modernise Employee Handbook (Code of Conduct, Leave & Attendance)",tag:"diag"},
      {id:"h1_3",txt:"Develop Remote Work, Grievance & Disciplinary procedures",tag:"diag"},
      {id:"h1_4",txt:"Draft Whistle-blowing and Anti-Harassment & Safeguarding policies",tag:"diag"},
      {id:"h1_5",txt:"Ensure all policies comply with Employment Act 2007, WIBA & OSHA",tag:"diag"},
      {id:"h1_6",txt:"Facilitate management review and sign-off on HR Policy Manual",tag:"diag"},
      {id:"h1_7",txt:"Communicate new policies to all staff and document acknowledgement",tag:"diag"},
    ]},
  { id:"h2", pillar:"hr", icon:"💰", name:"Payroll Governance & Compliance",
    meta:"Retainer · Monthly", output:"Payroll Compliance Reports",
    metrics:[{v:"12",l:"Monthly payroll compliance checks per year"},{v:"1",l:"Payroll process map with segregation of duties"},{v:"4",l:"Quarterly payroll audit reports"},{v:"0",l:"Target payroll errors or statutory shortfalls"}],
    tasks:[
      {id:"h2_1",txt:"Map existing payroll process and document segregation of duties",tag:"diag"},
      {id:"h2_2",txt:"Validate PAYE, NSSF, SHA deductions and employer contributions monthly",tag:"month"},
      {id:"h2_3",txt:"Review all benefits, allowances and non-cash benefit calculations",tag:"month"},
      {id:"h2_4",txt:"Identify and remediate payroll control weaknesses",tag:"diag"},
      {id:"h2_5",txt:"Conduct quarterly payroll compliance audit and submit report",tag:"qtr"},
    ]},
  { id:"h3", pillar:"hr", icon:"🏛️", name:"Organisation Design & Job Evaluation",
    meta:"Retainer · Months 2–4", output:"JD Library, Grading Matrix & Salary Banding Report",
    metrics:[{v:"1",l:"Grading & banding framework delivered"},{v:"1",l:"Salary Banding Report with market benchmarks"},{v:"1",l:"Equal-pay review completed"},{v:"100%",l:"Roles with updated JDs and grade"}],
    tasks:[
      {id:"h3_1",txt:"Review current organisational structure and reporting lines",tag:"diag"},
      {id:"h3_2",txt:"Draft updated role profiles and job descriptions for all positions",tag:"diag"},
      {id:"h3_3",txt:"Conduct job evaluation and design grading/banding framework",tag:"diag"},
      {id:"h3_4",txt:"Benchmark salary bands against Kenyan market data",tag:"diag"},
      {id:"h3_5",txt:"Conduct equal-pay review and identify any pay equity gaps",tag:"diag"},
      {id:"h3_6",txt:"Rationalise allowances structure aligned to tax-efficient approach",tag:"diag"},
      {id:"h3_7",txt:"Present Salary Banding Report and recommendations to leadership",tag:"diag"},
    ]},
  { id:"h4", pillar:"hr", icon:"🔍", name:"Recruitment & Onboarding Support",
    meta:"Retainer · As needed", output:"Recruitment & Onboarding Toolkit",
    metrics:[{v:"1",l:"Standardised JD template library created"},{v:"1",l:"Interview guide & shortlist matrix toolkit"},{v:"1",l:"Onboarding checklist with 30/60/90-day plan"},{v:"<14d",l:"Target time-to-offer from shortlist"}],
    tasks:[
      {id:"h4_1",txt:"Develop standardised JD drafting templates for all role levels",tag:"diag"},
      {id:"h4_2",txt:"Build shortlist matrices and competency-based interview guides",tag:"diag"},
      {id:"h4_3",txt:"Design reference check templates and background verification process",tag:"diag"},
      {id:"h4_4",txt:"Create comprehensive onboarding checklist and 30/60/90-day plan",tag:"diag"},
      {id:"h4_5",txt:"Support active recruitment processes as required by client",tag:"ongoing"},
    ]},
  { id:"h5", pillar:"hr", icon:"🎯", name:"Performance Management System",
    meta:"Retainer · Months 3–5 + Annual", output:"Performance Management Toolkit",
    metrics:[{v:"1",l:"KPI framework aligned to org strategy"},{v:"2",l:"Annual performance review cycles facilitated"},{v:"100%",l:"Managers trained on appraisal process"},{v:"1",l:"Reward & recognition framework delivered"}],
    tasks:[
      {id:"h5_1",txt:"Design KPI framework aligned to organisational and donor goals",tag:"diag"},
      {id:"h5_2",txt:"Develop appraisal templates (annual and probation reviews)",tag:"diag"},
      {id:"h5_3",txt:"Create Performance Improvement Plan (PIP) process and templates",tag:"diag"},
      {id:"h5_4",txt:"Train managers on conducting performance reviews effectively",tag:"diag"},
      {id:"h5_5",txt:"Design reward and recognition framework linked to performance",tag:"diag"},
      {id:"h5_6",txt:"Facilitate mid-year and annual performance review cycles",tag:"annual"},
    ]},
  { id:"h6", pillar:"hr", icon:"📋", name:"HR Compliance Audit",
    meta:"Retainer · Bi-annual", output:"HR Compliance Audit Report",
    metrics:[{v:"2",l:"Compliance audit reports per year"},{v:"4",l:"Laws audited (Employment Act, WIBA, OSHA, LRA)"},{v:"100%",l:"Target closure rate of audit findings"}],
    tasks:[
      {id:"h6_1",txt:"Audit compliance with Employment Act 2007 (contracts, leave, termination)",tag:"diag"},
      {id:"h6_2",txt:"Review WIBA and OSHA compliance, statutory registers and notices",tag:"diag"},
      {id:"h6_3",txt:"Audit Labour Relations Act requirements and union/CBA obligations",tag:"diag"},
      {id:"h6_4",txt:"Compile Compliance Audit Report with risk ratings and remediation plan",tag:"diag"},
      {id:"h6_5",txt:"Track remediation progress and confirm closure of all findings",tag:"ongoing"},
    ]},
  { id:"h7", pillar:"hr", icon:"📖", name:"Learning & Development Plan",
    meta:"Retainer · Annual", output:"Annual Training Plan",
    metrics:[{v:"1",l:"Annual Training Plan produced each year"},{v:"3+",l:"Mandatory compliance trainings scheduled"},{v:"100%",l:"Staff completion rate for mandatory trainings"}],
    tasks:[
      {id:"h7_1",txt:"Conduct training needs assessment across all staff levels",tag:"annual"},
      {id:"h7_2",txt:"Develop Annual Training Plan aligned to project and org needs",tag:"annual"},
      {id:"h7_3",txt:"Schedule mandatory trainings: safeguarding, data protection, anti-corruption",tag:"annual"},
      {id:"h7_4",txt:"Source and vet training vendors/facilitators as needed",tag:"ongoing"},
      {id:"h7_5",txt:"Evaluate training effectiveness and update plan based on outcomes",tag:"annual"},
    ]},
  /* FINANCE */
  { id:"f1", pillar:"fin", icon:"🔬", name:"Finance Diagnostic Review",
    meta:"Fixed · KSh 40,000 · Month 1", output:"Finance Systems & Controls Assessment",
    metrics:[{v:"1",l:"Finance diagnostic report delivered"},{v:"1",l:"Controls gap assessment (AP/AR/GL/cash/assets)"},{v:"1",l:"Prioritised remediation roadmap produced"}],
    tasks:[
      {id:"f1_1",txt:"Collect trial balance, management accounts, budgets and prior audit reports",tag:"diag"},
      {id:"f1_2",txt:"Review finance policies, SOPs and delegation of authority matrix",tag:"diag"},
      {id:"f1_3",txt:"Assess existing chart-of-accounts structure and reporting setup",tag:"diag"},
      {id:"f1_4",txt:"Identify internal control weaknesses (AP/AR/GL, cash, assets, payroll)",tag:"diag"},
      {id:"f1_5",txt:"Present Finance Diagnostic Report with prioritised remediation roadmap",tag:"diag"},
    ]},
  { id:"f2", pillar:"fin", icon:"📊", name:"Budgeting, Forecasting & Scenario Planning",
    meta:"Retainer · Quarterly rolling", output:"Annual Budget & Forecast Pack",
    metrics:[{v:"1",l:"Annual budget pack produced per year"},{v:"13-wk",l:"Rolling cash flow model built"},{v:"4",l:"Quarterly rolling forecast updates"},{v:"3+",l:"Scenarios in sensitivity analysis"}],
    tasks:[
      {id:"f2_1",txt:"Facilitate annual budget development process with programme and ops teams",tag:"annual"},
      {id:"f2_2",txt:"Build 13-week rolling cash flow model and train finance focal person",tag:"diag"},
      {id:"f2_3",txt:"Develop quarterly rolling forecast with variance vs budget analysis",tag:"qtr"},
      {id:"f2_4",txt:"Build scenario planning and sensitivity analysis models for board review",tag:"qtr"},
      {id:"f2_5",txt:"Advise on treasury controls, banking relationships and liquidity management",tag:"qtr"},
    ]},
  { id:"f3", pillar:"fin", icon:"📈", name:"Monthly Management Accounts & Board Packs",
    meta:"Retainer · Monthly", output:"Monthly Management Accounts & Board Pack",
    metrics:[{v:"12",l:"Monthly management accounts reviewed per year"},{v:"4",l:"Quarterly board/finance committee packs"},{v:"1",l:"KPI dashboard template built"},{v:"<5d",l:"Target delivery after month-end"}],
    tasks:[
      {id:"f3_1",txt:"Design management accounts template (P&L, balance sheet, cash flow)",tag:"diag"},
      {id:"f3_2",txt:"Design Board Pack template with KPI dashboard and narrative commentary",tag:"diag"},
      {id:"f3_3",txt:"Review and quality-check monthly management accounts before submission",tag:"month"},
      {id:"f3_4",txt:"Prepare monthly variance analysis and burn-rate tracking commentary",tag:"month"},
      {id:"f3_5",txt:"Attend or support quarterly board/finance committee meetings",tag:"qtr"},
    ]},
  { id:"f4", pillar:"fin", icon:"🌍", name:"Donor & Grant Finance Management",
    meta:"Retainer · Per grant cycle", output:"Grant Reporting Templates & Compliance Pack",
    metrics:[{v:"100%",l:"Grant reports submitted on time vs deadlines"},{v:"1",l:"Cost allocation methodology established"},{v:"1",l:"Restricted funds tracking system set up"},{v:"0",l:"Target donor compliance findings at audit"}],
    tasks:[
      {id:"f4_1",txt:"Map all active donor grants and their specific financial compliance requirements",tag:"diag"},
      {id:"f4_2",txt:"Design grant budget templates, cost allocation methodology and restricted funds tracking",tag:"diag"},
      {id:"f4_3",txt:"Build grant financial report templates aligned to each donor format",tag:"diag"},
      {id:"f4_4",txt:"Review and quality-check grant financial reports before donor submission",tag:"ongoing"},
      {id:"f4_5",txt:"Advise on donor-specific compliance rules (USAID, FCDO, EU, UN, MCF, EF)",tag:"ongoing"},
      {id:"f4_6",txt:"Support donor financial audit and due diligence requests",tag:"ongoing"},
    ]},
  { id:"f5", pillar:"fin", icon:"🛡️", name:"Finance Policies, SOPs & Internal Controls",
    meta:"Retainer · Months 2–4", output:"Finance Policies & SOPs Manual",
    metrics:[{v:"1",l:"Finance Policy Manual covering all key processes"},{v:"5+",l:"SOPs written (AP, AR, GL, cash, assets)"},{v:"1",l:"Delegation of Authority matrix produced"},{v:"2",l:"Semi-annual controls reviews per year"}],
    tasks:[
      {id:"f5_1",txt:"Draft Finance Policy Manual covering AP, AR, GL, cash handling and assets",tag:"diag"},
      {id:"f5_2",txt:"Develop written SOPs for all key finance processes",tag:"diag"},
      {id:"f5_3",txt:"Design Delegation of Authority (DoA) matrix aligned to org structure",tag:"diag"},
      {id:"f5_4",txt:"Implement segregation of duties controls across finance and payroll",tag:"diag"},
      {id:"f5_5",txt:"Train finance and operations staff on all new policies and SOPs",tag:"diag"},
      {id:"f5_6",txt:"Conduct semi-annual controls effectiveness review and update SOPs",tag:"annual"},
    ]},
  { id:"f6", pillar:"fin", icon:"💻", name:"Finance Systems Enablement",
    meta:"Retainer · Months 2–5", output:"Chart-of-Accounts & Systems Blueprint",
    metrics:[{v:"1",l:"System selected (Xero/QuickBooks/Sage/ERP)"},{v:"1",l:"Chart-of-accounts fully configured"},{v:"100%",l:"Finance staff trained on system"},{v:"1",l:"Audit trail & approval workflows built"}],
    tasks:[
      {id:"f6_1",txt:"Document finance system requirements based on org complexity and donor needs",tag:"diag"},
      {id:"f6_2",txt:"Evaluate and recommend best-fit system (Xero, QuickBooks, Sage or ERP)",tag:"diag"},
      {id:"f6_3",txt:"Design chart-of-accounts aligned to reporting and grant requirements",tag:"diag"},
      {id:"f6_4",txt:"Support system implementation, data migration and configuration",tag:"diag"},
      {id:"f6_5",txt:"Train staff on system use, month-end close process and reporting",tag:"diag"},
      {id:"f6_6",txt:"Build system controls (approval workflows, access levels, audit trails)",tag:"diag"},
    ]},
  { id:"f7", pillar:"fin", icon:"🏗️", name:"Fixed Assets, Inventory & Procurement",
    meta:"Retainer · Quarterly", output:"Fixed Asset Register & Procurement Policy",
    metrics:[{v:"1",l:"Fixed Asset Register established/verified"},{v:"4",l:"Quarterly asset reconciliation checks"},{v:"1",l:"Procurement policy & bid matrix delivered"},{v:"1",l:"Vendor performance tracking system built"}],
    tasks:[
      {id:"f7_1",txt:"Establish or review Fixed Asset Register (FAR) and capitalisation policy",tag:"diag"},
      {id:"f7_2",txt:"Conduct initial asset verification and reconcile to accounting records",tag:"diag"},
      {id:"f7_3",txt:"Develop depreciation schedule and ensure accounting accuracy",tag:"diag"},
      {id:"f7_4",txt:"Design procurement policy templates, bid evaluation matrices and vendor onboarding",tag:"diag"},
      {id:"f7_5",txt:"Conduct quarterly inventory and asset reconciliation check",tag:"qtr"},
      {id:"f7_6",txt:"Build vendor performance tracking system",tag:"diag"},
    ]},
  { id:"f8", pillar:"fin", icon:"✅", name:"Audit Preparation & Compliance",
    meta:"Retainer · Annual", output:"Audit Lead Schedules + IPSAS/IFRS Guidance",
    metrics:[{v:"1",l:"Annual audit lead schedule pack prepared"},{v:"100%",l:"Prior audit findings remediated"},{v:"0",l:"Target repeat findings in external audit"}],
    tasks:[
      {id:"f8_1",txt:"Prepare comprehensive audit lead schedules (TB, AP/AR ageing, bank recs)",tag:"annual"},
      {id:"f8_2",txt:"Liaise with external and donor auditors on all information requests",tag:"annual"},
      {id:"f8_3",txt:"Review draft audit findings and support management response preparation",tag:"annual"},
      {id:"f8_4",txt:"Track and confirm remediation of all prior audit findings",tag:"ongoing"},
      {id:"f8_5",txt:"Provide IPSAS/IFRS application guidance on complex accounting issues",tag:"ongoing"},
    ]},
  /* MGMT */
  { id:"m1", pillar:"mgmt", icon:"🤝", name:"Engagement Setup & Kick-Off",
    meta:"Month 1 · One-time", output:"Signed Agreement, DPA & Engagement Charter",
    metrics:[{v:"1",l:"Consultancy Agreement signed"},{v:"1",l:"Data Processing Addendum executed"},{v:"3",l:"Focal persons assigned (Tax, HR, Finance)"},{v:"7d",l:"Client data submission deadline"}],
    tasks:[
      {id:"m1_1",txt:"Execute and countersign the Consultancy Agreement",tag:"diag"},
      {id:"m1_2",txt:"Execute Data Processing Addendum (Annex C) for personal data handling",tag:"diag"},
      {id:"m1_3",txt:"Client assigns Tax, HR and Finance focal persons",tag:"diag"},
      {id:"m1_4",txt:"Kick-off meeting: agree priorities, timelines and communication cadence",tag:"diag"},
      {id:"m1_5",txt:"Client provides all baseline data within 7 days of kick-off",tag:"diag"},
    ]},
  { id:"m2", pillar:"mgmt", icon:"🔄", name:"Ongoing Reporting & Review Cadence",
    meta:"Retainer · Bi-monthly & Quarterly", output:"Progress Reports & Review Minutes",
    metrics:[{v:"6",l:"Bi-monthly progress reports per year"},{v:"4",l:"Quarterly management review meetings"},{v:"14d",l:"Client invoice payment deadline"},{v:"1",l:"Mid-engagement review at Month 6"}],
    tasks:[
      {id:"m2_1",txt:"Submit bi-monthly progress report (status, risks, next steps)",tag:"month"},
      {id:"m2_2",txt:"Hold quarterly management review meeting with client leadership",tag:"qtr"},
      {id:"m2_3",txt:"Manage scope changes via written Change Order (Annex D)",tag:"ongoing"},
      {id:"m2_4",txt:"Submit monthly invoices; client settles within 14 days",tag:"month"},
      {id:"m2_5",txt:"Conduct 6-month mid-engagement review and adjust plan",tag:"diag"},
      {id:"m2_6",txt:"Complete 12-month wrap-up, final deliverables hand-over and renewal discussion",tag:"annual"},
    ]},
];

const STORAGE_KEY = "ssa_consult_shared_v1";
const PILLAR_ORDER = ["tax","hr","fin","mgmt"];

/* ─── HELPERS ─── */
const allTaskIds = DATA.flatMap(d => d.tasks.map(t => t.id));

function getStatus(item, checked) {
  const d = item.tasks.filter(t => checked[t.id]).length;
  if (!d) return "pending";
  if (d === item.tasks.length) return "complete";
  return "in-progress";
}

/* ─── CONFETTI ─── */
function spawnConfetti(e) {
  const colors = [T.tax.c, T.hr.c, T.fin.c, T.mgmt.c, "#FF6B6B", "#FFD93D"];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 6;
    el.style.cssText = `position:fixed;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random()>.5?"50%":"2px"};left:${e.clientX + (Math.random()-.5)*120}px;top:${e.clientY}px;pointer-events:none;z-index:9999;animation:cfDrop 1.1s ease-in forwards;animation-delay:${Math.random()*.25}s;transform:rotate(${Math.random()*360}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}
if (!document.getElementById("cf-style")) {
  const s = document.createElement("style");
  s.id = "cf-style";
  s.textContent = `@keyframes cfDrop{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(90px) rotate(450deg);opacity:0}}`;
  document.head.appendChild(s);
}

/* ─── COMPONENTS ─── */

function Tag({ tag }) {
  const t = TAGS[tag];
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3,
      background: t.bg, color: t.color, whiteSpace: "nowrap",
      fontFamily: "monospace", letterSpacing: ".3px", marginTop: 2, flexShrink: 0
    }}>{t.label}</span>
  );
}

function MetricCard({ v, l, color }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, padding: "10px 12px", border: `1px solid ${color}22`, flex: "1 1 130px", minWidth: 120 }}>
      <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: "monospace", lineHeight: 1, marginBottom: 4 }}>{v}</div>
      <div style={{ fontSize: 10, color: T.muted, lineHeight: 1.4 }}>{l}</div>
    </div>
  );
}

function WorkstreamCard({ item, checked, onToggle, pillar, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const P = PILLARS[pillar];
  const done = item.tasks.filter(t => checked[t.id]).length;
  const total = item.tasks.length;
  const pct = total ? Math.round(done / total * 100) : 0;
  const status = getStatus(item, checked);

  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 20px", cursor:"pointer",
          background: open ? "#FAFAFA" : "#fff", transition:"background .15s",
          userSelect:"none"
        }}
        onMouseEnter={e => e.currentTarget.style.background="#FAFAFA"}
        onMouseLeave={e => e.currentTarget.style.background= open?"#FAFAFA":"#fff"}
      >
        <div style={{ width:34, height:34, borderRadius:8, background:P.lt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>
          {item.icon}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.ink, lineHeight:1.3 }}>{item.name}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:3, flexWrap:"wrap" }}>
            <span style={{ fontSize:10, color:T.muted, fontFamily:"monospace" }}>{item.meta}</span>
            <span style={{ fontSize:10, fontWeight:600, color:P.c, background:P.lt, padding:"1px 6px", borderRadius:3 }}>↳ {item.output}</span>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          {status === "complete" ? (
            <span style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:4, background:P.lt, color:P.c }}>✓ Complete</span>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:64, height:3, background:T.dim, borderRadius:99, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${pct}%`, background:P.c, borderRadius:99, transition:"width .4s" }}/>
              </div>
              <span style={{ fontSize:11, fontFamily:"monospace", color:T.muted, minWidth:28, textAlign:"right" }}>{pct}%</span>
            </div>
          )}
          <span style={{ fontSize:12, color:T.dim, transition:"transform .22s", transform: open?"rotate(180deg)":"none", display:"block" }}>▾</span>
        </div>
      </div>

      {/* Body */}
      {open && (
        <div style={{ borderTop:`1px solid ${T.border}`, padding:"12px 20px 16px 66px" }}>
          {/* Metrics */}
          <div style={{ background:P.lt, border:`1px solid ${P.md}`, borderRadius:8, padding:"12px 14px", marginBottom:14 }}>
            <div style={{ fontSize:10, fontWeight:700, color:P.c, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>📐 Measurable Outputs</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {item.metrics.map((m,i) => <MetricCard key={i} v={m.v} l={m.l} color={P.c}/>)}
            </div>
          </div>
          {/* Tasks */}
          <div style={{ fontSize:9, fontWeight:700, color:T.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Tasks</div>
          {item.tasks.map(tk => {
            const done = !!checked[tk.id];
            return (
              <div key={tk.id}
                onClick={e => { onToggle(tk.id, e); }}
                style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"8px 10px", borderRadius:6,
                  cursor:"pointer", marginBottom:1, opacity: done?.4:1,
                  transition:"background .12s, opacity .2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background="#F5F5F5"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}
              >
                <div style={{ width:17, height:17, borderRadius:4, border:`1.5px solid ${done?P.c:T.dim}`,
                  background:done?P.c:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0, marginTop:1, transition:"all .15s"
                }}>
                  {done && <span style={{ fontSize:9, color:"#fff", fontWeight:800 }}>✓</span>}
                </div>
                <div style={{ flex:1, fontSize:12.5, color:T.ink, lineHeight:1.55, textDecoration:done?"line-through":"none", color:done?T.muted:T.ink }}>
                  {tk.txt}
                </div>
                <Tag tag={tk.tag}/>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PillarSection({ pid, checked, onToggle, filterStatus }) {
  const P = PILLARS[pid];
  const items = DATA.filter(d => {
    if (d.pillar !== pid) return false;
    if (filterStatus !== "all") {
      const st = getStatus(d, checked);
      if (st !== filterStatus) return false;
    }
    return true;
  });
  if (!items.length) return null;

  const pillarItems = DATA.filter(d => d.pillar === pid);
  const pillarDone  = pillarItems.reduce((a,d) => a + d.tasks.filter(t => checked[t.id]).length, 0);
  const pillarTotal = pillarItems.reduce((a,d) => a + d.tasks.length, 0);
  const pillarPct   = pillarTotal ? Math.round(pillarDone/pillarTotal*100) : 0;
  const delivDone   = pillarItems.filter(i => i.tasks.every(t => checked[t.id])).length;

  return (
    <div style={{ marginBottom:28 }}>
      {/* Pillar header */}
      <div style={{ display:"flex", alignItems:"stretch", background:"#fff", border:`1px solid ${T.border}`, borderRadius:"10px 10px 0 0", overflow:"hidden" }}>
        <div style={{ width:5, background:P.c, flexShrink:0 }}/>
        <div style={{ flex:1, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"2px 9px", borderRadius:99, background:P.lt, color:P.c, fontSize:10, fontWeight:700, letterSpacing:.5, marginBottom:6 }}>
              Pillar {P.letter} · {P.label}
            </div>
            <div style={{ fontSize:11, color:T.muted }}>
              <b style={{ color:T.ink }}>{delivDone}/{pillarItems.length}</b> deliverables · <b style={{ color:T.ink }}>{pillarDone}/{pillarTotal}</b> tasks · <b style={{ color:P.c }}>{pillarPct}%</b>
            </div>
          </div>
          {/* Deliverable chips */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {pillarItems.map(item => {
              const complete = item.tasks.every(t => checked[t.id]);
              return (
                <span key={item.id} style={{
                  fontSize:10, fontWeight:600, padding:"4px 9px", borderRadius:5, border:`1px solid ${complete?P.c:P.md}`,
                  background:complete?P.c:P.lt, color:complete?"#fff":T.ink, transition:"all .2s"
                }}>
                  {complete?"✓ ":""}{item.output}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/* Workstreams */}
      <div style={{ border:`1px solid ${T.border}`, borderTop:"none", borderRadius:"0 0 10px 10px", overflow:"hidden", background:"#fff" }}>
        {items.map((item, i) => (
          <WorkstreamCard key={item.id} item={item} checked={checked} onToggle={onToggle} pillar={pid} defaultOpen={i===0 && filterStatus==="all"}/>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [checked, setChecked] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [filterPillar, setFilterPillar] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [syncMsg, setSyncMsg] = useState("");

  /* ── Load shared state ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, true);
        if (!cancelled && res) {
          const data = JSON.parse(res.value);
          setChecked(data.checked || {});
          setLastUpdated(data.updatedAt || null);
        }
      } catch(e) { /* no existing data */ }
      if (!cancelled) setLoading(false);
    })();

    /* Poll for updates every 8s */
    const interval = setInterval(async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, true);
        if (res) {
          const data = JSON.parse(res.value);
          setChecked(prev => {
            const changed = JSON.stringify(prev) !== JSON.stringify(data.checked||{});
            if (changed) setSyncMsg("Updated by another user");
            return changed ? (data.checked || {}) : prev;
          });
          setLastUpdated(data.updatedAt || null);
        }
      } catch(e) {}
    }, 8000);

    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  useEffect(() => {
    if (syncMsg) { const t = setTimeout(() => setSyncMsg(""), 3000); return () => clearTimeout(t); }
  }, [syncMsg]);

  /* ── Save shared state ── */
  const saveState = useCallback(async (newChecked) => {
    setSaving(true);
    const now = new Date().toISOString();
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify({ checked: newChecked, updatedAt: now }), true);
      setLastUpdated(now);
    } catch(e) {}
    setSaving(false);
  }, []);

  const handleToggle = useCallback((tid, e) => {
    setChecked(prev => {
      const next = { ...prev, [tid]: !prev[tid] };
      saveState(next);
      if (next[tid]) spawnConfetti(e);
      return next;
    });
  }, [saveState]);

  /* ── Global counts ── */
  const total = allTaskIds.length;
  const done  = allTaskIds.filter(id => checked[id]).length;
  const pct   = total ? Math.round(done/total*100) : 0;

  const pillarsToShow = PILLAR_ORDER.filter(p => filterPillar === "all" || filterPillar === p);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:T.bg, fontFamily:"system-ui" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:28, marginBottom:12 }}>⏳</div>
        <div style={{ fontSize:14, color:T.muted }}>Loading shared work plan…</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background:T.ink, padding:"36px 48px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-100, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(26,85,204,0.18) 0%,transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-80, left:"20%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(196,123,0,0.13) 0%,transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:20, position:"relative" }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#6B9EF5", marginBottom:12 }}>
              🔗 Shared Work Plan · Soma Siri Africa × CPA Felix Ogada
            </div>
            <div style={{ fontSize:32, fontWeight:800, color:"#fff", lineHeight:1.15, marginBottom:8 }}>
              Tax, HR & Finance<br/>
              <span style={{ color:"#FBBF24" }}>Advisory Work Plan</span>
            </div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", maxWidth:460 }}>
              12-month integrated consultancy. <strong style={{ color:"rgba(255,255,255,.7)" }}>All team members</strong> can check off tasks — progress syncs automatically across everyone.
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { label:"Diagnostic Fee", val:"KSh 40,000" },
              { label:"Monthly Retainer", val:"KSh 65,000" },
              { label:"Term", val:"12 months · auto-renew" },
            ].map(c => (
              <div key={c.label} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"7px 14px" }}>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:1, textTransform:"uppercase" }}>{c.label}</div>
                <div style={{ fontSize:13, color:"#fff", fontWeight:600, fontFamily:"monospace" }}>{c.val}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Sync status bar */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:18, position:"relative" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background: saving?"#FBBF24":"#34D399", animation: saving?"none":"pulse 2s infinite" }}/>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)" }}>
            {saving ? "Saving…" : syncMsg ? syncMsg : lastUpdated ? `Last updated ${new Date(lastUpdated).toLocaleString()}` : "Shared & synced in real time"}
          </span>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
      </div>

      {/* ── SCORECARD ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"#fff", borderBottom:`1px solid ${T.border}` }}>
        {PILLAR_ORDER.map(pid => {
          const P = PILLARS[pid];
          const items = DATA.filter(d => d.pillar === pid);
          const pdone  = items.reduce((a,d) => a + d.tasks.filter(t => checked[t.id]).length, 0);
          const ptotal = items.reduce((a,d) => a + d.tasks.length, 0);
          const ppct   = ptotal ? Math.round(pdone/ptotal*100) : 0;
          const dDone  = items.filter(i => i.tasks.every(t => checked[t.id])).length;
          const active = filterPillar === pid;
          return (
            <div key={pid}
              onClick={() => { setFilterPillar(p => p===pid?"all":pid); setFilterStatus("all"); }}
              style={{ padding:"16px 20px", borderRight:`1px solid ${T.border}`, cursor:"pointer",
                background: active ? "#FAFAFA" : "#fff",
                borderBottom: active ? `3px solid ${P.c}` : "3px solid transparent",
                transition:"all .15s"
              }}
            >
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"2px 8px", borderRadius:99, background:P.lt, color:P.c, fontSize:10, fontWeight:700, marginBottom:8 }}>
                {P.letter} · {P.label}
              </div>
              <div style={{ fontSize:24, fontWeight:800, color:T.ink, fontFamily:"monospace", lineHeight:1, marginBottom:2 }}>
                {dDone}<span style={{ fontSize:14, fontWeight:500, color:T.muted }}>/{items.length}</span>
              </div>
              <div style={{ fontSize:10, color:T.muted, marginBottom:8 }}>deliverables complete</div>
              <div style={{ height:3, background:T.dim, borderRadius:99, overflow:"hidden", marginBottom:5 }}>
                <div style={{ height:"100%", width:`${ppct}%`, background:P.c, borderRadius:99, transition:"width .5s" }}/>
              </div>
              <div style={{ fontSize:10, fontFamily:"monospace", fontWeight:600, color:P.c }}>{ppct}% tasks done</div>
            </div>
          );
        })}
      </div>

      {/* ── GLOBAL PROGRESS ── */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 48px", display:"flex", alignItems:"center", gap:16 }}>
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:T.muted, whiteSpace:"nowrap" }}>Overall Progress</span>
        <div style={{ flex:1, height:8, background:T.dim, borderRadius:99, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${T.fin.c},${T.hr.c},${T.tax.c})`, borderRadius:99, transition:"width .5s" }}/>
        </div>
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          {[{ n:done, l:"Done" },{ n:total, l:"Tasks" },{ n:pct+"%", l:"Complete" }].map((s,i,a) => (
            <>
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:700, fontFamily:"monospace", color:T.ink }}>{s.n}</div>
                <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:1, color:T.muted }}>{s.l}</div>
              </div>
              {i<a.length-1 && <div style={{ width:1, height:22, background:T.dim }}/>}
            </>
          ))}
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ padding:"10px 48px", display:"flex", gap:6, flexWrap:"wrap", background:T.bg, borderBottom:`1px solid ${T.border}` }}>
        {[
          { f:"all", l:"All Pillars" },
          { f:"tax", l:"🟡 Tax" },
          { f:"hr",  l:"🟢 HR" },
          { f:"fin", l:"🔵 Finance" },
          { f:"mgmt",l:"🟣 Management" },
        ].map(b => (
          <button key={b.f}
            onClick={() => { setFilterPillar(b.f); setFilterStatus("all"); }}
            style={{ padding:"5px 12px", borderRadius:6, border:`1px solid ${filterPillar===b.f?T.ink:T.border}`,
              background:filterPillar===b.f?T.ink:"#fff", color:filterPillar===b.f?"#fff":T.muted,
              fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:"inherit", transition:"all .15s"
            }}>
            {b.l}
          </button>
        ))}
        <div style={{ width:1, height:26, background:T.dim, alignSelf:"center", margin:"0 4px" }}/>
        {["all","pending","in-progress","complete"].map(s => (
          <button key={s}
            onClick={() => { setFilterStatus(s); setFilterPillar("all"); }}
            style={{ padding:"5px 12px", borderRadius:6, border:`1px solid ${filterStatus===s&&filterPillar==="all"?T.ink:T.border}`,
              background:filterStatus===s&&filterPillar==="all"?T.ink:"#fff",
              color:filterStatus===s&&filterPillar==="all"?"#fff":T.muted,
              fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:"inherit", transition:"all .15s"
            }}>
            {s.charAt(0).toUpperCase()+s.slice(1).replace("-"," ")}
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding:"24px 48px 64px", maxWidth:1100, margin:"0 auto" }}>
        {pillarsToShow.map(pid => (
          <PillarSection key={pid} pid={pid} checked={checked} onToggle={handleToggle} filterStatus={filterStatus}/>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ textAlign:"center", padding:"20px", color:T.muted, fontSize:11, borderTop:`1px solid ${T.border}`, background:"#fff" }}>
        Changes sync automatically across all users · Powered by shared storage
      </div>
    </div>
  );
}
