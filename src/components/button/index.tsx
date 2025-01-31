type ButtonProp = {
    type?: "submit" | "reset" | "button";
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    name?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};


function Button({ type, className, children, style, name, disabled, onClick }: ButtonProp) {
    return (
        <button type={type} className={className} style={style} name={name} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;