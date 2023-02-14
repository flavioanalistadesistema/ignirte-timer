import { defaultTheme } from './../styles/themes/default';
import styled, {css} from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContentProps {
    variant: ButtonVariant
}

const buttonVariant = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green'
}

export const ButtonContent = styled.button<ButtonContentProps>`
    width: 150px;
    height: 40px;

    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};

/* ${props => {
    return css`background-color: ${buttonVariant[props.variant]}`
}} */

`