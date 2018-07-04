// 源码丢失
import React from 'react';
import ReactDOM from 'react-dom';
//头部，访问量，登录等等,可用
class BluMUI_UserLoginState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userListShow: false,
			right: this.props.right,
			isLogin: this.props.isLogin
		}
		this._onClick = this._onClick.bind(this);
		this._show = this._show.bind(this);
		this._noShow = this._noShow.bind(this);
	}
	_onClick(value) {
		var that = this;
		return function () {
			that.props.callback(value, that);
		}
	}
	_isShowVisit() {
		var result = (
			<span className="loginNum">
				{this.props.loginNumText + this.props.loginNum}
			</span>
		)
		return result;
	}
	_createFunc() {
		var defaultModule = this.props.defaultFunc,
			t,
			i,
			result = [],
			len,
			moduleToURL = this.props.moduleToURL;
		if (this.state.isLogin) {
			var funcMoulde = this.props.funcName;
			for (i = 0, len = funcMoulde.length; i <= len; i++) {
				if (moduleToURL[funcMoulde[i]]) {
					result.push(
						<a key={i} href={moduleToURL[funcMoulde[i]].url} target={moduleToURL[funcMoulde[i]].openType}>
							<li >
								{funcMoulde[i]}
							</li>
						</a>
					);
				} else {
					result.push(
						<li key={i}>
							{funcMoulde[i]}
						</li>
					);
				}
			}
			for (t = i, len = i + defaultModule.length; t < len; t++) {
				result.push(
					<a key={t} href={moduleToURL[defaultModule[t - i]].url} target={moduleToURL[defaultModule[t - i]].openType}>
						<li >
							{defaultModule[t - i]}
						</li>
					</a>
				)
			}
			result.push(<hr key={t}></hr>);
		} else {
			for (t = 0, len = defaultModule.length; t < len; t++) {
				result.push(
					<a key={t} href={moduleToURL[defaultModule[t]].url} target={moduleToURL[defaultModule[t]].openType}>
						<li >
							{defaultModule[t]}
						</li>
					</a>
				)
			}
			result.push(<hr key={t}></hr>);
		}
		return result.reverse();
	}
	_show() {
		this.setState((prevState, props) => ({
			userListShow: !prevState.userListShow
		}))
	}
	_noShow(text) {
		var that = this;
		return function () {
			that.props.callback(text);
		}
	}
	_isLogin() {
		if (this.state.isLogin) {
			var result = (
				<div className="userInf">
					{this.props.loginExtInf &&
						<span className="loginExtInf">{this.props.loginExtInf}</span>
					}
					<ul className="userName" onClick={this._show}>
						<li id="userName">
							{
								this.props.loginText +
								this.props.userName +
								'!'
							}
						</li>
						<li id="userDrop"></li>
					</ul>
					<ul className="userList" id={!this.state.userListShow ? 'show' : ''}>
						{this.props.userList.map((text, i) => (
							<li key={i} className="func" onClick={this._noShow(text)}>
								<a>{text}</a>
							</li>
						))}
					</ul>
				</div>
			);
		}
		else {
			var result = (
				<div>
					<div className="login" onClick={this._onClick('专家登录')}>
						专家登录
					</div>
					<div className="login" onClick={this._onClick('登录')}>
						登录
					</div>
					<div className="inLoginText">
						{this.props.inLoginText}
					</div>

				</div>
			)
		}
		return result;
	}

	render() {
		return (
			<div id={this.props.id} className={"BluMUI_UserLoginState " + this.props.extClass}>
				{this._isShowVisit()}
				<div>
					<div className="userOther">
					</div>
					{this._isLogin()}
				</div>
				<ul>
					{this._createFunc()}
				</ul>
				<a className="clearFloat"></a>
			</div>
		)
	}
}
//复选框，查找内容的部分，可用
class BluMUI_SimpleDrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedValue: '',
			selected: this.props.initalSelected,
			open: false
		}
		this._onClick = this._onClick.bind(this);
		this._open = this._open.bind(this);
	}
	_open() {
		this.setState(
			(prevState, props) => (
				{
					open: !prevState.open
				}));
	}

	_createIitem() {
		var result = [], i, len;//声明了三个局部变量
		for (i = 0, len = this.props.items.length; i < len; i++) {
			result.push(
				<li key={i}
					onClick={this._onClick(this.props.items[i])}//点击之后调用_onclick方法
				>
					{this.props.items[i]}
				</li>
			)
		}
		return result;
	}
	_onClick(value) {
		var that = this;
		return function () {
			that.setState(
				//setState() 可以接收一个函数，这个函数接受两个参数，第一个参数表示上一个状态值，第二参数表示当前的 props
				(prevState, props) => (
					{
						open: !prevState.open,
						selected: value,
						selectedValue: value
					}
				));
			if (that.props.callback)
				that.props.callback(value);
		}
	}
	render() {
		return (
			<div className={"BluMUI_SimpleDrop " + this.props.extClass}
				id={this.props.id}
			>
				<span className="selected"
					data-value={this.state.selected}
					onClick={this._open}>
					{this.state.selected}
				</span>
				<ul className={this.state.open ? "selectArea" : "noSelectArea"}
				>
					{this._createIitem()}
				</ul>
				<input type="hidden"
					value={this.state.selectedValue}
					id={this.props.name}
				/>
			</div>
		)
	}
}
//整个头部的div，可用
class BluMUI_Sch extends React.Component {
	constructor(props) {
		super(props);//为了得到父类的对象，否则this就不能用
		this.state = {
			value: ''
		};
		//下面的两个都是方法，bind只是为了让后面的方法本身能够执行
		//bind方法是为了保证能够多次使用
		this.handlerChange = this.handlerChange.bind(this);
		this.handlerSearch = this.handlerSearch.bind(this);
	}

