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
            <img src="./assets/logo.png" style="height: 40px;" class="mr-2" alt="Logo" />
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
      <div class="has-icon-left m-2 py-2 hide-lg">
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
            class="column col-3 col-xl-4 col-lg-6 col-md-6 col-sm-12"
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

    if (window.innerWidth < 960) {
      this.showSidebar = false;
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  .side-bar img {
    height: 40px;
  }
  .side-bar h3 {
    font-size: 24px;
  }
  #app .off-canvas-content {
    padding: 65px 0.2rem 1rem;
  }
}
#app > .navbar {
  padding-left: 40px;
  padding-right: 40px;
  display: none;
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #eee;
  height: 60px;
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
@media (max-width: 400px) {
  .apps-section.container,
  #app > .navbar {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>