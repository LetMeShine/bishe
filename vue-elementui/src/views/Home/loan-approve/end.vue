<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item"
                      @input="handleFilterName"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterName">
                搜索
            </el-button>
        </div>

        <el-table
                :data="list"
                style="width: 100%">
            <el-table-column
                    prop="loan_name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="loan_card"
                    label="身份证号码"
            >
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="{row}">
                    <el-button
                            size="mini" type="primary" @click="handleDetails(row)"
                    >查看
                    </el-button>
                    <el-button
                            size="mini" type="success" @click="handlePass(row)"
                            :disabled="row.result=='pass'||row.result=='reject'"
                    >通过
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger" @click="handleRefuse(row)"
                            :disabled="row.result=='pass'||row.result=='reject'"
                    >拒绝
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 拒绝弹层功能 -->
        <el-dialog title="贷款审批-初审" :visible.sync="dialogRefuseVisible">
            <p>是否初审拒绝？</p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRefuseVisible = false">
                    取消
                </el-button>
                <el-button type="danger" @click="RefuseData()">
                    拒绝
                </el-button>
            </div>
        </el-dialog>

        <!-- 详情弹层功能 -->
        <el-dialog title="贷款审批-查看详情" :visible.sync="dialogDetailsVisible">
            <el-form :model="temp" label-position="left" label-width="100px" class="detail">
                <el-form-item label="ID" prop="id">
                    <el-input v-model="temp.id" readonly/>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="temp.name" readonly/>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                    <el-input :value="temp.birthday |getDate" readonly/>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input :value="temp.sex |getSex" readonly/>
                </el-form-item>
                <el-form-item label="教育程度" prop="education">
                    <el-input :value="temp.education |getEducation" readonly/>
                </el-form-item>
                <el-form-item label="居住地址" prop="address1">
                    <el-input v-model="temp.address1" readonly/>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile_phone">
                    <el-input v-model.number="temp.mobile_phone" readonly/>
                </el-form-item>
                <el-form-item label="身份证号" prop="loan_card">
                    <el-input v-model="temp.identity_card" readonly/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDetailsVisible = false">
                    取消
                </el-button>
            </div>
        </el-dialog>

        <!-- 分页单独处理 -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="listQuery.pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

    </div>
</template>

<script>
    import {approveEndList, approveEndPass, approveEndReject, loanQuery} from '@/api/http'

    export default {
        name: 'ComplexTable',
        data() {
            return {
                //tableKey: 0,
                list: [],
                total: 0, //总数量
                pages: 1,//总页数
                listLoading: true,
                listQuery: {
                    pageNo: 1, //当前页码
                    pageSize: 10,//条数
                    name: '',//查询条件-姓名
                },
                filterName: [],  //姓名筛选
                dialogDetailsVisible: false,//详情弹层
                dialogRefuseVisible: false, //拒绝弹层
                dialogPassVisible: false, //通过弹层
                temp: {
                    id: '',
                    name: '',//姓名
                    birthday: '',//出生日期
                    sex: '',//性别
                    education: '',//教育程度
                    address1: '',//居住地址
                    mobile_phone: '',//手机号
                },
                downloadLoading: false,  //下载动画
            }
        },
        filters: {
            getDate(time) {
                let d = new Date(time);
                let times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                return times;
            },
            getSex(type) {
                switch (type) {
                    case 'man':
                        return '男';
                    case 'woman':
                        return '女';
                    default:
                        return '男';
                }
            },
            getEducation(type) {
                switch (type) {
                    case 'college':
                        return '大学';
                    case 'highschool':
                        return '高中';
                    default:
                        return type;
                }
            },
        },
        created() {
            this.getList()
        },
        methods: {
            /**
             * @description 获取贷款终审列表
             */
            getList() {
                this.listLoading = true;
                approveEndList(this.listQuery).then(res => {
                    let {code} = res.data;
                    if (code == '20000') {
                        let {data, rows, pages} = res.data.data.data;
                        this.list = data;  //获取展示的数据
                        this.total = rows; //获取总数量
                        this.pages = pages; //获取总页数
                    }
                    setTimeout(() => {
                        this.listLoading = false;
                    }, 1.5 * 1000)
                })
            },
            /**
             * @description 姓名查找
             */
            handleFilterName() {
                this.getList()
            },
            /**
             * @description 当前条数变化
             * 
             * @param {Number} val 每一页显示的条数
             * @returns {void}
             */
            handleSizeChange(val = this.listQuery.pageSize) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            /**
             * @description 当前页变化
             * 
             * @param {Number} val 当前页数
             * @returns {void}
             */
            handleCurrentChange(val = this.listQuery.pageNo) {
                this.listQuery.pageNo = val;
                this.getList();
            },
            /**
             * @description 查看详情
             * 
             * @param {Object} row 详情数据
             * @returns {void}
             */
            handleDetails(row) {
                this.listLoading = true;
                loanQuery({id: row.loan_id}).then(res => {
                    this.dialogDetailsVisible = true; //通过弹层的显示
                    let {code} = res.data;
                    if (code == '20000') {
                        this.temp = res.data.data.data;  //获取展示的数据
                    }
                })
            },
            /**
             * @description 审核通过
             * 
             * @param {Object} row 通过的数据
             * @returns {void}
             */
            handlePass(row) {
                this.temp = {...row};
                this.$confirm('贷款审批-初审', '是否初审通过？', {
                    type: 'warning'
                }).then(() => {
                    this.passData();
                });
            },
            /**
             * @description 提交审核
             */
            passData() {
                const tempData = {...this.temp};
                approveEndPass({appId: tempData.id, loanId: tempData.loan_id}).then(res => {
                    let {code} = res.data;
                    if (code == '20000') {
                        this.getList(); //调用查询接口
                        this.$notify({
                            title: '初审通过',
                            message: '初审通过',
                            type: 'success',
                            duration: 2000
                        })
                    }
                })

            },
            /**
             * @description 审核不通过
             * 
             * @param {Object} row 不通过的数据
             * @returns {void}
             */
            handleRefuse(row) {
                this.temp = {...row};
                this.$confirm('贷款审批-初审', '是否初审拒绝？', {
                    type: 'warning'
                }).then(() => {
                    this.refuseData();
                });

            },
            /**
             * @description 拒绝提交
             */
            refuseData() {
                const tempData = {...this.temp};
                approveEndReject({appId: tempData.id, loanId: tempData.loan_id}).then(res => {
                    let {code} = res.data;
                    if (code == '20000') {
                        this.getList();//调用查询接口
                        this.$notify({
                            title: '初审拒绝',
                            message: '初审拒绝',
                            type: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .detail {
        height: 400px;
        width: 100%;
        overflow: auto;
    }
</style>