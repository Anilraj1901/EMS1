var table;
$(document).ready(function () {
    table = $('#example').DataTable({
        ajax: {
            dataType: 'json',
            method: 'GET',
            url: `/filteringbydepartment?department=${localStorage.department}`,
            dataSrc: 'results'
        },
        scrollY: '500vh',
        scrollCollapse: true,
        scrollY:        "300px",
        scrollX:        true,
        scrollCollapse: true,
        paging:         true,
        fixedColumns:   {
            left: 1,
            right: 2
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
                            columns: [ 0, 1,2,3,4,5,6,7,8,9 ]
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
                            columns: [ 0, 1,2,3,4,5,6,7,8,9 ]
                        },
                    },
                    {
                        extend:    'csvHtml5',
                        text:      '<i class="fa fa-file-text-o"></i>CSV',
                        title:'Titulo de tabla en CSV',
                        titleAttr: 'CSV',
                        className: 'btn btn-app export csv',
                        exportOptions: {
                            columns: [0, 1,2,3,4,5,6,7,8,9 ]
                        }
                    },
                    {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Print',
                        title:'Titulo de tabla en impresion',
                        titleAttr: 'Imprimir',
                        className: 'btn btn-app export imprimir',
                        exportOptions: {
                            columns: [ 0, 1,2,3,4,5,6,7,8,9 ]
                        }
                    },
                ]
            },
        columns: [
            {
                data: 'firstname'
            }, {
                data: 'lastname'
            },
            {
                data: 'department'
            },
            {
                data: 'mobilenumber'
            },
            {
                data: 'address'
            },
            {
                data: 'address2'
            },
            {
                data: 'email'
            },
            {
                data: null,
                className:  "dt-center editor-edit",
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
    //update the employee
    $('#edit_submit').on('click', function (e) {
        e.preventDefault();
        var id = $('#id').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var department = $('#department').val();
        var mobilenumber = $('#mobilenumber').val();
        var address = $('#address').val();
        var address2 = $('#address2').val();
        var email = $('#email').val();

        $.ajax({
            url: 'employeeupdate/:id',
            type: 'put',
            data: { id, firstname, lastname,department,mobilenumber, address, address2,email},

        })
    
        table.ajax.reload();
        $('#editEmployeeModal').hide();

      

});
 })
 
//Submit
$('submit').on('click', function () {
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var department= $('#department').val();
    var mobilenumber = $('#mobilenumber').val();
    var address = $('#address').val();
    var address2 = $('#address2').val();
    var email = $('#email').val();
    if (firstname == '' && email == '' && mobilenumber == '' && role == ''&& department==''&& lastname == '' && address == '') {
        alert('please enter the all fields!!!!')
        return false;
    }
    $.ajax({
        url: '/employee',
        type: 'post',
        data: { "firstname": firstname, "lastname": lastname,"department": department, "mobilenumber": mobilenumber, "address": address,"address2": address2, "email": email, "password": password }
    })
    table.ajax.reload()
    $('#addEmployeeModal').hide();

});






//get employee 
$('#example tbody').on('click', 'td.editor-edit' ,function () {  
    var row = table.row($(this).parents('tr'));
    var d = row.data();
    var index = row.index();
    var id ={id: d.id}
     $.ajax({
         type: 'post',
         url: '/employeegetbyid',
         data: id,
         dataType: 'json',
         success :(json)=>{
          $('#id').val(json.employee.id);
          $('#firstname').val(json.employee.firstname);
          $('#lastname').val(json.employee.lastname);
          $('#department').val(json.employee.department);
          $('#mobilenumber').val(json.employee.mobilenumber);
          $('#address').val(json.employee.address);
          $('#address2').val(json.employee.address2);
          $('#email').val(json.employee.email);
          }
         
          })
        })





//delete employee record
$('#example tbody').on('click', 'td.editor-delete', function () {
    var row = table.row($(this).parents('tr'));
    var d = row.data();
    var index = row.index();
    var json = { id: d.id, firstname: d.firstname }
  
    if (confirm("Are you confirm delete employee "   + json.firstname)) {
        $.ajax({
            type: 'delete',
            url: '/employeeremove/:id',
            data: json,
            dataType: 'json'
        })
        table.ajax.reload();
        alert("Employee was remove successfully***");
    }
});





