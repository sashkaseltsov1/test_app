import React from "react";
import Selection from "react-ds";
import styles from "./selection-area.module.css";
import cn from "classnames";
import success from "../images/tick.svg";
import close from "../images/close.svg";


export default class SelectionArea extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            ref: null,
            elRefs: [],
        };
    }

    getStyle = (index) => {
        if (this.props.selectedIndexes.indexOf(index) > -1) {
            return {
                background: '#2185d0',
                borderColor: '#2185d0',
                color: 'white',
            };
        }
        return {};
    };

    addElementRef = (ref) => {
        const elRefs = this.state.elRefs;
        elRefs.push(ref);
        this.setState({
            elRefs,
        });
    };

    renderSelection() {
        if (!this.state.ref || !this.state.elRefs) {
            return null;
        }
        return (
            <Selection
                target={ this.state.ref}
                elements={ this.state.elRefs }
                onSelectionChange={ this.props.handleSelection }
                style={ this.props.style }
                offset={{
                    top: 0,
                    left: 0,
                }}
            />
        );
    }

    render() {
        return (
            <div className={styles.items} ref={(ref) => {
                this.setState({ref});
            }}>
                {
                    this.props.selectableElements.map((row, rowIndex) => {
                        return row.map((item, index) => {
                                return (
                                    <div
                                        key={index + rowIndex * 5}
                                        ref={this.addElementRef}
                                        style={this.getStyle(index + rowIndex * 5)}
                                        className={cn(styles.item, item === 1 && styles.succeded)}
                                    >
                                        <div className={styles.image}>
                                            <img src={item === 1 ? success : close} alt={item}/>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    })
                }
                {this.renderSelection()}
            </div>
        );
    }
}