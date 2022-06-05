import { items } from '../../data/items';
import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import b7Svg from '../../svgs/b7.svg';

type Props ={
    data: GridItemType;
    onClick: () => void
}

export const GridItem = ({ data, onClick }: Props)=> {
    // console.log(items[data.item].name)
    return (
        <C.Container 
            uncoveredItem = {(data.resolved || data.uncovered)}
            onClick = {onClick}
        >
            {(!data.resolved && !data.uncovered) ?
                <C.Icon src={b7Svg} opacity={.1}/>
            :
                <C.Icon src={items[data.item].icon} />
            }
        </C.Container>
    );
}