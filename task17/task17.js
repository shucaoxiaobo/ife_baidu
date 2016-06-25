/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
// 设置数据的函数
function setData() {
  chartData = {};
  var i=0;
  var nowCityName
  for (nowCityName in aqiSourceData){
    if (i==pageState.nowSelectCity){
      break;
    }
    i++;
  }
  if(pageState.nowGraTime=="day"){
    chartData = aqiSourceData[nowCityName];
  }
  if(pageState.nowGraTime=="week"){
    var i=1;
    var value=0;
    var j=1;
    var name = "2016-第"+j+"周";
    for(var x in aqiSourceData[nowCityName]){
        if(i>7){i=1;j++;value=0;name="2016-第"+j+"周";}
        value=value+aqiSourceData[nowCityName][x];
        chartData[name]=value;
        i++;
      }

  }
  if(pageState.nowGraTime=="month"){

  }
}
/**
 * 渲染图表
 */
function renderChart() {
  
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  // 设置对应数据
  pageState.nowGraTime=this.value;
  // 调用图表渲染函数
  setData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  // 设置对应数据
  pageState.nowSelectCity = this.selectedIndex;

  // 调用图表渲染函数
  setData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  graTime = document.getElementsByName('gra-time');
  // 获取radio事件，然后给事件绑定一个监听函数graTimeChange
  var length=graTime.length
  for(var i=0;i<length;i++){
    graTime[i].addEventListener("click",graTimeChange,false);}
}

/**
 * 初始化城市Select下拉选择框中的选项,绑定监听函数citySelectChange
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  citySelect = document.getElementById('city-select');
  // citySelectOption = citySelect.getElementsByTagName("option");
  citySelect.addEventListener("change",citySelectChange,false);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  // var length=citySelectOption.length
  // for(var i=0;i<length;i++){
  //   citySelectOption[i].addEventListener("click",citySelectChange,false);}
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  var length=graTime.length;
  for(var i=0;i<length;i++){
    if(graTime[i].checked){
      var timeOption = graTime[i].value;
    }
  }
  // 获取初始的radio事件的字符串

  // 获取初始的select的字符串

  // 将原始的源数据处理成图表需要的数据格式
  pageState.nowSelectCity= citySelect.selectedIndex;
  pageState.nowGraTime= timeOption;
  // 处理好的数据存到 chartData 中
  setData();
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();

  initCitySelector();

  initAqiChartData();
}

init();
