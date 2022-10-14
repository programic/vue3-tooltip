import type { Component } from 'vue';
import type { Placement } from './tooltip';

export interface ContainerConfiguration {
  enabled: boolean;
  ref: string | HTMLDivElement;
}

export interface TooltipConfiguration {
  container?: ContainerConfiguration | boolean;
  template?: string | Component;
  placement?: Placement;
}
