
//DOM抓取與資料庫
var static=document.querySelector('.static');
var staticCircle=document.querySelector('.staticCircle');
var reBtn=document.querySelector('.re');
var staticBMI=document.querySelector('.bmiValue');
var staticText=document.querySelector('.staticText');

var btn = document.querySelector('.resultBtn');
var list = document.querySelector('.record');
var dataAry = JSON.parse(localStorage.getItem('BMIdata'))|| [];



//監聽btn
btn.addEventListener('click',update);
reBtn.addEventListener('click',reset);

//數值
	var bmi;
	var h;
	var w;	
	var conditionClass;
	var conditionText="";
	var hcm;
	var date

//計算bmi
function caculate(){
	h=document.querySelector('.inputHeight').value/100;
	w=document.querySelector('.inputWeight').value;
	
	hcm=parseInt(h*100);
	var bmiV = w/(h*h);
	bmi=bmiV.toFixed(2);
} 
//同步locastorage
function local(){
	var content ={
		bmiValue:bmi,
		heightCM:hcm,
		weight:w,
		condition:conditionClass,
		conditionName:conditionText,
		time:date
	};

	dataAry.push(content);
	var dataStr=JSON.stringify(dataAry);
	localStorage.setItem('BMIdata',dataStr);

}

//組字串+渲染
function updateList(){
	var strAll="";
	var today= new Date();
	console.log(today);
	date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	
	if(dataAry.length==0){
		var empty=
		'<li>'+'<div class="border ideal"></div>'+'<p style=" width:161px; margin-left:212px;">請輸入身高與體重</p>'+

		'</li>'
		list.innerHTML=empty;
	}else{
	for(i=dataAry.length-1; i>-1;--i){

		
		var str= '<li>'+'<div class= "border '+dataAry[i].condition+'"></div>'+'<span class="liText">'+
		dataAry[i].conditionName+'</span>'+
		'<div class="label-box l-bmi"><span class="r-label">BMI  </span>'+
		'<span class="staics">'+dataAry[i].bmiValue+'</span></div>'+

		'<div class="label-box l-weight"><span class="r-label">weight </span>'+
		'<span class="staics">'+dataAry[i].weight+"kg"+'</span></div>'+

		'<div class="label-box l-height"><span class="r-label">height  </span>'+
		'<span class="staics">'+dataAry[i].heightCM+"cm"+'</span></div>'+

		'<span class="r-label l-date">'+dataAry[i].time+'</span></li>';
			strAll+=str;
		
		}
	
		console.log(strAll);
		list.innerHTML=strAll;
	}
}	


	//顏色模組
	var staticColor;
	var borderColor;
	var bgColor;

//上方顯示數據
function showStatic(){
	btn.style.display="none";
	static.style.display="block";

	static.classList.add(staticColor);
	staticCircle.classList.add(borderColor);
	reBtn.classList.add(bgColor);
	staticBMI.textContent=bmi;
	staticText.textContent=conditionText;
}
function reset(){
	btn.style.display="block";
	static.style.display="none";

	static.classList.remove(staticColor);
	staticCircle.classList.remove(borderColor);
	reBtn.classList.remove(bgColor);

	var inputW=document.querySelector('.inputHeight');
	var inputH=document.querySelector('.inputWeight');
	inputH.value="";
	inputW.value="";

}

//點擊事件
function update(e){
	e.preventDefault();
	caculate();

	//判斷欄位是否為空
	var hValue=	document.querySelector('.inputHeight').value;
	if(w==''||hValue==''){
		alert('請輸入身高體重!');
		{return}
	}

	//判斷bmi區間、字串所需的各種變數
		if(bmi<18.5){
			//alert('過輕');
			conditionClass="too-thin";
			conditionText="過輕 ";
			staticColor="static-colorThin";
		 	borderColor="circle-borderThin";
			bgColor="re-bgThin";

		}else if(bmi>=18.5 &&bmi<24){
			//alert('理想');
			conditionClass="ideal";
			conditionText="理想 ";
			staticColor="static-colorIdeal";
		 	borderColor="circle-borderIdeal";
			bgColor="re-bgIdeal";
		}else if(bmi>=24 &&bmi<27){
			//alert('過重');
			conditionClass="fat";
			conditionText="過重 ";
			staticColor="static-colorFat";
		 	borderColor="circle-borderFat";
			bgColor="re-bgFat";
		}else if(bmi>=27 &&bmi<30){
			//alert('微胖');
			conditionClass="little-fat";
			conditionText="輕度肥胖 ";
			staticColor="static-colorLfat";
		 	borderColor="circle-borderLfat";
			bgColor="re-bgLfat";
		}else if(bmi>=30 &&bmi<35){
			//alert('中胖');
			conditionClass="medium-fat";
			conditionText="中度肥胖 ";
			staticColor="static-colorMfat";
		 	borderColor="circle-borderMfat";
			bgColor="re-bgMfat";

		}else{
			//alert('超胖');
			conditionClass="very-fat";
			conditionText="重度肥胖 ";
			staticColor="static-colorVfat";
		 	borderColor="circle-borderVfat";
			bgColor="re-bgVfat";
		}   

	showStatic();
	local();
	updateList();
}
updateList();
/*dataAry.splice(0,16);
console.log(dataAry);*/

