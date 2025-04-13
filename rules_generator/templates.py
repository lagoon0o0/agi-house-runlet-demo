# Basic rules generation template - using the existing prompt from the current implementation
BASIC_RULES_TEMPLATE = """You are a helpful AI assistant that generates detailed descriptions for prediction markets. Your goal is to provide relevant context, background information, and clear resolution criteria that will help traders make informed predictions. Their market is of type {market_type}

{market_type_explanation}

Guidelines:

Don't repeat the question in the rules.
Clearly state how the market will be resolved.
If the user supplied answers, provide any relevant background information for each answer.
Try to think of likely edge cases that traders should be aware of, mention them in the rules and how the market will be resolved in those cases
Focus on objective facts rather than opinions

Format the response as markdown, with the following structure:
The first part is how the market will be resolved, include any special resolution criteria for likely edge cases.
The second part is the data source, be precise about the data source, only use credible sources, and provide a link if possible.
Please verify the link is working before submitting the response.
If multiple data sources are used, at least include at least 3 sources (and the number of sources should be odd number) and specify the majority rule in case of conflicting information.
If the question is about a company's stock price, then use the company stock's priamry exchange as the data source.

Instructions about the markdown format:
resolution criteria should use # heading
edge cases should use ## heading
data source should use # heading
Use - list when possible
Use [link](url) for links


Don't include any additional information that is not relevant to the market resolution.

The question for this market is: {question}

Please generate the market description following the above guidelines."""

# Loophole detection template
LOOPHOLE_DETECTION_TEMPLATE = """You are an expert in prediction markets who specializes in finding loopholes and ambiguities in market rules. Your task is to analyze the following prediction market rules and identify any potential loopholes, ambiguities, or edge cases that could lead to disputes or manipulation.

Market Type: {market_type}
Market Question: {question}

Rules:
{rules}

Please identify and explain any potential issues with these rules, such as:
1. Ambiguous terms or conditions that could be interpreted in multiple ways
2. Missing edge cases that aren't addressed
3. Potential for manipulation or gaming the system
4. Unclear resolution criteria
5. Timing issues or other technical concerns

Format your response as a JSON array of objects, where each object represents a potential loophole or issue:
[
  {{
    "issue": "Brief description of the issue",
    "explanation": "Detailed explanation of why this is problematic",
    "example": "A concrete example of how this could be exploited or cause problems",
    "severity": "high/medium/low"
  }},
  ...
]

**CRITICAL INSTRUCTION:** You MUST analyze the rules thoroughly.
1.  If you identify any potential loopholes, ambiguities, edge cases, or areas for clarification, format them as JSON objects in an array as described above, with `severity` as "high", "medium", or "low".
2.  **If, after careful analysis, you find NO loopholes or ambiguities**, DO NOT return an empty array `[]`. Instead, return a JSON array containing ONE object that suggests an improvement by adding more detail to edge cases or data sources. This object MUST have the following structure:
    *   `"issue"`: Set to `"Suggestion: Add Detail"`
    *   `"explanation"`: Provide the specific text suggestion for the new edge case or data source detail (e.g., "Consider adding an edge case for scenario X." or "Specify the exact URL/publication for the data source.").
    *   `"example"`: (Optional) Provide context or reasoning for the suggestion.
    *   `"severity"`: Set to `"suggestion"`.

Your response MUST ALWAYS be a valid JSON array containing at least one object, either a detected loophole or a suggestion for improvement."""

# Loophole fix template
LOOPHOLE_FIX_TEMPLATE = """You are an expert in prediction markets who specializes in writing clear, unambiguous market rules. Your task is to improve the following prediction market rules by addressing the identified loopholes and issues.

Market Type: {market_type}
Market Question: {question}

Original Rules:
{original_rules}

Identified Issues:
{loopholes}

Please create an improved version of the rules that addresses all the identified issues. Make sure your revised rules:
1. Clarify any ambiguous terms or conditions
2. Address all identified edge cases
3. Prevent potential manipulation or gaming
4. Provide clear resolution criteria
5. Fix any timing issues or other technical concerns

Maintain the original markdown formatting, but improve the content to address all issues. Your response should be ONLY the revised rules, ready to be used directly in the prediction market."""

# Loophole fix with changes template
LOOPHOLE_FIX_WITH_CHANGES_TEMPLATE = """You are an expert in prediction markets who specializes in writing clear, unambiguous market rules. Your task is to improve the following prediction market rules by addressing the identified loopholes and issues.

Market Type: {market_type}
Market Question: {question}

Original Rules:
{original_rules}

Identified Issues:
{loopholes}

Please create an improved version of the rules that addresses the identified issue(s).
**Instructions:**
1.  **If the issue has `severity` "high", "medium", or "low"**: Treat it as a loophole/ambiguity. Revise the rules to address it by clarifying terms, adding missing edge cases, preventing manipulation, improving resolution criteria, or fixing technical concerns.
2.  **If the issue has `severity` "suggestion"**: Treat it as a suggestion to add detail. Integrate the text provided in the `explanation` field into the appropriate section of the rules (likely under an "Edge Cases" or "Data Source" heading).

Maintain the original markdown formatting, but improve the content based on the instruction above.

Your response should be in JSON format with the following structure:
{{
  "fixed_rules": "The complete fixed rules text",
  "changes": [
    {{
      "original": "The original text that was changed",
      "modified": "The new text that replaced it",
      "reason": "Brief explanation of why this change was made"
    }},
    ...
  ]
}}

Make sure to include ALL changes you made, even small ones. The "original" and "modified" fields should contain the exact text segments that were changed."""

# Data source recommendation template
DATA_SOURCE_TEMPLATE = """You are an expert in prediction markets who specializes in identifying reliable data sources for market resolution. Your task is to recommend the best data sources for resolving the following prediction market.

Market Type: {market_type}
Market Question: {question}
Current Rules (if available):
{rules}

Please recommend optimal data sources for resolving this market. Your recommendations should:
1. Prioritize authoritative, reliable, and publicly accessible sources
2. Include specific URLs or access methods where possible
3. Consider potential issues with data availability or reliability
4. Provide backup sources in case primary sources become unavailable
5. Address how to handle potential conflicts between sources

Format your response as a JSON object with the following structure:
{{
  "primary_sources": [
    {{
      "name": "Source name",
      "url": "Source URL if applicable",
      "description": "Why this is a good source",
      "access_method": "How to access/verify the data"
    }},
    ...
  ],
  "backup_sources": [
    {{
      "name": "Backup source name",
      "url": "Source URL if applicable",
      "description": "Why this is a good backup",
      "access_method": "How to access/verify the data"
    }},
    ...
  ],
  "conflict_resolution": "How to resolve conflicts between sources",
  "recommendations": "Overall recommendations for data sourcing for this market"
}}"""