	handlerChange(e) {
		this.setState({ value: e.target.value })//这里是改写父类传过来的value值

	}

	handlerSearch() {
		this.props.search(this.state.value);
	}

	render() {//这里是DOM操作
		var props = this.props,//保证this指向的准确性
			id = props.id,
			extClass = props.extClass,
			types = props.types,
			type = props.type,
			btn = props.btn;
		return (
			<div id={id} className={"BluMUI_Sch " + extClass}>
				<BluMUI_SimpleDrop name="selectArea"
					extClass=""
					initalSelected={type}
					items={types}
				></BluMUI_SimpleDrop>
				<div className="searchArea">
					<input value={this.state.value} onChange={this.handlerChange}></input>
					<button onClick={this.handlerSearch}>{btn}</button>
				</div>
			</div>)
	}
}
//————————————————————————————————————————————————————————————————————————————————————————
//这里需要修改，不能递归，下面所有组件都要根据用户点击的不同而改变，总共有三级菜单
//专业，总共2个，一个是下拉框盒一个是DropList
class BluMUI_DropList_box extends React.Component {
	constructor(props) {
		super(props);
		this.handlerClick = this.handlerClick.bind(this);
		this.selectedDom = [];
		var length = this.props.items.length,
			selects = [],
			selectedClass = [],
			leftLogo = [],
			rightLogo = [],
			items = this.props.items;
		for (var i = 0; i < length; i++) {
			selects.push(items[i].selected);
			leftLogo.push(
				[
					{ backgroundImage: 'url(' + items[i].ileftLogo + ')' },
					{ backgroundImage: 'url(' + items[i].nleftLogo + ')' }
				]
			);
			// rightLogo.push(
			// 	[
			// 		{backgroundImage:'url('+items[i].irightLogo+')'},
			// 		{backgroundImage:'url('+items[i].nrightLogo+')'}
			// 	]
			// );
			selectedClass.push(['', items[i].selectedClass])
		}
		this.state = {
			style: [{ display: 'none' }, {}],
			//rightLogo:rightLogo,
			leftLogo: leftLogo,
			selectedClass: selectedClass,
			selects: selects
		};
	}
	handlerClick(index, selectClass, noselectClass) {
		var that = this;
		return function () {
			var result = that.state.selects,
				i,
				len;
			for (i = 0, len = that.state.selects.length; i < len; i++) {
				if (that.state.selects[index] == 0) {
					if (index == i) {
						result.splice(index, 1, 1);
					} else {
						result.splice(i, 1, 0);
					}
				}
				else {
					if (index == i) {
						result.splice(index, 1, 0);
					} else {
						result.splice(i, 1, 0);
					}
				}
			}
			if (that.props.items[index].items.length == 0) {
				that.props.selected(that.selectedDom[index], selectClass, noselectClass);
				that.props.callBack(that.props.items[index].name, that.props.items[index].value, that.props.items[index].belong);
			}
			that.setState({
				selects: result
			})
		}

	}
	onMouseOver(index, selectClass, noselectClass) {
		var that = this;
		return function () {
			var result = that.state.selects,
				i,
				len;
			for (i = 0, len = that.state.selects.length; i < len; i++) {
				if (that.state.selects[index] == 0) {
					if (index == i) {
						result.splice(index, 1, 1);
					} else {
						result.splice(i, 1, 0);
					}
				}
				else {
					if (index == i) {
						result.splice(index, 1, 0);
					} else {
						result.splice(i, 1, 0);
					}
				}
			}
			if (that.props.items[index].items.length == 0) {
				that.props.selected(that.selectedDom[index], selectClass, noselectClass);
				that.props.callBack(that.props.items[index].name, that.props.items[index].value, that.props.items[index].belong);
			}
			that.setState({
				selects: result
			})
		}

	}
	render() {
		var items = this.props.items,
			callBack = this.props.callBack,
			curClass = this.props.curClass;
		var result = this.props.items.map(//map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
			(value, index) =>
				<ul key={index}
					className={this.props.curClass + '-' + index}>
					<li>
						<div onClick={this.handlerClick(index, this.state.selectedClass[index][1], "item_warp " + items[index].nameStyle)}
							//onMouseOver={this.onMouseOver(index, this.state.selectedClass[index][1], "item_warp " + items[index].nameStyle)}
							data-key={index}
							ref={(selectedDom) => (this.selectedDom[index] = selectedDom)}
							className={
								"item_warp " +
								//  这里就是firstIitem和item-2
								items[index].nameStyle +
								' ' +
								//   "item-"+[index+1]+' '+
								//这是item-1-selected，就是选择成功的地方，比如鼠标悬停或者点击的地方
								this.state.selectedClass[index][this.state.selects[index]]
							}>

							<span data-key={index}
								className="leftLogo"
								style={this.state.leftLogo[index][this.state.selects[index]]}
							>
								{/* 如果url为undefined，就把style的display：none */}

							</span>
							<span data-key={index}
								className="name">
								{items[index].name}
							</span>



							{/* <span data-key={index}
									className="rightLogo"
									style={this.state.rightLogo[index][this.state.selects[index]]}>
								</span> */}



						</div>
						{items[index].items.length > 0 &&
							<BluMUI_DropList_box
								selected={this.props.selected}
								callBack={callBack}
								curClass={curClass + '-' + index}
								curstyle={this.state.style[this.state.selects[index]]}
								/*这里等同于
								var indexOfSelects=this.state.selects[index];
								var curstyle=this.state.style[indexOfSelects]
								*/
								items={items[index].items}
							/>}
					</li>
				</ul>);
		return (

			<div style={this.props.curstyle} className="warp"> {result}</div>//不知道是不是这里改display的问题

		);
	}
}
class BluMUI_DropList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectDom: {
				ref: null,
				noSelectClass: '',
			}
		}
		this._selectDom = this._selectDom.bind(this);
	}
	_selectDom(selectDom, selectClass, noselectClass) {
		if (this.state.selectDom.ref != null) {
			this.state.selectDom.ref.className = this.state.selectDom.noSelectClass;
			this.state.selectDom.ref = selectDom;
			this.state.selectDom.noSelectClass = noselectClass;
			this.state.selectDom.ref.className = noselectClass + ' ' + selectClass;
		}
		else {
			this.state.selectDom.ref = selectDom;
			this.state.selectDom.noSelectClass = noselectClass;
			this.state.selectDom.ref.className = noselectClass + ' ' + selectClass;
		}

	}

	render() {
		return (
			<div className={"BluMUI_DropList " + this.props.extClass} >

				<BluMUI_DropList_box callBack={this.props.callBack}
					curClass="BluMUI_DropList"
					items={this.props.items}
					selected={this._selectDom}
					curstyle={{}} />

			</div>
		);
	}
}
//课程列表选择的div，有专业培养方案、专业课程拓扑图两个，这里差一个toppic的组件，就是拓扑图的图片
//这里不起作用
class BluMUI_NavList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.props.items,
			index: this.props.index
		}
		this._onClick = this._onClick.bind(this);
	}
	_onClick(index) {
		var that = this;
		return function () {
			that.setState(
				{
					index: index
				}
			)
			that.props.callback(that.state.items[index]);
		}
	}
	_createLi() {
		var result = [],
			i,
			len;
		for (i = 0, len = this.state.items.length; i < len; i++) {
			result.push(
				<li key={i}
					className={this.state.index == i ? 'selected' : ''}/*这里是点击事件，是否选中*/
					onClick={this._onClick(i)}/*点击之后触发事件*/
					data-key={i}>
					<a>{this.state.items[i].name}</a>
				</li>
			);
		}
		return result;
	}
	render() {
		return (
			<ul id={this.props.id} className={"BluMUI_NavList " + this.props.extClass}>
				{this._createLi()}
			</ul>
		)
	}
}
//课程列表的内容div,内容不能显示,主要就是这个问题
class BluMUI_ClassInfBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.props.items
		}
	}

	_createBox() {
		var i, len, result = [], items = this.state.items;
		for (i = 0, len = items.length; i < len; i++) {
			result.push(<div className="item" key={i}>
				<div className="content_warp">
					<img></img>
					<div className="body">
						<span className="title">
							{items[i].title}
						</span>
						<div>
							<p className="content">
								{'课程简介:' + items[i].desc}
							</p>
							<p className="data">
								<span>{'学分:' + items[i].score}</span>
								<span>{'学时:' + items[i].stuTime}</span>
								<span>{'(理论' + items[i].theory + '+实验' + items[i].exp + ')'}</span>
							</p>
							<p className="major">{'适用院系/专业:' + items[i].major}</p>
						</div>
					</div>
				</div>
				<div className="review_warp">
					<span className="reviewName">
						教学团队评价
								</span>
					<BlueMUI_Review id={'review' + i}
						extClass="review"
						name=""
						num={items[i].num}
						starNum={items[i].starNum}
						enable={false}
					>
					</BlueMUI_Review>
					<span className="reviewName1">
						(课程评价)
								</span>
				</div>
			</div>);
		}
		return result;
	}

	render() {
		return (
			<div className="BluMUI_ClassInfBox">
				{this._createBox()}
			</div>
		)
	}
}
//翻页组件
class BluMUI_PT_LI extends React.Component {
	constructor(props) {
		super(props);
		this.handlerChange = this.handlerChange.bind(this);
	}
	handlerChange(e) {
		this.props.change(parseInt(e.target.getAttribute('data-index')));
	}
	render() {
		var items = [],
			start = 1,
			{ index, showNum, sum } = this.props;
		if (index > Math.floor(showNum) / 2 && index < sum - Math.floor(showNum / 2 - 1)) {
			start = index - Math.floor(showNum / 2);
		}
		if (index <= Math.floor(showNum / 2)) {
			start = 1;
		}
		if (index >= sum - Math.floor(showNum / 2)) {
			start = sum - showNum + 1;
		}
		for (var i = start; i <= showNum + start - 1; i++) {
			items.push(
				<li onClick={this.handlerChange}
					data-index={i}
					className={i == index ? "cur" : ""}>
					{i}
				</li>);
		}
		return (
			<ul id="warp">
				{items}
			</ul>
		);
	}
}
class BluMUI_PT extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: this.props.index,
			start: this.props.start,
			total: this.props.total,
			inputValue: ''
		};
		this.handlerNext = this.handlerNext.bind(this);
		this.handlerLast = this.handlerLast.bind(this);
		this.handlerTop = this.handlerTop.bind(this);
		this.handlerBottom = this.handlerBottom.bind(this);
		this.handlerChange = this.handlerChange.bind(this);
	}
	handlerNext(e) {
		this.handlerChange(this.state.index + 1);
	}
	handlerLast(e) {
		this.handlerChange(this.state.index - 1);
	}
	handlerTop(e) {
		this.handlerChange(1);
	}
	handlerBottom(e) {
		this.handlerChange(this.props.sum);
	}
	handlerChange(value) {
		var start = 1;
		if (value > Math.floor(this.state.showNum) / 2 && value < this.props.sum - Math.floor(this.state.showNum / 2 - 1)) {
			start = value - Math.floor(this.state.showNum / 2);
		}
		if (value <= Math.floor(this.state.showNum / 2)) {
			start = 1;
		}
		if (value >= this.props.sum - Math.floor(this.state.showNum / 2)) {
			start = this.props.sum - this.state.showNum + 1;
		}
		this.setState({
			index: value,
			start: start
		});
		this.props.change(value);
	}
	_input(e) {
		var value = e.target.value,
			num = parseInt(value) || '';
		if (num < 1 && num !== '')
			num = 1;
		if (num > this.props.sum)
			num = this.props.sum;
		this.setState({
			inputValue: num
		});
	}
	_keyPress(e) {
		var keyCode = e.charCode,
			index = this.state.inputValue;
		if (keyCode == 13) {
			if (index !== '') {
				this.handlerChange(index);
			}
		}
	}
	render() {
		var showNum = this.state.sum;
		if (showNum > this.props.length) {
			showNum = this.props.length;
		}
		return (
			<div className="BluMUI_PT" >

				<span className="allNum">{'共' + this.state.total + '条记录'}</span>
				{
					this.state.sum > 1 &&
					<button id="topPage" className="toTop" onClick={this.handlerTop}>
						{this.props.topName}
					</button>
				}
				{this.state.sum > 1 && this.state.index != 1 && <button id='lastPage' onClick={this.handlerLast} className="last">{this.props.lastName}</button>}
				{this.state.sum > 1 &&
					<BluMUI_PT_LI change={this.handlerChange} showNum={showNum} index={this.state.index} />
				}
				{this.state.sum > 1 &&
					<div className="inputWarp">
						<input type="text"
							value={this.state.inputValue}
							onInput={this._input.bind(this)}
							onKeyPress={this._keyPress.bind(this)}
						/>
						<span className="sum">{'\\' + this.state.sum}</span>
					</div>
				}
				{this.state.sum > 1 && this.state.index !== this.props.sum && <button id="nextPage" onClick={this.handlerNext} className="next">{this.props.nextName}</button>}
				{this.state.sum > 1 &&
					<button id="bottomPage" onClick={this.handlerBottom} className="toBottom">{this.props.bottomName}</button>
				}
			</div>
		);
	}
}
var BluMUI_M = {
	DropList: BluMUI_DropList,
	UserLoginState: BluMUI_UserLoginState,
	NavList: BluMUI_NavList,
	ClassInfBox: BluMUI_ClassInfBox,
	PT: BluMUI_PT,
	Sch: BluMUI_Sch,
};
var BluMUI = {
	result: {},
	create: function (data, type, elem, callback) {
		var props = data,
			Blu = BluMUI_M[type];
		this.result[props.id] = ReactDOM.render(
			<Blu {...props} />,
			elem
		);
		if (callback)
			callback();
	}
};
export default BluMUI;