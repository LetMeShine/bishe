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
                    <el-button
                            size="mini" type="primary"
                    >编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                    >删除
                    </el-button>
                    <el-button
                            size="mini" type="success" @click="handleSubmit(row)"
                            :disabled="row.status!=0&&row.status!=3&&row.status!=6"
                    >提交审核
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {loanList, submitToApprove} from '@/api/login'

    export default {
        name: 'ComplexTable',
        data() {
            return {
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
                        return '进件';
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
        created() {
            this.getList();
        },
        methods: {
            getList() {  //获取数据
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
            query() { //按名称查询
                this.getList();
            },
            //提交审核
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
