/*
 游戏内的配置
 */

module.exports = {
    // 牌的花色
    CARD_SUIT: {
        WAN: 1,  // 万
        TONG: 2, // 桶
        TIAO: 3, // 条
        OHTER: 4, // 其他，比如东南西北..
    },
    // 玩家的本地座位
    PLAYER_SEAT_LOCAL: {
        BOTTOM: 1,
        RIGHT: 2,
        TOP: 3,
        LEFT: 4,
    },
    // 操作的类型
    OPERATE_TYPE: {
        PENG: 1,
        GANG: 2,
        CHI: 3,
    },
    // 胡牌的类型
    HU_TYPE: {
        ZI_MO: 1, // 自摸
        DIAN_PAO_HU: 2, // 点炮胡
        SI_HUI_HU: 3, // 四会儿胡
        DUI_BAO_HU: 4, // 对宝儿胡
        LOU_BAO_HU: 5, // 楼宝儿胡
        GANG_SHANG_HUA: 6, // 杠上花
    },
    // 房间玩法
    PLAY_OPERA: {
        MING_GANG: 1,  // 明杠
        AN_GANG: 2, // 暗杠
        PIBAO: 3, // 吡宝
        QING_YI_SE: 4, // 清一色
        QI_XIAODUI: 5, // 七小队
        HAOHUA_QI_XIAODUI: 6, // 豪华七小队
        DEFAULT: 7,       //传统玩法
        JMBST: 8, // 四张见面不上听
    },
    // 消息枚举
    EVENT: {
        EVENT_GET_VERSION_REP: 1000, // 检测最新版本
        EVENT_GET_VERSION_REQ: 5000, // 检测最新版本的返回
        EVENT_CHECK_LOGIN_REP: 1001, // 检测登录请求
        EVENT_CHECK_LOGIN_REQ: 5001, // 检测登录的返回
        EVENT_LOGIN_REP: 1002, // 登录的请求
        EVENT_LOGIN_REQ: 5002, // 登录的返回
        EVENT_LOGOUT_REP: 1013,// 登出的请求
        EVENT_LOGOUT_REQ: 5013,// 登出的返回
        EVENT_CREATE_ROOM_REP: 1003, // 创建房间的请求
        EVENT_ROOM_DATA: 4001,  // 房间数据
        EVENT_ENTER_ROOM_REP: 1004, // 加入房间的请求
        EVENT_GAME_STATE: 4002, // 房间的状态
        EVENT_ENTER_CARDCHANGE_REP: 1007, // 查询房卡数量
        EVENT_ENTER_CARDCHANGE_REQ: 5007, // 查询房卡数量的返回
        EVENT_CARDCHANGE_REP: 1008, // 转让房卡
        EVENT_CARDCHANGE_REQ: 5008, // 转让房卡返回
        EVENT_QUERY_GAMERECORD_REP: 1006,// 查询用户战绩
        EVENT_QUERY_GAMERECORD_REQ: 5006,// 查询用户战绩的返回
        EVENT_ROOM_DISMISS_REQUEST: 1009, // 申请解散房间
        EVENT_ROOM_DISMISS_AGREE: 1010, // 同意解散房间
        EVENT_ROOM_DISMISS_DISAGREE: 1011, // 不同意解散房间
        EVENT_ROOM_DISMISS_ANOUNCE: 4003, // 解散房间申请广播
        EVENT_ROOM_DISMISS_STATE: 4004, // 解散状态广播
        EVENT_ROOM_DISMISS_RESULT: 4008, //解散结果广播
        EVENT_OUTCARD_REP: 2001, // 出牌的请求
        EVENT_OUTCARD_RAD: 4011, // 出牌成功的广播
        EVENT_CHICARD_REP: 2003, // 吃牌的请求
        EVENT_CHICARD_RAD: 4013, // 吃牌成功的广播
        EVENT_PENGCARD_REP: 2004, // 碰牌的请求
        EVENT_PENGCARD_RAD: 4014, // 碰牌成功的广播
        EVENT_GANGCARD_REP: 2005, // 杠牌的请求
        EVENT_GANGCARD_RAD: 4015, // 杠牌成功的广播
        EVENT_HUCARD_REP: 2006, // 胡牌的请求
        EVENT_HUCARD_RAD: 4016, // 胡牌成功的广播
        EVENT_MOCARD_RAB: 4012, // 摸牌的广播
        EVENT_GUOCARD_REP: 2002, // 过牌的请求
        EVENT_TIMER_SPRCIEL: 4010, // 指针转动
        EVENT_ONE_GAME_OVER: 4018, // 结算 //原来的4017
        EVENT_PLAYER_TING_CARD: 4022, // 玩家听牌
        EVENT_BAO_CARD_CHANGE: 4021,  // 宝牌更换
        EVENT_HAI_DI_LAO: 4020, // 海底捞
        // EVENT_DELEGATE_ROOM_REOCRD_REP: 1015, // 代理用户查询自己代开房间的记录
        // EVENT_DELEGATE_ROOM_REOCRD_REQ: 5015, // 代理用户查询自己代开房间的记录的返回
        EVENT_JIESUAN_START_NEXTROUND: 1014, // 结算界面点击开始下一局按钮需要发请求到1014，不需要监听返回
        EVENT_JIESUAN_ZONGZHANJI_REP: 1023, // 结算界面请求总战绩
        EVENT_JIESUAN_ZONGZHANJI_REQ: 4023, // 结算界面请求总战绩的返回
        EVENT_YUYIN_UPLOAD: 2009,   // 上传腾讯服务器成功后，告知voiceid给服务器
        EVENT_YUYIN_COMING: 4019,   // 广播有用户发言了
        EVENT_USER_OFFLINE: 4005,   // 广播用户断线
        EVENT_USER_BACKONLINE: 4006,  // 广播断线用户上线了
        EVENT_DUIBAOHU_REQ: 4026,  // 收到对宝胡协议的广播
        EVENT_USER_SENT_EMOJI_REP: 2016, // 用户发送短语或表情请求
        EVENT_USER_SENT_EMOJI_REQ: 5016, // 用户发送短语或表情广播
        // 茶馆
        EVENT_ENTER_CHAGUAN_REP: 1015, // 用户进入茶馆
        EVENT_ENTER_CHAGUAN_REQ: 5015, // 茶馆信息
        EVENT_CHAGUAN_DELETE_DESK_REP: 1016, // 删除茶馆内牌桌。返回5015
        EVENT_CHAGUAN_VIEW_BILL_REP: 1017, // 查看茶馆账单
        EVENT_CHAGUAN_VIEW_BILL_REQ: 5017, // 查看茶馆账单。返回5017
        EVENT_CHAGUAN_CHANGE_NUM_REP: 1018,// 更换茶馆口令。返回5015
        EVENT_CHAGUAN_VIEW_PERSONAL_REP: 1019, // 馆主查看会员列表
        EVENT_CHAGUAN_VIEW_PERSONAL_REQ: 5019, // 馆主查看会员列表。返回5019
        EVENT_CHAGUAN_CONTROL_PERSONAL_REP: 1020, // 馆主管理茶馆会员 同意/拒绝加入与请出茶馆。返回5015
        EVENT_CHAGUAN_APPALY_REP: 1021, // 申请茶馆会员。返回5015
        EVENT_CHAGUAN_LEAVE_MAJIONG_DESK_REP: 1022, // 离开牌桌回到茶馆
        EVENT_CHAGUAN_LEAVE_MAJIONG_DESK_REQ: 5022, // 离开牌桌回到茶馆成功的返回
    },
    // 电池电量状态
    BATTERTY: {
        // BATTERTY_FULL_FIFTH: "battery_full", // 满格五格
        // BATTERTY_FOURTH: "battery_four_bar", // 四格
        // BATTERTY_THRID: "battery_three_bar",
        // BATTERTY_SECOND: "battery_two_bar",
        // BATTERTY_LOW: "battery_one_bar",    // 一格低电量
        BATTERTY_LEVEL_UPDATE: "battery_level_update", // 原生监听到电量的改变的回调
        BATTERTY_CHARGING: "Charging",  // 充电中
        BATTERTY_UNPULG: "battery_unpulg",  // 充电线拔出
    },
    // gvoice 离线语音消息相关
    GVOICE: {
        GVOICE_MESSAGE_FINISH_PLAYING: "message_finish_playing", // 完成播放当前语音消息

    },
    // 语音状态
    YUYINSTATUS: {
        RECORDING_MESSAGE: "message_recording", // 录音中
        RECORDING_MESSAGE_IN_PLAY: "playing_recording", // 录音播放中
        EMOJI_MESSAGE_IN_PLAY: "playing_emoji", // 短语表情播放中
        FINISH_PLAYING: "finish_playing",  // 播放完成
    },
};
cc.dd.gameCfg = module.exports;