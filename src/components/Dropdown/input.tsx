import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Container } from "./styles";
import COLORS from "../../styles/theme";

interface DropdownInputProps {
  selectedValue: string | null;
  onValueChange: (value: string | null) => void;
  options: { label: string; value: string }[];
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  selectedValue,
  onValueChange,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  // Atualizar os itens com as opções passadas sempre que as opções mudarem
  useEffect(() => {
    setItems(options);
  }, [options]);

  return (
    <Container>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue =
            typeof callback === "function" ? callback(selectedValue) : callback;
          onValueChange(newValue); // Passando o valor selecionado para o pai
        }}
        setItems={setItems}
        placeholder="Selecione uma opção"
        style={{
          height: 50,
          borderColor: "black",
          borderWidth: 0,
          borderRadius: 50,
          paddingHorizontal: 8,
          marginBottom: 20,
        }}
        textStyle={{
          fontFamily: "Poppins", // Ajuste conforme necessário
        }}
        dropDownContainerStyle={{
          borderRadius: 10,
          elevation: 5,
        }}
      />
    </Container>
  );
};

export default DropdownInput;
