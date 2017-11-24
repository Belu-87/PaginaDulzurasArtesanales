var dataString=[];//new Array();

 $(function () 
 {
 	var i=2;


	$('#producto1').fastselect();
	$('#detalle1').fastselect();

	$('.fstQueryInput').attr("placeholder","Buscar...");
	
	$('#agregar').click(function(){
		AddFila();		
	})


	 function AddFila(){ 
			var data='<tr id="'+i+'" class="fila aparece"><td><select id="producto'+i+'" class="fstElement fstSingleMode form-control" ';

			data+='name="uno" placeholder="opcion">';
			data+='</select></td><td>  ';
			
			data+='<select class="fstElement fstSingleMode fstNoneSelected form-control" multiple name="language" placeholder="opciones" id="detalle'+i+'"> ';
			data+='</select> ';		
			data+='</td><td><input class="form-control" type="number" step="1" id="cantidad'+i+'"></td> ';
			data+='<td><div class="input-group"><span class="input-group-addon">$</span> ';
			data+='<input disabled="disabled" id="precioUnit'+i+'" class="form-control" type="number" ';
			data+='step="0.01"></div></td><td><div class="input-group"><span class="input-group-addon">$</span> ';
			data+='<input disabled="disabled" id="precioTotal'+i+'" class="form-control total" type="number" step="0.01"></div> ';
			data+='</td><td><img id="eliminar'+i+'" class="imagen-fila eliminar aparece" src="../Imagenes/delete.png"></td> ';
			data+='<!-- <td><input type="button" class="add" value="Add Row"></td> --> ';
			data+='<td><img style="display: none;" id="agregar'+i+'" class="imagen-fila aparece" src="../Imagenes/add.png"></td></tr> ';

		

			$('#tabla tbody>tr:last').after(data);	

			var campo="#producto"+i;
			$(campo).fastselect();
			campo="#detalle"+i;
			$(campo).fastselect();

			/*agrego evento eliminar*/
			campo="#eliminar"+i; 
			$(campo).on('click',function(){		
				$(this).closest('tr').fadeOut(2000);	
				$(campo).fadeOut(1000,function(){$(this).closest('tr').remove();});

				setTimeout(function(){
					getSumaTotales();
				},600);

			});

			/*agrego eventos de precio para los campos editables*/
			campo="#producto"+i;
			$(campo).on('change keyup',function(){	
			var filaId=$(this).closest('tr').attr('id');
				CalcularPrecio(filaId);
			});


			campo="#detalle"+i;
			$(campo).on('change keyup',function(){	
			var filaId=$(this).closest('tr').attr('id');
				CalcularPrecio(filaId);
			});			

			campo="#cantidad"+i;
			$(campo).on('change keyup',function(){	
			var filaId=$(this).closest('tr').attr('id');
				CalcularPrecio(filaId);
			});
			/********************************************/

			/*copio los items del select de producto*/
			var $options = $("#producto1 > option").clone();
			$('#producto'+i).append($options);		

			/*copio los items del select de detalle*/
		    $options = $("#detalle1 > option").clone();
			$('#detalle'+i).append($options);	

			$('.fstQueryInput').attr("placeholder","Buscar...");

			// var hijos1=$('#producto'+i+ ' .fstElement.fstSingleMode').children();
			// var hijos2=$('#producto1 '+'.fstElement.fstSingleMode').children();
			
			
			// //hijos=$('#producto'+i+'.fstToggleBtn');
			// console.log( hijos1);
			// console.log( hijos2);

			i+=1;
	 }


 	$('#next').click(function(){
		$('#form1').animate({
			right:'250px',
			opacity:'0',			
		});

		$('#form2').animate({			
			opacity:'1',
			right:'0px'
		});

		$('#form2').show('slow');		
		$('#form1').hide('slow');


		$('#back').show();
		$('#next').hide();
		$('#confirmar').show();
	});


 	$('#back').click(function(){
		$('#form1').animate({
			right:'0',
			opacity:'1',					
		});

		$('#form2').animate({			
			opacity:'0',
			right:'250px'
		});

		$('#form2').hide('slow');
		$('#form1').show('slow');

		$('#back').hide();		
		$('#confirmar').hide();
		$('#next').show();
	});	


	/*agrego eventos a la primer fila que no se puede eliminar*/
	$('#producto1').change(function(){
		var filaId=$(this).closest('tr').attr('id');
		CalcularPrecio(filaId);
	});

	$('#detalle1').change(function(){
		var filaId=$(this).closest('tr').attr('id');
		CalcularPrecio(filaId);
	});	

	$('#cantidad1').change(function(){
		var filaId=$(this).closest('tr').attr('id');
		CalcularPrecio(filaId);
	});	

	/*******keyUp*******/
	$('#producto1').keyup(function(){
		var filaId=$(this).closest('tr').attr('id');
		CalcularPrecio(filaId);
	});

	$('#detalle1').keyup(function(){
		var filaId=$(this).closest('tr').attr('id');
		CalcularPrecio(filaId);
	});	

	$('#cantidad1').keyup(function(){
		var filaId=$(this).closest('tr').attr('id');
		CalcularPrecio(filaId);
	});	
	/*******************/

	$('#next').click(function(){
		getResumenPedido();
	});	
	// $('#precioUnit1').change(function(){
	// 	var filaId=$(this).closest('tr').attr('id');
	// 	alert();
	// 	getPrecioTotal(filaId);
	// });	


	$("#calle").on('change keyup',function(){	
		EstaOK();
	});

	$("#altura").on('change keyup',function(){	
		EstaOK();
	});	



 });


