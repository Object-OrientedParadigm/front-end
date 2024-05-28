import React from "react";
import { TextField, Paper, Button, Grid,FormControl,InputLabel,NativeSelect } from "@material-ui/core";

class AddTodo extends React.Component{
    constructor(props){
        super(props);
        this.state={item:{title:"", importance:"none"}};
        this.add=props.add;
    }

    onInputChange = (e) => {
        const thisItem=this.state.item;
        thisItem.title=e.target.value;
        this.setState({item:thisItem});
    }

    onImpoertanceChange=(e)=>{
        const thisItem=this.state.item;
        thisItem.importance=e.target.value;
        this.setState({item:thisItem});
    }

    onButtonClick=()=>{
        this.add(this.state.item);
        this.setState({item:{title:"",importance:"none"}});
    }

    enterKeyEventHandler=(e)=>{
        if(e.key==='Enter'){
            this.onButtonClick();
        }
    }

    render(){
        return (
            <Paper style={{margin:16,padding:16}}>
                <Grid container>
                    <Grid xs={7} sm={8} md={9} item style={{paddingRight:12}}>
                        <TextField
                        placeholder="Add Todo here"
                        fullWidth
                        onChange={this.onInputChange}
                        value={this.state.item.title}
                        onKeyPress={this.enterKeyEventHandler}
                        InputProps={{
                            style: { height: '48px', fontSize: '20px' } // input 필드의 높이와 폰트 크기 조정
                        }}
                        />
                    </Grid>
                    <Grid xs={2} sm={3} md={2} item style={{paddingRight:5}}>
                        <FormControl  >
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                중요도
                            </InputLabel>
                            <NativeSelect
                                value={this.state.item.importance}
                                onChange={this.onImpoertanceChange}
                                defaultValue="none"
                                inputProps={{
                                name: 'importance',
                                id: 'importance-select',
                                }}
                            >
                                <option value="high">🔴High</option>
                                <option value="medium">🟡Medium</option>
                                <option value="low">🟢Low</option>
                                <option value="none">none</option>
                            </NativeSelect>
                        </FormControl>
                        
                    </Grid>
                    <Grid xs={1} sm={1} md={1} item>
                        <Button
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;