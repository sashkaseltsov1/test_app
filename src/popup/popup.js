import React, {useState} from "react";
import styles from './popup.module.css';
import {rows} from "../App";

const arrayToMatrix = (array)=>{
    const arr = [...array];
    const matrix=[];
    for (let r=0; r<rows.length;r++){
        matrix.push(arr.slice(r*5, r*5+5))
    }
    return matrix
}

const Popup = ({setPopupVisibility, selectedIndexes, selectedCols, selectedRows, matrix, setMatrix})=>{

    const [normalizedData, setNormalizedData] = useState([...matrix[0], ...matrix[1], ...matrix[2], ...matrix[3]])

    return <div className={styles.popupBackground} >
        <div className={styles.popup} style={{'--cols':selectedCols.length,'--rows':selectedRows.length, }}>
            <div className={styles.table}>
                <div />
                <div className={styles.cols}>
                    {selectedCols.map(col=><div  key={col}>{col}</div>)}
                </div>
                <div className={styles.rows}>
                    {selectedRows.map(row=><div key={row}>{row}</div>)}
                </div>
                <div className={styles.items} >
                    {selectedIndexes.map((item, index)=>
                        <input key={`${item}${index}`} type="checkbox" checked={normalizedData[item]}
                               onChange={()=>{
                                   let newData = [...normalizedData]
                                   newData[item]=newData[item]===1?0:1;
                                   setNormalizedData(newData)
                               }}/>)}
                </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={()=>setPopupVisibility(false)}>Отменить</button>
                <button onClick={()=>{
                    setMatrix(arrayToMatrix(normalizedData))
                    setPopupVisibility(false)
                }}>Применить</button>
            </div>
        </div>
    </div>
};

export default Popup;