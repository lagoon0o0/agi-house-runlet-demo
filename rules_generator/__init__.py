from .base import RuleGenerator
from .claude import ClaudeRuleGenerator

__all__ = ['RuleGenerator', 'ClaudeRuleGenerator', 'create_generator']

def create_generator(generator_type='claude', **kwargs):
    """
    Factory function to create a rule generator instance
    
    Parameters:
    -----------
    generator_type : str
        Generator type ('claude', can be extended for other types in the future)
    **kwargs : 
        Parameters to pass to the generator
        
    Returns:
    --------
    RuleGenerator
        Rule generator instance
    """
    if generator_type.lower() == 'claude':
        return ClaudeRuleGenerator(**kwargs)
    else:
        raise ValueError(f"Unsupported generator type: {generator_type}")
