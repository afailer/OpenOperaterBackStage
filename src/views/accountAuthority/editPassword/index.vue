<template>
    <div class="edit-password">
        <div class="dialog">
            <el-dialog width="32%" :visible.sync="editPassword" @close="closeDialog">
                <div slot="title" class="header-title">
                    <span>修改密码</span>
                </div>
                <div class="content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-form-item label="原密码" prop="oldPassword">
                            <el-input v-model.trim="ruleForm.oldPassword" placeholder="请输入原密码"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input v-model.trim="ruleForm.newPassword" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="checkPassword">
                            <el-input v-model.trim="ruleForm.checkPassword" placeholder="请再次输入新密码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="footer">
                    <span class="dialog-footer" slot="footer">
                        <div class="button">
                            <el-button @click="resetForm('ruleForm')">取 消</el-button>
                        </div>
                        <div class="button">
                            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                        </div>
                    </span>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import commonApi from "@/api/commonApi";
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新密码！"));
            } else {
                if (this.ruleForm.checkPassword !== "") {
                    this.$refs.ruleForm.validateField("checkPassword");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入新密码！"));
            } else if (value !== this.ruleForm.newPassword) {
                callback(new Error("两次输入密码不一致！"));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                oldPassword: "",
                newPassword: "",
                checkPassword: ""
            },
            rules: {
                oldPassword: [
                    {
                        required: true,
                        message: "请输入原密码！",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符！",
                        trigger: ["blur", "change"]
                    }
                ],
                newPassword: [
                    { validator: validatePass, trigger: ["blur", "change"] }
                ],
                checkPassword: [
                    { validator: validatePass2, trigger: ["blur", "change"] }
                ]
            }
        };
    },
    computed: {
        editPassword: {
            get() {
                return this.$store.state.user.editPassword;
            },
            set(val) {}
        }
    },
    methods: {
        closeDialog() {
            this.clearForm();
            this.$store.dispatch("editPassword", false);
        },
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    this.ruleForm.newPassword = this.ruleForm.newPassword.trim();
                    if (!this.ruleForm.newPassword.length) {
                        this.$message({
                            message: "新密码不能为空！",
                            type: "error"
                        });
                        return;
                    }
                    if (
                        this.ruleForm.newPassword.length < 6 ||
                        this.ruleForm.newPassword.length > 20
                    ) {
                        this.$message({
                            message: "新密码长度在 6 到 20 个字符！",
                            type: "error"
                        });
                        return;
                    }
                    if (
                        !/^[^\u4e00-\u9fa5]{0,}$/.test(
                            this.ruleForm.oldPassword.trim()
                        )
                    ) {
                        this.$message({
                            message: "原密码中不能包含中文！",
                            type: "info"
                        });
                        return;
                    }
                    if (
                        !/^[^\u4e00-\u9fa5]{0,}$/.test(
                            this.ruleForm.newPassword.trim()
                        )
                    ) {
                        this.$message({
                            message: "新密码中不能包含中文！",
                            type: "info"
                        });
                        return;
                    }
                    if (this.isSubmitting) {
                        return;
                    }
                    this.isSubmitting = true;
                    let params = {
                        password: this.ruleForm.oldPassword.trim(),
                        new_pass: this.ruleForm.newPassword.trim(),
                        affirm_pass: this.ruleForm.checkPassword.trim()
                    };
                    new Promise((resolve, reject) => {
                        commonApi
                            .userUpdatePass(params)
                            .then(res => {
                                this.$message({
                                    message: "密码修改成功！",
                                    type: "success",
                                    duration: 1500
                                });
                                this.clearForm();
                                this.isSubmitting = false;
                                this.$store.dispatch("editPassword", false);
                                resolve(res);
                                this.$store.dispatch("FedLogOut").then(() => {
                                    setTimeout(() => {
                                        location.reload();
                                    }, 1500);
                                });
                            })
                            .catch(res => {
                                this.clearForm();
                                this.isSubmitting = false;
                                this.$store.dispatch("editPassword", false);
                                reject(res);
                            });
                    });
                } else {
                    console.log("error submit!!");
                    return;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
            this.$store.dispatch("editPassword", false);
        },
        clearForm() {
            this.ruleForm = {
                oldPassword: "",
                newPassword: "",
                checkPassword: ""
            };
        }
    },
    mounted() {
        // console.log("qqqqq");
    }
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
