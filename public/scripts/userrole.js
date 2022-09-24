var table;
$(document).ready(function () {
	table = $('#example').DataTable({
		ajax: {
			dataType: 'json',
			method: 'GET',
			url: '/employeerolelist',
			dataSrc: 'results'
		},
        
        dom: 'Bfrtip',
        buttons: {
          dom: {
            container:{
              tag:'div',
              className:'flexcontent'
            },
            buttonLiner: {
              tag: null
            }
          },
          buttons: [
                    {
                        extend:    'copyHtml5',
                        text:      '<i class="fa fa-clipboard"></i>Copiar',
                        title:'Titulo de tabla copiada',
                        titleAttr: 'Copiar',
                        className: 'btn btn-app export barras',
                        exportOptions: {
                            columns: [ 0, 1 ]
                        }
                    },
                    {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'Titulo de tabla en pdf',
                        titleAttr: 'PDF',
                        className: 'btn btn-app export pdf',
                        exportOptions: {
                            columns: [ 0, 1 ]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [ 100, 0, 100, 0 ]

                        }
                    },

                    {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'Titulo de tabla en excel',
                        titleAttr: 'Excel',
                        className: 'btn btn-app export excel',
                        exportOptions: {
                            columns: [ 0, 1 ]
                        },
                    },
                    {
                        extend:    'csvHtml5',
                        text:      '<i class="fa fa-file-text-o"></i>CSV',
                        title:'Titulo de tabla en CSV',
                        titleAttr: 'CSV',
                        className: 'btn btn-app export csv',
                        exportOptions: {
                            columns: [ 0, 1 ]
                        }
                    },
                    {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Imprimir',
                        title:'Titulo de tabla en impresion',
                        titleAttr: 'Imprimir',
                        className: 'btn btn-app export imprimir',
                        exportOptions: {
                            columns: [ 0, 1 ]
                        }
                    },
                ]
            },

		columns: [
			{
				data: 'id'
			},
			{
				data: 'role'
			},
			{
				data: null,
				className: "dt-center editor-edit",
				defaultContent: '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>',
				orderable: false
			},
			{
				data: null,
				className: "dt-center editor-delete",
				defaultContent: ' <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>',
				orderable: false
			},

		]
	});
})




$('#example tbody').on('click', 'td.editor-delete', function () {
    var row = table.row($(this).parents('tr'));
    var d = row.data();
    var index = row.index();
    var json = { id: d.id, role:d.role}
  
    if (confirm("Are you confirm delete employeerole "   + json.role)) {
        $.ajax({
            type: 'delete',
            url: '/employeeroleremove/:id',
            data: json,
            dataType: 'json'
        })
        table.ajax.reload();
        alert("Employee was remove successfully***");
    }
});



$('#example tbody').on('click', 'td.editor-edit' ,function () {  
    var row = table.row($(this).parents('tr'));
    var d = row.data();
    var index = row.index();
    var id ={id: d.id}
     $.ajax({
         type: 'post',
         url: '/employeerolegetbyid',
         data: id,
         dataType: 'json',
         success :(json)=>{
          $('#id').val(json.employee.id);
          $('#role').val(json.employeerole.role);
          $('#menu').val(json.employeerole.menu);

          }
          })
     })
	
