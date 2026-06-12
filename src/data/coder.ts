export type Stack = {
  label: string;
  items?: string[];
  groups?: { name: string; items: string[] }[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
  tags: string[];
};

export const coder = {
  intro:
    "I build software end to end — from low-level systems to polished product surfaces. Here's the stack I reach for and a few things I've shipped.",
  stacks: [
    {
      label: "Languages",
      items: [
        "Python", "C++", "TypeScript", "JavaScript", "SQL", "Spark",
        "SPARQL", "Cypher", "HTML", "Tailwind CSS", "LaTeX",
      ],
    },
    {
      label: "Cloud & DevOps",
      groups: [
        {
          name: "AWS",
          items: [
            "EC2", "S3", "RDS", "VPC", "ELB", "Lambda", "EKS", "Fargate",
            "ElastiCache", "Step Functions", "ECR", "CloudFormation", "CodeBuild",
            "Batch", "Airflow", "Elasticsearch", "Bedrock", "SageMaker",
          ],
        },
        {
          name: "Azure",
          items: [
            "App Service", "Blob Storage", "AKS", "DevOps", "ACR",
            "Active Directory", "AI Search", "OpenAI",
          ],
        },
      ],
      items: ["Docker", "Kubernetes", "Git", "GitHub Actions", "ArgoCD", "TeamCity", "Kafka"],
    },
    {
      label: "Frameworks & Tools",
      items: [
        "REST API", "GraphQL", "Node.js", "Redis", "Snowflake", "Databricks",
        "Cassandra", "OpenSearch", "Neo4j", "ChromaDB", "LangChain", "LangGraph",
        "Langfuse", "MCP", "A2A", "Gemini", "PydanticAI", "DeepEval", "GraphRAG",
        "MLflow", "Keras", "YOLO", "OpenCV", "Grafana", "Next.js", "Angular",
        "TensorFlow", "Scikit-learn", "Algorithms", "Data Structures",
      ],
    },
  ] as Stack[],
  // ── Visualizations ──────────────────────────────────────────────
  // Knowledge graph: core → domain hubs → representative skills.
  skillGraph: [
    { id: "lang", label: "Languages", color: "#8b5cf6", skills: ["Python", "C++", "TypeScript", "SQL", "Spark", "Cypher"] },
    { id: "cloud", label: "Cloud & DevOps", color: "#22d3ee", skills: ["AWS", "Azure", "Docker", "Kubernetes", "Kafka", "ArgoCD"] },
    { id: "data", label: "Data & Stores", color: "#f59e0b", skills: ["Snowflake", "Databricks", "Neo4j", "Redis", "ChromaDB", "Cassandra"] },
    { id: "ai", label: "AI · ML · LLM", color: "#ec4899", skills: ["LangChain", "LangGraph", "GraphRAG", "TensorFlow", "MLflow", "YOLO"] },
    { id: "web", label: "Web & API", color: "#a3e635", skills: ["Next.js", "Angular", "GraphQL", "Node.js", "REST API"] },
  ],

  // t-SNE of the skillset, clustered by domain.
  skillEmbedding: [
    { x: -7.5, y: 4.5, cluster: "lang", label: "Python" },
    { x: -6.5, y: 3.6, cluster: "lang", label: "C++" },
    { x: -7.8, y: 3.2, cluster: "lang", label: "TypeScript" },
    { x: -6.2, y: 4.8, cluster: "lang", label: "SQL" },
    { x: -7.0, y: 5.2, cluster: "lang", label: "Spark" },
    { x: 7.2, y: 5.4, cluster: "cloud", label: "AWS" },
    { x: 6.4, y: 4.6, cluster: "cloud", label: "Azure" },
    { x: 7.6, y: 4.2, cluster: "cloud", label: "Docker" },
    { x: 6.8, y: 5.8, cluster: "cloud", label: "Kubernetes" },
    { x: 7.9, y: 5.0, cluster: "cloud", label: "Kafka" },
    { x: 6.2, y: -4.6, cluster: "data", label: "Snowflake" },
    { x: 6.8, y: -5.4, cluster: "data", label: "Databricks" },
    { x: 5.4, y: -5.0, cluster: "data", label: "Neo4j" },
    { x: 6.6, y: -4.0, cluster: "data", label: "Redis" },
    { x: 5.8, y: -5.8, cluster: "data", label: "ChromaDB" },
    { x: -6.2, y: -4.6, cluster: "ai", label: "LangChain" },
    { x: -6.8, y: -5.2, cluster: "ai", label: "LangGraph" },
    { x: -5.4, y: -5.0, cluster: "ai", label: "GraphRAG" },
    { x: -6.0, y: -5.8, cluster: "ai", label: "TensorFlow" },
    { x: -7.0, y: -4.4, cluster: "ai", label: "MLflow" },
    { x: -0.5, y: 8.2, cluster: "web", label: "Next.js" },
    { x: 0.6, y: 7.6, cluster: "web", label: "Angular" },
    { x: -0.2, y: 8.8, cluster: "web", label: "GraphQL" },
    { x: 0.8, y: 8.4, cluster: "web", label: "Node.js" },
    { x: -0.8, y: 7.8, cluster: "web", label: "REST API" },
  ],

  // Proficiency radar (0–1).
  radarAxes: ["Languages", "Cloud/DevOps", "Data", "AI/LLM", "Web", "MLOps"],
  radarValues: [0.9, 0.92, 0.85, 0.95, 0.78, 0.82],

  // Breadth by area → bubble infographic.
  skillCounts: [
    { label: "Cloud/DevOps", value: 33, color: "#22d3ee" },
    { label: "Frameworks", value: 30, color: "#ec4899" },
    { label: "AI/LLM", value: 14, color: "#a3e635" },
    { label: "Languages", value: 11, color: "#8b5cf6" },
    { label: "Data", value: 9, color: "#f59e0b" },
  ],

  experience: [
    {
      company: "ZS Associates",
      role: "Senior Software Engineer — AI/ML",
      period: "Jun 2024 – Present",
      location: "Pune, MH, IN",
      current: true,
      highlights: [
        "Spearheading ZS AI Factory as Solutions Architect & Delivery Lead, driving enterprise-scale GenAI programs end to end; managed 5+ engineers across concurrent initiatives, aligned cross-functional stakeholders, and owned execution (roadmap, sprints, prioritization) — securing $2M+ in follow-on client investment.",
        "Built an Agentic RAG finance chatbot with hybrid deterministic and multi-agent non-deterministic routing (RLHF-driven), cutting latency via caching and parallelization while ensuring reliability through guardrails and CI/CD automation — delivering real-time decision intelligence and automated reports driving $500M+ ROI across 20+ brands in 9+ global markets.",
        "Architected and scaled an AI AgentOps platform with a unified middleware SDK for end-to-end tracing and evaluation of multi-agent systems — powering automated telemetry, observability, LLM performance analytics, and incident detection. Enabled 20+ verticals to optimize costs, improve agent accuracy, and drive measurable gains in system reliability and business KPIs.",
        "Developed a high-throughput multimodal data digitization pipeline for parallel ingestion of large-scale unstructured and structured data, transforming it into fit-for-purpose data via knowledge-graph curation and vector indexing for Graph RAG, chatbots, and intelligent search systems.",
      ],
      tags: ["GenAI", "Agentic RAG", "LangGraph", "AgentOps", "Graph RAG", "CI/CD", "Leadership"],
    },
    {
      company: "ZS Associates",
      role: "Software Engineer (Associate)",
      period: "Jul 2022 – Jun 2024",
      location: "Pune, MH, IN",
      highlights: [
        "Built an AI-driven application that turns raw data-lake inputs into analytics-ready datasets via automated schema mapping, column-description generation, metadata enrichment, and SQL transformation — reducing data transformation time by 60–70%.",
        "Designed and published a rule-based expert system for automated redaction, compliance validation, and contextual annotation of sensitive content — significantly cutting manual review effort and turnaround time while improving accuracy and consistency at scale.",
        "Engineered a low-latency streaming platform for real-time transcription and cognitive analysis of conversations, enabling scalable extraction of emotion, bias, and topic signals and sharply reducing post-interview processing time.",
        "Developed an AI-driven data-maturity platform that evaluates data capabilities and generates prescriptive transformation roadmaps, replacing manual assessments with scalable, action-driven insights.",
      ],
      tags: ["Python", "SQL", "NLP", "Streaming", "Data Engineering", "Expert Systems"],
    },
    {
      company: "ZS Associates",
      role: "Software Engineer Intern (Associate)",
      period: "Nov 2020 – Aug 2021",
      location: "Pune, MH, IN",
      highlights: [
        "Developed ontology-driven graph-ingestion workflows that convert structured datasets into RDF triples, enforce SHACL constraints for semantic correctness, and load graph data efficiently into Amazon Neptune via S3-based staging.",
        "Built an end-to-end genealogy graph pipeline — ingesting raw data from Snowflake, generating RDF triples for Amazon Neptune, and developing NetworkX analytics to compute shortest-path relationships across batch sub-graphs — enabling pharma enterprises to optimize batch genealogy, accelerate root-cause analysis of manufacturing defects, and drive production-quality improvements at scale.",
        "Developed a multimodal video-indexing workflow integrating IBM Watson (ASR) and PyTesseract (OCR), with automated tagging of video assets in DataLake to deliver faster, more accessible content discovery via custom learn-to-rank search.",
      ],
      tags: ["RDF / SHACL", "Amazon Neptune", "Snowflake", "NetworkX", "SPARQL", "OCR / ASR"],
    },
  ] as Experience[],
  contributions: [
    { repo: "next.js", note: "Edge runtime cold-start fix" },
    { repo: "framer-motion", note: "Layout animation perf patch" },
  ],
};
