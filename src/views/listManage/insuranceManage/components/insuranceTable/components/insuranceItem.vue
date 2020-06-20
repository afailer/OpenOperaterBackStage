<template>
    <div class='insurance-container'>
        <img class="incurance-icon" :src="prop.icon">
        <div class="insurance-content">
            <h4 class="i-title">
                <span class="i-title-val">{{prop.insurance_name}}</span>
                <img class="title-right-icon" v-show="prop.right_icon" :src='prop.right_icon'/>
            </h4>
            <p class="i-desc">{{String(prop.description).trim()}}</p>
            <p class="i-price">
                <span class="i-price-val">{{Number(prop.price)/100}}</span>
                <span class="i-price-unit">{{prop.unit}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['prop']
}
</script>

<style scoped lang="scss">
.insurance-container{
    width: 300px;
    padding: 3px 3px;
    box-sizing: content-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .incurance-icon{
        width: 80px;
        height: 80px;
    }
    .insurance-content{
        margin-left: 13px;
        .i-title{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin: 0px;
            .i-title-val{
                color: #333333;
                font-size: 12px;
                line-height: 12px;
            }
            .title-right-icon{
                height: 12px;
                margin-left: 10px;
            }
        }
        .i-desc{
            color: #4C4C4C;
            font-size: 14px;
            line-height: 14px;
            width: 95%;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            margin: 10px 0px;
        }
        .i-price{
            text-align: left;
            line-height: 20px;
            margin: 0px;
            .i-price-val{
                color: #FF6135;
                font-size: 16px;
                font-weight: 700;
            }
            .i-price-unit{
                color: #FF6135;;
                font-size: 16px;
            }
        }
    }
}
</style>
