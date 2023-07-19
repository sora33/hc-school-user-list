import {  Container, Select, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { MainButton } from "./MainButton";
import { UserTable } from "./UserTable";
import { UserForm } from "./UserForm";
import { USER_LIST } from "./mock";
import { useState, useEffect } from "react";
import { StudentFormData, MentorFormData } from "./UserForm";
import { User, Student, Mentor } from "../components/userType";
import { ChildrenModal } from "./ChildrenModal";

export const MainCtt = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState<"all" | "student" | "mentor">("all");
  const [users, setUsers] = useState<User[]>(USER_LIST);
  const [displayusers, setDisplayUsers] = useState<User[]>(USER_LIST);
  const [sortAttribute, setSortAttribute] = useState<"studyMinutes" | "score" | "experienceDays" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  let newUser: Student | Mentor;
  const handleUserSubmit = (formData: StudentFormData | MentorFormData) => {
    const maxId = Math.max(...users.map(user => user.id), 0);
    if (formData.role === "student") {
      newUser = formData as Student;
    } else if (formData.role === "mentor") {
      newUser = formData as Mentor;
      newUser.experienceDays = newUser.experienceDays || 0
    }
    newUser.id = maxId + 1;
    onClose();
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    let sortedUsers = [...users];
  
    if (role !== "all") {
      sortedUsers = sortedUsers.filter(user => user.role === role);
  
      sortedUsers.sort((a, b) => {
        if (sortAttribute === "studyMinutes" && 'studyMinutes' in a && 'studyMinutes' in b) {
          return sortOrder === "asc"
            ? a.studyMinutes - b.studyMinutes
            : b.studyMinutes - a.studyMinutes;
        } else if (sortAttribute === "experienceDays" && 'experienceDays' in a && 'experienceDays' in b) {
          return sortOrder === "asc"
            ? a.experienceDays - b.experienceDays
            : b.experienceDays - a.experienceDays;
        } else if (sortAttribute === "score" && 'score' in a && 'score' in b) {
          return sortOrder === "asc"
            ? a.score - b.score
            : b.score - a.score;
        }
        return 0;
      });
    }
  
    setDisplayUsers(sortedUsers);
  }, [users, role, sortOrder, sortAttribute]);
  

  return (
    <Container maxW='container.xl'>
      <Stack spacing="4" mt="4">
        <Flex justifyContent="space-between">
          <Flex>
            <MainButton colorScheme={role === "all" ? "orange" : "gray"} mr="4" onClick={() => setRole("all")}>全て</MainButton>
            <MainButton colorScheme={role === "student" ? "orange" : "gray"} mr="4" onClick={() => setRole("student")}>在校生</MainButton>
            <MainButton colorScheme={role === "mentor" ? "orange" : "gray"} onClick={() => setRole("mentor")}>メンター</MainButton>
          </Flex>
          <MainButton colorScheme="blue" onClick={() => onOpen()}>ユーザー新規追加</MainButton>
        </Flex>
        {role !== "all" && 
          <Flex>
            <Select maxW="320px" mr="4" placeholder="属性を選択" onChange={(e) => setSortAttribute(e.target.value as "studyMinutes" | "score" | "experienceDays" | "")}>
              {role !== "mentor" && <option value="studyMinutes">勉強時間</option>}
              {role !== "mentor" && <option value="score">ハピネススコア</option>}
              {role !== "student" && <option value="experienceDays">実務経験月数</option>}
            </Select>
            <MainButton onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              {sortOrder === "asc" ? "昇順" : "降順"}
            </MainButton>
          </Flex>
        }
        <UserTable displayUsers={displayusers} users={users} />
      </Stack>
      <ChildrenModal isOpen={isOpen} onClose={onClose} title="ユーザー新規追加">
        <UserForm onSubmit={handleUserSubmit}/>
      </ChildrenModal>
    </Container>
  );
};
