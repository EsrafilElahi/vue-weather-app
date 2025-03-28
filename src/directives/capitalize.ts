import type { Directive } from "vue"


export function capitalizeElementText(element: HTMLElement) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null
  );

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node?.textContent) {
      node.textContent = node.textContent.replace(/\b\w/g, char => char.toUpperCase());
    }
  }
}

export const capitalizeDirective: Directive = {
  mounted(el) {
    capitalizeElementText(el);
  },

  updated(el) {
    capitalizeElementText(el);
  },
}
