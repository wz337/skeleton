// This is the idiomatic way to ensure that JQuery does not
// execute until the page has loaded
$(function(){
    $("#add-receipt").click(function(){
        $('#receipt-form').css("display", "block");
    });

    $("#cancel-receipt").click(function(){
        $('#merchant').empty();
        $('#amount').empty();
        $('#receipt-form').css("display", "none");
    });

    $("#save-receipt").click(function(){
        $.ajax({
            type: 'POST',
            url: '/receipts',
            data: JSON.stringify({"merchant":$("#merchant").val(),"amount":$("#amount").val()}),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                var d = new Date();
                var date = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();
                var merchant = $("#merchant").val();
                $(`<div class="receipt" id="${data}">
                            <span class="date">${date}</span>
                            <span class="merchant">${merchant}</span>
                            <span class="amount">${$("#amount").val()}</span>
                            <span class="tag">
                            <button class="add-tag">Add +</button></span>`)
                    .appendTo($("#receiptList"));
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });
});

$(document).on('click','.add-tag',function(){
    $(this).after("<input class='tag_input' type='text' placeholder='tag'></input>");
});

$(document).on('click','.tagValue',function(){
    $(this).remove();
    $.ajax({
        type: 'PUT',
        contentType: 'text/plain',
        url: '/tags/'+$(this).text(),
        data: $(this).parent().parent().attr('id')
    });
});

$(document).on('keypress','.tag_input',function(e){
    var tagHtml = $(this).val();
    if(e.keyCode == 13)
    {
        $.ajax({
            type: 'PUT',
            contentType: 'text/plain',
            url: '/tags/'+$(this).val(),
            data: $(this).parent().parent().attr('id')
        });
        $(`<button class="tagValue">${tagHtml}</button>`)
            .appendTo($('.tag', $("#"+$(this).parent().parent().attr('id'))));
        $(this).remove();
    }
});

//        $(function(){
//            const api = "";
//            $.getJSON(api+"/tags", function(receipts){
//                var ids = [];
//                for(var i=0; i < receipts.length; i++) {
//                    var receipt = receipts[i];
//                    if($.inArray(receipt.id, ids)==-1){
//                      $(`<div class="receipt" id="${data}"><span class="date">${date}</span> <span class="merchant">${$("#merchant").val()}</span>
//                      <span class="amount">${$("#amount").val()}</span>
//                      <span class="tag">
//                      <button class=".add-tag">Add +</button></span>`)
//                          .appendTo($("#receiptList"));
//                        ids.push(receipt.id);
//                    }else{
//                        // alert(receipt.tag);
//                        $(`<button class="tagValue">${receipt.tag}</button>`)
//                            .appendTo($('.tag', $("#"+receipt.id)));
//                    }
//
//                }
//            })
//        });