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
      title: "机器人 SLAM 与具身智能实践",
      type: "系统调试与真机数据采集",
      period: "2026.09 — 至今",
      status: "实践进行中",
      summary: "参与银行导览机器人部署与 SLAM 调试；通过 PICO VR 遥操作人形机器人，采集抓取、搬运和放置任务的真机数据。",
      background: "当前实践涉及银行场景机器人导览系统的部署联调，以及面向具身智能的人形机器人数据采集与模型训练探索。",
      problem: "一方面排查部署中的节点、网络与 DDS 通信问题；另一方面探索如何将遥操作真机数据用于模型微调与任务执行验证。",
      role: "作为实习生参与机器人 SLAM 与系统调试、银行导览机器人部署联调，以及 PICO VR 遥操作和真机数据采集，并探索模型微调与测试。",
      approach: "使用 Linux、ROS 2 检查 Jetson Orin 上的 SLAM、激光雷达、里程计与点云话题，排查网络及 DDS 配置；通过 PICO VR 遥操作人形机器人采集抓取、搬运和放置数据，学习和实践 VLA、模仿学习及模型微调与真机测试。",
      outcome: "银行导览部署中的一次通信排障，通过切换 CycloneDDS 恢复了话题通信。近期工作重点是真机数据采集，并探索模型微调与真机测试，逐步衔接数据采集、训练与自主执行流程。",
      evidence:
        "目前无可公开的技术附件。企业内部源码、客户信息及敏感日志不在本站展示。",
      tags: ["SLAM", "ROS 2", "PICO VR", "Teleoperation", "VLA", "Imitation learning"],
    },
    {
      id: "industry-research",
      title: "一级市场产业与公司研究",
      type: "产业与公司研究支持",
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
      type: "海外市场与竞品研究",
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
      title: "Robot SLAM & embodied AI in practice",
      type: "Systems debugging & robot data collection",
      period: "Sep 2026 — Present",
      status: "Work in progress",
      summary: "Support bank-guidance robot deployment and SLAM debugging; teleoperate humanoid robots with PICO VR to collect real-world demonstrations of grasping, carrying, and placing objects.",
      background: "My current work spans deployment and integration of a bank-guidance robot, alongside humanoid-robot data collection and embodied-AI model-training exploration.",
      problem: "Isolate node, network, and DDS communication issues during deployment, while exploring how teleoperated demonstrations can support model fine-tuning and on-robot task evaluation.",
      role: "Contribute as an intern to SLAM and systems debugging, bank-guidance robot integration, PICO VR teleoperation, and real-robot data collection, while exploring model fine-tuning and testing.",
      approach: "Use Linux and ROS 2 to inspect SLAM, LiDAR, odometry, and point-cloud topics on Jetson Orin and troubleshoot network and DDS configuration. Teleoperate humanoids with PICO VR to collect grasping, carrying, and placing demonstrations, while learning and applying vision-language-action (VLA) models, imitation learning, fine-tuning, and on-robot testing.",
      outcome: "Restored ROS 2 topic connectivity in one bank-guidance deployment troubleshooting case by switching to CycloneDDS. Recent work focuses on collecting real-robot data and exploring fine-tuning and on-robot tests, working toward a workflow from data collection and training to autonomous execution.",
      evidence:
        "No public technical attachments are available. Internal code, customer information, and sensitive logs are excluded.",
      tags: ["SLAM", "ROS 2", "PICO VR", "Teleoperation", "VLA", "Imitation learning"],
    },
    {
      id: "industry-research",
      title: "Industry and company research for private-market investing",
      type: "Industry & company research support",
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
      type: "Overseas markets & competitive research",
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
