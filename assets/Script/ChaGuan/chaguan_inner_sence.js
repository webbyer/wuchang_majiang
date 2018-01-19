const stituation1 = ["addTable","tableBill","AccessControl"];
const stituation2 = ["enterApply","tipLabel"];
const stituation3 = ["addTable","tableBill","AccessControl","enterApply"]; // "tipLabel"
const stituation4 = ["addTable","AccessControl","enterApply","tipLabel"]; // "tableBill"
const stituation5 = ["addTable","tableBill","AccessControl","tipLabel"]; // "enterApply"
cc.Class({
    extends: cc.Component,

    properties: {
        TopRightLabel: {
            default: null,
            type: cc.Label,
            tooltip: "顶部右边茶馆口令label",
        },
        TopLeftLabel: {
            default: null,
            type: cc.Label,
            tooltip: "顶部左边桌数label",
        },
        TopTitleLabel: {
            default: null,
            type: cc.Label,
            tooltip: "顶部中间茶馆名称label",
        },
        OwnerAvtar: {
            default: null,
            type: cc.Node,
            tooltip: "馆主头像",
        },
        CenterContainerNode: {
            default: null,
            type: cc.Node,
            tooltip: "中间牌桌容器",
        },
        CenterTipLabel: {
            default: null,
            type: cc.Node,
            tooltip: "中间提示无牌桌",
        },
        CenterAddTableNode: {
            default: null,
            type: cc.Node,
            tooltip: "中间牌桌容器添加牌桌按钮",
        },
        BottomContainerNode: {
            default: null,
            type: cc.Node,
            tooltip: "底部按钮容器",
        },
        ChangeChaguanNumNode: {
            default: null,
            type: cc.Node,
            tooltip: "换本茶馆口令按钮",
        },
        ChangeChaguanNode: {
            default: null,
            type: cc.Node,
            tooltip: "更换茶馆按钮",
        },
        ShareBtnNode: {
            default: null,
            type: cc.Node,
            tooltip: "分享按钮",
        },
        centerArr: null,
    },

    // use this for initialization
    onLoad: function () {
        cc.dd.appUtil.setScreenFit(this.node);
        this.setupContent();
        cc.dd.net.addObserver(this);
        cc.dd.userEvent.addObserver(this);
        this.centerArr = [];
        if (cc.dd.user.getUserInfo()) {
            cc.dd.user.getUserInfo().wereInGameSence = true;
        }
    },
    onDestroy() {
        cc.dd.user.setChaGuan(null);
        cc.dd.userEvent.removeObserver(this);
        cc.dd.net.removeObserver(this);
    },
    // 渲染界面
    setupContent() {
        if (cc.dd.user.getChaGuan().activerooms || cc.dd.user.getChaGuan().activerooms === 0) {
            this.TopLeftLabel.string = "桌数：" + cc.dd.user.getChaGuan().activerooms + "/" + cc.dd.user.getChaGuan().allrooms;
        }
        if (cc.dd.user.getChaGuan().clubtoken) {
            this.TopRightLabel.string = cc.dd.user.getChaGuan().clubtoken;
        }
        if (cc.dd.user.getChaGuan().clubtitle) {
            this.TopTitleLabel.string = cc.dd.user.getChaGuan().clubtitle;
        }
        if (cc.dd.user.getChaGuan().clublogo) {
            cc.dd.setPlayerHead(cc.dd.user.getChaGuan().clublogo,this.OwnerAvtar);
        }
        if (cc.dd.user.getChaGuan().owneruid) {
            this.isOnwer = cc.dd.user.getChaGuan().owneruid == cc.dd.user.getUserInfo().UID
            if (this.isOnwer) { // 馆主视图
                this.ChangeChaguanNumNode.active = true;
                this.ShareBtnNode.active = true;
                this.ChangeChaguanNode.active = false;
                stituation1.forEach((item) => {
                    this.BottomContainerNode.getChildByName(item).active = true;
                });
                stituation2.forEach((item) => {
                    this.BottomContainerNode.getChildByName(item).active = false;
                });
            } else { // 非馆主视图
                this.ChangeChaguanNumNode.active = false;
                this.CenterAddTableNode.active = false;
                this.ShareBtnNode.active = false;
                this.ChangeChaguanNode.active = true;
                // stituation1.forEach((item) => {
                //     this.BottomContainerNode.getChildByName(item).active = false;
                // });
            }
        }
        const newTip = this.BottomContainerNode.getChildByName("AccessControl").getChildByName("ChaGuan_tip");
        if (cc.dd.user.getChaGuan().applyers && cc.dd.user.getChaGuan().applyers != 0) {
            newTip.active = true;
            newTip.getChildByName("newNumlabel").getComponent(cc.Label).string = cc.dd.user.getChaGuan().applyers;
        } else {
            newTip.active = false;
        }
        if (cc.dd.user.getChaGuan().allrooms || cc.dd.user.getChaGuan().allrooms === 0) {
            if (cc.dd.user.getChaGuan().allrooms === 0) { // 茶馆无牌桌
                if (this.isOnwer) {
                    this.CenterContainerNode.active = true;
                    this.CenterTipLabel.active = false;
                }else {
                    this.CenterContainerNode.active = false;
                    this.CenterTipLabel.active = true;
                }
            }else {  // 茶馆有且需要渲染牌桌
                this.CenterContainerNode.active = true;
                this.CenterTipLabel.active = false;
                if (cc.dd.user.getChaGuan().roomlist) { // 5015，完整状态下
                    cc.dd.Reload.loadPrefab("ChaGuan/Prefab/TeaInnerDeskItem", (prefab) => {
                        cc.dd.user.getChaGuan().roomlist.forEach((item,index) => {
                            const desk = cc.instantiate(prefab);
                            this.CenterContainerNode.addChild(desk);
                            desk.getComponent("TeaInnerDeskItem").setupInitContent(item,this.isOnwer);
                            this.centerArr.push(item.roomid);
                                // if (cc.dd.user.getChaGuan().roomlist.length === index+1) {
                                //     this.CenterAddTableNode.active = true;
                                // }
                        });
                    });
                }
                if(cc.dd.user.getChaGuan().roomadd) { // 5015，1003触发状态下
                    cc.dd.Reload.loadPrefab("ChaGuan/Prefab/TeaInnerDeskItem", (prefab) => {
                        const desk = cc.instantiate(prefab);
                        this.CenterContainerNode.addChild(desk);
                        desk.getComponent("TeaInnerDeskItem").setupInitContent(cc.dd.user.getChaGuan().roomadd,this.isOnwer);
                        this.centerArr.push(cc.dd.user.getChaGuan().roomadd.roomid);
                    });
                }
            }
        }
        if(cc.dd.user.getChaGuan().roomremoved) { // 5015,1016触发状态下 删除牌桌
            this.centerArr.forEach((item,index) => {
                if (cc.dd.user.getChaGuan().roomremoved == item) {
                    this.centerArr.splice(index,1);
                    this.CenterContainerNode.children[index+1].destroy();
                    this.CenterContainerNode.children[index+1].removeFromParent();
                }
            });
        }
        if (cc.dd.user.getChaGuan().applystatus || (cc.dd.user.getChaGuan().applystatus === 0)){
            switch (cc.dd.user.getChaGuan().applystatus) {
                case cc.dd.hall_config.APPLY_STATUS.NOT_A_MEMBER: {
                    stituation5.forEach((item) => {
                        this.BottomContainerNode.getChildByName(item).active = false;
                });
                    this.BottomContainerNode.getChildByName("enterApply").active = true;
                    break;
                }
                case cc.dd.hall_config.APPLY_STATUS.WAITING_INLINE: {
                    stituation3.forEach((item) => {
                        this.BottomContainerNode.getChildByName(item).active = false;
                });
                    this.BottomContainerNode.getChildByName("tipLabel").active = true;
                    break;
                }
                case cc.dd.hall_config.APPLY_STATUS.ALREADY_A_MENBER: {
                    stituation4.forEach((item) => {
                        this.BottomContainerNode.getChildByName(item).active = false;
                });
                    // this.BottomContainerNode.getChildByName("tableBill").active = true;
                    break;
                }
                default: {
                    cc.log(`unkown type`);
                }
            }
        }

    },
    // 添加牌桌
    onAddTableClick() {
        cc.log("添加牌桌");
        cc.dd.Reload.loadPrefab("Hall/Prefab/CrePup", (prefab) => {
            const crePup = cc.instantiate(prefab);
            this.node.addChild(crePup);
            crePup.getComponent("hall_creRoom").CreateDelegateRoom.active = true;
            crePup.getComponent("hall_creRoom").CreateRoom.active = false;
            crePup.getComponent("hall_creRoom").ReopenAllowedToggle.node.active = true;
        });

    },
    // 查看牌桌账单
    onViewBillClick() {
        cc.log("查看牌桌账单");
        if (cc.dd.user.getChaGuan().owneruid == cc.dd.user.getUserInfo().UID) { // 自己茶馆
            cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_CHAGUAN_VIEW_BILL_REP,-1);
        }else {
            cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_CHAGUAN_VIEW_BILL_REP,cc.dd.user.getChaGuan().clubtoken);
        }
    },
    // 牌桌权限管理
    onTableAccessClick() {
        cc.log("牌桌权限管理");
        cc.dd.Reload.loadPrefab("ChaGuan/Prefab/TGAccessControl", (prefab) => {
            const Control = cc.instantiate(prefab);
            this.node.addChild(Control);
        });
    },
    // 申请进入茶馆
    onAppalyClick() {
        cc.log("申请进入茶馆");
        cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_CHAGUAN_APPALY_REP,cc.dd.user.getChaGuan().clubtoken);
    },
    // 更换茶馆
    onChangeChaguanClick() {
        cc.log("更换茶馆");
        cc.dd.Reload.loadPrefab("ChaGuan/Prefab/EnterChaguan", (prefab) => {
            const EnterChaguan = cc.instantiate(prefab);
            this.node.addChild(EnterChaguan);
        });
    },
    // 更换茶馆口令
    onChangeChaguanNumClick() {
        cc.log("更换茶馆口令");
        cc.dd.net.startEvent(cc.dd.gameCfg.EVENT.EVENT_CHAGUAN_CHANGE_NUM_REP);
        cc.dd.Reload.loadPrefab("Hall/Prefab/AlertView", (prefab) => {
            const UIDNotExitMes = cc.instantiate(prefab);
            UIDNotExitMes.getComponent("AlterViewScript").initInfoMes("口令更换成功");
            this.node.addChild(UIDNotExitMes);
        });
    },
    // 分享口令到微信朋友
    onShareClick() {
        let str = this.TopTitleLabel.string + "口令：" + this.TopRightLabel.string;
        cc.log(str);
        cc.dd.shareChaguanNumToWXFriends(str);
    },
    //  返回大厅/茶馆入口
    onCloseClick() {
        if (cc.dd.user.getUserInfo().isagent === 1) {
            cc.dd.Reload.loadDir("DirRes", () => {
                cc.dd.sceneMgr.runScene(cc.dd.sceneID.CHAGUAN_SENCE);
            });
        }else {
            cc.dd.Reload.loadDir("DirRes", () => {
                cc.dd.sceneMgr.runScene(cc.dd.sceneID.HALL_SCENE);
            });
        }
    },
    onMessageEvent(event, data) {
        switch (event) {
            case cc.dd.gameCfg.EVENT.EVENT_ENTER_CHAGUAN_REQ: { // 5015
                if (cc.dd.user.getChaGuan()) {
                    this.setupContent();
                }
                break;
            }
            case cc.dd.gameCfg.EVENT.EVENT_CHAGUAN_VIEW_BILL_REQ: { // 查看账单
                cc.dd.Reload.loadPrefab("ChaGuan/Prefab/ChaguanBill", (prefab) => {
                    const Bill = cc.instantiate(prefab);
                    this.node.addChild(Bill);
                    Bill.getComponent("chaguanBill").initInfo(data.scoreset);
                });
                break;
            }
            case cc.dd.gameCfg.EVENT.EVENT_ENTER_CHAGUAN_REP: { // 1015,进入茶馆错误处理
                cc.dd.Reload.loadPrefab("Hall/Prefab/AlertView", (prefab) => {
                    const UIDNotExitMes = cc.instantiate(prefab);
                    UIDNotExitMes.getComponent("AlterViewScript").initInfoMes(data.errmsg);
                    this.node.addChild(UIDNotExitMes);
                });
                break;
            }
            case cc.dd.gameCfg.EVENT.EVENT_GAME_STATE: { // 入座牌桌
                cc.dd.Reload.loadDir("DirRes", () => {
                    cc.dd.sceneMgr.runScene(cc.dd.sceneID.GAME_SCENE);
                });
                break;
            }
            case cc.dd.gameCfg.EVENT.EVENT_ENTER_ROOM_REP: {
                cc.dd.Reload.loadPrefab("Hall/Prefab/AlertView", (prefab) => {
                    const roomNotExitMes = cc.instantiate(prefab);
                    roomNotExitMes.getComponent("AlterViewScript").initInfoMes(data.errmsg);
                    this.node.addChild(roomNotExitMes);
                });
                break;
            }
            // case cc.dd.gameCfg.EVENT.EVENT_CHAGUAN_VIEW_PERSONAL_REQ: { // 5019,成员列表
            //
            //     break;
            // }
            default: {
                cc.log(`unkown event: ${event}`);
            }
        }
    },
});