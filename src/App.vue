<template>
  <div id="app" class="off-canvas off-canvas-sidebar-show">
    <header class="navbar">
        <section class="navbar-section">
            <a
                href="javascript:;"
                @click="showSidebar = true"
                class="btn btn-link ml-2 "
            >
                <i class="form-icon icon icon-menu mr-2" style="font-size: 1.3rem"></i>
            </a>
            <img src="./assets/vechain-app-hub.png" alt="Logo" class="logo--navbar mr-2" />
            <div class="input-inline ml-2">
                <div class="has-icon-left">
                    <input
                        class="form-input"
                        v-model.trim="keyword"
                        type="text"
                        placeholder="Search"
                    />
                    <i class="form-icon icon icon-search"></i>
                </div>
            </div>
        </section>
    </header>
    <SideBar id="sidebar" class="off-canvas-sidebar" :class="{active: showSidebar}" :menus="menus" :link="category">
      <div class="has-icon-left my-2 hide-lg">
        <input
          class="form-input"
          v-model.trim="keyword"
          type="text"
          placeholder="Search"
        />
        <i class="form-icon icon icon-search"></i>
      </div>
    </SideBar>

    <a class="off-canvas-overlay" href="javascript:;" @click="showSidebar = false"></a>

    <div class="off-canvas-content">
      <div class="container gapless">
        <h3 style="font-weight:bold;margin-bottom: 0;margin-top: 0.5rem;">
          {{ title }}
        </h3>
        <div v-if="appList.length" class="columns">
          <div
            v-for="(item, i) in appList"
            :key="i"
            class="column col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 col-xxxl-1"
          >
            <AppCard style="margin: auto" :app="item" />
          </div>
        </div>
        <div v-if="!appList.length" class="empty">
          <div class="empty-icon">
            <i class="icon icon-4x icon-apps"></i>
          </div>
          <p class="empty-title h5">
            Can not find any application match
            <strong>{{ keyword }}</strong>
          </p>
          <ul style="margin: auto; text-align: left">
            <p class="empty-subtitle">Suggestion:</p>
            <li>Make sure that all words are spelled correctly.</li>
            <li>Try different keywords.</li>
          </ul>
        </div>
        <footer>
          <div class="developer-cta">
            <small>
              <strong>Are you a DApp builder?</strong>
              <br />
              <a href="https://docs.vechain.org/developer-resources/getting-started" target="_blank">
                Read the docs
              </a> 
              and
              <a href="https://github.com/vechain/app-hub#vechain-app-hub---submit-form" target="_blank">
                submit your DApp
              </a>
            </small>
          </div>
          <div class="divider"></div>
          <small>All Rights Reserved. © {{ year }} Vechain Foundation San Marino S.r.l.</small>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AppCard from './components/AppCard.vue';
import SideBar from './components/SideBar.vue';

interface DApp {
  name: string;
  herf: string;
  desc: string;
  category: Categories;
  tags: string[];
  id: string;
  createAt: number;
  img?: string;
}

type Categories = 'all' | 'defi' | 'collectibles' | 'games' | 'marketplaces' | 'utilities';

@Component({
  components: {
    AppCard,
    SideBar,
  },
})
export default class App extends Vue {
  public categories: Categories[] = [];
  public apps: DApp[] = require('app-hub').map((item: DApp) => {
    if (!this.categories.includes(item.category)) {
      this.categories.push(item.category);
    }
    return {
      ...item,
      img: require(`app-hub/imgs/${item.id}.png`),
    };
  });

  public keyword = '';

  public menus = {
    all: 'All',
    collectibles: 'Collectibles',
    defi: 'Defi',
    games: 'Games',
    marketplaces: 'Market Places',
    utilities: 'Utilities',
  };

  public category: Categories | null = null;

  public showSidebar = false;

  public get title() {
    if (this.category === 'all') {
      return this.keyword ? `Results for "${this.keyword}"` : 'Discover';
    } else {
      return this.keyword
      ? `Results for "${this.keyword}" in ${this.menus[this.category!]}` : `${this.menus[this.category!]}`;
    }
  }

  public get year() {
    return new Date().getFullYear();
  }

  public get appList() {
    return this.apps.filter((item: any, index: number) => {
      const keyword = this.keyword.toLowerCase();
      const hasKeywords =
        item.name.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword);
      if (this.category === 'all') {
        return hasKeywords;
      } else {
        return item.category === this.category && hasKeywords;
      }
    });
  }

  public setCategory() {
    const temp = window.location.hash && window.location.hash.substring(1) as Categories;
    if (this.categories.includes(temp as Categories)) {
        this.category = temp as Categories;
    } else {
      location.hash = 'all';
      this.category = 'all';
    }
    const listContainer = window.document.querySelector('#app .off-canvas-content');
    if (window.innerWidth < 960) {
      this.showSidebar = false;
    }
    if (listContainer) {
        listContainer.scrollTop = 0;
    }
  }

  public created() {
    this.setCategory();
    window.addEventListener('hashchange', this.setCategory);
  }
}
</script>

