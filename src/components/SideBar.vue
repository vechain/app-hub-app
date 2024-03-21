<template>
  <div class="side-bar">
    <img src="../assets/vechain-app-hub.png" alt="Logo" id="app-logo" class="hide-sm" />        
    <slot />

    <ul class="nav custom-nav">
      <li
        :class="{ active: link === key }"
        class="nav-item"
        v-for="(value, key) in menus"
        :key="key"
      >
        <a :href="`#${key}`">{{ value }}</a>
      </li>
    </ul>
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
  box-sizing: border-box;
}

#app-logo{
  display: inline-block;
  width: 200px;
  margin-bottom: 8px;
  margin-top: 4px;
}
.side-bar .col-oneline {
    overflow: unset;
}
.nav .nav-item a {
  box-shadow: none;
  padding: 0;
  transition: all 0.3s;
}

.nav .nav-item a:hover{
  padding-left: 6px;
}

.nav .nav-item.active > a:focus, .nav .nav-item.active > a:hover,
.nav .nav-item a:focus, .nav .nav-item a:hover {
  color: #2e3238;
}
</style>
