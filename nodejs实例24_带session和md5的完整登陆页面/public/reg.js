$('#tijiao').click(function () {
 
    
    $.post('/reg',
        {
        "name":$("#name").val(),
        "password":$("#password").val()
        },
        function (result) {
        if (result == '1') {
            alert('注册成功');
            
        } else {
            alert('注册失败');
        }
    })
});
