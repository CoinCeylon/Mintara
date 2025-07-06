"use server";
import { axiosPublic } from "./axios";
import { isAxiosError } from "axios";
import { Status } from "./types";
import { FieldValues } from "react-hook-form";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

//auth actions
export const loginAction = async (data: FieldValues) => {
  try {
    const response = await axiosPublic.post("/auth/sign-in", data);
    console.log(response.data);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const accessTokenExpiresIn = response.data.accessTokenExpiresIn;
    const refreshTokenExpiresIn = response.data.refreshTokenExpiresIn;
    return {
      data: {
        user: { ...response.data.user },
        tokenInfo: {
          accessToken,
          refreshToken,
          accessTokenExpiresIn,
          refreshTokenExpiresIn,
        },
      },
      message: response.data.message,
      status: "success",
    } as Status;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        message: error.response?.data.message,
        status: "error",
      } as Status;
    }
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axiosPublic.get("/auth/refresh", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    console.log(response);
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    const newAccessTokenExpiresIn = response.data.accessTokenExpiresIn;
    const newRefreshTokenExpiresIn = response.data.refreshTokenExpiresIn;

    return {
      data: {
        accessToken: newAccessToken,
        accessTokenExpiresIn: newAccessTokenExpiresIn,
        refreshToken: newRefreshToken,
        refreshTokenExpiresIn: newRefreshTokenExpiresIn,
      },
      message: response.data.message,
      status: "success",
    } as Status;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        message: error.response?.data.message,
        status: "error",
      } as Status;
    }
  }
};

export const signUpAction = async (data: FieldValues) => {
  try {
    const response = await axiosPublic.post("auth/sign-up", data);
    console.log(response.data);
    return {
      status: "success",
      data: response.data,
      message: response.data.message as string,
    } as Status;
  } catch (error) {
    console.log(error, "SIGN UP ERROR");
    if (isAxiosError(error)) {
      return {
        status: "error",
        message: error.response?.data.message,
      } as Status;
    }
  }
};

//rewards actions
export const getAllAvailableRewardCatalogs = async () => {
  try {
    const response = await axiosPublic.get("/rewards/get-info-all");
    return {
      status: "success",
      data: response.data,
      message: response.data.message as string,
    } as Status;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: "error",
        message: error.response?.data.message,
      } as Status;
    }
  }
};

export const getAllAvailableRewardByUserId = async (userId: string) => {
  try {
    const response = await axiosPublic.get(
      `/rewards/get-available-rewards-for-user?userId=${userId}`
    );
    return {
      status: "success",
      data: response.data,
      message: response.data.message as string,
    } as Status;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: "error",
        message: error.response?.data.message,
      } as Status;
    }
  }
};

//notification actions
export async function getNotifications() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const response = await axiosPublic.get(
      `/notifications/get-all?userId=${session.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.tokenInfo.accessToken}`,
          Cookie: `refreshToken=${session?.tokenInfo.refreshToken}`,
        },
      }
    );

    console.log("API Response:", response.data);
    return { notifications: response.data };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { notifications: [] };
  }
}
export async function markNotificationAsRead(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const response = await axiosPublic.post(
      `/notifications/mark-read?id=${id}&userId=${session.user.id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${session?.tokenInfo.accessToken}`,
          Cookie: `refreshToken=${session?.tokenInfo.refreshToken}`,
        },
      }
    );

    return { notification: response.data };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw new Error("Failed to mark notification as read");
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await axiosPublic.post(
      `/notifications/mark-all-read?userId=${session.user.id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${session?.tokenInfo.accessToken}`,
          Cookie: `refreshToken=${session?.tokenInfo.refreshToken}`,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw new Error("Failed to mark all notifications as read");
  }
}
