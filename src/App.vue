<template>
    <div id="app">
        <header class="navbar">
            <section class="navbar-section"></section>
            <section class="navbar-section">
                <div class="input-group input-inline">
                    <div class="has-icon-left input-group">
                        <input class="form-input" type="text" placeholder="search">
                        <i class="form-icon icon icon-search"></i>
                    </div>
                    <button class="btn btn-primary input-group-btn">Search</button>
                </div>
                <a href="#" class="ml-2 btn btn-link">Submit your app</a>
            </section>
        </header>
        <section class="apps-section container gapless">
            <h4>New Released</h4>
            <div class="columns">
                <div v-for="(item, i) in apps" :key="i" class="column col-4 col-md-6">
                    <AppCard :app="item"/>
                </div>
            </div>
        </section>
        <section class="apps-section container gapless">
            <h4>Apps</h4>
            <div class="columns">
                <div v-for="(item, i) in apps" :key="i" class="column col-4 col-md-6">
                    <AppCard :app="item"/>
                </div>
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
    public apps = [
        {
            name: 'The Avengers',
            desc: `Earth's Mightiest were too big for any one hero to tackle...`,
            url: '',
            img: '',
        },
    ];
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: auto;
    max-width: 1080px;
    padding-top: 1rem;
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
</style>
