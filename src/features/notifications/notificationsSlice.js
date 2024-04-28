import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";


const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async (_, { getState }) => {
    const notifications = selectAllNotifications(getState());
    const [latestNotification] = notifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";

    const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`);
    return response.data;
})

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, action) {
            // state.forEach(notification => {
            //     notification.read = true;
            // })
            Object.values(state.entities).forEach(notification => {
                notification.read = true;
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            // state.push(...action.payload);
            notificationsAdapter.upsertMany(state, action.payload);

            // state.forEach(notification => {
            //     notification.isNew = !notification.read;
            // })
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read;
            })

            // state.sort((a, b) => b.date.localeCompare(a.date));
        })
    }
})

export default notificationsSlice.reducer;

export const { allNotificationsRead } = notificationsSlice.actions;

// export const selectAllNotifications = (state) => state.notifications;
export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors(state => state.notifications);