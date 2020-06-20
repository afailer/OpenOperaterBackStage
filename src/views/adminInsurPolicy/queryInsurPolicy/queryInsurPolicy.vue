<template>
    <div class="app-container">
        <Search></Search>
        <TabOfAccount v-if="isTabShow"></TabOfAccount>
        <SearchDialog></SearchDialog>
    </div>
</template>

<script>
import Search from '@/components/Search'
import SearchDialog from './components/SearchDialog'
import TabOfAccount from './components/TabOfAccount'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'userList',
        ]),
        isTabShow() {
            return this.userList && this.userList.length
        }
    },
    components: {
        Search,
        TabOfAccount,
        SearchDialog,
    },
    mounted() {
        // console.log('qqqqq')
    }
}
</script>


