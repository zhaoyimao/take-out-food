document.write("<script type='text/javascript' src='../src/items.js'></script>");
document.write("<script type='text/javascript' src='../src/promotions.js'></script>"); 
document.write("<script type='text/javascript' src='../src/best-charge-for-html.js'></script>"); 
// var new_element1=document_createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","best-charge.js");
// document.body.a(new_element);  
function calculatePrice() {
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
 var table=document.getElementById("table");
 var tr=table.rows.length;
 var td=table.rows.item(2).cells.length;
 var text=table.rows[0].cells[0].innerHTML
 var result=[];
 for(var i=0;i<tr;i++){
     var text1=table.rows[i].getElementsByTagName('input')[0].value;
     //console.log("text1="+text1);
     if(text1 != "请输入购买数量" && text1.length!=0){
     var id=make_id(table.rows[i].cells[0].innerHTML);
     var str=id+" x "+text1;
    result.push(str);
   }
 }

   var result1=bestCharge(result);
   var message=document.getElementById("message");
   message.innerHTML=result1;
  console.log(result1);
 }
function make_id(name){
  var items=loadAllItems();
  var id;
  for(var i in items){
    if(items[i].name===name){
      id=items[i].id;
    }
  }
return id;
}


function clearItems() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
  //console.log("lallf");
  var message=document.getElementById("message");
 message.innerHTML="";
 var table=document.getElementById("table");
 var tr=table.rows.length;
 var td=3;
 var text;
 for(var i=0;i<tr;i++){
  text=table.rows[i].getElementsByTagName('input')[0];
  text.value="请输入购买数量";
  }
}





