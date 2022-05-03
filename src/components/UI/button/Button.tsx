import React, {FC} from "react";
import classes from './Button.module.css';

export interface IButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    CssClasses?: string;
    children: JSX.Element | React.ReactNode;
}

const Button: FC<IButtonProps> = ({
    onClick,
    CssClasses= '',
    children
                                  }) => {
    return (
        <button
            onClick={onClick}
            className={`${classes['ui-button']} ${CssClasses}`}
        >
            {children}
        </button>
    )
}

export default Button;