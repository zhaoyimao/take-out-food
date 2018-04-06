document.write("<script type='text/javascript' src='../src/items.js'></script>");
document.write("<script type='text/javascript' src='../src/promotions.js'></script>");
window.onload=function(){//绑定多个事件
    show_all_items();
    show_promotions();
  }
  function show_all_items(){//显示全部菜单
    var result=loadAllItems();
    var table=document.getElementById("table");
    //var table=document.createElement("table");
    for(var i in result){
      var date=getDate(result[i]);
      table.appendChild(date);
    }
    document.getElementById("items").appendChild(table);
  }
  function getDate(date){
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    td1.innerHTML=date.name;
    tr.appendChild(td1);
  
    var td2=document.createElement("td");
    td2.innerHTML=date.price+"元";
    tr.appendChild(td2);
  
    var td3=document.createElement("td");
    tr.appendChild(td3);
    var text = document.createElement('input');
    text.setAttribute("type","text");
    text.setAttribute("id","text");
    //var text1=document.getElementById("test").value;
    text.setAttribute("value","请输入购买数量");
    text.onmousedown=function(){
      text.setAttribute("value","");
    }
    td3.appendChild(text);
    return tr;
  }
  function show_promotions(){//动态显示优惠
    var result=loadPromotions();
    var youhui=document.getElementById("promotions");
    for(var i in result){
      var date=getPromotions(result[i]);
      youhui.appendChild(date);
    }
  }
  function getPromotions(date){
    var list=document.createElement("div");
    var ul=document.createElement("ul");
    var allItem=loadAllItems();
    if(date.type==="指定菜品半价"){
      var h=document.createElement("h6");
          h.innerHTML="优惠二：  指定菜品半价";
          list.appendChild(h);
      for(var i in date.items){
       for(var j in allItem){
         if(date.items[i]==allItem[j].id){
           var li=document.createElement("li");
           li.innerHTML=allItem[j].name;
           ul.appendChild(li);
           list.appendChild(ul);
         }
       }
      }
    }else{
      var h=document.createElement("h6");
      h.innerHTML="优惠一";
      list.appendChild(h);
      var li=document.createElement("li");
      li.innerHTML=date.type;
      ul.appendChild(li);
      list.appendChild(ul);
    }
    return list;
  }