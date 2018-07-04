import React from 'react';
import ReactDOM from 'react-dom';

var _COUNT=10;
var ajax=require('./post_ajax.js');

// 筛选条件
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      college: "",
      department: "",
      name: "",
      page: 1,
      pages :1,
      rows: 1
    }
  }

  render() {
    return (<div id="kczystj">
      <div id="kczystj_filter">
        <select name="college" id="filter_college" ref="college">
          <option value="">请选择学院</option>
        </select>
        <select name="department" id="filter_department" ref="department">
          <option value="">请选择系部中心</option>
        </select>
        <input type="text" id="filter_name" placeholder="请输入课程名称" ref="name"/>
        <input type="button" id="btn" ref="btn" value="搜索"/>
      </div>
      <Lists  ref="list" options={this.state} />
    </div>);
  }

  componentDidMount() {
    // 获取学院
    ajax({
      url: courseCenter.host + "getCollege",
      data: {
        unifyCode: getCookie("userId")
      },
      success: (gets)=>{
        let datas = JSON.parse(gets);
        if(datas.meta.result==100) {
          datas.data.map((e,index)=>{
            this.refs.college.innerHTML += `<option value=${e.kkxymc}>${e.kkxymc}</option>`;
          });
        }
      }
    });

    // 选定学院后获取专业并填充
    this.refs.college.onchange=(e)=>{
      this.refs.department.innerHTML = "<option value=''>请选择系部中心</option>";
      ajax({
        url: courseCenter.host + "getCourseDepartment",
        data: {
          unifyCode: getCookie("userId"),
          college: this.refs.college.value
        },
        success: (gets)=>{
          let datas = JSON.parse(gets);
          if(datas.meta.result==100) {
            datas.data.map((e,index)=>{
              this.refs.department.innerHTML += `<option value=${e.jysmc}>${e.jysmc}</option>`;
            });
          }
        }
      });
    }

    // 单击搜索按钮的事件
    this.refs.btn.onclick=(e)=>{
      this.refs.list.refresh(1,{
        college: this.refs.college.value,
        department: this.refs.department.value,
        name: this.refs.name.value
      });
    }
  }
}

class Lists extends React.Component {
  constructor(props) {
    super(props);
    let newState={};
    for(let i in this.props.options) {
      newState[i]=this.props.options[i];
    }
    newState.list=[];
    this.state=newState;
  }

  create_list() {
    let tds=[];
    this.state.list.map((e,index)=>{
      tds.push(<tr key={index} className={index==9?"noborder":null}>
        <td className="lefttd"><div></div></td>
        <td>{e.kkxymc}</td>
        <td>{e.jysmc}</td>
        <td>{e.kcmc}</td>
        <td>{e.kcbh}</td>
        <td>{e.kclx}</td>
        <td>{e.jxdg}</td>
        <td>{e.zsdtx}</td>
        <td>{e.ksdg}</td>
        <td>{e.xxzy}</td>
        <td>{e.dzja}</td>
        <td>{e.dxfa}</td>
        <td className="righttd"><div></div></td>
      </tr>);
    });
    return (<tbody>{tds}</tbody>);
  }

  refresh(page, {...sets}) {
    // 未传第二个参数时sets为空对象{}
    // 判断sets是否为空（是否只是翻页）
    if(JSON.stringify(sets)!=="{}") {
      this.state=sets;
    }
    ajax({
      url: courseCenter.host + "getKczyList",
      data: {
        unifyCode: getCookie("userId"),
        college: sets.college||this.state.college,
        courseDepartment: sets.department||this.state.department,
        courseName: sets.name||this.state.name,
        page: page,
        count: _COUNT
      },
      success: (gets)=>{
        let datas = JSON.parse(gets);
        this.setState({
          list: datas.data.KczyList,
          page: page,
          pages: datas.data.totalPages,
          rows: datas.data.total
        });
      }
    });
  }

  render() {
    return(<div id="kczystj_lists">
      <div id="kczystj_table">
        <table>
          <thead>
            <tr>
              <td className="lefttd">
                <div></div>
              </td>
              <td width="15%">学院名称</td>
              <td width="15%">系部中心名称</td>
              <td>课程名称</td>
              <td width="6%">课程编号</td>
              <td width="11%">课程类型</td>
              <td width="5.5%">教学大纲</td>
              <td width="5.5%">知识点体系</td>
              <td width="5.5%">考试大纲</td>
              <td width="5.5%">学习资源</td>
              <td width="5.5%">电子教案</td>
              <td width="5.5%">导学方案</td>
              <td className="righttd">
                <div></div>
              </td>
            </tr>
          </thead>
          {this.create_list()}
        </table>
      </div>
      <Fanye This={this} options={{
        page: this.state.page||1,
        pages: this.state.pages||1,
        rows: this.state.rows
      }} />
    </div>);
  }

