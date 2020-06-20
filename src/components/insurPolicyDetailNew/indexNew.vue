<template>
    <div class="app-container">
        <BasisDetail></BasisDetail>
        <TabDetail></TabDetail>
    </div>
</template>
<script>
import BasisDetail from './components/BasisDetail'
import TabDetail from './components/TabDetail'
import PolicyState from './components/PolicyState'
export default {
    components: {
        BasisDetail,
        TabDetail,
        PolicyState
    },
};
</script>

<style lang="scss">
.failed-reason {
        word-break: break-all;
        height: 600px;
        overflow-y: scroll;
    }
</style>
