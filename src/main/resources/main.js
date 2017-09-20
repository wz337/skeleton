

        // This is the idiomatic way to ensure that JQuery does not
        // execute until the page has loaded
        $(function(){
            const api = "http://localhost:8080"; // <- do not need a root api URL if this page is served directly by the API
            $.getJSON(api+"/tags", function(receipts){
                var ids = [];
                for(var i=0; i < receipts.length; i++) {
                    var receipt = receipts[i];
                    if($.inArray(receipt.id, ids)==-1){
                      $(`<div class="receipt" id="${data}"><span class="date">${date}</span> <span class="merchant">${$("#merchant").val()}</span>
                      <span class="amount">${$("#amount").val()}</span>
                      <span class="tagValueBox">
                      <button class="add-tag">Add +</button></span>`)
                          .appendTo($("#receiptList"));
                        ids.push(receipt.id);
                    }else{
                        // alert(receipt.tag);
                        $(`<button class="tagValue">${receipt.tag}</button>`)
                            .appendTo($('.tagValueBox', $("#"+receipt.id)));
                    }

                }
            })
        })

        $(document).on('click','.add-tag',function(){
            $(this).after("<input class='tag_input' type='text'></input>");

        });

        $(document).on('click','.tagValue',function(){
            // alert();
            $.ajax({
                type: 'PUT',
                contentType: 'text/plain',
                url: 'http://localhost:8080/tags/'+$(this).text(),
                data: $(this).parent().parent().attr('id'),
            });
            $(this).remove();
            //alert($(this).parent().parent().attr('id'));
        });


        $(document).on('keypress','.tag_input',function(e){
            var tag = $(this).val();
            if(e.keyCode == 13)
            {//put
                $.ajax({
                    type: 'PUT',
                    contentType: 'text/plain',
                    url: 'http://localhost:8080/tags/'+$(this).val(),
                    data: $(this).parent().parent().attr('id'),
                });
                $(`<button class="tagValue">${tag}</button>`)
                    .appendTo($('.tagValueBox', $("#"+$(this).parent().parent().attr('id'))));
                $(this).remove();

            }
        });


        $(document).ready(function(){
            $('#add-receipt').on('click', function () {
                $('#receipt-form').show();
            });

            $('#cancel-receipt').on('click', function () {
                $('#merchant').val('');
                $('#amount').val('');
                $('#receipt-form').hide();
            });

            $("#save-receipt").click(function(){
                //post
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/receipts',
                    data: JSON.stringify({"merchant":$("#merchant").val(),"amount":$("#amount").val()}),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function(data) {
                        var d = new Date();
                        var date = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();
                        $(`<div class="receipt" id="${data}"><span class="date">${date}</span> <span class="merchant">${$("#merchant").val()}</span>
                        <span class="amount">${$("#amount").val()}</span>
                        <span class="tagValueBox">
                        <button class="add-tag">Add +</button></span>`)
                            .appendTo($("#receiptList"));
                    },
                    error: function (jqXHR, exception) {
                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Connection Error';
                        } else if (jqXHR.status == 404) {
                            msg = '[404]';
                        }
                        else {
                            msg = 'Error';
                        }
                        $('#error').html(msg);
                    },
                });

            });
        });
