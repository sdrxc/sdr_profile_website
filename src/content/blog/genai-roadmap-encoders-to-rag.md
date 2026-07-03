# A Beginner's Guide & Roadmap to GenAI: From Encoders & Decoders to RAG and Agents

> If you're staring at the GenAI landscape wondering where to *start* — this is the map I wish I'd had. It's a six-week path that takes you from the architecture under the hood all the way to retrieval systems and autonomous agents. No PhD required; just curiosity and a willingness to build.

Generative AI moves fast enough to feel impossible to enter. The trick is to stop treating it as one giant topic and start treating it as a **sequence**. Each week below builds on the last. Skim what you know, slow down where it's new, and *build something small* at every stage — that's where the understanding actually sticks.

Here's the whole journey at a glance:

| Week | Theme | You'll understand… |
|------|-------|--------------------|
| 1 | LLM Architecture | How transformers, encoders and decoders actually work |
| 2 | Vector DBs & RAG | How models talk to *your* data |
| 3 | Tools & Frameworks | How to orchestrate LLMs in real apps |
| 4 | Fine-Tuning & Prompting | How to specialise and steer models |
| 5 | Deployment & Scaling | How to ship it without it falling over |
| 6 | Evaluation & Responsible AI | How to know it's actually good — and safe |

Let's walk it.

---

## Week 1 — Introduction to LLM Architecture

Everything starts with the **Transformer**. Before 2017, sequence models read text one token at a time and forgot the beginning by the time they reached the end. The Transformer replaced that with **self-attention**: every token gets to look at every other token at once and decide what matters. That single idea is why modern LLMs work.

Three building blocks to internalise:

- **Encoders** read and *understand* a whole sequence at once, producing rich representations. Great for classification, search, and embeddings. **BERT** is the classic encoder.
- **Decoders** *generate* text one token at a time, each new token conditioned on everything before it. This is what powers **GPT**-style chat models.
- **Encoder–decoder** models do both — read an input fully, then generate an output. **T5** frames *every* task as "text in, text out."

Once the architecture clicks, look at the **model families** (GPT, BERT, T5, and their open-weight cousins) and do a small **comparative analysis**: what is each *optimised* for, and when would you reach for one over another?

**Do this week:** read the Transformer visually, then run a tiny encoder (embeddings) and a tiny decoder (text generation) and *feel* the difference.

