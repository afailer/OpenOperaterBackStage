<template>
    <div class="app-container">
        <Search></Search>
        <TabOfAccount v-if="isTabShow"></TabOfAccount>
        <SearchDialog></SearchDialog>
    </div>
</template>

<script>
import Search from '@/components/Search/index2'
import SearchDialog from './components/SearchDialog'
import TabOfAccount from './components/TabOfAccount'
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'userListNew',
        ]),
        isTabShow() {
            // console.log('userListNew', this.userListNew)
            return this.userListNew && this.userListNew.length
        }
    },
    components: {
        Search,
        TabOfAccount,
        SearchDialog,
    },
    methods: {

    }
}
</script>


