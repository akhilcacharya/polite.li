/**
 * Simple component to switch between provided components
 */
import React from 'react'; 

export default class Switcher extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            idx: 0, 
            children: props.children, 
        }; 

        this.onClick = this.onClick.bind(this); 
        this.switchUp = this.switchUp.bind(this); 
    }

    onClick(){
        this.switchUp((this.state.idx + 1) % this.state.children.length); 
    }

    switchUp(idx){
        this.setState({
            ...this.state, 
            idx: idx, 
        }); 
    }

    render() {
        return (
            <div>
                <div className="text-right">
                    <button 
                        style={{
                            marginRight : '30px', 
                        }} 
                        children={
                            "Preferences"
                        }
                        className="btn btn-primary"
                        value={'value'} 
                        onClick={this.onClick}/> 
                </div>
                <br/>
                {this.state.children[this.state.idx]} 
            </div>
        )
    }
}
