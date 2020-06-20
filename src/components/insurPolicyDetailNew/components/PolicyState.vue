<template id="policyState" >
  <div v-if="state==='已下单' || state==='付款失败' || state==='付款中' || state==='已付款' || state==='投保中' || state==='退保中'" class="stateBase PolicyStateDefault">{{state}}</div>
  <div v-else-if="state==='续保失败'||state==='投保失败'||state==='投保失败，已退款'" class="stateBase PolicyStateFailed">{{state}}</div>
  <div v-else-if="state==='已投保' || state=='保单生效' || state=='投保成功'" class="stateBase PolicyStateInsured">{{state}}</div>
  <div v-else-if="state==='即将到期'||state=='即将失效'" class="stateBase PolicyStateNotInvalid">{{state}}</div>
  <div v-else-if="state==='已经续保'" class="stateBase PolicyStateRenewal">{{state}}</div>
  <div v-else-if="state==='保单过期'||state==='保单失效'||state==='已失效'" class="stateBase PolicyStateSurrender">{{state}}</div>
  <div v-else class="stateBase PolicyStateFailed">{{state}}</div>
</template>

<style scoped lang="scss">
.stateBase{
    padding: 2px 2px;
    height: auto;
    line-height: 20px;
    font-size: 12px;
}
.PolicyStateDefault {
  background-color: #f6c342;
  color: #594300;
}
.PolicyStateFailed {
  background-color: #d04437;
  color: #ffffff;
}
.PolicyStateInsured {
  background-color: #14892c;
  color: #ffffff;
}
.PolicyStateNotInvalid {
  background-color: #ff8000;
  color: #ffffff;
}
.PolicyStateRenewal {
  background-color: #597da3;
  color: #ffffff;
}
.PolicyStateSurrender {
  background-color: #cccccc;
  color: #333333;
}
</style>

<script>

export default {
    name: "PolicyState",
    props: {
        state: ''
    },
    data() {
        return {
        }
    },
    created() {},
}
</script>