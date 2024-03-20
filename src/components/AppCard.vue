<template>
    <div class="card" :data-type="app.category">
        <div class="card-image">
            <a target="_blank" :href="url">
            <img
                width="100%"
                :src="app.img"
            >
            </a>
        </div>
        <div class="card-header">
            <div class="card-title">
                <a target="_blank" :href="url" class="text-dark text-bold text-large">
                    {{ app.name }}
                </a>
            </div>
        </div>
        <div class="card-body">
            <p>
                {{  app.desc }}
            </p>
            <small v-for="tag in app.tags" class="chip">{{ tag }}</small>
        </div>
    </div>
    <!-- 
    <a class="app-card tile" :data-type="app.category" target="_blank" :href="url">
        <div class="tile-icon" :style="backGStyle" :class="{'tile-icon-border': !loaded}">
            <div v-show="!loaded">
                <span>{{indexStr}}</span>
            </div>
            <img
                v-show="loaded"
                @load="onUpdateLoaded(true)"
                @error="onUpdateLoaded(false)"
                width="100%"
                :src="app.img"
            >
        </div>
        <div class="tile-content">
            <p class="tile-title">
                {{app.name}}
            </p>
            <p class="tile-subtitle">{{app.desc}}</p>
        </div>
    </a>
    -->
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

declare interface DApp {
    id: string;
    name: string;
    href: string;
    desc: string;
    tags: string[];
    img: string;
}

@Component
export default class AppCard extends Vue {
    @Prop({})
    private app!: DApp;
    private loaded = false;
    get indexStr(): string {
        return this.app.name.substr(0, 1).toUpperCase();
    }

    get backGStyle() {
        return this.loaded ? '' : {
            background: this.color,
        };
    }

    get url() {
        return this.app.href;
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

    public onUpdateLoaded(val: boolean) {
        this.loaded = val;
    }
}
</script>
<style scoped>
.card{
    height: 100%;
    transition: all 0.3s;
    border-radius: 5px;
    border-color: #aaa;
}
.card[data-type="collectibles"]{
    border-color: white;
}
.card-image a{
    overflow: hidden;
    display: block;
}
.card-image img{
    transition: all 0.3s;
    transform: scale(0.85);
}
.card:hover{
    border-color: #333;
}
.card:hover .card-image img{
    transform: scale(1);
}
.card-title a:hover{
    text-decoration: none;
}

@media screen and (max-width:600px){
    .card-header, .card-body{
        padding: 0 0.4em;
    }
    .card-image{
        max-width: 80px;
        margin: 0 auto;
        border-radius: 5px;
        margin-top: 10px;
    }
}
/*
.app-card {
    border-radius: 5px;
    border: 1px solid #e2e8f0;
    padding: 20px;
    box-sizing: border-box;
    max-width: 330px;
    height: 134px;
    align-items: top;
    transition: all 0.3s;
    font-size: 16px;
}
.app-card:hover{
    border-color: #aaa;
}

.app-card[data-type="collectibles"]{
    border-style: dashed;
}

.app-card .tile-icon {
    height: 60px;
    width: 60px;
    margin-right: 0.5rem;
    background-color: white;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
}
.tile-icon-border {
    border: 2px solid #eee;
    border-radius: 5px;
}
.app-card .tile-icon div {
    display: flex;
    color: #eee;
    font-size: 2.5rem;
    font-weight: bold;
    flex-direction: column;
    justify-content: space-around;
}

.app-card .tile-content {
    align-self: baseline;
}

.app-card .tile-content p {
    margin-bottom: 0.2rem;
}

.app-card .tile-title {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-weight: bold;;
}

.app-card .tile-subtitle {
    font-size: 0.9em;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
a.app-card:focus {
    box-shadow: none;
}
a.app-card,
a:visited.app-card,
a.app-card:hover {
    text-decoration: none;
    color: #111;
}
@media (max-width: 321px) {
    .app-card {
        padding: 20px 3px;
        max-width: 316px;
    }
    
}
*/
</style>

