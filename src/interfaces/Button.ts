export interface IButton {
    text: string;
    leftIcon?: any;
    rightIcon?: any;
    iconSize?: number;
    buttonStyle?: string;
    textStyle?: string;
    onClick?: () => void;
}