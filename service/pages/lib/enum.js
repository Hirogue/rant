module.exports = {
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
    },
    DEFAULT_AVATAR: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561547251987&di=e63f4f0adfe4ffffa7ed7fa8c0fc9580&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658'
}