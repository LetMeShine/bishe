<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item"
                      @input="query()"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="query()">
                搜索
            </el-button>
        </div>

        <el-table
                :data="tableData"
                height="500px"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="name"
                    label="姓名"
                    width="100"
                    column-key="name"
            >
            </el-table-column>
            <el-table-column
                    prop="birthday"
                    label="出生日期"
                    width="120"
                    sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.birthday }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex | getSex}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="education"
                    label="教育程度"
                    width="100"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.education}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address1"
                    label="居住地址"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="mobile_phone"
                    label="手机号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="申请状态"
                    width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status |getStatusStyle">{{ scope.row.status |getStatus}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="{row}">
                    <el-button size="mini" type="primary" @click="edit(row)">编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="del(row.id)">删除
                    </el-button>
                    <el-button
                            size="mini" type="success" @click="handleSubmit(row)"
                            :disabled="row.status!=0&&row.status!=3&&row.status!=6"
                    >提交审核
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <loanDetail :isShow="isShow" :detail="detail" @on-save="save" @on-show="show"></loanDetail>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="listQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="rows">
        </el-pagination>
    </div>
</template>

<script>
    import {loanList, submitToApprove, loanDelete, loanUpdate} from '@/api/http'
    import loanDetail from './loanDetail'
    export default {
        name: 'ComplexTable',
        data() {
            return {
                detail: {},
                isShow: false,
                tableData: [], //表格展示的数据
                pages: 1, //总页数
                rows: 1, //总条数
                listQuery: {
                    pageNo: 1, //当前页面
                    pageSize: 10, //条数
                    name: ''  //查询条件
                }
            }
        },
        filters: {
            getSex(data) {
                switch (data) {
                    case 'man':
                        return '男';
                    case 'woman':
                        return '女';
                    default:
                        return data;
                }
            },
            getStatusStyle(data) {
                switch (data) {
                    case 0:
                        return 'success';
                    case 1:
                        return 'info';
                    case 2:
                        return 'success';
                    case 3:
                        return 'warning';
                    case 4:
                        return 'info';
                    case 5:
                        return 'success';
                    case 6:
                        return 'warning';
                    case 7:
                        return 'danger';
                    default:
                        return data;
                }
            },
            getStatus(data) {
                switch (data) {
                    case 0:
                        return '队列中';
                    case 1:
                        return '提交初审';
                    case 2:
                        return '初审通过';
                    case 3:
                        return '初审拒绝';
                    case 4:
                        return '提交终审';
                    case 5:
                        return '终审通过';
                    case 6:
                        return '终审拒绝';
                    case 7:
                        return '生成合同';
                    default:
                        return data;
                }
            }
        },
        components: {
            loanDetail
        },
        created() {
            this.getList();
        },
        methods: {
            /**
             * @description 删除管理
             * 
             * @param {String} id 贷款申请的id
             * @returns {void}
             */
            del(id) {
                this.$confirm('确认删除', '删除', {
                    type: 'warning'
                }).then(() => {
                    loanDelete(id).then(({data}) => {
                        if(data.code === 20000){
                            this.$notify({  //通知框
                                title: '删除申请',
                                message: '删除成功',
                                type: 'success',
                                duration: 1000
                            });
                        }
                    })
                });
            },
            /**
             * @description 编辑管理
             * 
             * @param {Object} row 要编辑的对象
             * @returns {void}
             */
            edit(row){
                this.isShow = true;
                this.detail = row;
            },
            /**
             * @description 保存编辑内容
             * 
             * @param {Object} data 编辑的内容
             * @returns {void}
             */
            save(data){
                loanUpdate(data).then(({data}) => {
                    if(data.code === 20000){
                        this.isShow = false;
                        this.$notify({  //通知框
                            title: '审核编辑',
                            message: '编辑成功',
                            type: 'success',
                            duration: 1000
                        });
                    }
                })
            },
            /**
             * @description 控制编辑框的显隐
             * 
             * @param {Boolean} val 控制编辑框的显隐
             * @returns {void}
             */
            show(val){
                this.isShow = val;
            },
            /**
             * @description 获取申请管理的列表
             */
            getList() {
                loanList(this.listQuery).then(res => {
                    let {code} = res.data;
                    if (code == '20000') {
                        let {data, rows, pages} = res.data.data.data;
                        this.tableData = data;
                        this.rows = rows;
                        this.pages = pages;
                    }
                })
            },
            /**
             * @description 按名称查询
             */
            query() {
                this.getList();
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
             * @param {Number} 当前页数
             * @returns {void}
             */
            handleCurrentChange(val = this.listQuery.pageNo) {
                this.listQuery.pageNo = val;
                this.getList();
            },
            /**
             * @description 提交审核
             * 
             * @param {Object} row 审核的数据
             * @returns {void}
             */
            handleSubmit(row) {
                submitToApprove({id: row.id}).then(res => {
                    let {code} = res.data;
                    if (code == '20000') {
                        this.getList();
                        this.$notify({  //通知框
                            title: '提交审核',
                            message: '提交成功',
                            type: 'success',
                            duration: 1000
                        });
                    }
                })
            }
        }
    }
</script>
