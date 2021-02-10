export const state = () => ({
    duyuruList: null,
    cizelgeList: null,
    ogrenciDetay: null,
    calismaProgramList: null
})

export const mutations = {
    setDuyuruList(state, duyuruList) {
        state.duyuruList = duyuruList
    },

    setCizelgeList(state, cizelgeList) {
        state.cizelgeList = cizelgeList
    },
    setOgrenciDetay(state, ogrenciDetay) {
        state.ogrenciDetay = ogrenciDetay
    },
    setCalismaProgrami(state, calismaProgramList) {
        state.calismaProgramList = calismaProgramList
    }
}

export const actions = {

    fetchDuyuruList(vueContext) {
        console.log("fetch list çalıştı")
        return this.$axios.get('duyurular/getDuyurular').then(response => {
            vueContext.commit('setDuyuruList', response.data)
        }).catch(err => {
            console.log(err)
        })
    },

    fetchCizelgeList(vueContext) {
        console.log("fetch list çalıştı")
        return this.$axios.get('cizelge/getGunlukCizelge/0').then(response => {
            vueContext.commit('setCizelgeList', response.data)
        }).catch(err => {
            console.log(err)
        })
    },

    fetchOgrenciDetay(vueContext) {
        console.log("fetch list çalıştı")
        const ogrenciID = this.$auth.user.id;
        return this.$axios.get('ogrenci/getOgrenciDetay/' + ogrenciID).then(response => {
            vueContext.commit('setOgrenciDetay', response.data)
        }).catch(err => {
            console.log(err)
        })
    },


    fetchCalismaProgrami(vueContext) {
        return this.$axios.get('dersprogrami/getGunlukProgram').then(response => {
            vueContext.commit('setCalismaProgrami', response.data)
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
}




export const getters = {
    getDuyuruList(state) {
        return state.duyuruList
    },
    getCizelgeList(state) {
        return state.cizelgeList
    },

    getOgrenciDetay(state) {
        return state.ogrenciDetay
    },


    getCalismaProgrami(state) {
        console.log('getCalismaProgrami')
        return state.calismaProgramList
    },
}