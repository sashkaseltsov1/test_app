import React, {useState} from 'react';
import styles from './App.module.css';
import SelectionArea from "./selection-area/selection-area";
import Popup from "./popup/popup";

export const cols=['Пн','Вт','Ср','Чт','Пт']
export const rows=['Номер 1','Номер 2','Номер 3','Номер 4']

export default ()=> {
    const [selectedCols, setSelectedCols ] = useState([])
    const [selectedRows, setSelectedRows ] = useState([])
    const [popupIsVisible, setPopupVisibility ] = useState(false)
    const [selectedIndexes, setSelectedIndexes]=useState([]);
    const [matrix, setMatrix] = useState([
        [1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0]
    ])

    const handleSelection = (indexes)=>{
        setSelectedIndexes(indexes)
        if(indexes.length){
            setPopupVisibility(true);
            setSelectedArea(indexes[0], indexes[indexes.length-1])
        }
    }
    const setSelectedArea = (startIndex, endIndex)=>{
        let rowStart=0;
        let rowEnd=0;
        let colStart=0;
        let colEnd=0;
        for (let r=0; r<rows.length;r++){
            for (let c=0; c<cols.length;c++){
                if(c+r*5===startIndex){
                    rowStart=r;
                    colStart=c;
                }
                if(c+r*5===endIndex){
                    rowEnd=r;
                    colEnd=c;
                }
            }
        }
        setSelectedCols([...cols].slice(colStart, colEnd+1));
        setSelectedRows([...rows].slice(rowStart, rowEnd+1));
    }

        return (
            <div className={styles.ss}>
                {popupIsVisible && <Popup setPopupVisibility={setPopupVisibility}
                                          selectedIndexes={selectedIndexes}
                                          selectedCols={selectedCols}
                                          selectedRows={selectedRows}
                                          matrix={matrix}
                                          setMatrix={setMatrix}/>}
                <div className={styles.table}>
                    <div />
                    <div className={styles.cols}>
                        {cols.map(col=><div  key={col}>{col}</div>)}
                    </div>
                    <div className={styles.rows}>
                        {rows.map(row=><div key={row}>{row}</div>)}
                    </div>
                    <div >
                        <SelectionArea selectableElements={matrix}
                                       selectedIndexes={selectedIndexes}
                                       handleSelection={handleSelection}/>
                    </div>
                </div>
            </div>

        );

}

