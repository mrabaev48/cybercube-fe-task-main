import React, {FC} from "react";
import classes from './Button.module.css';

export interface IButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    CssClasses?: string;
    children: JSX.Element | React.ReactNode;
    'dataTestId'?: string
}

const Button: FC<IButtonProps> = ({
                                      onClick,
                                      CssClasses = '',
                                      children,
                                      dataTestId
                                  }) => {
    return (
        <button
            onClick={onClick}
            className={`${classes['ui-button']} ${CssClasses}`}
            data-testid={dataTestId}
        >
            {children}
        </button>
    )
}

export default Button;