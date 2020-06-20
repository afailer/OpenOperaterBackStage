<template>
    <div class="app-container">
        <Search></Search>
        <TabOfAccount v-if="isTabShow"></TabOfAccount>
    </div>
</template>

<script>
import Search from '@/components/Search'
import TabOfAccount from './components/TabOfAccount'
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'userList',
        ]),
        isTabShow() {
            // console.log('用户列表', this.userList)
            return this.userList && this.userList.length
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


