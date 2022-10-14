import type { Component } from 'vue';
import type { Placement as FloatingPlacement } from '@floating-ui/dom';

export type CleanupAutoUpdate = () => void;
export type TooltipButtonClick = () => boolean;
export type TriggerOptions = 'hover' | 'click' | 'focus';
export type Sizes = 'small' | 'medium' | 'large';
export type Types = 'light' | 'dark';
export type Placement = FloatingPlacement;

export interface TooltipButton {
  type: Types;
  title: string;
  size?: Sizes;
  onClick?: TooltipButtonClick;
}

export interface TooltipOptions {
  title: string;
  description: string | Component;
  trigger: TriggerOptions;
}
