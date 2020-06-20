<template>
    <div class="app-container">
        <Search></Search>
        <SearchTable></SearchTable>
        <SearchDialog></SearchDialog>
    </div>
</template>

<script>
import Search from './components/Search'
import SearchDialog from './components/SearchDialog'
import SearchTable from './components/SearchTable'


export default {
    components: {
        Search,
        SearchTable,
        SearchDialog,
    },
}
</script>


