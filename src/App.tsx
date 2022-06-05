import { useEffect, useState } from 'react';

import * as C from './App.styles';

import logoImg from './assets/devmemory_logo.png';
import restartImg from './svgs/restart.svg';

import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button';

import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { shuffler } from './helpers/shuffler';
import { GridItem } from './components/GridItem';
import { formatElapsedTime } from './helpers/formatElapsedTime';


const App=() => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [uncovered, setUncovered] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);


  useEffect(()=>{
    resetAndCreateGrid();
  },[]);

  //verify if uncovered items are equal
  useEffect(() => {
    if(uncovered===2){
      setMoveCount(moveCount + 1);
      let tmpGridItem = [...gridItems];
      let uncoveredItems = tmpGridItem.filter(item=>item.uncovered===true);
      if(uncoveredItems[0].item===uncoveredItems[1].item){
        tmpGridItem.forEach(item=>{
          if(item.uncovered === true){
            item.uncovered = false;
            item.resolved=true;
          }
        });
        setUncovered(0);
        setGridItems(tmpGridItem);
      } else{
        setTimeout(()=>{
          tmpGridItem.forEach(item=>item.uncovered = false);
          setUncovered(0);
          setGridItems(tmpGridItem);
        },1000)
      }

      if(tmpGridItem.every(item=>item.resolved===true)){
        setPlaying(false);
      }
    }

    // let uncoveredItems = tmpGridItem.filter(item=>item.uncovered===true
    //   )
      
    //   if(uncovered===2 && uncoveredItems[0].item===uncoveredItems[1].item){
    //     for(let i=0; i < (items.length * 2); i++){
    //       if(tmpGridItem[i].uncovered === true){
    //         tmpGridItem[i].uncovered = false;
    //         tmpGridItem[i].resolved = true;
    //       }
    //     }
    //   } else if(uncovered===2) {
    //     for(let i=0; i < (items.length * 2); i++){
    //       if(tmpGridItem[i].uncovered === true){
    //         tmpGridItem[i].uncovered = false;
    //       }
    //     }
    //   }
    //   console.log(tmpGridItem)
  },[uncovered, gridItems])

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(playing){
        setElapsedTime(elapsedTime + 1);
      }
    }, 1000);
    return () => clearInterval(timer);

  },[playing, elapsedTime]);


  const resetAndCreateGrid = () => {
    // step 1 - reset game
  
    setElapsedTime(0);
    setMoveCount(0);    
    setUncovered(0);

    //step 2 - generate grid
    //step 2.1 - start ordered grid
    let tmpGridItems: GridItemType[] = [];
    for(let i = 0; i < (items.length * 2); i++){
      tmpGridItems.push({
        item: (i % items.length),
        uncovered: false,
        resolved: false
      })
    }

    //step 2.2 - shuffle grid
    tmpGridItems = shuffler(tmpGridItems);
    setGridItems(tmpGridItems);
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    if(playing&&uncovered<2){
      let tmpGridItem = [...gridItems];
      if(!tmpGridItem[index].resolved && !tmpGridItem[index].uncovered){
        tmpGridItem[index].uncovered = true;
        setUncovered(uncovered + 1);
      }
      
      setGridItems(tmpGridItem);
    }
    
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImg} width="200" alt=""/>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={formatElapsedTime(elapsedTime)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </C.InfoArea>

        <Button icon = {restartImg} label="Reiniciar" onClick={resetAndCreateGrid}/>

      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index)=>(
            <GridItem 
              key = {index} 
              data = {item}
              onClick = {()=>handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App;
