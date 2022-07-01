<template>
  <div class="side-bar">
    <div class="container">
      <div class="columns col-oneline">
        <img src="../assets/logo.png" class="column col-auto" alt="Logo" />
        <div class="column" style="display: flex">
          <h3
            style="display: flex; align-self: flex-end"
            class="mb-0 text-bold"
          >
            App Hub
          </h3>
        </div>
      </div>
    </div>
    <slot />
    <ul class="nav custom-nav">
      <h5 class="my-2">Apps</h5>
      <li
        :class="{ active: link === key }"
        class="nav-item"
        v-for="(value, key) in menus"
        :key="key"
      >
        <a :href="`#${key}`">{{ value }}</a>
      </li>
    </ul>

    <a
      href="https://github.com/vechain/app-hub#vechain-app-hub---submit-form"
      target="_blank"
      style="margin-top: auto;background:#eee"
      class="btn btn-link text-dark"
    >Submit App</a>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SideBar extends Vue {
  public name = 'SideBar';

  @Prop()
  public link?: string;

  @Prop()
  public menus?: Record<string, string>;
}
</script>

<style>
.side-bar {
  height: 100vh;
  padding: 0.8rem;
  background-color: #eee;
  display: flex;
  flex-direction: column;
}
.side-bar img {
  height: 32px;
}

.side-bar .col-oneline {
    overflow: unset;
}
.custom-nav {
  padding-left: 0.4rem;
}
.nav .nav-item a {
  box-shadow: none;
}
.nav .nav-item.active > a:focus, .nav .nav-item.active > a:hover,
.nav .nav-item a:focus, .nav .nav-item a:hover {
  color: #2e3238;
}
</style>