'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Activity, AlertTriangle, Box, Users, Thermometer, ShieldAlert, 
  BarChart3, Map as MapIcon, Database, RefreshCw, Settings2, 
  Globe, Server, CheckCircle2, MessageSquare, X, Send, Check, MapPin, Printer, Zap, Languages, Building2, Search, UserCheck, Crown, Navigation, Volume2, Bug
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';

const translations: any = {
  en: {
    title: "BRICS HealthResilience AI",
    subtitle: "National Healthcare Intelligence Network - Official Situation Report",
    systemLive: "System Live",
    syncing: "Syncing...",
    overview: "Overview",
    liveMap: "Live Network Map",
    phcNetwork: "PHC Facility Network",
    droneTracker: "Last-Mile Drone Fleet",
    aiOps: "AI Operations",
    medDemand: "Medicine Demand",
    bedCap: "Bed Capacity",
    coldChain: "Cold Chain Risk",
    federatedNet: "Federated Network",
    globalModel: "Global Model Status",
    criticalShortages: "Critical Shortages",
    bedOccupancy: "Bed Occupancy",
    pendingInterventions: "Pending Interventions",
    resolvedActions: "Resolved Actions",
    modelVersion: "Model Version",
    simulator: "Digital Twin: Supply & Demand Simulator",
    supplyDisruption: "Supply Disruption Factor",
    diseaseVelocity: "Disease Velocity Index",
    actionDispatch: "Action Dispatch",
    aiSolution: "AI Solution",
    approveTransfer: "Approve Transfer",
    allDispatched: "All Interventions Dispatched",
    globalMapTitle: "National Threat Intelligence Map",
    globalMapSub: "Real-time geospatial tracking of disease vectors across Indian Districts.",
    phcTitle: "Primary Health Centre (PHC) Micro-Inventory Matrix",
    phcSub: "Real-time telemetry tracking of essential medicines, cold-chain storage, and staffing across frontline clinics.",
    droneTitle: "Last-Mile Autonomous Drone & Courier Fleet Tracker",
    droneSub: "Autonomous aerial and ground dispatch tracking for emergency vaccines and blood plasma to flood-blocked or remote zones.",
    searchPhc: "Search clinic or region...",
    chatPlaceholder: "Ask operations...",
    chatTitle: "AI Operations Assistant",
    ministerialRole: "BRICS Ministerial View (Macro)",
    districtRole: "District Medical Officer View (Micro)"
  },
  hi: {
    title: "ब्रिक्स हेल्थ रेसिलिएंस एआई",
    subtitle: "राष्ट्रीय स्वास्थ्य खुफिया नेटवर्क - आधिकारिक स्थिति रिपोर्ट",
    systemLive: "सिस्टम लाइव",
    syncing: "सिंक हो रहा है...",
    overview: "अवलोकन",
    liveMap: "लाइव नेटवर्क मानचित्र",
    phcNetwork: "पीएचसी सुविधा नेटवर्क",
    droneTracker: "ड्रोन बेड़ा ट्रैकर",
    aiOps: "एआई संचालन",
    medDemand: "दवा की मांग",
    bedCap: "बेड क्षमता",
    coldChain: "कोल्ड चेन जोखिम",
    federatedNet: "संघीय नेटवर्क",
    globalModel: "वैश्विक मॉडल स्थिति",
    criticalShortages: "गंभीर कमियां",
    bedOccupancy: "बेड अधिभोग",
    pendingInterventions: "लंबित हस्तक्षेप",
    resolvedActions: "हल की गई कार्रवाइयां",
    modelVersion: "मॉडल संस्करण",
    simulator: "डिजिटल ट्विन: आपूर्ति और मांग सिम्युलेटर",
    supplyDisruption: "आपूर्ति व्यवधान कारक",
    diseaseVelocity: "रोग प्रसार सूचकांक",
    actionDispatch: "कार्य प्रेषण",
    aiSolution: "एआई समाधान",
    approveTransfer: "हस्तांतरण स्वीकृत करें",
    allDispatched: "सभी हस्तक्षेप प्रेषित कर दिए गए हैं",
    globalMapTitle: "राष्ट्रीय खतरा खुफिया मानचित्र",
    globalMapSub: "भारतीय जिलों में रोग वैक्टर की वास्तविक समय भू-स्थानिक ट्रैकिंग।",
    phcTitle: "प्राथमिक स्वास्थ्य केंद्र (PHC) सूक्ष्म-इन्वेंट्री मैट्रिक्स",
    phcSub: "अग्रिम पंक्ति के क्लीनिकों में आवश्यक दवाओं, कोल्ड-चेन स्टोरेज और स्टाफिंग की वास्तविक समय टेलीमेट्री।",
    droneTitle: "अंतिम-मील स्वायत्त ड्रोन और कूरियर बेड़े ट्रैकर",
    droneSub: "बाढ़ से अवरुद्ध या दूरदराज के क्षेत्रों में आपातकालीन टीकों और रक्त प्लाज्मा के लिए स्वायत्त हवाई प्रेषण।",
    searchPhc: "क्लिनिक या क्षेत्र खोजें...",
    chatPlaceholder: "संचालन के बारे में पूछें...",
    chatTitle: "एआई संचालन सहायक",
    ministerialRole: "ब्रिक्स मंत्री स्तरीय दृश्य (मैक्रो)",
    districtRole: "जिला चिकित्सा अधिकारी दृश्य (सूक्ष्म)"
  },
  pt: {
    title: "BRICS HealthResilience AI",
    subtitle: "Rede Nacional de Inteligência em Saúde - Relatório Oficial",
    systemLive: "Sistema Ativo",
    syncing: "Sincronizando...",
    overview: "Visão Geral",
    liveMap: "Mapa da Rede Ao Vivo",
    phcNetwork: "Rede de PHC",
    droneTracker: "Frota de Drones Last-Mile",
    aiOps: "Operações de IA",
    medDemand: "Demanda de Medicamentos",
    bedCap: "Capacidade de Leitos",
    coldChain: "Risco de Cadeia Fria",
    federatedNet: "Rede Federada",
    globalModel: "Status do Modelo Global",
    criticalShortages: "Escassez Crítica",
    bedOccupancy: "Ocupação de Leitos",
    pendingInterventions: "Intervenções Pendentes",
    resolvedActions: "Ações Resolvidas",
    modelVersion: "Versão do Modelo",
    simulator: "Gêmeo Digital: Simulador de Oferta e Demanda",
    supplyDisruption: "Fator de Ruptura de Abastecimento",
    diseaseVelocity: "Índice de Velocidade da Doença",
    actionDispatch: "Despacho de Ação",
    aiSolution: "Solução de IA",
    approveTransfer: "Aprovar Transferência",
    allDispatched: "Todas as Intervenções Despachadas",
    globalMapTitle: "Mapa de Inteligência de Ameaças Nacionais",
    globalMapSub: "Rastreamento geoespacial em tempo real de vetores de doenças em distritos indianos.",
    phcTitle: "Matriz de Micro-Inventario de UBS / PHC",
    phcSub: "Telemetria em tempo real de medicamentos essenciais, armazenamento em cadeia fria e equipes nas clínicas de linha de frente.",
    droneTitle: "Rastreador de Frotas de Drones Autônomos Last-Mile",
    droneSub: "Rastreamento de despacho aéreo para vacinas de emergência e plasma sanguíneo em zonas isoladas ou bloqueadas.",
    searchPhc: "Pesquisar clínica ou região...",
    chatPlaceholder: "Pergunte sobre as operações...",
    chatTitle: "Assistente de Operações de IA",
    ministerialRole: "Visão Ministerial BRICS (Macro)",
    districtRole: "Visão do Oficial Médico Distrital (Micro)"
  },
  ru: {
    title: "BRICS HealthResilience AI",
    subtitle: "Национальная сеть медицинской разведки — Официальный отчёт",
    systemLive: "Система активна",
    syncing: "Синхронизация...",
    overview: "Обзор",
    liveMap: "Карта сети",
    phcNetwork: "Сеть поликлиник (PHC)",
    droneTracker: "Флот дронов",
    aiOps: "Операции ИИ",
    medDemand: "Потребность в лекарствах",
    bedCap: "Койко-места",
    coldChain: "Риск холодовой цепи",
    federatedNet: "Федеративная сеть",
    globalModel: "Статус модели",
    criticalShortages: "Критический дефицит",
    bedOccupancy: "Занятость коек",
    pendingInterventions: "Ожидающие вмешательства",
    resolvedActions: "Выполненные действия",
    modelVersion: "Версия модели",
    simulator: "Цифровой двойник",
    supplyDisruption: "Фактор сбоя поставок",
    diseaseVelocity: "Индекс распространения",
    actionDispatch: "Диспетчеризация",
    aiSolution: "Решение ИИ",
    approveTransfer: "Одобрить перевод",
    allDispatched: "Все вмешательства выполнены",
    globalMapTitle: "Карта национальной аналитики угроз",
    globalMapSub: "Геопространственное отслеживание векторов заболеваний по округам Индии.",
    phcTitle: "Матрица микро-инвентаризации перв. мед. центров (PHC)",
    phcSub: "Мониторинг основных лекарств, холодовой цепи и персонала в реальном времени.",
    droneTitle: "Трекер автономных дронов доставки вакцин",
    droneSub: "Отслеживание полетов беспилотников с экстренными медикаментами в труднодоступные районы.",
    searchPhc: "Поиск клиники или региона...",
    chatPlaceholder: "Задайте вопрос по операциям...",
    chatTitle: "Помощник ИИ по операциям",
    ministerialRole: "Министерский уровень БРИКС (Макро)",
    districtRole: "Уровень районного врача (Микро)"
  },
  zh: {
    title: "金砖国家医疗韧性人工智能",
    subtitle: "国家医疗情报网络 - 官方态势报告",
    systemLive: "系统在线",
    syncing: "同步中...",
    overview: "概览",
    liveMap: "实时网络地图",
    phcNetwork: "基层医疗中心网络",
    droneTracker: "末端无人机机队",
    aiOps: "人工智能行动",
    medDemand: "药品需求",
    bedCap: "床位容量",
    coldChain: "冷链风险",
    federatedNet: "联邦网络",
    globalModel: "全局模型状态",
    criticalShortages: "严重短缺",
    bedOccupancy: "床位占用率",
    pendingInterventions: "待处理干预",
    resolvedActions: "已解决行动",
    modelVersion: "模型版本",
    simulator: "数字孪生：供需模拟器",
    supplyDisruption: "供应链中断系数",
    diseaseVelocity: "疾病传播速度指数",
    actionDispatch: "行动调度",
    aiSolution: "人工智能建议",
    approveTransfer: "批准调拨",
    allDispatched: "所有干预措施已调度",
    globalMapTitle: "国家威胁情报地图",
    globalMapSub: "印度各地区疾病传播媒介的实时地理空间追踪。",
    phcTitle: "基层医疗中心 (PHC) 微型库存矩阵",
    phcSub: "实时追踪一线诊所的必需药品、冷链储存和人员配置 telemetry。",
    droneTitle: "末端自动无人机与地面快递 fleet 追踪器",
    droneSub: "针对受洪水阻断或偏远地区的应急疫苗和血浆自动空中投递监控。",
    searchPhc: "搜索诊所或地区...",
    chatPlaceholder: "询问运营情况...",
    chatTitle: "人工智能运营助手",
    ministerialRole: "金砖部长级视角 (宏观)",
    districtRole: "区县医疗官视角 (微观)"
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState('en');
  const [role, setRole] = useState('ministerial');
  const [voiceEnabled, setVoiceEnabled] = useState(true); 
  
  // Backend Data
  const [metrics, setMetrics] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [federated, setFederated] = useState<any>(null);
  const [phcList, setPhcList] = useState<any[]>([]);
  const [droneList, setDroneList] = useState<any[]>([]);
  const [phcSearch, setPhcSearch] = useState('');
  const [resolvedCount, setResolvedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Approval status state
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Digital Twin Simulation State
  const [disruption, setDisruption] = useState(20);
  const [spread, setSpread] = useState(15);
  const [activePreset, setActivePreset] = useState('custom');

  // Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Command interface online. Standing by for healthcare resource queries.' }
  ]);

  const t = translations[lang];

  // --- TEXT-TO-SPEECH HELPER ---
  const speakText = (text: string) => {
    if (!voiceEnabled) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [metricsRes, recsRes, fedRes, phcRes, droneRes] = await Promise.all([
        axios.get('http://localhost:8000/api/metrics/summary'),
        axios.get('http://localhost:8000/api/ai/recommendations'),
        axios.get('http://localhost:8000/api/federated/status'),
        axios.get('http://localhost:8000/api/phc/network'),
        axios.get('http://localhost:8000/api/drones/missions')
      ]);
      setMetrics(metricsRes.data);
      setRecommendations(recsRes.data);
      setFederated(fedRes.data);
      setPhcList(phcRes.data);
      setDroneList(droneRes.data);
      setResolvedCount(metricsRes.data.resolved_actions || 0);
    } catch (error) {
      console.error("Failed to connect to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- LIVE WEBSOCKET LISTENER WITH VOICE DISPATCHER ---
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/ws/alerts');

    ws.onmessage = (event) => {
      const newAlert = JSON.parse(event.data);
      setRecommendations((prev) => [newAlert, ...prev]);
      setToastMessage(`⚠️ Live Emergency Alert Broadcasted via WebSocket!`);
      
      speakText(`Warning: ${newAlert.title}. ${newAlert.description}`);

      setTimeout(() => setToastMessage(null), 6000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [voiceEnabled]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    if (newRole === 'district') {
      setActiveTab('phc-network');
    } else {
      setActiveTab('overview');
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setApprovingId(id);
      const res = await axios.post(`http://localhost:8000/api/ai/recommendations/${id}/approve`);
      
      setRecommendations((prev) => prev.filter((item) => item.id !== id));
      setResolvedCount(res.data.resolved_total);

      setToastMessage(res.data.message);
      setTimeout(() => setToastMessage(null), 4000);
    } catch (error) {
      console.error("Approval error:", error);
    } finally {
      setApprovingId(null);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const applyPreset = (preset: string) => {
    setActivePreset(preset);
    if (preset === 'normal') {
      setDisruption(10);
      setSpread(10);
    } else if (preset === 'dengue') {
      setDisruption(35);
      setSpread(88);
    } else if (preset === 'collapse') {
      setDisruption(92);
      setSpread(45);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', text: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');
    setIsChatLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/ai/chat', { message: chatMessage });
      setChatHistory([...newHistory, { role: 'ai', text: res.data.reply }]);
      
      speakText(res.data.reply);
    } catch (error) {
      setChatHistory([...newHistory, { role: 'ai', text: 'Error connecting to AI chat service.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const simulationData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    supply: Math.max(0, 100 - (i * (disruption / 8))),
    demand: Math.min(100, 30 + (i * (spread / 4))),
  }));

  // --- LOCALIZED INDIAN DISTRICT NODES WITH DISEASE DATA ---
  const districtNodes = [
    { id: 'SXR', name: 'Srinagar', top: '10%', left: '30%', status: 'safe', disease: 'None Detected', detail: 'Routine surveillance active.' },
    { id: 'DEL', name: 'New Delhi', top: '25%', left: '35%', status: spread > 70 ? 'critical' : 'warning', disease: 'Dengue Virus (DENV-2)', detail: 'High mosquito vector density detected in sector 4.' },
    { id: 'JAI', name: 'Jaipur', top: '35%', left: '25%', status: 'safe', disease: 'None Detected', detail: 'Normal baseline metrics.' },
    { id: 'LKO', name: 'Lucknow', top: '35%', left: '45%', status: 'warning', disease: 'Typhoid Fever', detail: 'Waterborne contamination reported in East sector.' },
    { id: 'PAT', name: 'Patna', top: '40%', left: '55%', status: 'safe', disease: 'None Detected', detail: 'Routine surveillance active.' },
    { id: 'GAU', name: 'Guwahati', top: '35%', left: '75%', status: 'warning', disease: 'Japanese Encephalitis', detail: 'Seasonal vector increase flagged.' },
    { id: 'IMF', name: 'Imphal', top: '40%', left: '85%', status: recommendations.length > 1 ? 'critical' : 'safe', disease: 'Malaria (P. falciparum)', detail: 'Active border transit monitoring in effect.' },
    { id: 'AMD', name: 'Ahmedabad', top: '45%', left: '15%', status: 'safe', disease: 'None Detected', detail: 'Normal baseline metrics.' },
    { id: 'BPL', name: 'Bhopal', top: '50%', left: '35%', status: 'safe', disease: 'None Detected', detail: 'Normal baseline metrics.' },
    { id: 'KOL', name: 'Kolkata', top: '50%', left: '65%', status: disruption > 80 ? 'critical' : 'warning', disease: 'Cholera (V. cholerae)', detail: 'Waterborne cluster detected in district 4.' },
    { id: 'MUM', name: 'Mumbai', top: '60%', left: '20%', status: 'safe', disease: 'H1N1 Influenza', detail: 'Outbreak successfully contained.' },
    { id: 'HYD', name: 'Hyderabad', top: '65%', left: '40%', status: 'warning', disease: 'Chikungunya', detail: 'Isolated clusters in urban zones.' },
    { id: 'BBI', name: 'Bhubaneswar', top: '60%', left: '60%', status: 'safe', disease: 'None Detected', detail: 'Normal baseline metrics.' },
    { id: 'BLR', name: 'Bangalore', top: '75%', left: '32%', status: recommendations.length > 0 ? 'critical' : 'warning', disease: 'Nipah Virus (NiV)', detail: 'Surveillance active, monitoring local bat populations.' },
    { id: 'MAA', name: 'Chennai', top: '80%', left: '42%', status: 'safe', disease: 'None Detected', detail: 'Normal baseline metrics.' },
    { id: 'COK', name: 'Kochi', top: '85%', left: '30%', status: 'safe', disease: 'None Detected', detail: 'Routine surveillance active.' }
  ];

  const filteredPhc = phcList.filter(item => 
    item.name.toLowerCase().includes(phcSearch.toLowerCase()) || 
    item.region.toLowerCase().includes(phcSearch.toLowerCase()) ||
    item.id.toLowerCase().includes(phcSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col relative print:bg-white print:text-black">
      
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 print:hidden">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between print:bg-white print:border-black print:text-black">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-blue-500 h-8 w-8 print:text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight print:text-black">{t.title}</h1>
            <p className="text-xs text-slate-400 print:text-gray-600">
              {role === 'ministerial' ? t.subtitle : "District Medical Officer View — Frontline Operations Command"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          
          <button 
            onClick={() => { setVoiceEnabled(!voiceEnabled); speakText(voiceEnabled ? "Voice dispatcher muted" : "Voice dispatcher online"); }}
            title="Toggle Voice-Enabled AI Dispatcher"
            className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition print:hidden ${voiceEnabled ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
          >
            <Volume2 className="h-3.5 w-3.5" />
            <span>{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md print:hidden">
            {role === 'ministerial' ? <Crown className="h-4 w-4 text-amber-400" /> : <UserCheck className="h-4 w-4 text-emerald-400" />}
            <select 
              value={role} 
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="ministerial" className="bg-slate-900">{t.ministerialRole}</option>
              <option value="district" className="bg-slate-900">{t.districtRole}</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md print:hidden">
            <Languages className="h-4 w-4 text-blue-400" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900">EN</option>
              <option value="hi" className="bg-slate-900">HI</option>
              <option value="pt" className="bg-slate-900">PT</option>
              <option value="ru" className="bg-slate-900">RU</option>
              <option value="zh" className="bg-slate-900">ZH</option>
            </select>
          </div>

          <button 
            onClick={handlePrintReport}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition print:hidden shadow-lg shadow-blue-900/40"
          >
            <Printer className="h-4 w-4" /> PDF Report
          </button>

          <div className="flex items-center gap-2 print:hidden">
            <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500 animate-pulse'}`}></div>
            <span className={isLoading ? 'text-yellow-400' : 'text-green-400'}>
              {isLoading ? t.syncing : t.systemLive}
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 hidden md:block overflow-y-auto z-10 print:hidden">
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
              <BarChart3 className="h-4 w-4" /> {t.overview}
            </button>
            <button onClick={() => setActiveTab('map')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === 'map' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
              <MapIcon className="h-4 w-4" /> {t.liveMap}
            </button>
            <button onClick={() => setActiveTab('phc-network')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === 'phc-network' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
              <Building2 className="h-4 w-4" /> {t.phcNetwork}
            </button>
            <button onClick={() => setActiveTab('drones')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === 'drones' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
              <Navigation className="h-4 w-4" /> {t.droneTracker}
            </button>
            
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.aiOps}</div>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-slate-800 text-slate-300"><Box className="h-4 w-4" /> {t.medDemand}</button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-slate-800 text-slate-300"><Activity className="h-4 w-4" /> {t.bedCap}</button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-slate-800 text-slate-300"><Thermometer className="h-4 w-4" /> {t.coldChain}</button>
            
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.federatedNet}</div>
            <button onClick={() => setActiveTab('federated')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === 'federated' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
              <Globe className="h-4 w-4" /> {t.globalModel}
            </button>
          </nav>
        </aside>

        {/* MAIN PANEL */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950 print:bg-white print:p-0">
          
          {role === 'district' && activeTab === 'overview' && (
            <div className="mb-6 bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-lg flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-400" />
                <strong>District Mode Active:</strong> Displaying hyper-local operational telemetry filtered for District Medical Officers.
              </span>
              <button onClick={() => setActiveTab('phc-network')} className="underline hover:text-white font-medium">View PHC Matrix &rarr;</button>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 print:grid-cols-3">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm print:bg-white print:border-gray-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-400 print:text-gray-600">{t.criticalShortages}</p>
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <p className="text-2xl font-bold text-white print:text-black">{metrics ? metrics.critical_shortages : "--"}</p>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm print:bg-white print:border-gray-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-400 print:text-gray-600">{t.bedOccupancy}</p>
                    <Activity className="h-4 w-4 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-white print:text-black">{metrics ? `${metrics.bed_occupancy_rate}%` : "--%"}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm print:bg-white print:border-gray-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-400 print:text-gray-600">{t.pendingInterventions}</p>
                    <ShieldAlert className="h-4 w-4 text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold text-white print:text-black">{recommendations.length}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm print:bg-white print:border-gray-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-400 print:text-gray-600">{t.resolvedActions}</p>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-400 print:text-emerald-700">{resolvedCount}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm print:bg-white print:border-gray-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-400 print:text-gray-600">{t.modelVersion}</p>
                    <Database className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white print:text-black">{metrics ? metrics.federated_model_version : "--"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px] print:block print:space-y-6">
                
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg flex flex-col shadow-sm print:bg-white print:border-gray-300">
                  <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between print:bg-gray-100 print:border-gray-300">
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-5 w-5 text-blue-400 print:text-blue-700" />
                      <h2 className="font-semibold text-white print:text-black">{t.simulator}</h2>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-md border border-slate-800 print:hidden">
                      <Zap className="h-3.5 w-3.5 text-yellow-400 ml-1" />
                      <button onClick={() => applyPreset('normal')} className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${activePreset === 'normal' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>Nominal</button>
                      <button onClick={() => applyPreset('dengue')} className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${activePreset === 'dengue' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'}`}>Dengue</button>
                      <button onClick={() => applyPreset('collapse')} className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${activePreset === 'collapse' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}>Collapse</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-4 border-b border-slate-800 bg-slate-950 print:bg-white print:border-gray-300">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <label className="text-slate-400">{t.supplyDisruption}</label>
                        <span className="text-blue-400 font-mono">{disruption}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={disruption} onChange={(e) => { setDisruption(Number(e.target.value)); setActivePreset('custom'); }} className="w-full accent-blue-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <label className="text-slate-400">{t.diseaseVelocity}</label>
                        <span className="text-red-400 font-mono">{spread}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={spread} onChange={(e) => { setSpread(Number(e.target.value)); setActivePreset('custom'); }} className="w-full accent-red-500" />
                    </div>
                  </div>

                  <div className="flex-1 p-4 bg-slate-950 min-h-[250px] print:bg-white">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={simulationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        <Line type="monotone" name="Supply (%)" dataKey="supply" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                        <Line type="monotone" name="Demand (%)" dataKey="demand" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col shadow-sm print:bg-white print:border-gray-300">
                  <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between print:bg-gray-100 print:border-gray-300">
                    <h2 className="font-semibold text-white print:text-black flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400" /> {t.actionDispatch}
                    </h2>
                    <span className="text-xs text-slate-400 font-mono print:text-gray-600">{recommendations.length}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 print:overflow-visible">
                    {recommendations.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                        <CheckCircle2 className="h-10 w-10 text-emerald-500 mb-2" />
                        <p className="text-sm font-medium text-slate-300">{t.allDispatched}</p>
                      </div>
                    ) : (
                      recommendations.map((rec) => (
                        <div key={rec.id} className={`border p-3 rounded-md transition-all ${rec.priority === 'CRITICAL' ? 'border-orange-900/50 bg-orange-950/20' : 'border-slate-800 bg-slate-950'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-white">{rec.title}</p>
                            <button 
                              onClick={() => speakText(`${rec.title}. ${rec.description}. Recommendation: ${rec.recommendation}`)}
                              title="Listen to alert"
                              className="text-slate-400 hover:text-blue-400 transition"
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 mb-2">{rec.description}</p>
                          <div className="bg-slate-900 border border-slate-800 p-2 rounded text-xs text-slate-300 mb-3">
                            <strong className="text-blue-400 font-medium">{t.aiSolution}:</strong> {rec.recommendation}
                          </div>
                          <button onClick={() => handleApprove(rec.id)} disabled={approvingId === rec.id} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-1.5 rounded transition flex items-center justify-center gap-1 font-medium print:hidden">
                            {approvingId === rec.id ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Check className="h-3.5 w-3.5" />} {t.approveTransfer}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PHC FACILITY NETWORK TAB */}
          {activeTab === 'phc-network' && (
            <div className="animate-in fade-in duration-300 h-full flex flex-col">
              <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.phcTitle}</h2>
                  <p className="text-slate-400 text-sm mt-1">{t.phcSub}</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input 
                    type="text" 
                    value={phcSearch}
                    onChange={(e) => setPhcSearch(e.target.value)}
                    placeholder={t.searchPhc}
                    className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-64"
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 text-xs font-semibold">
                      <th className="p-4">Facility ID & Name</th>
                      <th className="p-4">Region / Sector</th>
                      <th className="p-4">Amoxicillin Stock</th>
                      <th className="p-4">Oxygen Tanks</th>
                      <th className="p-4">Cold-Chain Temp</th>
                      <th className="p-4">Active Staff</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {filteredPhc.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">No PHC facilities match your search criteria.</td>
                      </tr>
                    ) : (
                      filteredPhc.map((phc) => (
                        <tr key={phc.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-medium text-white flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-blue-400" />
                            <div>
                              <div>{phc.name}</div>
                              <span className="text-[10px] text-slate-500 font-mono">{phc.id}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">{phc.region}</td>
                          <td className="p-4 font-mono font-semibold text-blue-300">{phc.amoxicillin} units</td>
                          <td className="p-4 font-mono text-slate-300">{phc.oxygen_tanks} cylinders</td>
                          <td className="p-4 font-mono">
                            <span className={`px-2 py-0.5 rounded ${phc.cold_chain_temp > 6.0 ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-slate-800 text-slate-300'}`}>
                              {phc.cold_chain_temp}°C
                            </span>
                          </td>
                          <td className="p-4 text-slate-300">{phc.staff_active} operators</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider ${
                              phc.status === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-900 animate-pulse' :
                              phc.status === 'WARNING' ? 'bg-yellow-950 text-yellow-400 border border-yellow-900' :
                              'bg-emerald-950 text-emerald-400 border border-emerald-900'
                            }`}>
                              {phc.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DRONES TAB */}
          {activeTab === 'drones' && (
            <div className="animate-in fade-in duration-300 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">{t.droneTitle}</h2>
                <p className="text-slate-400 text-sm mt-1">{t.droneSub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {droneList.map((drone) => (
                  <div key={drone.id} className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Navigation className="h-5 w-5 text-blue-400 animate-pulse" />
                          <div>
                            <h3 className="font-semibold text-white text-sm">{drone.id}</h3>
                            <span className="text-[11px] text-slate-400">Destination: {drone.destination}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider ${
                          drone.status === 'IN_FLIGHT' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                          drone.status === 'LANDING' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          'bg-orange-950 text-orange-400 border border-orange-800 animate-pulse'
                        }`}>
                          {drone.status}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-md border border-slate-800 mb-4 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Payload Cargo:</span>
                          <span className="text-white font-medium">{drone.cargo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Weather Condition:</span>
                          <span className="text-slate-300">{drone.weather}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Airspeed:</span>
                          <span className="font-mono text-blue-300">{drone.speed}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-800/80 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Battery Level:</span>
                        <span className="font-mono text-emerald-400">{drone.battery}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Estimated Time of Arrival:</span>
                        <span className="font-mono text-white font-semibold">{drone.eta}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LIVE MAP TAB WITH DISEASE TOOLTIPS */}
          {activeTab === 'map' && (
            <div className="animate-in fade-in duration-300 h-full flex flex-col min-h-[600px]">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.globalMapTitle}</h2>
                  <p className="text-slate-400 text-sm mt-1">{t.globalMapSub}</p>
                </div>
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg relative overflow-hidden shadow-sm">
                 <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#334155 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
                 <Globe className="absolute text-slate-800/20 w-[800px] h-[800px] -right-20 -top-20 pointer-events-none stroke-[0.5]" />
                 
                 {districtNodes.map((node) => (
                    <div key={node.id} className="absolute flex flex-col items-center group transition-all duration-500 cursor-pointer" style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}>
                       
                       {/* --- PATHOGEN TRACKING TOOLTIP (Hover) --- */}
                       <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-700 p-2.5 rounded-lg text-xs text-white shadow-2xl whitespace-nowrap z-20 flex flex-col gap-1 w-56 pointer-events-none">
                          <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1">
                            <strong className="text-blue-400">{node.id} Hub: {node.name}</strong>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider ${node.status === 'critical' ? 'bg-red-950 text-red-400' : node.status === 'warning' ? 'bg-yellow-950 text-yellow-400' : 'bg-emerald-950 text-emerald-400'}`}>
                              {node.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <Bug className={`h-3.5 w-3.5 ${node.status === 'safe' ? 'text-emerald-400' : node.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`} />
                            <span>Pathogen: <span className="font-semibold text-white">{node.disease}</span></span>
                          </div>
                          <div className="text-slate-400 text-[10px] ml-5 whitespace-normal leading-tight">{node.detail}</div>
                       </div>
                       
                       {/* --- DYNAMIC NODE DOTS --- */}
                       <div className="relative flex h-8 w-8 items-center justify-center">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${node.status === 'critical' ? 'bg-red-500' : node.status === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${node.status === 'critical' ? 'bg-red-500' : node.status === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`}></span>
                       </div>

                       <div className="mt-1 bg-slate-950/80 border border-slate-700/50 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-300 flex items-center gap-1 backdrop-blur-sm">
                          <MapPin className="h-3 w-3 text-slate-500" /> {node.name}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'federated' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">{t.globalModel}</h2>
                  <p className="text-slate-400 text-sm mt-1">Consortium model aggregation under Differential Privacy guarantees.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <h3 className="font-semibold text-white mb-2">Consortium Status Active</h3>
                <p className="text-slate-400 text-sm">Model weights aggregated securely across the network.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* GEMINI CHAT OVERLAY */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/50 hover:bg-blue-500 transition-colors z-40 print:hidden"
      >
        {isChatOpen ? <X className="text-white h-6 w-6" /> : <MessageSquare className="text-white h-6 w-6" />}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col z-40 overflow-hidden print:hidden">
          <div className="bg-blue-700 p-3 flex items-center gap-2 text-white font-semibold text-sm">
            <ShieldAlert className="h-4 w-4" /> {t.chatTitle}
          </div>
          <div className="h-64 p-3 overflow-y-auto flex flex-col gap-2 bg-slate-950">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`p-2 text-xs rounded-md max-w-[85%] ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200 self-start border border-slate-700' : 'bg-blue-600 text-white self-end'}`}>
                {msg.text}
              </div>
            ))}
            {isChatLoading && <div className="text-xs text-slate-500 self-start animate-pulse">Analyzing...</div>}
          </div>
          <form onSubmit={handleSendMessage} className="p-2 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-600 px-3 py-1.5 rounded text-white hover:bg-blue-500 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}