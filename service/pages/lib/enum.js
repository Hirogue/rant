module.exports = {
    IFModeEnum: {
        EQUITY: 'equity',
        CLAIM: 'claim',
    },
    ProjectStatusEnum: {
        PENDING: 'pending',
        REJECTED: 'rejected',
        CHECKED: 'checked',
        WAITING: 'waiting',
        FOLLOWING: 'following',
        CANCELLED: 'cancelled',
        FINISHED: 'finished',
    },
    UserLevelEnum: {
        V0: 0,
        V1: 1,
    },
    LogTypeEnum: {
        PROJECT: 'project',
        CAPITAL: 'capital',
        EXPERT: 'expert',
        PRODUCT: 'product',
        USER: 'user',
    },
    UserTypeEnum: {
        PERSONAL: 'personal',
        ENTERPRISE: 'enterprise',
    },
    IdentityEnum: {
        USER: 'user',
        INVESTOR: 'investor',
        FINANCER: 'financer',
        PROVIDER: 'provider',
        TOURIST: 'tourist',
    },
    UserStatusEnum: {
        NORMAL: 0,
        PENDING: 1,
        REJECTED: 2,
        CHECKED: 3,
        DELETED: 4,
    },
    IF_MODE_ENUM: {
        equity: '股权融资',
        claim: '债权融资',
    },
    IF_MODE_ENUM_R: {
        '股权融资': "equity",
        '债权融资': "claim",
    },
    IFT_MODE_ENUM: {
        equity: '股权投资',
        claim: '债权投资',
    },
    IFT_MODE_ENUM_R: {
        '股权投资': "equity",
        '债权投资': "claim",
    },
    PROJECT_STATUS_ENUM_CN: {
        pending: "审核中",
        rejected: "未通过",
        checked: "已通过",
        waiting: "待分配",
        following: "跟进中",
        cancelled: "已取消",
        finished: "已结束",
    },
    USER_STATUS_ENUM: {
        0: 'NORMAL',
        1: 'PENDING',
        2: 'REJECT',
        3: 'CHECKED',
        4: 'DELETED',
    },
    USER_LEVEL_ENUM: {
        V0: 0,
        V1: 1,
        V2: 2,
    },
    METADATA_TITLE_CN: {
        '行业': "industry.title",
        '融资方式': "category",
        '投资方式': "category",
        '阶段': "stage.title",
        '比例': "ratio.title",
        '退出方式': "exit_mode.title",
        '利息': "interest.title",
        '时长': "occupancy_time.title",
        '风控': "risk.title",
        '投资地区': "invest_area.title",
        '机构类别': "category.title"
    },
    DEFAULT_AVATAR: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561547251987&di=e63f4f0adfe4ffffa7ed7fa8c0fc9580&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658',
    PC_2_MOBILE_MAP: {
        project: 'https://m.lvyoto.com/home/detail',
        finance: 'https://m.lvyoto.com/finance/funds',
        product: 'https://m.lvyoto.com/finance/financing',
        service: 'https://m.lvyoto.com/service/detail',
        news: 'https://m.lvyoto.com/news/detail'
    }

}