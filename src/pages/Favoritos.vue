<template>
  <q-page class="q-pa-md">
    <q-list v-bind:key="i.id" v-for="i in itens" bordered padding>
      <q-item-label header>{{ i.categoria }}</q-item-label>
      <q-item clickable>
        <q-item-section top thumbnail class="q-ml-none">
          <img :src="i.img">
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ i.nome }}</q-item-label>
          <q-item-label caption>
            R${{ i.valor}}
            <br/>
            {{ i.modelo}}
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section> -->
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      itens: [
        {
          id: 1,
          nome: 'PC',
          categoria: 'COMPUTADORES',
          valor: 150,
          modelo: 'Optiplex',
          img: 'https://images.vexels.com/media/users/3/157204/isolated/preview/32098c9923436f09712af14f542411bb-black-and-white-computer-desktop-icon-by-vexels.png'
        },
        {
          id: 2,
          nome: 'NOTEBOOK DELL',
          categoria: 'NOTEBOOK',
          valor: 1500,
          modelo: 'VAIO',
          img: 'https://i.pinimg.com/originals/48/ce/e8/48cee83121a363a248640dbf54778d87.png'
        },
        {
          id: 3,
          nome: 'MEMORIA DDR 4 8GB',
          categoria: 'MEMORIA',
          valor: 150,
          modelo: 'DDR4',
          img: 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-ram-vector-icon-png-image_3720374.jpg'
        },
        {
          id: 4,
          nome: 'MEMORIA DDR 3 2GB',
          categoria: 'MEMORIA',
          valor: 150,
          modelo: 'Optiplex',
          img: 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-ram-vector-icon-png-image_3720374.jpg'
        },
        {
          id: 5,
          nome: 'FONTE 500W',
          categoria: 'FONTE',
          valor: 80,
          modelo: 'PC YES',
          img: 'https://www.miranda.com.br/lojas/2057/img/interno/prd_192662_p_39556.png'
        },
        {
          id: 6,
          nome: 'HD 1 TB',
          categoria: 'DISCO RIGIDO',
          valor: 150,
          modelo: 'SEAGATE',
          img: 'https://images.vexels.com/media/users/3/157204/isolated/preview/32098c9923436f09712af14f542411bb-black-and-white-computer-desktop-icon-by-vexels.png'
        },
        {
          id: 7,
          nome: 'SSD 128GB',
          categoria: 'DISCO RIGIDO',
          valor: 120,
          modelo: 'SANDISK',
          img: 'https://shop.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/ssd-plus-sata-iii-ssd/gallery/ssd-plus-sata-iii-ssd-left.png.thumb.1280.1280.png'
        },
        {
          id: 8,
          nome: 'PC',
          categoria: 'COMPUTADORES',
          valor: 150,
          modelo: 'Optiplex',
          img: 'https://shop.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/ssd-plus-sata-iii-ssd/gallery/ssd-plus-sata-iii-ssd-left.png.thumb.1280.1280.png'
        }
      ]
    }
  }
}
</script>
