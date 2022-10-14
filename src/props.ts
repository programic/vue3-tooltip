import type { PropType } from 'vue';
import type {
  TriggerOptions,
  TooltipButton,
  Sizes,
  Types,
  Placement,
} from './types/tooltip';

export default {
  id: {
    type: String as PropType<string>,
    default: null,
  },

  reference: {
    type: HTMLElement as PropType<HTMLElement>,
    default: null,
  },

  trigger: {
    type: String as PropType<TriggerOptions>,
    default: 'hover',
  },

  placement: {
    type: String as PropType<Placement>,
    default: null,
  },

  size: {
    type: String as PropType<Sizes>,
    default: 'small',
  },

  type: {
    type: String as PropType<Types>,
    default: 'dark',
  },

  title: {
    type: String as PropType<string>,
    required: true,
  },

  description: {
    type: String as PropType<string>,
    default: null,
  },

  buttons: {
    type: Array as PropType<TooltipButton[]>,
    default: null,
  },

  container: {
    type: Boolean as PropType<boolean>,
    default: null,
  },
};
