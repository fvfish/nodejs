$('#tijiao').click(function () {
    $.post('/dologin',
        {
            name:$('#name').val(),
            password:$('#password').val(),
        }
    ,function (result) {
        if (result == '1') {
            alert('登陆成功');
        } else {
            if (result == '-2') {
                alert('该用户不存在');
                return;
            }
            if (result == '-1') {
                alert('密码不对');
                return;
            }
        }
    })
});
