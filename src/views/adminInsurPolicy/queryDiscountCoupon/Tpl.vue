<template>
    <div class="app-container">
        <Search></Search>
        <TabOfAccount></TabOfAccount>
        <SearchTable></SearchTable>
        <SearchDialog></SearchDialog>
    </div>
</template>

<script>
import Search from './components/Search'
import SearchDialog from './components/SearchDialog'
import SearchTable from './components/SearchTable'
import TabOfAccount from './components/TabOfAccount'

export default {
    components: {
        Search,
        SearchTable,
        SearchDialog,
        TabOfAccount,
    },
}
</script>


