function uploadFiles() {
    var input = document.getElementById("FileUpload");
    var files = input.files; // yüklenen dosyayı yükleme .files kendiliğinde olan bir func

    // Create  a FormData object
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]); //tüm dosyalar arasında dolaş ve ekle
    }
    $.ajax({
        url: "/Form/UploadFile",
        type: "POST",
        processData: false,
        contentType: false, // bu ikisi olmak zorunda file için işlem gerçekleşmesini istemiyoruz bir kod içermiyo
        data: formData,
        success: function (result) {
            console.log(result);
            // yüklenen dosya urlsii burda
            /* $("#divimg").html("");*/
            if (result.success == true) {
                alert("Dosya Yüklendi!");

            }
            var imgurl = "/" + result.imageUrl; // url kendiliğinden / siz geliyo ekstra eklemek gerekiyo 
            $("#imdidbas").attr("src", imgurl); // verilen id img taginde src yoluna imgrly yi göm anlamında,
            $("#imdidbas").attr("medyaid", result.imgId); // idyi çekmek için fotoğrafın idsini img tagınde bir attr oluşturup ona atadım ve ekleme js te bu attr ü çekip kullanıyoruz.

        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

//function ImgGoster(input) {
//    if (input.files && input.files[0]) {
//        var reader = new FileReader();

//        var img = $("#ImgGos");
//        reader.onload = function (e) {
//            img.attr("src", e.target.result);

//        }
//        reader.readAsDataURL(input.files[0]);
//    }
//}
//$("#fileUpload").change(function () {
//    ImgGos(this);
//});