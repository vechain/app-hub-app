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
        </div>
        <div class="card-footer hide-sm">
            <small v-for="tag in app.tags" class="chip">{{ tag }}</small>
        </div>
    </div>
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
    border-style: dashed;
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
</style>

