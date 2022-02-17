<template>
  <div id="app">
    <div class="cover" :class="{'d-block': showSidebar, 'd-none': !showSidebar }" @click="onTouch">
      <SideBar :menus="menus" :link="category">
        <div class="has-icon-left m-2 py-2 hide-xs">
          <input
            class="form-input"
            v-model.trim="keyword"
            type="text"
            placeholder="Search"
          />
          <i class="form-icon icon icon-search"></i>
        </div>
      </SideBar>
    </div>
    <header class="navbar">
        <section class="navbar-section">
            <a
                href="javascript:;"
                @click="showSidebar = true"
                class="btn btn-link ml-2 show-xs"
            >
                <i class="form-icon icon icon-menu mr-2" style="font-size: 1.3rem"></i>
            </a>
            <img src="./assets/logo.png" style="height: 40px;" class="mr-2" alt="Logo" />
            <a href="/" class="navbar-brand ml-2 text-bold mr-2 hide-sm">App Hub</a>
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
    <section class="apps-section">
      <div class="container gapless">
        <h3>
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
            <li>Try different keywods.</li>
          </ul>
        </div>
      </div>
    </section>
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

type Categories = 'all' | 'defi' | 'games' | 'marketplaces' | 'utilities';

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
    defi: 'DEX',
    games: 'Games',
    marketplaces: 'Market Places',
    utilities: 'Utilities',
  };

  public category: Categories | null = null;

  public showSidebar = !(window.innerWidth < 480);


  public get title() {
    if (this.category === 'all') {
      return this.keyword ? `Results of '${this.keyword}'.` : 'Discover';
    } else {
      return `Result of ${this.menus[this.category!]}` + (this.keyword ? ` & search by '${this.keyword}' .` : '.');
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
  }

  public onTouch(event: Event) {
    if ((event.target! as HTMLElement).className.includes('cover')) {
      event.stopPropagation();
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

.apps-section .column {
  margin-top: 1rem;
}

.empty ul {
  width: 350px;
}

@media (max-width: 480px) {
  .empty ul {
    width: unset;
  }
  .cover {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 111;
    left: 0;
    background-color: #2f353b66;
  }
  #app {
    display: block;
  }
  .apps-section {
    width: 100%;
    height: initial;
  }
  #app > .navbar {
    display: flex !important;
  }
  .side-bar {
    position: fixed;
    top: 0;
    width: 55%;
    padding-top: 0.4rem;
    z-index: 111;
    box-shadow: 11px 0px 16px 12px rgb(98 98 99 / 20%)
  }
  .side-bar img {
    height: 40px;
  }
  .side-bar h3 {
    font-size: 24px;
  }
}
#app > .navbar {
  padding-left: 40px;
  padding-right: 40px;
  display: none;
  background-color: #eee;
  height: 60px;
}
#app > .navbar .form-input:focus,
#app > .navbar .form-input {
  /* background-color: #565d63; */
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

/* #app > .navbar i {
  color: #ffffff;
} */
#app > .navbar a:visited,
#app > .navbar a {
  color: #ffffff;
}
#app .navbar-brand {
  font-size: 1.2rem;
  font-family: "Paytone One";
}

@media (max-width: 321px) {
  .columns {
    margin-left: 0;
    margin-right: 0;
  }
}
@media (min-width: 320px) {
  .apps-section.container,
  #app > .navbar {
    padding-left: 1px;
    padding-right: 1px;
  }
}
@media (min-width: 374px) {
  .apps-section.container,
  #app > .navbar {
    padding-left: 10px;
    padding-right: 10px;
  }
}
@media (min-width: 400px) {
  .apps-section.container,
  #app > .navbar {
    padding-left: 20px;
    padding-right: 20px;
  }
  #app .navbar-brand {
    font-size: 1rem;
  }
}
</style>
