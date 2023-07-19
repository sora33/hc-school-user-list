import { Box, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { User } from "../components/userType";
import { UserTableRow } from "./UserTableRow";

type UserTableProps = {
  users: User[];
  displayUsers: User[];
};

const ThNoWrap = (props: any) => <Th whiteSpace="nowrap" {...props} />;

export const UserTable: React.FC<UserTableProps> = ({ users,displayUsers }) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple" size='sm'>
        <Thead>
          <Tr>
            <ThNoWrap bg="gray.100">ID</ThNoWrap>
            <ThNoWrap bg="gray.100">名前</ThNoWrap>
            <ThNoWrap bg="gray.100">ロール</ThNoWrap>
            <ThNoWrap bg="gray.100">Email</ThNoWrap>
            <ThNoWrap bg="gray.100">年齢</ThNoWrap>
            <ThNoWrap bg="gray.100">郵便番号</ThNoWrap>
            <ThNoWrap bg="gray.100">電話番号</ThNoWrap>
            <ThNoWrap bg="gray.100">趣味</ThNoWrap>
            <ThNoWrap bg="gray.100">URL</ThNoWrap>

            <ThNoWrap bg="red.100">勉強時間</ThNoWrap>
            <ThNoWrap bg="red.100">課題番号</ThNoWrap>
            <ThNoWrap bg="red.100">対応可能なメンター</ThNoWrap>
            <ThNoWrap bg="red.100">勉強中の言語</ThNoWrap>
            <ThNoWrap bg="red.100">パピネススコア</ThNoWrap>

            <ThNoWrap bg="blue.100">実務経験月数</ThNoWrap>
            <ThNoWrap bg="blue.100">現場で使っている言語</ThNoWrap>
            <ThNoWrap bg="blue.100">担当できる課題番号初め</ThNoWrap>
            <ThNoWrap bg="blue.100">担当できる課題番号終わり</ThNoWrap>
            <ThNoWrap bg="blue.100">対応可能な生徒</ThNoWrap>
          </Tr>
        </Thead>
        <Tbody>
          {displayUsers.map((user) => (
            <UserTableRow key={user.id} user={user} users={users} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
