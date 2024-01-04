import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import HelloWorldVue from "../components/HelloWorld.vue";

describe("HelloWorld", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(HelloWorldVue);
    expect(wrapper.vm).toBeTruthy();
  });
});
