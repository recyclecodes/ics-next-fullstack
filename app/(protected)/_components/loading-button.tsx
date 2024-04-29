import { Button } from "@/components/ui/button";
import { BiLoaderCircle } from "react-icons/bi";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <BiLoaderCircle className="animate-spin w-8 h-8" />}
        {children}
      </span>
    </Button>
  );
}
