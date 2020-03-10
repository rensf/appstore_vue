<style lang="less">
@import "./message.less";
</style>

<template>
    <div class="message-main-con">
      <!--消息类型 左边栏-->
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType('unread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">未读消息</span><Badge class="message-count-badge-outer" class-name="message-count-badge message-count-badge-unread" :count="unreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('hasread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'hasread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已读消息</span></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('hassend')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'hassend'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已发消息</span></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('drafts')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'drafts'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">草稿箱</span></Button>
            </div>
            <!-- <div>
                <Button @click="setCurrentMesType('hasdelete')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'hasdelete'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已删除</span></Button>
            </div> -->
            <div>
                <Button @click="setCurrentMesType('recyclebin')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'recyclebin'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">回收站</span></Button>
            </div>
        </div>
        <div class="message-content-con">

            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
                  <!--新建消息-->
                    <div v-if="currentMessageType === 'drafts'" class="message-write">
                        <Button class="message-write-btn" type="success" @click="writeMessage">写消息</Button>
                        <Modal :title="writeTitle" v-model="writeVisible" :mask-closable="false" @on-cancel="cancelWrite" width="1050">
                            <Form ref="messageForm" :model="messageForm" :rules="messageFormRule">
                                <Row>
                                  <Col span="12">
                                    <FormItem label="消息标题：" prop="messagetitle">
                                        <Input v-model="messageForm.messagetitle" placeholder="请输入消息标题..."/>
                                    </FormItem>
                                    <FormItem label="消息类型：" prop="messagetype">
                                        <Input v-model="messageForm.messagetype" placeholder="请输入消息类型..."/>
                                    </FormItem>
                                     <FormItem label="消息内容：" prop="messagecontent">
                                        <Input type="textarea" :maxlength="500" style="width:100%;" :rows="5" @input="limitInput" v-model="messageForm.messagecontent"/>
                                        <span style="float:right;"><b>{{remnant}}</b>/500</span>
                                    </FormItem>
                                  </Col>
                                  <Col span="12">
                                    <FormItem label="选择" style="margin-left:50px">
                                      <Transfer
                                        :titles="transferTitles"
                                        :data="allstaff"
                                        :target-keys="targetKeys"
                                        filterable
                                        @on-change="handleChange"></Transfer>
                                    </FormItem>
                                  </Col>
                                </Row>

                            </Form>
                            <div slot="footer">
                                <Button v-if="saveButton" type="success" @click="saveMessage">保存</Button>
                                <Button v-if="editButton" type="success" @click="editMessage">保存</Button>
                                <Button type="primary" @click="sendMessage">发送</Button>
                            </div>
                        </Modal>
                    </div>
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText" :show-header="false"></Table>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showMesTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ mes.messagetitle }}</h3>
                    </div>
                    <p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.updatetime }}&nbsp;&nbsp;&nbsp;来自&nbsp; {{mes.staffname}}</p>
                    <div class="message-content-body">
                        <p class="message-content">{{ mes.messagecontent }}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
  name: "message_index",
  data() {
    const sendMesBtn = (h, params) => {
      return h(
        "Button",
        {
          props: {
            size: "small",
            type: "warning"
          },
          on: {
            click: () => {
              //点击修改按钮
              this.editDraft(params.row,params.index);
            }
          }
        },
        "修改"
      );
    };
    const deleteunreadBtn = (h, params) => {
      return h(
        "Button",
        {
          props:{
            size : "small",
            type : "error"
          },
          style : {
              margin : "0 10px"
          },
          on : {
            click : () => {
              //调用删除方法
              this.clickdeleteunread(params.row,params.index);
            }
          }
        },
        "删除"
      )
    };
    const markAsreadBtn = (h, params) => {
      return h(
        "Button",
        {
          props: {
            size: "small",
            type: "warning"
          },
          on: {
            click: () => {
              this.clickAsreadBtn(params.row,params.index);
            }
          }
        },
        "标为已读"
      );
    };
    const deleteHasReadBtn = (h, params) => {
      return h(
        "Button",
        {
          props: {
            size: "small",
            type: "error"
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                title : "确认删除",
                content : "你确定彻底删除吗",
                onOk : () => {
                  this.clickDeleteHasRead(params.row,params.index);
                }
              })
            }
          }
        },
        "删除"
      );
    };
    const deleteHasSendBtn = (h, params) => {
      return h(
        "Button",
        {
          props: {
            size: "small",
            type: "error"
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                title : "确认删除",
                content : "你确定彻底删除吗",
                onOk : () => {
                  this.clickDeleteHasSend(params.row,params.index);
                }
              })
            }
          }
        },
        "删除"
      );
    };
    const deleteDrafsBtn = (h, params) => {
      return h(
        "Button",
        {
          props: {
            size: "small",
            type: "error"
          },
          style : {
              margin : "0 10px"
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                title : "确认删除",
                content : "你确定彻底删除吗",
                onOk : () => {
                  this.clickDeleteDrafs(params.row,params.index);
                }
              })

            }
          }
        },
        "删除"
      );
    };

    const deleteRecycleBtn = (h, params) => {
      return h(
        "Button",
        {
          props: {
            size: "small",
            type: "error"
          },
          style : {
            margin : "0 10px"
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                title : "确认删除",
                content : "你确定彻底删除吗",
                onOk : () => {
                  this.clickDeleteRecycle(params.row,params.index);
                }
              })

            }
          }
        },
        "删除"
      );
    };

    const restoreBtn = (h, params) => {
      return h(
        "Button",
        {
          props: {
            size: "small",
            type: "warning"
          },
          on: {
            click: () => {
              this.clickRestoreButton(params.row,params.index);
            }
          }
        },
        "还原"
      );
    };
    return {
      //当前消息list
      currentMesList: [],
      //草稿箱消息集合
      draftsList: [],
      //已发送消息集合
      hassendMesList: [],
      //未读消息集合
      unreadMesList: [],
      //已读消息集合
      hasreadMesList: [],
      //已删除消息集合
      hasdeleteList: [],
      //回收站消息集合
      recyclebinList: [],
      writeTitle: "",
      writeVisible: false,
      introduce: "",
      remnant: 500,
      saveButton: false,
      editButton: false,
      messageForm: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      Index: "",
      adminid: this.$store.state.user.userInfo.adminid,
      messageFormRule: {
        messagetitle: [
          { required: true, message: "消息标题不能为空" ,trigger: "blur"}
        ],
        messagetype: [
          { required: true, message: "消息类型不能为空",trigger: "blur"}
        ],
        // messagecontent: [
        //   { required: true, message: "消息内容不能为空", trigger: "blur" }
        // ]
      },
      currentMessageType: "unread",
      showMesTitleList: true,
      draftsCount: 0,
      hassendCount: 0,
      hasdeleteCount: 0,
      unreadCount: 0,
      hasreadCount: 0,
      recyclebinCount: 0,
      noDataText: "",
      //消息实体
      mes: {},
      mesTitleColumns: [
        {
          title: "",
          key: "messagetitle",
          align: "left",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.showMesTitleList = false;
                    this.mes = {
                      messageid: params.row.messageid,
                      staffname: params.row.staffname,
                      messagetitle: params.row.messagetitle,
                      messagetype: params.row.messagetype,
                      messagecontent: params.row.messagecontent,
                      updatetime: this.util.formatDate(params.row.updatetime)
                    };
                  }
                }
              },
              params.row.messagetitle
            );
          }
        },
        {
          title: "",
          key: "updatetime",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h("span", [
              h("Icon", {
                props: {
                  type: "android-time",
                  size: 12
                },
                style: {
                  margin: "0 5px"
                }
              }),
              h(
                "span",
                {
                  props: {
                    type: "android-time",
                    size: 12
                  }
                },
                this.util.formatDate(params.row.updatetime)
              )
            ]);
          }
        },
        {
          title: " ",
          key: "asread",
          align: "center",
          width: 200,
          render: (h, params) => {
            //草稿箱
            if (this.currentMessageType === "drafts") {
              return h("div",
              [
                sendMesBtn(h, params),
                deleteDrafsBtn(h, params)
              ]); //未读
            } else if (this.currentMessageType === "unread") {
              return h("div", [markAsreadBtn(h, params),deleteunreadBtn(h,params)]); //标为已读
            } else if (this.currentMessageType === "recyclebin") {
              return h("div",
              [
                restoreBtn(h, params),  //回收站还原，删除
                deleteRecycleBtn(h, params)
              ]);
            } else if (this.currentMessageType === "hasread") {
              return h("div", [deleteHasReadBtn(h, params)]);//已读选项
            } else if(this.currentMessageType === "hassend") { //已发送选项
              return h("div", [deleteHasSendBtn(h, params)]);
            }
          }
        }
      ],
      // 存放穿梭数据【所有staff】
      allstaff: [],
      // 穿梭目标【接收者】
      targetKeys: [],
      transferTitles: ["请选择接收者", "已选择接收者"],
      //点击草稿箱发送按钮控制联系人对话框的弹出
      showContacts: false
    };
  },
  methods: {
    backMesTitleList() {
      if(this.currentMessageType==="unread"){
        this.setCurrentMesType("unread")
      }
      this.showMesTitleList = true;
    },
    //点击左侧未读消息
    clickunread() {
      this.messageForm.flag = 1;
      this.messageForm.adminid = this.adminid;
      this.postRequest("/message/readMessage", this.messageForm).then(response => {
        this.currentMesList = this.unreadMesList = response.data.result.resultlist;
      }).catch(function(error){
        console.log(error);
      });
    },
    //点击左侧已读消息
    clickread() {
      this.messageForm.flag = 2;
      this.messageForm.adminid = this.adminid;
      this.postRequest("/message/readMessage", this.messageForm).then(response => {
        this.currentMesList = this.hasreadMesList = response.data.result.resultlist;
      }).catch(function(error){
        console.log(error);
      });
    },
    //点击左侧已发消息
    clicksend() {
      this.messageForm.flag = 2;
      this.messageForm.messagesender = this.adminid;
      this.postRequest("/message/queryMessageList", this.messageForm).then(response => {
        this.currentMesList = this.hassendMesList = response.data.result.resultlist;
      }).catch(function(error){
          console.log(error);
      });
    },
    //点击左侧草稿箱
    clickdraft() {
        this.messageForm.flag = 1;
        this.messageForm.messagesender = this.adminid;
        this.postRequest("/message/queryMessageList", this.messageForm).then(response => {
            this.currentMesList = this.draftsList = response.data.result.resultlist;
        }).catch(function(error){
            console.log(error);
        });
    },
    //点击左侧已删除
    // clickdelete() {
    //   this.hasdeleteList = [];
    //   this.postRequest("/message/querydelete", null).then(response => {
    //     let hasdelete = response.data.result.delete;
    //     if (hasdelete === "1") {
    //       let messageList = response.data.result.deletemessage;
    //       messageList.forEach(message => {
    //         this.hasdeleteList.push({
    //           messageid: message.messageid,
    //           sender: message.messagesender,
    //           title: message.messagetitle,
    //           type: message.messagetype,
    //           content: message.messagecontent,
    //           time: message.deletetime
    //         });
    //       });
    //     }
    //   });
    // },
    //点击左侧回收站
    clickrcybin() {
      this.messageForm.flag = 3;
      this.messageForm.adminid = this.adminid;
      this.postRequest("/message/readMessage", this.messageForm).then(response => {
        this.currentMesList = this.recyclebinList = response.data.result.resultlist;
      }).catch(function(error){
        console.log(eror);
      });
    },
    setCurrentMesType(type) {
      if (this.currentMessageType !== type) {
        this.showMesTitleList = true;
      }
      this.currentMessageType = type;
      if (type === "drafts") {
        this.clickdraft();
        this.noDataText = '暂无草稿';
      } else if (type === "hassend") {
        this.clicksend();
        this.noDataText = "暂无已发送消息";
      } else if (type === "unread") {
        this.clickunread();
        this.noDataText = "暂无未读消息";
      } else if (type === "hasdelete") {
        this.clickdelete();
        this.noDataText = "暂无已删除消息";
        this.currentMesList = this.hasdeleteList;
      } else if(type === "hasread") {
        this.clickread();
        this.noDataText = "暂无已读消息";
      } else {
        this.clickrcybin();
        this.noDataText = "回收站无消息";
      }
    },
    writeMessage() {
      this.writeTitle = "写消息";
      this.saveButton = true;
      this.writeVisible = true;
      this.queryContacts();
    },
    //关闭对话框，取消编写消息
    cancelWrite() {
      this.writeVisible = false;
      this.saveButton = false;
      this.editButton = false;
      this.targetKeys = [];
      this.allstaff = [];
      this.$refs.messageForm.resetFields();
    },
    limitInput() {
      let inputLength = this.messageForm.messagecontent.length;
      this.remnant = 500 - inputLength;
    },
    //保存消息
    saveMessage() {
      this.$refs.messageForm.validate(valid => {
        if (valid) {
            this.postRequest("/message/writeMessage", this.messageForm).then(response => {
                let data = response.data.result;
                if(data !== null){
                    this.draftsList.splice(0,0,data);
                    this.currentMesList = this.draftsList;
                    this.$refs.messageForm.resetFields();
                    this.setCurrentMesType('drafts');
                    this.writeVisible = false;
                    this.allstaff = [];
                    this.saveButton = false;
                    this.editButton = false;
                }
            }).catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    editMessage() {
      this.$refs.messageForm.validate(valid => {
        if (valid) {
          this.postRequest("/message/updateMessage", this.messageForm).then(response => {
            let data = response.data.result;
            if(data != null){
              this.$Notice.success({
                title: 'Tip',
                desc: '消息修改成功！'
              });
            }
            this.draftsList.splice(this.Index,1,data);
            this.writeVisible = false;
            this.editButton = false;
            this.saveButton = false;
          }).catch(function(error){
            console.log(error);
          });
        }
      });
    },
    //发送消息
    sendMessage() {
        this.postRequest("/message/sendMessage", this.messageForm).then(response => {
          let data = response.data.result;
          if(data != null){
            this.$Notice.success({
              title: 'Tip',
              desc: '消息发送成功！'
            });
            this.draftsList.splice(this.Index,1);
            this.writeVisible = false;
            this.editButton = false;
            this.saveButton = false;
          }
        });
    },
    handleChange(newTargetKeys, direction, moveKeys) {
      this.targetKeys = newTargetKeys;
      this.messageForm.receiver = this.targetKeys;
    },
    // //初始化所有集合。将其置为空
    // initList() {
    //   //当前消息list
    //   this.currentMesList = [];
    //   //草稿箱消息集合
    //   this.draftsList = [];
    //   //已发送消息集合
    //   this.hassendMesList = [];
    //   //未读消息集合
    //   this.unreadMesList = [];
    //   //已读消息集合
    //   this.hasreadMesList = [];
    //   //已删除消息集合
    //   this.hasdeleteList = [];
    //   //回收站消息集合
    //   this.recyclebinList = [];
    // },
    // //刷新页面
    // refreshPage() {
    //   this.initList();
    // },
    //点击标记已读按钮
    clickAsreadBtn(row,index) {
      row.adminid = this.adminid;
      this.postRequest("/message/markMessage", row).then(response => {
        this.setCurrentMesType("unread");
        this.hasreadMesList.unshift(this.currentMesList.splice(index, 1)[0]);
        this.$store.commit('setMessageCount', this.unreadMesList.length);
      });
    },
    //点击删除未读
    clickdeleteunread(row,index){
      row.adminid = this.adminid;
      row.flag = 1;
      this.postRequest("/message/putRcybin",row).then(response => {
        this.setCurrentMesType("unread");
        this.recyclebinList.unshift(this.currentMesList.splice(index, 1)[0]);
        this.$store.commit('setMessageCount', this.unreadMesList.length);
      })
    },
    //查询所有联系人
    queryContacts() {
        this.postRequest("/staff/queryStaffList", {exportflag : true}).then(response => {
            let data = response.data.result.resultlist;
            data.forEach(element => {
                if(element.adminid !== this.adminid){
                    this.allstaff.push({
                        key: element.adminid,
                        label: element.staffname
                    });
                }
            });
        });
    },
    //点击彻底删除按钮
    clickDeleteRecycle(row,index) {
      row.adminid = this.adminid;
      row.flag = 3;
      this.postRequest("/message/destoryMessage", row).then(response => {
        this.setCurrentMesType("recyclebin");
        this.recyclebinList.splice(index,1);
      });
    },
    //点击还原按钮
    clickRestoreButton(row,index) {
      row.adminid = this.adminid;
      row.flag = 3;
      this.postRequest("/message/restoreMessage", row).then(response => {
        this.setCurrentMesType("recyclebin");
        this.hasreadMesList.unshift(this.recyclebinList.splice(index, 1)[0]);
      });
    },
    //点击修改按钮
    editDraft(row,index) {
        this.writeTitle = '修改消息';
        this.writeVisible = true;
        this.editButton = true;
        this.Index = index;
        this.messageForm.messagecontent = row.messagecontent;
        this.messageForm.messagetitle = row.messagetitle;
        this.messageForm.messagetype = row.messagetype;
        this.messageForm.messageid = row.messageid;
        this.queryContacts();
    },
    //点击删除已读按钮
    clickDeleteHasRead(row) {
      row.adminid = this.adminid;
      row.flag = 2;
      this.postRequest("/message/putRcybin", row).then(response => {
        this.setCurrentMesType("hasread");
        this.recyclebinList.unshift(this.hasreadMesList.splice(index, 1)[0]);
      });
    },
    //点击删除已发送按钮
    clickDeleteHasSend(row,index) {
      this.postRequest("/message/deleteMessage", row).then(response => {
        this.setCurrentMesType("hassend");
        this.hasreadMesList.splice(index, 1);
      });
    },
    //点击删除草稿箱按钮
    clickDeleteDrafs(row,index) {
      this.postRequest("/message/deleteMessage", row).then(response => {
        this.setCurrentMesType("drafts");
        this.draftsList.splice(index, 1);
      });
    }
  },
  mounted() {
    //刷新页面
    this.clickunread()
    this.draftsCount = this.draftsList.length;
    this.hassendCount = this.hassendMesList.length;
    this.hasdeleteCount = this.hasdeleteList.length;
    this.unreadCount = this.unreadMesList.length;
    this.hasreadCount = this.hasreadMesList.length;
    this.recyclebinCount = this.recyclebinList.length;
  },
  watch: {
    draftsList(arr) {
      this.draftsCount = arr.length;
    },
    hassendMesList(arr) {
      this.hassendCount = arr.length;
    },
    hasdeleteList(arr) {
      this.hasdeleteCount = arr.length;
    },
    unreadMesList(arr) {
      this.unreadCount = arr.length;
    },
    hasreadMesList(arr) {
      this.hasreadCount = arr.length;
    },
    recyclebinList(arr) {
      this.recyclebinCount = arr.length;
    }
  }
};
</script>

