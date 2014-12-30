/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var allCards = [];
var maxCards = 6;

function Card(cardNum,options){    
    this.closeCards.bind(this).call();
    var cardNum = cardNum || allCards.length;
    var options = options || {};        
    var txt = options.content || "txt";    
    var info = options.information || "";        
    this.div = document.createElement("div");                
    this.div.className = "card";               
    this.createInterface.bind(this,this.div,txt,info).call();        
            
    if(allCards.length >= maxCards){
        this.div.style.marginTop = (14 * Math.floor(allCards.length/maxCards)) + "em";        
        if(allCards.length % maxCards == 0){
            this.div.style.marginLeft = "0em";
        }else{
            this.div.style.marginLeft = (14 * (cardNum % maxCards)) + "em";
        }
    }else{
        this.div.style.marginLeft = (14 * cardNum) + "em"; 
    }
    //this.div.style.animationDelay = (0.2 * cardNum) + "s";
    //this.div.style.webkitAnimationDelay = (0.2 * cardNum) + 's';    
            
    this.div.onclick = this.expandInformation.bind(this);    
    
    var content = document.getElementById("content");   
    content.appendChild(this.div);    
    
    this.content = txt;
    this.open = false;    
    this.initWidth = this.div.style.width;
    this.initHeight = this.div.style.height;
    this.information = options.information || "";
    this.initMarginL = this.div.style.marginLeft;
    this.initMarginR = this.div.style.marginRight;
    
    allCards.push(this);    
    this.setInformation.bind(this,info).call();
    console.log(options);    
}

Card.prototype.createInterface = function(div,content,info){    
   var title = document.createTextNode(content);
   this.div.appendChild(title);
   this.inner = document.createElement("div");   
   this.inner.className = "inner-card";
   this.infoNode = document.createTextNode("");
   this.inner.appendChild(this.infoNode);
   this.div.appendChild(this.inner);
};

Card.prototype.expandInformation = function(){
    if(!this.open){        
        this.div.style.width = "1088px";        
        this.div.style.height = "500px";   
        this.div.style.backgroundColor = "red";
        this.div.style.color = "white";      
        this.inner.style.opacity = "1";         
        this.inner.style.width = "97%";
        this.inner.style.height = "450px";                
        this.div.style.marginLeft = "0";
        this.div.style.marginRight = "0";
        this.inner.style.backgroundColor = "white";
        this.inner.onclick = this.expandInformation.bind(this);
        this.div.onmouseover = function(){};
        this.div.onmouseout = function(){};
    }else{
        this.div.style.width = this.initWidth;
        this.div.style.height = this.initHeight;        
        this.inner.style.opacity = "0";   
        this.div.style.marginLeft = this.initMarginL;    
        this.div.style.backgroundColor = "white";
        this.div.style.color = "black";
        this.div.onmouseover = function(){this.style.backgroundColor = "red";};       
        this.div.onmouseout = function(){this.style.backgroundColor = "white";};
        this.inner.onclick = function(){};
    }
    this.fadeOthers.bind(this).call();
    this.open = !this.open;
};

Card.prototype.setInformation = function(info){
    this.information = info;    
    this.updateInformation.bind(this).call();
};

Card.prototype.updateInformation = function(){
    var parser = new Parser();
    if(this.content === null || this.content.nodeValue === null){
        return;
    }
    var images = parser.findImages(this.information);        
    console.log("Found images: " + images);
    this.content.nodeValue = "";
    var imageSet = [];
    for(var i = 0; images !== null && i < images.length ;i++){
        console.log("adding image");
        var img = document.createElement("img");
        img.src = images[i];
        this.information= this.information.replace(images[i],"");  
        console.log("New info: " + this.information);
        img.className = "card-image"; 
        imageSet.push(img);
        //this.inner.appendChild(document.createElement("br"));
        //this.inner.appendChild(img);
    }
    splitInfo = this.information.split(/(?:\r\n|\r|\n)/g);    
    for(var i = 0; i < splitInfo.length; i++){
        this.inner.appendChild(document.createTextNode(splitInfo[i]));
        this.inner.appendChild(document.createElement("br"));
    }
    this.inner.appendChild(document.createElement("br"));
    for(var i = 0; images !== null && i < images.length;i++){
        this.inner.appendChild(imageSet[i]);    
    }    
    //this.inner.innerHTML = this.inner.innerHTML.replace(/(?:\r\n|\r|\n)/g, '<br />');
    //console.log(this.inner.innerHTML.match(/\n/g).length);
    //console.log(this.inner.innerHTML);
};
Card.prototype.getDiv = function(){
    return this.div;
};

Card.prototype.isOpen = function(){
    return this.open;
};

Card.prototype.fadeOthers = function(){    
    for(var i = 0; i < allCards.length;i++){
        if(allCards[i] === this){            
            continue;
        }
        if(allCards[i] === null){
            continue;
        }        
        allCards[i].fade();
    }        
};

Card.prototype.fade = function(){
    if(this.div.style.opacity !== "0"){
        this.div.style.opacity = "0";
        this.div.onclick = function(){};     
        this.inner.onclick = function(){};
    }else{
        this.div.style.opacity = "1";
        this.div.onclick = this.expandInformation.bind(this);
        this.inner.onclick = this.expandInformation.bind(this);
    }
};

Card.prototype.closeCards = function(){
    for(var i = 0; i < allCards.length;i++){
        if(allCards[i].isOpen())
            allCards[i].expandInformation();                               
    }
};