export const state = () => ({
    dersList: [],
    secilenDers: null
})

export const mutations = {
    setDersList(state, dersList) {
        state.dersList = dersList
    },

    serSecilenDers(state, dersID) {
        state.secilenDers = dersID
    }
}

export const actions = {

    fetchDersList(vueContext,bolumID) {
        return this.$axios.get("ders/getAll/" + bolumID).then(response => {
            vueContext.commit('setDersList', response.data)
        }).catch(err => {
            console.log(err)
        })
    },

    
}




export const getters = {
    getDersList(state) {
        return state.dersList
    },

    getSecilenDers(state) {
        return state.secilenDers
    },

}