import { Input, Select, Stack, Button } from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserCommon, Student, Mentor } from "./userType";
import { FormInput } from "./FormInput";

export type StudentFormData = UserCommon & Student;
export type MentorFormData = UserCommon & Mentor;

export const UserForm: React.FC<{ onSubmit: (data: StudentFormData | MentorFormData) => void }> = ({ onSubmit }) => {
  const { register, handleSubmit, control, watch } = useForm<StudentFormData | MentorFormData>(
    { defaultValues: { role: "student" } }
  );
  // @ts-ignore
  const hobbiesFields = useFieldArray({ control, name: "hobbies" });
  // @ts-ignore
  const studyLangsFields = useFieldArray({ control, name: "studyLangs" });
  // @ts-ignore
  const useLangsFields = useFieldArray({ control, name: "useLangs" });

  const role = watch("role");

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="名前" register={register("name")} type="text"/>
      <label htmlFor="role">ロール</label>
      <Select {...register("role")}>
        <option value="student">学生</option>
        <option value="mentor">メンター</option>
      </Select>
      <FormInput label="メールアドレス" register={register("email")} type="text"/>
      <FormInput label="年齢" register={register("age")} type="number"/>
      <FormInput label="郵便番号" register={register("postCode")} type="text"/>
      <FormInput label="電話番号" register={register("phone")} type="text"/>
      <FormInput label="URL" register={register("url")} type="text"/>

      <label htmlFor="hobbies">趣味</label>
      <Stack spacing={4}>
        {hobbiesFields.fields.map((field, index) => (
          <Input key={field.id} {...register(`hobbies.${index}`)} type="text"/>
        ))}
        <Button onClick={() => hobbiesFields.append("")}>趣味を追加</Button>
      </Stack>

      {role === "student" && (
        <>
          <FormInput label="勉強時間" register={register("studyMinutes")} type="number"/>
          <FormInput label="課題番号" register={register("taskCode")} type="number"/>
          <FormInput label="ハピネススコア" register={register("score")} type="number"/>

          <label htmlFor="hobbies">学習言語</label>
          <Stack spacing={4}>
            {studyLangsFields.fields.map((field, index) => (
              <Input key={field.id} {...register(`studyLangs.${index}`)} type="text"/>
            ))}
            <Button onClick={() => studyLangsFields.append("")}>言語を追加</Button>
          </Stack>
        </>
      )}

      {role === "mentor" && (
        <>
          <FormInput label="実務経験月数" register={register("experienceDays")} type="number"/>
          <FormInput label="現場で使っている言語" register={register("availableStartCode")} type="number"/>
          <FormInput label="担当できる課題番号初め" register={register("availableEndCode")} type="number"/>

          <label htmlFor="hobbies">現場で使っている言語</label>
          <Stack spacing={4}>
            {useLangsFields.fields.map((field, index) => (
              <Input key={field.id} {...register(`useLangs.${index}`)} type="text"/>
            ))}
            <Button onClick={() => useLangsFields.append({})}>言語を追加</Button>
          </Stack>
        </>
      )}

      <Input type="submit" />
    </Stack>
  );
};
