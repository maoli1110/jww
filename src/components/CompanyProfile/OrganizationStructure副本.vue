<template>
    <div class="wrap">
      <h1>所有页面的jQuery不需要引入 可以直接使用</h1>
        <div>
          <div style="margin:0 auto;width:550px;">
            <el-button type="primary" icon="plus"  @click="expandNode({type:'expand',operObj:'tree_edit'})"   size='small'></el-button>
            <el-button type="primary" icon="minus" @click="expandNode({type:'collapse',operObj:'tree_edit'})" size='small'></el-button>
          </div>
          <div style="margin:10px auto;width:550px;position:relative">
            <div class="selectStatus">
                <span class="el-icon-caret-bottom" style="color:#e6e6e6" @click="dropdownShow('state')"> </span>
                <div class="select-dropdown">
                  <ul>
                    <li @click="add({isParent:false})">增加单个状态</li>
                    <li @click='textAreaVisible = true;textareaValue="";textTittle="增加多个状态";type="state" '>增加多个状态</li>
                  </ul>
                </div>
            </div>
            <div class="selcetNodes" >
                <span class="el-icon-caret-bottom" style="color:#e6e6e6" @click="dropdownShow('node')"> </span>
                <div class="select-dropdown">
                  <ul>
                    <li @click="add({isParent:true})">增加单个节点</li>
                    <li @click='textAreaVisible = true;textareaValue="";textTittle="增加多个节点";type="node"'> 增加多个节点</li>
                  </ul>
                </div>
            </div>
            <el-button type="primary" icon="date"  @click="add({isParent:false})" size='small'></el-button>
            <el-button type="primary" icon="menu"  @click="add({isParent:true})" size='small'></el-button>
            <el-button type="primary" icon="edit"  @click="rename()" size='small'></el-button>
            <el-button type="primary" icon="delete"  @click="remove()" size='small'></el-button>
            <el-button type="primary" icon="arrow-up"  @click="upMove()" size='small'></el-button>
            <el-button type="primary" icon="arrow-down"  @click="downMove()" size='small'></el-button>
            <el-button type="primary" icon="caret-top"  @click="upLevel()" size='small'></el-button>
            <el-button type="primary" icon="caret-bottom"  @click="downLevel()" size='small'></el-button>
          </div>
          <div style="margin:10px auto;width:550px;">
            <!--增加多个节点/状态弹框-->
            <el-dialog :title=textTittle :visible.sync="textAreaVisible" size='tiny'
                       :close-on-click-modal="false">
                <el-input type="textarea" :rows="10"  v-model="textareaValue" placeholder="一行视为一个节点，支持多行复制粘贴" :maxlength='297'>
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary"  @click="textAreaVisible = false,addMultiNodeState()">确 定
                    </el-button>
                    <el-button @click="textAreaVisible = false;cancleMultiNodeState()">取 消</el-button>
                </div>
            </el-dialog>



          </div>
            <ul id="tree_edit" class="ztree"></ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import "../../../static/zTree/js/spectrum.js"; // 颜色选择控件
function Map() {
  this.container = new Object();
}
Map.prototype.put = function(key, value) {
  this.container[key] = value;
};

Map.prototype.get = function(key) {
  return this.container[key];
};

Map.prototype.keySet = function() {
  let keyset = new Array();
  let count = 0;
  for (let key in this.container) {
    // 跳过object的extend函数
    if (key == "extend") {
      continue;
    }
    keyset[count] = key;
    count++;
  }
  return keyset;
};

Map.prototype.size = function() {
  let count = 0;
  for (let key in this.container) {
    // 跳过object的extend函数
    if (key == "extend") {
      continue;
    }
    count++;
  }
  return count;
};

