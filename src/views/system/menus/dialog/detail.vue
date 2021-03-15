<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <el-form
                ref="setDetail"
                v-loading="loading"
                class="formBox"
                :model="form"
                :rules="formRules"
                auto-complete="on"
                label-position="right"
                label-width="120px"
            >
                <el-form-item
                    v-if="form.module && pidd!==0"
                    label="所属菜单:"
                    prop="pid"
                >
                    <el-cascader
                        v-if="prepare && prepare.menu"
                        v-model="pidArray"
                        :show-all-levels="false"
                        :options="prepare.menu"
                        :props="props"
                        :disabled="disabled"
                        change-on-select
                        @change="changeCas"
                    ></el-cascader>
                    <small class="gray ml20">尽量选择与所属模块一致的菜单</small>
                </el-form-item>
                <el-form-item
                    label="菜单名称:"
                    prop="title"
                >
                    <el-input
                        v-model="form.title"
                        class="w500"
                        placeholder="请输入菜单名称"
                        :disabled="disabled"
                    ></el-input>
                    <small class="gray ml20">长度限制3-24个字节(1个汉字等于3个字节)</small>
                </el-form-item>
                <el-form-item label="菜单排序:">
                    <el-input
                        v-model="form.sort"
                        class="w500"
                        type="number"
                        placeholder="请输入菜单排序"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="图标设置:">
                    {{ form.icon }}
                    <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="editIcon()"
                    >选择</el-button>
                </el-form-item>
                <el-form-item
                    label="菜单链接:"
                    prop="url"
                >
                    <el-select
                        v-model="form.url"
                        placeholder="请选择菜单链接"
                    >
                        <el-option
                            label="首页"
                            value="/home"
                        ></el-option>
                        <template v-for="menus in menuList">
                            <el-option
                                v-if="!menus.hidden"
                                :key="menus.path"
                                :label="menus.meta.title"
                                :value="menus.path"
                            ></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态设置:">
                    <el-switch
                        v-model="form.status"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="启用"
                        inactive-text="禁用"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="系统菜单:">
                    <el-switch
                        v-model="form.system"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="启用"
                        inactive-text="禁用"
                    ></el-switch>
                    <small class="gray ml20">设置为系统菜单后,无法删除</small>
                </el-form-item>
                <el-form-item label="后台导航:">
                    <el-switch
                        v-model="form.nav"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="启用"
                        inactive-text="禁用"
                    ></el-switch>
                    <small class="gray ml20">此设置只对前一二三级菜单有效</small>
                </el-form-item>
                <el-form-item
                    label="权限名称:"
                    prop="priv"
                >
                    <el-input
                        v-model="form.priv"
                        class="w500"
                        placeholder="请输入权限名称"
                        :disabled="disabled"
                    ></el-input>
                    <small class="gray ml20">权限唯一标识</small>
                </el-form-item>
            </el-form>

            <el-dialog
                width="50%"
                title="图标选择"
                :visible.sync="innerVisible"
                append-to-body
            >
                <el-row :gutter="20">
                    <el-col
                        v-for="(ico,i) in icon"
                        :key="i"
                        :span="3"
                    >
                        <div
                            class="iconfont "
                            :class="[{active:form.icon===ico},ico]"
                            @click="select(ico)"
                        ></div>
                    </el-col>
                </el-row>
                <div
                    slot="footer"
                    class="dialog-footer"
                >
                    <el-button
                        type="primary"
                        @click="innerVisible=false"
                    >确 定</el-button>
                </div>
            </el-dialog>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    @click="editDetailBox()"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { saveEditMenu, saveMenu, getMenuEdit, getMenusList } from '@/api/system'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        scene: {
            type: String,
            default: 'create' // create update detail
        },
        id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            setStatusStatus: false,
            innerVisible: false,
            title: '创建菜单',
            form: {
                pid: null,
                // int
                // 必填，父级ID，示例：296
                title: '',
                // string
                // 必填，标题，示例：任务管理
                icon: '',
                sort: 0,
                // string
                // 图标，示例：aicon ai-shouye
                url: '',
                // string
                // 必填，示例：inspection/Task/index
                status: 1,
                // int
                // 必填，示例：1
                system: 1,
                // int
                // 必填，示例：0
                nav: 1,
                // int
                // 必填，示例：1
                module: '',
                // string
                // 必填，示例：inspection
                priv: ''
                // string
                // 必填，同一父级ID下唯一标识，示例：task
            },
            formRules: {
                pid: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                title: [
                    {
                        required: true,
                        min: 2,
                        max: 24,
                        trigger: 'change',
                        message: '长度限制3-24个字节(1个汉字等于3个字节)!'
                    }
                ],
                url: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                system: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                nav: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                module: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                priv: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            prepare: {},
            disabled: false,
            props: {
                value: 'id',
                label: 'title',
                children: 'childs'
            },
            icon: [
                'icon-icon7',
                'icon-xiugai',
                'icon-shebeiguanli',
                'icon-shipin1',
                'icon-xiaoxi',
                'icon-jiqun',
                'icon-chanpin',
                'icon-quanxianguanli',
                'icon-ziyuanguanli',
                'icon-jiankongmianban',
                'icon-dianzi',
                'icon-xinxi',
                'icon-ditu',
                'icon-shizhong',
                'icon-xianxingshezhi',
                'icon-cunchu',
                'icon-luyouqi',
                'icon-shipin11',
                'icon-icon_huabanfuben',
                'icon-icon_huabanfuben1',
                'icon-icon_huabanfuben2',
                'icon-bingtu',
                'icon-duomeiti',
                'icon-luxiang',
                'icon-keshi',
                'icon-wangluo',
                'icon-wenjianjia',
                'icon-xuanchuanzhankai',
                'icon-yun',
                'icon-suo',
                'icon-ico_arrowright',
                'icon-ico_arrowdown',
                'icon-liebiao',
                'icon-icon-test',
                'icon-shuangjiantou-zuo',
                'icon-shuangjiantou-you',
                'icon-danxuan',
                'icon-danxuan1',
                'icon-fuxuankuang',
                'icon-fuxuankuang1',
                'icon-daochu',
                'icon-shanchu',
                'icon-jinyong',
                'icon-tianjia1',
                'icon-jinyong1',
                'icon-qiyong',
                'icon-dakuanyichang',
                'icon-riqi_rili',
                'icon-jiazai',
                'icon-zhongbo-m',
                'icon-luzhiguanli',
                'icon-fangda',
                'icon-quanping',
                'icon-xiangji',
                'icon-shengyinguanbi',
                'icon-shengyin',
                'icon-tingzhi',
                'icon-kaiqi',
                'icon-zanting',
                'icon-shipin',
                'icon-fanhui',
                'icon-duihao',
                'icon-guanbi',
                'icon-jian',
                'icon-tianjia',
                'icon-xiangzuo1',
                'icon-xiangyoujiantou',
                'icon-xiangshang',
                'icon-xiangxia',
                'icon-dizhi',
                'icon-socialfill',
                'icon-shebei',
                'icon-shexiangtou',
                'icon-diqiu',
                'icon-diannaodefuben',
                'icon-iconfonttubiao_dixingshuju',
                'icon-layers',
                'icon-chakanxiangqing',
                'icon-sousuo',
                'icon-quanjingtu',
                'icon-zhandianditu',
                'icon-duanxinjilu',
                'icon-gerenzhongxin2',
                'icon-huabanfuben',
                'icon-xitong1',
                'icon-3',
                'icon-shijiangongdanguanli',
                'icon-baojingguanli',
                'icon-zidongxunjian',
                'icon-shouye1',
                'icon-mifengcaihua',
                'icon-shipin11',
                'icon-renlianshibie1',
                'icon-zhinengjiaju',
                'icon-fupin',
                'icon-jingdian',
                'icon-nongchanpin',
            ],
            pidArray: [],
            pid: null,
            allArray: [],
            pidd: null
        }
    },
    computed: {
        menuList() {
            return this.$router.options.routes[3].children
        }
    },
    mounted() {
        switch (this.scene) {
            case 'create':
                this.title = '创建菜单'
                this.prepareBox()
                break
            case 'update':
                this.title = '编辑菜单'
                this.getDetail()
                break
            case 'detail':
                this.disabled = true
                this.title = '菜单详情'
                this.getDetail()
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        async getDetail() {
            this.loading = true
            const { data } = await getMenuEdit({ id: this.id })
            this.form = data.form_data
            delete this.form.ctime
            this.loading = false
            this.prepareBox()
        },
        changeCas(e) {
            this.form.pid = this.pidArray[this.pidArray.length - 1]
        },
        select(i) {
            this.form.icon = i
        },
        // 获取prepare
        async prepareBox() {
            this.loading = true
            const data = await getMenusList({})
            if (data.code === 1) {
                const {
                    data: { menu_list }
                } = data
                if (menu_list) {
                    this.loading = false
                    this.$set(this.prepare, 'menu', menu_list)
                    if (this.scene !== 'create') {
                        this.pid = this.form.pid
                        this.pidd = this.form.pid
                    } else {
                        this.pidd = this.item.pid
                        this.form.pid = this.item.id
                        this.pid = this.item.id
                        this.form.module = this.item.module
                    }
                    this.pidArray = this.common.familyTree(
                        this.prepare.menu,
                        this.pid
                    )
                }
            }
        },
        // 选择图标
        editIcon() {
            this.innerVisible = true
        },
        editDetailBox() {
            this.$refs.setDetail.validate((valid) => {
                if (valid) {
                    switch (this.scene) {
                        case 'create':
                            saveMenu(this.form).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            saveEditMenu(this.form).then((res) => {
                                this.callback(res)
                            })
                            break
                        default:
                            this.handleClose()
                    }
                }
            })
        },
        // 成功后
        callback(res) {
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.$store.dispatch('user/getMenus')
                this.setStatusStatus = false
                this.emitOut()
                this.$refs.setDetail.resetFields()
            }
        },
        emitOut() {
            this.$emit('emitOut', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
.iconfont {
    text-align: center;
    font-size: 30px;
    cursor: pointer;
    padding: 10px 0;
    color: #fff;
    border: 1px solid #141f3b;
    &:hover,
    &.active {
        color: #20bcfc;
        border-color: #20bcfc;
    }
}
</style>
