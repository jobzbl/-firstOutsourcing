<template>
    <div class="removeDialog">
        <el-dialog title="确认提示" :visible.sync="visible" width="400px" :before-close="close" :show-close='false'>
            <div style="display:flex;justify-content:flex-start">
                <div style="width:50px;height:50px;">
                    <img src="../../../assets/images/issue.png" alt="" style="width:100%;height:auto;">
                </div>
                <div style="margin-left:20px;" v-if="msg.length<1">
                    <div style="color:#4d4d4d;font-size:18px;font-weight:bold">是否确定删除勾选数据</div>
                    <div style="color:#666;font-size:14px;margin-top:10px;">删除勾选数据会导致删除的数据不可恢复</div>
                </div>
                <div style="margin-left:20px;" v-if="msg.length>0">
                    <div style="color:#4d4d4d;font-size:18px;font-weight:bold">{{msg[0]}}</div>
                    <div style="color:#666;font-size:14px;margin-top:10px;">{{msg[1]}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="formButtonBox">
                    <el-button type="primary" @click="handleClose(true)">确 定</el-button>
                    <el-button @click="close()">取 消</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'removeComponent',
    data() {
        return {
            // visible:false
        }
    },
    props:{
        visible:{
            type:Boolean,
            default:true,
        },
        msg:{
            type:Array,
            defalut:[]
        },
        data:{
            type:String,
            default:''
        }
    },
    methods:{
        handleClose(data){
            console.log(this.data);
            if(data){
                this.$parent.removeDataOk();
            }
            this.$emit('update:visible', false)
        },
        close(){
            this.$emit('update:visible', false)
        }
    },
    watch:{
        
    }
}
</script>
<style lang="less">
    .formButtonBox{
        width: 215px;
        margin: 0 auto 24px;
        display: flex;
        justify-content: space-between;
    }
    .formButtonBox button{
        height: 34px;
        line-height: 34px;
        width: 100px;
        padding: 0;
    }
    .removeDialog{
        .el-dialog__header{
            background: #33B0B5;
            height: 40px;
            line-height: 40px;
            padding: 0;
            padding-left: 15px;
            font-size: 18px;
            span{
                color: #fff!important;
            }
        }
    }
</style>
