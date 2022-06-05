import styled from "styled-components";

type ContainerProps = {
    uncoveredItem: boolean;
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props=>props.uncoveredItem? '#1550ff' : '#e2e3e3'};
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
`;

type IconProps = {
    opacity?: number;
}
export const Icon = styled.img<IconProps>`
    width: 40px;
    height: 40px;
    opacity: ${props => props.opacity ?? 1};
`;