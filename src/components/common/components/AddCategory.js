import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Add, Remove } from "styled-icons/material";

const AddCategory = ({
  values,
  setValues,
  categoryLanguages,
  setCategoryLanguages,
  languageList,
  register,
  errors,
  clearErrors,
}) => {
  const handleChange = (event) => {
    setValues({ ...values, name: event.target.value });
  };

  const handleChangeCategories = (index, event) => {
    clearErrors(["languageCode", "nameLanguage"]);
    const values = [...categoryLanguages];
    values[index][event.target.name] = event.target.value;
    setCategoryLanguages(values);
  };

  const handleAddFields = () => {
    clearErrors(["languageCode", "nameLanguage"]);
    const data = [...categoryLanguages];
    if (data.length < languageList.length) {
      setCategoryLanguages([
        ...categoryLanguages,
        { languageCode: "zh-cn", nameLanguage: "" },
      ]);
    }
  };

  const handleRemoveFields = (index) => {
    clearErrors(["languageCode", "nameLanguage"]);
    const data = [...categoryLanguages];
    if (data.length > 1) {
      data.splice(index, 1);
      setCategoryLanguages(data);
    }
  };

  return (
    <FormGroup>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        marginBottom={4}
      >
        <Typography sx={{ width: 220 }}>Category Name</Typography>
        <TextField
          fullWidth
          name="name"
          size="small"
          InputProps={{
            style: {
              borderRadius: 10,
            },
          }}
          value={values.name}
          {...register("name", {
            onChange: handleChange,
            required: "Category Name is required!",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Box>
      <Typography fontWeight="semiBold">
        Category subtitles in other languages
      </Typography>

      {categoryLanguages.map((category, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          gap={3}
          marginY={3}
        >
          <FormControl fullWidth size="small">
            <Select
              value={category.languageCode}
              sx={{ borderRadius: 2.5 }}
              name="languageCode"
              fullWidth
              onChange={(event) => handleChangeCategories(index, event)}
            >
              {languageList.map((item) => (
                <MenuItem key={item.id} value={item.languageCode}>
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{ width: 20, marginRight: 10 }}
                  />
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="nameLanguage"
            value={category.nameLanguage}
            size="small"
            required
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
            onChange={(event) => handleChangeCategories(index, event)}
          />
          {categoryLanguages.length === 1 ? null : (
            <IconButton onClick={() => handleRemoveFields(index)}>
              <Remove width={24} />
            </IconButton>
          )}
        </Box>
      ))}
      <FormHelperText htmlFor="render-select" error>
        {errors.languageCode?.message || errors.nameLanguage?.message}
      </FormHelperText>
      {categoryLanguages.length === languageList.length ? null : (
        <Button onClick={handleAddFields} color="error">
          <Add width={24} />
          Add other languages
        </Button>
      )}
    </FormGroup>
  );
};

export default AddCategory;
