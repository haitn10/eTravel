import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import { getCategoryDetails, updateCategory } from "./action";

import Header from "../common/Header";

import { Add, Remove } from "styled-icons/material";
import ErrorModal from "../common/ErrorModal";

const initialCategoryLanguage = { languageCode: "zh-cn", nameLanguage: "" };

const CategoryDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { categoryId, languageList } = state;
  const [values, setValues] = useState({ name: "" });
  const [categoryLanguages, setCategoryLanguages] = useState([]);
  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const form = useForm({
    defaultValues: {
      name: "",
      categoryLanguages: [initialCategoryLanguage],
    },
  });
  const { register, setValue, handleSubmit, setError, clearErrors, formState } =
    form;
  const { errors } = formState;

  useEffect(() => {
    async function getInfoDetails() {
      try {
        const data = await getCategoryDetails(categoryId);
        setValues({ ...values, name: data.name });
        setValue("name", data.name);
        setCategoryLanguages(data.categoryLanguages);
      } catch (error) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't get data details for category!",
          status: "error",
        });
      }
    }
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleChangeCategories = (index, event) => {
    clearErrors(["languageCode", "nameLanguage"]);
    const values = [...categoryLanguages];
    values[index][event.target.name] = event.target.value;
    setCategoryLanguages(values);
  };

  const handleAddFields = () => {
    clearErrors(["languageCode", "nameLanguage"]);
    const value = [...categoryLanguages];
    if (value.length < languageList.length) {
      setCategoryLanguages([...categoryLanguages, initialCategoryLanguage]);
    }
  };

  const handleRemoveFields = (index) => {
    clearErrors(["languageCode", "nameLanguage"]);
    const value = [...categoryLanguages];
    if (value.length > 1) {
      value.splice(index, 1);
      setCategoryLanguages(value);
    }
  };

  const isDuplicate = () => {
    const nameOccurrences = {};
    for (const obj of categoryLanguages) {
      if (nameOccurrences[obj.languageCode]) {
        return true;
      }
      nameOccurrences[obj.languageCode] = true;
    }
    return false;
  };

  const onSubmit = async () => {
    if (isDuplicate()) {
      return setError("languageCode", {
        message: "Duplicate language!",
      });
    }

    if (categoryLanguages.some((item) => item.nameLanguage === "")) {
      return setError("nameLanguage", {
        message: "Language Name not empty!",
      });
    }
    const data = { ...values, categoryLanguages: categoryLanguages };
    try {
      const res = await updateCategory(categoryId, data);
      if (res) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Updated successfully!",
          status: "success",
        });
      }
    } catch (e) {
      console.log(e.response.data.errors);
      const message = e.response.data
        ? e.response.data.errors
        : "Something went wrong!";
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: message,
        status: "error",
      });
    }
  };

  return (
    <Box
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
      minHeight="94vh"
    >
      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        message={notification.errorMessage}
        status={notification.status}
      />
      <Header
        title={"Manage Categories"}
        subTitle={"Manage all them existing catogories or update status."}
        showBack={true}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box marginX={20} marginTop={5} padding={1}>
        <FormGroup noValidate>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
            marginBottom={4}
          >
            <Typography required sx={{ width: 220 }}>
              Category Name
            </Typography>
            <TextField
              fullWidth
              name="name"
              size="small"
              required
              InputProps={{
                style: {
                  borderRadius: 10,
                },
              }}
              value={values.name}
              error={!!errors.name}
              {...register("name", {
                onChange: handleChange,
                required: "Category Name is required!",
              })}
              onChange={handleChange}
              helperText={errors.name?.message}
            />
          </Box>
          <Typography fontWeight="semiBold">
            Category subtitles in other languages
          </Typography>

          {categoryLanguages &&
            categoryLanguages.map((data, index) => (
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
                    value={data.languageCode.trim()}
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
                  value={data.nameLanguage}
                  size="small"
                  required
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  onChange={(event) => handleChangeCategories(index, event)}
                />
                {categoryLanguages && categoryLanguages.length === 1 ? null : (
                  <IconButton onClick={() => handleRemoveFields(index)}>
                    <Remove width={24} />
                  </IconButton>
                )}
              </Box>
            ))}
          <FormHelperText htmlFor="render-select" error>
            {errors.languageCode?.message || errors.nameLanguage?.message}
          </FormHelperText>
          {categoryLanguages &&
          categoryLanguages.length === languageList.length ? null : (
            <Button onClick={handleAddFields} color="error">
              <Add width={24} />
              Add other languages
            </Button>
          )}
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="error"
            sx={{
              marginTop: 5,
              borderRadius: 2.5,
              height: 40,
              maxWidth: "fit-content",
            }}
          >
            Save Changes
          </Button>
        </FormGroup>
      </Box>
    </Box>
  );
};

export default CategoryDetails;
