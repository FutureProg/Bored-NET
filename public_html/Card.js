/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var allCards = [];

function Card(cardNum,options){
    var cardNum = cardNum || 0;
    var options = options || {};        
    var txt = options.content || "txt";    
    var info = options.information || "";
    console.log(options);
    this.div = document.createElement("div");
    this.div.className = "card";               
    this.createInterface.bind(this,this.div,txt,info).call();    
    
            
    this.div.style.marginLeft = (14 * cardNum) + "em";       
    this.div.style.animationDelay = (0.2 * cardNum) + "s";
    this.div.style.webkitAnimationDelay = (0.2 * cardNum) + 's';    
            
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
}

Card.prototype.createInterface = function(div,content,info){    
   var title = document.createTextNode(content);
   this.div.appendChild(title);
   this.inner = document.createElement("div");   
   this.inner.className = "inner-card";
   this.infoNode = document.createTextNode(info);
   this.inner.appendChild(this.infoNode);   
   this.div.appendChild(this.inner);   
};

Card.prototype.expandInformation = function(){
    if(!this.open){        
        this.div.style.width = "106.5%";        
        this.div.style.height = "80%";        
        this.inner.style.opacity = "1";        
        this.div.style.marginLeft = "0";
    }else{
        this.div.style.width = this.initWidth;
        this.div.style.height = this.initHeight;        
        this.inner.style.opacity = "0";   
        this.div.style.marginLeft = this.initMarginL;
    }
    this.fadeOthers.bind(this).call();
    this.open = !this.open;
};

Card.prototype.setInformation = function(info){
    this.information = info;
    this.inner.innerHTML = this.information;    
    this.updateInformation.bind(this).call();
};

Card.prototype.updateInformation = function(){
    var parser = new Parser();
    if(this.content === null || this.content.nodeValue === null){
        return;
    }
    var images = parser.findImages(this.infoNode.wholeText);     
    if(images === null){        
        return;
    }    
    this.content.nodeValue = "";
    for(var i = 0; i < images.length;i++){
        console.log("adding image");
        var img = document.createElement("img");
        img.src = images[i];
        img.className = "card-image";        
        this.inner.appendChild(document.createElement("br"));
        this.inner.appendChild(img);
    }
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
    }else{
        this.div.style.opacity = "1";
        this.div.onclick = this.expandInformation.bind(this);
    }
};