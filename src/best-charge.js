var promotion=require('./promotions.js');
var item=require('./items.js');
function bestCharge(selectedItems) {
    var bestPrice;
    var promotion_1_price;//指定菜品半价
    var promotion_2_price;//满30减6
    var no_promotion_price;//没优惠
    var youhuistr="";//
    var str3="-----------------------------------\n"
    var str1=str3+"使用优惠:\n指定菜品半价(";
    var str2=str3+"使用优惠:\n满30减6元，省";
    var promotions=promotion();
    var result=list_item(selectedItems);
    
    no_promotion_price=result.reduce(function(value,element){//总和
      return value+element.price*element.count;
    },0);

    promotion_2_price=promotion_1(no_promotion_price);
    str2=str2+(no_promotion_price-promotion_2_price)+"元";
    for(let i in promotions){//指定菜品半价
      for(var j in promotions[i].items){
        for(let k in result){
          if(result[k].id===promotions[i].items[j]){
            var name=result[k].name;
            console.log(result[k].name);
            str1=str1+result[k].name+"，";
          }
        }
      }
}
str1=str1.substring(0,str1.length-1);
promotion_1_price=promotion_2(selectedItems);
str1=str1+")，省"+(no_promotion_price-promotion_1_price)+"元";

    if(promotion_1_price<promotion_2_price && promotion_1_price<no_promotion_price){
      bestPrice=promotion_1_price;
      youhuistr=str1+"\n";
    }else if( promotion_2_price < no_promotion_price){
      bestPrice=promotion_2_price;
      youhuistr=str2+"\n";
    }else{
      bestPrice=no_promotion_price;
      youhuistr="";
    }
    var str=result_str(result,bestPrice,youhuistr);
    return str;
  }
function promotion_1(price){//优惠一：满30减6
  return price-Math.floor(price/30)*6;//满30减6
}
function promotion_2(selectedItems){//优惠二：指定菜品半价
  var items=list_item(selectedItems);
  var promotions=promotion();
  for(let i in promotions){//指定菜品半价
    for(var j in promotions[i].items){
      items.filter(function(element){
        if(element.id===promotions[i].items[j]){
          return element.price=element.price/2;
        }
      });
    }
}
var promotion_2_price=items.reduce(function(value,element){
  return  value+element.price*element.count;
},0);
return promotion_2_price;

}
function list_item(selectedItems){//查找出商品的价格，名称等信息
  var result=[];
  var promotions=promotion();
  for(let i in selectedItems){
    var items=item();
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
module.exports = bestCharge;