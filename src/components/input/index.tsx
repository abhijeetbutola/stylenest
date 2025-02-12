import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function InputComponent(props: InputProps, ref: React.Ref<HTMLInputElement>) {
  const { label, error, className, id, ...restProps } = props;
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input className={className} ref={ref} {...restProps} />
      {error && <p className="">{error}</p>}
    </div>
  );
}

const Input = forwardRef(InputComponent);

export default Input;
