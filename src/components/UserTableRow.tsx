import { Tr, Td } from "@chakra-ui/react";
import { User, Student, Mentor } from "../components/userType";

type UserTableRowProps = {
  user: User;
  users: User[];
};
const TdNoWrap = (props: any) => <Td whiteSpace="nowrap" {...props} />;

const findAvailableMentors = (taskCode: number, userList: User[]): String[] => {
  return userList
    .filter((user): user is Mentor => user.role === 'mentor')
    .filter((mentor) => mentor.availableStartCode <= taskCode && mentor.availableEndCode >= taskCode)
    .map((mentor) => mentor.name);
};

const findAvailableStudents = (availableStartCode: number, availableEndCode: number, userList: User[]): String[] => {
  return userList
    .filter((user): user is Student => user.role === 'student')
    .filter((student) => student.taskCode >= availableStartCode && student.taskCode <= availableEndCode)
    .map((student) => student.name);;
};


export const UserTableRow: React.FC<UserTableRowProps> = ({ user,users }) => {
  const isStudent = (user: User): user is Student => user.role === "student";
  const isMentor = (user: User): user is Mentor => user.role === "mentor";

  return (
    <Tr>
      <TdNoWrap>{user.id}</TdNoWrap>
      <TdNoWrap>{user.name}</TdNoWrap>
      <TdNoWrap>{isStudent(user) ? "在校生" :"メンター"}</TdNoWrap>
      <TdNoWrap>{user.email}</TdNoWrap>
      <TdNoWrap>{user.age}</TdNoWrap>
      <TdNoWrap>{user.postCode}</TdNoWrap>
      <TdNoWrap>{user.phone}</TdNoWrap>
      <TdNoWrap>{user.hobbies.join(", ")}</TdNoWrap>
      <TdNoWrap>{user.url}</TdNoWrap>

      <TdNoWrap>{isStudent(user) ? user.studyMinutes : "-"}</TdNoWrap>
      <TdNoWrap>{isStudent(user) ? user.taskCode : "-"}</TdNoWrap>
      <TdNoWrap>{isStudent(user) ? findAvailableMentors(user.taskCode, users).join(', ') : "-"}</TdNoWrap>
      <TdNoWrap>
        {isStudent(user) ? user.studyLangs.join(", ") : "-"}
      </TdNoWrap>
      <TdNoWrap>{isStudent(user) ? user.score : "-"}</TdNoWrap>

      <TdNoWrap>{isMentor(user) ? user.experienceDays : "-"}</TdNoWrap>
      <TdNoWrap>{isMentor(user) ? user.useLangs.join(", ") : "-"}</TdNoWrap>
      <TdNoWrap>{isMentor(user) ? user.availableStartCode : "-"}</TdNoWrap>
      <TdNoWrap>{isMentor(user) ? user.availableEndCode : "-"}</TdNoWrap>
      <TdNoWrap>{isMentor(user) ? findAvailableStudents(user.availableStartCode, user.availableEndCode, users).join(', ') : "-"}</TdNoWrap>
    </Tr>
  );
};
