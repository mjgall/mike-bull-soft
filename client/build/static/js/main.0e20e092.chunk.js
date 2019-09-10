(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{312:function(e,t,a){e.exports=a(593)},592:function(e,t,a){},593:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"fetchUser",function(){return D}),a.d(n,"fetchCourses",function(){return x}),a.d(n,"fetchAllCourses",function(){return T}),a.d(n,"fetchSymbols",function(){return L}),a.d(n,"textToSpeech",function(){return M}),a.d(n,"addCourse",function(){return A}),a.d(n,"getCourse",function(){return R}),a.d(n,"clearCourse",function(){return I}),a.d(n,"addSymbol",function(){return H}),a.d(n,"getSymbol",function(){return B}),a.d(n,"clearSymbol",function(){return N}),a.d(n,"switchMode",function(){return U}),a.d(n,"addSymbolImage",function(){return F}),a.d(n,"clearSymbolImages",function(){return q});var r=a(0),l=a.n(r),c=a(48),o=a.n(c),u=a(49),s=a(283),i=a(11),p=a(86),m=a(26),d=a(27),h={coursesTable:[],coursesTableStudent:[],course:{},symbolsTable:[],symbol:{},symbolImages:[],creatorMode:!1},f=Object(u.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_USER":return t.payload||!1;default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_COURSES":return Object(m.a)({},e,{coursesTable:t.payload})||!1;case"FETCH_ALL_COURSES":return Object(m.a)({},e,{coursesTableStudent:t.payload})||!1;case"ADD_COURSE":return Object(m.a)({},e,{coursesTable:[].concat(Object(p.a)(e.coursesTable),[t.payload])})||!1;case"GET_COURSE":case"CLEAR_COURSE":return Object(m.a)({},e,{course:t.payload})||!1;case"FETCH_SYMBOLS":return Object(m.a)({},e,{symbolsTable:t.payload})||!1;case"ADD_SYMBOL":return Object(m.a)({},e,{symbolsTable:[].concat(Object(p.a)(e.symbolsTable),[t.payload])})||!1;case"GET_SYMBOL":return Object(m.a)({},e,{symbol:t.payload})||!1;case"CLEAR_SYMBOL":return Object(m.a)({},e,{symbolsTable:[],symbol:{}})||!1;case"TOGGLE_MODE":return Object(m.a)({},e,{creatorMode:!e.creatorMode})||!1;case"ADD_SYMBOL_IMAGE":return Object(m.a)({},e,{symbolImages:[].concat(Object(p.a)(e.symbolImages),[t.payload])});case"CLEAR_SYMBOL_IMAGES":return Object(m.a)({},e,{symbolImages:[]});default:return e}},forms:Object(d.combineForms)({course:{language:"english",difficulty:"novice"},symbol:{}},"forms")}),E=a(16),b=a(17),y=a(19),v=a(18),g=a(20),O=a(604),C=a(598),w=a(15),j=a.n(w),S=a(28),k=a(55),_=a.n(k),D=function(){return function(){var e=Object(S.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/current_user");case 2:return a=e.sent,t({type:"FETCH_USER",payload:a.data}),e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},x=function(){return function(){var e=Object(S.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/courses");case 2:return a=e.sent,t({type:"FETCH_COURSES",payload:a.data}),e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},T=function(){return function(){var e=Object(S.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/allcourses");case 2:return a=e.sent,t({type:"FETCH_ALL_COURSES",payload:a.data}),e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},L=function(e){return function(){var t=Object(S.a)(j.a.mark(function t(a){var n;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.get("/api/symbols/".concat(e));case 2:return n=t.sent,a({type:"FETCH_SYMBOLS",payload:n.data}),t.abrupt("return",n.data);case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},M=function(){return function(){var e=Object(S.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.post("/api/texttospeech",{text:"".concat(new Date(Date.now()).toString())});case 2:return a=e.sent,t({type:"TEXT_TO_SPEECH",payload:a.data}),e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},A=function(e){return function(){var t=Object(S.a)(j.a.mark(function t(a){var n;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.post("/api/courses",{title:e.title,language:e.language,description:e.description,difficulty:e.difficulty,owner_id:e.owner_id});case 2:return n=t.sent,a({type:"ADD_COURSE",payload:n.data}),t.abrupt("return",n.data);case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},R=function(e){return function(){var t=Object(S.a)(j.a.mark(function t(a){var n;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.post("/api/course",{id:e});case 2:return n=t.sent,a({type:"GET_COURSE",payload:n.data}),t.abrupt("return",n.data);case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},I=function(){return function(){var e=Object(S.a)(j.a.mark(function e(t){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"CLEAR_COURSE",payload:null});case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},H=function(e){return function(){var t=Object(S.a)(j.a.mark(function t(a){var n;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.post("/api/symbols",{owner_id:e.owner_id,course_id:e.course_id,text:e.text,audio_url:e.audio_url,language:e.language,images:e.images});case 2:return n=t.sent,a({type:"ADD_SYMBOL",payload:n.data}),t.abrupt("return",n.data);case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},B=function(e){return function(){var t=Object(S.a)(j.a.mark(function t(a){var n;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.get("/api/symbol/".concat(e));case 2:return n=t.sent,a({type:"GET_SYMBOL",payload:n.data}),t.abrupt("return",n.data);case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},N=function(){return function(){var e=Object(S.a)(j.a.mark(function e(t){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"CLEAR_SYMBOL",payload:null});case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},U=function(){return{type:"TOGGLE_MODE",payload:null}},F=function(e){return{type:"ADD_SYMBOL_IMAGE",payload:e}},q=function(){return{type:"CLEAR_SYMBOL_IMAGES",payload:null}},G=a(34),Y=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).switchMode=function(){a.props.switchMode(),a.props.history.push("/")},a.renderMenu=function(){if(!a.props.auth)return l.a.createElement(l.a.Fragment,null,l.a.createElement(O.a.Item,{header:!0},l.a.createElement(G.a,{to:"/home"},"LLT")),l.a.createElement(O.a.Menu,{position:"right"},l.a.createElement(O.a.Item,null,l.a.createElement("a",{href:"/auth/google"},"Log In"))));switch(a.props.app.creatorMode){case!0:return l.a.createElement(l.a.Fragment,null,l.a.createElement(O.a.Item,{header:!0},l.a.createElement(G.a,{to:"/home"},"LLT")),l.a.createElement(O.a.Menu,{position:"right"},l.a.createElement(O.a.Item,null,l.a.createElement("div",{onClick:a.switchMode,style:{cursor:"pointer"}},"Go to Student Mode")),l.a.createElement(O.a.Item,null,l.a.createElement("a",{href:"/api/logout"},"Log Out"))));default:return l.a.createElement(l.a.Fragment,null,l.a.createElement(O.a.Item,{header:!0},l.a.createElement(G.a,{to:"/home"},"LLT")),l.a.createElement(O.a.Menu,{position:"right"},l.a.createElement(O.a.Item,null,l.a.createElement("div",{onClick:a.switchMode,style:{cursor:"pointer"}},"Go to Creator Mode")),l.a.createElement(O.a.Item,null,l.a.createElement("a",{href:"/api/logout"},"Log Out"))))}},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return l.a.createElement(O.a,{inverted:!0,fixed:"top",style:{boxShadow:"0 6px 6px 2px #ccc"}},l.a.createElement(C.a,null,this.renderMenu()))}}]),t}(l.a.Component),P=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(Y),W=function(e){function t(){return Object(E.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(P,null),l.a.createElement("div",null,l.a.createElement("h1",null,"Log in to continue")))}}]),t}(r.Component),V=a(603),X=a(87),J=function(e){function t(){return Object(E.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return l.a.createElement(V.a,{style:{width:"100%"}},l.a.createElement(V.a.Content,null,l.a.createElement(V.a.Header,null,this.props.auth?"".concat(this.props.auth.first_name," ").concat(this.props.auth.last_name):null)),l.a.createElement(V.a.Content,{extra:!0},l.a.createElement(X.a,{name:"book"}),this.props.app?this.props.app.coursesTable.length:null," Courses"))}}]),t}(l.a.Component),z=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(J),K=a(602),Q=a(599),Z=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).renderStudentTable=function(){return l.a.createElement(K.a,{celled:!0,singleLine:!0,sortable:!0},l.a.createElement(K.a.Header,null,l.a.createElement(K.a.Row,null,l.a.createElement(K.a.HeaderCell,null,"Course"),l.a.createElement(K.a.HeaderCell,null,"Owner"),l.a.createElement(K.a.HeaderCell,null,"Create Date"))),l.a.createElement(K.a.Body,null,a.props.app&&a.props.app.coursesTableStudent?a.props.app.coursesTableStudent.map(function(e,t){return l.a.createElement(K.a.Row,{key:t},l.a.createElement(K.a.Cell,null,l.a.createElement(G.a,{to:"/course/".concat(e.id)},e.title)),l.a.createElement(K.a.Cell,null,e.first_name," ",e.last_name),l.a.createElement(K.a.Cell,null,new Date(1e3*e.create_date).toLocaleString()))}):null))},a.renderCreatorTable=function(){return l.a.createElement(K.a,{celled:!0,singleLine:!0,sortable:!0},l.a.createElement(K.a.Header,null,l.a.createElement(K.a.Row,null,l.a.createElement(K.a.HeaderCell,null,"Course"),l.a.createElement(K.a.HeaderCell,null,"Owner"),l.a.createElement(K.a.HeaderCell,null,"Create Date"))),l.a.createElement(K.a.Body,null,a.props.app&&a.props.app.coursesTable?a.props.app.coursesTable.map(function(e,t){return l.a.createElement(K.a.Row,{key:t},l.a.createElement(K.a.Cell,null,l.a.createElement(G.a,{to:"/course/".concat(e.course_id)},e.title)),l.a.createElement(K.a.Cell,null,e.first_name," ",e.last_name),l.a.createElement(K.a.Cell,null,new Date(1e3*e.create_date).toLocaleString()))}):l.a.createElement(Q.a,{active:!0})))},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentWillMount",value:function(){this.props.fetchCourses(),this.props.fetchAllCourses()}},{key:"render",value:function(){return this.props.app.creatorMode?this.renderCreatorTable():this.renderStudentTable()}}]),t}(l.a.Component),$=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(Z),ee=a(606),te=function(e){function t(){return Object(E.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(ee.a.Column,{width:4},l.a.createElement(z,null)),l.a.createElement(ee.a.Column,{width:12},l.a.createElement("h2",null,"Available Courses"),l.a.createElement($,null)))}}]),t}(l.a.Component),ae=Object(i.connect)(function(e){return{auth:e.auth}},n)(te),ne=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).addCourse=function(e){console.log(e),a.props.addCourse({title:e.title,language:e.language,description:e.description,difficulty:e.difficulty,owner_id:a.props.auth.google_id})},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement(d.Form,{validateOn:"submit",model:"forms.course",onSubmit:function(t){return e.addCourse(t)},className:"ui form"},l.a.createElement("div",{className:"three fields"},l.a.createElement("div",{className:"field"},l.a.createElement(d.Control.text,{model:"forms.course.title",placeholder:"Title",validators:{required:function(e){return e&&e.length}},validateOn:"change"}),l.a.createElement(d.Errors,{className:"error",model:"forms.course.title",show:{touched:!0,focus:!1},messages:{required:"Required"}})),l.a.createElement("div",{className:"field"},l.a.createElement(d.Control.select,{validators:{required:function(e){return e&&e.length}},model:"forms.course.language",className:"ui selection dropdown",placeholder:"Language"},l.a.createElement("option",{value:"english"},"English"),l.a.createElement("option",{value:"spanish"},"Spanish"),l.a.createElement("option",{value:"german"},"German")),l.a.createElement(d.Errors,{className:"error",model:"forms.course.language",show:!1,messages:{required:"Required"}})),l.a.createElement("div",{className:"field"},l.a.createElement(d.Control.select,{validators:{required:function(e){return e&&e.length}},model:"forms.course.difficulty",className:"ui selection dropdown",placeholder:"Difficulty"},l.a.createElement("option",{value:"novice"},"Novice"),l.a.createElement("option",{value:"intermediate"},"Intermediate"),l.a.createElement("option",{value:"advanced"},"Advanced")),l.a.createElement(d.Errors,{className:"error",model:"forms.course.difficulty",show:!1,messages:{required:"Required"}}))),l.a.createElement("div",{className:"field"},l.a.createElement(d.Control.textarea,{validators:{required:function(e){return e&&e.length}},validateOn:"change",model:"forms.course.description",placeholder:"Description"}),l.a.createElement(d.Errors,{className:"error",model:"forms.course.description",show:"touched",messages:{required:"Required"}})))}}]),t}(l.a.Component),re=Object(i.connect)(function(e){return{auth:e.auth,app:e.app,forms:e.forms}},n)(ne),le=a(600),ce=a(605),oe=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1},a.open=function(){a.setState({open:!0})},a.close=function(){a.setState({open:!1})},a.submit=function(){console.log(a.props.forms.course),a.props.addCourse({title:a.props.forms.course.title,language:a.props.forms.course.language,description:a.props.forms.course.description,difficulty:a.props.forms.course.difficulty,owner_id:a.props.auth.google_id}),a.close()},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("click",function(t){t.target.className.indexOf("dimmer")>0&&e.close()})}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(ee.a.Column,{width:4},l.a.createElement(z,null)),l.a.createElement(ee.a.Column,{width:12},l.a.createElement("h2",null,"My Created Courses"),l.a.createElement(le.a,{trigger:l.a.createElement(ce.a,{onClick:this.open,positive:!0},"Add A Course"),open:this.state.open},l.a.createElement(le.a.Header,null,"Add a Course"),l.a.createElement(le.a.Content,null,l.a.createElement(le.a.Description,null,l.a.createElement(re,null))),l.a.createElement(le.a.Actions,null,l.a.createElement(ce.a,{onClick:this.close,negative:!0},"Cancel"),l.a.createElement(ce.a,{onClick:this.submit,positive:!0,labelPosition:"right",icon:"checkmark",content:"Add"}))),l.a.createElement($,null)))}}]),t}(l.a.Component),ue=Object(i.connect)(function(e){return{auth:e.auth,app:e.app,forms:e.forms}},n)(oe),se=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).renderStudentOrCreator=function(){return a.props.app.creatorMode?l.a.createElement(ue,null):l.a.createElement(ae,null)},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return this.renderStudentOrCreator()}}]),t}(l.a.Component),ie=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(se);var pe=function(e){return l.a.createElement(d.Form,Object.assign({},e,{className:"ui form"}))},me=a(601),de=a(298),he=a(299),fe=window.fabric,Ee=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={svg:"",brush:{color:"black",width:10},freeDraw:!1,images:[]},a.addRect=function(){var e=new fe.Rect({left:100,top:100,bottom:100,right:100,fill:"red",width:200,height:200});a.props.canvas.add(e)},a.logSVG=function(){fe.log(a.props.canvas.toSVG()),a.setState({svg:a.props.canvas.toSVG({suppressPreamble:!0})})},a.handleChange=function(){var e=Object(S.a)(j.a.mark(function e(t){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.setState(Object(m.a)({},a.state,{brush:Object(m.a)({},a.state.brush,{color:t.hex})}));case 2:a.updateFreeDraw();case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.freeDraw=Object(S.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.setState(Object(m.a)({},a.state,{brush:Object(m.a)({},a.state.brush),freeDraw:!a.state.freeDraw}));case 2:a.props.canvas.freeDrawingBrush.color=a.state.brush.color,a.props.canvas.freeDrawingBrush.width=parseInt(a.state.brush.width,10)||1,a.props.canvas.isDrawingMode=a.state.freeDraw;case 5:case"end":return e.stop()}},e)})),a.clear=function(){a.props.canvas.clear()},a.removeObject=function(){a.props.canvas.remove(a.props.canvas.getActiveObject())},a.updateFreeDraw=function(){a.props.canvas.freeDrawingBrush.color=a.state.brush.color,a.props.canvas.freeDrawingBrush.width=parseInt(a.state.brush.width,10)||10,a.props.canvas.isDrawingMode=!0},a.addImage=Object(S.a)(j.a.mark(function e(){var t;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.props.canvas.toDataURL({format:"png"}),e.next=3,a.setState({images:[].concat(Object(p.a)(a.state.images),[t])});case 3:return e.next=5,a.props.addSymbolImage(t);case 5:a.clear();case 6:case"end":return e.stop()}},e)})),a.renderImages=function(){return l.a.createElement("div",null,a.props.app.symbolImages.map(function(e,t){return l.a.createElement("img",{width:"30%",src:e,key:t})}))},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement(ee.a,{stackable:!0},l.a.createElement(ee.a.Row,null,l.a.createElement(ee.a.Column,{width:6},l.a.createElement(pe,{model:"forms.symbol",onSubmit:function(t){return e.addSymbol(t)},className:"ui form",validateOn:"submit"},l.a.createElement("div",{className:"fields",style:{width:"110%"}},l.a.createElement("div",{className:"field",style:{width:"100%"}},l.a.createElement(d.Control.text,{model:"forms.symbol.text",placeholder:"Symbol Text",validators:{required:function(e){return e&&e.length}},validateOn:"change"}),l.a.createElement(d.Errors,{className:"error",model:"forms.course.title",show:{touched:!0,focus:!1},messages:{required:"Required"}})))),l.a.createElement("canvas",{id:this.props.id,width:"300",height:"300",style:{border:"1px solid black"}})),l.a.createElement(ee.a.Column,{width:5},l.a.createElement("div",null,l.a.createElement(me.a,{trigger:l.a.createElement(ce.a,{icon:!0,onClick:this.freeDraw},l.a.createElement(X.a,{name:"world"})),content:"Draw",position:"bottom center"}),l.a.createElement(me.a,{trigger:l.a.createElement(ce.a,{icon:!0,onClick:this.clear},l.a.createElement(X.a,{name:"remove"})),content:"Clear",position:"bottom center"}),l.a.createElement(me.a,{trigger:l.a.createElement(ce.a,{icon:!0,onClick:this.removeObject},l.a.createElement(X.a,{name:"minus square"})),content:"Remove Object",position:"bottom center"}),l.a.createElement(me.a,{trigger:l.a.createElement(ce.a,{icon:!0,onClick:this.addImage},l.a.createElement(X.a,{name:"plus square"})),content:"Add to Symbol",position:"bottom center"})),l.a.createElement(he.SketchPicker,{width:"92%",color:this.state.brush.color,className:"colorpicker",onChangeComplete:this.handleChange}),l.a.createElement(de.Slider,{value:this.state.brush.width,color:"4A4A4A",settings:{min:0,max:100,step:1,onChange:function(t){e.setState({brush:Object(m.a)({},e.state.brush,{width:t})}),e.updateFreeDraw()}}})),l.a.createElement(ee.a.Column,{width:5},l.a.createElement("div",null,this.renderImages()))))}}]),t}(l.a.Component),be=Object(i.connect)(function(e){return{auth:e.auth,app:e.app,forms:e.forms}},n)(Ee),ye=window.fabric,ve=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).addSymbol=function(e){a.props.addSymbol({owner_id:a.props.auth.id,course_id:a.props.app.course.course_id,text:e.text,language:a.props.app.course.language})},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.canvas=new ye.Canvas("canvas")}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(be,{id:"canvas",canvas:this.canvas}))}}]),t}(l.a.Component),ge=Object(i.connect)(function(e){return{auth:e.auth,app:e.app,forms:e.forms}},n)(ve),Oe=function(e){function t(){return Object(E.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentWillUnmount",value:function(){this.props.clearSymbol()}},{key:"renderStudentTable",value:function(){return l.a.createElement(K.a,{celled:!0,singleLine:!0,sortable:!0},l.a.createElement(K.a.Header,null,l.a.createElement(K.a.Row,null,l.a.createElement(K.a.HeaderCell,null,"ID"),l.a.createElement(K.a.HeaderCell,null,"Text"),l.a.createElement(K.a.HeaderCell,null,"Audio URL"),l.a.createElement(K.a.HeaderCell,null,"Create Date"))),l.a.createElement(K.a.Body,null,this.props.app&&this.props.app.symbolsTable?this.props.app.symbolsTable.map(function(e,t){return l.a.createElement(K.a.Row,{key:t},l.a.createElement(K.a.Cell,null,l.a.createElement(G.a,{to:"/symbol/".concat(e.id)},e.id)),l.a.createElement(K.a.Cell,null,e.text),l.a.createElement(K.a.Cell,null,l.a.createElement("audio",{src:e.audio_url,type:"audio/mpeg",controls:!0})),l.a.createElement(K.a.Cell,null,new Date(1e3*e.create_date).toLocaleString()))}):l.a.createElement(Q.a,{active:!0})))}},{key:"renderCreatorTable",value:function(){return l.a.createElement(K.a,{celled:!0,singleLine:!0,sortable:!0},l.a.createElement(K.a.Header,null,l.a.createElement(K.a.Row,null,l.a.createElement(K.a.HeaderCell,null,"ID"),l.a.createElement(K.a.HeaderCell,null,"Text"),l.a.createElement(K.a.HeaderCell,null,"Audio URL"),l.a.createElement(K.a.HeaderCell,null,"Create Date"))),l.a.createElement(K.a.Body,null,this.props.app&&this.props.app.symbolsTable?this.props.app.symbolsTable.map(function(e,t){return l.a.createElement(K.a.Row,{key:t},l.a.createElement(K.a.Cell,null,l.a.createElement(G.a,{to:"/symbol/".concat(e.id)},e.id)),l.a.createElement(K.a.Cell,null,e.text),l.a.createElement(K.a.Cell,null,l.a.createElement("audio",{src:e.audio_url,type:"audio/mpeg",controls:!0})),l.a.createElement(K.a.Cell,null,new Date(1e3*e.create_date).toLocaleString()))}):l.a.createElement(Q.a,{active:!0})))}},{key:"render",value:function(){return this.props.app.creatorMode?this.renderCreatorTable():this.renderStudentTable()}}]),t}(l.a.Component),Ce=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(Oe),we=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={modalOpen:!1},a.renderDetails=function(){return a.props.app.course?l.a.createElement("div",null,l.a.createElement("ul",null,l.a.createElement("li",null,"Title: ",a.props.app.course.title),l.a.createElement("li",null,"Owner: ",a.props.app.course.first_name," ",a.props.app.course.last_name),l.a.createElement("li",null,"ID: ",a.props.app.course.course_id),l.a.createElement("li",null,"Create Date:"," ",new Date(1e3*a.props.app.course.create_date).toLocaleString())),l.a.createElement("p",null,a.props.app.course.description)):l.a.createElement("div",null,l.a.createElement("ul",null,l.a.createElement("li",null,"Title:"),l.a.createElement("li",null,"Owner:"),l.a.createElement("li",null,"ID:"),l.a.createElement("li",null,"Create Date:")),l.a.createElement("p",null))},a.clearSymbolImages=function(){a.props.clearSymbolImages()},a.close=function(){a.setState({modalOpen:!1}),a.props.clearSymbolImages()},a.open=function(){a.setState({modalOpen:!0})},a.saveImages=function(e){e.forEach(function(e){var t={owner_id:a.props.auth.id,data:e};a.props.saveSymbolImage(t)})},a.submit=function(){var e=a.props.form.text;a.props.addSymbol({owner_id:a.props.auth.id,course_id:a.props.app.course.course_id,text:e,language:a.props.app.course.language,images:a.props.app.symbolImages}),a.close()},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=Object(S.a)(j.a.mark(function e(){var t=this;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.getCourse(this.props.match.params.course);case 2:return e.next=4,this.props.fetchSymbols(this.props.app.course.course_id);case 4:document.addEventListener("click",function(e){e.target.className.indexOf("dimmer")>0&&t.close()});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.props.clearCourse(),this.props.clearSymbol()}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(ee.a.Column,{width:16},l.a.createElement("h4",null,l.a.createElement(G.a,{to:"/home"},"Back to courses")),this.renderDetails(),l.a.createElement("h2",null,"Symbols"),this.props.app.creatorMode?l.a.createElement(le.a,{trigger:l.a.createElement(ce.a,{onClick:this.open,positive:!0},"Add A Symbol"),onClose:this.props.clearSymbolImages,open:this.state.modalOpen},l.a.createElement(le.a.Header,null,"Add a Symbol"),l.a.createElement(le.a.Content,null,l.a.createElement(le.a.Description,null,(this.props.app.creatorMode,l.a.createElement(ge,null)))),l.a.createElement(le.a.Actions,null,l.a.createElement(ce.a,{onClick:this.close,negative:!0},"Cancel"),l.a.createElement(ce.a,{onClick:this.submit,positive:!0,labelPosition:"right",icon:"checkmark",content:"Add"}))):null,l.a.createElement(Ce,null)))}}]),t}(l.a.Component),je=Object(i.connect)(function(e){return{auth:e.auth,app:e.app,form:e.forms.symbol}},n)(we),Se=function(e){function t(){return Object(E.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentWillUnmount",value:function(){this.props.clearSymbol()}},{key:"renderStudentTable",value:function(){return l.a.createElement(K.a,{celled:!0,singleLine:!0,sortable:!0},l.a.createElement(K.a.Header,null,l.a.createElement(K.a.Row,null,l.a.createElement(K.a.HeaderCell,null,"ID"),l.a.createElement(K.a.HeaderCell,null,"Audio URL"),l.a.createElement(K.a.HeaderCell,null,"Create Date"))),l.a.createElement(K.a.Body,null,this.props.app&&this.props.app.symbol.images?this.props.app.symbol.images.map(function(e,t){return l.a.createElement(K.a.Row,{key:t},l.a.createElement(K.a.Cell,null,l.a.createElement(G.a,{to:"/image/".concat(e.id)},e.id)),l.a.createElement(K.a.Cell,null,l.a.createElement("img",{style:{width:"20%"},src:e.url})),l.a.createElement(K.a.Cell,null,new Date(1e3*e.create_date).toLocaleString()))}):null))}},{key:"renderCreatorTable",value:function(){return l.a.createElement(K.a,{celled:!0,singleLine:!0,sortable:!0},l.a.createElement(K.a.Header,null,l.a.createElement(K.a.Row,null,l.a.createElement(K.a.HeaderCell,null,"ID"),l.a.createElement(K.a.HeaderCell,null,"Image"),l.a.createElement(K.a.HeaderCell,null,"Create Date"))),l.a.createElement(K.a.Body,null,this.props.app&&this.props.app.symbol.images?this.props.app.symbol.images.map(function(e,t){return l.a.createElement(K.a.Row,{key:t},l.a.createElement(K.a.Cell,null,l.a.createElement(G.a,{to:"/symbol/".concat(e.id)},e.id)),l.a.createElement(K.a.Cell,null,l.a.createElement("img",{style:{width:"20%"},src:e.url})),l.a.createElement(K.a.Cell,null,new Date(1e3*e.create_date).toLocaleString()))}):null))}},{key:"render",value:function(){return l.a.createElement("div",null,this.props.app.symbol.images?this.props.app.symbol.images.map(function(e,t){return l.a.createElement("img",{key:t,src:e.url,style:{width:"20%",height:"20%"}})}):null)}}]),t}(l.a.Component),ke=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(Se),_e=function(e){function t(){return Object(E.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.props.getSymbol(this.props.match.params.symbol)}},{key:"componentWillUnmount",value:function(){this.props.clearSymbol()}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(ee.a.Column,{width:6,style:{overflow:"initial"}},l.a.createElement(z,null)),l.a.createElement(ee.a.Column,{width:10},l.a.createElement("ul",null,l.a.createElement("li",null,"ID:"," ",this.props.app.symbol?this.props.app.symbol.symbol_id:null),l.a.createElement("li",null,"Title:"," ",this.props.app.symbol?this.props.app.symbol.title:null),l.a.createElement("li",null,"Create Date:"," ",this.props.app.symbol?new Date(1e3*this.props.app.symbol.create_date).toLocaleString():null)),l.a.createElement(ke,null)))}}]),t}(l.a.Component),De=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(_e),xe=a(63),Te=(0,a(41).createBrowserHistory)(),Le=(a(592),window.fabric),Me=function(e){function t(){return Object(E.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.canvas=new Le.Canvas("canvas")}},{key:"render",value:function(){return l.a.createElement(be,{id:"canvas",canvas:this.canvas})}}]),t}(l.a.Component),Ae=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).protectRoutes=function(){if(!a.props.auth)return l.a.createElement(xe.c,null,l.a.createElement(xe.a,{component:Me,path:"/drawing",exact:!0}),l.a.createElement(xe.a,{component:W,path:"/*",exact:!0}));switch(a.props.app.creatorMode){case!0:case!1:return l.a.createElement(xe.c,null,l.a.createElement(xe.a,{component:ie,path:"/",exact:!0}),l.a.createElement(xe.a,{component:ie,path:"/home",exact:!0}),l.a.createElement(xe.a,{component:je,path:"/course/:course",exact:!0}),l.a.createElement(xe.a,{component:De,path:"/symbol/:symbol",exact:!0}),l.a.createElement(xe.a,{component:Me,path:"/drawing",exact:!0}))}},a}return Object(g.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.props.fetchUser(),this.props.fetchCourses(),this.props.fetchAllCourses()}},{key:"render",value:function(){return l.a.createElement(xe.b,{history:Te},l.a.createElement(P,{history:Te}),l.a.createElement(C.a,null,l.a.createElement(ee.a,{container:!0,columns:16,style:{paddingTop:"75px"},stackable:!0},this.protectRoutes())))}}]),t}(l.a.Component),Re=Object(i.connect)(function(e){return{auth:e.auth,app:e.app}},n)(Ae),Ie=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.compose,He=Object(u.createStore)(f,Ie(Object(u.applyMiddleware)(s.a)));o.a.render(l.a.createElement(i.Provider,{store:He},l.a.createElement(Re,null)),document.querySelector("#root"))}},[[312,1,2]]]);
//# sourceMappingURL=main.0e20e092.chunk.js.map