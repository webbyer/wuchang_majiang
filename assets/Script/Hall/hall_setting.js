cc.Class({
    extends: cc.Component,

    properties: {
        musicSlider: {
            default: null,
            type: cc.Slider,
            tooltip: "音乐的控制",
        },
        soundSlider: {
            default: null,
            type: cc.Slider,
            tooltip: "音效的控制",
        },
        logoutButton: {
            default: null,
            type: cc.Node,
            tooltip: "退出登录",
        },
        yuyinSwitch: {
            default: null,
            type: cc.Toggle,
            tooltip: "语音聊天的开关",
        },
    },

    // use this for initialization
    onLoad: function () {
        if (this.musicSlider) {
            this.musicSlider.progress = cc.dd.soundMgr.getMusicVoluem();
        }
        if (this.soundSlider) {
            this.soundSlider.progress = cc.dd.soundMgr.getSoundVolume();
        }
        if (cc.sys.localStorage.getItem(cc.dd.userEvName.USER_YUYIN_SWTICH_STATE) == cc.dd.userEvName.USER_YUYIN_OFF) {
            this.yuyinSwitch.uncheck();
        }else {
            this.yuyinSwitch.check();
        }
    },
    // 控制注销登录按钮的显示
    initLogoutInfo() {
        this.logoutButton.active = false;
    },
    // 音量条
    onSliderClick(event, custom) {
        switch (parseInt(custom)) {
            case 1: {
                cc.dd.soundMgr.setMusicVolume(event.progress);
                break;
            }
            case 2: {
                cc.dd.soundMgr.setSoundVolume(event.progress);
                break;
            }
            default: {
                cc.log(`unkown custom: ${custom}`);
                break;
            }
        }
    },
    // 关闭
    onCloseClick() {
        this.node.destroy();
    },
    // 语音聊天开关
    onClickYuYinConvoSwitch(event) {
        if(event.isChecked) {
            cc.log("语音开关打开");
            cc.sys.localStorage.setItem(cc.dd.userEvName.USER_YUYIN_SWTICH_STATE,cc.dd.userEvName.USER_YUYIN_ON);
        }else {
            cc.sys.localStorage.setItem(cc.dd.userEvName.USER_YUYIN_SWTICH_STATE,cc.dd.userEvName.USER_YUYIN_OFF);
            cc.log("语音开关关闭");
        }
    },
    // 退出登录按钮的响应方法
    onLogoutClick() {
        cc.log("退出微信登录");
        cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_LOGOUT_REP, "logout");
        this.node.destroy();
    },
});
