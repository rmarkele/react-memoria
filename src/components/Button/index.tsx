import * as C from './styles';

type Props = {
    icon?: any;
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ icon, label, onClick }:Props) => {
    return (
        <C.Container onClick={onClick}>
            {icon &&
                <C.IconArea>
                    <C.Icon src={icon} />
                </C.IconArea>
            }
            <C.Label>{label}</C.Label>
        </C.Container>
    )
}