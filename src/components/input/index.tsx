import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function InputComponent(props: InputProps, ref: React.Ref<HTMLInputElement>) {
  const { label, error, className, id, ...restProps } = props;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="font-medium text-sm text-neutral-700">
          {label}
        </label>
      )}
      <input
        className={`${className} font-normal text-sm text-neutral-900
         py-2.5 px-[14px] rounded-[4px] bg-neutral-50 border-[1px] border-neutral-200 w-full`}
        ref={ref}
        {...restProps}
      />
      {error && <p className="">{error}</p>}
    </div>
  );
}

const Input = forwardRef(InputComponent);

export default Input;
