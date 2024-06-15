import React from 'react';
import { Select, MenuItem, ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton, Container, FormGroup,FormControlLabel  } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={item:props.item, readOnly:true, sortOption:"time", editingImportance: false};
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

    handleImportanceChange = (e) => {
        const thisItem = this.state.item;
        thisItem.importance = e.target.value;
        this.setState({ item: thisItem, editingImportance: false }, () => {
            this.update(thisItem);
        });
    };

    renderImportanceIcon = (importance) => {
        switch (importance) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return '⚪️';
        }
    }
    
    render(){
        const {item, editingImportance}=this.state;
        const inputBaseStyle = {
            color: item.done ? 'gray' : 'inherit'
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
                {/* <span style={{ marginRight: '20px' }}>{this.renderImportanceIcon(item.importance)}</span>
                 */}

                {editingImportance ? (
                    <Select
                        value={item.importance}
                        onChange={this.handleImportanceChange}
                        onBlur={() => this.setState({ editingImportance: false })}
                        autoFocus
                    >
                        <MenuItem value="high">🔴 High</MenuItem>
                        <MenuItem value="medium">🟡 Medium</MenuItem>
                        <MenuItem value="low">🟢 Low</MenuItem>
                        <MenuItem value="none">⚪️ none</MenuItem>
                    </Select>
                ) : (
                    <span style={{ marginRight: '20px', cursor: 'pointer' }} onClick={() => this.setState({ editingImportance: true })}>
                        {this.renderImportanceIcon(item.importance)}
                    </span>
                )}

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
