import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Alert,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Keyboard,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  increment,
  Timestamp,
} from "firebase/firestore";

import { IBudget, ITransactions } from "../../interfaces/main";
import Button from "../Button";
import { database } from "../../config/Firebase";
import { toDateTime } from "../../utils/date";

import {
  Container,
  Content,
  Title,
  ErrorMessage,
  Input,
  ValueInput,
  Label,
  Column,
  Row,
  ModalContent,
  DateButton,
  DateText,
  DateLabel,
  DateContainer,
} from "./styles";

interface Props {
  toogleForms: () => void;
  setTransactions: Dispatch<SetStateAction<ITransactions[]>>;
  budgets: IBudget[];
  setBudgets: Dispatch<SetStateAction<IBudget[]>>;
}

interface DropDownProps {
  placeholder: string;
  value: number | string;
  setValue: Dispatch<SetStateAction<any>>;
  items: any[];
}

const DropDown = ({ placeholder, value, setValue, items }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      placeholder={placeholder}
      dropDownContainerStyle={{ borderWidth: 1.5, borderColor: "#dadada" }}
      style={{ borderWidth: 1.5, borderColor: "#dadada" }}
      textStyle={{ fontSize: 12 }}
      dropDownDirection="TOP"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      onOpen={Keyboard.dismiss}
    />
  );
};

export default function CreateBudget({
  budgets,
  setBudgets,
  setTransactions,
  toogleForms,
}: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(-1);
  const [wallet, setWallet] = useState("");
  const [budgetRef, setBudgetRef] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    value: "",
    type: "",
    wallet: "",
    budgetRef: "",
  });

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setMode(currentMode);
    setShow(true);
  };

  let wallets = [
    { label: "Dinheiro Físico", value: "Dinheiro" },
    { label: "Cartão Crédito", value: "Cartão Crédito" },
  ];

  const fBudgets: { label: string; value: string }[] = [];

  budgets.forEach((budget) =>
    fBudgets.push({ label: budget.name, value: budget.id })
  );

  const handleSubmit = async () => {
    const selectedBudget = budgets.filter((item) => item.id === budgetRef)[0];

    let newErrors = {
      name: "",
      value: "",
      type: "",
      wallet: "",
      budgetRef: "",
    };

    if (name.length === 0) newErrors.name = "Por favor, insira o nome";
    else if (name.length < 3)
      newErrors.name =
        "Nome muito curto. O nome pode ter no mínimo 3 caracteres";
    else if (name.length > 50)
      newErrors.name =
        "Nome muito longo. O nome pode ter no máximo 50 caracteres";

    if (value <= 0) newErrors.value = "Por favor, insira um valor";
    else if (selectedBudget)
      if (value > selectedBudget.total && type === Number(0))
        newErrors.value = "Valor superior ao limite do orçamento";
      else if (
        selectedBudget.used + value > selectedBudget.total &&
        type === Number(0)
      )
        newErrors.value = "Esse valor irá exceder o limite do orçamento";

    if (type === -1) newErrors.type = "Por favor, insira o tipo de transação";

    if (wallet === "") newErrors.wallet = "Por favor, insira a carteira";

    if (budgetRef === "")
      newErrors.budgetRef = "Por favor, selecione um orçamento";

    let hasError = false;

    Object.keys(newErrors).forEach(function (key, index) {
      if (newErrors[key as keyof typeof newErrors] != "") hasError = true;
    });

    if (!hasError) {
      setErrors(newErrors);
      console.log("entrou");

      let _budgetRef = doc(database, "Budgets", budgetRef);

      const newTransaction = {
        budgetRef: _budgetRef,
        created_at: Timestamp.fromDate(date),
        name: name,
        type: Number(type),
        value: value,
        wallet: wallet,
      };

      await updateDoc(_budgetRef, {
        used: increment(Number(type) === 0 ? value : value * -1),
      });

      await addDoc(collection(database, "Transactions"), newTransaction);
      setTransactions((arr) => [...arr, newTransaction]);

      let budgetIndex = budgets.indexOf(selectedBudget);
      let newArr = budgets;
      newArr[budgetIndex].used += Number(type) === 0 ? value : value * -1;
      setBudgets(newArr);

      toogleForms();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container>
      <TouchableOpacity style={{ flex: 1 }} onPress={toogleForms} />
      <Content>
        <Title>Criar Transação</Title>
        <View>
          <Label>Nome da transação</Label>
          <Input onChangeText={setName} value={name} />
        </View>
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        <Row>
          <Column>
            <Label>Valor da transação</Label>
            <ValueInput
              value={value}
              onChangeValue={(text: number) => setValue(text || 0)}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}
            />
            {errors.value && <ErrorMessage>{errors.value}</ErrorMessage>}
          </Column>
          <Column>
            <DropDown
              placeholder="Tipo de transação"
              value={type}
              setValue={setType}
              items={[
                { label: "Saída", value: "0" },
                { label: "Entrada", value: "1" },
              ]}
            />
            {errors.type && <ErrorMessage>{errors.type}</ErrorMessage>}
          </Column>
        </Row>
        <Row>
          <Column>
            <DropDown
              placeholder="Carteira"
              value={wallet}
              setValue={setWallet}
              items={wallets}
            />
            {errors.wallet && <ErrorMessage>{errors.wallet}</ErrorMessage>}
          </Column>
          <Column>
            <Label>Data da Transação</Label>
            <DateContainer activeOpacity={0.4} onPress={toogleModal}>
              <Text>{toDateTime(date.getTime())}</Text>
              <EvilIcons name="chevron-right" size={30} />
            </DateContainer>
          </Column>
        </Row>
        <DropDown
          placeholder="Orçamento"
          value={budgetRef}
          setValue={setBudgetRef}
          items={fBudgets}
        />
        {errors.budgetRef && <ErrorMessage>{errors.budgetRef}</ErrorMessage>}
        <Button
          style={{ marginTop: 8 }}
          title="Salvar"
          onPress={handleSubmit}
        />

        <Modal
          transparent={true}
          onRequestClose={toogleModal}
          visible={showModal}
        >
          <Container style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{ position: "absolute", width: "100%", height: "100%" }}
              onPress={toogleModal}
            />
            <ModalContent>
              <Label>Definir data</Label>
              <DateText>{toDateTime(date.valueOf())}</DateText>
              <Row style={{ justifyContent: "center" }}>
                <View style={{ margin: 8 }}>
                  <DateButton onPress={() => showMode("date")}>
                    <EvilIcons name="calendar" size={30} color="#fff" />
                    <DateLabel>Data</DateLabel>
                  </DateButton>
                </View>
                <View style={{ margin: 8 }}>
                  <DateButton onPress={() => showMode("time")}>
                    <EvilIcons name="clock" size={30} color="#fff" />
                    <DateLabel>Horas</DateLabel>
                  </DateButton>
                </View>
              </Row>
            </ModalContent>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </Container>
        </Modal>
      </Content>
    </Container>
  );
}
