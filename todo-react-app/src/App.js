// import React from 'react';
// import './App.css';
// import Todo from './Todo';
// import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
// import AddTodo from './AddTodo';
// import {call, signout} from './service/ApiService';


// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       items: [],
//       loading:true,
//     };
//   }

//   add=(item)=>{
//     call("/todo","POST",item).then((response)=>
//       this.setState({items:response.data})
//       );
//   }

//   delete=(item)=>{
//     call("/todo","DELETE",item).then((response)=>
//       this.setState({items:response.data})
//       );
//   }

//   update=(item)=>{
//     call("/todo","PUT",item).then((response)=>
//       this.setState({items:response.data})
//       );
//   }

//   componentDidMount(){
//     call("/todo","GET",null).then((response)=>
//       this.setState({items:response.data, loading:false})
//       );
//   }

//   render(){
//     // items 배열의 길이를 로그로 남깁니다.
//     console.log(this.state.items.length);
//     var todoItems=this.state.items.length>0 &&(
//       <Paper style={{margin:16}}>
//         <List>
//           {this.state.items.map((item,idx)=>(
//             <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>
//           ))}
//         </List>
//       </Paper>
//     );

//     //navigationBar
//     var navigationBar=(
//       <AppBar position='static'>
//         <Toolbar>
//           <Grid justifyContent="space-between" container>
//             <Grid item>
//               <Typography variant='h6'>오늘의 할 일</Typography>
//             </Grid>
//             <Grid item>
//               <Button color='inherit' onClick={signout}>logout</Button>
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//     );

//     //loding중이 아닐 때
//     var todoListPage=(
//       <div>
//         {navigationBar}
//         <Container maxWidth="md">
//           <AddTodo add={this.add}/>
//           <div className='TodoList'>{todoItems}</div>
//         </Container>
//       </div>
//     );

//     //logind중일 때
//     var loadingPage=<h1>로딩중...</h1>
//     var content=loadingPage;

//     if(!this.state.loading){
//       content=todoListPage;
//     }

//     //생성된 컴포넌트 JPX를 리턴
//     return(
//       <div className='App'>{content}</div>
//     );
//   }
// }

// export default App;

import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container, Grid, Button, AppBar, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     items: [],
  //     loading: true,
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        loading: true,
        checkedCount: 0 // 체크된 항목 수를 추가
    };
  }

  update = (item) => {
      call("/todo", "PUT", item).then((response) => {
          const updatedItems = Array.isArray(response.data) ? response.data : [];
          this.setState({
              items: updatedItems,
              checkedCount: updatedItems.filter(item => item.done).length // 체크된 항목 개수 업데이트
          });
      });
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: Array.isArray(response.data) ? response.data : [] })
    );
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: Array.isArray(response.data) ? response.data : [] })
    );
  }

  // update = (item) => {
  //   call("/todo", "PUT", item).then((response) =>
  //     this.setState({ items: Array.isArray(response.data) ? response.data : [] })
  //   );
  // }

  // componentDidMount() {
  //   call("/todo", "GET", null).then((response) =>
  //     this.setState({ items: Array.isArray(response.data) ? response.data : [], loading: false })
  //   );
  // }

  componentDidMount() {
    call("/todo", "GET", null).then((response) => {
        const items = Array.isArray(response.data) ? response.data : [];
        const checkedCount = items.filter(item => item.done).length; // 체크된 항목의 수 계산
        this.setState({ items, loading: false, checkedCount });
    });
}

  render() {
    // // items 배열의 길이를 로그로 남깁니다.
    // console.log(this.state.items.length + "items length");
    // console.log(this.state.checkedCount +"checked Count");

    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    // navigationBar
    var navigationBar = (
      <AppBar position='static'>
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant='h6'>오늘의 할 일</Typography>
            </Grid>
            <Grid item>
              <Button color='inherit' onClick={signout}>logout</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );


    const { items, checkedCount } = this.state;
    const totalItems = items.length;
    const percentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0; // 퍼센티지 계산
    // 로딩 중이 아닐 때
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          {/* 퍼센티지 */}
          <div className='App'>
            <Container maxWidth="sm">
              <Typography variant="h6">{totalItems}개 중 {checkedCount}개 완료 ({percentage.toFixed(1)}%)</Typography>
              <LinearProgress variant="determinate" value={percentage} />
            </Container>
          </div>

          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );

    // 로딩 중일 때
    var loadingPage = <h1>로딩중...</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    // 생성된 컴포넌트 JSX를 리턴
    return (
      <div className='App'>{content}</div>
    );
  }
}

export default App;