function Validacion()
 {
 	getDatosDeRegistro();
 	 var jsonString =JSON.stringify(dataString);
	 /*validar campos antes de insertar*/
	 if (EstaOK())
	 {
 		 $.ajax({
			 url:'includes/registrarpedido.php',
			 type:"POST",
			 data:{funcion:'RegistrarPedido',
				 datos:jsonString,total:$("#totalPedido").val(),
				 calle:$("#calle").val(),
				 altura:$("#altura").val(),
				 telefono:$("#telefono").val()
				},
			 datatype:"json",
			 async:true,
			 success:function(response)
			 {
			 	if(response=="registrarse")
			 	{
			 		$("header").append("<div id='myModalError' class='modal fade bd-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'><div class='modal-content'>Por favor, inicie sesion para continuar</div></div></div>");
			 		$('#myModalError').modal('show');
			 	}
			 	else
			 	{
			 		//alert(response);
			 		$("header").append("<div id='myModal' class='modal fade bd-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'><div class='modal-content'><b>¡Gracias por su compra!</b><br>redireccionando a inicio...</div></div></div>");
			 		$('.modal-content').css("color","#FF80C0");
			 		$('#myModal').modal('show');	
			 		setTimeout(function(){
			 			window.location.replace("home.php");
			 		},3000);		 		
			 		console.log(response);			 		
			 	}

				// if (response=="ok") 
				// {
				// 	$(".form-top").fadeOut(2000);
				// 	$(".form-bottom").fadeOut(2000);
		
				// 	$("h1").html("¡Gracias por registrarte!");
				// 	$("h1").fadeIn(3000);
				// }
				// else
				// {
				// 	$(".form-top").fadeOut(2000);
				// 	$(".form-bottom").fadeOut(2000);

				// 	$("h1").fadeIn(3000);	
				// } 
			 }
		})
	 }
 }

 function ObtenerProductos()
 {
		 $.ajax({
			 url:'includes/registrarpedido.php',
			 type:"POST",
			 data:{funcion:'ObtenerDetalleProductos'},
			 datatype:"json",	
			 async:true,		
			 success:function(response)
			 {
			 	alert(response);
			 	 console.log(response);
			 }
		});

 }

 function EstaOK()
 {
 	var result=true;

 	if ($("#calle").val() != "")
 	{
  		$("#calle").removeClass("error");		
 		//return true;
 	}
 	else
 	{
 		$("#calle").addClass("error");
 		result=false;
 	} 

 	if ($("#altura").val().match(/[0-9 -()+]+$/))
 	{
  		$("#altura").removeClass("error");		
 		//return true;
 	}
 	else
 	{
 		$("#altura").addClass("error");
 		result=false;
 	} 

 	return result; 
 }


function CalcularPrecio(filaId)
 {
	/*obtengo el id del producto seleccionado*/
	var inputProducto="#producto"+filaId;
	//alert(  $(campo).val()  );

	/*obtengo los ids del detalle seleccionado*/
	var inputDetalle="#detalle"+filaId;
	//alert(  $(campo).val()  );

	//var dd=new Array();	
	//jsonProductos=$.getJSON("json/jsonProductos.json");	

	getPrecioUnitarioProducto(filaId);
	getPrecioUnitarioDetalleProducto(filaId);
	setTimeout(function(){
		getPrecioTotal(filaId);
	},500);
	getSumaTotales();

 }


function getPrecioUnitarioProducto(filaId)
{
	var url="json/jsonProductos.json";
	var precio=0;
	$.getJSON(url, function (data) {		
		//alert(data[0].precioUnitario); 

		var i=0;
		var encontre=false;
		var inputPrecioUnit="#precioUnit"+filaId;
		var inputProd="#producto"+filaId;
		while(!encontre && i<data.length)
		{	
			if(data[i].id==$(inputProd).val())
			{
				precio=isNaN( parseFloat( data[i].precioUnitario ) )?0: parseFloat(data[i].precioUnitario);
				encontre=true;
				$(inputPrecioUnit).val( precio.toFixed(2) );
				return;
			}
			i+=1;
		}
    });
    return precio;
}