<style>
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  display: flex;
  height: 100vh;
  /* padding-top: 60px; */
}

#app .off-canvas-content {
  height: 100%;
  overflow: scroll;
  padding: 1rem;
}

.logo--navbar{
  height: 26px;
}

footer{
  text-align: center;
}

.apps-section {
  width: calc(100% - 250px);
  height: 100vh;
  overflow: auto;
  padding-top: 1.2rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 1.2rem;
}

.container .column {
  margin-top: 1rem;
}

.empty ul {
  width: 350px;
}

@media (max-width: 960px) {
  .empty ul {
    width: unset;
  }
  #app {
    display: block;
  }
  .apps-section {
    height: initial;
  }
  #app > .navbar {
    display: flex !important;
  }
  .side-bar h3 {
    font-size: 24px;
  }
  #app .off-canvas-content {
    padding: 65px 0.2rem 1rem;
  }
}
#app > .navbar {
  display: none;
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #eee;
  height: 60px;
  z-index: 10;
}
#app > .navbar .form-input:focus,
#app > .navbar .form-input {
  outline: none;
  border: none;
  border-color: none;
  box-shadow: none;
}
#app > .navbar .navbar-section {
  flex: initial;
}


#app > .navbar .form-icon,
#app > .navbar .form-input::placeholder {
  color: #9b9b9b;
}

#app .form-input:focus {
  border-color: #9b9b9b;
  box-shadow: 0 0 0 0.1rem rgb(54 194 209);
}

#app > .navbar a:visited,
#app > .navbar a {
  color: #ffffff;
}
#app .navbar-brand {
  font-size: 1.2rem;
  font-family: "Paytone One";
}

.developer-cta{
  margin-top: 100px;
  padding: 16px 0px;
}

@media (max-width: 400px) {
  .apps-section.container,
  #app > .navbar {
    padding-right: 10px;
  }
}

@media (min-width: 1281px) and (max-width: 2480px) {
  .col-xxl-12,
  .col-xxl-11,
  .col-xxl-10,
  .col-xxl-9,
  .col-xxl-8,
  .col-xxl-7,
  .col-xxl-6,
  .col-xxl-5,
  .col-xxl-4,
  .col-xxl-3,
  .col-xxl-2,
  .col-xxl-1,
  .col-xxl-auto {
    -ms-flex: none;
    flex: none;
  }
  .col-xxl-12 {
    width: 100%;
  }
  .col-xxl-11 {
    width: 91.66666667%;
  }
  .col-xxl-10 {
    width: 83.33333333%;
  }
  .col-xxl-9 {
    width: 75%;
  }
  .col-xxl-8 {
    width: 66.66666667%;
  }
  .col-xxl-7 {
    width: 58.33333333%;
  }
  .col-xxl-6 {
    width: 50%;
  }
  .col-xxl-5 {
    width: 41.66666667%;
  }
  .col-xxl-4 {
    width: 33.33333333%;
  }
  .col-xxl-3 {
    width: 25%;
  }
  .col-xxl-2 {
    width: 16.66666667%;
  }
  .col-xxl-1 {
    width: 8.33333333%;
  }
  .col-xxl-auto {
    width: auto;
  }
  .hide-xxl {
    display: none !important;
  }
  .show-xxl {
    display: block !important;
  }
}

@media (min-width: 2481px) and (max-width: 4000px) {
  .col-xxxl-12,
  .col-xxxl-11,
  .col-xxxl-10,
  .col-xxxl-9,
  .col-xxxl-8,
  .col-xxxl-7,
  .col-xxxl-6,
  .col-xxxl-5,
  .col-xxxl-4,
  .col-xxxl-3,
  .col-xxxl-2,
  .col-xxxl-1,
  .col-xxl-auto {
    -ms-flex: none;
    flex: none;
  }
  .col-xxxl-12 {
    width: 100%;
  }
  .col-xxxl-11 {
    width: 91.66666667%;
  }
  .col-xxxl-10 {
    width: 83.33333333%;
  }
  .col-xxxl-9 {
    width: 75%;
  }
  .col-xxxl-8 {
    width: 66.66666667%;
  }
  .col-xxxl-7 {
    width: 58.33333333%;
  }
  .col-xxxl-6 {
    width: 50%;
  }
  .col-xxxl-5 {
    width: 41.66666667%;
  }
  .col-xxxl-4 {
    width: 33.33333333%;
  }
  .col-xxxl-3 {
    width: 25%;
  }
  .col-xxxl-2 {
    width: 16.66666667%;
  }
  .col-xxxl-1 {
    width: 8.33333333%;
  }
  .col-xxxl-auto {
    width: auto;
  }
  .hide-xxxl {
    display: none !important;
  }
  .show-xxxl {
    display: block !important;
  }
}
</style>
