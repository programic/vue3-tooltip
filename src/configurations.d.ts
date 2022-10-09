import type { ComponentDefinition } from 'vue';
import type { Placement } from './index.d';

export interface ContainerConfiguration {
  enabled: boolean;
  ref: string | HTMLDivElement;
}

export interface TooltipConfiguration {
  container?: ContainerConfiguration | boolean;
  template?: string | ComponentDefinition;
  placement?: Placement;
}
