from abc import ABC, abstractmethod

class RuleGenerator(ABC):
    """Abstract base class for rule generators"""
    
    @abstractmethod
    def generate_basic_rules(self, market_type, question):
        """Generate basic rules"""
        pass
    
    @abstractmethod
    def detect_loopholes(self, rules, market_type, question):
        """Detect loopholes in rules"""
        pass
    
    @abstractmethod
    def fix_loopholes(self, rules, loopholes, market_type, question):
        """Fix loopholes in rules"""
        pass
    
    @abstractmethod
    def fix_single_loophole_with_changes(self, rules, loopholes, market_type, question):
        """Fix a single loophole in rules and return changes information"""
        pass
    
    @abstractmethod
    def recommend_data_sources(self, market_type, question, rules=None):
        """Recommend data sources"""
        pass
    
    def generate_complete_rules(self, market_type, question, detect_loopholes=True, recommend_sources=True):
        """
        Generate complete rules, including loophole detection and data source recommendations
        
        Parameters:
        -----------
        market_type : str
            Market type ('binary', 'categorical', or 'numeric')
        question : str
            Market question
        detect_loopholes : bool
            Whether to detect and fix loopholes
        recommend_sources : bool
            Whether to recommend data sources
            
        Returns:
        --------
        dict
            Dictionary containing rules and metadata
        """
        # Generate basic rules
        basic_rules = self.generate_basic_rules(market_type, question)
        result = {"basic_rules": basic_rules}
        
        # Detect and fix loopholes
        if detect_loopholes:
            loopholes = self.detect_loopholes(basic_rules, market_type, question)
            if loopholes:
                fixed_rules = self.fix_loopholes(basic_rules, loopholes, market_type, question)
                result["loopholes"] = loopholes
                result["fixed_rules"] = fixed_rules
                final_rules = fixed_rules
            else:
                result["loopholes"] = []
                final_rules = basic_rules
        else:
            final_rules = basic_rules
        
        # Recommend data sources
        if recommend_sources:
            data_sources = self.recommend_data_sources(market_type, question, final_rules)
            result["data_sources"] = data_sources
        
        result["final_rules"] = final_rules
        return result
