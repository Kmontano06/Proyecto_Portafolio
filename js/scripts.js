var app={};
app.ajaxRequest=function(){

var mygetrequest =new XMLHttpRequest();
mygetrequest.onreadystatechange = function(){
  if (mygetrequest.readyState === 4 &&  mygetrequest.status == 200){
    var jsonObj = JSON.parse(mygetrequest.responseText);
      app.proyectos.imprimirProyectos(jsonObj.proyectos);   
  }
}
mygetrequest.open("GET", "js/proyectos.json", true);
mygetrequest.send();
};

app.proyectos = function(){
  return{
    imprimirProyectos:function(proyectos){
       var list_proyectos ="";
                for(i=0; i < proyectos.length; i++){
                   list_proyectos += '<li class="list-project-item"><img class="item-image" src="'+proyectos[i].imagen+'"/><h2 class="item-title">'+proyectos[i].nombre+'</h2><div onclick="app.proyectos.ajaxProyecto('+i+')" class="button-more"></div></li>';
                }
                document.getElementById("proyectos").innerHTML= "<ul class='list-project'>"+list_proyectos+"</ul>";
    },
    ajaxProyecto:function(indice){
      var httpproyecto =new XMLHttpRequest();
      httpproyecto.onreadystatechange = function(){
        if (httpproyecto.readyState === 4 &&  httpproyecto.status == 200){
          var jsonPro = JSON.parse(httpproyecto.responseText);
          app.mostrarPopUp(jsonPro.proyectos, indice); 
          
        }
      }
      httpproyecto.open("GET", "js/proyectos.json", true);
      httpproyecto.send();
    },
    cerrarPopUp:function(){
      document.getElementById("content-popUp").className="close-content";
    }
  };
}();
app.mostrarPopUp=function(proyectos, indice){
      var pop_up="";
      document.getElementById("content-popUp").className="container-popup";
      for(i=0; i < proyectos.length; i++){
        if(indice === i){
          var pop_up='<div class="window-pop-up"><img class="pop-up-image" src="'+proyectos[i].imagen+'"/><div class="pop-up-container-info"><h2 class="pop-up-title">'+proyectos[i].nombre+'</h2><p class="pop-up-description">'+proyectos[i].descripcion+'</p><a class="pop-up-link" href="'+proyectos[i].url+'">Ir al Sitio</a></div><div class="button-close" onclick="app.proyectos.cerrarPopUp()"></div></div>'
        }
      }
      document.getElementById("content-popUp").innerHTML= pop_up;
}
app.validacion=function(id){
      var input_check = document.getElementById(id);
      if(input_check.checkValidity())
          input_check.style.borderColor="#A686AF";
      else
          input_check.style.borderColor = "red";
    }
app.enviado=function(){
      var nombreCorrecto=document.getElementById('input-name').checkValidity();
      var emailCorrecto=document.getElementById('input-email').checkValidity();
      if(nombreCorrecto && emailCorrecto){
        alert("Su informacion fue enviada exitosamente");
      } else{
        alert("Por Favor revise sus campos.");
      }   
    }
app.ajaxRequest();