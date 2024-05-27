import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import AddTodo from './AddTodo';
import {call, signout} from './service/ApiService';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items: [],
      loading:true,
    };
  }

  add=(item)=>{
    call("/todo","POST",item).then((response)=>
      this.setState({items:response.data})
      );
  }

  delete=(item)=>{
    call("/todo","DELETE",item).then((response)=>
      this.setState({items:response.data})
      );
  }

  update=(item)=>{
    call("/todo","PUT",item).then((response)=>
      this.setState({items:response.data})
      );
  }

  componentDidMount(){
    call("/todo","GET",null).then((response)=>
      this.setState({items:response.data, loading:false})
      );
  }

  render(){
    var todoItems=this.state.items.length>0 &&(
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx)=>(
            <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>
          ))}
        </List>
      </Paper>
    );

    //navigationBar
    var navigationBar=(
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

    //loding중이 아닐 때
    var todoListPage=(
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );

    //logind중일 때
    var loadingPage=<h1>로딩중...</h1>
    var content=loadingPage;

    if(!this.state.loading){
      content=todoListPage;
    }

    //생성된 컴포넌트 JPX를 리턴
    return(
      <div className='App'>{content}</div>
    );
  }
}

export default App;