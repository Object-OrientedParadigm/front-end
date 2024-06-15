import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton, Container, FormGroup,FormControlLabel  } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={item:props.item, readOnly:true, sortOption:"time"};
        this.delete=props.delete;
        this.update=props.update;
    }

    deleteEventHandler=()=>{
        this.delete(this.state.item);
    }

    offReadOnlyMode=()=>{
        this.setState({readOnly:false},()=>{
            console.log("ReadOnly?",this.state.readOnly)
        });
    }

    enterKeyEventHandler=(e)=>{
        if(e.key==="Enter"){
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    }

    editEventHandler=(e)=>{
        const thisItem=this.state.item;
        thisItem.title=e.target.value;
        this.setState({item:thisItem});
    }

    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done; // 체크 상태 반전
        this.setState({ readOnly: true }, () => {
            this.update(thisItem); // 상태 업데이트
        });
    }

    renderImportanceIcon = (importance) => {
        switch (importance) {
            case 'high':
                return '🔴';
        case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return '';
        }
    }
    
    render(){
        const {item}=this.state;
        const inputBaseStyle = {
            color: item.done ? '#adb5bd' : 'inherit'
        };

        return(
            <ListItem>
                <Checkbox
                checked={item.done}
                onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                    inputProps={{"aria-label":"naked",readOnly:this.state.readOnly}}
                    type='text'
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    onClick={this.offReadOnlyMode}
                    onChange={this.editEventHandler}
                    onKeyPress={this.enterKeyEventHandler}
                    style={inputBaseStyle}
                    />
                </ListItemText>
                <span style={{ marginRight: '20px' }}>{this.renderImportanceIcon(item.importance)}</span>
                
                <ListItemSecondaryAction >
                    <IconButton aria-label='Delete'
                    onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;
