import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  Tab,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { changePassword } from "./action";
import { getLanguageCode } from "../languages/action";
import { getStaffDetails } from "../staffs/action";

import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";

import { EyeOutline, EyeOffOutline } from "@styled-icons/evaicons-outline";
import GeneralInfo from "./others/GeneralInfo";

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const [tab, setTab] = useState("1");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});
  const [changePass, setChangePass] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [languageCode, setLanguageCode] = useState([]);

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const form = useForm();
  const { handleSubmit, setError, clearErrors, register, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        setValues(await getStaffDetails(profile.id));
        const res = await getLanguageCode();
        setLanguageCode(res);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
  }, [languageCode.length, profile.id]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangePassword = (e) => {
    clearErrors(["oldPassword","newPassword", "confirmPassword"]);
    setChangePass({ ...changePass, [e.target.name]: e.target.value });
  };

  const onChangePass = async () => {
    if (changePass.newPassword !== changePass.confirmPassword) {
      setError("newPassword", {
        message: "Password do not match!",
      });
      setError("confirmPassword", {
        message: "Password do not match!",
      });
    } else {
      setUpdate(true);
      try {
        await dispatch(changePassword(changePass));
        setUpdate(false);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Change password successfully!",
          status: "success",
        });
      } catch (e) {
        setUpdate(false);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: e.response.data?.message || "Change password failed!",
          status: "error",
        });
      }
    }
  };

  return (
    <Box
      minHeight="94vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        message={notification.errorMessage}
        status={notification.status}
      />

      <Header
        title={"Settings"}
        subTitle={"Manage personal information and update them."}
        loading={loading}
      />

      {/* Information Settings */}
      <Box paddingX={2} marginTop={2}>
        <TabContext value={tab}>
          {loading ? (
            <Skeleton width="100%" />
          ) : (
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="General" value={"1"} />
                <Tab label="Password" value={"2"} />
              </TabList>
            </Box>
          )}

          <TabPanel value={"1"} sx={{ paddingX: 5 }}>
            <GeneralInfo
              values={values}
              setValues={setValues}
              loading={loading}
              update={update}
              setUpdate={setUpdate}
              notification={notification}
              setNotification={setNotification}
              languageCode={languageCode}
            />
          </TabPanel>
          <TabPanel value={"2"}>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Box width={600} marginTop={2}>
                {loading ? (
                  <Skeleton width="100%" />
                ) : (
                  <>
                    <Box marginLeft={1}>
                      <Typography
                        color={theme.palette.text.third}
                        fontWeight="medium"
                        marginBottom={1}
                      >
                        Old Password{" "}
                        <small style={{ color: theme.palette.text.active }}>
                          *
                        </small>
                      </Typography>
                    </Box>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? (
                              <EyeOffOutline width={24} />
                            ) : (
                              <EyeOutline width={24} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      fullWidth
                      size="small"
                      name="oldPassword"
                      disabled={update}
                      style={{ borderRadius: 10 }}
                      {...register("oldPassword", {
                        required: "Old Password is required!",
                        validate: (value, formValue) => value.trim() !== "",
                      })}
                      onChange={handleChangePassword}
                      error={!!errors.oldPassword}
                    />
                    <FormHelperText htmlFor="render-select" error>
                      {errors.oldPassword?.message}
                    </FormHelperText>
                  </>
                )}
              </Box>
              <Box width={600} marginTop={2}>
                {loading ? (
                  <Skeleton width="100%" />
                ) : (
                  <>
                    <Box marginLeft={1}>
                      <Typography
                        color={theme.palette.text.third}
                        fontWeight="medium"
                        marginBottom={1}
                      >
                        New Password{" "}
                        <small style={{ color: theme.palette.text.active }}>
                          *
                        </small>
                      </Typography>
                    </Box>
                    <OutlinedInput
                      type={showNewPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowNewPassword((show) => !show)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <EyeOffOutline width={24} />
                            ) : (
                              <EyeOutline width={24} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      fullWidth
                      size="small"
                      name="newPassword"
                      disabled={update}
                      style={{ borderRadius: 10 }}
                      {...register("newPassword", {
                        required: "New Password is required!",
                        validate: (value, formValue) => value.trim() !== "",
                      })}
                      onChange={handleChangePassword}
                      error={!!errors.newPassword}
                    />
                    <FormHelperText htmlFor="render-select" error>
                      {errors.newPassword?.message}
                    </FormHelperText>
                  </>
                )}
              </Box>
              <Box width={600} marginTop={2}>
                {loading ? (
                  <Skeleton width="100%" />
                ) : (
                  <>
                    <Box marginLeft={1}>
                      <Typography
                        color={theme.palette.text.third}
                        fontWeight="medium"
                        marginBottom={1}
                      >
                        Confirm Password{" "}
                        <small style={{ color: theme.palette.text.active }}>
                          *
                        </small>
                      </Typography>
                    </Box>
                    <OutlinedInput
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowConfirmPassword((show) => !show)
                            }
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <EyeOffOutline width={24} />
                            ) : (
                              <EyeOutline width={24} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      fullWidth
                      size="small"
                      name="confirmPassword"
                      disabled={update}
                      style={{ borderRadius: 10 }}
                      {...register("confirmPassword", {
                        required: "Confirm Password is required!",
                        validate: (value, formValue) => value.trim() !== "",
                      })}
                      onChange={handleChangePassword}
                      error={!!errors.confirmPassword}
                    />
                    <FormHelperText htmlFor="render-select" error>
                      {errors.confirmPassword?.message}
                    </FormHelperText>
                  </>
                )}
              </Box>
              <Box display="flex" justifyContent="center" marginTop={5}>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <Button
                    variant="contained"
                    disabled={update}
                    color="error"
                    sx={{ borderRadius: 2.5 }}
                    onClick={handleSubmit(onChangePass)}
                  >
                    {update ? (
                      <CircularProgress color="error" size={25} />
                    ) : (
                      <Typography fontWeight="medium">Save Change</Typography>
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Profile;
