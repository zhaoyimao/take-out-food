document.write("<script type='text/javascript' src='items.js'></script>");
document.write("<script type='text/javascript' src='promotions.js'></script>"); 
document.write("<script type='text/javascript' src='best-charge.js'></script>"); 
function bestCharge(selectedItems) {
    var bestPrice;
    var price1;//指定菜品半价
    var price2;//满30减6
    var price4;//没优惠
    var youhuistr="";//
    var str3="-----------------------------------\n"
    var str1=str3+"使用优惠:\n指定菜品半价(";
    var str2=str3+"使用优惠:\n满30减6元，省";
    var promotions=loadPromotions();
    var result=list_item(selectedItems);
    var result1=list_item(selectedItems);
    
    price3=result.reduce(function(value,element){//总和
      return value+element.price*element.count;
    },0);

    price2=price3-Math.floor(price3/30)*6;//满30减6
    str2=str2+(price3-price2)+"元";
    for(let i in promotions){//指定菜品半价
      for(var j in promotions[i].items){
        result1.filter(function(element){
          if(element.id===promotions[i].items[j]){
            str1=str1+element.name+"，";
            return element.price=element.price/2;
          }
        });
      }
}
str1=str1.substring(0,str1.length-1);
price1=result1.reduce(function(value,element){
  return  value+element.price*element.count;
},0);
str1=str1+")，省"+(price3-price1)+"元";

    if(price1<price2 && price1<price3){
      bestPrice=price1;
      youhuistr=str1+"\n";
    }else if( price2 < price3){
      bestPrice=price2;
      youhuistr=str2+"\n";
    }else{
      bestPrice=price3;
      youhuistr="";
    }
    var str=result_str(result,bestPrice,youhuistr);
    return str;
  }

function list_item(selectedItems){//查找出商品的价格，名称等信息
  var result=[];
  // var promotions=require('./promotions.js');
  var promotions=loadPromotions();
  for(let i in selectedItems){
    // var items=require('./items.js');
    var items=loadAllItems();
    var str=selectedItems[i].split(' x ');
    var temp={};
    temp.id=str[0];
    temp.count=str[1];
    var name;
    var price;
    items.filter(function(element){
      if(element.id==str[0]){
        price=element.price;
        return name=element.name;
      }
    });
    temp.name=name;
    temp.price=price;
    result.push(temp);
  }
  return result;
}

function result_str(result,bestPrice,youhuistr){//输出
  var result_str="============= 订餐明细 =============\n";
  for(var i in result){
    var str=result[i].name+" x "+result[i].count+" = "+result[i].price*result[i].count+"元\n";
    result_str=result_str+str;
  }
  result_str=result_str+youhuistr+
  "-----------------------------------\n总计："+bestPrice+"元\n===================================";
  return result_str;
}