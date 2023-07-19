import React from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  type?: string;
  label: string;
  register: UseFormRegisterReturn;
};

export const FormInput: React.FC<FormInputProps> = ({
  type = undefined,
  label,
  register,
}) => {

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          {...register}
          type={type}
          isRequired
        />
      </InputGroup>
    </FormControl>
  );
};
