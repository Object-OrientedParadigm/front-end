import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container, Grid, Button, AppBar, LinearProgress, Toolbar, Typography, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            checkedCount: 0,
            showCompleted: true,
        };
    }

    update = (item) => {
        call("/todo", "PUT", item).then((response) => {
            const updatedItems = Array.isArray(response.data) ? response.data : [];
            this.setState({
                items: updatedItems,
                checkedCount: updatedItems.filter(item => item.done).length
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

    componentDidMount() {
        call("/todo", "GET", null).then((response) => {
            const items = Array.isArray(response.data) ? response.data : [];
            const checkedCount = items.filter(item => item.done).length;
            this.setState({ items, loading: false, checkedCount });
        }).catch((error) => {
            console.error("Failed to fetch todos:", error);
            window.location.href = "/login";
        });
    }

    toggleShowCompleted = () => {
        this.setState(prevState => ({ showCompleted: !prevState.showCompleted }));
    }

    render() {
        const { items, checkedCount, showCompleted } = this.state;
        const filteredItems = !showCompleted ? items.filter(item => item.done) : items;

        var todoItems = filteredItems.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {filteredItems.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                    ))}
                </List>
            </Paper>
        );

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

        const totalItems = items.length;
        const percentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

        var todoListPage = (
            <div>
                {navigationBar}
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className='App'>
                        <Container maxWidth="sm">
                            <Typography variant="h6">{totalItems}개 중 {checkedCount}개 완료 ({percentage.toFixed(1)}%)</Typography>
                            <LinearProgress variant="determinate" value={percentage} />
                        </Container>
                    </div>
                    <FormGroup row style={{ justifyContent: 'flex-end', marginTop: '30px'  }}>
                        <FormControlLabel
                            control={<Checkbox checked={showCompleted} onChange={this.toggleShowCompleted} />}
                            label="완료한 목록 보기"
                        />
                    </FormGroup>
                    
                    <div className='TodoList'>{todoItems}</div>
                </Container>
            </div>
        );

        var loadingPage = <h1>로딩중...</h1>;
        var content = loadingPage;

        if (!this.state.loading) {
            content = todoListPage;
        }

        return (
            <div className='App'>{content}</div>
        );
    }
}

export default App;
