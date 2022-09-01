function GetSehirByUlke(){
    $.ajax({
        type: 'GET',
        url: "/Form/GetSehirList/" + $("#GetUlke").val(),
        data: null,
        success: function (data) {
            console.log(data);

            sehirList = data;
            var str = '<option value="0">Sehir Seç</option>'
           
            for (var i = 0; i < sehirList.length; i++) {
                str += `<option value="${sehirList[i].id}">${sehirList[i].tanım}</option>`

                $("#GetSehir").html(str); // içeride yazıldı çünkü her seferinde ülke seçildiğinde şehirler yeniden gelmeli
            }

            
        },
        error: function (e) {
            alert(e);
        }
    });
    return false;
}