function getPrecioUnitarioDetalleProducto(filaId)
{
	var url="json/jsonDetalleProductos.json";
	var precio=0;
	$.getJSON(url, function (data) {		
		var i=0;
		var encontre=false;
		var inputPrecioUnit="#precioUnit"+filaId;
		var inputDetProd="#detalle"+filaId;
		var ids=$(inputDetProd).val().toString();
		var detalle = ids.split(',');

		for (var aux = 0; aux < detalle.length; aux++) 
		{
			i=0;
			while(i<data.length)
			{	
				if(data[i].id==detalle[aux])
				{
					precio=isNaN( parseFloat( data[i].suma ) )?0: parseFloat(data[i].suma);
					precio+=isNaN( parseFloat( $(inputPrecioUnit).val() ) )?0: parseFloat( $(inputPrecioUnit).val() );
					$(inputPrecioUnit).val( precio.toFixed(2) );					
				}
				i+=1;
			}

		}
    });
    return precio;
}



function getPrecioTotal(filaId)
{
	try
	{	
		var precioUnit=isNaN( parseFloat( $('#precioUnit'+filaId).val() ) )?0: parseFloat($('#precioUnit'+filaId).val());
		var cantidad=isNaN( parseFloat( $('#cantidad'+filaId).val() ) )?0: parseFloat($('#cantidad'+filaId).val());
		//alert(precioUnit);
		//alert(cantidad);
		$("#precioTotal"+filaId).val( (precioUnit*cantidad).toFixed(2) );
	}
	catch(err)
	{

	}

}

function getSumaTotales()
{
	try
	{	
		var total=0;
		setTimeout(function(){
			total=0;
			$(".total").each(function(){
				total+=isNaN( parseFloat( $(this).val() ) )?0: parseFloat($(this).val());
				$("#totalPedido").val(total.toFixed(2));
			});
		},500);		
	}
	catch(err)
	{

	}

}


function getResumenPedido()
{
	try
	{	
		$(".resumen").html("");
		$(".fila").each(function(){
			var filaId=$(this).attr("id");
			getDescripcionProducto(filaId);//setTimeout(function(){getDetalleProducto(filaId);},500);
			getDescripcionDetalleProducto(filaId);
			getResumenTotal();
		});


	}
	catch(err)
	{

	}

}

function getResumenTotal()
{
	$(".resumenTotal").html("");
	$(".resumenTotal").append("<label>Total---$"+$("#totalPedido").val()+"</label>");
}



function getDescripcionProducto(filaId)
{
	var url="json/jsonProductos.json";
	var descripcion="";
	$.getJSON(url, function (data) {		
		var i=0;
		var encontre=false;
		var inputProd="#producto"+filaId;
		while(!encontre && i<data.length)
		{	
			if(data[i].id==$(inputProd).val())
			{
				descripcion=data[i].descripcion;
				encontre=true;
				$(".resumen").append("<br><label><b>"+descripcion+" </b></label>");
				$(".resumen").append("<label>X "+$("#cantidad"+filaId).val()+" u. ----$"+$("#precioTotal"+filaId).val()+"</label>");
				return descripcion;
			}
			i+=1;
		}
    });
    return descripcion;
}


function getDescripcionDetalleProducto(filaId)
{
	var url="json/jsonDetalleProductos.json";
	var descripcion="";
	$.getJSON(url, function (data) {		
		var i=0;
		var inputDetProd="#detalle"+filaId;
		var ids=$(inputDetProd).val().toString();
		var detalle = ids.split(',');

		for (var aux = 0; aux < detalle.length; aux++) 
		{
			i=0;
			while(i<data.length)
			{	
				if(data[i].id==detalle[aux])
				{
					descripcion+="-"+data[i].descripcion;			
				}
				i+=1;
			}
		}
		$(".resumen").append("<label>"+descripcion+"</label>");
    });
    return descripcion;
}




function getDatosDeRegistro()
{
	try
	{	
		dataString=[];//new Array();
		$(".fila").each(function(){
			var filaId=$(this).attr("id");
			var prod=$("#producto"+filaId).val();
			var detalle=$("#detalle"+filaId).val();
			
			var item={};
			item["id"]=prod;
			item["detalle"]=detalle;
			item["cantidad"]=$("#cantidad"+filaId).val();
			item["precioUnitario"]=$("#precioUnit"+filaId).val();			
			item["precioTotal"]=$("#precioTotal"+filaId).val();

			//var fila=new Array(prod,detalle,$("#cantidad"+filaId).val(),$("#precioUnit"+filaId).val(),$("#precioTotal"+filaId).val());
			dataString.push(item);
		});


	}
	catch(err)
	{

	}

}