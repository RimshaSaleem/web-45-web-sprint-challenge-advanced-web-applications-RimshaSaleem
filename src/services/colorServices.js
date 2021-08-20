import axiosWithAuth from "../helpers/axiosWithAuth";

export const editColorService = (color) => {
    axiosWithAuth()
        .put(`/api/colors/${color.id}`, color)
        .then(res => {
            console.log("Successfully Edited: ", res);
        })
        .catch(err => {
            console.log(err);
        })
};

export const deleteColorService = (color) => {
    axiosWithAuth()
        .delete(`/api/colors/${color.id}`)
        .then(res => {
            console.log("Successfully Deleted: ", res);
        })
        .catch(err => {
            console.log(err);
        })
};