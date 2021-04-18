let newData;
const week7 = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';

axios.get(week7)
  .then(function (response) {
    // console.log(response.data.data);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    newData = response.data.data;
    init();
});
// console.log(newData);
const NewaddTicket = document.querySelector(".addTicket-form");
const ticketName = document.querySelector("#ticketName");
const ticketUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const btn = document.querySelector(".btn");

NewaddTicket.addEventListener("click",function(e){
    // console.log(e.target.value);
    if(e.target.value == undefined){
        console.log("你點空的區域");
        return;
    }else{
        // console.log(e.target.value);
        // console.log(ticketName.value);
    }
});


//套票展示區塊 網頁一開始要呈現的內容LI
const tickeTCard =  document.querySelector(".ticketCard-area");
// console.log(tickeTCard);



function init(){
    let str = "";
    // console.log(str);
    newData.forEach(function(item){
        console.log(item);
        let content = `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
        str += content;
        // console.log(str);
        tickeTCard.innerHTML = str;
    });
}
init(); ///初始化

//新增套票
btn.addEventListener("click",addCard);

//判斷使用者是否輸入完全
function addCard(){
    if(ticketName.value==""){
        alert("你名稱為輸入");
        return;
    }else if(ticketUrl.value ==""){
        alert("你圖片為輸入");
        return;
    }else if(ticketRegion.value ==""){
        alert("你地區為輸入");
        return;
    }else if(ticketPrice.value =="" || ticketPrice.value>0){
        alert("你價錢為輸入,不可以小於0");
        return;
    }else if(ticketNum.value ==""){
        alert("你組數為輸入");
        return;
    }else if(ticketRate.value ==""){
        alert("你星級為輸入");
        return;
    }else if(ticketDescription.value ==""){
        alert("你介紹為輸入");
        return;
    }
    // console.log(ticketUrl.value);
    newData.push({
        id:Date.now(),
        //參考網址會跟去點擊的電腦時間
        //https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/now
        title:ticketName.value,
        img:ticketUrl.value,
        area:ticketRegion.value,
        price:Number(ticketPrice.value),
        severalGroups:Number(ticketNum.value),
        rank:Number(ticketRate.value),
        description:ticketDescription.value,
    })
    // console.log(data);
    NewaddTicket.reset(); //一鍵清除所有內容
    // init();
}

//你總共搜尋幾筆資料
const ResultText = document.querySelector("#searchResult-text")
console.log(ResultText);
// ResultText.textContent = `你總共搜尋${data.length}筆資料`;


//篩選邏輯
// area
const regionSearch = document.querySelector(".regionSearch");
console.log(regionSearch.value);
regionSearch.addEventListener("change",initChange);

function initChange(e){
    // console.log(regionSearch.value);
    let str= "";
    let strNum = []; //儲存新的搜尋陣列
    data.forEach(function(item){
        // console.log(regionSearch.value===item.area);
        if(regionSearch.value === item.area){
            let content = `<li class="ticketCard"><div class="ticketCard-img"><a href="#"><img src=${item.img} alt=""></a><div class="ticketCard-region">${item.area}</div><div class="ticketCard-rank">${item.rank}</div></div><div class="ticketCard-content"><div><h3><a href="#"class="ticketCard-name">${item.title}</a></h3><p class="ticketCard-description">${item.description}</p></div><div class="ticketCard-info"><p class="ticketCard-num"><span><i class="fas fa-exclamation-circle"></i></span>剩下最後 <span id="ticketCard-num">${item.severalGroups}</span> 組</p><p class="ticketCard-price">TWD <span id="ticketCard-price">${item.price}</span></p></div></div></li>`;
            str += content;
            strNum.push(str);  //新增到新陣列才知道有搜尋幾筆資料
            console.log(strNum);
            tickeTCard.innerHTML = str;
        }else if(regionSearch.value == "全部地區"){
            init();
            strNum.push(str);
        }
        ResultText.textContent = `你總共搜尋${strNum.length}筆資料`;
    });
}