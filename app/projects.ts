export type Project = {
  id: string;
  title: string;
  type: string;
  period: string;
  status: string;
  summary: string;
  background: string;
  problem: string;
  role: string;
  approach: string;
  outcome: string;
  evidence: string;
  tags: string[];
  links?: { label: string; url: string }[];
};
export const projectLabels = {
  zh: {
    background: "背景",
    problem: "问题",
    role: "我的职责",
    approach: "方法",
    outcome: "结果与进度",
    evidence: "公开材料",
  },
  en: {
    background: "Background",
    problem: "Problem",
    role: "My role",
    approach: "Approach",
    outcome: "Outcome & status",
    evidence: "Public evidence",
  },
};
export const projects: Record<"zh" | "en", Project[]> = {
  zh: [
    {
      id: "robot-guidance",
      title: "银行场景机器人导览系统",
      type: "宇树科技 · 部署与系统调试",
      period: "2026.09 — 至今",
      status: "正在部署与调试",
      summary:
        "在 Jetson Orin 上检查 SLAM 与雷达节点，排查 ROS 2 / DDS 通信；切换 CycloneDDS 后恢复话题通信。",
      background: "银行场景的机器人导览系统需要完成部署、建图及系统联调。",
      problem:
        "部署过程中出现节点与话题通信问题，需要区分网络配置、DDS 通信与节点运行状态。",
      role: "作为实习生配合研发团队进行部署、系统检查与问题隔离，参与建图流程和地图保存接口调试。",
      approach:
        "检查 SLAM 与激光雷达节点，查看里程计和点云话题；排查网络及 ROS 2 / DDS 配置，切换 CycloneDDS 验证通信。",
      outcome:
        "该次排障恢复了话题通信。整体项目仍处于部署与调试阶段，我的参与集中于部署支持和系统联调。",
      evidence:
        "目前无可公开的技术附件。企业内部源码、客户信息及敏感日志不在本站展示。",
      tags: ["ROS 2", "SLAM systems", "Jetson Orin", "CycloneDDS"],
    },
    {
      id: "industry-research",
      title: "一级市场产业与公司研究",
      type: "博佳资本 · 投资研究支持",
      period: "2026.01 — 2026.02",
      status: "已完成实习研究支持",
      summary:
        "梳理技术路径、产业链与商业模式，参与研究材料撰写和大模型公司实地调研。",
      background: "实习研究涉及储能、超算、硅片、创新药与灵巧手等方向。",
      problem:
        "将分散的行业与公司信息整理为可讨论的研究材料，理解产品能力、客户需求和商业化路径之间的关系。",
      role: "参与行业和公司研究、研究材料撰写，以及大模型公司实地调研；职责是研究支持。",
      approach:
        "检索公开资料，对比产业链、竞争格局与技术路径；整理产品定位、客户场景、交付模式和商业模式。",
      outcome:
        "完成研究支持，为内部项目分析与讨论提供材料。职责不涉及投资决策。",
      evidence:
        "内部研究报告不公开。目前仅提供职责说明，没有公开报告或项目链接。",
      tags: ["产业链", "技术路径", "商业模式", "竞争格局"],
    },
    {
      id: "predictive-market",
      title: "海外预测性维护市场调研",
      type: "博华科技 · 国际市场研究",
      period: "2025.01 — 2025.02",
      status: "已完成专题报告与汇报",
      summary:
        "比较海外无线振动传感器和预测性维护方案，形成专题报告并向国际市场负责人汇报。",
      background:
        "国际市场工作需要了解海外无线传感器与预测性维护产品的竞争格局。",
      problem:
        "不同厂商在产品形态、通信方案、客户场景和市场进入路径上存在差异，需要形成有依据的比较。",
      role: "开展公开资料检索与竞品整理，形成专题研究报告并汇报。",
      approach:
        "对比主要厂商、产品能力、通信方案及商业模式，将产品特征与工业客户需求相对应。",
      outcome: "完成专题报告与汇报，为市场定位及竞品分析提供参考。",
      evidence: "报告属于实习内部成果，未公开。本站不展示内部文件或客户资料。",
      tags: [
        "Predictive maintenance",
        "Market research",
        "Competitive analysis",
      ],
    },
    {
      id: "battery-health",
      title: "全钒液流电池健康度估计",
      type: "节能减排竞赛 · 文献与方法研究",
      period: "竞赛研究",
      status: "研究参与 · 无公开实验结果",
      summary:
        "围绕机理信息、粒子群优化与 ELM 的结合，参与文献调研和研究分析。",
      background: "竞赛项目关注全钒液流电池的健康状态估计。",
      problem: "理解机理信息与智能算法如何结合，以及相关方法的研究路径。",
      role: "参与文献调研、资料整理与研究分析。",
      approach: "梳理机理协同粒子群优化改进极限学习机（ELM）的思路及相关研究。",
      outcome:
        "参与文献与方法梳理，形成对研究路径的理解。目前没有可公开的算法实现或实验结果。",
      evidence: "目前无公开代码、论文或实验数据。",
      tags: ["Energy systems", "PSO", "ELM", "Literature review"],
    },
    {
      id: "maintenance-study",
      title: "工业机器人预测性维护",
      type: "工业设备 · 研究分析",
      period: "研究分析",
      status: "方法梳理 · 无部署成果",
      summary: "整理部件故障模式、数据来源与维护业务流程之间的关系。",
      background: "设备维护涉及机械部件、电机和控制系统的状态信息。",
      problem:
        "故障模式、数据来源与诊断思路需要对应，分析结论也需要衔接现场维护需求。",
      role: "梳理减速器、轴承、电机与编码器等部件的故障模式，以及振动、温度、电流和控制器日志等数据来源。",
      approach: "分析异常识别、故障诊断到维护执行的流程与信息需求。",
      outcome:
        "完成故障模式、数据来源和维护流程的研究分析。目前没有可公开的部署或性能验证结果。",
      evidence: "目前无可公开的技术附件。",
      tags: ["Condition monitoring", "Diagnostics", "Maintenance workflow"],
    },
  ],
  en: [
    {
      id: "robot-guidance",
      title: "Robot guidance in a bank environment",
      type: "Unitree · Deployment & systems debugging",
      period: "Sep 2026 — Present",
      status: "Deployment in progress",
      summary:
        "Checked SLAM and LiDAR nodes on Jetson Orin; restored ROS 2 topic connectivity by switching to CycloneDDS.",
      background:
        "A robot guidance system for a bank setting required deployment, mapping, and integration checks.",
      problem:
        "Node and topic communication issues during deployment needed to be isolated from network configuration and runtime issues.",
      role: "Supported the R&D team as an intern with deployment, system checks, and issue isolation, including mapping and map-save interface debugging.",
      approach:
        "Inspected SLAM and LiDAR nodes, odometry, and point-cloud topics; checked network and DDS configuration, then verified communication after switching to CycloneDDS.",
      outcome:
        "Restored topic connectivity in this troubleshooting case. Overall deployment and debugging remain in progress; my contribution focuses on deployment support and systems integration.",
      evidence:
        "No public technical attachments are available. Internal code, customer information, and sensitive logs are excluded.",
      tags: ["ROS 2", "SLAM systems", "Jetson Orin", "CycloneDDS"],
    },
    {
      id: "industry-research",
      title: "Industry and company research for private-market investing",
      type: "Bojia Capital · Research support",
      period: "Jan 2026 — Feb 2026",
      status: "Internship contribution completed",
      summary:
        "Organized technical approaches, industry structure, and business models; contributed research materials and an on-site visit to an LLM company.",
      background:
        "Internship research covered energy storage, supercomputing, silicon wafers, innovative medicines, and dexterous hands.",
      problem:
        "Fragmented industry and company information needed to become useful material for internal discussion, connecting product capabilities with customers and commercialization.",
      role: "Contributed to industry and company research, written materials, and an on-site visit to an LLM company in a research-support capacity.",
      approach:
        "Reviewed public sources and compared technical paths, supply chains, and competition; organized product positioning, use cases, delivery models, and business models.",
      outcome:
        "Completed research-support tasks and provided materials for internal analysis and discussion. My role did not include investment decisions.",
      evidence:
        "Internal reports are not public. There is currently no public report or project link.",
      tags: [
        "Industry structure",
        "Technical approaches",
        "Business models",
        "Competition",
      ],
    },
    {
      id: "predictive-market",
      title: "Overseas predictive-maintenance market research",
      type: "Bohua Technology · International markets",
      period: "Jan 2025 — Feb 2025",
      status: "Report and presentation completed",
      summary:
        "Compared overseas wireless vibration sensors and predictive-maintenance solutions, producing a report for the international-market lead.",
      background:
        "International-market work required an overview of competing wireless sensors and predictive-maintenance products.",
      problem:
        "Vendors differed in product format, communication technology, customer use cases, and market-entry approaches; these needed a grounded comparison.",
      role: "Reviewed public sources, organized competitor information, and prepared and presented a thematic report.",
      approach:
        "Compared vendors, product capabilities, communication solutions, and business models against industrial-customer requirements.",
      outcome:
        "Completed the report and presentation to support market positioning and competitor analysis.",
      evidence:
        "The report was an internal internship output and is not published. Customer materials and internal files are excluded.",
      tags: [
        "Predictive maintenance",
        "Market research",
        "Competitive analysis",
      ],
    },
    {
      id: "battery-health",
      title: "Vanadium flow-battery health estimation",
      type: "Competition project · Literature & methods",
      period: "Competition research",
      status: "Research contribution · No public experimental results",
      summary:
        "Contributed literature review and analysis of mechanism-informed particle swarm optimization and extreme learning machines.",
      background:
        "A competition project explored state-of-health estimation for vanadium redox flow batteries.",
      problem:
        "Understand how physical insights can inform intelligent estimation and how related methods are developed.",
      role: "Literature review, information organization, and research analysis.",
      approach:
        "Reviewed a mechanism-informed PSO approach to improving an extreme learning machine (ELM) and the surrounding research.",
      outcome:
        "Contributed to literature and method reviews. No implementation or experimental results are currently available to share.",
      evidence: "No public code, paper, or experimental dataset is available.",
      tags: ["Energy systems", "PSO", "ELM", "Literature review"],
    },
    {
      id: "maintenance-study",
      title: "Industrial-robot predictive maintenance",
      type: "Industrial equipment · Research analysis",
      period: "Research analysis",
      status: "Methods review · No deployed system",
      summary:
        "Mapped component failure modes to data sources and the workflow of maintenance decisions.",
      background:
        "Equipment maintenance draws on mechanical, motor, and control-system information.",
      problem:
        "Connect failure modes, data sources, and diagnostic approaches with the information needed in field maintenance.",
      role: "Organized failure modes for reducers, bearings, motors, and encoders alongside vibration, temperature, current, and controller-log data sources.",
      approach:
        "Analyzed information needs from anomaly detection through diagnosis to maintenance execution.",
      outcome:
        "Completed analysis of failure modes, data sources, and maintenance workflows. No deployment or performance-validation results are currently available to share.",
      evidence: "No public technical attachments are currently available.",
      tags: ["Condition monitoring", "Diagnostics", "Maintenance workflow"],
    },
  ],
};
