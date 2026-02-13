// lib/tools.js
// Tool definitions for Gemini function calling
// These tools allow the AI to interact with the website without direct DOM manipulation

export const tools = [
  {
    name: 'scroll_to_section',
    description: 'Smoothly scroll the page to a specific section. Use this when user wants to navigate to different parts of the portfolio.',
    parameters: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'Section ID to scroll to. Available sections: hero, about, skills, projects, experience, contact',
          enum: ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
        }
      },
      required: ['section']
    }
  },
  {
    name: 'highlight_element',
    description: 'Highlight and draw attention to a specific element on the page with a glowing animation.',
    parameters: {
      type: 'object',
      properties: {
        selector: {
          type: 'string',
          description: 'CSS selector of the element to highlight (e.g., "#projects .project-card:first-child", ".skill-tag")'
        },
        duration: {
          type: 'number',
          description: 'Duration in milliseconds to keep the highlight (default: 3000)',
          default: 3000
        }
      },
      required: ['selector']
    }
  },
  {
    name: 'fill_input',
    description: 'Fill a form input field with specified text. Useful for helping users fill out contact forms.',
    parameters: {
      type: 'object',
      properties: {
        selector: {
          type: 'string',
          description: 'CSS selector of the input field (e.g., "#contact-email", "#contact-name")'
        },
        value: {
          type: 'string',
          description: 'The text value to fill into the input field'
        }
      },
      required: ['selector', 'value']
    }
  },
  {
    name: 'click_element',
    description: 'Click on a specific element like a button or link.',
    parameters: {
      type: 'object',
      properties: {
        selector: {
          type: 'string',
          description: 'CSS selector of the element to click'
        }
      },
      required: ['selector']
    }
  },
  {
    name: 'extract_website_content',
    description: 'Dynamically extract structured content from the website. This tool allows you to read the current state of the page and get detailed information about specific sections or elements.',
    parameters: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'Optional: specific section ID to extract from (e.g., "projects", "skills"). If not provided, extracts all visible sections.'
        },
        includeAttributes: {
          type: 'boolean',
          description: 'Whether to include HTML attributes in the extraction (default: false)',
          default: false
        }
      }
    }
  },
  {
    name: 'get_page_content',
    description: 'Extract and return text content from the current page or a specific section.',
    parameters: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'Optional: specific section ID to get content from. If not provided, returns all visible content.'
        }
      }
    }
  },
  {
    name: 'scroll_page',
    description: 'Scroll the page up or down by a specific amount or direction.',
    parameters: {
      type: 'object',
      properties: {
        direction: {
          type: 'string',
          description: 'Direction to scroll',
          enum: ['up', 'down', 'top', 'bottom']
        },
        amount: {
          type: 'number',
          description: 'Scroll amount in pixels (optional, default: 500)'
        }
      },
      required: ['direction']
    }
  },
  {
    name: 'focus_element',
    description: 'Focus on a specific element and zoom/center it in the viewport.',
    parameters: {
      type: 'object',
      properties: {
        selector: {
          type: 'string',
          description: 'CSS selector of the element to focus on'
        }
      },
      required: ['selector']
    }
  },
  {
    name: 'get_element_info',
    description: 'Get detailed information about a specific element (text content, attributes, visibility).',
    parameters: {
      type: 'object',
      properties: {
        selector: {
          type: 'string',
          description: 'CSS selector of the element to inspect'
        }
      },
      required: ['selector']
    }
  },
  {
    name: 'query_element',
    description: 'Query the DOM to find elements matching a selector and get their information.',
    parameters: {
      type: 'object',
      properties: {
        selector: {
          type: 'string',
          description: 'CSS selector to query (e.g., ".project-card", "[data-project]")'
        },
        getCount: {
          type: 'boolean',
          description: 'If true, returns count of matching elements (default: false)',
          default: false
        }
      },
      required: ['selector']
    }
  }
];

// Format tools for Gemini 2.5 API
export const toolsDeclaration = {
  function_declarations: tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters
  }))
};

// Exports for reference
export const toolNames = tools.map(t => t.name);