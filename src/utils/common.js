import constant from "./constant";
import CryptoJS from 'crypto-js';

export default {
    /**
   * 判断是否为空
   */
    isEmpty(value) {
        if (typeof value === "undefined" || value === null || (typeof value === "string" && value.trim() === "") || (Array.prototype.isPrototypeOf(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)) {
            return true;
        } else {
            return false;
        }
    },

    /**
   * 表情包转换
   */
    faceReg(content) {
        content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
            let index = constant.emojiList.indexOf(word.replace("[", "").replace("]", ""));
            if (index > -1) {
                let url = constant.qiniuDownload + "/emoji/" + (index + 1) + ".png";
                return '<img style="vertical-align: middle;width: 80px;height: 80px" src="' + url + '" title="' + word + '"/>';
            } else {
                console.log("Processed content: ", content);
                return word;
            }
        });
        return content;
    },

    /**
   * 图片转换
   */
    pictureReg(content) {
        content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
            let index = word.indexOf(",");
            if (index > -1) {
                let arr = word.replace("[", "").replace("]", "").split(",");
                return '<img class="pictureReg" style="border-radius: 5px;width: 100%;max-width: 250px;display: block" src="' + arr[1] + '" title="' + arr[0] + '"/>';
            } else {
                return word;
            }
        });
        return content;
    },

    imgShow(select) {
        $(select).click(function () {
            let src = $(this).attr("src");
            $("#bigImg").attr("src", src);

            /** 获取当前点击图片的真实大小，并显示弹出层及大图 */
            $("<img/>").attr("src", src).load(function () {
                let windowW = $(window).width();//获取当前窗口宽度
                let windowH = $(window).height();//获取当前窗口高度
                let realWidth = this.width;//获取图片真实宽度
                let realHeight = this.height;//获取图片真实高度
                let imgWidth, imgHeight;
                let scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

                if (realHeight > windowH * scale) {//判断图片高度
                    imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放
                    imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度
                    if (imgWidth > windowW * scale) {//如宽度仍大于窗口宽度
                        imgWidth = windowW * scale;//再对宽度进行缩放
                    }
                } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度
                    imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放
                    imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度
                } else {//如果图片真实高度和宽度都符合要求，高宽不变
                    imgWidth = realWidth;
                    imgHeight = realHeight;
                }
                $("#bigImg").css("width", imgWidth);//以最终的宽度对图片缩放

                let w = (windowW - imgWidth) / 2;//计算图片与窗口左边距
                let h = (windowH - imgHeight) / 2;//计算图片与窗口上边距
                $("#innerImg").css({ "top": h, "left": w });//设置top和left属性
                $("#outerImg").fadeIn("fast");//淡入显示
            });

            $("#outerImg").click(function () {//再次点击淡出消失弹出层
                $(this).fadeOut("fast");
            });
        });
    },

    getDateDiff(dateStr) {
        if (!dateStr) {
            return ''; // 如果 dateStr 不存在，返回空字符串或其他默认值
        }
        let publishTime = isNaN(Date.parse(dateStr.replace(/-/gi, "/")) / 1000) ? Date.parse(dateStr) / 1000 : Date.parse(dateStr.replace(/-/gi, "/")) / 1000;
        let d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = Math.floor(new Date().getTime() / 1000),
            d,
            date = new Date(publishTime * 1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        //小于10的在前面补0
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        d = timeNow - publishTime;
        d_days = Math.floor(d / 86400);
        d_hours = Math.floor(d / 3600);
        d_minutes = Math.floor(d / 60);
        d_seconds = Math.floor(d);
        if (d_days > 0 && d_days < 3) {
            return d_days + '天前';
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + '小时前';
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + '分钟前';
        } else if (d_seconds < 60) {
            if (d_seconds <= 0) {
                return '刚刚发表';
            } else {
                return d_seconds + '秒前';
            }
        } else if (d_days >= 3) {
            return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
        }
    },

    /**
   * 加密
   */
    encrypt(plaintText) {
        let options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        };
        let key = CryptoJS.enc.Utf8.parse(constant.cryptojs_key);
        let encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
        return encryptedData.toString().replace(/\//g, "_").replace(/\+/g, "-");
    },

    /**
     * 解密
     */
    decrypt(encryptedBase64Str) {
        let val = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/');
        let options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        };
        let key = CryptoJS.enc.Utf8.parse(constant.cryptojs_key);
        let decryptedData = CryptoJS.AES.decrypt(val, key, options);
        return CryptoJS.enc.Utf8.stringify(decryptedData);
    },

    mobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag && flag.length && flag.length > 0;
      },
}