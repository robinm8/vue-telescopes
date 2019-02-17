<template>
    <div class="container">
        <div class="col-md-12">
            <div v-if="isProductLoading" class="row text-center">
                <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize" class="inline-block" />
            </div>
            <div v-else class="thumbnail">
                <img class="img-responsive" :src="item.thumbnail_url" alt="">
                <div class="caption-full">
                    <h4 class="pull-right">{{ item.price | toCurrency }}</h4>
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.description }}</p>
                </div>
                <div class="ratings">
                    <button class="btn btn-success" @click="goToURL(item.link)">
                        Vue on Amazon.com
                    </button>
                    <p class="pull-right">
                        <button class="btn btn-success" @click="addItem">
                            Add to cart
                        </button>
                    </p>
                    <div class="clearfix"></div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import GridLoader from 'vue-spinner/src/GridLoader.vue'

    export default {
        components: {
            GridLoader
        },
        data() {
            return {
                loaderColor: '#5cb85c',
                loaderSize: '50px'
            }
        },
        computed: {
            ...mapGetters(['isProductLoading', 'products']),
            item() {
                let id = this.$route.params.id

                if (this.products.length >= id) {
                    let filterArr = this.products.filter((item) => {
                        return item.id == id
                    })

                    if (filterArr.length > 0) {
                        return filterArr[0]
                    }
                }

                return {}
            }
        },
        methods: {
            ...mapActions(['updateCart']),
            addItem() {
                const order = {
                    item: Object.assign({}, this.item),
                    quantity: 1,
                    isAdd: true
                }
                console.log(order)
                this.updateCart(order)
            },
            formatPrice(value) {
                let val = (value / 1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            },
            goToURL(url) {
                var win = window.open(url, '_blank')
                win.focus()
            }
        }
    }
</script>

<style scoped>
    p {
        white-space: pre-wrap;
    }

    .caption-full {
        padding-right: 10px;
        padding-left: 10px;
    }

    .ratings {
        padding-right: 10px;
        padding-left: 10px;
        color: #d17581;
    }
</style>
