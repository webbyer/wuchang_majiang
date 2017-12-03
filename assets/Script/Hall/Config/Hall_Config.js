
module.exports = {
    // 朝阳麻将玩法配置
    CYMJ_WF: {
        MING_GANG: 1,  // 明杠
        AN_GANG: 2,  // 暗杠
        PIBAO: 3, // 吡宝
        QING_YI_SE: 4, // 清一色
        QI_XIAODUI: 5, // 七小队
        HAOHUA_QI_XIAODUI: 6,// 豪华七小队
        DEFAULT: 15, // 传统玩法
    },
    EXC_CARD_TYPE: {
        EXC_CHIKA: "roomcard",
        EXC_DAYKA: "daycard",
        EXC_WEEKKA: "weekcard",
        EXC_MOUTHKA: "monthcard",
    },
    EXC_BAOSHIKA_TABNUM: {
        BAOSHIKA_DAY: "天卡",
        BAOSHIKA_WEEK: "小王卡",
        BAOSHIKA_MOUTH: "大王卡",
    },
};
cc.dd.hall_config = module.exports;