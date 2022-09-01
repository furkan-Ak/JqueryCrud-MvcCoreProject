
$(function () {
    FormuGetir(); // direk page yüklendiğinde direk  formlar görüntülenecek çnükü görüntüleme fonskiyonu prje ayaklandığında çalışacak  bu bir tercih diğer ise her işlemin success inde görüntüleme 
    //fonksiyonunu çağırırım
})

function btnDelete(id) {
    if (confirm('Kaydı Silmek Üzeresiniz!')) {
        //var form = {}
        //form.FormId = id;
        $.ajax({
            type: "POST",
            url: "/Form/DeleteForm/" + id,
            /* data: { deletemodel: form },*/
            //dataType: "json",
            success: function () {
                FormuGetir();
                //  return FormId;
            }
        });
    }
};

function FormuGetir() {
    $.ajax({
        type: "GET",
        url: "/Form/GetForms",
        data: null,
        async: false,
        dataType: "json",
        success: function (data) {
            $("#tblform").DataTable().destroy();
            var satirlar = "";
            for (var i = 0; i < data.length; i++) {
                satirlar += `

                    <tr class ="flex justify-content-center" >

                        <td class="border" id="Id">${data[i].form.id}</td>

                        <td class="border" id="FullName">${data[i].form.fullName}</td>
                    
                        <td class="border" id="Adress">${data[i].form.adress}</td>
                
                        <td class="border" id="Mail">${data[i].form.mail}</td>

                        <td class="border" id="Telephone">${data[i].form.telephone}</td>

                        <td class=""border id="Konum">${data[i].ulkeAd}</td>

                        <td class=""border id="Konum">${data[i].sehirAd}</td>

                        <td>
                        <img src="${data[i].image.imageUrl}" id="Image" widht="50" height="50"
                        </td>

                        <td>
                              <button  class="btn btn-success" onclick="updateGetData(${data[i].form.id})"> Update</button >
                        </td>
                        <td>
                              <button class="btn btn-danger" onclick ="btnDelete(${data[i].form.id})"> Delete</button >
                        </td>
                    </tr >
                    `;

            }
            $("#tbody1").html(satirlar);


        }

    })
};

/*
<img src="${data.}
                      
 <div>
                        <img src="${i}" class="border" id=""> </td>
                        </div>









@foreach(var item  in ViewBag.FormListe as List<DbForm>)
{
    <tr>
        <td>@item.FormId</td>
        <td>@item.FullName</td>
        <td>@item.Adress</td>
        <td>@item.Mail</td>
        <td>@item.Telephone</td>
        <td><a id="btnUpdate" class="btn btn-danger" data-target="#myModal" data-toggle="modal" itemid="@item.FormId"> Update</a></td>
        <td><a id="btnDelete" class="btn btn-danger" itemid="@item.FormId"> Delete</a></td>
    </tr>




}*/
/*  var FormVM = {
      FullName: $("#FullName").val(), //Reading text box values using Jquery
    Adress: $("#Adress").val(),
    Mail: $("#Mail").val(),
      Telephone: $("#Telephone").val()
 }
 //var model = FormVM;
 $.ajax(
     {
         type: "POST", //HTTP POST Method
         url: "/Form/AddForms",
         dataType:"json",
         data: FormVM,
         success: function (result) {
         },
         error: function (xhr, ajaxOptions, thrownError) {
             alert(xhr.status);
            alert(thrownError);*/


/*
$("#ShowForm").on("click", function () {
   $.ajax({
       type: "POST",
       url: "/Form/GetForms",
       data: '{}',
       dataType: "json",
       success: function (response) {
       },
       failure: function (r) {
           alert(r.responseText);
       },
       error: function (r) {
           alert(r.responseText);
       }
   });
});

*/
/*
$("#btnUpdate").on("click", function () {
    var upForm = {}
    upForm.FormId = $(this).attr('itemid')
    $.ajax(

        {
            type: "POST", //HTTP POST Method
            url: "/Form/UpForm",
            dataType: "json",
            data: { upModel: upForm },
            success: function (result) {
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

});*/

//ar mdoel = {};


/*function UploadFile() {
    var data = new FormData();
    var selectedFiles = $("#ImgId")[0].files;
    data.append(selectedFiles[0].ImageTitle, selectedFiles[0]);

    $.ajax({
        type: "POST",
        url: "/Form/UploadFile",
        contentType: false,
        processData: false,
        data: data,
        success: function (result) {
            alert(result);
        },
        error: function () {
            alert("There was error uploading files!");
        },


    });
};*/



/*
function UploadFile() {
var files = document.getElementById('file').files;// $('#file').files[0];// e.target.files;
if (files.length > 0) {
    if (window.FormData !== undefined) {
        var data = new FormData();
        for (var x = 0; x < files.length; x++) {
            data.append("file" + x, files[x]);
            //data.append(base64String, base64String);
        }
        $.ajax({
            type: "POST",
            url: '/Form/UploadFile',
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
                alert(result)
            },
           /* error: function (xhr, status, p3, p4) {
                alert('Something is going to wrong please try agan!');
            }*/

/*
function UploadFile() {


    var fileUpload = document.getElementById("#ImgId");
    var files = fileUpload.files;

    // Create  a FormData object
    var fileData = new FormData();
    fileData.append(fileUpload.name, files[0]);
    $.ajax({
        url: "/Form/UploadFile",
        type: "POST",
        processData: false,
        contentType: false,
        data: fileData,
        success: function (result) {
            alert(result);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
        }

*/

//function btnUpload() {

//    // Checking whether FormData is available in browser

//    var input = document.getElementById("ImgId"); //get file input id
//    var files = input.files; //get files
//    var formData = new FormData(); //create form

//    for (var i = 0; i != files.length; i++) {
//        formData.append("files", files[i]); //loop through all files and append
//    };

//        $.ajax({
//            url: '/Form/UploadFiles',
//            type: "POST",
//            contentType: false,
//            processData: false,
//            data: { upPhoto: formData },
//            success: function (result) {
//                alert(result);
//            },
//            error: function (err) {
//                alert(err.statusText);
//            }
//        });
//};

//var upForm = {}; // dışarda tutuyoruz diğerlerinden çağırmak için
