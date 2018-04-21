$(document).ready(() => {
    $("#submit").click((e) => {
        $('span').remove();
        e.preventDefault();
        $.post('/signup', {
            email: $('#email').val(),
            password: $('#password').val(),
            confirm_password: $('#confirm_password').val(),
            full_name: $('#full_name').val(),
            address: $('#address').val()
        }, (data) => {
            if (data.errors) {
                $('#password').val("");
                $('#confirm_password').val("");
                if (data.errors.email) {
                    $('#email').val('');
                    $('<span class="email">' + data.errors.email.msg + '</span>').insertBefore("#email");
                }
                if (data.errors.password) {
                    $('<span>' + data.errors.password.msg + '</span>').insertBefore("#password");
                } else {
                    if (data.errors.confirm_password) {
                        $('<span>' + data.errors.confirm_password.msg + '</span>').insertBefore("#confirm_password");
                    }
                }
                if (data.errors.full_name) {
                    $('#full_name').val("");
                    $('<span>' + data.errors.full_name.msg + '</span>').insertBefore("#full_name");
                }
            }
            if (data == 'ok') {
                alert('Bạn đã đăng ký thành công');
                $('.container').remove();
            }
        })
    })
})  