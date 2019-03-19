<template>
    <div id="app">
        <header class="navbar">
            <section class="navbar-section">
                <img src="./assets/logo.png" style="height: 40px;" class="mr-2" alt="Logo">
                <a href="/" class="navbar-brand ml-2 text-bold mr-2">App Hub</a>
                <div class="input-inline ml-2">
                    <div class="has-icon-left">
                        <input
                            class="form-input"
                            :class="{'with-value': keyword !== ''}"
                            v-model.trim="keyword"
                            type="text"
                            placeholder="Search"
                        >
                        <i class="form-icon icon icon-search"></i>
                    </div>
                </div>
            </section>
            <section class="navbar-section" style="max-width: 200px;">
                <a
                    href="//github.com/libotony/app-hub"
                    target="_blank"
                    class="ml-2 btn btn-link"
                >Submit App</a>
            </section>
        </header>

        <section class="apps-section container gapless">
            <h3 v-if="appList.length" style="margin-top: 50px; margin-bottom: 0px">{{title}}</h3>
            <div v-if="appList.length" class="columns">
                <div
                    v-for="(item, i) in appList"
                    :key="i"
                    class="column col-3 col-lg-4 col-md-6 col-sm-12"
                >
                    <AppCard style="margin: auto;" :app="item"/>
                </div>
            </div>
            <div v-if="!appList.length" class="empty">
                <div class="empty-icon">
                    <i class="icon icon-4x icon-apps"></i>
                </div>
                <p class="empty-title h5">
                    Can not find any application match
                    <strong>{{keyword}}</strong>
                </p>
                <ul style="width: 350px; margin: auto; text-align: left;">
                    <p class="empty-subtitle">Suggestion:</p>
                    <li>Make sure that all words are spelled correctly.</li>
                    <li>Try different keywods.</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppCard from './components/AppCard.vue';

@Component({
    components: {
        AppCard,
    },
})
export default class App extends Vue {
    public apps: any[] = require('app-hub').map((item: any) => {
        return {
            ...item,
            img: require(`app-hub/imgs/${item.id}.png`),
        };
    });
    public keyword = '';

    public get title() {
        return this.keyword ? `Results of '${this.keyword}'.` : 'Discover';
    }

    public get appList() {
        return this.apps.filter((item: any, index: number) => {
            return item.name.toLowerCase().includes(this.keyword.toLowerCase())
                || item.desc.toLowerCase().includes(this.keyword.toLowerCase());
        });
    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: auto;
    /* padding-top: 1rem; */
}
.apps-section {
    margin-top: 1.2rem;
    padding-bottom: 1.2rem;
}
.apps-section p {
    margin-bottom: 0.2rem;
}
.apps-section .column {
    margin-top: 1rem;
}
.apps-section.container {
    max-width: 1440px;
}
.apps-section.container,
#app > .navbar {
    padding-left: 40px;
    padding-right: 40px;
}
#app > .navbar {
    background-color: #2f353b;
    height: 60px;
}
#app > .navbar .form-input:focus,
#app > .navbar .form-input {
    background-color: #565d63;
    outline: none;
    border: none;
    border-color: none;
    box-shadow: none;
    color: #ffffff;
}

#app > .navbar .with-value ~ .form-icon {
    color: #ffffff;
}
#app > .navbar .form-icon,
#app > .navbar .form-input::placeholder {
    color: #9b9b9b;
}

#app > .navbar i {
    color: #ffffff;
}
#app > .navbar a:visited,
#app > .navbar a {
    color: #ffffff;
}
#app .navbar-brand {
    font-size: 1.2rem;
    font-family: "Paytone One";
}
</style>