  componentDidMount() {
    ajax({
      url: courseCenter.host + "getKczyList",
      data: {
        unifyCode: getCookie("userId"),
        college: this.props.options.college,
        courseDepartment: this.props.options.department,
        courseName: this.props.options.name,
        page: this.props.options.page,
        count: _COUNT
      },
      success: (gets)=>{
        let datas = JSON.parse(gets);
        this.datas = datas.data.KczyList;
        this.setState({
          list: datas.data.KczyList,
          pages: datas.data.totalPages,
          rows: datas.data.total
        });
      }
    });
  }

  componentDidUpdate() {
    // 获取该frame的id
    // var frameId = window.frameElement && window.frameElement.id || '';
    // 设置该frame的高度自适应
    if(window.frameElement) {
      window.frameElement.height=document.body.offsetHeight;
    }
    // function setIframeHeight(iframe) {
    // if (iframe) {
    // var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    // if (iframeWin.document.body) {
    // iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
    // }
    // }
    // };
    // parent.document.getElementById('ifs-kczystj').height=document.body.offsetHeight;
  }
}


class Fanye extends React.Component {
  constructor(props) {
    super(props);
  }

  create_popup_fanye() {
    let nums=[];
    let start=1;
    let end=this.props.options.pages||1;
    let now=this.props.options.page||1;
    let page_on={color:"#007A51"};

    let change_page=(p)=>{
      if(p===now) {
        nums.push(<li key={p} style={page_on}>{p}</li>);
      } else {
        nums.push(<li key={p} onClick={this.fanye.bind(this,p)}>{p}</li>);
      }
    }

    if(end<1) {
      nums.push(<li key="only" onClick={this.fanye.bind(this,1)}>1</li>)
    } else if(end<=5) {
      for(let i=1;i<=end;i++) {
        change_page(i)
      }
    } else {
      if(now<3) {
        for(let i=1;i<=5;i++) {
        change_page(i)
        }
      } else if(now>end-3) {
        for(let i=end-5;i<=end;i++) {
        change_page(i)
        }
      } else {
        for(let i=now-2;i<=now+2;i++) {
        change_page(i)
        }
      }
    }

    return (<div id="kczystj_fanye">
      <span id="rows">共{this.props.options.rows>=0?this.props.options.rows:1}条记录</span>
      <input className="fanye_options" type="button" value="首页"   id="fanye_start" onClick={this.fanye.bind(this,1)} />
      <input className="fanye_options" type="button" value="上一页" id="fanye_pre"   onClick={this.fanye.bind(this,now===1?0:now-1)} />
      <ul id="fanye_nums">{nums}</ul>
      <input type="text" id="tp" ref="tp" placeholder={`${this.props.options.page}/${this.props.options.pages}`} />
      <input className="fanye_options" type="button" value="下一页" id="fanye_next"  onClick={this.fanye.bind(this,now===end?0:now+1)} />
      <input className="fanye_options" type="button" value="尾页"   id="fanye_end"   onClick={this.fanye.bind(this,end)} />
    </div>);
  }

  fanye(p) {
    this.refs.tp.value=null;
    if(p==0) {
      return;
    }
    this.props.This.refresh(p);
  }

  render() {
    return this.create_popup_fanye();
  }

  componentDidMount() {
    // 手动跳转翻页
    this.refs.tp.onkeydown=(eve)=>{
      if(eve.keyCode===13) {
        if(!isNaN(+eve.target.value)) {
          this.fanye(+eve.target.value);
        } else {
          eve.target.value=null;
          eve.target.blur();
        }
      }
    }
  }
}

var BluMUI_M = {
  BluMUI_Filter: Filter
}

var BluMUI = {
  result: {},
  menues:[],
  menue_names:{},
  create: function (data, type, elem) {
    var props = data, Blu = BluMUI_M[type];
    this.result[props.id] = ReactDOM.render(<Blu {...props}/>, elem);    
  }
};


export default BluMUI;