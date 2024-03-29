import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Rating,
  Skeleton,
  useTheme,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import dayjs from "dayjs";

import { labels } from "../../../../constants/rating";

import { getTourComments } from "../../action";
import { changeState } from "../../../users/action";

import { EyeOutline, EyeOffOutline } from "@styled-icons/evaicons-outline";

const Feedback = ({ id, rating, notification, setNotification }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [popupConfirm, setPopupConfirm] = useState(false);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState({});

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTourComments(id);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Can't get data comment!",
        status: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const onConfirm = async (fbId) => {
    try {
      const response = await changeState("portal/places/feedback", fbId);
      if (response) {
        getData();
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Change state successfully!",
          status: "success",
        });
      }
    } catch (e) {
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Change state failed!",
        status: "error",
      });
    }
    await setPopupConfirm(false);
  };

  return (
    <Box>
      <Box display="flex" gap={2}>
        {loading ? (
          <Skeleton width={100} />
        ) : (
          <Box
            bgcolor={theme.palette.background.secondary}
            gap={1}
            padding={1}
            display="flex"
            alignItems="center"
            borderRadius={2.5}
          >
            <Typography fontSize={14} color={theme.palette.text.third}>
              Total Comments:
            </Typography>
            <Typography fontSize={14} color={theme.palette.text.third}>
              {comments?.length}
            </Typography>
          </Box>
        )}
        {loading ? (
          <Skeleton width={100} />
        ) : (
          <Box
            bgcolor={theme.palette.background.secondary}
            gap={1}
            padding={1}
            display="flex"
            alignItems="center"
            borderRadius={2.5}
          >
            <Typography fontSize={14} color={theme.palette.text.third}>Rating:</Typography>
            <Rating
              readOnly
              size="small"
              value={rating || 0}
              precision={0.5}
              sx={{
                ".MuiRating-icon": {
                  borderColor: theme.palette.text.active,
                },
                "& .MuiRating-iconFilled": {
                  color: theme.palette.text.active,
                },
              }}
            />
            <Typography
              marginLeft={1}
              fontSize={12}
              color={theme.palette.text.third}
            >
              ({labels[rating || 0]})
            </Typography>
          </Box>
        )}
      </Box>
      <Dialog
        open={popupConfirm}
        onClose={() => setPopupConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {value.status
            ? "Are you sure you want to hide?"
            : "Are you sure you want to show?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {value.status
              ? "Your action will hide this user's comments about the tour or place."
              : "Your action will display this user's comments for the tour or place."}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button
            variant="outlined"
            onClick={() => onConfirm(value.id)}
            autoFocus
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setPopupConfirm(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Box marginTop={2}>
        {loading ? (
          <Skeleton />
        ) : (
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            {comments.map((comment, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="textSecondary">
                  {comment.updateTime ? (
                    <Box>
                      <Box>{dayjs(comment.updateTime).format("ll")}</Box>
                      <Box>{dayjs(comment.updateTime).format("h:mm A")}</Box>
                    </Box>
                  ) : (
                    <Box>
                      <Box>{dayjs(comment.createTime).format("ll")}</Box>
                      <Box>{dayjs(comment.createTime).format("h:mm A")}</Box>
                    </Box>
                  )}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  {index === comments.length - 1 ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    bgcolor={theme.palette.background.secondary}
                    borderRadius={2.5}
                    paddingX={2}
                    paddingTop={1}
                    paddingBottom={2}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" gap={1} alignItems="center">
                        <Typography fontWeight="medium">
                          {comment.account.firstName +
                            " " +
                            comment.account.lastName}
                        </Typography>
                        <Rating
                          readOnly
                          size="small"
                          value={comment.rate || 0}
                          precision={0.5}
                          sx={{
                            ".MuiRating-icon": {
                              borderColor: theme.palette.text.active,
                            },
                            "& .MuiRating-iconFilled": {
                              color: theme.palette.text.active,
                            },
                          }}
                        />
                        <Typography marginLeft={1} fontSize={14}>
                          ({labels[comment.rate || 0]})
                        </Typography>
                      </Box>
                      <Box display="flex" gap={2}>
                        {comment.status ? (
                          <Button
                            color="error"
                            onClick={() => {
                              setValue(comment);
                              setPopupConfirm(true);
                            }}
                          >
                            <Box display="flex" gap={0.5}>
                              <EyeOffOutline width={20} />
                              <Typography fontSize={14} fontWeight="medium">
                                Hide
                              </Typography>
                            </Box>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              setValue(comment);
                              setPopupConfirm(true);
                            }}
                          >
                            <Box display="flex" gap={0.5}>
                              <EyeOutline width={20} />
                              <Typography fontSize={14} fontWeight="medium">
                                Show
                              </Typography>
                            </Box>
                          </Button>
                        )}
                      </Box>
                    </Box>

                    <Box padding={1}>
                      <Typography>{comment.content}</Typography>
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </Box>
    </Box>
  );
};

export default Feedback;
