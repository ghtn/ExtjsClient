/**
 * 登录js
 * Created by Administrator on 2014/4/1.
 */

var loading = false;
var idCardInfo;
/**
 * 登录
 */
function login() {
    if (loading == false) {
        var idCard = $("#idCard").val();

        if (idCard == undefined || idCard == null || idCard == "") {
            alert("请输入身份证号!");
            return;
        }

        var idCardReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/; // 身份证号正则表达式
        if (!idCardReg.test(idCard)) {
            alert("身份证号格式不正确!");
            return;
        }

        $.mobile.loading("show", {text: "正在登录...", textVisible: true});
        loading = true;


        $.ajax({
            url: "/InformationSystemService/exam/login",
            data: "idCard=" + idCard,
            dataType: "json",
            type: "post",
            timeout: 10000,
            success: function (data) {
                if (data != undefined && data != null && data.code == 1) {
                    // 登陆成功
                    $("#loginForm").hide();
                    $("#loginInfo").show();

                    $("#idCardInfo").val(data.idCard);
                    $("#nameInfo").val(data.name);
                    $("#deptInfo").val(data.deptName);

                    idCardInfo = data.idCard;
                } else {
                    $().toastmessage('showToast', {
                        text: '登录失败！',
                        sticky: false,
                        position: 'middle-center',
                        type: 'error'
                    });
                }
                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $().toastmessage('showToast', {
                    text: '访问服务器错误！',
                    sticky: false,
                    position: 'middle-center',
                    type: 'error'
                });
                $.mobile.loading("hide");
                loading = false;
            }
        });
    }

}

function loginSuccess() {
    sessionStorage.setItem("idCardInfo", idCardInfo);
    if (loading == false) {
        $.mobile.loading("show", {text: "正在获取考试信息...", textVisible: true});
        loading = true;

        $.ajax({
            url: "/InformationSystemService/exam/listExam",
            dataType: "json",
            type: "post",
            timeout: 10000,
            success: function (data) {
                if (data != undefined && data != null && data.code == 1) {
                    $.mobile.changePage("#select");
                    var select = $("#examSelect");

                    select.html("");
                    var examList = data.examList;
                    var selectStr = "";
                    for (var i = 0; i < examList.length; i++) {
                        selectStr += "<option value='" + examList[i].id + "'>" + examList[i].name + "</option>";
                    }
                    $(selectStr).appendTo(select);
                    select.selectmenu('refresh', true);
                } else {
                    $().toastmessage('showToast', {
                        text: '获取考试信息失败！',
                        sticky: false,
                        position: 'middle-center',
                        type: 'error'
                    });
                }
                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $().toastmessage('showToast', {
                    text: '访问服务器错误！',
                    sticky: false,
                    position: 'middle-center',
                    type: 'error'
                });
                $.mobile.loading("hide");
                loading = false;
            }
        });
    }

}

function loginError() {
    $("#loginForm").show();
    $("#loginInfo").hide();
}

function startExam() {
    var selectVal = $("#examSelect").val();
    var idCardInfo = sessionStorage.getItem("idCardInfo");
    if (loading == false) {
        $.mobile.loading("show", {text: "正在获取考试人员信息...", textVisible: true});
        loading = true;

        $.ajax({
            url: "/InformationSystemService/exam/checkExamEmp",
            data: "examId=" + selectVal + "&idCard=" + idCardInfo,
            dataType: "json",
            type: "post",
            timeout: 10000,
            success: function (data) {
                if (data != undefined && data != null && data.code == 1) {
                    sessionStorage.setItem("examId", selectVal);
                    window.location.href = "exam.html";
                } else {
                    $().toastmessage('showToast', {
                        text: '没有匹配的考试人员信息！',
                        sticky: false,
                        position: 'middle-center',
                        type: 'error'
                    });
                }
                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $().toastmessage('showToast', {
                    text: '访问服务器错误！',
                    sticky: false,
                    position: 'middle-center',
                    type: 'error'
                });
                $.mobile.loading("hide");
                loading = false;
            }
        });
    }

}