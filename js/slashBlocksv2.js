/*************************************
 ***  Created by JZ on 2016/12/13  ***
 ***  slashBlocks ver.0.2.12.14    ***
 ************************************/


// blks 外框
// blksRotate 旋轉角度
// blksRotateRev 旋轉角度(反轉)
// bgsWrap 背景圖轉回來

// blk-f 第一張 往右切\
// blk-l 第二張 先右切\再左切/(偏左)
// blk-r 第三張 先左切/再右切\(偏右)
// blk-ll 最後一張 左切/
// blk-lr 最後一張 右切\


(function(){
    function slashBlocks(_target, opt) {
        var options = {
            height: 300,
            angle: 5,
            items: ''
        };
        $.extend(options,opt);

        var target = _target,
            bgW = parseInt(target.width()),
            bgH = options.height,
            rotateDeg = Math.PI * options.angle / 180,
            boxW = bgW * Math.cos(rotateDeg) + bgH * Math.sin(rotateDeg),
            boxH = bgH * Math.cos(rotateDeg);

        function init(_target) {
            var _wrap = '<div class="blks"><div class="blksRotateOut"><div class="blksRotateRevOut"><div class="blksRotateIn"><div class="blksRotateRevIn"></div></div></div></div></div>',
                _blocks = _target.children().length;
            if(options.items!=''){
                _target.find(options.items).addClass(options.style).wrap(_wrap);
            }else{
                _target.children().addClass(options.style).wrap(_wrap);
            }
            _target.css('overflow','hidden').find('.blks').each(function (i) {
                if (i == 0) {
                    $(this).addClass('blks-f');
                } else if (i % 2 == 1 && i < _blocks - 1) {
                    $(this).addClass('blks-l');
                } else if (i > 0 && i % 2 == 0 && i < _blocks - 1) {
                    $(this).addClass('blks-r');
                } else {
                    if (i % 2 == 0) {
                        $(this).addClass('blks-lr');
                    } else {
                        $(this).addClass('blks-ll');
                    }
                }
            })
        }

        function adjust(){
            //尺寸設定
            $('.blksRotateOut, .blksRotateRevOut, .blksRotateIn, .blksRotateRevIn').css({
                width: boxW,
                height: bgH
            });
            $('.blksRotateRevIn > *').css({
                width: bgW,
                height: bgH
            });

            //第一張 右切
            $('.blks-f').css({
                height: options.height
            }).find('.blksRotateOut').css({
                transform: ('rotate(' + options.angle + 'deg)')
            }).find('.blksRotateRevOut').css({
                transform: ('rotate(-' + options.angle + 'deg)')
            });

            //偶數張 右切再左切
            $('.blks-l').css({
                height: options.height - bgW * Math.tan(rotateDeg)
            }).find('.blksRotateOut').css({
                transform: ('rotate(' + options.angle + 'deg)'),
                marginTop: (-1 * bgW * Math.tan(rotateDeg))
            }).find('.blksRotateRevOut').css({
                transform: ('rotate(-' + options.angle + 'deg)')
            }).find('.blksRotateIn').css({
                transform: ('rotate(-' + options.angle + 'deg)')
            }).find('.blksRotateRevIn').css({
                transform: ('rotate(' + options.angle + 'deg)')
            });

            //奇數張 左切再右切
            $('.blks-r').css({
                height: options.height - bgW * Math.tan(rotateDeg)
            }).find('.blksRotateOut').css({
                transform: ('rotate(-' + options.angle + 'deg)'),
                marginTop: (-1 * bgW * Math.tan(rotateDeg))
            }).find('.blksRotateRevOut').css({
                transform: ('rotate(' + options.angle + 'deg)')
            }).find('.blksRotateIn').css({
                transform: ('rotate(' + options.angle + 'deg)')
            }).find('.blksRotateRevIn').css({
                transform: ('rotate(-' + options.angle + 'deg)')
            });

            //最後一張 右切
            $('.blks-ll').css({
                height: options.height - bgW * Math.tan(rotateDeg)
            }).find('.blksRotateOut').css({
                transform: ('rotate(' + options.angle + 'deg)'),
                marginTop: (-1 * bgW * Math.tan(rotateDeg))
            }).find('.blksRotateRevOut').css({
                transform: ('rotate(-' + options.angle + 'deg)')
            });

            //最後一張 左切
            $('.blks-lr').css({
                height: options.height - bgW * Math.tan(rotateDeg)
            }).find('.blksRotateOut').css({
                transform: ('rotate(-' + options.angle + 'deg)'),
                marginTop: (-1 * bgW * Math.tan(rotateDeg))
            }).find('.blksRotateRevOut').css({
                transform: ('rotate(' + options.angle + 'deg)')
            });
        }
        init(target);
        adjust();
    }
    $.fn.extend({
        slashBlocks:function(opt){
            return this.each(function () {
                slashBlocks($(this), opt);
            });
        }
    })
})(jQuery);