var table;
$(document).ready(function () {
    table = $('.example').DataTable({
        ajax: {
            dataType: 'json',
            method: 'GET',
            url:"/payrolllist",
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
                            columns: [ 0, 1,2,3,4,5 ]
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
                            columns: [ 0, 1,2,3,4,5 ]
                        },
                    },
                    {
                        extend:    'csvHtml5',
                        text:      '<i class="fa fa-file-text-o"></i>CSV',
                        title:'Titulo de tabla en CSV',
                        titleAttr: 'CSV',
                        className: 'btn btn-app export csv',
                        exportOptions: {
                            columns: [0, 1,2,3,4,5 ]
                        }
                    },
                    {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>Print',
                        title:'Titulo de tabla en impresion',
                        titleAttr: 'Imprimir',
                        className: 'btn btn-app export imprimir',
                        exportOptions: {
                            columns: [ 0, 1,2,3,4,5]
                        }
                    },
                ]
            },
        columns: [
            {
                data: 'id',
                visible:false,
            },
            {
                data: "department",
                render: function (data, type, row, meta) {
                    var dropdown = '';
                    if (row != null) {
                        dropdown += '<select class="department" name="department" >';
                        dropdown += '<option id="0" value="item0">Select Your Department</option>';
                        dropdown += '<option id="1" value="Development">Development</option>';
                        dropdown += '<option id="2" alue="Management">Management</option>';
                        dropdown += '<option id="3" value="Human Resource">Human Resource</option>';
                        dropdown += '<option id="4" value="Bussiness">Bussiness</option>';
                        dropdown += '</select>';
                    }
                    else {
                        dropdown = '<select class="department"><option value="item0">Select Your Department</option></select>';
                    }
                    return dropdown;
                }
                
            },
            {
                defaultContent: "",
                data: "role",
                render: function (data, type, row, meta) {
                    var dropdown = '';
                    if (row != null) {
                        dropdown += `<select  class="role" name="role">`;
                        dropdown += '<option>Select Your Role</option>';
                        dropdown += '</select>';
                        $('select[name=department]').on('change', function () {   
                            var attvalue = $(this).children(":selected").attr("id");
                             if ($(this).children(":selected").attr("id") == 0){ $(".role").html("<option value=''>--Select Your Role--</option>")
                             }else if ($(this).children(":selected").attr("id") == 1) { 
                                $(".role").html("<option value=''>Select Your Role</option><option value='fullstack developer'>Fullstack Developer</option><option value='ios developer'>IOS Developer</option><option value='android developer'>Android Developer</option>>");
                             }else if ($(this).children(":selected").attr("id") == 1){
                             $(".role").html("<option value=''>Select Your Role</option><option value='admin'>Admin</option><option value='general manager'>General Manager</option><option value='manager'>Manager</option><option value='assistant manager'>Assistant Manager</option>");
                             }
                             else if ($(this).children(":selected").attr("id") == 1){
                              $(".role").html("<option value=''>Select Your Role</option><option value='senior'>Senior</option><option value='junior'>junior</option>");
                             }
                             else if ($(this).children(":selected").attr("id") == 1){
                              $(".role").html("<option value=''>Select Your Role</option><option value='manager'>Manager</option><option value='assistant manager'>Assistant Manager</option><option value='senior sales excecutive'>Senior Sales Excecutive</option><option value='junior sales excecutive'>junior Sales Excecutive</option>");
                             }
                   });
                    }
                    else {
                        dropdown = '<select class="role"><option value="">Select Your role</option></select>';
                    }
                    return dropdown;
                }
            },
		
            {
                defaultContent: "",
                data: "timeperiod",
                render: function (data, type, row, meta) {
                    var input = '';
                    if (row != null) {
                        input +=`<input type="number" name="timepriod"  class ="at" value=${data}>`;
            }
            else {
                input = '';
            }
            return input;
            
                }
            },

            {
                defaultContent: "",
                data: "amount",
                render: function (data, type, row, meta) {
                    var input = '';
                    if (row != null) {
                        input +=`<input type="number" name="amount" class="at" value=${data}>`;
                      
            } 
            else {
                input = '';
            }
            return input;
                }
            },
            {
                data: 'totalamount',
                render: function (data, type, row, meta) {
                    var input = '';
                    if (row != null) {
                        input +=`<span  class='totalamount' >${data}</span>`;
                        $('.example input').change(function(){
                            var p=$(this).parent().parent()
                            var m=p.find('input.at')
                            var mul=parseFloat($(m[0]).val()*$(m[1]).val())
                            var res=p.find('.totalamount')
                            res.html(mul);
                            
                            $('.example .totalamount').each(function(){
                                total+=parseFloat($(this).html())
                            })
                           
                        });
                      
            } 
            else {
                input = '';
            }
            return input;
                }
            },
          
        ],
          

    }); 
    
});
 


