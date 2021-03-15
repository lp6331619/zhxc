import * as THREE from 'three'
/**
 * @name:  初始化
 * @param {idDiv} 渲染的 dom
 * * @param {type} 类型
 * * @param {detail} 详情数据
 * * * @param {status} 是否能点击显示名字
 * @return {*}
 */
const FlagCtrl = function (scene, camera, delCallback, editCallback, idDiv, type, detail, status) {
    var _inst = this;
    this._2DDraw = document.getElementById(idDiv);
    this.flagPoints = [];
    this.item = {}
    this.realdata = []
    this.temporary = []
    this.row = {}
    this.status = status
    /**
     * @name: 添加点
     * @param {*} row 当前的mesh
     * @param {*} position 位置
     * @param {*} temporary 是否是点击添加
     * @param {*} item mesh对应的数据
     * @param {*} realdata 是否是点击添加
     * @return {*}
     */
    this.addTipsFlag = function (row, position, temporary, item, realdata, add_type) {
        //判断是否存在
        let index = -1;
        this.row = row
        this.item = item
        this.realdata = realdata
        index = this.flagPoints.findIndex(item => item.id === row.uuid)
        // 没有的添加
        if (index === -1) {
            if (temporary) {
                const flagPoints = JSON.parse(JSON.stringify(this.flagPoints))
                let i = this.temporary.find(item => item === row.uuid)
                i && this.temporary.push(row.uuid)
                this.flagPoints = []
                flagPoints.forEach(item => {
                    if (item.temporary) {
                        const b = document.getElementById(item.id)
                        b && b.remove()
                    } else {
                        this.flagPoints.push(item)
                    }
                })
            }
            this.flagPoints.push({
                "id": row.uuid,
                "name": row.name,
                "point": position,
                "temporary": temporary
            });
        } else {
            // 现有的显示
            const classBox = document.getElementsByClassName('radioBox')
            var need_delete_index = null
            for (let i = 0; i < classBox.length; i++) {
                let id = classBox[i].getAttribute('id')
                // console.log(id)
                const block = this.getStyle(classBox[i], 'display')
                // console.log('foreach:row',row);
                if (id === row.uuid || id === row.parent.uuid) {
                    if(classBox[i].innerText == ''){ //如果文本为空，不显示
                      classBox[i].style.display = 'none'
                    }else{
                      if(temporary){ //点击过来的
                        classBox[i].style.display = block == 'block' ? 'none' : 'block' //控制点击时候的隐藏显示
                        /* if(block == 'block'){ //隐藏显示控制隐藏改成直接删除
                          need_delete_index = i
                        } */
                      }
                      /* if(add_type == 'pointFlag'){//加编辑/删除框特殊处理
                        need_delete_index = i
                      } */
                    }
                } else {
                    // classBox[i].style.display = 'none'
                }
                // classBox[i].style.display = id === row.uuid ? block == 'block' ? 'none' : 'block' : 'none'
            }
            // 删除点击的弹框
            if (this.temporary.length > 0) {
                let index = -1
                this.flagPoints = this.flagPoints.map((item, i) => {
                    let obj = this.temporary.find(row => row === item.id)
                    if (!!obj) {
                        index = i
                        for (let i = 0; i < classBox.length; i++) {
                            let id = classBox[i].getAttribute('id')
                            if (id === obj) {
                                classBox[i].remove()
                            }
                        }
                        item.temporary = false
                    }
                    return item
                })
                this.flagPoints.splice(index, 1)
                // index > 0 && this.temporary.splice(index, 1)

            }/* else if(need_delete_index !== null){
              console.log(need_delete_index,classBox[need_delete_index],this.flagPoints,'this.flagPoints')
              classBox[need_delete_index].remove()
              this.flagPoints.splice(need_delete_index, 1)
            } */
        }
        // debugger
        this.update(add_type)
    }
    this.getStyle = function (obj, attr) {
        if (obj.currentStyle)  //用于IE
        {
            return obj.currentStyle[attr];
        }
        else {
            // document.defaultView.getComputedStyle 该方法时DOM2中才出现的方法
            return document.defaultView.getComputedStyle(obj, null)[attr];
            //getComputedStyle DOM1中的方法
            //return getComputedStyle(obj,false)[attr];
        }
    }
    // /**
    //  * @name: 更新数据
    //  * @param {*}
    //  * @return {*}
    //  */
    // this.updateData = function (item, realdata) {
    //     this.item = item
    //     this.realdata = realdata
    //     this.update()
    // }
    this.updateData = function (item, realdata) {
        this.item = item
        this.realdata = realdata
        this.update()
    }
    this.removeAllTipsFlag = function () {
        this.flagPoints = [];
        while (this._2DDraw.hasChildNodes()) {
            this._2DDraw.removeChild(this._2DDraw.firstChild);
        }
    }
    this.deleteFlag = function (id) {
        let node = this.isExistPoint(id);
        if (node) {
            node.parentNode.removeChild(node);
        }
        let index = -1;
        for (let i = 0; i < this.flagPoints.length; i++) {
            if (this.flagPoints[i].id == id) {
                index = i;
            }
        }
        if (index != -1) {
            this.flagPoints.splice(index, 1);
        }
    }
    // 清除 dom
    this.deleteRadio = function () {
        this.flagPoints = []
        this.temporary = []
        const classBox = document.getElementsByClassName('radioBox')
        for (let i = 0; i < classBox.length; i++) {
            classBox[i].remove()
        }
    }
    this.update = function (add_type) {
        for (var i = 0; i < this.flagPoints.length; i++) {
            var point = this.isExistPoint(this.flagPoints[i].id);
            if(add_type == 'pointFlag' && point && point.className == 'radioBox'){
              point = null
              this.flagPoints[i].temporary = false
              document.getElementById(this.flagPoints[i].id).remove()
            }
            // debugger
            if (point === null ) {
                var pointFlag = document.createElement("div");
                switch (type) {
                    case 'radio':
                        // var info = document.createElement("div");
                        // info.className = "title";
                        pointFlag.className = "radioBox"
                        pointFlag.id = this.flagPoints[i].id;
                        var pos = this.WorldToScreen(this.flagPoints[i].point, camera, scene);
                        pointFlag.style.position = 'absolute'
                        pointFlag.style.display = this.item && this.item.is_show && this.item.is_show === 1 ? 'block' : 'none' // 默认隐藏
                        pointFlag.style.left = pos.x + "px";
                        pointFlag.style.top = pos.y + "px";
                        // 点击 走这里
                        // console.log(this._2DDraw.children, 222)
                        if (this.flagPoints[i].temporary) {
                            if (this.status) {
                                pointFlag.innerText = this.flagPoints[i].name
                                this._2DDraw.appendChild(pointFlag);
                            }
                        } else {
                            // 详情标注走这里
                            if (!this.item || !this.item.mesh_name) return
                            const obj = this.realdata.filter(item => item.mesh_name === this.item.mesh_name)
                            var tmp_str = ''
                            // console.log(obj[0].mesh_name, pointFlag.id, 'info')
                            if (obj.length) {
                                var title = `<div class="title">${this.item.title}</div>`
                                tmp_str = obj[0].title + obj[0].mesh_text
                                obj[0].mesh_text = obj[0].mesh_text.replace(/\n/g, '<br/>')
                                pointFlag.innerHTML = title + obj[0].mesh_text
                                if (obj[0].mesh_color)
                                    this.rowGroup(this.row, obj)
                                // pointFlag.appendChild(info);
                            }
                            if (tmp_str == ''){
                              pointFlag.style.display = "none";
                            }
                            this._2DDraw.appendChild(pointFlag);
                            // debugger
                        }
                        // debugger
                        break;
                    default:
                        pointFlag.id = this.flagPoints[i].id;
                        var pos = this.WorldToScreen(this.flagPoints[i].point, camera, scene);
                        pointFlag.style.position = 'absolute'
                        pointFlag.style.left = pos.x + "px";
                        pointFlag.style.top = pos.y + "px";
                        if (this.flagPoints[i].temporary) {
                            pointFlag.className = "radioBox"
                            pointFlag.innerText = this.flagPoints[i].name
                        } else {
                            pointFlag.className = "pointFlag";
                            var info = document.createElement("div");
                            info.className = "infoBox";
                            var btnEdit = document.createElement('span')
                            btnEdit.innerText = "编辑";
                            info.appendChild(btnEdit);
                            btnEdit.onclick = function (evt) {
                                if (editCallback) {
                                    editCallback(evt.currentTarget.parentNode.parentNode.id);
                                }
                            };
                            var btnDel = document.createElement('span')
                            btnDel.innerText = "删除";
                            btnDel.className = ""
                            info.appendChild(btnDel);
                            btnDel.onclick = function (evt) {
                                _inst.deleteFlag(evt.currentTarget.parentNode.parentNode.id);
                                if (delCallback) {
                                    delCallback(evt.currentTarget.parentNode.parentNode.id);
                                }
                            }
                            pointFlag.appendChild(info);
                        }
                        this._2DDraw.appendChild(pointFlag);
                        break
                }
            } else {
                var pos = this.WorldToScreen(this.flagPoints[i].point, camera, scene);
                point.style.left = pos.x + "px";
                point.style.top = pos.y + "px";
                // point.style.display = "none";
                // if (this.flagPoints[i]) {
                //     point.style.display = "block";
                // }
                //详情数据更新---------------
                if(add_type == 'realdata' && !this.flagPoints[i].temporary && this.realdata){
                  const obj = this.realdata.filter(item => item.mesh_name === this.item.mesh_name)
                  var tmp_str = ''
                  if (obj.length && obj[0].mesh_name == this.flagPoints[i].name) {
                      var title = `<div class="title">${this.item.title}</div>`
                      tmp_str = obj[0].title + obj[0].mesh_text
                      obj[0].mesh_text = obj[0].mesh_text.replace(/\n/g, '<br/>')
                      this.flagPoints[i].innerHTML = point.innerHTML = title + obj[0].mesh_text
                      if (tmp_str == ''){
                        point.style.display = "none";
                      }
                      if (obj[0].mesh_color)
                          this.rowGroup(this.row, obj)
                  }
                }

            }
        }
    }
    // 递归处理 group 给他上色
    this.rowGroup = function (row, obj) {
        switch (row.type) {
            case 'Group':
                row.children.forEach(item => {
                    this.rowGroup(item, obj)
                })
                break;

            case 'Mesh':
                let newMaterial = row.material.clone();
                newMaterial.color = new THREE.Color(obj[0].mesh_color); //重新修改颜色
                row.material = newMaterial;
                break
        }
    }
    this.isExistPoint = function (id) {
        for (var i = 0; i < this._2DDraw.children.length; i++) {
            if (this._2DDraw.children[i].id === id) {
                return this._2DDraw.children[i];
            }
        }
        return null
    }
    this.WorldToScreen = function (point, camera) {
        var worldPos = new THREE.Vector3(point.x, point.y, point.z);
        var vector = worldPos.project(camera);

        var halfWidth = this._2DDraw.offsetWidth / 2;
        var halfHeight = this._2DDraw.offsetHeight / 2;

        return {
            x: Math.round(vector.x * halfWidth + halfWidth - 5),
            y: Math.round(-vector.y * halfHeight + halfHeight - 5)
        };
    }
}
export { FlagCtrl }
