from anthropic import Anthropic
import os
import json
from dotenv import load_dotenv
from .base import RuleGenerator
from .templates import (
    BASIC_RULES_TEMPLATE,
    LOOPHOLE_DETECTION_TEMPLATE,
    LOOPHOLE_FIX_TEMPLATE,
    LOOPHOLE_FIX_WITH_CHANGES_TEMPLATE,
    DATA_SOURCE_TEMPLATE
)

# Load environment variables from .env file
load_dotenv()

class ClaudeRuleGenerator(RuleGenerator):
    """Rule generator implementation using Claude API"""
    
    def __init__(self, api_key=None, model="claude-3-7-sonnet-20250219"):
        """
        Initialize Claude rule generator
        
        Parameters:
        -----------
        api_key : str, optional
            Anthropic API key, if None it will be retrieved from environment variables
        model : str, optional
            Claude model to use
        """
        self.api_key = api_key or os.environ.get("ANTHROPIC_API_KEY")
        if not self.api_key:
            raise ValueError("Anthropic API key not provided")
        
        self.client = Anthropic(api_key=self.api_key)
        self.model = model
    
    def _call_claude(self, prompt, max_tokens=1000):
        """Call Claude API with the given prompt"""
        response = self.client.messages.create(
            model=self.model,
            max_tokens=max_tokens,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        return response.content[0].text
    
    def generate_basic_rules(self, market_type, question):
        """
        Generate basic rules
        
        Parameters:
        -----------
        market_type : str
            Market type ('binary', 'categorical', or 'numeric')
        question : str
            Market question
            
        Returns:
        --------
        str
            Generated rules
        """
        prompt = BASIC_RULES_TEMPLATE.format(
            market_type=market_type.upper(),
            market_type_explanation=self._get_market_type_explanation(market_type),
            question=question
        )
        return self._call_claude(prompt)
    
    def detect_loopholes(self, rules, market_type, question):
        """
        Detect loopholes in rules
        
        Parameters:
        -----------
        rules : str
            Rules to check for loopholes
        market_type : str
            Market type
        question : str
            Market question
            
        Returns:
        --------
        list
            List of detected loopholes
        """
        prompt = LOOPHOLE_DETECTION_TEMPLATE.format(
            rules=rules,
            market_type=market_type,
            question=question
        )
        response = self._call_claude(prompt)
        
        try:
            # Parse the JSON response
            loopholes = json.loads(response)
            return loopholes
        except json.JSONDecodeError:
            # If the response is not valid JSON, return an empty list
            return []
    
    def fix_loopholes(self, rules, loopholes, market_type, question):
        """
        Fix loopholes in rules
        
        Parameters:
        -----------
        rules : str
            Original rules
        loopholes : list
            Detected loopholes
        market_type : str
            Market type
        question : str
            Market question
            
        Returns:
        --------
        str
            Fixed rules
        """
        # Convert loopholes to string if it's a list or dict
        if isinstance(loopholes, (list, dict)):
            loopholes_str = json.dumps(loopholes, indent=2)
        else:
            loopholes_str = str(loopholes)
            
        prompt = LOOPHOLE_FIX_TEMPLATE.format(
            original_rules=rules,
            loopholes=loopholes_str,
            market_type=market_type,
            question=question
        )
        return self._call_claude(prompt)
    
    def fix_single_loophole_with_changes(self, rules, loopholes, market_type, question):
        """
        Fix a single loophole in rules and return changes information
        
        Parameters:
        -----------
        rules : str
            Original rules
        loopholes : list
            Detected loopholes (should contain only one loophole)
        market_type : str
            Market type
        question : str
            Market question
            
        Returns:
        --------
        dict
            Dictionary containing fixed rules and changes
        """
        # Convert loopholes to string if it's a list or dict
        if isinstance(loopholes, (list, dict)):
            loopholes_str = json.dumps(loopholes, indent=2)
        else:
            loopholes_str = str(loopholes)
            
        prompt = LOOPHOLE_FIX_WITH_CHANGES_TEMPLATE.format(
            original_rules=rules,
            loopholes=loopholes_str,
            market_type=market_type,
            question=question
        )
        response = self._call_claude(prompt, max_tokens=2000)
        
        try:
            # Parse the JSON response
            result = json.loads(response)
            return result
        except json.JSONDecodeError:
            # If the response is not valid JSON, return just the text as fixed rules
            return {
                "fixed_rules": response,
                "changes": []
            }
    
    def recommend_data_sources(self, market_type, question, rules=None):
        """
        Recommend data sources
        
        Parameters:
        -----------
        market_type : str
            Market type
        question : str
            Market question
        rules : str, optional
            Generated rules
            
        Returns:
        --------
        dict
            Recommended data sources
        """
        prompt = DATA_SOURCE_TEMPLATE.format(
            market_type=market_type,
            question=question,
            rules=rules or ""
        )
        response = self._call_claude(prompt)
        
        try:
            # Parse the JSON response
            data_sources = json.loads(response)
            return data_sources
        except json.JSONDecodeError:
            # If the response is not valid JSON, return a basic structure
            return {
                "primary_sources": [],
                "backup_sources": [],
                "conflict_resolution": "Unable to parse response",
                "recommendations": "Unable to parse response"
            }
    
    def _get_market_type_explanation(self, market_type):
        """Get explanation for market type"""
        explanations = {
            "binary": "Binary means there are only two answers, Yes or No",
            "categorical": "Categorical means there are multiple answers, but ONLY one can resolve yes, (while the rest resolve no, or alternatively the entire market resolves N/A if a precondition is not met) e.g. Who will win the presidential election?, Who will be the first to express interest in buying twitter?",
            "numeric": "Numeric mean there are multiple answers over a predefined range of numbers but ONLY one can resolve yes. each answer is a number or a range. (e.g. Elon Musk # of tweets Feb 28 - Mar 7?)"
        }
        return explanations.get(market_type.lower(), "")
