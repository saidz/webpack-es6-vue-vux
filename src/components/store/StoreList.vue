<template>
  <div class="vux-demo">
    <img class="logo" src="../../assets/vux_logo.png">
    <h1>{{ msg }}</h1>
  </div>
  <group title="cell demo">
    <cell title="Vux" value="Cool" is-link></cell>
  </group>
  <article>
    <header class="page-hd">请先选择您的常用门店</header>
    <section class="store-list">
        <ul>
            {{#each this.repair_shops}}
                <li id="{{id}}" data-name="{{name}}" data-sb="{{repair_shops.name}}" data-sf="{{this.name}}">
                    <a>
                        <div class="store-img">
                            <img src="{{image_url}}" alt="养车易" class="imgauto">
                        </div>
                        <div class="store-info">
                            <p class="info-name">{{name}}</p>
                            <p class="info-addr">{{address}}</p>
                            <p class="info-dis">{{m_to_kilometer distance}}</p>
                        </div>
                    </a>
                </li>
            {{/each}}
        </ul>
    </section>
  </article>
</template>

<script>
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>