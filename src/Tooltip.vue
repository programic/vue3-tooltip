<template>
  <span>
    <span
      @mouseenter.prevent="() => open('hover')"
      @mouseleave.prevent="() => close('hover')"
    >
      <span
        ref="tooltip-holder"
        class="tooltip-holder"
        @click="click"
      >
        <slot></slot>
      </span>
    </span>

    <Teleport
      :disabled="disableTeleport"
      to="#tooltip-container"
    >
      <Component
        :is="markRaw(options?.template)"
        v-if="options?.template"
        v-show="isOpen"
        ref="tooltip"
        v-bind="{ ...$props, ...$attrs }"
      />

      <div
        v-else
        v-show="isOpen"
        ref="tooltip"
        class="max-w-sm w-full shadow-md rounded-md pointer-events-auto
          ring-1 ring-black ring-opacity-5 max-w-2xl"
        :class="tooltipDomClasses"
        style="width: fit-content"
      >
        <div
          :class="{
            'p-2 text-xs': size === 'small',
            'p-3 text-sm': size === 'medium',
            'p-5 text-md': size === 'large',
          }"
        >
          <p
            class="font-medium"
            :class="{
              'text-gray-900': type === 'light',
              'text-gray-100': type === 'dark',
            }"
            data-test-title
          >
            <slot name="title">
              {{ title }}
            </slot>
          </p>

          <slot name="description">
            <p
              v-if="description"
              class="mt-1 text-gray-500"
              style="font-size: calc(100% - .2rem);"
              data-test-description
              v-html="description"
            ></p>
          </slot>

          <slot name="actions">
            <div
              v-if="buttons && buttons.length > 0"
              class="mt-4 flex"
              data-test-buttons-holder
            >
              <button
                v-for="(button, buttonIndex) in buttons"
                :key="`toast-button-${buttonIndex}`"
                :data-type="button.type ?? defaultButtonType"
                :data-size="button.size ?? size"
                class="cursor-pointer mr-2"
                @click="buttonClick(button)"
              >
                {{ button.title }}
              </button>
            </div>
          </slot>
        </div>

        <div
          class="w-6 overflow-hidden inline-block"
          data-popper-arrow
        >
          <div
            :class="arrowDomClasses"
            class="h-3 w-3 transform shadow-md -rotate-45 origin-top-left"
          ></div>
        </div>
      </div>
    </Teleport>
  </span>
</template>

<script lang="ts">
  import { defineComponent, inject, markRaw } from 'vue';
  import { createPopper } from '@popperjs/core';
  import props from './props';

  import type { Instance } from '@popperjs/core';
  import type {
    TooltipButton,
    Types,
    Sizes,
    TriggerOptions,
    Placement,
  } from './index.d';
  import type { TooltipConfiguration } from './configurations.d';

  const tooltipDomClassesByType: Record<Types, string[]> = {
    light: ['bg-white', 'text-black'],
    dark: ['bg-gray-900', 'text-white'],
  };

  const tooltipDomClassesBySize: Record<Sizes, string[]> = {
    small: [],
    medium: [],
    large: [],
  };

  export default defineComponent({
    name: 'Tooltip',

    components: {
      AppButton,
    },

    props,

    emits: [
      'close',
    ],

    data() {
      return {
        isOpen: false,
        options: inject<TooltipConfiguration | null>('tooltipOptions', null),
        popper: null as Instance | null,
      };
    },

    computed: {
      tooltipDomClasses(): string[] {
        return [
          ...tooltipDomClassesByType[this.type],
          ...tooltipDomClassesBySize[this.size],
        ];
      },

      defaultButtonType(): string {
        if (this.type === 'light') {
          return 'primary';
        }

        return 'secondary';
      },

      disableTeleport(): boolean {
        return this.options?.container === false || this.container === false;
      },

      popperPlacement(): Placement {
        return this.placement ?? this.options?.placement ?? 'top';
      },

      arrowDomClasses(): string[] {
        const classes = [];
        classes.push(this.type === 'light' ? 'bg-white' : 'bg-gray-900');

        return classes;
      },
    },

    mounted() {
      this.initialize();
    },

    beforeUnmount() {
      this.popper?.destroy();
    },

    methods: {
      markRaw,

      initialize(): void {
        const tooltip = this.$refs.tooltip as HTMLDivElement;
        const tooltipHolder = this.reference ?? this.$refs['tooltip-holder'] as HTMLElement;

        this.popper = createPopper(tooltipHolder, tooltip, {
          placement: this.popperPlacement,
          strategy: 'absolute',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
            {
              name: 'arrow',
            },
          ],
        });
      },

      async buttonClick(button: TooltipButton): Promise<void> {
        if (typeof button.onClick === 'function') {
          const closeTooltip = button.onClick();

          if (closeTooltip) {
            this.$emit('close');
          }
        } else {
          this.$emit('close');
        }
      },

      open(trigger: TriggerOptions): void {
        if (this.trigger !== trigger) {
          return;
        }

        this.isOpen = true;

        setTimeout(() => {
          this.popper?.forceUpdate();
        });
      },

      close(trigger: TriggerOptions): void {
        if (this.trigger !== trigger) {
          return;
        }

        this.isOpen = false;
      },

      toggle(trigger: TriggerOptions): void {
        if (this.isOpen) {
          this.close(trigger);

          return;
        }

        this.open(trigger);
      },

      click(): void {
        this.toggle('click');
      },
    },
  });
</script>
