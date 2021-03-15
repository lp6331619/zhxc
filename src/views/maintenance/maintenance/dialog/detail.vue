<template>
    <div class="app-container">
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix"
            >
                <a @click="$router.push(`/maintenance`)"><i class="el-icon-back"></i>返回 | {{title}} </a>
            </div>
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
                    label="事件时间:"
                    prop="event_date"
                >
                    <el-date-picker
                        v-model="form.event_date"
                        :disabled="disabled"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择事件日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="事件标题:"
                    prop="title"
                >
                    <el-input
                        v-model="form.title"
                        placeholder="事件标题"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="事件类型:"
                    prop="type"
                >
                    <el-select
                        v-model="form.type"
                        :disabled="disabled"
                        placeholder="请输入类型"
                    >
                        <el-option
                            v-for="items in prepare.type"
                            :key="items.id"
                            :label="items.name"
                            :value="items.id"
                        >
                        </el-option>
                    </el-select>
                    <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="innerVisible = true"
                    >+分类管理</el-button>
                </el-form-item>
                <el-form-item
                    label="运维人员:"
                    prop="operator"
                >
                    <el-select
                        v-model="form.operator"
                        :disabled="disabled"
                        placeholder="请输入运维人员"
                    >
                        <el-option
                            v-for="items in prepare.user"
                            :key="items.id"
                            :label="items.nick"
                            :value="items.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="原因分析:"
                    prop="analysis"
                >
                    <el-input
                        v-model="form.analysis"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入原因分析"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="处理过程:"
                    prop="process"
                >
                    <el-input
                        v-model="form.process"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入处理过程"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="处理结果:"
                    prop="result"
                >
                    <el-input
                        v-model="form.result"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入处理结果"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="详细描述" prop="detail">
                	 <div class="edit_container">
                		 <quill-editor v-model="form.detail" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)" :disabled="disabled">
                		  </quill-editor>
                	</div>
                </el-form-item>
                <el-form-item label="">
                    <div class="mt20">
                        <el-button
                            type="primary"
                            @click="editDetailBox"
                            :disabled="disabled"
                        >确认</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <type
                v-if="innerVisible"
                :status="innerVisible"
                @emitOut="emitOutPriv"
            />
            <!-- <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    @click="editDetailBox()"
                >确 定</el-button>
            </div> -->
        </el-card>
    </div>
</template>
<script>
import { operationEdit, operationAdd, typeList,operationDetail } from '@/api/onsite'
import { getUserList } from '@/api/system'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import imageResize from 'quill-image-resize-module' // 调整大小组件。
import { ImageDrop } from 'quill-image-drop-module'; // 拖动加载图片组件。
// import { quillEditor } from '@/components/quillEditor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import type from './type'
Quill.register('modules/imageResize', imageResize );
Quill.register('modules/imageDrop', ImageDrop);
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  // [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{'direction': 'rtl'}],                         // 文本方向
  // [{ size: ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px'] }], // 字体大小
  [{ size: ['small', false, 'large', 'huge']}], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'], // 链接、图片、视频
  [{ lineheight: ['initial', '1', '1.5', '1.75', '2', '3', '4', '5'] }], // 对齐方式
]; //工具菜单栏配置
export default {
    name: 'EditUpdate',
    components: {
        type,
        quillEditor
    },
    props: {
        status: {
            type: Boolean,
            default: false
        },
        /* scene: {
            type: String,
            default: 'create' // create update detail
        }, */
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            editorOption: {
              modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                    // 行高
                      lineheight: function (value) {
                        if (value) {
                          this.quill.format('lineHeight', value);
                        } else {
                          console.log(value);
                        }
                      },
                    },
                  },
                  // 调整图片大小 ，一定要放对位置
                  imageResize: {
                    displayStyles: {
                      backgroundColor: 'black',
                      border: 'none',
                      color: 'white',
                    },
                    modules: ['Resize', 'DisplaySize', 'Toolbar'],
                  },
                  imageDrop: true,
              }
            },
            // 修改密码表单
            setStatusStatus: false,
            innerVisible: false,
            title: '创建运维信息',
            form: {
                event_date: '',
                title: '',
                type: '',
                operator: null,
                analysis: '',
                process: '',
                result: '',
                detail: ''
            },
            formRules: {
                event_date: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                title: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                type: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                operator: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                analysis: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                process: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                result: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            prepare: {
                type: [],
                user: []
            },
            disabled: false
        }
    },
    computed: {
      id() {
          return this.$route.query.id
      },
      scene() {
          return this.$route.query.scene
      },
      editor() {
        return this.$refs.myQuillEditor.quill
      }

    },
    created() {
        /* this.getPrepare()
        if (this.id !== 'undefined' && this.id) {
            this.getDetail()
        } */
    },
    mounted() {
      console.log(this.scene)
        // this.setStatusStatus = this.status
        this.getPrepare()
        switch (this.scene) {
            case 'create':
                this.title = '创建运维信息'
                break

            case 'update':
                this.title = '编辑运维信息'
                this.getDetail()
                break

            case 'detail':
                this.disabled = true
                this.title = '运维信息详情'
                this.getDetail()
                break
        }
    },
    methods: {
        onEditorReady(editor) {
          console.log(editor,'editor')
         },
        async getDetail() {
          this.loading = true
          const res = await operationDetail({ id: this.id })
          if(res.code == 1){
            // const form = JSON.parse(JSON.stringify(this.item))
            const form = res.data
            this.form = form
            /* this.form.type = form.type.id*/
            this.form.operator = form.operator.id
            delete this.form.ctime
            delete this.form.mtime
            delete this.form.dtime
            this.loading = false
          }

        },
        async getPrepare() {
            const res = await typeList({})
            if (res.code === 1) {
                this.prepare.type = res.data.list
            }
            const res2 = await getUserList({})
            if (res2.code === 1) {
                this.prepare.user = res2.data.list
            }
        },
        // 编辑
        editDetailBox() {
            console.log(this.$refs.myQuillEditor.value)
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(this.form))
                    switch (this.scene) {
                        case 'create':
                            operationAdd(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            operationEdit(params).then((res) => {
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
                this.$router.push('/maintenance')
                // this.setStatusStatus = false
                // this.emitOut()
            }
        },
        emitOut() {
            this.$emit('emitOut', 'diologStatus', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologStatus', this.setStatusStatus, true)
        },
        emitOutPriv(d, e, s) {
            this[d] = e
            !s && this.getPrepare()
        }
    }
}
</script>
<style lang="scss" scoped>
.map {
    width: 100%;
    height: 200px;
    margin-top: 20px;
}
.quill-editor{

}
.edit_container{
  background-color: white;
}
.ql-container .ql-snow{
  background-color: white;
  height: 400px;
}
</style>
