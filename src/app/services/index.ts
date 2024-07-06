import axios from "axios";
import { toast } from "react-toastify";
import { addBearer } from "../../_metronic/helpers";
import { getRefreshToken, getToken, setToken } from "../modules/auth";

export const GET_USER_BY_ACCESSTOKEN_URL = `/admin/refresh-token`;

export const handlePostRequest =
  (url: string, data: any, options = {}) =>
  async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    try {
      const response = await axios.post(fetchUrl, data, options);
      toast.success(response.data.message || "Sletting utført.", {
        autoClose: 20000,
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handlePostRequestWithoutMessage =
  (url: string, data: any, options = {}) =>
  async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    try {
      const response = await axios.post(fetchUrl, data, options);
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handleGetRequest =
  (url: string, options = {}) =>
  async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    try {
      const response = await axios.get(fetchUrl, options);
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handleGetRequestWithoutRefreshAndMessage =
  (url: string) => async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;
    try {
      const response = await axios.get(fetchUrl, {
        headers: {
          Authorization: `${getToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      // toast.error(error.response.data.message || 'Noe gikk galt. Vennligst prøv igjen.',{autoClose: 20000})
      return error;
    } finally {
      setLoading(false);
    }
  };
export const handleGetRequestWithoutRefresh =
  (url: string) => async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;
    try {
      const response = await axios.get(fetchUrl, {
        headers: {
          Authorization: `${getToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handleGetRequestWithRefreshTokenHeader =
  (url: string) => async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;
    try {
      const response = await axios.get(fetchUrl, {
        headers: {
          Authorization: `${getRefreshToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handlePutRequest =
  async (url: string, data: any, options = {}) =>
  async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    try {
      const response = await axios.put(fetchUrl, data, options);
      toast.success(response.data.message || "Updated successfully", {
        autoClose: 20000,
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handleDeleteRequest =
  (url: string, options = {}) =>
  async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    try {
      const response = await axios.delete(fetchUrl, options);
      toast.success(response.data.message || "Sletting fullført.", {
        autoClose: 20000,
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handlePatchRequest =
  (url: string, data: any, options = {}) =>
  async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    try {
      const response = await axios.patch(fetchUrl, data, options);
      toast.success(response.data.message || "Updated successfully", {
        autoClose: 20000,
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      toast.error(
        error.response.data.message || "Noe gikk galt. Vennligst prøv igjen.",
        {
          autoClose: 20000,
        }
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handlePatchRequestWithOutAlerts =
  (url: string, data: any, options = {}) =>
  async (setLoading: any) => {
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    try {
      const response = await axios.patch(fetchUrl, data, options);
      // toast.success(response.data.message || 'Updated successfully', { autoClose: 20000 })
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return handleRefreshToken();
      // toast.error(error.response.data.message || 'Noe gikk galt. Vennligst prøv igjen.', {
      //   autoClose: 20000,
      // })
      return error;
    } finally {
      setLoading(false);
    }
  };

export const handleRefreshToken = async () => {
  const refreshToken = getRefreshToken();
  const refreshURL = `${process.env.REACT_APP_BACKEND_API_URL}${GET_USER_BY_ACCESSTOKEN_URL}`;
  try {
    const responseRefresh = await fetch(refreshURL, {
      headers: {
        Authorization: refreshToken || "",
      },
    });
    if (!responseRefresh.ok) throw Error("Error");
    const data = await responseRefresh.json();
    setToken(addBearer(data?.data?.access_token));
    return data;
  } catch (error: any) {
    localStorage.clear();
    window.location.reload();
  }
};
