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
        :is="options?.template"
        v-if="options?.template"
        v-show="isOpen"
        ref="tooltip"
        v-bind="{ ...$props, ...$attrs }"
      />

      <div
        v-else
        v-show="isOpen"
        :id="id"
        ref="tooltip"
        :data-type="type"
        :data-size="size"
        class="tooltip"
        style="width: fit-content"
      >
        <div class="tooltip-container">
          <div>
            <p class="title">
              <slot name="title">
                {{ title }}
              </slot>
            </p>

            <slot name="description">
              <p
                v-if="description"
                class="description"
                style="font-size: calc(100% - .2rem);"
                v-html="description"
              ></p>
            </slot>

            <slot name="actions">
              <div
                v-if="buttons && buttons.length > 0"
                class="mt-4 flex"
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
        </div>
      </div>
    </Teleport>
  </span>
</template>

<script lang="ts">
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { defineComponent, inject, markRaw } from 'vue';
  import {
    computePosition,
    autoUpdate,
    flip,
    inline,
    offset,
  } from '@floating-ui/dom';
  import props from './props';

  import type {
    TooltipButton,
    TriggerOptions,
    Placement,
    CleanupAutoUpdate,
  } from './types/tooltip';
  import type { TooltipConfiguration } from './types/configurations';

  export default defineComponent({
    name: 'Tooltip',

    props,

    emits: [
      'close',
    ],

    data() {
      return {
        isOpen: false,
        options: inject<TooltipConfiguration | null>('tooltipOptions', null),
        cleanupAutoUpdate: null as CleanupAutoUpdate | null,
      };
    },

    computed: {
      defaultButtonType(): string {
        if (this.type === 'light') {
          return 'primary';
        }

        return 'secondary';
      },

      disableTeleport(): boolean {
        return this.options?.container === false || this.container === false;
      },

      tooltipPlacement(): Placement {
        return this.placement ?? this.options?.placement ?? 'top';
      },
    },

    beforeUnmount() {
      this.cleanupAutoUpdate?.();
    },

    methods: {
      markRaw,

      initialize(): void {
        const tooltip = this.$refs.tooltip as HTMLDivElement;
        const tooltipHolder = this.reference ?? this.$refs['tooltip-holder'] as HTMLElement;

        this.cleanupAutoUpdate?.();
        this.cleanupAutoUpdate = autoUpdate(tooltipHolder, tooltip, async () => {
          const position = await computePosition(tooltipHolder, tooltip, {
            placement: this.tooltipPlacement,
            middleware: [
              flip(),
              inline(),
              offset(() => ({
                mainAxis: 10,
              })),
            ],
          });

          tooltip.dataset.placement = position.placement;

          Object.assign(tooltip.style, {
            left: '0',
            top: '0',
            transform: `translate(${Math.round(position.x)}px,${Math.round(position.y)}px)`,
          });
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
          this.initialize();
        });
      },

      close(trigger: TriggerOptions): void {
        if (this.trigger !== trigger) {
          return;
        }

        this.cleanupAutoUpdate?.();

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
