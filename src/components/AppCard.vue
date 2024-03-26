<template>
    <div class="card" :data-type="app.category">
        <div class="card-body">
            <div>
                <a target="_blank" :href="url">
                    <img
                        :src="app.img"
                    >
                </a>
            </div>
            <div>
                <a target="_blank" :href="url" class="text-dark text-bold">
                    {{ app.name }}
                </a>
                <p>
                    {{  app.desc }}
                </p>
            </div>
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
    border-color: #e2e8f0;
}
.card[data-type="collectibles"] .card-footer{
    display: none;
}
.card-footer{
    padding-top: 0;
}
/* .card[data-type="collectibles"] .card-body img{
    width: 100%;
} */
.card:hover{
    border-color: #333;
}
.card-body{
    padding: 20px;
}

.card-body img{
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 6px;
    transition: all 0.3s;
    width: 50px;
}
.card-body a:hover{
    text-decoration: none;
}
.card-body p{
    font-size: 14px;
    color: #718096;
    margin-bottom: 0;
}

@media screen and (max-width:600px){
    .card-body{
        padding: 10px 10px 10px 10px;
    }
}
</style>

