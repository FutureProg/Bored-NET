/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Parser(){};

Parser.prototype.findImages = function(str){
    console.log(str);
    if(str === undefined)
        return null;    
    return str.match(/\S+(\.png|\.jpg|\.bmp)$/g);
};