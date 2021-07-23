$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    $('.input_sub').on('click', function () {
        // console.log('lll');
        var text = $('.input_txt').val().trim()
        if (text.length <= 0) {
            return $('.input_txt').val('')
        } else {
            //    输入聊天内容就追加
            $('.talk_list').append(' <li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
            $('.input_txt').val('')
            //  重置滚动条值
            resetui()
            getMsg(text)
        }

    })
    //获取机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                console.log(res);
                if (res.message === 'success') {
                    var msg = res.data.info.text
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span> </li>')
                    resetui()
                    getVioce(msg)
                }
            }
        })
    }
    //接收语音功能
    function getVioce(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                console.log(res);
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }
    //回车发送
    $('.input_txt').on('keyup', function (e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            $('.input_sub').click();
        }
    })
})