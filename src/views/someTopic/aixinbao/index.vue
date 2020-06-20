<template>
    <div class="app-container">
        <Search></Search>
        <TabOfAccount v-if="isTabShow"></TabOfAccount>
    </div>
</template>

<script>
import Search from './components/Search'
import TabOfAccount from './components/TabOfAccount'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'axbAccountList',
        ]),
        isTabShow() {
            return this.axbAccountList && this.axbAccountList.length
        }
    },
    components: {
        Search,
        TabOfAccount,
    },
    methods: {

    }
}
</script>



