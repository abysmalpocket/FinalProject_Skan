import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authorization: false,
  error: false,
  currentToken: "data.payload.data.accessToken",
  loader: false,
  usedCompanyCount: "",
  companyLimit: "",
  histograms: null,
  totalDocuments: [],
  riskFactors: [],
  publication: [],
  publicationIds: [],
};

const url = "https://gateway.scan-interfax.ru";

export const getUser = createAsyncThunk(
  "authorization/getUser",
  async ({ login, password }, { rejectWithValue }) => {
    const res = await axios.post(
      `${url}/api/v1/account/login`,
      {
        login,
        password,
      },
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const { data } = res;

    return { data };
  }
);

export const getUserInfo = createAsyncThunk(
  "authorization/getUserInfo",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/v1/account/info`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.eventFiltersInfo;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getHistograms = createAsyncThunk(
  "histograms/getHistograms",
  async ({ token, startDate, endDate, inn, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/objectsearch/histograms`,
        {
          issueDateInterval: {
            startDate: startDate + "T00:00:00+03:00",
            endDate: endDate + "T23:59:59+03:00",
          },
          searchContext: {
            targetSearchEntitiesContext: {
              targetSearchEntities: [
                {
                  type: "company",
                  sparkId: null,
                  entityId: null,
                  inn,
                  maxFullness: true,
                  inBusinessNews: null,
                },
              ],
              onlyMainRole: true,
              tonality: "any",
              onlyWithRiskFactors: false,
            },
          },
          attributeFilters: {
            excludeTechNews: true,
            excludeAnnouncements: true,
            excludeDigests: true,
          },
          similarMode: "duplicates",
          quantity,
          sortType: "sourceInfluence",
          sortDirectionType: "desc",
          intervalType: "month",
          histogramTypes: ["totalDocuments", "riskFactors"],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getObjectSearch = createAsyncThunk(
  "publication/getObjectSearch",
  async ({ token, startDate, endDate, inn, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/objectsearch`,
        {
          issueDateInterval: {
            startDate: startDate + "T00:00:00+03:00",
            endDate: endDate + "T23:59:59+03:00",
          },
          searchContext: {
            targetSearchEntitiesContext: {
              targetSearchEntities: [
                {
                  type: "company",
                  sparkId: null,
                  entityId: null,
                  inn,
                  maxFullness: true,
                  inBusinessNews: null,
                },
              ],
              onlyMainRole: true,
              tonality: "any",
              onlyWithRiskFactors: false,
            },
          },
          attributeFilters: {
            excludeTechNews: true,
            excludeAnnouncements: true,
            excludeDigests: true,
          },
          similarMode: "duplicates",
          quantity,
          sortType: "sourceInfluence",
          sortDirectionType: "desc",
          intervalType: "month",
          histogramTypes: ["totalDocuments", "riskFactors"],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getObjectSearchId = createAsyncThunk(
  "publicationIds/getObjectSearchId",
  async ( {token, ids}, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/documents`,
        {
          ids,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authorizationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.authorization = false;
      state.currentToken = "";
    },
    saveToken: (state, action) => {
      state.currentToken = action.payload
    },
    changePassOrLogin: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authorization = true;
        state.currentToken = action.payload.data.accessToken;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authorization = false;
        state.currentToken = "";
        state.error = true;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loader = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loader = false;
        state.usedCompanyCount = action.payload.usedCompanyCount;
        state.companyLimit = action.payload.companyLimit;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loader = false;
      })
      .addCase(getHistograms.fulfilled, (state, action) => {
        state.histograms = action.payload.data;
      })
      .addCase(getObjectSearch.fulfilled, (state, action) => {
        state.publication = action.payload.data.items;
      })
      .addCase(getObjectSearchId.fulfilled, (state, action) => {
        state.publicationIds = action.payload.data
      })
  },
});

export const { logout, changePassOrLogin } = authorizationSlice.actions;
export default authorizationSlice.reducer;
