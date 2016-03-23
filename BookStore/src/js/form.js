/**
 * Created by ff on 15/8/10.
 */
$().ready(function(){
    $('#validateForm').validate({
        errorElement:'span',
        errorClass:'help-block',
        rules:{
            email: {
                required:true,
                email:true,
                equalTo: "xiongmama@163.com"
            },
            password: {
                required:true,
                minlength:6,
                equalTo: "123456"
            }
        },
        message: {
            email: {
                required:"username is not null! please input email!",
                email: "please input correct email!",
                equalTo: "username is not correct,please input again!"
            },
            password: {
                required: "please input password!",
                minlength: "length can't litter of 6",
                equalTo: "password is wrong!"
            }
        },
        highlight: function(element){
            $(element).closest('.form-group').removeClass('has-error');
        },
        success: function(label){
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement: function(error,element){
            element.parent('div').append(error);
        }
    });
});