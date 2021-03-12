<template>
    <div class="user-list">
        <el-table
        :data="tableData.slice(pageNo - 1, pageNo + 9)"
        style="width: 100%">
            <el-table-column
                prop="username"
                label="用户名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="reg_time"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="creator"
                label="创建者">
            </el-table-column>
            <el-table-column
                prop="type"
                label="权限分配">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
    import {userList} from '@/api/http.js'
    export default {
        data() {
            return {
                tableData: [],
                pageNo: 1,
                pages: 0,
            }
        },
        created() {
            userList().then(({data}) => {
                if(data.code === 200){
                    this.tableData = data.data;
                    this.pages = Math.ceil(this.tableData.length / 10);
                }
            })
        },
        methods: {
             /**
             * @description 当前条数变化
             * 
             * @param {Number} val 每一页显示的条数
             * @returns {void}
             */
            handleSizeChange(val = this.pages) {
                this.pages = val; // 总页数
            },
            /**
             * @description 当前页变化
             * 
             * @param {Number} 当前页数
             * @returns {void}
             */
            handleCurrentChange(val = this.pageNo) {
                this.pageNo = val;
            }
        }
    }
  </script>

  <style scoped>
    .user-list {
        width: 100%;
        height: 100%;
        padding: 20px;
    }
  </style>