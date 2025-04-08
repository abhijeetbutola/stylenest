import { useState } from "react";
import { toast } from "react-toastify";
import copyToClipboard from "../../assets/icons/copyToClipboard.svg";

type CopyToClipboardProps = {
  value: string;
  children?: React.ReactNode;
};

const CopyToClipboard = ({ value, children }: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard!", {
        className: "toast-class",
        delay: 300,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="cursor-pointer inline-flex items-center gap-2"
    >
      {children}
      <span>
        {copied ? (
          "✅"
        ) : (
          <img src={copyToClipboard} alt="copy-to-clipboard-button" />
        )}
      </span>
    </div>
  );
};

export default CopyToClipboard;
