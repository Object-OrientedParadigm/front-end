import React from 'react';
import './App.css';
import Todo from './Todo';
import { CircularProgress, Box, Paper, List, Container, Grid, Button, AppBar, LinearProgress, Toolbar, Typography, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call, signout, deleteAllTodos } from './service/ApiService';
import Weather from './Weather';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            checkedCount: 0,
            showCompleted: true,
            currentPage: 1,
            totalPages: 0,
            userName: localStorage.getItem("USER_NAME") || "", // 로컬 스토리지에서 사용자 이름 불러오기
            userId: localStorage.getItem("USER_ID") || ""
        };
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) => {
            const updatedItems = Array.isArray(response.data) ? response.data : [];
            const totalPages = Math.ceil(updatedItems.length / 10);
            const checkedCount = updatedItems.filter(item => item.done).length;
            const totalItems = updatedItems.length;
            const percentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
            this.setState({ items: updatedItems, totalPages, checkedCount, percentage });
        });
    }
    
    update = (item) => {
        call("/todo", "PUT", item).then((response) => {
            const updatedItems = Array.isArray(response.data) ? response.data : [];
            const totalPages = Math.ceil(updatedItems.length / 10);
            const checkedCount = updatedItems.filter(item => item.done).length;
            const totalItems = updatedItems.length;
            const percentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
            this.setState({ items: updatedItems, totalPages, checkedCount, percentage });
        });
    }
    
    delete = (item) => {
        call("/todo", "DELETE", item).then((response) => {
            const updatedItems = Array.isArray(response.data) ? response.data : [];
            const totalPages = Math.ceil(updatedItems.length / 10);
            const checkedCount = updatedItems.filter(item => item.done).length;
            const totalItems = updatedItems.length;
            const percentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
            this.setState({ items: updatedItems, totalPages, checkedCount, percentage });
        });
    }

    componentDidMount() {
        call("/todo", "GET", null).then((response) => {
            const items = Array.isArray(response.data) ? response.data : [];
            const checkedCount = items.filter(item => item.done).length;
            const totalPages = Math.ceil(items.length / 10)
            this.setState({ items, loading: false, checkedCount, totalPages });
        }).catch((error) => {
            console.error("Failed to fetch todos:", error);
            window.location.href = "/login";
        });
    }
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    handleDeleteAll = () => {
        const { userId } = this.state;
        if (!userId) {
            alert("사용자 ID를 찾을 수 없습니다. 다시 로그인 해주세요.");
            return;
        }

        if (window.confirm("⚠️모든 리스트가 삭제됩니다. 삭제하시겠습니까?⚠️")) {
            deleteAllTodos(userId).then((response) => {
                this.setState({ items: [], checkedCount: 0, totalPages: 0 });
                alert("모든 리스트가 삭제되었습니다.");
            }).catch((error) => {
                console.error("Failed to delete all todos:", error);
                alert("삭제 실패했습니다.");
            });
        } else {
            alert("취소되었습니다.");
        }
    }


    toggleShowCompleted = () => {
        this.setState(prevState => ({ showCompleted: !prevState.showCompleted }));
    }

    calculateCompletion = () => {
        const totalItems = this.state.items.length;
        const completedItems = this.state.items.filter(item => item.done).length;
        const percentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        return { total: totalItems, completed: completedItems, percentage };
    }

    calculateCompletionByCategory = (category) => {
        const filteredItems = this.state.items.filter(item => item.importance === category);
        const completed = filteredItems.filter(item => item.done).length;
        const total = filteredItems.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        return { total, completed, percentage };
    }

    renderCircularProgress = (category) => {
        const { total, completed, percentage } = category === 'total' ? this.calculateCompletion() : this.calculateCompletionByCategory(category);
        
        let color;
        switch (category) {
            case 'total':
                color = 'primary';
                break;
            case 'high':
                color = 'red';
                break;
            case 'medium':
                color = 'yellow';
                break;
            case 'low':
                color = 'green';
                break;
            default:
                color = 'primary';
        }

        return (
            <Box display="flex" justifyContent="center" m={3} position="relative">
                <CircularProgress variant="determinate" value={percentage} size={100} thickness={4} style={{ color: color }} />
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={4}
                    style={{ color: 'rgba(0, 0, 0, 0.1)', position: 'absolute', top: 0, left: 0 }}
                />
                <Typography variant="caption" component="div" color="textSecondary" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {`${category}`}
                    <br />
                    {`${total}개 중`}
                    <br />
                    {`${completed}개 완료`}
                </Typography>
            </Box>
        );
    }


    render() {
        const { items, checkedCount, userName, showCompleted, currentPage, totalPages } = this.state;
        const filteredItems = !showCompleted ? items.filter(item => !item.done) : items;
        const pageSize = 10;
        const startIndex = (this.state.currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentFilteredItems = filteredItems.slice(startIndex, endIndex);
        const userNameCheck=userName===""? "":userName+"님, ";
        
        const Pagination = ({ currentPage, totalPages, onPageChange }) => (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        disabled={pageNumber === currentPage}
                        style={{
                            margin: '0 5px',
                            padding: '5px 10px',
                            backgroundColor: pageNumber === currentPage ? '#007bff' : '#fff',
                            color: pageNumber === currentPage ? '#fff' : '#007bff',
                            border: '1px solid #007bff',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        );
        var todoItems = currentFilteredItems.length > 0 && (
            <Paper style={{ margin: 0 }}>
                <List>
                    {currentFilteredItems.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                    ))}
                </List>
            </Paper>
        );

        var navigationBar = (
            <AppBar position='static' style={{ backgroundColor: '#556677' }}>
                <Toolbar>
                    <Grid justifyContent="space-between" container>
                        <Grid item>
                            <Typography variant='h6'>{userNameCheck}좋은 하루 보내세요 🍀</Typography>
                        </Grid>
                        <Grid item>
                            <Button color='inherit' onClick={signout}>logout</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

        var todoListPage = (
            <div>
                <Container maxWidth="lg">
                    <AddTodo add={this.add} />
                    <div className='App'>
                        <Box display="flex" justifyContent="center" m={2}>
                            {this.renderCircularProgress('total')}
                            {this.renderCircularProgress('high')}
                            {this.renderCircularProgress('medium')}
                            {this.renderCircularProgress('low')}
                        </Box>
                    </div>
                    <FormGroup row style={{ justifyContent: 'flex-end', marginTop: '30px'  }}>
                        <FormControlLabel
                            control={<Checkbox checked={showCompleted} onChange={this.toggleShowCompleted} />}
                            label="완료한 목록 보기"
                        />
                    </FormGroup>

            <div className='TodoList'>{todoItems}</div>
                    {items.length > 0 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handleDeleteAll} 
                            style={{ display: 'block', marginLeft: 'auto', marginTop: '20px' }}
                        >
                            DELETE ALL TODOS
                        </Button>
                    )}
                </Container>
            </div>
        );

        var loadingPage = <h1>로딩중...</h1>;
        var content = loadingPage;

        if (!this.state.loading) {
            content = todoListPage;
        }

        return (
            <div className='App'>
                {navigationBar}
                <Grid container spacing={3} style={{marginLeft:'50px', marginTop:'30px'}}>
                    <Grid item xs={2}>
                        <Weather />
                    </Grid>
                    <Grid item xs={8}>
                        {content}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={this.handlePageChange}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
