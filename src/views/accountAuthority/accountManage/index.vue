<template>
    <div class="account-manage">
        <!-- 搜索 -->
        <div class="model-container">
            <el-form :inline="true" label-width="90px">
                <el-form-item label="姓名">
                    <el-input
                        v-model.trim="account.params.name"
                        placeholder="请输入姓名"
                        @keyup.enter.native="onSubmit"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="账号">
                    <el-input
                        v-model.trim="account.params.user_name"
                        placeholder="请输入账号"
                        @keyup.enter.native="onSubmit"
                        style="width: 280px"
                        clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-style" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-style" type="warning" @click="onClear">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- content -->
        <div class="model-container">
            <div class="add">
                <div class="left">共有数据：{{account.totalNum}}条</div>
                <div class="right" @click="addAccount">+添加</div>
            </div>
            <div>
                <el-table
                    :header-cell-style="$commonRowClass"
                    :highlight-current-row="true"
                    :data="account.accountList"
                    stripe
                    border
                    style="width: 100%;"
                >
                    <el-table-column align="center" prop="id" label="账号ID" width="100"></el-table-column>
                    <el-table-column align="center" prop="name" label="姓名" width="140"></el-table-column>
                    <el-table-column align="center" prop="account" label="账号" width="220"></el-table-column>
                    <el-table-column align="center" prop="email" label="邮箱" width="220"></el-table-column>
                    <el-table-column align="center" prop="roles_name" label="角色列表" width="220"></el-table-column>
                    <el-table-column align="center" prop="state_name" label="账号状态" width="130"></el-table-column>
                    <el-table-column align="center" prop="created_at" label="创建时间" width="180"></el-table-column>
                    <el-table-column align="center" prop="updated_at" label="更新时间" width="180"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click="editAccount(scope.$index)"
                                type="text"
                                size="small"
                            >编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="pagination" v-show="account.accountList.length">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="account.params.page"
                    :page-sizes="[10, 15, 20]"
                    :page-size="15"
                    layout="sizes, prev, pager, next"
                    :total="account.totalNum"
                ></el-pagination>
            </div>
        </div>
        <!-- 添加、编辑 -->
        <div class="dialog">
            <el-dialog width="32%" :visible.sync="dialogVisible" @close="closeDialog">
                <div slot="title" class="header-title">
                    <span>{{dialogTitle}}</span>
                </div>
                <div class="content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model.trim="ruleForm.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model.trim="ruleForm.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="账号" prop="account">
                            <el-input
                                v-model.trim="ruleForm.email"
                                placeholder="账号与邮箱保持一致（不必输入）"
                                readonly="readonly"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="ruleForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="账号状态" prop="state">
                            <el-radio-group v-model="ruleForm.state">
                                <el-radio label="1">正常</el-radio>
                                <el-radio label="2">封禁</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="角色" prop="role">
                            <el-checkbox-group v-model="ruleForm.role">
                                <el-checkbox
                                    v-for="(item, index) in roleList"
                                    :key="index"
                                    :label="String(item.id)"
                                    name="type"
                                >{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="footer">
                    <span class="dialog-footer" slot="footer">
                        <div class="button">
                            <el-button @click="resetForm('ruleForm')">取 消</el-button>
                        </div>
                        <div class="button">
                            <el-button
                                type="primary"
                                @click="submitForm('ruleForm', account.edit_user_id)"
                            >确 定</el-button>
                        </div>
                    </span>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import commonApi from "@/api/commonApi";
import util from "@/utils/util";
export default {
    data() {
        return {
            form: {
                phone: "",
                policy_no: ""
            },
            account: {
                params: {
                    name: "",
                    user_name: "",
                    page: 1,
                    page_size: 15
                },
                edit_user_id: 0,
                totalNum: 0,
                accountList: [],
                originAccountList: []
            },
            isSubmitting: false,
            dialogVisible: false,
            dialogTitle: "添加账号",
            roleList: [],
            ruleForm: {
                name: "",
                email: "",
                account: "",
                password: "",
                state: "1",
                role: []
            },
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在 2 到 20 个字符",
                        trigger: ["blur", "change"]
                    },
                    { pattern: /(^\s*)|(\s*$)/g, message: "前后不能包含空格！" }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱地址",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: ["blur", "change"]
                    }
                ],
                state: [
                    {
                        required: true,
                        message: "请选择账号状态",
                        trigger: "change"
                    }
                ],
                role: [
                    {
                        type: "array",
                        required: true,
                        message: "请至少选择一个角色",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            this.account.params.name = this.account.params.name.trim();
            this.account.params.user_name = this.account.params.user_name.trim();
            this.getUserList(this.account.params);
        },
        onClear() {
            this.account.params.name = "";
            this.account.params.user_name = "";
            this.getUserList(this.account.params);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.account.params.page = 1;
            this.account.params.page_size = val;
            this.getUserList(this.account.params);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.account.params.page = val;
            this.getUserList(this.account.params);
        },
        closeDialog() {
            // 初始化
            this.clearForm();
            this.account.edit_user_id = 0;
            this.dialogVisible = false;
        },
        addAccount() {
            this.dialogTitle = "添加账号";
            this.rules.password[0].required = true;
            this.account.edit_user_id = 0;
            // 初始化
            this.clearForm();
            this.dialogVisible = true;
        },
        editAccount(index) {
            console.log(index, this.account.originAccountList[index]);
            let userInfo = this.account.originAccountList[index];
            this.ruleForm = {
                name: userInfo.name,
                email: userInfo.email,
                account: userInfo.user_name,
                password: "",
                state: String(userInfo.is_enabled),
                role:
                    userInfo.roles && userInfo.roles.length
                        ? userInfo.roles
                        : ["2"]
            };
            this.dialogTitle = "编辑账号";
            this.rules.password[0].required = false;
            this.account.edit_user_id = userInfo.user_id;
            this.dialogVisible = true;
        },
        submitForm(ruleForm, user_id) {
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!emailReg.test(this.ruleForm.email.trim())) {
                        this.$message({
                            message: "请输入正确的邮箱地址！",
                            type: "info"
                        });
                        return;
                    }
                    if (
                        !/^[^\u4e00-\u9fa5]{0,}$/.test(
                            this.ruleForm.password.trim()
                        )
                    ) {
                        this.$message({
                            message: "密码中不能包含中文！",
                            type: "info"
                        });
                        return;
                    }
                    if (this.isSubmitting) {
                        return;
                    }
                    this.isSubmitting = true;
                    let params = {
                        name: this.ruleForm.name.trim(),
                        email: this.ruleForm.email.trim(),
                        user_name: this.ruleForm.email.trim(),
                        password: this.ruleForm.password.trim(),
                        is_enabled: Number(this.ruleForm.state),
                        roles: this.ruleForm.role
                    };
                    new Promise((resolve, reject) => {
                        // 新增
                        if (!user_id) {
                            commonApi.addUser(params).then(res => {
                                console.log(6767, res);
                                this.isSubmitting = false;
                                this.dialogVisible = false;
                                location.reload();
                            }).catch(() => {
                                this.isSubmitting = false;
                            });
                        } else {
                            params.user_id = user_id;
                            commonApi.editUser(params).then(res => {
                                console.log(1234, res);
                                this.isSubmitting = false;
                                this.dialogVisible = false;
                                location.reload();
                            }).catch(() => {
                                this.isSubmitting = false;
                            });
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
            this.dialogVisible = false;
        },
        clearForm() {
            this.ruleForm = {
                name: "",
                email: "",
                account: "",
                password: "",
                state: "1",
                role: []
            };
        },
        getUserList(params) {
            commonApi.getAdminList(params).then(res => {
                this.account.originAccountList = [];
                this.account.accountList = [];
                this.account.totalNum = res.data.total;
                if (res.data && res.data.list) {
                    this.account.originAccountList = res.data.list;
                    for (let item of res.data.list) {
                        this.account.accountList.push({
                            id: item.user_id,
                            name: item.name,
                            account: item.user_name,
                            email: item.email,
                            roles_name: item.roles_name,
                            state_name: util.getAccountState(item.is_enabled),
                            created_at: item.created_at,
                            updated_at: item.updated_at
                        });
                    }
                }
            });
        }
    },
    mounted() {
        commonApi.getRolesList().then(res => {
            this.roleList = res.data;
        });
        this.getUserList(this.account.params);
    }
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
