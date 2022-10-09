import type { Component } from 'vue';
import type { Placement as PopperPlacement } from '@popperjs/core';
import type { Types, Sizes as ButtonSizes } from '@/components/AppButton';

export type TooltipButtonClick = () => boolean;

export interface TooltipButton {
  type: Types;
  title: string;
  size?: ButtonSizes;
  onClick?: TooltipButtonClick;
}

export type TriggerOptions = 'hover' | 'click' | 'focus';
export type Sizes = 'small' | 'medium' | 'large';
export type Types = 'light' | 'dark';

export type Placement = PopperPlacement;

export interface TooltipOptions {
  title: string;
  description: string | Component;
  trigger: TriggerOptions;
}
