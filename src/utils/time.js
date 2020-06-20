
/**
 * 
 * @param {String} formatString 格式化的模板
 * @param {any} 时间对象(默认现在)
 * eg: 'yyyy-MM-dd hh-mm' 或 'yy年M月dd日'
 */
function getTimeString(formatString, timeStamp){
    let formatArr = formatString.split(/[^yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s]/g);

    let dateObj;
    if(typeof timeStamp === "number"){
        dateObj = new Date(timeStamp);
    }else if(typeof timeStamp === "string"){
        dateObj = new Date(timeStamp);
    }else if(Object.prototype.toString.call(timeStamp)==="[object Date]"){
        dateObj = timeStamp;
    }else{
        dateObj = new Date();
    }
    
    let originArr = ["yyyy", "yy", "MM", "M", "dd", "d", "hh", "h", "mm", "m", "ss", "s"];

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth()+1;
    let date = dateObj.getDate();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();
    let second = dateObj.getSeconds();

    for(let i=0;i<formatArr.length;i++){
        let index = originArr.indexOf( formatArr[i] );
        let target = formatArr[i];

        switch (index) {
            case 0:
                formatString = formatString.replace( target , year);
                break;
            case 1:
                formatString = formatString.replace( target, year%100);
                break;
            case 2:
                formatString = formatString.replace( target, addZero(month));
                break;
            case 3:
                formatString = formatString.replace( target, month);
                break;
            case 4:
                formatString = formatString.replace( target, addZero(date));
                break;
            case 5:
                formatString = formatString.replace(target, date);
                break;
            case 6:
                formatString = formatString.replace(target, addZero(hour));
                break;
            case 7:
                formatString = formatString.replace(target, hour);
                break;
            case 8:
                formatString = formatString.replace(target, addZero(minute));
                break;
            case 9:
                formatString = formatString.replace(target, minute);
                break;
            case 10:
                formatString = formatString.replace(target, addZero(second));
                break;
            case 11:
                formatString = formatString.replace(target, second);
                break;
            default:
                break;
        }
    }

    return formatString;    
}

/**
 * 获取字符串对应的时间戳
 * @param {String} timeString  转换的字符串
 */
function getTimeStamp(timeString){

    let reg = /\D+/gi
    let timeArr = timeString.split(reg);

    if(timeArr.length > 6){
        timeArr.length = 6;
    }

    timeArr[1] = parseInt(timeArr[1]) - 1;
    let timeObj = new Date(...timeArr);

    return timeObj.getTime();
}


/**
 * 获取今天的零点的时间戳
 */
function getTimeStampToday(){
    let timeObj = new Date().setHours(0,0,0,0);
    return timeObj;
}




export {
    getTimeString,
    getTimeStamp,
    getTimeStampToday,
}



/** 加零 */
function addZero(num){
    return (num<10)?'0'+num:String(num);
}