cc.Class({
    extends: cc.Component,

    properties: {
        MingToggle: {
            default: null,
            type: cc.Toggle,
            tooltip: "玩法：明杠",
        },
        AnToggle: {
            default: null,
            type: cc.Toggle,
            tooltip: "玩法：暗杠",
        },
        PIBAOToggle: {
            default: null,
            type: cc.Toggle,
            tooltip: "玩法：吡宝",
        },
        QingYiSeToggle: {
            default: null,
            type: cc.Toggle,
            tooltip: "玩法：清一色",
        },
        QiXiaoDuiToggle: {
            default: null,
            type: cc.Toggle,
            tooltip: "玩法：七小队",
        },
        HaohuaToggle: {
            default: null,
            type: cc.Toggle,
            tooltip: "玩法：豪华七小队",
        },
        DefaultToggle: {
            default: null,
            type: cc.Toggle,
            tooltip: "玩法：传统玩法",
        },
        CreateRoom: {
            default: null,
            type: cc.Node,
            tooltip: "创建房间",
        },
        CreateDelegateRoom: {
            default: null,
            type: cc.Node,
            tooltip: "创建代开房间",
        },
        DelegateRoomRecord: {
            default: null,
            type: cc.Node,
            tooltip: "我的代开房间",
        },
        BaoshikaTip: {
            default: null,
            type: cc.Node,
            tooltip: "包时卡用户不消耗房卡",
        }
    },

    // use this for initialization
    onLoad: function () {
        this.JuShu = 2;
        this.FanShu = 1;
        this.WanFa = [1,2,3,4,5,6];
        if (cc.dd.user.getUserInfo().isagent == 1) {
            this.DelegateRoomRecord.active = true;
        }
        this.BaoshikaTip.active = cc.dd.user.getCardState().unlimited;

    },
    // 局数
    onJuShuClick(event, custom) {
        const num = parseInt(custom);
        this.JuShu = num;
    },
    // 玩法
    onWanFaClick(event, custom) {
        const item = cc.dd.hall_config.CYMJ_WF[custom];
        if (event.isChecked) {
            this.WanFa.push(item);
            if (item == 7) {
                if (this.WanFa.indexOf(1) != -1) {
                    this.MingToggle.uncheck();
                }
                if (this.WanFa.indexOf(2) != -1) {
                    this.AnToggle.uncheck();
                }
                if (this.WanFa.indexOf(3) != -1) {
                    this.PIBAOToggle.uncheck();
                }
                if (this.WanFa.indexOf(4) != -1) {
                    this.QingYiSeToggle.uncheck();
                }
                if (this.WanFa.indexOf(5) != -1) {
                    this.QiXiaoDuiToggle.uncheck();
                }
                if (this.WanFa.indexOf(6) != -1) {
                    this.HaohuaToggle.uncheck();
                }
            } else {
                if (this.WanFa.indexOf(7) != -1) {
                    this.DefaultToggle.uncheck();
                }
            }
        } else {
            this.WanFa.forEach((items, index) => {
                if (items == 1) {
                    this.MingToggle.interactable = true;
                }
                if (items == 2) {
                    this.AnToggle.interactable = true;
                }
                if (items == 3) {
                    this.PIBAOToggle.interactable = true;
                }
                if (items == 4) {
                    this.QingYiSeToggle.interactable = true;
                }
                if (items == 5) {
                    this.QiXiaoDuiToggle.interactable = true;
                }
                if (items == 6) {
                    this.HaohuaToggle.interactable = true;
                }
                if (items == 7) {
                    this.DefaultToggle.interactable = true;
                }
                if (item == items) {
                    this.WanFa.splice(index, 1);
                }
            });
        }
        // cc.log(this.WanFa);
    },
    // 底番
    onDiFanClick(event, custom) {
        const num = parseInt(custom);
        this.FanShu = num;
    },
    // 创建
    onFixCreClick() {
        cc.log(`确定创建房间`);
        cc.log(`局数：${this.JuShu}, 番数：${this.FanShu}`);
        this.WanFa.forEach((item) => {
            cc.log(`玩法：${item}`);
        });
        var roomConfig = {};
        roomConfig.rounds = this.JuShu;
        roomConfig.basicraise = this.FanShu;
        roomConfig.playrule = this.WanFa;
        roomConfig.createtype = "selfuse";// agent  selfuse
        roomConfig.roomtype = "cymj";
        cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_CREATE_ROOM_REP, roomConfig);
    },
    // 代理人代开房间给其他用户玩的功能
    onAgentRoomDelegateClick() {
        var roomConfig = {};
        roomConfig.rounds = this.JuShu;
        roomConfig.basicraise = this.FanShu;
        roomConfig.playrule = this.WanFa;
        roomConfig.createtype = "agent";// agent  selfuse
        roomConfig.roomtype = "cymj";
        cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_CREATE_ROOM_REP, roomConfig);
        this.node.destroy();
    },
    // 我的代开房间
    onRoomDelegateRecords() {
        cc.log("我的代开房间");
        cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_DELEGATE_ROOM_REOCRD_REP);
        // cc.dd.Reload.loadPrefab("Hall/Prefab/RoomDelegateRecord", (prefab) => {
        //     const gameRecord = cc.instantiate(prefab);
        // gameRecord.getComponent("RoomDelegRecord").initInfo();
        // cc.find("UI_ROOT").addChild(gameRecord);
        // });
        this.node.destroy();
    },
    // 关闭
    onCloseClick() {
        this.node.destroy();
    },
    // 新建代理房间
    initDelgatedRoomCreSetting() {
        this.CreateRoom.active = false;
        this.CreateDelegateRoom.active = true;
    },
});
