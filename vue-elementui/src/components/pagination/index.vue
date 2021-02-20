<template>
  <div class="pagination">
       <!-- total	总条目数
    layout 组件布局，子组件名用逗号分隔 total, sizes, prev, pager, next, jumper
    page-sizes	每页显示个数选择器的选项设置 [10, 20, 30, 40]
    size-change	页数 改变时会触发
    current-change	每页码 改变时会触发
    current-page 当前页数，支持 .sync 修饰符 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="curPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
   <!-- total 总数目 @change 方法  limit页数  page页码 -->
</template>

<script>

export default {
    props:{
        total:{  //总数目
            required:true,
            type:Number
        },
        page:{  //页码 
            type:Number,
            default:1
        },
        limit:{  //页数 
            type:Number,
            default:10
        },
        pageSizes:{   //每页显示个数选择器的选项设置 [10, 20, 30, 40]
            type:Array,
            default(){
                return [10, 20, 30, 40]
            }
        },
        layout:{   //layout 组件布局，子组件名用逗号分隔 total, sizes, prev, pager, next, jumper
            type:String,
            default:"total, sizes, prev, pager, next, jumper"
        }
    },
    computed:{
        curPage:{
            get(){
                return this.page
            },
            set(val){
                this.$emit('update:page',val)
            }
        },
        pageSize:{
            get(){
                return this.limit
            },
            set(val){
                this.$emit('update:limit',val)
            }
        }
    },
    methods:{
         //当前条数变化
        handleSizeChange(val=this.limit ){
            this.$emit('change')
        },
        //当前页变化
        handleCurrentChange(val=this.page){
            this.$emit('change')
        },
    }
}
</script>