**Primary resources**
- Understanding encoder & decoder models — [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- The Transformer architecture — [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- Overview of LLMs (GPT, BERT, T5…) — [An Overview of BERT, GPT and other models](https://www.johnsnowlabs.com/introduction-to-large-language-models-llms-an-overview-of-bert-gpt-and-other-popular-models/)
- Comparative analysis — [BERT, GPT and BART: a short comparison](https://medium.com/@reyhaneh.esmailbeigi/bert-gpt-and-bart-a-short-comparison-5d6a57175fca)

---

## Week 2 — Vector Databases & Retrieval-Augmented Generation (RAG)

An LLM only "knows" what was in its training data. Ask it about your company's internal docs and it will confidently make something up. **RAG** fixes this by letting the model *look things up* before it answers.

The mechanics:

1. **Embeddings** turn text into vectors — lists of numbers where *similar meaning* lands in *nearby space*.
2. A **vector database** (FAISS for local/in-memory, Pinecone for managed cloud) stores those vectors and finds the nearest matches to a query in milliseconds.
3. **RAG** stitches it together: embed the question → retrieve the most relevant chunks → hand them to the LLM as context → generate a grounded, citable answer.

This is the difference between a model that *guesses* and one that *cites*.

**Chunking** is the unglamorous skill that makes or breaks RAG. Split documents too big and you bury the signal; too small and you lose context. Start with semantic or sentence-aware chunking and overlap, then tune against real questions.

**Do this week:** build a "chat with your PDF" — embed a document, store it, retrieve, and answer. It's the single most clarifying project in this whole roadmap.

**Primary resources**
- Vector databases, FAISS & Pinecone — [video walkthrough](https://www.youtube.com/watch?v=sKyvsdEv6rk)
- Use cases & implementation — [Hugging Face NLP course: semantic search](https://huggingface.co/learn/nlp-course/chapter5/6?fw=tf)
- Working & philosophy of RAG — [video explainer](https://www.youtube.com/watch?v=Ylz779Op9Pw)
- Chunking techniques — [Five levels of chunking strategies in RAG](https://medium.com/@anuragmishra_27746/five-levels-of-chunking-strategies-in-rag-notes-from-gregs-video-7b735895694d)

---

## Week 3 — Tools & Frameworks for LLMs

You *can* wire everything by hand, but frameworks save weeks. **LangChain** is the common entry point — it standardises prompts, model calls, retrievers, memory, and tool use into composable pieces.

What to learn, in order:

- **Why a framework at all** — the glue between models, data, and tools.
- **Core components** — prompts, chains, retrievers, memory, output parsers.
- **LCEL** (LangChain Expression Language) — a clean, pipe-style way to compose chains that stream and run in parallel for free.
- **LangChain vs. LlamaIndex** — LlamaIndex leans hard into *data/indexing*; LangChain leans into *orchestration*. Many production stacks use both.
- **Multi-agent systems** — the step beyond a single chain, where multiple specialised LLM "workers" collaborate. This is the on-ramp to the agentic world (more below).

**Do this week:** rebuild last week's RAG app using a framework. Notice how much boilerplate disappears.

**Primary resources**
- Overview of LangChain — [LangChain introduction](https://python.langchain.com/v0.2/docs/introduction/)
- Key features & components — [LangChain introduction](https://python.langchain.com/v0.2/docs/introduction/)
- Common use cases & applications — [LangChain cookbook](https://python.langchain.com/v0.1/docs/cookbook/)
- Integration with other tools — [LangChain tool integrations](https://python.langchain.com/v0.2/docs/integrations/tools/)
- LangChain vs. LlamaIndex — [comparing the two across 4 tasks](https://lmy.medium.com/comparing-langchain-and-llamaindex-with-4-tasks-2970140edf33)
- Introduction to LCEL — [LangChain Expression Language](https://python.langchain.com/v0.1/docs/expression_language/)
- Multi-agent systems — [LangGraph multi-agent workflows](https://blog.langchain.dev/langgraph-multi-agent-workflows/)

---

## Week 4 — Fine-Tuning LLMs and Prompt Optimisation

Now you specialise. There's a ladder of effort here — climb it only as far as you need:

- **Zero-shot / few-shot prompting** — change behaviour with *words alone*. Always try this first. Few-shot (showing a handful of examples in the prompt) is shockingly powerful and costs nothing to train.
- **Fine-tuning** — actually updating model weights on your data. Reach for it when prompting plateaus, you need a consistent style/format, or you're distilling a big model into a small fast one.
- **Distributed training & training frameworks** — once datasets and models get large, you'll need to train across multiple GPUs/nodes. Know that this layer exists before you need it.
- **Prompt optimisation** (including approaches like **RLPrompt**) — treating the prompt itself as something you can *search and optimise*, not just hand-write.

**Rule of thumb:** prompt before you fine-tune; fine-tune before you pre-train. Most teams never need the last one.

**Do this week:** take one task and solve it three ways — zero-shot, few-shot, then a small fine-tune — and compare cost, quality, and effort.

**Primary resources**
- Techniques & best practices:
  - [Fine-tuning](https://www.youtube.com/watch?v=eC6Hd1hFvos) · [Zero-shot & few-shot](https://www.youtube.com/watch?v=ppC9ruaVuQQ)
  - [Distributed training](https://www.youtube.com/watch?v=V1ezlL-MVyU) · [Frameworks for training](https://www.youtube.com/watch?v=MDA3LUKNl1E)
- Introduction to RLPrompt — [arXiv:2205.12548](https://arxiv.org/abs/2205.12548)
- Strategies for optimizing prompts — [Prompt Engineering Guide](https://www.promptingguide.ai/)

---

## Week 5 — Deployment Strategies and Scaling

A notebook demo is not a product. Shipping LLMs means thinking about **latency, cost, and reliability** as first-class concerns.

Focus areas:

- **Deploying on the cloud** — managed model endpoints vs. self-hosted open-weight models; the trade-off is control vs. operational burden.
- **Serving & deployment tooling** — containerisation, autoscaling, and inference servers built for token streaming.
- **Scaling techniques** — caching repeated queries, batching requests, quantising models to run cheaper, and routing easy queries to small models and hard ones to large models.

**Do this week:** put your RAG app behind an API endpoint, add response caching, and measure p95 latency before and after.

**Primary resources**
- Deploying on the cloud, deployment tooling & scaling — [DeepLearning.AI: LLMOps short course](https://www.deeplearning.ai/short-courses/llmops/)

---

## Week 6 — Evaluation, Guardrails & Responsible AI

This is the week that separates a hobby project from something you'd put in front of users.

- **Evaluation** — "looks good" doesn't scale. Use eval frameworks to measure groundedness, relevance, and faithfulness on a held-out set. Treat your prompts and chains like code: version them, test them, track regressions.
- **Guardrails** — input/output filters, PII redaction, topical boundaries, and grounding checks that stop the model going off the rails.
- **Responsible AI** — fairness, transparency, provenance, and human oversight aren't compliance theatre; they're what make a system trustworthy enough to deploy.
- **Advanced prompting** — chain-of-thought, self-critique, and structured output to squeeze out more reliability.

**Do this week:** write 20 test questions for your RAG app, define what a "good" answer looks like, and run an automated eval. You'll be surprised what breaks.

**Primary resources**
- Frameworks for evaluating LLMs — [LangChain evaluation guide](https://python.langchain.com/v0.1/docs/guides/productionization/evaluation/)
- Implementing guardrails — [Security guardrails for LLMs](https://www.turing.com/resources/implementing-security-guardrails-for-llms)
- Responsible AI best practices — [Google's Responsible AI practices](https://ai.google/responsibility/responsible-ai-practices/)
- Advanced prompting techniques — [Prompt Engineering Guide](https://www.promptingguide.ai/)

---

## The Leap: From RAG to Agents

RAG gives a model **knowledge**. Agents give it **agency**.

An *agent* is an LLM that doesn't just answer — it decides what to *do*: which tool to call, whether to search again, when it's actually finished. The canonical pattern is **ReAct** — the model interleaves a **thought** ("I need the latest revenue figure"), an **action** (call a tool / run a query), and an **observation** (the result), looping until it has what it needs.

A useful distinction (one Anthropic draws well): **workflows** are LLM steps wired together along *predefined* paths, while **agents** *dynamically* direct their own process. Workflows are predictable and cheap; agents are flexible and powerful — and harder to control. **Start with the simplest thing that works**, and add agency only when the problem genuinely needs it.

Multi-agent systems — specialised agents collaborating, often orchestrated with something like LangGraph — are where this is all heading. But you'll build far better agents *because* you understood encoders, retrieval, and evaluation first. That's the whole point of doing this in order.

---

## How to Actually Use This Roadmap

- **Build at every stage.** Reading about RAG teaches you the words; building a "chat with your docs" teaches you the thing.
- **Don't skip evaluation.** It feels optional right up until it isn't.
- **Climb the effort ladder slowly.** Prompt → retrieve → fine-tune → train. Most problems are solved long before the top.

Six weeks won't make you an expert — but it will make you *dangerous* in the best way: able to reason about the whole stack and build things that actually work.

---

## Further Reading & Sources

The roadmap above is distilled from a learning plan I put together in 2024, expanded with the references below. I've leaned the deeper citations toward **RAG** and **agentic** systems, since that's where most beginners get stuck.

### Foundations & Architecture
- Vaswani et al., *Attention Is All You Need* (2017) — the Transformer paper that started it all. <https://arxiv.org/abs/1706.03762>
- Devlin et al., *BERT* (2018) — the canonical encoder. <https://arxiv.org/abs/1810.04805>
- Brown et al., *Language Models are Few-Shot Learners* (GPT-3, 2020) — why few-shot prompting works. <https://arxiv.org/abs/2005.14165>
- Jay Alammar, *The Illustrated Transformer* — the best visual intuition for beginners. <https://jalammar.github.io/illustrated-transformer/>

### Retrieval-Augmented Generation (RAG)
- Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (2020) — the original RAG paper. <https://arxiv.org/abs/2005.11401>
- Asai et al., *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection* (2023) — RAG that decides *when* to retrieve and critiques its own output. <https://arxiv.org/abs/2310.11511>
- *Retrieval-Augmented Generation for NLP: A Survey* (2024) — a broad, current map of RAG techniques. <https://arxiv.org/abs/2407.13193>

### Agents & Agentic Systems
- Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models* (2022) — the thought→action→observation loop. <https://arxiv.org/abs/2210.03629>
- Schick et al., *Toolformer: Language Models Can Teach Themselves to Use Tools* (2023) — how models learn to call tools. <https://arxiv.org/abs/2302.04761>
- Anthropic, *Building Effective Agents* (2024) — the most practical guide to workflows vs. agents and the patterns that work. <https://www.anthropic.com/research/building-effective-agents>
- LangGraph documentation — building multi-agent workflows in practice. <https://langchain-ai.github.io/langgraph/>

*This is the first in a series. Next up: a hands-on build of the "chat with your docs" RAG app referenced in Week 2.*
