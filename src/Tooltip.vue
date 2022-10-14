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
  import { createPopper } from '@popperjs/core';
  import props from './props';

  import type { Instance } from '@popperjs/core';
  import type { TooltipButton, TriggerOptions, Placement } from './types/tooltip';
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
        popper: null as Instance | null,
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

      popperPlacement(): Placement {
        return this.placement ?? this.options?.placement ?? 'top';
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
