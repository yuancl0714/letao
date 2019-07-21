$(function () {
    // 初始化表单校验
    $("form").bootstrapValidator({
        // 配置校验规则 用户名不能为空， 密码不能为空、长度为6-12
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        message: '密码长度为6-12位',
                        min: 6,
                        max: 12
                    }
                }
            }
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    //阻止表单的跳转
    $("form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            success: function (info) {
                if (info.success) {
                    location.href = "index.html"
                }
                if (info.error == 1000) {
                    alert("用户名不存在");
                }
                if (info.error == 1001) {
                    alert("密码不正确");
                }
            }
        })
    });

    // 重置表单样式
    $("[type='reset']").on("click", function () {
        $("form").data("bootstrapValidator").resetForm(true);
    })
})


