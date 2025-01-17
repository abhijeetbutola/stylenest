type ButtonProp = {
    type?: "submit" | "reset" | "button";
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    name?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};


function Button({ type, className, children, style, name, onClick }: ButtonProp) {
    return (
        <button type={type} className={className} style={style} name={name} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;