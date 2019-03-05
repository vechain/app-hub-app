<template>
    <a class="app-card tile" target="_blank" href="app.url">
        <div class="tile-icon" :style="{background: color}">
            <div>
                <span>{{indexStr}}</span>
            </div>
        </div>
        <div class="tile-content">
            <p class="tile-title bold">
                <strong>{{app.name}}</strong>
            </p>
            <p class="tile-subtitle">{{app.desc}}</p>
        </div>
    </a>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

declare interface DApp {
    name: string;
    url: string;
    desc: string;
    img: string;
}

@Component
export default class AppCard extends Vue {
    @Prop({})
    private app!: DApp;


    get indexStr(): string {
        return this.app.name.substr(0, 1);
    }
    get color(): string {
        const colors = [
            '#41ab5d',
            '#0570b0',
            '#88419d',
            '#ae017e',
            '#fc4e2a',
            '#b2182b',
            '#662506',
            '#965b06',
            '#575757',
            '#f14332',
        ];
        const code: number = this.app.name.substr(0, 1).charCodeAt(0);
        const index = code % this.app.name.length;
        return colors[index];
    }
}
</script>
<style scoped>
.app-card {
    border-radius: 3px;
    border: 1px solid #eee;
    padding: 30px 20px;
    box-sizing: border-box;
}

.app-card .tile-icon {
    height: 4rem;
    width: 4rem;
    border: 2px solid #eee;
    margin-right: 0.5rem;
    border-radius: 5px;
    background-color: white;
    display: flex;
    justify-content: center;
}
.app-card .tile-icon div {
    display: flex;
    color: #eee;
    font-size: 2.5rem;
    font-weight: bold;
    flex-direction: column;
    justify-content: space-around;
}

.app-card .tile-content p {
    margin-bottom: 0.2rem;
}

.app-card .tile-subtitle {
    font-size: 0.7rem;
    line-height: 1rem;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
a.app-card,
a.app-card:hover {
    text-decoration: none;
    color: #111;
}
</style>

