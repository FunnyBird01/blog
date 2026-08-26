---
title: "agent"
date: 2026-08-11 15:38:09
cover: https://cdn.jsdelivr.net/gh/FunnyBird01/hexo-images@main/img/20260810152442454.png
categories:
  - agent
---
# 《LLM Powered Autonomous Agents》llm—agent经典构架
Lilian Weng的《LLM Powered Autonomous Agents》llm—agent经典构架
Agent = LLM + planning + memory + tool use
## Planning：
 -  子目标与分解：智能体将大型任务分解为更小、更易于管理的子目标，从而能够高效地处理复杂任务。
 -  反思与改进：智能体能够对过去的行动进行自我批评和反思，从错误中吸取教训并改进后续步骤，从而提高最终结果的质量。
## Memory：
 -  short-term memory：所有上下文学习都利用了模型的短期记忆进行学习。
 -  long-term memory：这赋予智能体在较长时间内保留和回忆（无限）信息的能力，通常是通过利用外部向量存储和快速检索来实现的。

## Tool use：
agent调用外部 API 来获取模型权重中缺失的额外信息（预训练后通常很难更改），包括当前信息、代码执行能力、对专有信息源的访问权限等等。

# Function-Calling
## 定义
< Function‑Calling 即工具函数调用能力，大模型识别用户需求之后，可以自主判断什么时候调用自定义工具函数、生成函数入参，执行外部工具，再接收返回结果，接着接着继续回答用户问题，补齐大模型本身的短板。
## 原理
1. 你提前向大模型注册工具清单：函数名称、功能描述、入参参数格式；
2. 大模型识别用户需求，判断是否需要调用工具函数。
3. 如果需要调用工具函数，大模型会生成函数调用的 JSON 字符串，包含函数名、参数等信息。
4. 大模型将 JSON 字符串发送给外部工具函数，执行函数。
5. 大模型接收工具函数的返回结果，将其转换为 JSON 字符串。
6. 大模型将 JSON 字符串发送给用户，用户可以根据 JSON 字符串继续回答问题。
