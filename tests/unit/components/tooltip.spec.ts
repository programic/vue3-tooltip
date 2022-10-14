import { expect, describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Tooltip from './../../../src/Tooltip.vue';

describe("Tooltip", () => {
  it('should render the tooltip by default settings', () => {
    const title = 'tooltip';
    const wrapper = shallowMount(Tooltip, {
      props: {
        title,
      }
    });

    expect(wrapper.props()).toStrictEqual({
      buttons: null,
      container: null,
      description: null,
      id: null,
      placement: null,
      reference: null,
      size: "small",
      title: "tooltip",
      trigger: "hover",
      type: "dark",
    });
  });
});
