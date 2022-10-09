import { createApp, h } from 'vue';
import type { App, VNodeArrayChildren } from 'vue';
import Tooltip from './Tooltip.vue';
import type { TooltipConfiguration } from './configurations.d';

export default {
  install: (app: App, options: TooltipConfiguration): void => {
    if (
      (typeof options?.container === 'object' && options?.container?.enabled !== false)
      || options?.container !== false
    ) {
      let containerId = 'tooltip-container';
      let tooltipRootElement = document.createElement('div');

      if (typeof options?.container === 'object' && typeof options?.container?.ref === 'string') {
        containerId = options?.container?.ref;
      }

      tooltipRootElement.setAttribute('id', containerId);

      if (
        typeof options?.container === 'object'
        && options?.container?.ref instanceof HTMLDivElement
      ) {
        tooltipRootElement = options?.container?.ref;
      }

      document.body.append(tooltipRootElement);
    }

    app.config.globalProperties.$tooltipOptions = options;
    app.provide('tooltipOptions', options);

    app.directive('tooltip', {
      mounted(element: HTMLElement, _, vnode) {
        const children = vnode.children as VNodeArrayChildren;

        const wrappedChildren = children.map(child => {
          return h('span', null, [child]);
        });
        const tooltipElement = h(Tooltip, { class: 'tooltip', title: _.value }, wrappedChildren);

        createApp(tooltipElement).mount(element);
      },
    });
  },
};
