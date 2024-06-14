import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container, Grid, Button, AppBar, LinearProgress, Toolbar, Typography, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';
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
            totalPages: 0
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


    toggleShowCompleted = () => {
        this.setState(prevState => ({ showCompleted: !prevState.showCompleted }));
    }

    render() {
        const { items, checkedCount, showCompleted, currentPage, totalPages } = this.state;
        const filteredItems = !showCompleted ? items.filter(item => !item.done) : items;
        const pageSize = 10;
        const startIndex = (this.state.currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentFilteredItems = filteredItems.slice(startIndex, endIndex);
        
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
            <Paper style={{ margin: 16 }}>
                <List>
                    {currentFilteredItems.map((item, idx) => (
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
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={3} style={{ padding: '40px' }} >
                            <Weather />
                        </Grid>
                        <Grid item xs={9}>
                            <AddTodo add={this.add} />
                            <div className='App'>
                                <Container maxWidth="sm">
                                    <Typography variant="h6">
                                        {totalItems}개 중 {checkedCount}개 완료 ({percentage.toFixed(1)}%)
                                    </Typography>
                                    <LinearProgress variant="determinate" value={percentage} />
                                </Container>
                            </div>
                            <FormGroup row style={{ justifyContent: 'flex-end', marginTop: '30px' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={showCompleted} onChange={this.toggleShowCompleted} />}
                                    label="완료한 목록 보기"
                                />
                            </FormGroup>
                            <div className='TodoList'>{todoItems}</div>

                        </Grid>
                    </Grid>
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
                {content}
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
            />
            </div>
        );
    }
}

export default App;
