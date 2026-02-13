// app/components/ActionExecutor.jsx
'use client';

import { useEffect, useRef } from 'react';
import './ActionExecutor.css';

/**
 * ActionExecutor Component
 * Executes tool calls decided by the AI
 */
export default function ActionExecutor({ toolCall, onActionComplete }) {
  const actionInProgress = useRef(false);

  useEffect(() => {
    if (!toolCall || actionInProgress.current) return;

    const executeAction = async () => {
      actionInProgress.current = true;
      const { name, parameters } = toolCall;
      let result = { success: false, message: '', name };

      try {
        switch (name) {
          case 'scroll_to_section':
            result = await scrollToSection(parameters.section);
            break;
          case 'scroll_page':
            result = await scrollPage(parameters.direction, parameters.amount);
            break;
          case 'highlight_element':
            result = await highlightElement(parameters.selector, parameters.duration);
            break;
          case 'fill_input':
            result = await fillInput(parameters.selector, parameters.value);
            break;
          case 'click_element':
            result = await clickElement(parameters.selector);
            break;
          case 'focus_element':
            result = await focusElement(parameters.selector);
            break;
          case 'extract_website_content':
            result = await extractWebsiteContent(parameters.section, parameters.includeAttributes);
            break;
          case 'get_page_content':
            result = await getPageContent(parameters.section);
            break;
          case 'get_element_info':
            result = await getElementInfo(parameters.selector);
            break;
          case 'query_element':
            result = await queryElement(parameters.selector, parameters.getCount);
            break;
          default:
            result = { success: false, message: `Unknown action: ${name}`, name };
        }
      } catch (error) {
        result = { success: false, message: error.message, name };
      }

      actionInProgress.current = false;
      if (onActionComplete) onActionComplete(result);
    };

    executeAction();
  }, [toolCall, onActionComplete]);

  const scrollToSection = (sectionId) => new Promise((resolve) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      resolve({ success: false, message: `Section "${sectionId}" not found`, name: 'scroll_to_section' });
      return;
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      resolve({ success: true, message: `Scrolled to ${sectionId}`, name: 'scroll_to_section' });
    }, 800);
  });

  const scrollPage = (direction, amount = 500) => new Promise((resolve) => {
    switch (direction) {
      case 'up':
        window.scrollBy({ top: -amount, behavior: 'smooth' });
        break;
      case 'down':
        window.scrollBy({ top: amount, behavior: 'smooth' });
        break;
      case 'top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'bottom':
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        break;
      default:
        resolve({ success: false, message: `Invalid direction: ${direction}`, name: 'scroll_page' });
        return;
    }
    setTimeout(() => {
      resolve({ success: true, message: `Scrolled ${direction}`, name: 'scroll_page' });
    }, 500);
  });

  const highlightElement = (selector, duration = 3000) => new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (!element) {
      resolve({ success: false, message: `Element "${selector}" not found`, name: 'highlight_element' });
      return;
    }
    element.classList.add('ai-highlighted');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      element.classList.remove('ai-highlighted');
      resolve({ success: true, message: `Highlighted ${selector}`, name: 'highlight_element' });
    }, duration);
  });

  const fillInput = (selector, value) => new Promise((resolve) => {
    const input = document.querySelector(selector);
    if (!input || (input.tagName !== 'INPUT' && input.tagName !== 'TEXTAREA')) {
      resolve({ success: false, message: `Invalid input: ${selector}`, name: 'fill_input' });
      return;
    }
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      input.focus();
      let i = 0;
      const type = setInterval(() => {
        if (i < value.length) {
          input.value += value[i++];
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
          clearInterval(type);
          input.classList.add('ai-filled');
          setTimeout(() => input.classList.remove('ai-filled'), 2000);
          resolve({ success: true, message: `Filled ${selector}`, name: 'fill_input' });
        }
      }, 50);
    }, 500);
  });

  const clickElement = (selector) => new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (!element) {
      resolve({ success: false, message: `Element "${selector}" not found`, name: 'click_element' });
      return;
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      element.classList.add('ai-clicking');
      setTimeout(() => {
        element.click();
        element.classList.remove('ai-clicking');
        resolve({ success: true, message: `Clicked ${selector}`, name: 'click_element' });
      }, 300);
    }, 500);
  });

  const focusElement = (selector) => new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (!element) {
      resolve({ success: false, message: `Element "${selector}" not found`, name: 'focus_element' });
      return;
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      element.classList.add('ai-focused');
      setTimeout(() => element.classList.remove('ai-focused'), 3000);
      resolve({ success: true, message: `Focused ${selector}`, name: 'focus_element' });
    }, 500);
  });

  const extractWebsiteContent = (sectionId = null, includeAttributes = false) => new Promise((resolve) => {
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (!section) {
        resolve({ success: false, message: `Section "${sectionId}" not found`, name: 'extract_website_content' });
        return;
      }
      resolve({
        success: true,
        message: 'Content extracted',
        name: 'extract_website_content',
        data: extractStructuredContent(section, includeAttributes)
      });
    } else {
      const sections = document.querySelectorAll('.section');
      const data = {};
      sections.forEach(s => {
        data[s.id || 'unknown'] = extractStructuredContent(s, includeAttributes);
      });
      resolve({ success: true, message: 'Extracted all sections', name: 'extract_website_content', data });
    }
  });

  const extractStructuredContent = (element, includeAttributes = false) => {
    const content = {
      text: element.innerText || element.textContent,
      html: element.innerHTML.substring(0, 500),
      childCount: element.children.length
    };
    if (includeAttributes) {
      content.attributes = {};
      Array.from(element.attributes).forEach(attr => {
        content.attributes[attr.name] = attr.value;
      });
    }
    return content;
  };

  const getPageContent = (sectionId = null) => new Promise((resolve) => {
    let content = '';
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (!section) {
        resolve({ success: false, message: `Section "${sectionId}" not found`, name: 'get_page_content' });
        return;
      }
      content = `=== ${sectionId.toUpperCase()} ===\n${section.innerText}`;
    } else {
      document.querySelectorAll('.section').forEach(s => {
        const id = s.id || 'unknown';
        content += `=== ${id.toUpperCase()} ===\n${s.innerText}\n\n`;
      });
    }
    resolve({ success: true, message: 'Content extracted', name: 'get_page_content', data: content });
  });

  const getElementInfo = (selector) => new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (!element) {
      resolve({ success: false, message: `Element "${selector}" not found`, name: 'get_element_info' });
      return;
    }
    const info = {
      tagName: element.tagName,
      textContent: element.textContent?.substring(0, 200),
      attributes: {},
      visible: element.offsetParent !== null,
      dimensions: { width: element.offsetWidth, height: element.offsetHeight }
    };
    Array.from(element.attributes).forEach(attr => {
      info.attributes[attr.name] = attr.value;
    });
    resolve({ success: true, message: 'Info retrieved', name: 'get_element_info', data: info });
  });

  const queryElement = (selector, getCount = false) => new Promise((resolve) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      resolve({ success: false, message: `No elements found for ${selector}`, name: 'query_element' });
      return;
    }
    if (getCount) {
      resolve({
        success: true,
        message: `Found ${elements.length} elements`,
        name: 'query_element',
        data: { count: elements.length, selector }
      });
      return;
    }
    const elementsInfo = Array.from(elements).map((el, idx) => ({
      index: idx,
      tagName: el.tagName,
      text: el.textContent?.substring(0, 100),
      id: el.id || null,
      classes: Array.from(el.classList)
    }));
    resolve({
      success: true,
      message: `Found ${elements.length} elements`,
      name: 'query_element',
      data: { count: elements.length, selector, elements: elementsInfo }
    });
  });

  return null;
}
