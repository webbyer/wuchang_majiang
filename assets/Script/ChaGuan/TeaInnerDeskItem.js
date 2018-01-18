cc.Class({
    extends: cc.Component,

    properties: {
        RoomID: {
            default: null,
            type: cc.Label,
            tooltip: "房号",
        },
        AvatarOne: {
            default: null,
            type: cc.Node,
            tooltip: "底部玩家",
        },
        AvatarTwo: {
            default: null,
            type: cc.Node,
            tooltip: "右边玩家",
        },
        AvatarThree: {
            default: null,
            type: cc.Node,
            tooltip: "顶部玩家",
        },
        AvatarFour: {
            default: null,
            type: cc.Node,
            tooltip: "左边玩家",
        },
        RoundLabel: {
            default: null,
            type: cc.Label,
            tooltip: "圈数信息",
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
        if (isOwner){
            this.DeleteBtn.active = true;
        }
        if (data.players){
            if(data.players.length > 0) {
                this.DeleteBtn.active = false;
                // 头像与disable该按钮
            }else {

            }
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
      cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_CHAGUAN_DELETE_DESK_REP,this.itemRoomid);
    },
});
