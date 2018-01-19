const PLAY_OPERA_NAME = [
    null,
    "明杠",
    "暗杠",
    "吡宝",
    "清一色",
    "七小对",
    "豪华七小队",
    "传统玩法",
    "四张见面不上听",
];
cc.Class({
    extends: cc.Component,

    properties: {
        RoomID: {
            default: null,
            type: cc.Label,
            tooltip: "房号",
        },
        // AvatarOne: {
        //     default: null,
        //     type: cc.Node,
        //     tooltip: "底部玩家",
        // },
        Avatars: {
            default: null,
            type: cc.Node,
            tooltip: "玩家们",
        },
        // AvatarThree: {
        //     default: null,
        //     type: cc.Node,
        //     tooltip: "顶部玩家",
        // },
        // AvatarFour: {
        //     default: null,
        //     type: cc.Node,
        //     tooltip: "左边玩家",
        // },
        RoundLabel: {
            default: null,
            type: cc.Label,
            tooltip: "圈数信息",
        },
        WanfaLabel: {
            default: null,
            type: cc.Label,
            tooltip: "玩法信息",
        },
        DeleteBtn: {
            default: null,
            type: cc.Node,
            tooltip: "删除按钮",
        },
        itemRoomid: null,
    },

    // use this for initialization
    onLoad: function () {

    },
    // 初始化
    setupInitContent(data,isOwner) {
        this.itemRoomid = data.roomid;
        this.RoomID.string = "房号：" + data.roomid;
        this.RoundLabel.string = data.rounds + "圈/" + data.basicraise + "底";
        this.setDelegRoomGameRulesString(data.rules);
        if (isOwner){
            this.DeleteBtn.active = true;
        }
        if (data.players){
            cc.dd.Reload.loadAtlas("ChaGuan/Atlas/GameTea", (atlas) => {
                this.Avatars.children.forEach((item) => {
                    item.getComponent(cc.Button).interactable = true;
                    item.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame("ChaGuan_TouXiang");
                });
            });
            if(data.players.length > 0) {
                this.DeleteBtn.active = false;
                // 头像与disable该按钮
                data.players.forEach((item,index) => {
                    this.Avatars.children[index].getComponent(cc.Button).interactable = false;
                    cc.dd.setPlayerHead(item,this.Avatars.children[index]);
                });
            }else {
                this.DeleteBtn.active = true;
            }
        }
    },
    setDelegRoomGameRulesString(data){
        if (data) {
            // this.wanfaSet = data;
            let str;
            data.forEach((item) => {
                if(!str){
                str = PLAY_OPERA_NAME[item];
            }else {
                str = str + "、" + PLAY_OPERA_NAME[item];
            }
        });
            this.WanfaLabel.string = str;
        }
    },
    // 玩家入座
    onSitInDeskClick(event,customdata) {
        cc.log(customdata);
        if (cc.dd.user.getChaGuan().applystatus !== 1) {
            cc.dd.Reload.loadPrefab("Hall/Prefab/AlertView", (prefab) => {
                const UIDNotExitMes = cc.instantiate(prefab);
                UIDNotExitMes.getComponent("AlterViewScript").initInfoMes("请先申请进入茶馆\n馆主同意后才可进入游戏");
                this.node.parent.parent.parent.parent.addChild(UIDNotExitMes);
            });
        }else {
            cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_ENTER_ROOM_REP,this.itemRoomid);
        }
    },
    // 删除当前桌
    onDeleteClick() {
      cc.log("删除当前桌"+this.itemRoomid);
        cc.dd.Reload.loadPrefab("ChaGuan/Prefab/AlertViewTwoChoices", (prefab) => {
            const UIDNotExitMes = cc.instantiate(prefab);
            this.node.parent.parent.parent.parent.addChild(UIDNotExitMes);
            UIDNotExitMes.getComponent("AlterViewScript").netWorkData = this.itemRoomid;
        });
    },
});