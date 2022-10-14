/* eslint-disable-next-line import/no-extraneous-dependencies */
import { createApp, h } from 'vue';
import { v4 as uuid } from 'uuid';
import Tooltip from './Tooltip.vue';

import type {
App,
Plugin,
DirectiveBinding,
VNode,
} from 'vue';

import type { ContainerConfiguration, TooltipConfiguration } from './types/configurations';
import type {
  TooltipButtonClick,
  TooltipButton,
  TriggerOptions,
  Sizes,
  Types,
  Placement,
  TooltipOptions,
} from './types/tooltip';

const plugin: Plugin = {
  install: (app: App, options: TooltipConfiguration = {}): void => {
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

    const tooltips: Record<string, App> = {};

    app.directive('tooltip', {
      mounted(element: HTMLElement, binding: DirectiveBinding, vNode: VNode) {
        const tooltipId = uuid();
        const tooltipElement = h(Tooltip, {
          id: tooltipId,
          title: binding.value,
        }, {
          default: () => vNode.children,
        });

        element.dataset.tooltipId = tooltipId;
        const tooltip = createApp(tooltipElement);
        tooltip.mount(element);

        tooltips[tooltipId] = tooltip;
      },

      unmounted(element: HTMLElement) {
        const tooltipId = element.dataset.tooltipId;

        if (tooltipId) {
          tooltips[tooltipId]?.unmount();
        }
      },
    });
  },
};

export default plugin;

export type {
 ContainerConfiguration,
  TooltipConfiguration,
  TooltipButtonClick,
  TooltipButton,
  TriggerOptions,
  Sizes,
  Types,
  Placement,
  TooltipOptions,
};
export { Tooltip };
