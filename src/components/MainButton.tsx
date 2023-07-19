import { Button, ButtonProps } from "@chakra-ui/react";

type MainButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export const MainButton: React.FC<MainButtonProps> = ({
  children,
  variant = "solid",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      colorScheme="orange"
      {...props}
    >
      {children}
    </Button>
  );
};