Map.prototype.remove = function(key) {
  delete this.container[key];
};
let map = new Map();
//状态树展开、折叠深度(代表点击"展开、折叠"按钮时应该展开的节点的level)
let level;
//预览状态模板树的深度
let maxLevel = -1;
export default {
  data() {
    return {
      textAreaVisible: false,
      textareaValue: "",
      textTittle:'',
      type:'',
      // 树数据
      url: "../../../static/datasource.json",
      setting: {
        view: {
          showIcon: true,
          addDiyDom: this.colorSelect
        },
        data: {
          keep: {
            leaf: true,
            parent: true
          }
        },
        edit: {
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          editNameSelectAll: true,
          drag: {
            isCopy: false,
            isMove: true,
            prev: false,
            next: false
          }
        },
        callback: {
          onRightClick: this.OnRightClick,
          beforeDrag: this.beforeDrag,
          beforeDrop: this.beforeDrop,
          onDrop: this.onDrop,
          beforeRename: this.beforeRename,
          beforeClick: this.beforeClick,
          onCollapse: function(event, treeId, treeNode) {
            level = treeNode.level;
          },
          onExpand: function(event, treeId, treeNode) {
            level = treeNode.level;
          }
        }
      },
      zNodes: []
    };
  },
  mounted() {
    axios.get(this.url).then(res => {
      this.zNodes = res.data[0].result;
      let zTree = $.fn.zTree.init($("#tree_edit"), this.setting, this.zNodes);
      let nodes = zTree.getNodes();
      if (nodes.length > 0) {
        zTree.selectNode(nodes[0]);
      }
      let treeNodes = zTree.transformToArray(zTree.getNodes());
      //获取状态树的深度
      for (let i = 0; i < treeNodes.length; i++) {
        if (treeNodes[i].level >= maxLevel) {
          maxLevel = treeNodes[i].level;
        }
        if (treeNodes[i].level == 0 && treeNodes[i].isParent) {
          //展开"全部"下的子节点
          zTree.expandNode(treeNodes[i], true, false, null, true);
        }
      }
      level = 1;
    });
  },
  methods: {
    // 自定义颜色选择器
    beforeClick(){
      var zTree = $.fn.zTree.getZTreeObj("tree_edit");
      var nodes = zTree.getSelectedNodes();
      console.log(nodes)
    },
    colorSelect(treeId, treeNode) {
      if (treeNode.isParent) {
        return;
      }
      let aObj = $("#" + treeNode.tId + "_a");
      aObj.find("span:first").detach();
      let appendStr =
        "<span id='colorSelect__" +
        treeNode.tId +
        "' style='display: inline-block;height: 13px;width: 20px;margin:0 auto;padding: 0px;z-index: 1000''></span> ";
      aObj.prepend(appendStr);
      let index = treeNode.color.indexOf("#");
      let colorSet;
      if (index == 0) {
        colorSet = treeNode.color;
      } else if (index == -1) {
        colorSet = "rgb(" + treeNode.color + ")";
      }
      $("#colorSelect__" + treeNode.tId).css("background-color", colorSet);
      $("#colorSelect__" + treeNode.tId).spectrum({
        showPalette: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: "更多",
        togglePaletteLessText: "默认",
        palette: [
          ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
          ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
          [
            "#f4cccc",
            "#fce5cd",
            "#fff2cc",
            "#d9ead3",
            "#d0e0e3",
            "#cfe2f3",
            "#d9d2e9",
            "#ead1dc"
          ],
          [
            "#ea9999",
            "#f9cb9c",
            "#ffe599",
            "#b6d7a8",
            "#a2c4c9",
            "#9fc5e8",
            "#b4a7d6",
            "#d5a6bd"
          ],
          [
            "#e06666",
            "#f6b26b",
            "#ffd966",
            "#93c47d",
            "#76a5af",
            "#6fa8dc",
            "#8e7cc3",
            "#c27ba0"
          ],
          [
            "#c00",
            "#e69138",
            "#f1c232",
            "#6aa84f",
            "#45818e",
            "#3d85c6",
            "#674ea7",
            "#a64d79"
          ],
          [
            "#900",
            "#b45f06",
            "#bf9000",
            "#38761d",
            "#134f5c",
            "#0b5394",
            "#351c75",
            "#741b47"
          ],
          [
            "#600",
            "#783f04",
            "#7f6000",
            "#274e13",
            "#0c343d",
            "#073763",
            "#20124d",
            "#4c1130"
          ]
        ],
        // localStorageKey: "spectrum.homepage",
        chooseText: "确定",
        cancelText: "取消",
        beforeShow: function(color) {
          $(".sp-cancel").click(function() {
            let selectNodes = zTree.getSelectedNodes();
            if (selectNodes != null && selectNodes.length > 0) {
              for (let i = 0; i < selectNodes.length; i++) {
                if (!selectNodes[i].isParent) {
                  let originalColor = map.get(selectNodes[i].tId);
                  $("#colorSelect__" + selectNodes[i].tId).css(
                    "background-color",
                    originalColor
                  );
                  selectNodes[i].color = originalColor.substring(
                    4,
                    originalColor.length - 1
                  );
                }
              }
            }
          });
          $(this).spectrum("set", $(this).css("background-color"));
          let zTree = $.fn.zTree.getZTreeObj("tree_edit");
          let idArray = $(this)
            .attr("id")
            .split("__");
          let node = zTree.getNodeByTId(idArray[1]);
          let selectNodes = zTree.getSelectedNodes();
          if (selectNodes != null && selectNodes.length > 0) {
            let selectedTids = new Array();
            for (let i = 0; i < selectNodes.length; i++) {
              selectedTids.push(selectNodes[i].tId);
            }
            if ($.inArray(idArray[1], selectedTids) == -1) {
              //选择的色块不在选择的节点里,取消原先的选择，选择该色块所在的节点
              zTree.selectNode(node);
            }
          } else {
            zTree.selectNode(node);
          }
          //将选择的节点tid以及对应的颜色存入map,以便点击取消的时候恢复
          selectNodes = zTree.getSelectedNodes();
          for (let i = 0; i < selectNodes.length; i++) {
            if (!selectNodes[i].isParent) {
              map.put(
                selectNodes[i].tId,
                $("#colorSelect__" + selectNodes[i].tId).css("background-color")
              );
            }
          }
        },
        change: function(color) {
          let rgb = color.toRgb();
          let zTree = $.fn.zTree.getZTreeObj("tree_edit");
          let selectNodes = zTree.getSelectedNodes();
          if (selectNodes != null) {
            for (let i = 0; i < selectNodes.length; i++) {
              if (!selectNodes[i].isParent) {
                selectNodes[i].color = rgb.r + "," + rgb.g + "," + rgb.b;
                $("#colorSelect__" + selectNodes[i].tId).css(
                  "background-color",
                  color.toHexString()
                );
              }
            }
          }
        },
        move: function(color) {
          let rgb = color.toRgb();
          let zTree = $.fn.zTree.getZTreeObj("tree_edit");
          let selectNodes = zTree.getSelectedNodes();
          if (selectNodes != null) {
            for (let i = 0; i < selectNodes.length; i++) {
              if (!selectNodes[i].isParent) {
                selectNodes[i].color = rgb.r + "," + rgb.g + "," + rgb.b;
                $("#colorSelect__" + selectNodes[i].tId).css(
                  "background-color",
                  color.toHexString()
                );
              }
            }
          }
        }
      });
    },
    //展开、收起树节点
    expandNode(e) {
      let type = e.type;
      let operObj = e.operObj;
      let zTree = $.fn.zTree.getZTreeObj(operObj);
      let treeNodes = zTree.transformToArray(zTree.getNodes());
      let flag = true;

      //点击展开、折叠的时候需要判断一下当前level的节点是不是都为折叠、展开状态
      for (let i = 0; i < treeNodes.length; i++) {
        if (treeNodes[i].level == level && treeNodes[i].isParent) {
          if (type == "expand" && !treeNodes[i].open) {
            flag = false;
            break;
          } else if (type == "collapse" && treeNodes[i].open) {
            flag = false;
            break;
          }
        }
      }

      if (flag) {
        //说明当前level的节点都为折叠或者展开状态
        if (type == "expand") {
          // level++
          if (level < maxLevel - 1) {
            level++;
          }
        } else if (type == "collapse") {
          //level--
          if (level == 0) {
            return;
          }
          level--;
        }
      }
      for (let i = 0; i < treeNodes.length; i++) {
        if (treeNodes[i].level == level && treeNodes[i].isParent) {
          if (type == "expand" && !treeNodes[i].open) {
            zTree.expandNode(treeNodes[i], true, false, null, true);
          } else if (type == "collapse" && treeNodes[i].open) {
            zTree.expandNode(treeNodes[i], false, false, null, true);
          }
        }
      }
    },
    // 新增节点或状态
    add(type) {
      $(".select-dropdown ul").slideUp("fast");
      var zTree = $.fn.zTree.getZTreeObj("tree_edit");
      var isParent = type.isParent;
      var nodes = zTree.getSelectedNodes();
      if (nodes.length == 0) {
        this.$message({
          showClose: true,
          message: "请先选择一个节点",
          type: "warning"
        });
        return;
      }
      if (nodes.length > 1) {
        this.$message({
          showClose: true,
          message: "只能选择一个节点或状态，不能多选",
          type: "warning"
        });
        return;
      }
      var treeNode = nodes[0];
      var newNode;
      if (!isParent) {
        //创建的是状态
        var tmpNode = {
          name: "新状态",
          isParent: isParent,
          color: "128,128,128"
        };
        if (treeNode.isParent) {
          //选中的是节点,创建子状态
          newNode = this.createNode(zTree, treeNode, isParent, false, tmpNode);
        } else {
          //选中的是状态,创建平级状态
          newNode = this.createNode(
            zTree,
            treeNode.getParentNode(),
            isParent,
            false,
            tmpNode
          );
          zTree.moveNode(treeNode, newNode[0], "next");
        }
      } else {
        //创建的是节点
        /**
         * 选中的是根节点需要特殊处理
         */
        var tmpNode = {
          name: "新节点",
          isParent: isParent,
          children: []
        };
        if (treeNode.level == 0) {
          newNode = this.createNode(zTree, treeNode, isParent, false, tmpNode);
          var parentNode = newNode[0].getParentNode();
          var childNodes = parentNode.children;
          var j = 0;
          var z = 0;
          var pNodeArray = new Array();
          var cNodeArray = new Array();
          for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].isParent) {
              pNodeArray[z] = childNodes[i];
              z++;
            } else {
              cNodeArray[j] = childNodes[i];
              j++;
            }
          }
          if (pNodeArray.length > 2) {
            zTree.moveNode(
              pNodeArray[pNodeArray.length - 2],
              newNode[0],
              "next"
            );
          } else if (pNodeArray.length == 1 && cNodeArray.length > 0) {
            zTree.moveNode(cNodeArray[0], newNode[0], "prev");
          }
          zTree.editName(newNode[0]);
          return;
        }
        if (!treeNode.isParent) {
          return;
        }
        newNode = this.createNode(
          zTree,
          treeNode.getParentNode(),
          isParent,
          false,
          tmpNode
        );
        zTree.moveNode(treeNode, newNode[0], "next");
      }
      zTree.editName(newNode[0]);
    },
    // 增加多个节点/状态
    addMultiNodeState() {
      $(".select-dropdown ul").slideUp("fast");
      var zTree = $.fn.zTree.getZTreeObj("tree_edit");
      var isParent;
      if (this.type == "node") {
        isParent = true;
      } else if (this.type == "state") {
        isParent = false;
      }
      var nodes = zTree.getSelectedNodes();
      if (nodes.length == 0) {
        this.$message({
          showClose: true,
          message: "请先选择一个节点",
          type: "warning"
        });
        return;
      }
      if (nodes.length > 1) {
        this.$message({
          showClose: true,
          message: "只能选择一个节点或状态，不能多选",
          type: "warning"
        });
        return;
      }
      //开始增加多个节点/状态
      var treeNode = nodes[0];
      //获取用户输入的节点或者状态
      var contentArray = this.textareaValue.split("\n");
      console.log(contentArray);

      //过滤出空行
      for (var i = 0; i < contentArray.length; i++) {
        if ($.trim(contentArray[i]) == "") {
          contentArray.splice(i, 1);
          i = -1;
          continue;
        }
      }
      var illegalNodeState = new Array();
      outer: for (var k = 0; k < contentArray.length; k++) {
        //过滤出名称过长的节点/状态
        if (contentArray[k].length > 128) {
          illegalNodeState.push(contentArray[k]);
          continue;
        }
        var newNode;
        if (!isParent) {
          var tmpNode = {
            name: $.trim(contentArray[k]),
            isParent: isParent,
            color: "128,128,128"
          };
          //创建的是状态
          if (treeNode.isParent) {
            //选中的是节点,创建子状态
            var childNodes = treeNode.children;
            for (var i = 0; i < childNodes.length; i++) {
              if (
                !childNodes[i].isParent &&
                childNodes[i].name == contentArray[k]
              ) {
                illegalNodeState.push(contentArray[k]);
                continue outer;
              }
            }
            newNode = this.createNode(zTree, treeNode, isParent, true, tmpNode);
          } else {
            //选中的是状态,创建平级状态
            var parentNode = treeNode.getParentNode();
            var childNodes = parentNode.children;
            for (var i = 0; i < childNodes.length; i++) {
              if (
                !childNodes[i].isParent &&
                childNodes[i].name == contentArray[k]
              ) {
                illegalNodeState.push(contentArray[k]);
                continue outer;
              }
            }
            newNode = this.createNode(
              zTree,
              treeNode.getParentNode(),
              isParent,
              true,
              tmpNode
            );
            zTree.moveNode(treeNode, newNode[0], "next");
          }
        } else {
          //创建的是节点
          var tmpNode = {
            name: $.trim(contentArray[k]),
            isParent: isParent,
            children: []
          };
          /**
                     * 选中的是根节点需要特殊处理
                     */
          if (treeNode.level == 0) {
            var childNodes = treeNode.children;
            for (var i = 0; i < childNodes.length; i++) {
              if (
                childNodes[i].isParent &&
                childNodes[i].name == contentArray[k]
              ) {
                illegalNodeState.push(contentArray[k]);
                continue outer;
              }
            }
            newNode = this.createNode(zTree, treeNode, isParent, true, tmpNode);
            var parentNode = newNode[0].getParentNode();
            var childNodes = parentNode.children;
            var j = 0;
            var z = 0;
            var pNodeArray = new Array();
            var cNodeArray = new Array();
            for (var i = 0; i < childNodes.length; i++) {
              if (childNodes[i].isParent) {
                pNodeArray[z] = childNodes[i];
                z++;
              } else {
                cNodeArray[j] = childNodes[i];
                j++;
              }
            }
            if (pNodeArray.length > 2) {
              zTree.moveNode(
                pNodeArray[pNodeArray.length - 2],
                newNode[0],
                "next"
              );
            } else if (pNodeArray.length == 1 && cNodeArray.length > 0) {
              zTree.moveNode(cNodeArray[0], newNode[0], "prev");
            }
          } else {
            /*if(!treeNode.isParent){
                            alertDialog("warning", "请选择一个节点！", function(){});
                            break;
                        }*/
            var parentNode = treeNode.getParentNode();
            var childNodes = parentNode.children;
            for (var i = 0; i < childNodes.length; i++) {
              if (
                childNodes[i].isParent &&
                childNodes[i].name == contentArray[k]
              ) {
                illegalNodeState.push(contentArray[k]);
                continue outer;
              }
            }
            newNode = this.createNode(
              zTree,
              treeNode.getParentNode(),
              isParent,
              true,
              tmpNode
            );
            zTree.moveNode(treeNode, newNode[0], "next");
          }
        }
      }
      var message;
      if (illegalNodeState.length > 0) {
        if (isParent) {
          message = "以下节点名称重复或者过长无法创建！\n";
          message += illegalNodeState.join("、") + "\n\n";
          message += "符合要求的节点将被创建";
        } else {
          message = "以下状态名称重复或者过长无法创建！\n";
          message += illegalNodeState.join("、") + "\n\n";
          message += "符合要求的状态将被创建";
        }
        alert(message);
        // this.$message({
        //   showClose: true,
        //   message: "至少选择一个节点或状态",
        //   type: "warning"
        // });
      }
    },
    //取消
    cancleMultiNodeState() {
      $(".selectStatus ul").slideUp("fast");
    },
    createNode(zTree, treeNode, isParent, directCreateName, node) {
      var newNode;
      /*var treeNodes = zTree.transformToArray(zTree.getNodes());*/
      var childNodes = treeNode.children;
      var name;
      if (!directCreateName) {
        outer: for (var i = 0; ; i++) {
          if (i == 0) {
            name = node.name;
          } else {
            name = node.name + "(" + i + ")";
          }
          if (childNodes == null || childNodes.length == 0) {
            //父节点下无子节点，直接创建
            break;
          }
          for (var j = 0; j < childNodes.length; j++) {
            if (
              childNodes[j].isParent == isParent &&
              childNodes[j].name == name
            ) {
              continue outer;
            }
          }
          break;
        }
      } else {
        name = node.name;
      }
      newNode = zTree.addNodes(treeNode, {
        name: name,
        isParent: isParent,
        children: node.children,
        color: node.color
      });
      return newNode;
    },
    // 重命名
    rename() {
      let zTree = $.fn.zTree.getZTreeObj("tree_edit");
      let nodes = zTree.getSelectedNodes();
      let treeNode = nodes[0];
      if (nodes.length == 0) {
        this.$message({
          showClose: true,
          message: "请先选择一个节点",
          type: "warning"
        });
        return;
      }
      if (nodes.length > 1) {
        this.$message({
          showClose: true,
          message: "只能重命名一个节点或状态,不能多选",
          type: "warning"
        });
        return;
      }
      if (nodes.length == 1 && nodes[0].level == 0) {
        //【全部】节点不能删除
        return;
      }
      zTree.editName(treeNode);
    },
    beforeRename(treeId, treeNode, newName, isCancel) {
      let zTree = $.fn.zTree.getZTreeObj("tree_edit");
      let vm = this;
      let message;
      if (!isCancel) {
        if ($.trim(newName).length == 0) {
          if (treeNode.isParent) {
            message = "节点名称不能为空";
          } else {
            message = "状态名称不能为空";
          }
          // vm.$message.error(message);
          vm.$message({
            showClose: true,
            message: message,
            type: "error"
          });
          zTree.cancelEditName();
          return false;
        } else if ($.trim(newName).length > 128) {
          if (treeNode.isParent) {
            message = "节点名称不能超过128个字符";
          } else {
            message = "状态名称不能超过128个字符";
          }
          vm.$message({
            showClose: true,
            message: message,
            type: "error"
          });
          zTree.cancelEditName();
          return false;
        } else {
          //判断节点/状态是否重名
          /*let treeNodes = zTree.transformToArray(zTree.getNodes());*/
          let parentNode = treeNode.getParentNode();
          let childNodes = parentNode.children;
          for (let i = 0; i < childNodes.length; i++) {
            if (
              childNodes[i].isParent == treeNode.isParent &&
              childNodes[i].name == newName &&
              childNodes[i].tId != treeNode.tId
            ) {
              if (treeNode.isParent) {
                message = "节点名称不能重复";
              } else {
                message = "状态名称不能重复";
              }
              vm.$message({
                showClose: true,
                message: message,
                type: "error"
              });
              zTree.cancelEditName();
              return false;
            }
          }
        }
      }

      return true;
    },
    // 删除
    remove() {
      let zTree = $.fn.zTree.getZTreeObj("tree_edit");
      let nodes = zTree.getSelectedNodes();
      if (nodes.length == 0) {
        this.$message({
          showClose: true,
          message: "至少选择一个节点或状态",
          type: "warning"
        });
        return;
      }
      if (nodes.length == 1 && nodes[0].level == 0) {
        //【全部】节点不能删除
        return;
      }
      this.$confirm("确认删除选中的节点和状态？删除后：所属节点的状态将被一同删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].level == 0) {
              continue;
            }
            zTree.removeNode(nodes[i], false);
          }
        })
        .catch(() => {
          console.log(1);
        });
    },
    //上移
    upMove() {
      let treeObj = $.fn.zTree.getZTreeObj("tree_edit");
      let nodes = treeObj.getSelectedNodes();
      if (nodes.length == 0) {
        // alertDialog("warning", "至少选择一个节点", function() {});
        this.$message({
          showClose: true,
          message: "至少选择一个节点",
          type: "warning"
        });
        return;
      }
      //移动之前需要判断满足条件才能上移
      //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许粘贴
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].isParent != nodes[0].isParent) {
          return;
        }
      }
      //判断多选的节点/状态是否是同一层级，如果不是，不允许粘贴
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].level != nodes[0].level) {
          return;
        }
      }

      //判断节点/状态是否是第一个，如果是，不能移动
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getPreNode() == null) {
          return;
        }
      }
      //判断状态前一个节点是否是节点，如果是，不能移动
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].isParent && nodes[i].getPreNode().isParent) {
          return;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        treeObj.moveNode(nodes[i].getPreNode(), nodes[i], "prev");
      }
    },
    //下移
    downMove() {
      var treeObj = $.fn.zTree.getZTreeObj("tree_edit");
      var nodes = treeObj.getSelectedNodes();
      if (nodes.length == 0) {
        this.$message({
          showClose: true,
          message: "至少选择一个节点",
          type: "warning"
        });
        return;
      }

      //移动之前需要判断满足条件才能下移
      //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许移动
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isParent != nodes[0].isParent) {
          return;
        }
      }
      //判断多选的节点/状态是否是同一层级，如果不是，不允许移动
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].level != nodes[0].level) {
          return;
        }
      }

      //判断节点/状态是否是最后一个，如果是，不能移动
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].getNextNode() == null) {
          return;
        }
      }
      //判断节点后一个节点是否是状态，如果是，不能移动
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isParent && !nodes[i].getNextNode().isParent) {
          return;
        }
      }

      for (var i = nodes.length - 1; i >= 0; i--) {
        treeObj.moveNode(nodes[i].getNextNode(), nodes[i], "next");
      }
    },
    //升级
    upLevel() {
      var treeObj = $.fn.zTree.getZTreeObj("tree_edit");
      var nodes = treeObj.getSelectedNodes();
      if (nodes.length == 0) {
        this.$message({
          showClose: true,
          message: "至少选择一个节点",
          type: "warning"
        });
        return;
      }
      //升级之前需要判断满足条件才能下移
      //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许升级
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isParent != nodes[0].isParent) {
          return;
        }
      }
      //判断多选的节点/状态是否是同一层级，如果不是，不允许升级
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].level != nodes[0].level) {
          return;
        }
      }
      //"全部"下的节点/状态不能升级
      for (var i = 0; i < nodes.length; i++) {
        var parentNode = nodes[i].getParentNode();
        if (parentNode == null || parentNode.level == 0) {
          return;
        }
      }
      for (var i = 0; i < nodes.length; i++) {
        var parentNode = nodes[i].getParentNode();
        var childNodes = parentNode.getParentNode().children;

        var nameRepeatFlag = false;
        for (var j = 0; j < childNodes.length; j++) {
          if (
            childNodes[j].isParent == nodes[i].isParent &&
            childNodes[j].name == nodes[i].name
          ) {
            /*alertDialog("warning", "升级后出现同名节点/状态！", function(){});
                return;*/
            nameRepeatFlag = true;
            break;
          }
        }
        if (nameRepeatFlag) {
          var name;
          //升级后有重复的节点/状态，自动重命名
          outer: for (k = 0; ; k++) {
            if (k == 0) {
              name = nodes[i].name;
            } else {
              name = nodes[i].name + "(" + k + ")";
            }
            /*if(childNodes.length==0){
                        //父节点下无子节点，直接创建
                        break;
                    }*/
            for (var j = 0; j < childNodes.length; j++) {
              if (
                childNodes[j].isParent == nodes[i].isParent &&
                childNodes[j].name == name
              ) {
                continue outer;
              }
            }
            break;
          }
          nodes[i].name = name;
          treeObj.updateNode(nodes[i]);
        }
        var j = 0;
        var z = 0;
        var pNodeArray = new Array();
        var cNodeArray = new Array();
        for (var k = 0; k < childNodes.length; k++) {
          if (childNodes[k].isParent) {
            pNodeArray[z] = childNodes[k];
            z++;
          } else {
            cNodeArray[j] = childNodes[k];
            j++;
          }
        }

        if (nodes[i].isParent) {
          //找到父节点同级最后一个节点,放在其后面
          treeObj.moveNode(pNodeArray[pNodeArray.length - 1], nodes[i], "next");
        } else {
          //找到父节点同级最后一个状态,放在其后面
          if (cNodeArray.length > 0) {
            treeObj.moveNode(
              cNodeArray[cNodeArray.length - 1],
              nodes[i],
              "next"
            );
          } else {
            treeObj.moveNode(
              pNodeArray[pNodeArray.length - 1],
              nodes[i],
              "next"
            );
          }
        }
      }
    },
    // 降级
    downLevel() {
      var treeObj = $.fn.zTree.getZTreeObj("tree_edit");
      var nodes = treeObj.getSelectedNodes();
      if (nodes.length == 0) {
        this.$message({
          showClose: true,
          message: "至少选择一个节点",
          type: "warning"
        });
        return;
      }
      //降级之前需要判断满足条件才能下移
      //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许降级
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isParent != nodes[0].isParent) {
          return;
        }
      }
      //判断多选的节点/状态是否是同一层级，如果不是，不允许降级
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].level != nodes[0].level) {
          return;
        }
      }

      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isParent) {
          if (nodes[i].isFirstNode) {
            return;
          }
          var preNode = nodes[i].getPreNode();
          var childNodes = nodes[i].children;
          if (preNode == null || !preNode.isParent || nodes[i].level == 2) {
            return;
          }
          var j = 0;
          var z = 0;
          var pNodeArray = new Array();
          var cNodeArray = new Array();
          if (childNodes != null) {
            for (var k = 0; k < childNodes.length; k++) {
              if (childNodes[k].isParent) {
                pNodeArray[z] = childNodes[k];
                z++;
              } else {
                cNodeArray[j] = childNodes[k];
                j++;
              }
            }
            if (pNodeArray.length > 0 && nodes[i].level == 1) {
              return;
            }
          }
        } else {
          //找出父节点下的最后一个节点
          var parentNode = nodes[i].getParentNode();
          var childNodes = parentNode.children;
          var j = 0;
          var z = 0;
          var pNodeArray = new Array();
          var cNodeArray = new Array();
          for (var k = 0; k < childNodes.length; k++) {
            if (childNodes[k].isParent) {
              pNodeArray[z] = childNodes[k];
              z++;
            } else {
              cNodeArray[j] = childNodes[k];
              j++;
            }
          }
          if (pNodeArray.length == 0) {
            return;
          }
        }
      }

      for (var i = 0; i < nodes.length; i++) {
        var preNode = nodes[i].getPreNode();
        if (nodes[i].isParent) {
          var j = 0;
          var z = 0;
          var pNodeArray = new Array();
          var cNodeArray = new Array();
          var childNodes = preNode.children;
          var nameRepeatFlag = false;
          for (var k = 0; k < childNodes.length; k++) {
            if (
              childNodes[k].isParent == nodes[i].isParent &&
              childNodes[k].name == nodes[i].name
            ) {
              /*alertDialog("warning", "降级后出现同名节点/状态！", function(){});
                    return;*/
              nameRepeatFlag = true;
            }
            if (childNodes[k].isParent) {
              pNodeArray[z] = childNodes[k];
              z++;
            } else {
              cNodeArray[j] = childNodes[k];
              j++;
            }
          }

          if (nameRepeatFlag) {
            var name;
            //降级后有重复的节点，自动重命名
            outer: for (k = 0; ; k++) {
              if (k == 0) {
                name = nodes[i].name;
              } else {
                name = nodes[i].name + "(" + k + ")";
              }
              /*if(childNodes.length==0){
                            //父节点下无子节点，直接创建
                            break;
                        }*/
              for (var j = 0; j < childNodes.length; j++) {
                if (
                  childNodes[j].isParent == nodes[i].isParent &&
                  childNodes[j].name == name
                ) {
                  continue outer;
                }
              }
              break;
            }
            nodes[i].name = name;
            treeObj.updateNode(nodes[i]);
          }

          if (pNodeArray.length > 0) {
            treeObj.moveNode(
              pNodeArray[pNodeArray.length - 1],
              nodes[i],
              "next"
            );
          } else if (cNodeArray.length > 0) {
            treeObj.moveNode(cNodeArray[0], nodes[i], "prev");
          } else {
            treeObj.moveNode(preNode, nodes[i], "inner");
          }
          /*else{
                treeObj.moveNode(preNode,node,"inner");
            }*/
        } else {
          //找出父节点下的最后一个节点
          var parentNode = nodes[i].getParentNode();
          var childNodes = parentNode.children;
          var j = 0;
          var z = 0;
          var pNodeArray = new Array();
          var cNodeArray = new Array();
          for (var k = 0; k < childNodes.length; k++) {
            if (childNodes[k].isParent) {
              pNodeArray[z] = childNodes[k];
              z++;
            } else {
              cNodeArray[j] = childNodes[k];
              j++;
            }
          }

          var childNodes = pNodeArray[pNodeArray.length - 1].children;
          var nameRepeatFlag = false;
          for (var k = 0; k < childNodes.length; k++) {
            if (
              childNodes[k].isParent == nodes[i].isParent &&
              childNodes[k].name == nodes[i].name
            ) {
              nameRepeatFlag = true;
              break;
            }
          }
          if (nameRepeatFlag) {
            var name;
            //降级后有重复的节点，自动重命名
            outer: for (k = 0; ; k++) {
              if (k == 0) {
                name = nodes[i].name;
              } else {
                name = nodes[i].name + "(" + k + ")";
              }
              /*if(childNodes.length==0){
                            //父节点下无子节点，直接创建
                            break;
                        }*/
              for (var j = 0; j < childNodes.length; j++) {
                if (
                  childNodes[j].isParent == nodes[i].isParent &&
                  childNodes[j].name == name
                ) {
                  continue outer;
                }
              }
              break;
            }
            nodes[i].name = name;
            treeObj.updateNode(nodes[i]);
          }
          treeObj.moveNode(
            pNodeArray[pNodeArray.length - 1],
            nodes[i],
            "inner"
          );
        }
      }
    },
    // 新增节点和状态下拉框
    dropdownShow(type) {
      //获取选择的节点
      var zTree = $.fn.zTree.getZTreeObj("tree_edit");
      var nodes = zTree.getSelectedNodes();
      if (nodes.length != 1) {
        return;
      }
      if (!nodes[0].isParent && type == "node") {
        return;
      }
      type=='node'? $(".selcetNodes ul").slideToggle():$(".selectStatus ul").slideToggle();

    }
  }
};
</script>
<style scoped>
.wrap {
  padding: 20px;
}
.wrap ul.ztree {
  height: 560px;
  width: 550px;
  margin-top: 10px;
  margin: 0 auto;
  border: 1px solid #617775;
  overflow-y: auto;
  overflow-x: auto;
}
.el-select-dropdown__item.selected {
  color: rgb(72, 106, 106);
  background-color: #fff;
}
.selectStatus {
  position: absolute;
  left: 36px;
  top: 5px;
}
.selcetNodes{
  position: absolute;
  left: 93px;
  top: 5px;
}
.select-dropdown ul {
  position: absolute;
  width: 120px;
  border: 1px solid rgb(209, 229, 229);
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  margin: 5px 0;
  display: none;
  z-index: 999;
}
.select-dropdown ul li {
  font-size: 14px;
  padding: 8px 10px;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(72, 106, 106);
  height: 36px;
  line-height: 1.5;
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
}
.dialog-footer {
  text-align: center;
}
.multi-textarea .el-button {
  width: 116px;
}
</style>
